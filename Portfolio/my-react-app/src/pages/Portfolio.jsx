import { useEffect, useMemo, useState } from 'react'
import { apiGet, apiPost } from '../utils/api.js'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import { useTheme } from '../state/ThemeContext.jsx'

export default function Portfolio() {
  const { theme } = useTheme()
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [symbol, setSymbol] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [buyDate, setBuyDate] = useState('')
  const [quantity, setQuantity] = useState('')

  const [chartSymbol, setChartSymbol] = useState('')
  const [chartData, setChartData] = useState([])
  const [chartLoading, setChartLoading] = useState(false)
  const [chartError, setChartError] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        const data = await apiGet('/api/stocks')
        if (!mounted) return
        setStocks(data)
      } catch (e) {
        setError('Failed to load stocks')
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  async function addStock(e) {
    e.preventDefault()
    setError('')
    try {
      await apiPost('/api/stocks', { symbol, buyPrice: Number(buyPrice), buyDate, quantity: Number(quantity) })
      const data = await apiGet('/api/stocks')
      setStocks(data)
      setSymbol(''); setBuyPrice(''); setBuyDate(''); setQuantity('')
    } catch (e) {
      setError('Failed to add stock')
    }
  }

  // Load and parse chart data for the selected symbol
  async function loadChart(sym) {
    setChartSymbol(sym)
    setChartError('')
    setChartLoading(true)
    try {
      const res = await apiGet(`/api/charts?symbol=${encodeURIComponent(sym)}`)
      // Defensive: ensure array of {date, close}
      if (!res || !Array.isArray(res.data) || res.data.length === 0) {
        setChartData([])
        setChartError('No data available for this symbol (Alpha Vantage limit or missing series).')
      } else {
        setChartData(res.data)
      }
    } catch (e) {
      setChartError('Failed to load chart data. Please try again later.')
      setChartData([])
    } finally {
      setChartLoading(false)
    }
  }

  const canSubmit = useMemo(() => symbol && buyPrice && buyDate && quantity, [symbol, buyPrice, buyDate, quantity])

  return (
    <main className="container-page py-6 grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1 space-y-4">
        <div className="card-padded">
          <h1 className="title">Portfolio</h1>
          <p className="subtitle">Track stocks once; we’ll use Alpha Vantage for quotes and charts.</p>
          <form onSubmit={addStock} className="mt-4 grid gap-3">
            <div>
              <div className="label">Symbol</div>
              <input className="input" placeholder="e.g., AAPL" value={symbol} onChange={e => setSymbol(e.target.value.toUpperCase())} />
            </div>
            <div>
              <div className="label">Buy Price</div>
              <input className="input" placeholder="e.g., 185.50" type="number" step="0.01" value={buyPrice} onChange={e => setBuyPrice(e.target.value)} />
            </div>
            <div>
              <div className="label">Buy Date</div>
              <input className="input" type="date" value={buyDate} onChange={e => setBuyDate(e.target.value)} />
            </div>
            <div>
              <div className="label">Quantity</div>
              <input className="input" placeholder="e.g., 10" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
            </div>
            <button disabled={!canSubmit} type="submit" className="btn btn-primary">Add Stock</button>
            {error && <div className="text-rose-600 text-sm">{error}</div>}
          </form>
        </div>

        <div className="card-padded">
          <h2 className="title">Tracked Stocks</h2>
          {loading ? <p className="subtitle">Loading...</p> : (
            <ul className="mt-3 space-y-2">
              {stocks.map(s => (
                <li key={s.symbol} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{s.symbol}</span>
                    <span className="subtitle">Qty: {s.quantity}</span>
                    <span className="subtitle">Buy: {s.buyPrice}</span>
                  </div>
                  <button className="btn btn-ghost" onClick={() => loadChart(s.symbol)}>View Chart</button>
                </li>
              ))}
              {stocks.length === 0 && <li className="subtitle">No tracked stocks yet.</li>}
            </ul>
          )}
        </div>
      </div>

      <div className="lg:col-span-2 card-padded">
        <div className="flex items-center justify-between mb-2">
          <h3 className="title">{chartSymbol ? `${chartSymbol} Daily Close` : 'Select a stock to view chart'}</h3>
        </div>
        <div className="w-full h-80">
          {chartLoading && <p className="subtitle">Loading chart...</p>}
          {!chartLoading && chartError && <p className="subtitle text-rose-600">{chartError}</p>}
          {!chartLoading && !chartError && chartData.length === 0 && (
            <p className="subtitle">Select a stock to view chart</p>
          )}
          {!chartLoading && !chartError && chartData.length > 0 && (
            <ResponsiveContainer>
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#1f2937' : '#e2e8f0'} />
                <XAxis dataKey="date" tick={{ fill: theme === 'dark' ? '#cbd5e1' : '#475569', fontSize: 12 }} tickMargin={8} />
                <YAxis domain={['auto','auto']} tick={{ fill: theme === 'dark' ? '#cbd5e1' : '#475569', fontSize: 12 }} width={60} />
                <Tooltip contentStyle={{ borderRadius: 8, borderColor: theme === 'dark' ? '#334155' : '#cbd5e1', backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', color: theme === 'dark' ? '#e2e8f0' : '#0f172a' }} />
                <Line type="monotone" dataKey="close" stroke="#0ea5e9" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </main>
  )
}
