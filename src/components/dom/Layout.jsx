'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

export function Layout({ children }) {
  const ref = useRef(null)
  const [sceneEnabled, setSceneEnabled] = useState(false)
  const [scenePaused, setScenePaused] = useState(false)

  useEffect(() => {
    const enableScene = () => setSceneEnabled(true)
    window.addEventListener('hospital-enable-3d', enableScene)
    return () => window.removeEventListener('hospital-enable-3d', enableScene)
  }, [])

  useEffect(() => {
    const target = document.getElementById('kalkulator-investasi')
    if (!target) return
    const observer = new IntersectionObserver(([entry]) => setScenePaused(entry.isIntersecting), { rootMargin: '180px 0px' })
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="app-shell">
      {sceneEnabled && !scenePaused ? <Scene eventSource={ref} /> : null}
      <div className="dom-layer">{children}</div>
    </div>
  )
}
