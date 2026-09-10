import './globals.css'
import { Layout } from '@/components/dom/Layout'

export const metadata = {
  title: 'RS Subang Raya — Presentasi Investor',
  description: 'Presentasi investor interaktif RS Subang Raya: skala proyek, ekonomi budgetary, sensitivitas pendanaan, kontrol kesiapan, dan pengalaman konsep.',
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
