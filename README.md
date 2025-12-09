# Secret Santa Web App

Simple church Secret Santa site: participants register, an admin generates matches, and people can view who they are gifting. Built with React + Vite + Tailwind v4 + Supabase client.

## Quick start

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env` and fill in your Supabase project keys:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Optional notification keys (for edge functions): `RESEND_API_KEY`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`.

## App structure

- `src/pages/Landing.tsx` – entry page with CTAs
- `src/pages/Register.tsx` – form to collect participant info
- `src/pages/Match.tsx` – lookup page to see your assignment by email
- `src/pages/Admin.tsx` – buttons to trigger matching and notifications
- `src/api.ts` – thin Supabase client helpers
- `src/supabaseClient.ts` – creates Supabase client from env

## Expected Supabase tables (minimal)

- `participants`: `id` (uuid), `full_name` (text), `email` (text), `phone` (text), `notes` (text), `created_at` (timestamptz)
- `matches` (or an `assignments_view`): `giver_id`, `receiver_id`, `receiver_name`, `receiver_email`, `receiver_phone`
- RPC `generate_matches` to create pairs; RPC `send_notifications` to email/SMS assignments.

## Dev commands

- `npm run dev` – start Vite dev server
- `npm run build` – type-check and build
- `npm run preview` – preview production build

## Deployment

Deploy frontend to Vercel (or Netlify). Set the same env vars there. Use Supabase Edge Functions for `generate_matches` and `send_notifications` implementations.
