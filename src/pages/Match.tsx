import { useState, type FormEvent } from 'react'
import { type Assignment, fetchAssignment } from '../api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Gift, Search } from 'lucide-react'

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
    <div className="min-h-screen bg-church-bg py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Card className="max-w-md w-full mx-auto shadow-sm border-church-border">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 bg-church-gold/10 rounded-full flex items-center justify-center mb-4">
            <Gift className="h-6 w-6 text-church-gold" />
          </div>
          <CardTitle className="text-2xl font-bold text-church-text">Your Gift Match 🎁</CardTitle>
          <CardDescription>
            Enter your email to reveal your Secret Santa assignment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!assignment ? (
            <form onSubmit={handleLookup} className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={loading}>
                  {loading ? <span className="animate-pulse">...</span> : <Search className="h-4 w-4" />}
                </Button>
              </div>
              
              {status && (
                <div className={`p-3 rounded-md text-sm text-center ${
                  status.startsWith('Error') || status.includes('No assignment')
                    ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' 
                    : 'bg-green-50 text-green-700 border border-green-100'
                }`}>
                  {status}
                </div>
              )}
            </form>
          ) : (
            <div className="space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="bg-church-gold/5 rounded-xl p-6 border border-church-gold/20 text-center">
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">You are gifting to</p>
                <h3 className="text-3xl font-bold text-church-text mb-1">{assignment.receiver_name}</h3>
                {assignment.receiver_email && (
                  <p className="text-sm text-gray-400">{assignment.receiver_email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-church-text flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-church-gold mr-2"></span>
                  Likes & Interests
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg text-gray-600 text-sm italic border border-gray-100">
                  "{assignment.receiver_notes || "No specific preferences listed. Surprise them!"}"
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setAssignment(null)
                  setEmail('')
                }}
              >
                Check Another
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
