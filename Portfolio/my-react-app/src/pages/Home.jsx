import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-900 border-b border-stone-200/70 dark:border-slate-800">
        <div className="container-page py-20 sm:py-24">
          <div className="grid items-center gap-12 lg:gap-16 md:grid-cols-2">
            {/* Left: Hero Content */}
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                Smart Virtual Trading Platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                Master Trading.
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Risk-Free Learning.
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-400 max-w-prose">
                Practice trading with virtual money, track your portfolio performance, and learn market strategies—all in one comprehensive platform designed for beginners and students.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/paper-trading" className="btn rounded-full btn-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                  Start Trading
                </Link>
                <Link to="/portfolio" className="btn rounded-full btn-ghost border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800">
                  View Portfolio
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400">✓</span>
                  </span>
                  No Real Money
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400">✓</span>
                  </span>
                  Real Market Data
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400">✓</span>
                  </span>
                  Expert Analytics
                </div>
              </div>
            </div>

            {/* Right: Hero Visual */}
            <div className="order-1 md:order-2">
              <div className="relative mx-auto w-full max-w-lg">
                <div className="aspect-[4/3] rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-stone-200/70 dark:border-slate-800 p-6">
                  <div className="h-full flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <span className="text-white text-2xl font-bold">📈</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Live Trading Simulator</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 text-center px-4">Experience real market dynamics without financial risk</p>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-2xl opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-indigo-200 dark:bg-indigo-800 rounded-xl opacity-60 animate-pulse delay-75"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 bg-gradient-to-br from-blue-100/30 to-transparent dark:from-blue-900/20 rounded-full blur-3xl"></div>
        <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 bg-gradient-to-tr from-indigo-100/30 to-transparent dark:from-indigo-900/20 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Powerful Features for Smart Learning
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to practice trading, analyze performance, and build confidence in the market.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Paper Trading Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 border border-sky-200 dark:border-sky-800 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <span className="text-white text-xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">Paper Trading</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Practice buying and selling stocks with virtual money in real market conditions. Build strategies without financial risk.
              </p>
              <div className="mt-4 text-sky-600 dark:text-sky-400 font-medium text-sm group-hover:text-sky-700 dark:group-hover:text-sky-300">
                Start Practice →
              </div>
            </div>

            {/* Portfolio Tracking Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <span className="text-white text-xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">Portfolio Tracking</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Monitor your virtual investments, track holdings, and get real-time updates on your portfolio performance.
              </p>
              <div className="mt-4 text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300">
                View Portfolio →
              </div>
            </div>

            {/* Profit/Loss Analytics Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border border-indigo-200 dark:border-indigo-800 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <span className="text-white text-xl">📈</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">P&L Analytics</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Detailed profit and loss analysis with charts, trends, and insights to understand your trading performance.
              </p>
              <div className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium text-sm group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                Analyze Performance →
              </div>
            </div>

            {/* Real-time Charts Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-cyan-800 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <span className="text-white text-xl">📉</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">Live Charts</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Real-time stock charts with technical indicators, price movements, and interactive visualizations.
              </p>
              <div className="mt-4 text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300">
                View Charts →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Get started with virtual trading in four simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">Create Account</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Sign up for free and get instant access to virtual trading account with $100,000 practice money.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">Explore Markets</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Browse real stocks, check prices, and research companies using live market data.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">Practice Trading</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Buy and sell stocks with virtual money, test strategies, and learn from your trades.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="relative mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 shadow-lg">
                4
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">Track Progress</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Analyze your performance, learn from mistakes, and improve your trading skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Perfect for Beginners & Students
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Learn trading fundamentals in a safe, educational environment
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Beginners Benefits */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">🎓</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">For Beginners</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">Zero financial risk while learning</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">Real market conditions and data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">Step-by-step trading guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">Build confidence before real trading</span>
                </li>
              </ul>
            </div>

            {/* Students Benefits */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">For Students</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">Practical finance education</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">Portfolio management skills</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">Risk management learning</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">Market analysis experience</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Live Preview Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Live Platform Preview
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              See what your trading dashboard looks like
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-slate-800 overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-xl font-bold">Trading Dashboard</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-white text-sm">Live Market Data</span>
                  </div>
                </div>
              </div>
              
              {/* Dashboard Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Portfolio Stats */}
                  <div className="md:col-span-1">
                    <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Portfolio Stats</h4>
                    <div className="space-y-3">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Total Value</p>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">$125,430</p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">+12.5%</p>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Today's P&L</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">+$2,340</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">+1.9%</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chart Preview */}
                  <div className="md:col-span-2">
                    <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Performance Chart</h4>
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-2xl">📈</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">Interactive Chart Visualization</p>
                        <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">Real-time price movements & trends</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recent Trades */}
                <div className="mt-6">
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Recent Trades</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-200/60 dark:border-blue-800/60">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-blue-700 dark:text-blue-300">AAPL</span>
                        <span className="text-green-600 dark:text-green-400 text-sm">BUY</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">10 shares @ $175.20</p>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">+2.3%</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-red-700 dark:text-red-300">TSLA</span>
                        <span className="text-red-600 dark:text-red-400 text-sm">SELL</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">5 shares @ $242.80</p>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">-1.2%</p>
                    </div>
                    <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-200/60 dark:border-blue-800/60">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-blue-700 dark:text-blue-300">GOOGL</span>
                        <span className="text-green-600 dark:text-green-400 text-sm">BUY</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">8 shares @ $138.50</p>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">+3.7%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Real experiences from students and beginners who learned trading with our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4 italic">
                "This platform helped me understand stock trading without risking real money. The analytics are amazing and the interface is so intuitive!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Shravani Karande</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Information Technology Student</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4 italic">
                "As a complete beginner, I was nervous about trading. This platform gave me the confidence to practice and learn. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Aashish Gupta</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Computer Science Student</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4 italic">
                "The real-time data and portfolio tracking features are incredible. I've learned so much about market trends and risk management."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Priyansh </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Finanace Major</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-slate-900 text-white border-t border-slate-800">
        <div className="container-page py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-400">About Platform</h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                Smart Virtual Trading & Portfolio Insight System is designed to help beginners and students learn trading in a risk-free environment.
              </p>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📈</span>
                </span>
                <span className="font-bold">SmartTrade</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-400">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/paper-trading" className="text-slate-400 hover:text-blue-400 transition-colors">Paper Trading</Link></li>
                <li><Link to="/portfolio" className="text-slate-400 hover:text-blue-400 transition-colors">Portfolio</Link></li>
                <li><Link to="/profit-loss" className="text-slate-400 hover:text-blue-400 transition-colors">Analytics</Link></li>
                <li><Link to="/learn-more" className="text-slate-400 hover:text-blue-400 transition-colors">Learn More</Link></li>
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-400">Technology</h3>
              <ul className="space-y-2 text-slate-400">
                <li>• React.js Frontend</li>
                <li>• Tailwind CSS Styling</li>
                <li>• Real-time Market Data</li>
                <li>• Interactive Charts</li>
                <li>• Secure Authentication</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-400">Get Started</h3>
              <p className="text-slate-400 mb-4">
                Join thousands of students learning trading safely.
              </p>
              <div className="space-y-3">
                <Link to="/login" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Start Free Trading
                </Link>
                <p className="text-sm text-slate-500 text-center">
                  No credit card required
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Smart Virtual Trading Platform. Educational purposes only.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Home
