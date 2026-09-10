import './globals.css'
import { Layout } from '@/components/dom/Layout'

export const metadata = {
  title: 'RS Subang Raya — Presentasi Investor',
  description: 'Presentasi investor interaktif RS Subang Raya: skala proyek, anggaran indikatif, skenario pendanaan, kesiapan proyek, pengendalian risiko, dan pengalaman konsep.',
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
