'use client'

import { useState } from 'react'

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

const capex = [
  { label: 'LOW', value: 'Rp699,9 M', pct: 70 },
  { label: 'BASE', value: 'Rp861,1 M', pct: 86 },
  { label: 'HIGH', value: 'Rp1.003,9 M', pct: 100 },
]

const funding = [
  { debt: '40%', debtValue: 'Rp344,4 M', equity: 'Rp516,7 M', dscr: '1,83x', moic: '4,59x', label: 'LOWER LEVERAGE', status: 'strong' },
  { debt: '50%', debtValue: 'Rp430,5 M', equity: 'Rp430,5 M', dscr: '1,47x', moic: '5,46x', label: 'CONSERVATIVE', status: 'strong' },
  { debt: '60%', debtValue: 'Rp516,7 M', equity: 'Rp344,4 M', dscr: '1,07x', moic: '7,08x', label: 'BASE BANK', status: 'watch' },
  { debt: '70%', debtValue: 'Rp602,8 M', equity: 'Rp258,3 M', dscr: '0,90x', moic: '8,97x', label: 'HIGHER LEVERAGE', status: 'risk' },
  { debt: '100%', debtValue: 'Rp861,1 M', equity: 'Rp0', dscr: '0,63x', moic: '—', label: 'STRESS TEST', status: 'risk' },
]

const readiness = [
  ['T01', 'Survey / topography / utilities', 'EXTERNAL'],
  ['T02', 'Geotechnical investigation', '0 / 19'],
  ['T03', 'Structural release', 'OPEN'],
  ['T04', 'Structural penetrations', '0 / 80'],
  ['T05', 'Fire / life-safety decisions', '0 / 1.362'],
  ['T06', 'Lift traffic + vendor packages', '0 / 9'],
  ['T07', 'Medical equipment quotations', '0 / 43'],
  ['T08', 'Radiation shielding evidence', 'OPEN'],
  ['T09', 'Clinical program / RDS approval', '0 / 371'],
  ['T10', 'Measured BOQ + price reconciliation', 'OPEN'],
  ['T11', 'Permits / authority evidence', 'OPEN'],
]

const asset = (file) => `/rs.subangraya/visual/${file}`

