import { useEffect, useMemo, useState } from 'react'
import { apiGet, apiPost } from '../utils/api.js'

export default function PaperTrading() {
  const [portfolio, setPortfolio] = useState({ balance: 100000, holdings: [], history: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [symbol, setSymbol] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')

  const canSubmit = useMemo(() => symbol && quantity && price, [symbol, quantity, price])

  async function load() {
    try {
      setLoading(true)
      const data = await apiGet('/api/paper/portfolio')
      setPortfolio(data)
    } catch (e) {
      setError('Failed to load paper portfolio')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function trade(side) {
    setError('')
    setSuccess('')
    setSubmitting(true)
    try {
      const path = side === 'BUY' ? '/api/paper/buy' : '/api/paper/sell'
      // Send type as well for clarity, even if backend does not require it
      const res = await apiPost(path, { type: side, symbol: symbol.toUpperCase(), quantity: Number(quantity), price: Number(price) })
      setSymbol(''); setQuantity(''); setPrice('')
      setSuccess(`${side === 'BUY' ? 'Buy' : 'Sell'} order executed successfully.`)
      await load()
    } catch (e) {
      // Try to parse backend error message if JSON, else show generic
      try {
        const parsed = JSON.parse(e.message)
        const msg = parsed?.error || parsed?.message || 'Trade failed'
        setError(msg)
      } catch {
        setError('Trade failed')
      }
    } finally {
      setSubmitting(false)
      // Auto-clear success after a short while
      setTimeout(() => setSuccess(''), 2000)
    }
  }

  return (
    <main className="container-page py-6 grid gap-6">
      {/* Top: Balance card */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="card-padded md:col-span-1">
          <h1 className="title">Paper Trading</h1>
          <p className="subtitle">Simulated trading with $100,000 starting balance.</p>
          <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="subtitle">Current Balance</div>
            <div className="text-3xl font-bold text-slate-800">${portfolio.balance?.toFixed?.(2) ?? portfolio.balance}</div>
          </div>
        </div>

        {/* Form card */}
        <div className="card-padded">
          <h2 className="title">Buy / Sell</h2>
          <form onSubmit={e => e.preventDefault()} className="mt-4 grid gap-3">
            <div>
              <div className="label">Symbol</div>
              <input className="input" placeholder="e.g., AAPL" value={symbol} onChange={e => setSymbol(e.target.value.toUpperCase())} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="label">Quantity</div>
                <input className="input" placeholder="e.g., 10" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
              </div>
              <div>
                <div className="label">Price</div>
                <input className="input" placeholder="e.g., 185.50" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-2">
              <button disabled={!canSubmit || submitting} onClick={() => trade('BUY')} className="btn btn-success">
                {submitting ? 'Processing…' : 'Buy'}
              </button>
              <button disabled={!canSubmit || submitting} onClick={() => trade('SELL')} className="btn btn-danger">
                {submitting ? 'Processing…' : 'Sell'}
              </button>
            </div>
            {success && <div className="text-emerald-600 text-sm">{success}</div>}
            {error && <div className="text-rose-600 text-sm">{error}</div>}
          </form>
        </div>

        {/* Holdings card */}
        <div className="card-padded">
          <h2 className="title">Holdings</h2>
          {loading ? <p className="subtitle">Loading...</p> : (
            <div className="overflow-x-auto mt-3">
              <table className="table">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="th">Symbol</th>
                    <th className="th">Quantity</th>
                    <th className="th">Avg Price</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.holdings?.map(h => (
                    <tr key={h.symbol} className="row">
                      <td className="td font-semibold">{h.symbol}</td>
                      <td className="td">{h.quantity}</td>
                      <td className="td">{h.avgPrice}</td>
                    </tr>
                  ))}
                  {(!portfolio.holdings || portfolio.holdings.length === 0) && (
                    <tr><td className="td" colSpan={3}>No holdings.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* History table */}
      <section className="card-padded">
        <h2 className="title">Trade History</h2>
        {loading ? <p className="subtitle">Loading...</p> : (
          <div className="overflow-x-auto mt-3">
            <table className="table">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="th">Type</th>
                  <th className="th">Symbol</th>
                  <th className="th">Qty</th>
                  <th className="th">Price</th>
                  <th className="th">Time</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.history?.slice().reverse().map((t, idx) => (
                  <tr key={idx} className="row">
                    <td className="td">{t.side === 'BUY' ? <span className="badge-buy">Buy</span> : <span className="badge-sell">Sell</span>}</td>
                    <td className="td font-semibold">{t.symbol}</td>
                    <td className="td">{t.quantity}</td>
                    <td className="td">{t.price}</td>
                    <td className="td">{new Date(t.at).toLocaleString()}</td>
                  </tr>
                ))}
                {(!portfolio.history || portfolio.history.length === 0) && (
                  <tr><td className="td" colSpan={5}>No trades yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}
