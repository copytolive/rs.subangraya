'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

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

const modes = [['overview', 'VIEW'], ['explode', 'FLOORS'], ['site', 'FLOW'], ['journey', 'JOURNEY']]
const chapters = [
  ['top', 'overview', 'hero'], ['investment', 'overview', 'light'], ['site', 'site', 'yellow'],
  ['clinical', 'explode', 'teal'], ['journey', 'journey', 'orange'], ['research', 'overview', 'dark'], ['roadmap', 'overview', 'light'],
]

function broadcastMode(mode) {
  window.dispatchEvent(new CustomEvent('hospital-mode', { detail: mode }))
}

export default function Home() {
  const [mode, setMode] = useState('overview')
  const [progress, setProgress] = useState(0)

  const changeMode = (value) => {
    setMode(value)
    broadcastMode(value)
  }

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = chapters.map(([id, nextMode, theme]) => {
      const target = document.getElementById(id)
      if (!target) return null
      const observer = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return
        document.body.dataset.theme = theme
        setMode(nextMode)
        broadcastMode(nextMode)
      }, { threshold: 0.48 })
      observer.observe(target)
      return observer
    })
    return () => observers.forEach((observer) => observer?.disconnect())
  }, [])

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.from('.hero-wordmark span', {
      yPercent: 120,
      rotate: 7,
      opacity: 0,
      duration: 1.05,
      ease: 'power4.out',
      stagger: 0.12,
    })

    gsap.from('.hero-center-copy, .hero-metrics', {
      y: 28,
      opacity: 0,
      duration: 0.8,
      delay: 0.55,
      stagger: 0.1,
      ease: 'power3.out',
    })

    document.querySelectorAll('.chapter-copy h2, .clinical-top h2, .research-intro h2').forEach((heading) => {
      gsap.from(heading, {
        yPercent: 34,
        rotate: 2.5,
        opacity: 0,
        duration: 0.85,
        ease: 'power4.out',
        scrollTrigger: { trigger: heading, start: 'top 86%', toggleActions: 'play none none reverse' },
      })
    })

    document.querySelectorAll('.giant-index, .giant-word').forEach((item) => {
      gsap.fromTo(item, { xPercent: 16 }, {
        xPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: item.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      })
    })

    gsap.from('.research-card', {
      x: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.research-rail', start: 'top 88%' },
    })
  }, [])

  const jumpTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <header className="topbar">
        <button className="brand" onClick={() => jumpTo('top')} aria-label="Kembali ke awal">RS <b>SUBANG RAYA</b></button>
        <span className="chapter-count">{String(Math.min(7, Math.floor(progress / 15) + 1)).padStart(2, '0')} / 07</span>
      </header>

      <main>
        <section id="top" className="chapter hero-chapter">
          <div className="hero-wordmark" aria-label="RS Subang Raya"><span>RS</span><span>SUBANG</span><span>RAYA</span></div>
          <div className="hero-center-copy"><p>IMMERSIVE HOSPITAL INVESTMENT STORY</p><button className="round-cta" onClick={() => jumpTo('investment')}>↓</button></div>
          <div className="hero-metrics"><span><b>136</b> beds</span><span><b>7</b> BIM layers</span><span><b>3</b> phases</span></div>
        </section>

        <section id="investment" className="chapter split-chapter">
          <div className="giant-index">01</div>
          <div className="chapter-copy"><span className="micro">INVESTMENT THESIS</span><h2>LAND<br/>FIRST.</h2><p>Lahan yang benar adalah keputusan investasi pertama. Legalitas, akses, utilitas, bentuk tapak dan ruang ekspansi harus terkunci sebelum modal bergerak.</p><div className="pill-row"><span>ASSET-BACKED</span><span>PHASED</span><span>BIM-READY</span></div></div>
          <div className="scene-window"><span>ROTATE WITH SCROLL</span></div>
        </section>

        <section id="site" className="chapter punch-chapter">
          <div className="chapter-copy dark-copy"><span className="micro">02 · SITE STRATEGY</span><h2>3<br/>ROUTES.</h2><p>Public, Emergency dan Service dibaca sebagai tiga arus terpisah pada site model.</p><div className="route-pills"><button onClick={() => changeMode('site')}><i className="route public"/>PUBLIC</button><button onClick={() => changeMode('site')}><i className="route emergency"/>EMERGENCY</button><button onClick={() => changeMode('site')}><i className="route service"/>SERVICE</button></div></div>
          <div className="giant-word">FLOW</div>
        </section>

        <section id="clinical" className="chapter clinical-chapter">
          <div className="giant-index">03</div>
          <div className="clinical-top"><span className="micro">CLINICAL STACK</span><h2>EXPLODE<br/>THE CARE.</h2></div>
          <div className="clinical-scroll">{[
            ['L1', 'PUBLIC + OUTPATIENT', 'Lobby · registration · clinics · pharmacy'],
            ['L2', 'DIAGNOSTICS + EMERGENCY', 'Imaging · laboratory · acute route'],
            ['L3', 'SURGERY + CRITICAL CARE', 'OT · recovery · ICU/HCU'],
            ['L4', 'INPATIENT', 'Patient rooms · nurse station · family support'],
            ['L5', 'EXPANSION + EXECUTIVE', 'Additional beds · specialty · lounge'],
          ].map(([n, title, body]) => <button key={n} onClick={() => changeMode('explode')}><b>{n}</b><span><strong>{title}</strong>{body}</span></button>)}</div>
          <div className="clinical-number"><b>136</b><span>BED TARGET · R1</span></div>
        </section>

        <section id="journey" className="chapter journey-chapter">
          <div className="chapter-copy dark-copy"><span className="micro">04 · PATIENT JOURNEY</span><h2>ONE<br/>CARE<br/>PATH.</h2><button className="play-button" onClick={() => changeMode('journey')}>PLAY 3D JOURNEY</button></div>
          <div className="journey-strip">{['ARRIVE', 'REGISTER', 'DIAGNOSE', 'TREAT', 'RECOVER', 'DISCHARGE'].map((label, index) => <div key={label}><b>{String(index + 1).padStart(2, '0')}</b><span>{label}</span></div>)}</div>
        </section>

        <section id="research" className="research-chapter">
          <div className="research-intro"><span className="micro">05 · VISUAL RESEARCH</span><h2>12<br/>DESIGN<br/>FRAMES.</h2><p>Swipe untuk membaca perjalanan desain. Tidak ada link keluar dari presentasi.</p></div>
          <div className="research-rail">{research.map(([id, tag, title, desc], index) => <article className="research-card" key={id}><div className="research-image"><img loading="lazy" src={`https://drive.google.com/thumbnail?id=${id}&sz=w1200`} alt={title} onError={(e) => { e.currentTarget.style.opacity = '0' }} /><span>{String(index + 1).padStart(2, '0')}</span></div><div className="research-copy"><small>{tag}</small><h3>{title}</h3><p>{desc}</p></div></article>)}</div>
        </section>

        <section id="roadmap" className="chapter roadmap-chapter">
          <div className="giant-index">06</div>
          <div className="chapter-copy"><span className="micro">DELIVERY ROADMAP</span><h2>LAND<br/>TO LIVE.</h2></div>
          <div className="roadmap-list">{[['01', 'LAND + ALIGNMENT'], ['02', 'SITE FEASIBILITY'], ['03', 'CLINICAL BRIEF'], ['04', 'DED + BIM'], ['05', 'PERMITS + PROCUREMENT'], ['06', 'BUILD + COMMISSIONING']].map(([n, label]) => <div key={n}><b>{n}</b><span>{label}</span></div>)}</div>
          <p className="disclaimer">Concept presentation. Kapasitas, biaya dan desain final dikunci melalui feasibility, survey, DED, BOQ, permit dan vendor quotation.</p>
        </section>
      </main>

      <div className="mode-dock" aria-label="Kontrol 3D">
        {modes.map(([value, label]) => <button key={value} className={mode === value ? 'active' : ''} onClick={() => changeMode(value)}><i />{label}</button>)}
      </div>
    </>
  )
}
