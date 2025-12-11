import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { runMatchingAlgorithm, sendNotifications, fetchParticipants } from '../api'
import { Users, Shuffle, Bell, LogOut } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { AlertDialog } from '../components/ui/alert-dialog'
import { useAuth } from '../context/AuthContext'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('participants')
  const [participants, setParticipants] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [showMatchDialog, setShowMatchDialog] = useState(false)
  const { logoutAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutAdmin()
    navigate('/')
  }

  useEffect(() => {
    loadParticipants()
  }, [])

  async function loadParticipants() {
    const result = await fetchParticipants()
    if (result.success && result.data) {
      setParticipants(result.data)
    }
  }

  async function handleMatch() {
    setLoading(true)
    setStatus(null)
    const result = await runMatchingAlgorithm()
    if (!result.success) {
      setStatus(`Error: ${result.message}`)
    } else {
      setStatus(result.message ?? 'Matching completed successfully!')
      setShowMatchDialog(false)
    }
    setLoading(false)
  }

  async function handleNotify() {
    setLoading(true)
    setStatus(null)
    const result = await sendNotifications()
    if (!result.success) {
      setStatus(`Error: ${result.message}`)
    } else {
      setStatus(result.message ?? 'Notifications sent!')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-church-bg flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-church-border hidden md:flex flex-col">
        <div className="p-6 border-b border-church-border">
          <h2 className="text-xl font-bold text-church-gold">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant={activeTab === 'participants' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('participants')}
          >
            <Users className="mr-2 h-4 w-4" />
            Participants
          </Button>
          <Button
            variant={activeTab === 'matching' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('matching')}
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Matching
          </Button>
          <Button
            variant={activeTab === 'notifications' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('notifications')}
          >
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
        </nav>
        <div className="p-4 border-t border-church-border">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex justify-between items-center md:hidden mb-6">
             <h2 className="text-xl font-bold text-church-gold">Admin Panel</h2>
             <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
          </div>

          {status && (
            <div className={`p-4 rounded-md ${
              status.startsWith('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
            }`}>
              {status}
            </div>
          )}

          {activeTab === 'participants' && (
            <Card>
              <CardHeader>
                <CardTitle>Participants</CardTitle>
                <CardDescription>Manage registered users for the event.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participants.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                          No participants found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      participants.map((p, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{p.full_name}</TableCell>
                          <TableCell>{p.email}</TableCell>
                          <TableCell>{p.phone || '-'}</TableCell>
                          <TableCell className="max-w-xs truncate">{p.notes || '-'}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeTab === 'matching' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Matches</CardTitle>
                  <CardDescription>
                    Run the algorithm to pair participants. This will shuffle and assign a Secret Santa to everyone.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="h-24 w-24 bg-church-gold/10 rounded-full flex items-center justify-center">
                      <Shuffle className="h-12 w-12 text-church-gold" />
                    </div>
                    <Button size="lg" onClick={() => setShowMatchDialog(true)} className="w-full max-w-xs">
                      Generate Matches
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Send Notifications</CardTitle>
                <CardDescription>
                  Email everyone their assigned match.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="h-24 w-24 bg-church-gold/10 rounded-full flex items-center justify-center">
                    <Bell className="h-12 w-12 text-church-gold" />
                  </div>
                  <Button size="lg" onClick={handleNotify} disabled={loading} className="w-full max-w-xs">
                    {loading ? 'Sending...' : 'Send All Notifications'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <AlertDialog
        open={showMatchDialog}
        onOpenChange={setShowMatchDialog}
        title="Generate Matches?"
        description="This will overwrite any existing matches. Are you sure you want to proceed?"
        onConfirm={handleMatch}
        loading={loading}
      />
    </div>
  )
}
