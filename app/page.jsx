'use client'

import { useEffect, useState } from 'react'

const slides = [
  { file:'01-arrival.jpg', tag:'EXTERIOR', title:'Arrival', lead:'Pintu masuk harus terbaca dalam beberapa detik: datang, turun, lalu masuk tanpa ragu.', points:['DROP-OFF JELAS','CANOPY TEDUH','IDENTITAS KUAT'], tone:'#f5c842' },
  { file:'03-main-lobby.jpg', tag:'PUBLIC', title:'Main Lobby', lead:'Begitu masuk, pasien langsung tahu harus mendaftar, menunggu, dan bergerak ke mana.', points:['RESEPSIONIS TERLIHAT','WAYFINDING MUDAH','WAITING NYAMAN'], tone:'#6adbd2' },
  { file:'04-polyclinic.jpg', tag:'OUTPATIENT', title:'Polyclinic', lead:'Registrasi, ruang tunggu, dan akses ke klinik dibuat sebagai satu alur yang sederhana.', points:['DAFTAR CEPAT','ANTRIAN TERBACA','KLINIK DEKAT'], tone:'#f5c842' },
  { file:'05-nurse-station.jpg', tag:'INPATIENT', title:'Nurse Station', lead:'Tim keperawatan melihat koridor lebih luas dan dapat merespons pasien lebih cepat.', points:['VISIBILITAS','RESPON CEPAT','KONTROL KORIDOR'], tone:'#f3eee4' },
  { file:'06-patient-room.jpg', tag:'PATIENT', title:'Patient Room', lead:'Kamar mendukung istirahat pasien, privasi, daylight, dan kehadiran keluarga.', points:['DAYLIGHT','PRIVASI','FAMILY SUPPORT'], tone:'#6adbd2' },
  { file:'07-icu-hcu.jpg', tag:'CRITICAL', title:'ICU + HCU', lead:'Ruang kritis mengutamakan monitoring dekat, visibilitas klinis, dan respons cepat.', points:['MONITORING','AKSES CEPAT','INFECTION CONTROL'], tone:'#ff754f' },
  { file:'08-operating-theatre.jpg', tag:'SURGERY', title:'Operating Theatre', lead:'Zona operasi mengutamakan kebersihan, kontrol, dan pergerakan tim yang ringkas.', points:['CLEAN CORE','CONTROLLED FLOW','TEAM SPACE'], tone:'#6adbd2' },
  { file:'09-imaging.jpg', tag:'DIAGNOSTIC', title:'Imaging', lead:'Area diagnostik dibuat tenang, privat, dan siap untuk kebutuhan peralatan besar.', points:['PRIVASI','CLEARANCE ALAT','PREPARATION'], tone:'#f5c842' },
  { file:'10-pharmacy.jpg', tag:'PHARMACY', title:'Pharmacy', lead:'Pasien mudah melihat antrean, counter, dan titik pengambilan obat.', points:['QUEUE JELAS','COUNTER TERBUKA','PICK-UP MUDAH'], tone:'#f3eee4' },
  { file:'11-executive-lounge.jpg', tag:'EXECUTIVE', title:'Executive Lounge', lead:'Layanan premium terasa lebih privat tanpa terputus dari sistem rumah sakit.', points:['PRIVASI','HOSPITALITY','FAMILY COMFORT'], tone:'#6adbd2' },
  { file:'12-public-lounge.jpg', tag:'AMENITY', title:'Public Lounge', lead:'Ruang jeda memberi keluarga tempat bernapas di luar area klinis.', points:['DUDUK','MAKAN','RELIEF SPACE'], tone:'#f5c842' },
]

const asset = (file) => `/rs.subangraya/visual/${file}`
const emit = (name, detail) => window.dispatchEvent(new CustomEvent(name, { detail }))

