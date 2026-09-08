'use client'

import { useEffect, useState } from 'react'

const research = [
  ['1JsUSXszzS7cZnSOI-RNjld2TgZNB9U9E', 'Exterior · Master', 'Perspektif depan kiri', 'Massa bangunan, canopy, arrival sequence dan identitas fasad.'],
  ['12vRJWURamhe6jNQ53txWG_XdJjcAb3UD', 'Exterior · Arrival', 'Frontal wide view', 'Keterbacaan pintu masuk, frontage, drop-off dan skala institusi.'],
  ['1kac-vTTfwsk83Z5DG6yukVKxGZ_CvzzI', 'Interior · Public', 'Lobby utama', 'Hospitality, first impression, resepsionis dan wayfinding publik.'],
  ['1p-uL8NcxO-yvFfCeU6BEevxLRpmJJzWm', 'Interior · Outpatient', 'Lobby poliklinik', 'Registration flow, distribusi pasien dan area tunggu.'],
  ['1BHcW3jWcmdmRBuPvr8M_VV81k1ym4KTX', 'Interior · Inpatient', 'Koridor + nurse station', 'Observability, respons staf, ketenangan dan kontrol area rawat inap.'],
  ['1TJ6I2QirbBphtIiunJdkvgYz66krQfoH', 'Interior · Patient room', 'Kamar pasien', 'Daylight, family support, privasi, ergonomi dan pemulihan.'],
  ['19Qg1sgP1OqZSKTDuaEBLccj8xEsNkq29', 'Interior · Critical care', 'ICU + HCU', 'Monitoring, visibility klinis dan infection-control mindset.'],
  ['1hU2P7TJCTpi5-zB_bRNvF1tDyAF1ffxl', 'Interior · Surgery', 'Operating theatre', 'Restricted core, cleanability, equipment zone dan team movement.'],
  ['1r2a1GAr1zUZMhSQ60r0Ep7BQCi3eFLlr', 'Interior · Diagnostics', 'Radiology + imaging', 'Preparation, clearances, privacy dan kontrol diagnostik.'],
  ['16jT4xUgZq1hwyU6Df5YNvemre-KSuNFN', 'Interior · Pharmacy', 'Farmasi + apotek', 'Queue clarity, counter workflow dan dispensing interface.'],
  ['1L5dr2g9OZjMf4AUshcFhAcsQT6CLoUfp', 'Interior · Executive', 'Executive lounge', 'Hospitality tier, reception, privacy dan premium experience.'],
  ['1hwf8B6EhwCUp-QFekiwEjXJbTB9ffNUi', 'Interior · Amenity', 'Kafetaria + lounge', 'Family dwell time, food service dan non-clinical relief space.'],
]

const modes = [
  ['overview', 'Overview'],
  ['explode', 'Exploded floors'],
  ['site', 'Site circulation'],
  ['journey', 'Patient journey'],
]

function setSceneMode(mode) {
  window.dispatchEvent(new CustomEvent('hospital-mode', { detail: mode }))
}

