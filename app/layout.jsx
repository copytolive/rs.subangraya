import './globals.css'
import { Layout } from '@/components/dom/Layout'
import KalkulatorInvestasi from './KalkulatorInvestasi'

export const metadata = {
  title: 'RS Subang Raya — Presentasi Investor',
  description: 'Presentasi investor interaktif RS Subang Raya dengan skenario utama pembiayaan tanpa utang bank, kalkulator pembagian saham dan keuntungan investor, anggaran indikatif, kesiapan proyek, dan pengalaman konsep.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Layout>{children}</Layout>
        <KalkulatorInvestasi />
      </body>
    </html>
  )
}