export default function Home() {
  const [active, setActive] = useState(0)
  const [threeD, setThreeD] = useState(false)
  const [mode, setMode] = useState('overview')
  const [activeFloor, setActiveFloor] = useState(0)

  const jumpTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' })

  useEffect(() => {
    document.body.dataset.theme = 'dark'
    const nodes = slides.map((_, index) => document.getElementById(`story-${index + 1}`)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visible) return
      const index = Number(visible.target.dataset.index)
      if (Number.isFinite(index)) setActive(index)
    }, { rootMargin:'-18% 0px -58% 0px', threshold:[0,.2,.5] })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const enable3D = () => {
    setThreeD(true)
    emit('hospital-enable-3d', true)
    setTimeout(() => {
      emit('hospital-mode', 'overview')
      jumpTo('three-d')
    }, 80)
  }

  const changeMode = (value) => {
    setMode(value)
    emit('hospital-mode', value)
    if (value === 'journey') emit('hospital-journey', Date.now())
  }

  const chooseFloor = (index) => {
    setActiveFloor(index)
    setMode('explode')
    emit('hospital-mode', 'explode')
    emit('hospital-floor', index)
  }

  return (
    <>
      <style>{`
        html{scroll-snap-type:none!important;background:#05090c;scroll-behavior:smooth}
        body{background:#05090c!important;color:#fff!important;transition:none!important}
        .jpg-progress{position:fixed;z-index:250;left:0;top:0;height:3px;background:#f5c842;width:${((active + 1) / slides.length) * 100}%;transition:width .18s ease}
        .jpg-head{position:fixed;z-index:240;left:0;right:0;top:0;padding:calc(7px + env(safe-area-inset-top)) 9px 6px;display:flex;align-items:center;justify-content:space-between;pointer-events:none}
        .jpg-brand,.jpg-count{min-height:31px;display:flex;align-items:center;border-radius:999px;border:1px solid rgba(255,255,255,.1)}
        .jpg-brand{gap:6px;padding:0 10px 0 5px;background:rgba(5,9,12,.95);font-size:7px;font-weight:950;letter-spacing:.09em}
        .jpg-brand i{width:21px;height:21px;border-radius:50%;display:grid;place-items:center;background:#f5c842;color:#071018;font-size:14px;font-style:normal}
        .jpg-count{padding:0 10px;background:#f5c842;color:#071018;font-size:7px;font-weight:950;gap:4px;white-space:nowrap}.jpg-count b{font-size:11px}.jpg-count span{opacity:.45}
        .jpg-story{position:relative;background:#05090c;padding-top:calc(45px + env(safe-area-inset-top))}
        .jpg-slide{--tone:#f3eee4;position:relative;padding:0 7px 11px;background:#05090c;content-visibility:auto;contain-intrinsic-size:540px}
        .jpg-frame{overflow:hidden;border-radius:20px;background:#0b1217;border:1px solid rgba(255,255,255,.09);box-shadow:0 18px 38px rgba(0,0,0,.16)}
        .jpg-media{position:relative;width:100%;background:#05090c}
        .jpg-media:after{content:'';position:absolute;z-index:1;left:0;right:0;bottom:0;height:38%;background:linear-gradient(transparent,rgba(5,9,12,.82));pointer-events:none}
        .jpg-media img{display:block;width:100%;height:auto;max-height:none;object-fit:contain;image-rendering:auto}
        .jpg-label{position:absolute;z-index:3;left:9px;top:9px;display:flex;align-items:center;gap:6px;padding:5px 8px;border-radius:999px;background:rgba(5,9,12,.9);font-size:6.5px;font-weight:950;letter-spacing:.11em}
        .jpg-label b{color:var(--tone)}.jpg-label span{opacity:.74}
        .jpg-overlay{position:absolute;z-index:3;left:12px;right:12px;bottom:10px;display:flex;align-items:flex-end;justify-content:space-between;gap:10px;color:#fff}
        .jpg-overlay h1,.jpg-overlay h2{margin:0;font-size:clamp(29px,8.8vw,45px);line-height:.86;letter-spacing:-.055em;text-transform:uppercase;font-weight:1000;text-shadow:0 4px 20px rgba(0,0,0,.35)}
        .jpg-number{font-size:8px;font-weight:1000;letter-spacing:.08em;opacity:.72;white-space:nowrap;padding-bottom:2px}
        .jpg-copy{position:relative;background:#0d151b;color:#fff;padding:11px 12px 10px;border-top:3px solid var(--tone)}
        .jpg-copy small{display:block;color:var(--tone);font-size:6.5px;font-weight:1000;letter-spacing:.14em;margin-bottom:5px}
        .jpg-copy p{font-size:10.5px;line-height:1.36;font-weight:620;margin:0;max-width:520px;color:rgba(255,255,255,.86)}
        .jpg-points{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px;padding-right:38px}
        .jpg-points span{border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.055);border-radius:999px;padding:4px 6px;font-size:6px;font-weight:950;letter-spacing:.06em;white-space:nowrap;color:#fff}
        .jpg-next{position:absolute;right:10px;bottom:9px;width:30px;height:30px;border:0;border-radius:50%;background:var(--tone);color:#071018;font-size:13px;font-weight:1000;display:grid;place-items:center}
        .project-end{position:relative;background:#f3eee4;color:#071018;padding:calc(72px + env(safe-area-inset-top)) 14px calc(22px + env(safe-area-inset-bottom));min-height:100svh;display:flex;align-items:center}
        .end-card{width:100%;max-width:760px;margin:auto}.end-kicker{font-size:8px;font-weight:1000;letter-spacing:.16em}.end-card h2{font-size:clamp(46px,13vw,84px);line-height:.8;letter-spacing:-.075em;text-transform:uppercase;margin:10px 0 18px}.end-card h2 em{font-style:normal;color:transparent;-webkit-text-stroke:1.4px currentColor}
        .end-metrics{display:grid;grid-template-columns:repeat(2,1fr);gap:7px;margin-bottom:13px}.end-metrics div{border:1.3px solid currentColor;border-radius:17px;padding:11px;min-height:80px;display:flex;flex-direction:column;justify-content:space-between}.end-metrics b{font-size:25px;letter-spacing:-.06em}.end-metrics span{font-size:7px;font-weight:950;letter-spacing:.08em}
        .end-note{font-size:9px;line-height:1.48;opacity:.58;margin:0 0 13px}.end-actions{display:grid;grid-template-columns:1fr auto;gap:7px}.end-actions button{min-height:47px;border:0;border-radius:15px;font-size:8px;font-weight:1000;letter-spacing:.09em}.enable-3d{background:#071018;color:#fff;padding:0 16px}.replay{width:47px;background:#f5c842;color:#071018}
        .three-d-stage{position:relative;min-height:100svh;background:linear-gradient(180deg,rgba(243,238,228,.03),rgba(243,238,228,.72) 78%,#f3eee4);color:#071018;padding:calc(74px + env(safe-area-inset-top)) 12px calc(14px + env(safe-area-inset-bottom));display:flex;align-items:flex-end}
        .three-d-panel{width:100%;max-width:520px;margin:0 auto;border-radius:24px;padding:15px;background:#f3eee4;box-shadow:0 20px 50px rgba(0,0,0,.16)}
        .three-d-panel>small{font-size:7px;font-weight:1000;letter-spacing:.14em}.three-d-panel h3{font-size:34px;line-height:.9;letter-spacing:-.06em;text-transform:uppercase;margin:6px 0 11px}.mode-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:8px}.mode-grid button,.floor-grid button{border:1.1px solid currentColor;background:transparent;color:inherit;border-radius:13px;min-height:40px;font-size:6.5px;font-weight:950;letter-spacing:.05em}.mode-grid button.active,.floor-grid button.active{background:#071018;color:#fff;border-color:#071018}.floor-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:5px}.three-d-close{width:100%;margin-top:8px;min-height:40px;border:0;border-radius:13px;background:#f5c842;color:#071018;font-size:7px;font-weight:1000;letter-spacing:.08em}
        @media(min-width:760px){.jpg-story{padding-top:70px}.jpg-slide{max-width:1180px;margin:0 auto;padding:0 16px 18px}.jpg-frame{display:grid;grid-template-columns:minmax(0,1.62fr) minmax(300px,.38fr);border-radius:26px}.jpg-media{display:grid;place-items:center}.jpg-overlay{left:18px;right:18px;bottom:16px}.jpg-overlay h1,.jpg-overlay h2{font-size:52px}.jpg-copy{display:flex;flex-direction:column;justify-content:center;padding:20px;border-top:0;border-left:4px solid var(--tone)}.jpg-copy p{font-size:13px}.jpg-points{padding-right:0}.jpg-points span{font-size:6.8px;padding:5px 7px}.jpg-next{right:14px;bottom:14px}.end-metrics{grid-template-columns:repeat(4,1fr)}}
        @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.jpg-progress{transition:none}}
      `}</style>

      <div className="jpg-progress" />
      <header className="jpg-head">
        <div className="jpg-brand"><i>+</i><span>RS SUBANG RAYA</span></div>
        <div className="jpg-count"><b>{String(active + 1).padStart(2,'0')}</b><span>/ {String(slides.length).padStart(2,'0')}</span></div>
      </header>

      <main className="jpg-story">
        {slides.map((slide, index) => (
          <section id={`story-${index + 1}`} data-index={index} className="jpg-slide" key={slide.file} style={{'--tone':slide.tone}}>
            <div className="jpg-frame">
              <div className="jpg-media">
                <img
                  src={asset(slide.file)}
                  alt={slide.title}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
                />
                <div className="jpg-label"><b>{String(index + 1).padStart(2,'0')}</b><span>{slide.tag}</span></div>
                <div className="jpg-overlay">
                  {index === 0 ? <h1>{slide.title}</h1> : <h2>{slide.title}</h2>}
                  <span className="jpg-number">{String(index + 1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}</span>
                </div>
              </div>
              <div className="jpg-copy">
                <small>{slide.tag} · INTI DESAIN</small>
                <p>{slide.lead}</p>
                <div className="jpg-points">{slide.points.map((point) => <span key={point}>{point}</span>)}</div>
                <button className="jpg-next" onClick={() => jumpTo(index < slides.length - 1 ? `story-${index + 2}` : 'project-end')} aria-label={index < slides.length - 1 ? 'Gambar berikutnya' : 'Ringkasan proyek'}>↓</button>
              </div>
            </div>
          </section>
        ))}

        <section id="project-end" className="project-end">
          <div className="end-card">
            <span className="end-kicker">PROJECT AT A GLANCE</span>
            <h2>ONE HOSPITAL.<br/><em>BUILT TO GROW.</em></h2>
            <div className="end-metrics">
              <div><b>136</b><span>TARGET BEDS · INDICATIVE R1</span></div>
              <div><b>5</b><span>CLINICAL LEVELS</span></div>
              <div><b>3</b><span>SEPARATED ROUTES</span></div>
              <div><b>3</b><span>DEVELOPMENT PHASES</span></div>
            </div>
            <p className="end-note">Concept presentation. Kapasitas, biaya, dan desain final harus dikunci melalui feasibility, survey, DED, BOQ, perizinan, serta vendor quotation.</p>
            <div className="end-actions">
              <button className="enable-3d" onClick={enable3D}>{threeD ? 'OPEN 3D AGAIN' : 'OPTIONAL · OPEN 3D VIEW'}</button>
              <button className="replay" onClick={() => jumpTo('story-1')} aria-label="Ulangi">↑</button>
            </div>
          </div>
        </section>

        {threeD ? (
          <section id="three-d" className="three-d-stage">
            <div className="three-d-panel">
              <small>3D VIEW · LOADED ON DEMAND</small>
              <h3>Explore the hospital.</h3>
              <div className="mode-grid">
                {[
                  ['overview','VIEW'],['explode','FLOORS'],['site','FLOW'],['journey','JOURNEY']
                ].map(([value,label]) => <button key={value} className={mode === value ? 'active' : ''} onClick={() => changeMode(value)}>{label}</button>)}
              </div>
              <div className="floor-grid">
                {[0,1,2,3,4].map((index) => <button key={index} className={mode === 'explode' && activeFloor === index ? 'active' : ''} onClick={() => chooseFloor(index)}>L{index + 1}</button>)}
              </div>
              <button className="three-d-close" onClick={() => jumpTo('project-end')}>BACK TO SUMMARY ↑</button>
            </div>
          </section>
        ) : null}
      </main>
    </>
  )
}