export default function Home() {
  const [mode, setMode] = useState('overview')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const changeMode = (value) => {
    setMode(value)
    setSceneMode(value)
  }

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <header className="topbar">
        <a className="brand" href="#top">RS <b>SUBANG RAYA</b></a>
        <nav>
          <a href="#investment">Investment</a>
          <a href="#clinical">Clinical</a>
          <a href="#research">Research</a>
          <a href="#roadmap">Roadmap</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="hero-copy">
            <span className="eyebrow">IMMERSIVE INVESTOR DECK · R3F</span>
            <h1>Rumah sakit sebagai <span>living 3D investment story.</span></h1>
            <p>RS Subang Raya / RS HARVA dipresentasikan melalui sistem React Three Fiber: lahan, clinical stack, journey pasien, phasing dan visual research berada dalam satu pengalaman interaktif.</p>
            <div className="actions">
              <a className="button primary" href="#investment">Mulai presentasi</a>
              <button className="button" onClick={() => changeMode('explode')}>Explode 3D</button>
            </div>
            <div className="hero-stats">
              <div><b>136</b><span>bed indikatif R1</span></div>
              <div><b>7</b><span>disiplin BIM</span></div>
              <div><b>3</b><span>fase pengembangan</span></div>
              <div><b>12</b><span>visual research</span></div>
            </div>
          </div>
          <div className="hero-space" />
        </section>

        <section id="investment" className="section align-left">
          <div className="content-panel">
            <span className="kicker">01 · INVESTMENT THESIS</span>
            <h2>Lahan yang benar adalah keputusan investasi pertama.</h2>
            <p className="lead">Investor tidak hanya melihat bangunan. Presentasi ini menjelaskan bagaimana lokasi, akses, utilitas, legalitas, klinis dan ekspansi berhubungan menjadi satu aset kesehatan.</p>
            <div className="card-grid three">
              <article><b>LAND</b><h3>Asset-backed opportunity</h3><p>Screening tata ruang, akses, utilitas, bentuk tapak, legalitas dan ruang ekspansi menjadi gate pertama.</p></article>
              <article><b>PHASING</b><h3>Build the core first</h3><p>Emergency, diagnostics, surgery dan inpatient dibangun sebagai core yang dapat tumbuh tanpa merusak operasi.</p></article>
              <article><b>BIM</b><h3>Technical baseline</h3><p>Baseline multi-disiplin dipakai untuk menyatukan keputusan desain, investasi dan delivery sebelum DED final.</p></article>
            </div>
          </div>
        </section>

        <section className="section align-right">
          <div className="content-panel narrow">
            <span className="kicker">02 · SITE STRATEGY</span>
            <h2>Tiga arus utama tidak boleh saling bertabrakan.</h2>
            <p className="lead">Aktifkan mode site untuk membaca Public, Emergency dan Service sebagai jalur berbeda pada model 3D.</p>
            <div className="route-list">
              <button onClick={() => changeMode('site')}><i className="route public" /><span><b>Public arrival</b>drop-off → lobby → outpatient</span></button>
              <button onClick={() => changeMode('site')}><i className="route emergency" /><span><b>Emergency route</b>gate cepat → acute core</span></button>
              <button onClick={() => changeMode('site')}><i className="route service" /><span><b>Service route</b>loading → utility → waste</span></button>
            </div>
          </div>
        </section>

        <section id="clinical" className="section align-left">
          <div className="content-panel">
            <span className="kicker">03 · CLINICAL STACK</span>
            <h2>Program dibaca sebagai stack yang dapat dieksplorasi.</h2>
            <div className="clinical-grid">
              <div className="big-number"><b>136</b><span>target bed indikatif R1</span></div>
              <div className="clinical-layers">
                {[
                  ['L1', 'Public + Outpatient', 'lobby · registration · clinics · pharmacy'],
                  ['L2', 'Diagnostics + Emergency', 'imaging · laboratory · acute route'],
                  ['L3', 'Surgery + Critical Care', 'OT · recovery · ICU/HCU'],
                  ['L4', 'Inpatient', 'patient rooms · nurse station · family support'],
                  ['L5', 'Expansion + Executive', 'additional beds · specialty · lounge'],
                ].map((item) => <button key={item[0]} onClick={() => changeMode('explode')}><b>{item[0]}</b><span><strong>{item[1]}</strong>{item[2]}</span></button>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section align-right">
          <div className="content-panel narrow">
            <span className="kicker">04 · PATIENT JOURNEY</span>
            <h2>Satu perjalanan, enam titik keputusan.</h2>
            <p className="lead">Mode journey menyalakan path 3D untuk menjelaskan adjacency dan transisi dari area publik ke area klinis terbatas.</p>
            <ol className="journey-list">
              {['Arrival', 'Registration', 'Diagnostics', 'Treatment', 'Recovery', 'Discharge'].map((label, index) => <li key={label}><b>{String(index + 1).padStart(2, '0')}</b><span>{label}</span></li>)}
            </ol>
            <button className="button primary" onClick={() => changeMode('journey')}>Play patient journey</button>
          </div>
        </section>

        <section id="research" className="research-section">
          <div className="research-head">
            <span className="kicker">05 · VISUAL RESEARCH APPENDIX</span>
            <h2>12 frame desain dari arsip riset.</h2>
            <p>Render berfungsi sebagai conversation layer untuk arrival, hospitality, clinical flow, privacy dan experience. Bukan DED atau construction issue.</p>
          </div>
          <div className="research-grid">
            {research.map(([id, tag, title, desc], index) => (
              <article className="research-card" key={id}>
                <div className="research-image">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <img loading="lazy" src={`https://drive.google.com/thumbnail?id=${id}&sz=w1200`} alt={title} onError={(e) => { e.currentTarget.style.display = 'none' }} />
                </div>
                <div className="research-copy"><small>{tag}</small><h3>{title}</h3><p>{desc}</p><a target="_blank" rel="noreferrer" href={`https://drive.google.com/file/d/${id}/view`}>Open source ↗</a></div>
              </article>
            ))}
          </div>
        </section>

        <section id="roadmap" className="section align-left final-section">
          <div className="content-panel">
            <span className="kicker">06 · DELIVERY ROADMAP</span>
            <h2>Dari lahan menuju rumah sakit operasional.</h2>
            <div className="roadmap">
              {[
                ['01', 'Land & alignment'], ['02', 'Site feasibility'], ['03', 'Clinical brief'], ['04', 'DED + coordination'], ['05', 'Permits + procurement'], ['06', 'Build + commissioning'],
              ].map(([n, label]) => <div key={n}><b>{n}</b><span>{label}</span></div>)}
            </div>
            <p className="disclaimer">Current baseline: investor presentation + BIM narrative + visual research. Semua kapasitas, biaya dan render tetap harus dikunci melalui feasibility, survey, DED, BOQ, permit dan vendor quotation.</p>
          </div>
        </section>
      </main>

      <div className="mode-dock" aria-label="3D scene modes">
        {modes.map(([value, label]) => <button key={value} className={mode === value ? 'active' : ''} onClick={() => changeMode(value)}>{label}</button>)}
      </div>
    </>
  )
}
