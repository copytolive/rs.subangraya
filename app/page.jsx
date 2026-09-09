'use client'

import { useEffect, useState } from 'react'

const research = [
  ['1JsUSXszzS7cZnSOI-RNjld2TgZNB9U9E', 'EXTERIOR', 'Arrival', 'Massa, canopy, drop-off dan identitas pertama.'],
  ['12vRJWURamhe6jNQ53txWG_XdJjcAb3UD', 'EXTERIOR', 'Frontage', 'Keterbacaan pintu masuk dari pendekatan utama.'],
  ['1kac-vTTfwsk83Z5DG6yukVKxGZ_CvzzI', 'PUBLIC', 'Main lobby', 'First impression, orientasi dan hospitality.'],
  ['1p-uL8NcxO-yvFfCeU6BEevxLRpmJJzWm', 'OUTPATIENT', 'Polyclinic', 'Registrasi, distribusi pasien dan waiting flow.'],
  ['1BHcW3jWcmdmRBuPvr8M_VV81k1ym4KTX', 'INPATIENT', 'Nurse station', 'Visibility, response time dan kontrol koridor.'],
  ['1TJ6I2QirbBphtIiunJdkvgYz66krQfoH', 'PATIENT', 'Patient room', 'Daylight, family support, privacy dan recovery.'],
  ['19Qg1sgP1OqZSKTDuaEBLccj8xEsNkq29', 'CRITICAL', 'ICU + HCU', 'Monitoring, clinical visibility dan infection control.'],
  ['1hU2P7TJCTpi5-zB_bRNvF1tDyAF1ffxl', 'SURGERY', 'Operating theatre', 'Restricted core, cleanability dan team movement.'],
  ['1r2a1GAr1zUZMhSQ60r0Ep7BQCi3eFLlr', 'DIAGNOSTIC', 'Imaging', 'Preparation, privacy dan equipment clearances.'],
  ['16jT4xUgZq1hwyU6Df5YNvemre-KSuNFN', 'PHARMACY', 'Pharmacy', 'Queue clarity, dispensing dan counter workflow.'],
  ['1L5dr2g9OZjMf4AUshcFhAcsQT6CLoUfp', 'EXECUTIVE', 'Executive lounge', 'Premium reception, privacy dan family experience.'],
  ['1hwf8B6EhwCUp-QFekiwEjXJbTB9ffNUi', 'AMENITY', 'Public lounge', 'Family dwell time dan non-clinical relief.'],
]

const chapters = [
  ['top', 'overview', 'hero'], ['investment', 'overview', 'light'], ['site', 'site', 'yellow'],
  ['clinical', 'explode', 'teal'], ['journey', 'journey', 'orange'], ['research', 'overview', 'dark'], ['roadmap', 'overview', 'light'],
]

const floorData = [
  ['L1', 'PUBLIC + OUTPATIENT', 'Lobby · registration · clinics · pharmacy'],
  ['L2', 'DIAGNOSTICS + EMERGENCY', 'Imaging · laboratory · acute route'],
  ['L3', 'SURGERY + CRITICAL CARE', 'OT · recovery · ICU/HCU'],
  ['L4', 'INPATIENT', 'Patient rooms · nurse station · family support'],
  ['L5', 'EXPANSION + EXECUTIVE', 'Additional beds · specialty · lounge'],
]

const journeySteps = ['ARRIVE', 'REGISTER', 'DIAGNOSE', 'TREAT', 'RECOVER', 'DISCHARGE']
const driveImage = (id, width = 2000) => `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`

function emit(name, detail) {
  window.dispatchEvent(new CustomEvent(name, { detail }))
}

