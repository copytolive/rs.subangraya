'use client'

import { useEffect } from 'react'

const BASE_PATH = '/rs.subangraya/'

function bersihkanUrl() {
  if (typeof window === 'undefined') return
  if (window.location.pathname === BASE_PATH && (window.location.hash || window.location.search)) {
    window.history.replaceState(null, '', BASE_PATH)
  }
}

export function PenjagaUrl() {
  useEffect(() => {
    bersihkanUrl()
    window.addEventListener('hashchange', bersihkanUrl)
    window.addEventListener('popstate', bersihkanUrl)
    return () => {
      window.removeEventListener('hashchange', bersihkanUrl)
      window.removeEventListener('popstate', bersihkanUrl)
    }
  }, [])
  return null
}

export function TombolScroll({ target, className = '', children, ariaLabel }) {
  const pindah = () => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', BASE_PATH)
  }
  return <button type="button" className={className} onClick={pindah} aria-label={ariaLabel}>{children}</button>
}
