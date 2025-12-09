import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white/80 backdrop-blur rounded-3xl shadow-sm border border-slate-200 p-10">
        <p className="text-sm font-semibold text-indigo-500 mb-3">Church Secret Santa</p>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Spread joy with a simple gift exchange</h1>
        <p className="text-slate-600 mb-8">
          Register to be matched with someone in the community. On matching day, you&apos;ll get the name of the person you will bless with a gift.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-indigo-700 transition"
          >
            Join the exchange
          </Link>
          <Link
            to="/match"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-slate-800 font-semibold border border-slate-200 hover:border-indigo-200 hover:text-indigo-700 transition"
          >
            View my match
          </Link>
          <Link
            to="/admin"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition"
          >
            Admin dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
