import { getSupabaseClient } from './supabaseClient'

export type ParticipantInput = {
  fullName: string
  email: string
  phone?: string
  notes?: string
}

export type Participant = ParticipantInput & {
  id: string
  created_at?: string
}

export type Assignment = {
  giver_id: string
  receiver_id: string
  receiver_name: string
  receiver_email?: string
  receiver_phone?: string
}

export async function registerParticipant(input: ParticipantInput) {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return {
      success: true,
      mock: true,
      message: 'Supabase env vars missing. Registration mocked locally.',
    }
  }

  const { error } = await supabase.from('participants').insert({
    full_name: input.fullName,
    email: input.email,
    phone: input.phone ?? null,
    notes: input.notes ?? null,
  })

  if (error) {
    return { success: false, message: error.message }
  }

  return { success: true, message: 'Registered!' }
}

export async function fetchAssignment(email: string) {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return {
      success: true,
      mock: true,
      assignment: {
        giver_id: 'local-giver',
        receiver_id: 'local-receiver',
        receiver_name: 'Sample Match',
        receiver_email: 'sample@example.com',
      },
    }
  }

  const { data, error } = await supabase
    .from('assignments_view')
    .select('giver_id, receiver_id, receiver_name, receiver_email, receiver_phone')
    .eq('giver_email', email)
    .maybeSingle()

  if (error) {
    return { success: false, message: error.message }
  }

  return { success: true, assignment: data as Assignment | null }
}

export async function triggerMatching() {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return { success: true, mock: true, message: 'Matching simulated locally.' }
  }

  const { error } = await supabase.rpc('generate_matches')

  if (error) {
    return { success: false, message: error.message }
  }

  return { success: true, message: 'Matches generated.' }
}

export async function triggerNotifications() {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return { success: true, mock: true, message: 'Notifications simulated locally.' }
  }

  const { error } = await supabase.rpc('send_notifications')

  if (error) {
    return { success: false, message: error.message }
  }

  return { success: true, message: 'Notifications sent.' }
}
