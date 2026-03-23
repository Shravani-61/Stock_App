const { Router } = require('express');
const User = require('../models/User');
const { getQuote, getDaily } = require('../services/alpha');

const router = Router();

// Get authenticated user's profile
router.get('/profile', async (req, res) => {
  const user = await User.findById(req.userId).lean();
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json({ id: user._id, name: user.name, email: user.email, picture: user.picture });
});

// Add a tracked stock
router.post('/stocks', async (req, res) => {
  const { symbol, buyPrice, buyDate, quantity } = req.body || {};
  if (!symbol || !buyPrice || !buyDate || !quantity) return res.status(400).json({ error: 'Missing fields' });
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const exists = user.trackedStocks.find(s => s.symbol.toUpperCase() === symbol.toUpperCase());
  if (!exists) {
    user.trackedStocks.push({ symbol: symbol.toUpperCase(), buyPrice, buyDate, quantity });
    await user.save();
  }
  return res.status(201).json({ ok: true });
});

// List tracked stocks
router.get('/stocks', async (req, res) => {
  const user = await User.findById(req.userId).lean();
  return res.json(user?.trackedStocks || []);
});

// Profit/Loss calculation for all tracked stocks
router.get('/profit', async (req, res) => {
  const user = await User.findById(req.userId).lean();
  const tracked = user?.trackedStocks || [];
  const results = [];
  let totalPL = 0;
  for (const s of tracked) {
    try {
      const quoteJson = await getQuote(s.symbol);
      const priceStr = quoteJson?.['Global Quote']?.['05. price'];
      const current = priceStr ? parseFloat(priceStr) : null;
      if (!current) continue;
      const pl = (current - s.buyPrice) * s.quantity;
      totalPL += pl;
      results.push({ symbol: s.symbol, buyPrice: s.buyPrice, quantity: s.quantity, currentPrice: current, pl });
    } catch (e) {
      results.push({ symbol: s.symbol, error: 'quote_unavailable' });
    }
  }
  return res.json({ items: results, totalPL });
});

// Profit/Loss calculation (canonical shape)
// Response: { totalPL: number, stocks: [{ symbol, buyPrice, quantity, currentPrice, profit }] }
router.get('/profit-loss', async (req, res) => {
  const user = await User.findById(req.userId).lean();
  const tracked = user?.trackedStocks || [];
  if (!tracked.length) return res.json({ totalPL: 0, stocks: [] });

  const stocks = [];
  let totalPL = 0;
  for (const s of tracked) {
    try {
      const quoteJson = await getQuote(s.symbol);
      const priceStr = quoteJson?.['Global Quote']?.['05. price'];
      const currentPrice = priceStr ? Number.parseFloat(priceStr) : null;
      if (!Number.isFinite(currentPrice)) {
        stocks.push({ symbol: s.symbol, buyPrice: s.buyPrice, quantity: s.quantity, error: 'quote_unavailable' });
        continue;
      }
      const profit = (currentPrice - s.buyPrice) * s.quantity;
      totalPL += profit;
      stocks.push({ symbol: s.symbol, buyPrice: s.buyPrice, quantity: s.quantity, currentPrice, profit });
    } catch (e) {
      stocks.push({ symbol: s.symbol, buyPrice: s.buyPrice, quantity: s.quantity, error: 'quote_unavailable' });
    }
  }
  return res.json({ totalPL, stocks });
});

// Historical chart data for a symbol
router.get('/charts', async (req, res) => {
  const { symbol } = req.query;
  if (!symbol) return res.status(400).json({ error: 'symbol required' });
  const user = await User.findById(req.userId).lean();
  const allowed = (user?.trackedStocks || []).some(s => s.symbol.toUpperCase() === symbol.toUpperCase());
  if (!allowed) return res.status(403).json({ error: 'Not allowed for this symbol' });
  try {
    const daily = await getDaily(symbol);
    const series = daily?.['Time Series (Daily)'];
    // Validate Alpha Vantage response; return clear error if missing
    if (!series || typeof series !== 'object') {
      const message = daily?.Note || daily?.Information || 'Alpha Vantage response missing Time Series (Daily)';
      return res.status(502).json({ error: 'alpha_vantage_invalid', message });
    }
    // Convert to Recharts-friendly format [{date, close}]
    const data = Object.entries(series)
      .map(([date, v]) => ({ date, close: Number.parseFloat(v['4. close']) }))
      .filter(p => Number.isFinite(p.close))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    return res.json({ symbol: symbol.toUpperCase(), data });
  } catch (e) {
    return res.status(502).json({ error: 'alpha_vantage_error', message: e.message });
  }
});

// Paper trading portfolio view
router.get('/paper/portfolio', async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  // Initialize paper account on first access if missing
  if (!user.paper || user.paper.balance === undefined) {
    user.paper = { balance: 100000, holdings: [], history: [] };
    await user.save();
  }
  return res.json(user.paper);
});

// Paper trading buy
router.post('/paper/buy', async (req, res) => {
  const { symbol, quantity, price, type } = req.body || {};
  if (!symbol || !quantity || !price) return res.status(400).json({ error: 'Missing fields: symbol, quantity, price' });
  const qty = Number(quantity), pr = Number(price);
  if (qty <= 0 || pr <= 0) return res.status(400).json({ error: 'Invalid values: quantity and price must be > 0' });
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (!user.paper || user.paper.balance === undefined) user.paper = { balance: 100000, holdings: [], history: [] };
  const cost = qty * pr;
  if (user.paper.balance < cost) return res.status(400).json({ error: 'Insufficient balance to execute buy order' });
  user.paper.balance -= cost;
  const h = user.paper.holdings.find(h => h.symbol === symbol.toUpperCase());
  if (h) {
    const totalCost = h.avgPrice * h.quantity + cost;
    h.quantity += qty;
    h.avgPrice = totalCost / h.quantity;
  } else {
    user.paper.holdings.push({ symbol: symbol.toUpperCase(), quantity: qty, avgPrice: pr });
  }
  user.paper.history.push({ side: 'BUY', symbol: symbol.toUpperCase(), quantity: qty, price: pr });
  await user.save();
  return res.json({ ok: true, balance: user.paper.balance, holdings: user.paper.holdings, history: user.paper.history });
});

// Paper trading sell
router.post('/paper/sell', async (req, res) => {
  const { symbol, quantity, price, type } = req.body || {};
  const qty = Number(quantity), pr = Number(price);
  if (!symbol || !qty || !pr) return res.status(400).json({ error: 'Missing fields: symbol, quantity, price' });
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (!user.paper || user.paper.balance === undefined) user.paper = { balance: 100000, holdings: [], history: [] };
  const h = user.paper.holdings.find(h => h.symbol === symbol.toUpperCase());
  if (!h || h.quantity < qty) return res.status(400).json({ error: 'Insufficient holdings to execute sell order' });
  h.quantity -= qty;
  user.paper.balance += qty * pr;
  if (h.quantity === 0) {
    user.paper.holdings = user.paper.holdings.filter(x => x.symbol !== h.symbol);
  }
  user.paper.history.push({ side: 'SELL', symbol: symbol.toUpperCase(), quantity: qty, price: pr });
  await user.save();
  return res.json({ ok: true, balance: user.paper.balance, holdings: user.paper.holdings, history: user.paper.history });
});

module.exports = router;
