import './globals.css'
import { Layout } from '@/components/dom/Layout'

export const metadata = {
  title: 'RS Subang Raya — Investor Presentation',
  description: 'Interactive investor presentation for RS Subang Raya: project scale, budgetary economics, funding sensitivities, readiness controls, and concept experience.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
