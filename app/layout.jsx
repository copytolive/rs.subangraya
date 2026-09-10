import './globals.css'
import { Layout } from '@/components/dom/Layout'

export const metadata = {
  metadataBase: new URL('https://copytolive.github.io'),
  alternates: { canonical: '/rs.subangraya/' },
  title: 'RS Subang Raya — Presentasi Investor',
  description: 'Presentasi investor interaktif RS Subang Raya dengan 0% utang bank dan kalkulator satu investor berbasis angka model terkendali untuk porsi modal dan nilai ekuitas.',
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
