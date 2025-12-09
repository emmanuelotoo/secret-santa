import { useState, type FormEvent } from 'react'
import { registerParticipant } from '../api'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Button } from '../components/ui/button'

export default function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    const result = await registerParticipant({ fullName, email, phone, notes })
    if (!result.success) {
      setStatus(`Error: ${result.message}`)
    } else {
      setStatus(result.message ?? 'Registered successfully!')
      setFullName('')
      setEmail('')
      setPhone('')
      setNotes('')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-church-bg py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Card className="max-w-md w-full mx-auto shadow-sm border-church-border">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-church-text">Join the Gift Match</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Enter your details to participate in the Secret Santa event.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input
                id="full-name"
                placeholder="Jane Doe"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="jane@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Likes & Interests</Label>
              <Textarea
                id="notes"
                placeholder="I love books, coffee, and gardening..."
                className="min-h-[100px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            
            {status && (
              <div className={`p-3 rounded-md text-sm ${
                status.startsWith('Error') 
                  ? 'bg-red-50 text-red-700 border border-red-100' 
                  : 'bg-green-50 text-green-700 border border-green-100'
              }`}>
                {status}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-xs text-gray-400 text-center">
            By registering, you agree to participate in the gift exchange.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
