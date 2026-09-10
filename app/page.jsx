'use client'

import { useState } from 'react'

const asset = (file) => `/rs.subangraya/visual/${file}`

const capex = [
  { label: 'LOW', value: 'Rp699,9 M', pct: 70 },
  { label: 'BASE', value: 'Rp861,1 M', pct: 86 },
  { label: 'HIGH', value: 'Rp1.003,9 M', pct: 100 },
]

const ramp = [
  { year: 'YEAR 1', encounters: '900 / hari', revenue: 'Rp585,0 M', ebitda: '-Rp29,3 M', cfads: '-Rp41,0 M', note: 'Ramp-up' },
  { year: 'YEAR 4', encounters: '2.000 / hari', revenue: 'Rp1,30 T', ebitda: 'Rp162,5 M', cfads: 'Rp120,0 M', note: 'Base operating case' },
  { year: 'YEAR 10', encounters: '2.680 / hari', revenue: 'Rp1,74 T', ebitda: 'Rp243,9 M', cfads: 'Rp166,7 M', note: 'Mature planning case' },
]

const capacity = [
  { name: 'OPD', demand: '1.600', capacity: '1.620', delta: '+20', status: 'TIGHT', tone: 'watch' },
  { name: 'ED', demand: '160', capacity: '184', delta: '+24', status: 'HEADROOM', tone: 'good' },
  { name: 'INPATIENT', demand: '56,47', capacity: '56', delta: '-0,47', status: 'AT LIMIT', tone: 'risk' },
  { name: 'OR', demand: '30', capacity: '48', delta: '+18', status: 'HEADROOM', tone: 'good' },
  { name: 'CT', demand: '40', capacity: '32', delta: '-8', status: 'BOTTLENECK', tone: 'risk' },
]

const funding = [
  { debt: '40%', debtValue: 'Rp344,4 M', equity: 'Rp516,7 M', dscr: '1,83x', moic: '4,59x', title: 'Lower leverage', tone: 'good' },
  { debt: '50%', debtValue: 'Rp430,5 M', equity: 'Rp430,5 M', dscr: '1,47x', moic: '5,46x', title: 'Conservative', tone: 'good' },
  { debt: '60%', debtValue: 'Rp516,7 M', equity: 'Rp344,4 M', dscr: '1,07x', moic: '7,08x', title: 'Base bank', tone: 'watch' },
  { debt: '70%', debtValue: 'Rp602,8 M', equity: 'Rp258,3 M', dscr: '0,90x', moic: '8,97x', title: 'Higher leverage', tone: 'risk' },
  { debt: '100%', debtValue: 'Rp861,1 M', equity: 'Rp0', dscr: '0,63x', moic: '—', title: 'Stress test', tone: 'risk' },
]

const readiness = [
  ['T01', 'Licensed survey / topography / utilities', 'EXTERNAL'],
  ['T02', 'Geotechnical investigation package', '0 / 19'],
  ['T03', 'Final structural / foundation release', 'OPEN'],
  ['T04', 'Structural penetration approvals', '0 / 80'],
  ['T05', 'Fire & life-safety decisions', '0 / 1.362'],
  ['T06', 'Lift traffic study + vendor packages', '0 / 9'],
  ['T07', 'Medical equipment vendor packages', '0 / 43'],
  ['T08', 'Radiation shielding evidence / signed N.A.', 'OPEN'],
  ['T09', 'Clinical program / RDS approvals', '0 / 371'],
  ['T10', 'Measured BOQ + QS / Finance reconciliation', 'OPEN'],
  ['T11', 'Issued permits / authority evidence', 'OPEN'],
]

const visuals = [
  ['01-arrival.jpg', 'Arrival', 'EXTERIOR'],
  ['03-main-lobby.jpg', 'Main Lobby', 'PUBLIC'],
  ['04-polyclinic.jpg', 'Polyclinic', 'OUTPATIENT'],
  ['05-nurse-station.jpg', 'Nurse Station', 'INPATIENT'],
  ['06-patient-room.jpg', 'Patient Room', 'PATIENT'],
  ['07-icu-hcu.jpg', 'ICU + HCU', 'CRITICAL'],
  ['08-operating-theatre.jpg', 'Operating Theatre', 'SURGERY'],
  ['09-imaging.jpg', 'Imaging', 'DIAGNOSTIC'],
  ['10-pharmacy.jpg', 'Pharmacy', 'PHARMACY'],
  ['11-executive-lounge.jpg', 'Executive Lounge', 'EXECUTIVE'],
  ['12-public-lounge.jpg', 'Public Lounge', 'AMENITY'],
]

