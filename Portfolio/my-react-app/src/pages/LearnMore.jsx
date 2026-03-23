export default function LearnMore() {
  return (
    <main className="container-page py-10">
      <section className="relative overflow-hidden rounded-3xl bg-stone-50 dark:bg-slate-900/40 border border-stone-200/70 dark:border-slate-800 px-6 sm:px-10 py-10 sm:py-14 shadow-sm">
        <div className="grid items-center gap-10 md:gap-12 lg:gap-16 md:grid-cols-2">
          {/* Left: Text */}
          <div className="order-2 md:order-1">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Learn More</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
              Everything you need
              <span className="block mt-1 text-slate-700 dark:text-slate-200">to practice and analyze.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-prose">
              This app helps you simulate trades, track your portfolio, and understand performance.
              Use paper trading to buy and sell with virtual funds. View holdings and trade history,
              monitor profit/loss, and explore daily charts powered by Alpha Vantage.
            </p>
            <ul className="mt-6 space-y-2 text-slate-600 dark:text-slate-400">
              <li>• Paper Trading with a $100,000 virtual balance</li>
              <li>• Portfolio tracking with quantities and buy prices</li>
              <li>• Profit/Loss overview with per-stock and total P/L</li>
              <li>• Daily charts to visualize trends (backend-fetched, cached)</li>
              <li>• Secure login via Google OAuth and JWT</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/portfolio" className="btn rounded-full btn-primary shadow-sm">Go to Portfolio</a>
              <a href="/paper-trading" className="btn rounded-full btn-ghost">Try Paper Trading</a>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="order-1 md:order-2">
            <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
              <div className="aspect-[4/3] rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-stone-200/70 dark:border-slate-800 p-4 sm:p-6">
                <img
                  className="w-full h-full object-contain"
                  src="/Finance.png"
                  alt="Illustration of analytics and portfolio"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Soft decorative shapes */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-sky-100/50 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl"></div>
      </section>
    </main>
  )
}
