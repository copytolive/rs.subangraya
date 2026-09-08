import '@/app/globals.css'
import { Layout } from '@/components/dom/Layout'

export const metadata = {
  title: 'RS Subang Raya — Immersive Investor Presentation',
  description: 'Interactive 3D investor presentation for RS Subang Raya / RS HARVA.',
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
