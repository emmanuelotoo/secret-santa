import { useState, type FormEvent } from 'react'
import { type Assignment, fetchAssignment } from '../api'

export default function Match() {
  const [email, setEmail] = useState('')
  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLookup(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    setAssignment(null)
    const result = await fetchAssignment(email)
    if (!result.success) {
      setStatus(`Error: ${result.message}`)
    } else if (!result.assignment) {
      setStatus('No assignment found yet. Check back after matching runs.')
    } else {
      setAssignment(result.assignment)
      setStatus(null)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white/80 backdrop-blur rounded-3xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Find your match</h2>
        <p className="text-slate-600 mb-6">Enter the email you registered with to see who you are gifting.</p>

        <form onSubmit={handleLookup} className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? 'Looking…' : 'Show match'}
          </button>
        </form>

        {status && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
            {status}
          </div>
        )}

        {assignment && (
          <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-4 text-slate-900">
            <p className="text-sm font-semibold text-indigo-700 mb-1">You are gifting</p>
            <p className="text-xl font-bold">{assignment.receiver_name}</p>
            {assignment.receiver_email && (
              <p className="text-sm text-slate-700">Email: {assignment.receiver_email}</p>
            )}
            {assignment.receiver_phone && (
              <p className="text-sm text-slate-700">Phone: {assignment.receiver_phone}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
