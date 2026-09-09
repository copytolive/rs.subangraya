'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

export function Layout({ children }) {
  const ref = useRef(null)
  const [sceneEnabled, setSceneEnabled] = useState(false)

  useEffect(() => {
    const enableScene = () => setSceneEnabled(true)
    window.addEventListener('hospital-enable-3d', enableScene)
    return () => window.removeEventListener('hospital-enable-3d', enableScene)
  }, [])

  return (
    <div ref={ref} className="app-shell">
      {sceneEnabled ? <Scene eventSource={ref} /> : null}
      <div className="dom-layer">{children}</div>
    </div>
  )
}
