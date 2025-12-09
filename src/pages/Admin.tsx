import { useState } from 'react'
import { triggerMatching, triggerNotifications } from '../api'

export default function Admin() {
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handle(action: 'match' | 'notify') {
    setLoading(true)
    setStatus(null)
    const fn = action === 'match' ? triggerMatching : triggerNotifications
    const result = await fn()
    if (!result.success) {
      setStatus(`Error: ${result.message}`)
    } else {
      setStatus(result.message ?? 'Done!')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white/80 backdrop-blur rounded-3xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Admin dashboard</h2>
        <p className="text-slate-600 mb-6">Run matching and send notifications after registration closes.</p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => handle('match')}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? 'Working…' : 'Generate matches'}
          </button>
          <button
            onClick={() => handle('notify')}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-slate-900 font-semibold border border-slate-200 hover:border-indigo-200 disabled:opacity-60"
          >
            {loading ? 'Working…' : 'Send notifications'}
          </button>
        </div>

        {status && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
            {status}
          </div>
        )}
      </div>
    </div>
  )
}