export default function Home() {
  const [visualIndex, setVisualIndex] = useState(0)
  const [threeD, setThreeD] = useState(false)

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
        :root{--ink:#070b0e;--paper:#f5f1e8;--muted:#9ea8ad;--yellow:#f4c842;--line:rgba(255,255,255,.12);--card:#0e151a}
        *{box-sizing:border-box}
        html{scroll-behavior:smooth;background:var(--ink)}
        body{margin:0;background:var(--ink)!important;color:#fff!important;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
        button,a{font:inherit}
        a{color:inherit;text-decoration:none}
        .deck{position:relative;z-index:2;overflow:hidden;background:var(--ink)}
        .nav{position:fixed;z-index:50;left:14px;right:14px;top:14px;display:flex;align-items:center;justify-content:space-between;gap:12px;pointer-events:none}
        .brand,.navlinks{pointer-events:auto;background:rgba(7,11,14,.82);backdrop-filter:blur(18px);border:1px solid var(--line);border-radius:999px}
        .brand{display:flex;align-items:center;gap:9px;padding:7px 13px 7px 7px;font-size:10px;font-weight:900;letter-spacing:.11em;white-space:nowrap}
        .brand b{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:var(--yellow);color:var(--ink);font-size:17px}
        .navlinks{display:flex;gap:2px;padding:4px}.navlinks a{font-size:8px;font-weight:900;letter-spacing:.08em;padding:9px 11px;border-radius:999px;color:rgba(255,255,255,.72)}.navlinks a:hover{background:rgba(255,255,255,.08);color:#fff}
        .hero{min-height:100svh;display:grid;align-items:end;padding:120px clamp(18px,4vw,62px) clamp(32px,5vw,70px);position:relative;background:radial-gradient(circle at 78% 18%,rgba(244,200,66,.16),transparent 26%),linear-gradient(180deg,#071016 0%,#070b0e 72%)}
        .hero:before{content:'';position:absolute;inset:0;background:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:64px 64px;mask-image:linear-gradient(to bottom,rgba(0,0,0,.9),transparent 75%)}
        .hero-inner{position:relative;max-width:1380px;width:100%;margin:auto}
        .kicker{display:flex;align-items:center;gap:9px;font-size:9px;font-weight:950;letter-spacing:.15em;color:var(--yellow);text-transform:uppercase}.kicker:before{content:'';width:26px;height:2px;background:currentColor}
        .hero h1{font-size:clamp(58px,11vw,154px);line-height:.78;letter-spacing:-.075em;text-transform:uppercase;margin:20px 0 26px;max-width:1100px}.hero h1 em{font-style:normal;color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,.72)}
        .hero-copy{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(300px,.85fr);gap:34px;align-items:end}.hero-copy>p{font-size:clamp(18px,2.2vw,29px);line-height:1.15;letter-spacing:-.03em;margin:0;max-width:790px;color:rgba(255,255,255,.84)}
        .hero-metrics{display:grid;grid-template-columns:repeat(2,1fr);border-top:1px solid var(--line);border-left:1px solid var(--line)}.hero-metrics div{padding:15px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);min-height:92px}.hero-metrics b{display:block;font-size:27px;letter-spacing:-.05em}.hero-metrics span{display:block;font-size:7px;line-height:1.35;font-weight:900;letter-spacing:.1em;color:var(--muted);margin-top:8px}
        .disclaimer{margin-top:18px;display:flex;gap:12px;align-items:flex-start;padding:11px 13px;border:1px solid rgba(244,200,66,.28);background:rgba(244,200,66,.06);font-size:8px;line-height:1.45;color:rgba(255,255,255,.68);max-width:860px}.disclaimer b{color:var(--yellow);letter-spacing:.08em;white-space:nowrap}
        .section{padding:clamp(72px,9vw,130px) clamp(18px,4vw,62px);position:relative}.section-inner{max-width:1380px;margin:auto}.light{background:var(--paper);color:var(--ink)}.dark{background:var(--ink);color:#fff}.soft{background:#0b1116;color:#fff}
        .eyebrow{font-size:8px;font-weight:950;letter-spacing:.16em;text-transform:uppercase;opacity:.58;margin-bottom:13px}.section h2{font-size:clamp(42px,7vw,92px);line-height:.86;letter-spacing:-.065em;text-transform:uppercase;margin:0 0 26px;max-width:1080px}.section h2 em{font-style:normal;color:var(--yellow)}
        .lead{font-size:clamp(17px,2vw,25px);line-height:1.22;letter-spacing:-.025em;max-width:840px;margin:0;opacity:.72}
        .thesis-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:44px}.thesis-card{border:1px solid currentColor;border-color:rgba(7,11,14,.17);border-radius:22px;padding:22px;min-height:260px;display:flex;flex-direction:column;justify-content:space-between}.thesis-card span{font-size:9px;font-weight:950;letter-spacing:.13em}.thesis-card b{font-size:clamp(28px,3vw,44px);line-height:.92;letter-spacing:-.055em;text-transform:uppercase}.thesis-card p{font-size:11px;line-height:1.55;opacity:.58;margin:15px 0 0}
        .scale{display:grid;grid-template-columns:1fr 1fr;gap:42px;align-items:start}.metric-wall{display:grid;grid-template-columns:repeat(2,1fr);gap:7px}.metric{padding:18px;border:1px solid var(--line);border-radius:18px;min-height:138px;display:flex;flex-direction:column;justify-content:space-between;background:rgba(255,255,255,.025)}.metric b{font-size:clamp(30px,4vw,50px);letter-spacing:-.06em;color:var(--yellow)}.metric span{font-size:8px;font-weight:900;line-height:1.45;letter-spacing:.1em;color:var(--muted)}
        .flow-list{margin-top:26px;border-top:1px solid var(--line)}.flow-row{display:grid;grid-template-columns:80px 1fr auto;gap:14px;align-items:center;padding:14px 0;border-bottom:1px solid var(--line)}.flow-row b{font-size:11px}.flow-row span{font-size:10px;color:var(--muted)}.flow-row strong{font-size:10px;color:var(--yellow)}
        .capex-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:42px;align-items:center;margin-top:38px}.capex-bars{display:flex;flex-direction:column;gap:13px}.bar{display:grid;grid-template-columns:55px 1fr 108px;align-items:center;gap:12px}.bar span{font-size:8px;font-weight:950;letter-spacing:.12em}.bar-track{height:16px;background:rgba(7,11,14,.09);overflow:hidden;border-radius:999px}.bar-fill{height:100%;background:var(--ink);border-radius:999px}.bar b{text-align:right;font-size:13px}.finance-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:7px}.finance-card{border:1px solid rgba(7,11,14,.17);border-radius:18px;padding:18px;min-height:120px}.finance-card span{font-size:8px;font-weight:950;letter-spacing:.1em;opacity:.48}.finance-card b{display:block;font-size:clamp(25px,3vw,39px);letter-spacing:-.055em;margin-top:12px}.finance-card small{display:block;font-size:8px;line-height:1.4;opacity:.48;margin-top:7px}
        .funding-head{display:flex;justify-content:space-between;gap:28px;align-items:end}.funding-note{max-width:420px;font-size:10px;line-height:1.5;color:var(--muted)}.funding-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:7px;margin-top:34px}.fund-card{border:1px solid var(--line);border-radius:20px;padding:18px;min-height:255px;display:flex;flex-direction:column;background:rgba(255,255,255,.025)}.fund-card .tag{font-size:7px;font-weight:950;letter-spacing:.12em;color:var(--muted)}.fund-card h3{font-size:43px;letter-spacing:-.07em;margin:12px 0 18px}.fund-card dl{margin:0;display:grid;gap:10px}.fund-card dl div{display:flex;justify-content:space-between;gap:10px;padding-top:9px;border-top:1px solid var(--line)}.fund-card dt{font-size:7px;color:var(--muted);font-weight:900;letter-spacing:.08em}.fund-card dd{font-size:9px;font-weight:900;margin:0;text-align:right}.fund-card .signal{margin-top:auto;padding-top:18px;font-size:18px;font-weight:950;letter-spacing:-.04em}.fund-card.strong .signal{color:#7ee0b8}.fund-card.watch .signal{color:var(--yellow)}.fund-card.risk .signal{color:#ff806a}
        .callout{margin-top:20px;border-left:3px solid var(--yellow);padding:4px 0 4px 16px;font-size:12px;line-height:1.55;color:rgba(255,255,255,.72);max-width:920px}.callout b{color:#fff}
        .readiness-layout{display:grid;grid-template-columns:.7fr 1.3fr;gap:42px;align-items:start}.readiness-score{position:sticky;top:90px;border:1px solid rgba(7,11,14,.18);border-radius:26px;padding:24px}.readiness-score b{display:block;font-size:clamp(70px,10vw,132px);line-height:.8;letter-spacing:-.08em}.readiness-score span{font-size:9px;font-weight:950;letter-spacing:.12em}.readiness-score p{font-size:10px;line-height:1.55;opacity:.58;margin:20px 0 0}.gate-list{border-top:1px solid rgba(7,11,14,.18)}.gate{display:grid;grid-template-columns:48px 1fr auto;gap:14px;align-items:center;padding:14px 0;border-bottom:1px solid rgba(7,11,14,.18)}.gate b{font-size:9px}.gate span{font-size:10px}.gate strong{font-size:8px;letter-spacing:.09em;color:#9b5b19}
        .visual-stage{margin-top:34px;display:grid;grid-template-columns:minmax(0,1.45fr) minmax(280px,.55fr);background:#0b1217;border:1px solid var(--line);border-radius:26px;overflow:hidden}.visual-media{position:relative;min-height:520px;background:#05090c}.visual-media img{width:100%;height:100%;object-fit:cover;display:block}.visual-media:after{content:'';position:absolute;inset:55% 0 0;background:linear-gradient(transparent,rgba(5,9,12,.82))}.visual-caption{position:absolute;z-index:2;left:22px;right:22px;bottom:20px;display:flex;justify-content:space-between;align-items:end;gap:20px}.visual-caption h3{font-size:clamp(40px,6vw,78px);line-height:.8;letter-spacing:-.065em;text-transform:uppercase;margin:0}.visual-caption span{font-size:8px;font-weight:950;letter-spacing:.14em;color:var(--yellow)}.visual-rail{padding:13px;display:flex;flex-direction:column;gap:4px}.visual-button{width:100%;border:1px solid var(--line);background:transparent;color:#fff;border-radius:12px;padding:10px 11px;display:flex;justify-content:space-between;align-items:center;gap:12px;text-align:left;cursor:pointer}.visual-button b{font-size:9px}.visual-button span{font-size:7px;color:var(--muted);letter-spacing:.08em}.visual-button.active{background:var(--yellow);color:var(--ink);border-color:var(--yellow)}.visual-button.active span{color:rgba(7,11,14,.55)}
        .close{min-height:88svh;display:flex;align-items:center;background:var(--yellow);color:var(--ink)}.close-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:42px;align-items:end;width:100%}.close h2{font-size:clamp(54px,9vw,126px);max-width:900px}.close h2 em{color:transparent;-webkit-text-stroke:1.5px var(--ink)}.close-copy{font-size:15px;line-height:1.5;max-width:510px}.close-actions{display:flex;gap:7px;margin-top:25px;flex-wrap:wrap}.close-actions button,.close-actions a{min-height:47px;border-radius:999px;border:1px solid var(--ink);padding:0 18px;display:inline-flex;align-items:center;justify-content:center;font-size:8px;font-weight:950;letter-spacing:.1em;background:transparent;color:var(--ink);cursor:pointer}.close-actions .primary{background:var(--ink);color:#fff}
        .three-d{position:relative;z-index:1;min-height:100svh;background:linear-gradient(180deg,rgba(7,11,14,.04),rgba(7,11,14,.68));display:flex;align-items:end;padding:30px}.three-d-card{max-width:520px;background:rgba(245,241,232,.94);color:var(--ink);padding:20px;border-radius:22px;backdrop-filter:blur(12px)}.three-d-card span{font-size:8px;font-weight:950;letter-spacing:.13em}.three-d-card h3{font-size:38px;line-height:.9;letter-spacing:-.055em;text-transform:uppercase;margin:8px 0 12px}.three-d-card p{font-size:10px;line-height:1.5;opacity:.6;margin:0}
        .footnote{font-size:8px;line-height:1.5;opacity:.48;margin-top:22px;max-width:960px}
        @media(max-width:1050px){.funding-grid{grid-template-columns:repeat(2,1fr)}.fund-card:last-child{grid-column:span 2}.visual-stage{grid-template-columns:1fr}.visual-media{min-height:460px}.visual-rail{display:grid;grid-template-columns:repeat(3,1fr)}}
        @media(max-width:760px){.nav{left:8px;right:8px;top:8px}.navlinks{display:none}.hero{padding-left:14px;padding-right:14px}.hero-copy,.scale,.capex-grid,.readiness-layout,.close-grid{grid-template-columns:1fr}.hero-copy{gap:22px}.hero h1{font-size:clamp(54px,20vw,86px)}.hero-metrics div{min-height:84px}.thesis-grid{grid-template-columns:1fr}.thesis-card{min-height:200px}.metric-wall{grid-template-columns:repeat(2,1fr)}.funding-head{display:block}.funding-grid{grid-template-columns:1fr}.fund-card:last-child{grid-column:auto}.readiness-score{position:relative;top:auto}.visual-stage{border-radius:18px}.visual-media{min-height:320px}.visual-rail{grid-template-columns:repeat(2,1fr)}.visual-caption h3{font-size:41px}.section{padding-left:14px;padding-right:14px}.bar{grid-template-columns:43px 1fr 88px}.finance-cards{grid-template-columns:1fr 1fr}.three-d{padding:14px}}
      `}</style>

      <div className="deck">
        <nav className="nav">
          <a className="brand" href="#top"><b>+</b><span>RS SUBANG RAYA</span></a>
          <div className="navlinks">
            <a href="#thesis">THESIS</a><a href="#project">PROJECT</a><a href="#economics">ECONOMICS</a><a href="#funding">FUNDING</a><a href="#readiness">READINESS</a><a href="#visuals">VISUALS</a>
          </div>
        </nav>

        <header id="top" className="hero">
          <div className="hero-inner">
            <div className="kicker">Investor presentation · 10 Sep 2026</div>
            <h1>RS Subang<br/><em>Raya.</em></h1>
            <div className="hero-copy">
              <p>A hospital investment platform planned for a <strong>&gt;2,000 patient encounters/day</strong> operating ambition — combining clinical scale, phased capital deployment, and explicit investment-control gates.</p>
              <div className="hero-metrics">
                <div><b>66</b><span>BED / PATIENT POSITION PLANNING BASIS</span></div>
                <div><b>6</b><span>OPERATING ROOMS</span></div>
                <div><b>371</b><span>ENGINEERING SPACES</span></div>
                <div><b>Rp861,1 M</b><span>BASE BUDGETARY CAPEX</span></div>
              </div>
            </div>
            <div className="disclaimer"><b>CONTROL NOTE</b><span>Financial figures are budgetary / illustrative planning outputs, not certified CAPEX, tender pricing, financing commitments, or final shareholder terms. External evidence gates T01–T11 remain open.</span></div>
          </div>
        </header>

        <section id="thesis" className="section light">
          <div className="section-inner">
            <div className="eyebrow">01 · Investment thesis</div>
            <h2>Build the engine.<br/>Scale the <em>throughput.</em></h2>
            <p className="lead">The current planning case is designed around an outpatient-led operating ramp, clinically intensive services, and a capital structure that can be stress-tested before final investment commitment.</p>
            <div className="thesis-grid">
              <article className="thesis-card"><span>01 / SCALE</span><div><b>&gt;2,000 encounters/day</b><p>Year-4 planning target, supported by a 371-space engineering basis and 329 occupied rooms.</p></div></article>
              <article className="thesis-card"><span>02 / CLINICAL ENGINE</span><div><b>6 OR + critical care</b><p>Six operating rooms, eight pre-op positions, ten PACU positions, and ten provisional ICU patient positions in the controlled basis.</p></div></article>
              <article className="thesis-card"><span>03 / CAPITAL DISCIPLINE</span><div><b>Gated before release</b><p>Certified cost, final DED / IFC, final shareholding and tender claims remain blocked until required evidence is traceable.</p></div></article>
            </div>
          </div>
        </section>

        <section id="project" className="section dark">
          <div className="section-inner scale">
            <div>
              <div className="eyebrow">02 · Project engine</div>
              <h2>Clinical capacity<br/>with <em>constraints visible.</em></h2>
              <p className="lead">The investor case does not hide bottlenecks. Capacity stress testing already identifies where clinical validation and future capex decisions matter most.</p>
              <div className="flow-list">
                <div className="flow-row"><b>OPD</b><span>1.600 demand / 1.620 modeled capacity</span><strong>+20</strong></div>
                <div className="flow-row"><b>ED</b><span>160 demand / 184 modeled capacity</span><strong>+24</strong></div>
                <div className="flow-row"><b>INPATIENT</b><span>56,47 required / 56 beds</span><strong>-0,47</strong></div>
                <div className="flow-row"><b>OR</b><span>30 cases / 48 modeled capacity</span><strong>+18</strong></div>
                <div className="flow-row"><b>CT</b><span>40 exams / 32 modeled capacity</span><strong>-8</strong></div>
              </div>
            </div>
            <div className="metric-wall">
              <div className="metric"><b>56 + 10</b><span>INPATIENT + ICU = 66 PATIENT POSITIONS</span></div>
              <div className="metric"><b>6 / 8 / 10</b><span>OR / PRE-OP / PACU POSITIONS</span></div>
              <div className="metric"><b>2×1.600</b><span>kVA TRANSFORMER CONCEPT</span></div>
              <div className="metric"><b>158,99</b><span>m³/DAY WATER PLANNING BASIS</span></div>
              <div className="metric"><b>142 O₂</b><span>MEDICAL OXYGEN OUTLET TARGET</span></div>
              <div className="metric"><b>≥658</b><span>MINIMUM DATA OUTLETS / 329 OCCUPIED ROOMS</span></div>
            </div>
          </div>
        </section>

        <section id="economics" className="section light">
          <div className="section-inner">
            <div className="eyebrow">03 · Economics</div>
            <h2>Budget the downside.<br/>Underwrite the <em>ramp.</em></h2>
            <p className="lead">The base planning model separates budgetary capital from certified cost and shows the operating ramp before presenting investor returns.</p>
            <div className="capex-grid">
              <div className="capex-bars">
                {capex.map((item) => <div className="bar" key={item.label}><span>{item.label}</span><div className="bar-track"><div className="bar-fill" style={{width:`${item.pct}%`}} /></div><b>{item.value}</b></div>)}
                <p className="footnote">Budgetary total project CAPEX. Certified CAPEX remains blank pending T10 measured take-off, verified rates, quotations and QS / Finance reconciliation.</p>
              </div>
              <div className="finance-cards">
                <div className="finance-card"><span>BASE CASH REQUIREMENT · EX LAND</span><b>Rp811,1 M</b><small>Land remains an economic equity / asset input.</small></div>
                <div className="finance-card"><span>DAY-1 MEDICAL EQUIPMENT</span><b>Rp95,0 M</b><small>Budgetary allowance; T07–T09 remain open.</small></div>
                <div className="finance-card"><span>YEAR-4 REVENUE</span><b>Rp1,30 T</b><small>Planning model at 2.000 encounters/day.</small></div>
                <div className="finance-card"><span>YEAR-4 EBITDA</span><b>Rp162,5 M</b><small>12,5% planning EBITDA margin.</small></div>
                <div className="finance-card"><span>YEAR-4 NET PROFIT</span><b>Rp58,5 M</b><small>Illustrative; tax inputs remain subject to review.</small></div>
                <div className="finance-card"><span>BASE PROJECT EQUITY IRR</span><b>20,50%</b><small>Illustrative and exit-multiple dependent.</small></div>
              </div>
            </div>
          </div>
        </section>

        <section id="funding" className="section soft">
          <div className="section-inner">
            <div className="funding-head">
              <div><div className="eyebrow">04 · Funding architecture</div><h2>Leverage changes<br/>the <em>risk.</em></h2></div>
              <p className="funding-note">A five-case leverage screen makes the trade-off explicit. Higher leverage increases modeled equity MOIC but weakens debt-service coverage. These are sensitivity cases, not lender terms.</p>
            </div>
            <div className="funding-grid">
              {funding.map((item) => <article key={item.debt} className={`fund-card ${item.status}`}>
                <span className="tag">{item.label}</span><h3>{item.debt}</h3>
                <dl><div><dt>DEBT</dt><dd>{item.debtValue}</dd></div><div><dt>EQUITY</dt><dd>{item.equity}</dd></div><div><dt>YEAR-4 DSCR</dt><dd>{item.dscr}</dd></div><div><dt>EXIT MOIC</dt><dd>{item.moic}</dd></div></dl>
                <div className="signal">DSCR {item.dscr}</div>
              </article>)}
            </div>
            <div className="callout"><b>Current funding conclusion:</b> ramp-up debt service is not covered under the base structure without additional protection. The model therefore points to interest reserve, longer grace, lower leverage, or a combination before financing is locked.</div>
          </div>
        </section>

        <section id="readiness" className="section light">
          <div className="section-inner readiness-layout">
            <div className="readiness-score">
              <span>INVESTMENT CONTROL</span><b>0 / 11</b><span>EXTERNAL ENGINEERING GATES CLOSED</span>
              <p>This is intentionally transparent. The internal model and control system are complete; final release remains blocked by evidence that must come from surveyors, engineers, clinicians, vendors, QS / Finance, authorities and other accountable parties.</p>
            </div>
            <div>
              <div className="eyebrow">05 · Readiness & de-risking</div>
              <h2>Known unknowns<br/>are <em>controlled.</em></h2>
              <div className="gate-list">{readiness.map(([id,name,status]) => <div className="gate" key={id}><b>{id}</b><span>{name}</span><strong>{status}</strong></div>)}</div>
              <p className="footnote">Hard release rule: no final DED / IFC, tender price, certified CAPEX, or final share-% claim until required external evidence is closed.</p>
            </div>
          </div>
        </section>

        <section id="visuals" className="section dark">
          <div className="section-inner">
            <div className="eyebrow">06 · Concept experience</div>
            <h2>See the care<br/><em>environment.</em></h2>
            <p className="lead">Concept visualizations communicate the intended patient, family and clinical experience. They are not issued-for-construction drawings.</p>
            <div className="visual-stage">
              <div className="visual-media">
                <img src={asset(visuals[visualIndex][0])} alt={visuals[visualIndex][1]} />
                <div className="visual-caption"><div><span>{visuals[visualIndex][2]} · CONCEPT</span><h3>{visuals[visualIndex][1]}</h3></div><span>{String(visualIndex+1).padStart(2,'0')} / {String(visuals.length).padStart(2,'0')}</span></div>
              </div>
              <div className="visual-rail">{visuals.map((item,index) => <button key={item[0]} className={`visual-button ${visualIndex===index?'active':''}`} onClick={() => setVisualIndex(index)}><b>{item[1]}</b><span>{String(index+1).padStart(2,'0')}</span></button>)}</div>
            </div>
          </div>
        </section>

        <section className="section close">
          <div className="section-inner close-grid">
            <div><div className="eyebrow">07 · Investor conversation</div><h2>Capital with<br/><em>control.</em></h2></div>
            <div className="close-copy">The next investment step is not to pretend uncertainty is gone. It is to close evidence, refine the funding structure, and convert a controlled budgetary case into an investable, lender-ready and tender-ready project.
              <div className="close-actions"><button className="primary" onClick={enable3D}>{threeD?'OPEN 3D AGAIN':'OPEN OPTIONAL 3D VIEW'}</button><a href="#top">REPLAY PRESENTATION ↑</a></div>
              <p className="footnote">RS Subang Raya · Investor presentation. Base planning source: controlled BOQ / RAB & Investment model reviewed 10 Sep 2026.</p>
            </div>
          </div>
        </section>
      </div>

      {threeD ? <section id="three-d" className="three-d"><div className="three-d-card"><span>OPTIONAL 3D · CONCEPT VIEW</span><h3>Explore the hospital.</h3><p>The 3D layer is a concept communication tool. Clinical program, quantities, cost and final design remain governed by the controlled project evidence and release gates.</p></div></section> : null}
    </>
  )
}
