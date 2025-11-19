import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Revenue Studio - Turn Your Existing Marketing into a Predictable Revenue Engine',
  description: 'We plug into your current website, ads and follow-up, then use AI to fix the leaks — so more of the clicks you are already paying for turn into actual customers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
