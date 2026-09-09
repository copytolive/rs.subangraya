'use client'

import { useEffect, useState } from 'react'

const research = [
  { id:'1JsUSXszzS7cZnSOI-RNjld2TgZNB9U9E', tag:'EXTERIOR', title:'Arrival', lead:'Kesan pertama harus langsung terasa jelas, tenang, dan meyakinkan.', points:['DROP-OFF JELAS','CANOPY TEDUH','IDENTITAS KUAT'], tone:'#f5c842' },
  { id:'12vRJWURamhe6jNQ53txWG_XdJjcAb3UD', tag:'EXTERIOR', title:'Frontage', lead:'Fasad harus mudah dikenali sejak kendaraan mulai mendekat.', points:['SIGNAGE TERBACA','ARAH MASUK JELAS','SKALA RAMAH'], tone:'#f3eee4' },
  { id:'1kac-vTTfwsk83Z5DG6yukVKxGZ_CvzzI', tag:'PUBLIC', title:'Main Lobby', lead:'Begitu masuk, pasien langsung tahu ke mana harus bergerak.', points:['RESEPSIONIS TERLIHAT','WAITING NYAMAN','ORIENTASI MUDAH'], tone:'#6adbd2' },
  { id:'1p-uL8NcxO-yvFfCeU6BEevxLRpmJJzWm', tag:'OUTPATIENT', title:'Polyclinic', lead:'Registrasi dan ruang tunggu dibuat sederhana agar alur pasien tetap ringan.', points:['DAFTAR CEPAT','ANTRIAN TERBACA','KLINIK DEKAT'], tone:'#f5c842' },
  { id:'1BHcW3jWcmdmRBuPvr8M_VV81k1ym4KTX', tag:'INPATIENT', title:'Nurse Station', lead:'Perawat dapat melihat koridor dan merespons pasien tanpa banyak blind spot.', points:['VISIBILITAS','RESPON CEPAT','KORIDOR TENANG'], tone:'#f3eee4' },
  { id:'1TJ6I2QirbBphtIiunJdkvgYz66krQfoH', tag:'PATIENT', title:'Patient Room', lead:'Ruang rawat terasa terang, privat, dan tetap nyaman untuk keluarga.', points:['DAYLIGHT','PRIVASI','FAMILY SUPPORT'], tone:'#6adbd2' },
  { id:'19Qg1sgP1OqZSKTDuaEBLccj8xEsNkq29', tag:'CRITICAL', title:'ICU + HCU', lead:'Pengawasan intensif dibuat dekat, terlihat, dan efisien untuk tim klinis.', points:['MONITORING','AKSES CEPAT','INFECTION CONTROL'], tone:'#ff754f' },
  { id:'1hU2P7TJCTpi5-zB_bRNvF1tDyAF1ffxl', tag:'SURGERY', title:'Operating Theatre', lead:'Zona operasi ringkas, bersih, dan terkendali dari masuk sampai recovery.', points:['STERIL','ALUR TIM','RECOVERY DEKAT'], tone:'#6adbd2' },
  { id:'1r2a1GAr1zUZMhSQ60r0Ep7BQCi3eFLlr', tag:'DIAGNOSTIC', title:'Imaging', lead:'Pasien mudah masuk, siap diperiksa, lalu kembali ke alur utama.', points:['PRIVASI','CLEARANCE ALAT','AKSES MUDAH'], tone:'#f5c842' },
  { id:'16jT4xUgZq1hwyU6Df5YNvemre-KSuNFN', tag:'PHARMACY', title:'Pharmacy', lead:'Ambil obat menjadi tahap akhir yang cepat, terbaca, dan tidak membingungkan.', points:['COUNTER JELAS','ANTRIAN RINGKAS','DISPENSING EFISIEN'], tone:'#f3eee4' },
  { id:'1L5dr2g9OZjMf4AUshcFhAcsQT6CLoUfp', tag:'EXECUTIVE', title:'Executive Lounge', lead:'Layanan premium terasa privat tanpa terputus dari sistem rumah sakit.', points:['PRIVASI','HOSPITALITY','FAMILY COMFORT'], tone:'#6adbd2' },
  { id:'1hwf8B6EhwCUp-QFekiwEjXJbTB9ffNUi', tag:'AMENITY', title:'Public Lounge', lead:'Area non-klinis memberi keluarga ruang istirahat di tengah perjalanan perawatan.', points:['DUDUK NYAMAN','MAKAN RINGAN','RELIEF SPACE'], tone:'#f5c842' },
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
const driveImage = (id, width = 2200) => `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`

function emit(name, detail) {
  window.dispatchEvent(new CustomEvent(name, { detail }))
}

export default function Home() {
  const [mode, setMode] = useState('overview')
  const [activeRoute, setActiveRoute] = useState('public')
  const [activeFloor, setActiveFloor] = useState(0)
  const [progress, setProgress] = useState(0)
  const [chapterIndex, setChapterIndex] = useState(0)

  const changeMode = (value) => { setMode(value); emit('hospital-mode', value) }
  const chooseRoute = (value) => { setActiveRoute(value); changeMode('site'); emit('hospital-route', value) }
  const chooseFloor = (index) => { setActiveFloor(index); changeMode('explode'); emit('hospital-floor', index) }
  const playJourney = () => { changeMode('journey'); emit('hospital-journey', Date.now()) }
  const jumpTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

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

  return (
    <>
      <style>{`
        .visual-intro{background:#071018;color:#fff;display:flex;align-items:flex-end;padding-bottom:calc(var(--dock) + 30px)}
        .visual-intro .research-header{padding:18px 16px 6px}
        .visual-intro .research-header h2{font-size:clamp(52px,16vw,78px);line-height:.82;margin:10px 0 14px}
        .visual-intro .research-header p{max-width:360px;color:rgba(255,255,255,.66);font-size:13px;line-height:1.5}
        .visual-subslide{--slide:#f3eee4;position:relative;min-height:100svh;scroll-snap-align:start;background:#071018;color:#fff;padding:58px 0 calc(16px + env(safe-area-inset-bottom));display:grid;grid-template-rows:minmax(0,54svh) minmax(0,1fr);overflow:hidden}
        .visual-sub-media{position:relative;display:grid;place-items:center;background:#08141d;overflow:hidden}
        .visual-sub-media:after{content:'';position:absolute;inset:auto 0 0;height:28%;background:linear-gradient(transparent,rgba(7,16,24,.35));pointer-events:none}
        .visual-sub-media img{width:100%;height:100%;object-fit:contain;display:block;image-rendering:auto}
        .visual-index{position:absolute;z-index:4;left:14px;top:12px;display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:999px;background:rgba(7,16,24,.78);backdrop-filter:blur(14px);font-size:9px;font-weight:950;letter-spacing:.12em}
        .visual-index b{color:#f5c842}
        .visual-hint{position:absolute;z-index:4;right:14px;bottom:12px;padding:7px 9px;border-radius:999px;background:rgba(255,255,255,.88);color:#071018;font-size:8px;font-weight:950;letter-spacing:.1em}
        .visual-sub-copy{position:relative;z-index:3;margin:8px 10px 0;border-radius:30px;padding:17px 17px 16px;background:var(--slide);color:#071018;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 24px 60px rgba(0,0,0,.2)}
        .visual-sub-copy small{font-size:8px;font-weight:1000;letter-spacing:.16em;opacity:.56}
        .visual-sub-copy h3{font-size:clamp(34px,10vw,50px);line-height:.9;letter-spacing:-.055em;margin:6px 0 9px;text-transform:uppercase}
        .visual-sub-copy p{font-size:13px;line-height:1.42;margin:0;max-width:420px;font-weight:650}
        .visual-points{display:flex;flex-wrap:wrap;gap:6px;margin-top:13px;padding-right:48px}
        .visual-points span{border:1.4px solid currentColor;border-radius:999px;padding:7px 9px;font-size:7px;font-weight:1000;letter-spacing:.08em;white-space:nowrap}
        .visual-next{position:absolute;right:15px;bottom:15px;width:38px;height:38px;border-radius:50%;border:0;background:#071018;color:#fff;font-size:16px;font-weight:900;box-shadow:0 10px 24px rgba(7,16,24,.2)}
        .visual-progress{display:grid;grid-template-columns:repeat(12,1fr);gap:3px;margin-top:15px}
        .visual-progress i{height:3px;border-radius:99px;background:rgba(255,255,255,.18)}
        .visual-progress i:first-child{background:#f5c842}
        .mode-dock.visual-hidden{transform:translateY(130%);opacity:0;pointer-events:none}
        @media(min-width:760px){.visual-subslide{grid-template-columns:minmax(0,1.35fr) minmax(360px,.65fr);grid-template-rows:1fr;padding:74px 20px 20px;gap:12px}.visual-sub-copy{margin:0;border-radius:34px;padding:28px}.visual-sub-copy h3{font-size:64px}.visual-sub-copy p{font-size:16px}.visual-sub-media{border-radius:34px}.visual-next{width:48px;height:48px}}
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

        <section id="research" className="chapter visual-intro">
          <div className="research-header">
            <span className="micro">05 · VISUAL STORY</span>
            <h2>12 IMAGES.<br/><em>12 SIMPLE STORIES.</em></h2>
            <p>Setiap gambar berdiri sendiri. Satu tampilan, satu pesan, tiga hal penting yang langsung bisa dipahami.</p>
            <div className="visual-progress">{research.map((item,index) => <i key={item.id} style={index === 0 ? { background:'#f5c842' } : undefined} />)}</div>
          </div>
        </section>

        {research.map((item, index) => (
          <section id={`frame-${index + 1}`} className="visual-subslide" key={item.id} style={{ '--slide': item.tone }}>
            <div className="visual-sub-media">
              <img loading={index < 2 ? 'eager' : 'lazy'} decoding="async" src={driveImage(item.id, 2200)} alt={item.title} />
              <div className="visual-index"><b>05.{String(index + 1).padStart(2,'0')}</b><span>/ 12 · {item.tag}</span></div>
              <div className="visual-hint">HD IMAGE</div>
            </div>
            <div className="visual-sub-copy">
              <div>
                <small>{item.tag}</small>
                <h3>{item.title}</h3>
                <p>{item.lead}</p>
                <div className="visual-points">{item.points.map((point) => <span key={point}>{point}</span>)}</div>
              </div>
              <button className="visual-next" onClick={() => jumpTo(index === research.length - 1 ? 'roadmap' : `frame-${index + 2}`)} aria-label="Lanjut ke gambar berikutnya">↓</button>
            </div>
          </section>
        ))}

        <section id="roadmap" className="chapter stage-chapter roadmap-chapter">
          <div className="stage-caption"><span>06</span><b>DELIVERY</b></div>
          <div className="bottom-sheet cream-sheet roadmap-sheet"><span className="micro">LAND TO LIVE</span><h2>6 GATES.<br/><em>ONE OPENING DAY.</em></h2><div className="roadmap-grid">{[['01','LAND'],['02','FEASIBILITY'],['03','CLINICAL'],['04','DED + BIM'],['05','PERMITS'],['06','BUILD']].map(([n,label]) => <div key={n}><b>{n}</b><span>{label}</span></div>)}</div><p className="disclaimer">Concept presentation. Kapasitas, biaya dan desain final dikunci melalui feasibility, survey, DED, BOQ, permit dan vendor quotation.</p><button className="primary-action" onClick={() => jumpTo('top')}><span>REPLAY STORY</span><b>↑</b></button></div>
        </section>
      </main>

      <nav className={`mode-dock ${chapterIndex === 5 ? 'visual-hidden' : ''}`} aria-label="Kontrol 3D">{[['overview','◉','VIEW'],['explode','≡','FLOORS'],['site','↗','FLOW'],['journey','▶','JOURNEY']].map(([value,icon,label]) => <button key={value} className={mode === value ? 'active' : ''} onClick={() => changeMode(value)}><b>{icon}</b><span>{label}</span></button>)}</nav>
    </>
  )
}