export default function Home() {
  const [fundingIndex, setFundingIndex] = useState(2)
  const [visualIndex, setVisualIndex] = useState(0)
  const [threeD, setThreeD] = useState(false)
  const selectedFunding = funding[fundingIndex]

  const enable3D = () => {
    setThreeD(true)
    window.dispatchEvent(new CustomEvent('hospital-enable-3d', { detail: true }))
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('hospital-mode', { detail: 'overview' }))
      document.getElementById('three-d')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <>
      <style>{`
        :root{--ink:#070b0e;--paper:#f4f0e7;--yellow:#f4c842;--muted:#8e9aa0;--line:rgba(255,255,255,.13);--green:#79dfb4;--red:#ff806a}
        *{box-sizing:border-box}html{scroll-behavior:smooth;background:var(--ink)}body{margin:0;background:var(--ink)!important;color:#fff!important;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}button,a{font:inherit}a{color:inherit;text-decoration:none}button{cursor:pointer}.deck{position:relative;z-index:2;overflow:hidden}
        .nav{position:fixed;z-index:80;left:14px;right:14px;top:14px;display:flex;align-items:center;justify-content:space-between;gap:10px}.brand,.navlinks{background:rgba(7,11,14,.82);backdrop-filter:blur(18px);border:1px solid var(--line);border-radius:999px}.brand{display:flex;align-items:center;gap:9px;padding:6px 13px 6px 6px;font-size:9px;font-weight:950;letter-spacing:.11em;white-space:nowrap}.brand b{width:27px;height:27px;border-radius:50%;display:grid;place-items:center;background:var(--yellow);color:var(--ink);font-size:17px}.navlinks{display:flex;gap:2px;padding:4px;overflow:auto}.navlinks a{padding:9px 11px;border-radius:999px;font-size:7px;font-weight:950;letter-spacing:.1em;color:rgba(255,255,255,.65);white-space:nowrap}.navlinks a:hover{background:rgba(255,255,255,.08);color:#fff}
        .hero{min-height:100svh;position:relative;display:flex;align-items:flex-end;background:#05090c}.hero-bg{position:absolute;inset:0;background-size:cover;background-position:center}.hero-bg:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,7,10,.92) 0%,rgba(3,7,10,.72) 44%,rgba(3,7,10,.16) 76%),linear-gradient(0deg,#070b0e 0%,transparent 36%)}.hero-inner{position:relative;width:100%;max-width:1420px;margin:auto;padding:128px clamp(18px,4vw,64px) clamp(34px,5vw,72px)}.kicker{display:flex;align-items:center;gap:10px;color:var(--yellow);font-size:8px;font-weight:950;letter-spacing:.18em;text-transform:uppercase}.kicker:before{content:'';width:28px;height:2px;background:currentColor}.hero h1{font-size:clamp(58px,10.5vw,150px);line-height:.78;letter-spacing:-.075em;text-transform:uppercase;margin:18px 0 28px;max-width:1060px}.hero h1 em{font-style:normal;color:transparent;-webkit-text-stroke:1.4px rgba(255,255,255,.72)}.hero-bottom{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(380px,.9fr);gap:34px;align-items:end}.hero-copy{font-size:clamp(17px,2vw,27px);line-height:1.18;letter-spacing:-.025em;margin:0;max-width:760px;color:rgba(255,255,255,.82)}.hero-metrics{display:grid;grid-template-columns:repeat(2,1fr);border-top:1px solid var(--line);border-left:1px solid var(--line)}.hero-metrics div{padding:14px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);min-height:84px}.hero-metrics b{display:block;font-size:26px;letter-spacing:-.05em}.hero-metrics span{display:block;margin-top:7px;font-size:7px;font-weight:900;letter-spacing:.1em;line-height:1.35;color:var(--muted)}.control-note{margin-top:17px;max-width:910px;border-left:3px solid var(--yellow);padding:7px 0 7px 14px;font-size:8px;line-height:1.5;color:rgba(255,255,255,.66)}.control-note b{color:var(--yellow);letter-spacing:.08em;margin-right:8px}
        .section{padding:clamp(74px,9vw,132px) clamp(18px,4vw,64px);position:relative}.section-inner{max-width:1420px;margin:auto}.light{background:var(--paper);color:var(--ink)}.dark{background:var(--ink);color:#fff}.soft{background:#0b1116;color:#fff}.eyebrow{font-size:8px;font-weight:950;letter-spacing:.17em;text-transform:uppercase;opacity:.55;margin-bottom:14px}.section h2{font-size:clamp(44px,7vw,94px);line-height:.86;letter-spacing:-.065em;text-transform:uppercase;margin:0 0 24px;max-width:1080px}.section h2 em{font-style:normal;color:var(--yellow)}.lead{font-size:clamp(17px,2vw,25px);line-height:1.23;letter-spacing:-.025em;max-width:860px;margin:0;opacity:.7}.footnote{font-size:8px;line-height:1.55;opacity:.5;margin-top:18px;max-width:940px}
        .thesis-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:42px}.thesis-card{border:1px solid rgba(7,11,14,.17);border-radius:22px;padding:22px;min-height:250px;display:flex;flex-direction:column;justify-content:space-between}.thesis-card span{font-size:8px;font-weight:950;letter-spacing:.13em}.thesis-card b{display:block;font-size:clamp(28px,3vw,43px);line-height:.92;letter-spacing:-.055em;text-transform:uppercase}.thesis-card p{font-size:11px;line-height:1.55;opacity:.6;margin:15px 0 0}
        .engine-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:44px;align-items:start}.engine-metrics{display:grid;grid-template-columns:repeat(2,1fr);gap:7px;margin-top:30px}.engine-metric{border:1px solid var(--line);border-radius:18px;padding:18px;min-height:130px;display:flex;flex-direction:column;justify-content:space-between;background:rgba(255,255,255,.025)}.engine-metric b{font-size:clamp(29px,3.8vw,50px);letter-spacing:-.06em;color:var(--yellow)}.engine-metric span{font-size:8px;font-weight:900;letter-spacing:.09em;line-height:1.45;color:var(--muted)}.capacity{border-top:1px solid var(--line)}.capacity-row{display:grid;grid-template-columns:90px 1fr 95px 100px;gap:12px;align-items:center;padding:15px 0;border-bottom:1px solid var(--line)}.capacity-row b{font-size:10px}.capacity-row span{font-size:9px;color:var(--muted)}.capacity-row strong{font-size:12px;text-align:right}.capacity-row i{font-style:normal;font-size:7px;font-weight:950;letter-spacing:.08em;text-align:right}.capacity-row .good{color:var(--green)}.capacity-row .watch{color:var(--yellow)}.capacity-row .risk{color:var(--red)}
        .economics-grid{display:grid;grid-template-columns:.72fr 1.28fr;gap:44px;align-items:start;margin-top:38px}.capex-bars{display:flex;flex-direction:column;gap:14px}.bar{display:grid;grid-template-columns:52px 1fr 110px;gap:11px;align-items:center}.bar span{font-size:8px;font-weight:950;letter-spacing:.12em}.bar-track{height:16px;border-radius:999px;background:rgba(7,11,14,.09);overflow:hidden}.bar-fill{height:100%;border-radius:999px;background:var(--ink)}.bar b{text-align:right;font-size:13px}.economics-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.finance-card{border:1px solid rgba(7,11,14,.16);border-radius:18px;padding:18px;min-height:126px}.finance-card span{font-size:7px;font-weight:950;letter-spacing:.1em;opacity:.5}.finance-card b{display:block;margin-top:12px;font-size:clamp(25px,2.6vw,38px);letter-spacing:-.055em}.finance-card small{display:block;margin-top:7px;font-size:8px;line-height:1.4;opacity:.5}.ramp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:42px}.ramp-card{border:1px solid rgba(7,11,14,.16);border-radius:20px;padding:19px}.ramp-card .year{display:flex;justify-content:space-between;gap:10px;font-size:8px;font-weight:950;letter-spacing:.1em}.ramp-card .year em{font-style:normal;opacity:.42}.ramp-card h3{font-size:34px;letter-spacing:-.055em;margin:20px 0 14px}.ramp-card dl{margin:0;display:grid;gap:9px}.ramp-card dl div{display:flex;justify-content:space-between;gap:12px;padding-top:8px;border-top:1px solid rgba(7,11,14,.12)}.ramp-card dt{font-size:7px;font-weight:900;letter-spacing:.08em;opacity:.48}.ramp-card dd{font-size:9px;font-weight:900;margin:0;text-align:right}
        .funding-layout{display:grid;grid-template-columns:.82fr 1.18fr;gap:42px;align-items:start}.scenario-tabs{display:flex;gap:6px;flex-wrap:wrap;margin-top:28px}.scenario-tabs button{min-width:64px;border:1px solid var(--line);background:transparent;color:#fff;border-radius:999px;padding:10px 13px;font-size:8px;font-weight:950;letter-spacing:.08em}.scenario-tabs button.active{background:var(--yellow);color:var(--ink);border-color:var(--yellow)}.selected-scenario{border:1px solid var(--line);border-radius:26px;padding:24px;background:rgba(255,255,255,.025)}.selected-top{display:flex;justify-content:space-between;align-items:start;gap:18px}.selected-top span{font-size:8px;font-weight:950;letter-spacing:.12em;color:var(--muted)}.selected-top b{font-size:76px;line-height:.8;letter-spacing:-.08em}.selected-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:7px;margin-top:26px}.selected-grid div{border-top:1px solid var(--line);padding-top:12px}.selected-grid span{display:block;font-size:7px;font-weight:900;letter-spacing:.09em;color:var(--muted)}.selected-grid b{display:block;font-size:22px;letter-spacing:-.045em;margin-top:7px}.signal{margin-top:22px;border-left:3px solid var(--yellow);padding-left:14px;font-size:11px;line-height:1.55;color:rgba(255,255,255,.72)}.signal strong{color:#fff}.mini-scenarios{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-top:28px}.mini-scenario{border:1px solid var(--line);border-radius:15px;padding:12px;background:rgba(255,255,255,.02)}.mini-scenario b{display:block;font-size:25px;letter-spacing:-.05em}.mini-scenario span{display:block;margin-top:7px;font-size:7px;color:var(--muted);line-height:1.35}
        .readiness-layout{display:grid;grid-template-columns:.68fr 1.32fr;gap:44px;align-items:start}.status-stack{position:sticky;top:88px;display:grid;gap:8px}.status-card{border:1px solid rgba(7,11,14,.17);border-radius:24px;padding:23px}.status-card strong{display:block;font-size:clamp(46px,7vw,88px);line-height:.82;letter-spacing:-.07em}.status-card span{display:block;margin-top:10px;font-size:8px;font-weight:950;letter-spacing:.1em}.status-card p{font-size:10px;line-height:1.55;opacity:.58;margin:16px 0 0}.status-card.pass{background:var(--ink);color:#fff}.status-card.pass strong{color:var(--green)}.gate-list{border-top:1px solid rgba(7,11,14,.16)}.gate{display:grid;grid-template-columns:48px 1fr auto;gap:14px;align-items:center;padding:13px 0;border-bottom:1px solid rgba(7,11,14,.16)}.gate b{font-size:9px}.gate span{font-size:10px}.gate strong{font-size:8px;letter-spacing:.08em;color:#965711}.path{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:34px}.path-step{border:1px solid rgba(7,11,14,.16);border-radius:17px;padding:16px;min-height:132px}.path-step b{font-size:8px;letter-spacing:.1em}.path-step strong{display:block;font-size:17px;line-height:1.05;margin-top:20px;letter-spacing:-.03em}.path-step span{display:block;font-size:8px;line-height:1.4;opacity:.5;margin-top:8px}
        .visual-stage{margin-top:34px;display:grid;grid-template-columns:minmax(0,1.5fr) minmax(280px,.5fr);background:#0b1217;border:1px solid var(--line);border-radius:26px;overflow:hidden}.visual-media{position:relative;min-height:560px;background:#05090c}.visual-media img{width:100%;height:100%;object-fit:cover;display:block}.visual-media:after{content:'';position:absolute;inset:55% 0 0;background:linear-gradient(transparent,rgba(5,9,12,.88))}.visual-caption{position:absolute;z-index:2;left:22px;right:22px;bottom:20px;display:flex;justify-content:space-between;align-items:end;gap:20px}.visual-caption h3{font-size:clamp(42px,6vw,80px);line-height:.8;letter-spacing:-.065em;text-transform:uppercase;margin:0}.visual-caption span{font-size:8px;font-weight:950;letter-spacing:.14em;color:var(--yellow)}.visual-rail{padding:13px;display:flex;flex-direction:column;gap:4px}.visual-button{width:100%;border:1px solid var(--line);background:transparent;color:#fff;border-radius:12px;padding:10px 11px;display:flex;justify-content:space-between;align-items:center;gap:12px;text-align:left}.visual-button b{font-size:9px}.visual-button span{font-size:7px;color:var(--muted)}.visual-button.active{background:var(--yellow);color:var(--ink);border-color:var(--yellow)}.visual-button.active span{color:rgba(7,11,14,.55)}
        .close{min-height:90svh;display:flex;align-items:center;background:var(--yellow);color:var(--ink)}.close-grid{display:grid;grid-template-columns:1.12fr .88fr;gap:44px;align-items:end;width:100%}.close h2{font-size:clamp(58px,9vw,128px);max-width:900px}.close h2 em{color:transparent;-webkit-text-stroke:1.5px var(--ink)}.close-copy{font-size:15px;line-height:1.52;max-width:520px}.close-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:25px}.close-actions button,.close-actions a{min-height:47px;border-radius:999px;border:1px solid var(--ink);padding:0 18px;display:inline-flex;align-items:center;justify-content:center;font-size:8px;font-weight:950;letter-spacing:.1em;background:transparent;color:var(--ink)}.close-actions .primary{background:var(--ink);color:#fff}.three-d{position:relative;z-index:1;min-height:100svh;background:linear-gradient(180deg,rgba(7,11,14,.04),rgba(7,11,14,.7));display:flex;align-items:end;padding:30px}.three-d-card{max-width:540px;background:rgba(244,240,231,.95);color:var(--ink);padding:21px;border-radius:22px;backdrop-filter:blur(12px)}.three-d-card span{font-size:8px;font-weight:950;letter-spacing:.13em}.three-d-card h3{font-size:40px;line-height:.9;letter-spacing:-.055em;text-transform:uppercase;margin:8px 0 12px}.three-d-card p{font-size:10px;line-height:1.55;opacity:.6;margin:0}
        @media(max-width:1050px){.economics-cards{grid-template-columns:repeat(2,1fr)}.mini-scenarios{grid-template-columns:repeat(3,1fr)}.visual-stage{grid-template-columns:1fr}.visual-media{min-height:470px}.visual-rail{display:grid;grid-template-columns:repeat(3,1fr)}}
        @media(max-width:760px){.nav{left:8px;right:8px;top:8px;align-items:flex-start}.brand{flex:0 0 auto}.navlinks{width:calc(100vw - 154px);justify-content:flex-start;-webkit-overflow-scrolling:touch}.navlinks a{padding:9px 9px}.hero-inner{padding-left:14px;padding-right:14px}.hero-bg{background-position:62% center}.hero-bg:after{background:linear-gradient(0deg,#070b0e 0%,rgba(3,7,10,.64) 53%,rgba(3,7,10,.3) 100%)}.hero h1{font-size:clamp(55px,19vw,84px)}.hero-bottom,.engine-grid,.economics-grid,.funding-layout,.readiness-layout,.close-grid{grid-template-columns:1fr}.hero-bottom{gap:22px}.hero-metrics div{min-height:80px}.section{padding-left:14px;padding-right:14px}.thesis-grid,.ramp-grid{grid-template-columns:1fr}.thesis-card{min-height:195px}.engine-grid{gap:34px}.engine-metrics{grid-template-columns:repeat(2,1fr)}.capacity-row{grid-template-columns:72px 1fr 58px}.capacity-row i{display:none}.economics-cards{grid-template-columns:1fr 1fr}.funding-layout{gap:28px}.selected-top b{font-size:64px}.mini-scenarios{grid-template-columns:repeat(2,1fr)}.status-stack{position:relative;top:auto}.path{grid-template-columns:repeat(2,1fr)}.visual-stage{border-radius:18px}.visual-media{min-height:330px}.visual-rail{grid-template-columns:repeat(2,1fr)}.visual-caption h3{font-size:42px}.three-d{padding:14px}}
      `}</style>

      <div className="deck">
        <nav className="nav">
          <a className="brand" href="#top"><b>+</b><span>RS SUBANG RAYA</span></a>
          <div className="navlinks">
            <a href="#thesis">THESIS</a><a href="#engine">ENGINE</a><a href="#economics">ECONOMICS</a><a href="#funding">FUNDING</a><a href="#readiness">READINESS</a><a href="#visuals">VISUALS</a>
          </div>
        </nav>

        <header id="top" className="hero">
          <div className="hero-bg" style={{backgroundImage:`url(${asset('01-arrival.jpg')})`}} />
          <div className="hero-inner">
            <div className="kicker">Investor presentation · controlled planning case</div>
            <h1>RS SUBANG<br/><em>RAYA</em></h1>
            <div className="hero-bottom">
              <p className="hero-copy">A scalable hospital investment case built around outpatient throughput, surgical capability, disciplined capital planning, and a transparent path from budgetary model to certified investment decision.</p>
              <div className="hero-metrics">
                <div><b>371</b><span>ENGINEERING SPACES</span></div>
                <div><b>66</b><span>PATIENT POSITIONS · 56 + 10 ICU</span></div>
                <div><b>&gt;2.000</b><span>YEAR-4 ENCOUNTERS / DAY</span></div>
                <div><b>Rp861,1 M</b><span>BASE BUDGETARY CAPEX</span></div>
              </div>
            </div>
            <div className="control-note"><b>CONTROL NOTE</b>Budgetary / illustrative planning only. Certified CAPEX, tender pricing, financing commitments and final shareholder terms remain blocked until the required external evidence is closed.</div>
          </div>
        </header>

        <section id="thesis" className="section light">
          <div className="section-inner">
            <div className="eyebrow">01 · Investment thesis</div>
            <h2>Three reasons<br/>to keep <em>underwriting.</em></h2>
            <p className="lead">The current case is strongest when viewed as a controlled operating platform: high planned throughput, meaningful clinical capability, and explicit de-risking gates before capital is treated as committed.</p>
            <div className="thesis-grid">
              <article className="thesis-card"><span>01 / THROUGHPUT</span><div><b>2.000 encounters / day</b><p>Year-4 planning target with 1.600 OPD encounters/day at the center of the operating model.</p></div></article>
              <article className="thesis-card"><span>02 / CLINICAL CAPABILITY</span><div><b>6 OR + critical care</b><p>Six operating rooms, eight pre-op positions, ten PACU positions and ten provisional ICU patient positions.</p></div></article>
              <article className="thesis-card"><span>03 / CAPITAL CONTROL</span><div><b>Release by evidence</b><p>Internal model QA is complete while cost certification, DED / IFC, permits and final capital terms remain evidence-gated.</p></div></article>
            </div>
          </div>
        </section>

        <section id="engine" className="section dark">
          <div className="section-inner engine-grid">
            <div>
              <div className="eyebrow">02 · Operating engine</div>
              <h2>Scale with the<br/><em>bottlenecks visible.</em></h2>
              <p className="lead">The model does not hide where the investment thesis becomes tight. Those pressure points define the next clinical and capital decisions.</p>
              <div className="engine-metrics">
                <div className="engine-metric"><b>56 + 10</b><span>INPATIENT + ICU PATIENT POSITIONS</span></div>
                <div className="engine-metric"><b>6 / 8 / 10</b><span>OR / PRE-OP / PACU POSITIONS</span></div>
                <div className="engine-metric"><b>2×1.600</b><span>kVA TRANSFORMER CONCEPT</span></div>
                <div className="engine-metric"><b>≥658</b><span>MINIMUM DATA OUTLETS</span></div>
              </div>
            </div>
            <div>
              <div className="capacity">
                {capacity.map((item) => <div className="capacity-row" key={item.name}><b>{item.name}</b><span>{item.demand} demand / {item.capacity} modeled capacity</span><strong className={item.tone}>{item.delta}</strong><i className={item.tone}>{item.status}</i></div>)}
              </div>
              <p className="footnote">Planning stress test: inpatient is modeled at limit and CT shows a modeled shortfall; both require validation before final investment release.</p>
            </div>
          </div>
        </section>

        <section id="economics" className="section light">
          <div className="section-inner">
            <div className="eyebrow">03 · Economics</div>
            <h2>Underwrite the ramp.<br/>Do not hide the <em>downside.</em></h2>
            <p className="lead">The current financial model separates budgetary project cost from certified cost, then shows the operating ramp before presenting investor return metrics.</p>
            <div className="economics-grid">
              <div>
                <div className="capex-bars">{capex.map((item) => <div className="bar" key={item.label}><span>{item.label}</span><div className="bar-track"><div className="bar-fill" style={{width:`${item.pct}%`}} /></div><b>{item.value}</b></div>)}</div>
                <p className="footnote">Budgetary total project CAPEX. Certified CAPEX remains pending T10 measured take-off, verified rates, quotations and QS / Finance reconciliation.</p>
              </div>
              <div className="economics-cards">
                <div className="finance-card"><span>BASE CASH · EX LAND</span><b>Rp811,1 M</b><small>Land remains an economic equity / asset input.</small></div>
                <div className="finance-card"><span>CONSTRUCTION PROXY</span><b>Rp475,1 M</b><small>Comparator-based planning figure.</small></div>
                <div className="finance-card"><span>DAY-1 MEDICAL EQUIPMENT</span><b>Rp95,0 M</b><small>Budgetary; T07–T09 open.</small></div>
                <div className="finance-card"><span>WORKING CAPITAL</span><b>Rp76,8 M</b><small>Budgetary planning allowance.</small></div>
                <div className="finance-card"><span>BASE PROJECT EQUITY IRR</span><b>20,50%</b><small>Illustrative; exit-multiple dependent.</small></div>
                <div className="finance-card"><span>BASE MIN. DSCR · Y4–10</span><b>1,20x</b><small>Declining-balance cashflow model.</small></div>
              </div>
            </div>
            <div className="ramp-grid">{ramp.map((item) => <article className="ramp-card" key={item.year}><div className="year"><span>{item.year}</span><em>{item.note}</em></div><h3>{item.encounters}</h3><dl><div><dt>REVENUE</dt><dd>{item.revenue}</dd></div><div><dt>EBITDA</dt><dd>{item.ebitda}</dd></div><div><dt>CFADS</dt><dd>{item.cfads}</dd></div></dl></article>)}</div>
          </div>
        </section>

        <section id="funding" className="section soft">
          <div className="section-inner funding-layout">
            <div>
              <div className="eyebrow">04 · Funding architecture</div>
              <h2>Choose leverage.<br/>See the <em>trade-off.</em></h2>
              <p className="lead">Select a leverage case. The screen exposes the relationship between debt load, equity requirement, Year-4 debt-service coverage and modeled exit MOIC.</p>
              <div className="scenario-tabs">{funding.map((item,index) => <button key={item.debt} className={fundingIndex===index?'active':''} onClick={() => setFundingIndex(index)}>{item.debt} DEBT</button>)}</div>
              <div className="mini-scenarios">{funding.map((item) => <div className="mini-scenario" key={item.debt}><b>{item.dscr}</b><span>{item.debt} DEBT · YEAR-4 DSCR</span></div>)}</div>
            </div>
            <div className="selected-scenario">
              <div className="selected-top"><div><span>{selectedFunding.title.toUpperCase()} · SELECTED CASE</span></div><b>{selectedFunding.debt}</b></div>
              <div className="selected-grid"><div><span>DEBT AMOUNT</span><b>{selectedFunding.debtValue}</b></div><div><span>EQUITY AMOUNT</span><b>{selectedFunding.equity}</b></div><div><span>YEAR-4 DSCR</span><b>{selectedFunding.dscr}</b></div><div><span>EXIT MOIC</span><b>{selectedFunding.moic}</b></div></div>
              <div className="signal"><strong>Current funding conclusion:</strong> the base structure still requires protection through interest reserve, longer grace, lower leverage, or a combination before financing is locked. Sensitivities are not lender commitments.</div>
            </div>
          </div>
        </section>

        <section id="readiness" className="section light">
          <div className="section-inner readiness-layout">
            <div className="status-stack">
              <div className="status-card pass"><strong>PASS</strong><span>INTERNAL MODEL QA COMPLETE</span><p>Controlled internal model, assumptions, funding sensitivities and QA checks are complete.</p></div>
              <div className="status-card"><strong>0 / 11</strong><span>EXTERNAL GATES CLOSED</span><p>Final release still depends on evidence from accountable external parties. This distinction is deliberate.</p></div>
            </div>
            <div>
              <div className="eyebrow">05 · Readiness & de-risking</div>
              <h2>Uncertainty is not hidden.<br/>It is <em>sequenced.</em></h2>
              <div className="gate-list">{readiness.map(([id,name,status]) => <div className="gate" key={id}><b>{id}</b><span>{name}</span><strong>{status}</strong></div>)}</div>
              <div className="path">
                <div className="path-step"><b>01</b><strong>Internal control</strong><span>Model + QA complete.</span></div>
                <div className="path-step"><b>02</b><strong>Evidence closure</strong><span>Survey, geotech, clinical, vendors and engineering.</span></div>
                <div className="path-step"><b>03</b><strong>Cost certification</strong><span>T10 measured BOQ + verified pricing.</span></div>
                <div className="path-step"><b>04</b><strong>Investment release</strong><span>Final capital structure only after required gates close.</span></div>
              </div>
              <p className="footnote">Hard release rule: no final DED / IFC, tender price, certified CAPEX or final share-% claim until required external evidence is closed.</p>
            </div>
          </div>
        </section>

        <section id="visuals" className="section dark">
          <div className="section-inner">
            <div className="eyebrow">06 · Concept experience</div>
            <h2>See the care<br/><em>environment.</em></h2>
            <p className="lead">Concept visualization supports the investment narrative, but does not replace the controlled clinical program, measured quantities or issued-for-construction design.</p>
            <div className="visual-stage">
              <div className="visual-media"><img src={asset(visuals[visualIndex][0])} alt={visuals[visualIndex][1]} /><div className="visual-caption"><div><span>{visuals[visualIndex][2]} · CONCEPT</span><h3>{visuals[visualIndex][1]}</h3></div><span>{String(visualIndex+1).padStart(2,'0')} / {String(visuals.length).padStart(2,'0')}</span></div></div>
              <div className="visual-rail">{visuals.map((item,index) => <button key={item[0]} className={`visual-button ${visualIndex===index?'active':''}`} onClick={() => setVisualIndex(index)}><b>{item[1]}</b><span>{String(index+1).padStart(2,'0')}</span></button>)}</div>
            </div>
          </div>
        </section>

        <section className="section close">
          <div className="section-inner close-grid">
            <div><div className="eyebrow">07 · Investor conversation</div><h2>Invest in the case.<br/><em>Control the release.</em></h2></div>
            <div className="close-copy">The next step is to convert a transparent budgetary case into an investment-ready package by closing evidence, validating capacity, certifying project cost and then locking the capital structure.
              <div className="close-actions"><button className="primary" onClick={enable3D}>{threeD?'OPEN 3D AGAIN':'OPEN OPTIONAL 3D VIEW'}</button><a href="#top">REPLAY PRESENTATION ↑</a></div>
              <p className="footnote">RS Subang Raya · Investor presentation · controlled planning model reviewed 10 Sep 2026.</p>
            </div>
          </div>
        </section>
      </div>

      {threeD ? <section id="three-d" className="three-d"><div className="three-d-card"><span>OPTIONAL 3D · CONCEPT VIEW</span><h3>Explore the hospital.</h3><p>The 3D layer is a concept communication tool. Clinical program, quantities, cost and final design remain governed by the controlled project evidence and release gates.</p></div></section> : null}
    </>
  )
}
