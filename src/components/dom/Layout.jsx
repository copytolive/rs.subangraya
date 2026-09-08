'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

export function Layout({ children }) {
  const ref = useRef(null)

  return (
    <div ref={ref} className="app-shell">
      <Scene eventSource={ref} />
      <div className="dom-layer">{children}</div>
    </div>
  )
}