export default function Home() {
  const [mode, setMode] = useState('overview')
  const [activeRoute, setActiveRoute] = useState('public')
  const [activeFloor, setActiveFloor] = useState(0)
  const [progress, setProgress] = useState(0)
  const [chapterIndex, setChapterIndex] = useState(0)
  const [viewer, setViewer] = useState(null)
  const [zoomed, setZoomed] = useState(false)

  const changeMode = (value) => { setMode(value); emit('hospital-mode', value) }
  const chooseRoute = (value) => { setActiveRoute(value); changeMode('site'); emit('hospital-route', value) }
  const chooseFloor = (index) => { setActiveFloor(index); changeMode('explode'); emit('hospital-floor', index) }
  const playJourney = () => { changeMode('journey'); emit('hospital-journey', Date.now()) }
  const jumpTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const openViewer = (id, tag, title, desc, index) => { setZoomed(false); setViewer({ id, tag, title, desc, index }) }
  const stepViewer = (index) => { const [id, tag, title, desc] = research[index]; setZoomed(false); setViewer({ id, tag, title, desc, index }) }

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = chapters.map(([id, nextMode, theme], index) => {
      const target = document.getElementById(id)
      if (!target) return null
      const observer = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return
        document.body.dataset.theme = theme
        setChapterIndex(index); setMode(nextMode); emit('hospital-mode', nextMode)
      }, { threshold: 0.56 })
      observer.observe(target)
      return observer
    })
    return () => observers.forEach((observer) => observer?.disconnect())
  }, [])

  useEffect(() => {
    document.body.style.overflow = viewer ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [viewer])

  return (
    <>
      <style>{`
        .research-image{height:auto!important;min-height:0!important;max-height:none!important;aspect-ratio:16/9;background:#0b1821!important}
        .research-image img{object-fit:contain!important;image-rendering:auto;transform:translateZ(0)}
        .research-card{contain:content}
        .viewer-media{background:#050b10!important;display:flex;align-items:center;justify-content:center;touch-action:pan-x pan-y pinch-zoom;-webkit-overflow-scrolling:touch}
        .viewer-media img{object-fit:contain!important;width:100%;height:100%;image-rendering:auto;transition:width .25s ease,height .25s ease;user-select:none;-webkit-user-drag:none}
        .viewer-media.zoomed{display:block;overflow:auto}
        .viewer-media.zoomed img{width:185%;height:auto;max-width:none;min-height:100%;object-fit:contain!important}
        .viewer-actions{display:flex!important;gap:7px!important}
        .viewer-actions button{font-size:15px!important;font-weight:900}
        .viewer-hd{position:absolute;left:20px;bottom:18px;z-index:4;padding:6px 8px;border-radius:999px;background:rgba(7,16,24,.78);color:#fff;font-size:8px;font-weight:950;letter-spacing:.12em;pointer-events:none}
        @media(max-width:759px){.research-card{flex-basis:92vw!important}.research-copy{padding-top:13px!important}.viewer{padding-left:6px!important;padding-right:6px!important}.viewer-media{border-radius:20px!important}.viewer-copy h3{font-size:26px!important}}
      `}</style>

      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <header className="topbar">
        <button className="brand" onClick={() => jumpTo('top')} aria-label="Kembali ke awal"><span className="brand-mark">+</span><span>RS SUBANG RAYA</span></button>
        <div className="chapter-chip"><b>{String(chapterIndex + 1).padStart(2, '0')}</b><span>/ 07</span></div>
      </header>

      <div className="story-dots" aria-hidden="true">{chapters.map(([id], index) => <button key={id} className={chapterIndex === index ? 'active' : ''} onClick={() => jumpTo(id)} />)}</div>

      <main className="story">
        <section id="top" className="chapter hero-chapter">
          <div className="scene-label"><i /> LIVE 3D HOSPITAL</div>
          <div className="hero-copy-card glass-card">
            <span className="micro">IMMERSIVE INVESTOR STORY</span><h1>CARE.<br/>BUILT<br/><em>TO GROW.</em></h1>
            <div className="hero-metrics"><span><b>136</b> BED TARGET</span><span><b>7</b> BIM LAYERS</span><span><b>3</b> PHASES</span></div>
            <button className="primary-action" onClick={() => jumpTo('investment')}><span>START STORY</span><b>↓</b></button>
          </div>
        </section>

        <section id="investment" className="chapter stage-chapter">
          <div className="stage-caption"><span>01</span><b>INVESTMENT</b></div>
          <div className="bottom-sheet cream-sheet"><span className="micro">LAND FIRST</span><h2>THE SITE<br/>IS THE<br/><em>FIRST ASSET.</em></h2><p>Legalitas, akses, utilitas, bentuk tapak dan ruang ekspansi dikunci sebelum modal bergerak.</p><div className="metric-strip"><div><b>01</b><span>LEGAL</span></div><div><b>02</b><span>ACCESS</span></div><div><b>03</b><span>GROWTH</span></div></div></div>
        </section>

        <section id="site" className="chapter stage-chapter site-chapter">
          <div className="stage-caption dark"><span>02</span><b>SITE FLOW</b></div>
          <div className="bottom-sheet yellow-sheet"><span className="micro">THREE ROUTES · ZERO COLLISION</span><h2>MOVE<br/><em>WITH PURPOSE.</em></h2><p>Sentuh jalur untuk menyorot sirkulasi langsung pada model 3D.</p><div className="route-selector">{[['public','PUBLIC','DROP-OFF + LOBBY'],['emergency','EMERGENCY','FAST ACUTE ROUTE'],['service','SERVICE','LOADING + WASTE']].map(([value,label,note]) => <button key={value} className={activeRoute === value ? `active ${value}` : ''} onClick={() => chooseRoute(value)}><i /><span><b>{label}</b><small>{note}</small></span></button>)}</div></div>
        </section>

        <section id="clinical" className="chapter clinical-chapter">
          <div className="stage-caption dark"><span>03</span><b>CLINICAL STACK</b></div>
          <div className="bottom-sheet teal-sheet clinical-sheet"><span className="micro">EXPLODED CARE</span><div className="clinical-heading"><h2>5 LEVELS.<br/><em>ONE SYSTEM.</em></h2><div><b>136</b><span>BEDS</span></div></div><div className="floor-carousel">{floorData.map(([n,title,body], index) => <button key={n} className={activeFloor === index ? 'active' : ''} onClick={() => chooseFloor(index)}><b>{n}</b><span><strong>{title}</strong><small>{body}</small></span></button>)}</div></div>
        </section>

        <section id="journey" className="chapter stage-chapter journey-chapter">
          <div className="stage-caption dark"><span>04</span><b>PATIENT JOURNEY</b></div>
          <div className="bottom-sheet orange-sheet"><span className="micro">ONE CONTINUOUS PATH</span><h2>FROM<br/>ARRIVAL TO<br/><em>RECOVERY.</em></h2><div className="journey-row">{journeySteps.map((step,index) => <div key={step}><b>{String(index + 1).padStart(2,'0')}</b><span>{step}</span></div>)}</div><button className="primary-action dark-action" onClick={playJourney}><span>PLAY 3D JOURNEY</span><b>▶</b></button></div>
        </section>

        <section id="research" className="chapter research-chapter">
          <div className="research-header"><span className="micro">05 · VISUAL RESEARCH</span><h2>12 DESIGN<br/><em>FRAMES.</em></h2><p>Swipe horizontal. Gambar tampil rasio asli 16:9. Tap untuk membuka viewer HD internal.</p></div>
          <div className="research-rail">{research.map(([id,tag,title,desc], index) => <button className="research-card" key={id} onClick={() => openViewer(id,tag,title,desc,index)}><div className="research-image"><img loading={index < 2 ? 'eager' : 'lazy'} decoding="async" src={driveImage(id, 2000)} alt={title} onError={(e) => { e.currentTarget.style.opacity = '0' }} /><span>{String(index + 1).padStart(2,'0')}</span><i>HD VIEW</i></div><div className="research-copy"><small>{tag}</small><h3>{title}</h3><p>{desc}</p></div></button>)}</div>
        </section>

        <section id="roadmap" className="chapter stage-chapter roadmap-chapter">
          <div className="stage-caption"><span>06</span><b>DELIVERY</b></div>
          <div className="bottom-sheet cream-sheet roadmap-sheet"><span className="micro">LAND TO LIVE</span><h2>6 GATES.<br/><em>ONE OPENING DAY.</em></h2><div className="roadmap-grid">{[['01','LAND'],['02','FEASIBILITY'],['03','CLINICAL'],['04','DED + BIM'],['05','PERMITS'],['06','BUILD']].map(([n,label]) => <div key={n}><b>{n}</b><span>{label}</span></div>)}</div><p className="disclaimer">Concept presentation. Kapasitas, biaya dan desain final dikunci melalui feasibility, survey, DED, BOQ, permit dan vendor quotation.</p><button className="primary-action" onClick={() => jumpTo('top')}><span>REPLAY STORY</span><b>↑</b></button></div>
        </section>
      </main>

      <nav className="mode-dock" aria-label="Kontrol 3D">{[['overview','◉','VIEW'],['explode','≡','FLOORS'],['site','↗','FLOW'],['journey','▶','JOURNEY']].map(([value,icon,label]) => <button key={value} className={mode === value ? 'active' : ''} onClick={() => changeMode(value)}><b>{icon}</b><span>{label}</span></button>)}</nav>

      {viewer && <div className="viewer" role="dialog" aria-modal="true" aria-label={viewer.title}>
        <div className="viewer-top"><div><small>{String(viewer.index + 1).padStart(2,'0')} / 12</small><b>{viewer.tag}</b></div><div className="viewer-actions"><button onClick={() => setZoomed((v) => !v)} aria-label={zoomed ? 'Perkecil gambar' : 'Perbesar gambar'}>{zoomed ? '−' : '+'}</button><button onClick={() => setViewer(null)} aria-label="Tutup viewer">×</button></div></div>
        <div className={`viewer-media ${zoomed ? 'zoomed' : ''}`}><img src={driveImage(viewer.id, 2400)} alt={viewer.title} /><span className="viewer-hd">HD · {zoomed ? 'ZOOM 185%' : 'FIT'}</span></div>
        <div className="viewer-copy"><span>{viewer.tag}</span><h3>{viewer.title}</h3><p>{viewer.desc}</p><div className="viewer-nav"><button disabled={viewer.index === 0} onClick={() => stepViewer(viewer.index - 1)}>← PREV</button><button disabled={viewer.index === research.length - 1} onClick={() => stepViewer(viewer.index + 1)}>NEXT →</button></div></div>
      </div>}
    </>
  )
}
