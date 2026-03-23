import { useEffect, useState } from 'react'
import { apiGet } from '../utils/api.js'

export default function ProfitLoss() {
  // Align with backend canonical response { totalPL, stocks: [...] }
  const [data, setData] = useState({ stocks: [], totalPL: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        // Fetch from canonical endpoint which computes P/L from tracked stocks in DB
        const res = await apiGet('/api/profit-loss')
        if (!mounted) return
        setData(res)
      } catch (e) {
        setError('Failed to load profit/loss')
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <main className="container-page py-6">
      <div className="card-padded">
        <h1 className="title">Profit / Loss</h1>
        {loading && <p className="subtitle">Loading...</p>}
        {error && <p className="subtitle text-rose-600">{error}</p>}
        {!loading && !error && (
          <>
            <div className="overflow-x-auto mt-3">
              <table className="table">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="th">Symbol</th>
                    <th className="th">Buy</th>
                    <th className="th">Qty</th>
                    <th className="th">Current</th>
                    <th className="th">P/L</th>
                  </tr>
                </thead>
                <tbody>
                  {data.stocks.map(it => (
                    <tr key={it.symbol} className="row">
                      <td className="td font-semibold">{it.symbol}</td>
                      <td className="td">{it.error ? '-' : it.buyPrice}</td>
                      <td className="td">{it.error ? '-' : it.quantity}</td>
                      <td className="td">{it.error ? <span className="text-rose-600">Quote unavailable</span> : it.currentPrice}</td>
                      <td className="td">
                        {!it.error && (
                          <span className={it.profit >= 0 ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                            {it.profit >= 0 ? '+' : ''}{it.profit.toFixed(2)}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {data.stocks.length === 0 && (
                    <tr><td className="td" colSpan={5}>No tracked stocks.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <strong>Total P/L:</strong>
              <span className={data.totalPL >= 0 ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                {data.totalPL >= 0 ? '+' : ''}{data.totalPL.toFixed(2)}
              </span>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
