'use client'

import { useState } from 'react'

const asset = (file) => `/rs.subangraya/visual/${file}`

const capex = [
  { label: 'RENDAH', value: 'Rp699,9 M', pct: 70 },
  { label: 'DASAR', value: 'Rp861,1 M', pct: 86 },
  { label: 'TINGGI', value: 'Rp1.003,9 M', pct: 100 },
]

const ramp = [
  { year: 'TAHUN 1', encounters: '900 / hari', revenue: 'Rp585,0 M', ebitda: '-Rp29,3 M', cfads: '-Rp41,0 M', note: 'Masa ramp-up', progress: 34 },
  { year: 'TAHUN 4', encounters: '2.000 / hari', revenue: 'Rp1,30 T', ebitda: 'Rp162,5 M', cfads: 'Rp120,0 M', note: 'Kasus operasi dasar', progress: 75 },
  { year: 'TAHUN 10', encounters: '2.680 / hari', revenue: 'Rp1,74 T', ebitda: 'Rp243,9 M', cfads: 'Rp166,7 M', note: 'Kasus matang', progress: 100 },
]

const capacity = [
  { name: 'RAWAT JALAN', demand: '1.600', capacity: '1.620', delta: '+20', status: 'KETAT', tone: 'watch', width: 99 },
  { name: 'IGD', demand: '160', capacity: '184', delta: '+24', status: 'ADA RUANG', tone: 'good', width: 87 },
  { name: 'RAWAT INAP', demand: '56,47', capacity: '56', delta: '-0,47', status: 'BATAS', tone: 'risk', width: 100 },
  { name: 'KAMAR OPERASI', demand: '30', capacity: '48', delta: '+18', status: 'ADA RUANG', tone: 'good', width: 63 },
  { name: 'CT', demand: '40', capacity: '32', delta: '-8', status: 'BOTTLENECK', tone: 'risk', width: 100 },
]

const funding = [
  { debt: '40%', debtValue: 'Rp344,4 M', equity: 'Rp516,7 M', dscr: '1,83x', moic: '4,59x', title: 'Leverage rendah', tone: 'good' },
  { debt: '50%', debtValue: 'Rp430,5 M', equity: 'Rp430,5 M', dscr: '1,47x', moic: '5,46x', title: 'Konservatif', tone: 'good' },
  { debt: '60%', debtValue: 'Rp516,7 M', equity: 'Rp344,4 M', dscr: '1,07x', moic: '7,08x', title: 'Kasus bank dasar', tone: 'watch' },
  { debt: '70%', debtValue: 'Rp602,8 M', equity: 'Rp258,3 M', dscr: '0,90x', moic: '8,97x', title: 'Leverage tinggi', tone: 'risk' },
  { debt: '100%', debtValue: 'Rp861,1 M', equity: 'Rp0', dscr: '0,63x', moic: '—', title: 'Uji tekanan', tone: 'risk' },
]

const readiness = [
  ['T01', 'Survei batas / topografi / utilitas berlisensi', 'EKSTERNAL'],
  ['T02', 'Paket investigasi geoteknik', '0 / 19'],
  ['T03', 'Rilis final struktur / fondasi', 'TERBUKA'],
  ['T04', 'Persetujuan penetrasi struktur', '0 / 80'],
  ['T05', 'Keputusan fire & life-safety', '0 / 1.362'],
  ['T06', 'Studi trafik lift + paket vendor', '0 / 9'],
  ['T07', 'Paket vendor peralatan medis', '0 / 43'],
  ['T08', 'Bukti shielding radiasi / N.A. tertandatangani', 'TERBUKA'],
  ['T09', 'Persetujuan program klinis / RDS', '0 / 371'],
  ['T10', 'BOQ terukur + rekonsiliasi QS / Finance', 'TERBUKA'],
  ['T11', 'Bukti izin / otoritas yang telah terbit', 'TERBUKA'],
]

const visuals = [
  ['01-arrival.jpg', 'Area Kedatangan', 'EKSTERIOR'],
  ['03-main-lobby.jpg', 'Lobi Utama', 'PUBLIK'],
  ['04-polyclinic.jpg', 'Poliklinik', 'RAWAT JALAN'],
  ['05-nurse-station.jpg', 'Nurse Station', 'RAWAT INAP'],
  ['06-patient-room.jpg', 'Kamar Pasien', 'PASIEN'],
  ['07-icu-hcu.jpg', 'ICU + HCU', 'KRITIS'],
  ['08-operating-theatre.jpg', 'Kamar Operasi', 'BEDAH'],
  ['09-imaging.jpg', 'Pencitraan', 'DIAGNOSTIK'],
  ['10-pharmacy.jpg', 'Farmasi', 'FARMASI'],
  ['11-executive-lounge.jpg', 'Lounge Eksekutif', 'EKSEKUTIF'],
  ['12-public-lounge.jpg', 'Lounge Publik', 'AMENITAS'],
]

const pathway = [
  ['01', 'Kontrol internal', 'Model, asumsi dan QA internal sudah lengkap.'],
  ['02', 'Penutupan bukti', 'Survei, geoteknik, klinis, vendor, struktur dan izin.'],
  ['03', 'Sertifikasi biaya', 'BOQ terukur + harga terverifikasi + rekonsiliasi T10.'],
  ['04', 'Rilis investasi', 'Struktur modal final setelah gate wajib benar-benar tertutup.'],
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
    }, 120)
  }

  return (
    <>
      <style>{`
        :root{--ink:#060a0d;--ink2:#0b1217;--paper:#f2eee5;--yellow:#f4c842;--muted:#8f9aa0;--line:rgba(255,255,255,.13);--green:#79dfb4;--red:#ff806a;--orange:#ffb35c}
        *{box-sizing:border-box}html{scroll-behavior:smooth;background:var(--ink)}body{margin:0;background:var(--ink)!important;color:#fff!important;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}button,a{font:inherit}a{color:inherit;text-decoration:none}button{cursor:pointer}.deck{position:relative;z-index:2;overflow:hidden}
        .nav{position:fixed;z-index:80;left:14px;right:14px;top:14px;display:flex;align-items:center;justify-content:space-between;gap:10px}.brand,.navlinks{background:rgba(6,10,13,.84);backdrop-filter:blur(18px);border:1px solid var(--line);border-radius:999px}.brand{display:flex;align-items:center;gap:9px;padding:6px 13px 6px 6px;font-size:9px;font-weight:950;letter-spacing:.11em;white-space:nowrap}.brand b{width:27px;height:27px;border-radius:50%;display:grid;place-items:center;background:var(--yellow);color:var(--ink);font-size:17px}.navlinks{display:flex;gap:2px;padding:4px;overflow:auto}.navlinks a{padding:9px 11px;border-radius:999px;font-size:7px;font-weight:950;letter-spacing:.1em;color:rgba(255,255,255,.65);white-space:nowrap}.navlinks a:hover{background:rgba(255,255,255,.08);color:#fff}
        .hero{min-height:100svh;position:relative;display:flex;align-items:flex-end;background:#05090c}.hero-bg{position:absolute;inset:0;background-image:url('${asset('01-arrival.jpg')}');background-size:cover;background-position:center}.hero-bg:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,7,10,.95) 0%,rgba(3,7,10,.76) 42%,rgba(3,7,10,.2) 76%),linear-gradient(0deg,#060a0d 0%,transparent 40%)}.hero-gridlines{position:absolute;inset:0;background:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:70px 70px;mask-image:linear-gradient(to right,#000,transparent 72%);pointer-events:none}.hero-inner{position:relative;width:100%;max-width:1420px;margin:auto;padding:128px clamp(18px,4vw,64px) clamp(34px,5vw,72px)}.kicker{display:flex;align-items:center;gap:10px;color:var(--yellow);font-size:8px;font-weight:950;letter-spacing:.18em;text-transform:uppercase}.kicker:before{content:'';width:28px;height:2px;background:currentColor}.hero h1{font-size:clamp(58px,10.5vw,150px);line-height:.78;letter-spacing:-.075em;text-transform:uppercase;margin:18px 0 28px;max-width:1060px}.hero h1 em{font-style:normal;color:transparent;-webkit-text-stroke:1.4px rgba(255,255,255,.72)}.hero-bottom{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(380px,.92fr);gap:34px;align-items:end}.hero-copy{font-size:clamp(17px,2vw,27px);line-height:1.18;letter-spacing:-.025em;margin:0;max-width:760px;color:rgba(255,255,255,.84)}.hero-metrics{display:grid;grid-template-columns:repeat(2,1fr);border-top:1px solid var(--line);border-left:1px solid var(--line);background:rgba(6,10,13,.32);backdrop-filter:blur(12px)}.hero-metrics div{padding:14px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);min-height:84px}.hero-metrics b{display:block;font-size:26px;letter-spacing:-.05em}.hero-metrics span{display:block;margin-top:7px;font-size:7px;font-weight:900;letter-spacing:.1em;line-height:1.35;color:var(--muted)}.control-note{margin-top:17px;max-width:930px;border-left:3px solid var(--yellow);padding:7px 0 7px 14px;font-size:8px;line-height:1.5;color:rgba(255,255,255,.68)}.control-note b{color:var(--yellow);letter-spacing:.08em;margin-right:8px}
        .section{padding:clamp(74px,9vw,132px) clamp(18px,4vw,64px);position:relative}.section-inner{max-width:1420px;margin:auto}.light{background:var(--paper);color:var(--ink)}.dark{background:var(--ink);color:#fff}.soft{background:#0b1116;color:#fff}.eyebrow{font-size:8px;font-weight:950;letter-spacing:.17em;text-transform:uppercase;opacity:.55;margin-bottom:14px}.section h2{font-size:clamp(44px,7vw,94px);line-height:.86;letter-spacing:-.065em;text-transform:uppercase;margin:0 0 24px;max-width:1100px}.section h2 em{font-style:normal;color:var(--yellow)}.lead{font-size:clamp(17px,2vw,25px);line-height:1.23;letter-spacing:-.025em;max-width:880px;margin:0;opacity:.7}.footnote{font-size:8px;line-height:1.55;opacity:.52;margin-top:18px;max-width:960px}
        .thesis-layout{display:grid;grid-template-columns:.72fr 1.28fr;gap:46px;align-items:start}.thesis-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:42px}.thesis-card{border:1px solid rgba(7,11,14,.17);border-radius:22px;padding:22px;min-height:250px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}.thesis-card:after{content:'';position:absolute;width:90px;height:90px;border:1px solid rgba(7,11,14,.1);border-radius:50%;right:-28px;bottom:-30px}.thesis-card span{font-size:8px;font-weight:950;letter-spacing:.13em}.thesis-card b{display:block;font-size:clamp(28px,3vw,43px);line-height:.92;letter-spacing:-.055em;text-transform:uppercase}.thesis-card p{font-size:11px;line-height:1.55;opacity:.6;margin:15px 0 0}.platform-illu{min-height:420px;border:1px solid rgba(7,11,14,.16);border-radius:30px;padding:24px;position:relative;overflow:hidden;background:linear-gradient(145deg,#faf7f0,#eae4d8)}.platform-illu:before{content:'';position:absolute;inset:0;background:linear-gradient(rgba(7,11,14,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(7,11,14,.04) 1px,transparent 1px);background-size:38px 38px}.hospital-core{position:relative;width:min(270px,70%);height:265px;margin:54px auto 0;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;align-items:end}.tower{border:2px solid var(--ink);border-radius:14px 14px 5px 5px;background:rgba(244,200,66,.12);display:grid;grid-template-columns:repeat(2,1fr);gap:5px;padding:10px;height:72%}.tower.t2{height:100%;background:var(--ink)}.tower.t3{height:84%}.tower i{display:block;border-radius:2px;background:var(--ink);opacity:.75}.tower.t2 i{background:var(--yellow);opacity:.8}.cross{position:absolute;left:50%;top:17%;transform:translate(-50%,-50%);width:50px;height:50px;border-radius:50%;background:var(--yellow);color:var(--ink);display:grid;place-items:center;font-style:normal;font-size:30px;font-weight:950;box-shadow:0 12px 35px rgba(244,200,66,.35)}.platform-tags{position:absolute;inset:20px;pointer-events:none}.platform-tags span{position:absolute;border:1px solid rgba(7,11,14,.18);background:rgba(255,255,255,.64);backdrop-filter:blur(8px);border-radius:999px;padding:8px 10px;font-size:7px;font-weight:950;letter-spacing:.1em}.platform-tags span:nth-child(1){left:0;top:18px}.platform-tags span:nth-child(2){right:0;top:70px}.platform-tags span:nth-child(3){left:3px;bottom:22px}.platform-tags span:nth-child(4){right:8px;bottom:8px}.platform-base{position:absolute;left:8%;right:8%;bottom:24px;height:2px;background:var(--ink)}
        .engine-grid{display:grid;grid-template-columns:.82fr 1.18fr;gap:44px;align-items:start}.engine-metrics{display:grid;grid-template-columns:repeat(2,1fr);gap:7px;margin-top:30px}.engine-metric{border:1px solid var(--line);border-radius:18px;padding:18px;min-height:130px;display:flex;flex-direction:column;justify-content:space-between;background:rgba(255,255,255,.025)}.engine-metric b{font-size:clamp(29px,3.8vw,50px);letter-spacing:-.06em;color:var(--yellow)}.engine-metric span{font-size:8px;font-weight:900;letter-spacing:.09em;line-height:1.45;color:var(--muted)}.capacity{border-top:1px solid var(--line)}.capacity-row{padding:14px 0;border-bottom:1px solid var(--line)}.capacity-top{display:grid;grid-template-columns:116px 1fr 75px 96px;gap:12px;align-items:center}.capacity-top b{font-size:9px}.capacity-top span{font-size:9px;color:var(--muted)}.capacity-top strong{font-size:12px;text-align:right}.capacity-top i{font-style:normal;font-size:7px;font-weight:950;letter-spacing:.08em;text-align:right}.capacity-line{height:4px;background:rgba(255,255,255,.08);border-radius:999px;margin-top:10px;overflow:hidden}.capacity-line span{display:block;height:100%;border-radius:999px;background:var(--yellow)}.capacity-row.good .capacity-line span{background:var(--green)}.capacity-row.risk .capacity-line span{background:var(--red)}.good{color:var(--green)}.watch{color:var(--yellow)}.risk{color:var(--red)}
        .flow-illu{margin-top:34px;border:1px solid var(--line);border-radius:24px;padding:18px;background:rgba(255,255,255,.02)}.flow-title{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:16px}.flow-title b{font-size:8px;letter-spacing:.12em}.flow-title span{font-size:8px;color:var(--muted)}.patient-flow{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;align-items:center}.patient-node{min-height:86px;border:1px solid var(--line);border-radius:16px;padding:12px;position:relative;display:flex;flex-direction:column;justify-content:space-between}.patient-node:not(:last-child):after{content:'→';position:absolute;right:-10px;top:50%;transform:translateY(-50%);z-index:2;width:18px;height:18px;border-radius:50%;background:var(--yellow);color:var(--ink);display:grid;place-items:center;font-size:10px;font-weight:950}.patient-node b{font-size:9px}.patient-node span{font-size:7px;color:var(--muted);line-height:1.35}
        .economics-grid{display:grid;grid-template-columns:.72fr 1.28fr;gap:44px;align-items:start;margin-top:38px}.capex-ring-wrap{display:grid;grid-template-columns:170px 1fr;gap:20px;align-items:center;margin-bottom:24px}.capex-ring{width:170px;height:170px;border-radius:50%;background:conic-gradient(var(--yellow) 0 59%,#d7d0c3 59% 79%,#c7bfae 79% 88%,#b3aa98 88% 100%);display:grid;place-items:center;position:relative}.capex-ring:after{content:'';width:112px;height:112px;border-radius:50%;background:var(--paper);position:absolute}.capex-ring-core{position:relative;z-index:2;text-align:center}.capex-ring-core b{display:block;font-size:24px;letter-spacing:-.06em}.capex-ring-core span{font-size:7px;font-weight:950;letter-spacing:.1em;opacity:.55}.capex-legend{display:grid;gap:8px}.capex-legend div{display:grid;grid-template-columns:10px 1fr auto;gap:8px;align-items:center;padding-bottom:8px;border-bottom:1px solid rgba(7,11,14,.1)}.capex-legend i{width:8px;height:8px;border-radius:50%;background:var(--yellow)}.capex-legend div:nth-child(2) i{background:#d7d0c3}.capex-legend div:nth-child(3) i{background:#c7bfae}.capex-legend div:nth-child(4) i{background:#b3aa98}.capex-legend span{font-size:8px;opacity:.58}.capex-legend b{font-size:9px}.capex-bars{display:flex;flex-direction:column;gap:14px}.bar{display:grid;grid-template-columns:60px 1fr 112px;gap:11px;align-items:center}.bar span{font-size:8px;font-weight:950;letter-spacing:.12em}.bar-track{height:13px;border-radius:999px;background:rgba(7,11,14,.09);overflow:hidden}.bar-fill{height:100%;border-radius:999px;background:var(--ink)}.bar b{text-align:right;font-size:13px}.economics-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.finance-card{border:1px solid rgba(7,11,14,.16);border-radius:18px;padding:18px;min-height:126px;position:relative;overflow:hidden}.finance-card:before{content:'';position:absolute;left:0;top:0;width:4px;height:100%;background:var(--yellow);opacity:.75}.finance-card span{font-size:7px;font-weight:950;letter-spacing:.1em;opacity:.5}.finance-card b{display:block;margin-top:12px;font-size:clamp(25px,2.6vw,38px);letter-spacing:-.055em}.finance-card small{display:block;margin-top:7px;font-size:8px;line-height:1.4;opacity:.5}.ramp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:42px}.ramp-card{border:1px solid rgba(7,11,14,.16);border-radius:20px;padding:19px;position:relative;overflow:hidden}.ramp-card .year{display:flex;justify-content:space-between;gap:10px;font-size:8px;font-weight:950;letter-spacing:.1em}.ramp-card .year em{font-style:normal;opacity:.42}.ramp-card h3{font-size:34px;letter-spacing:-.055em;margin:20px 0 14px}.ramp-card dl{margin:0;display:grid;gap:9px}.ramp-card dl div{display:flex;justify-content:space-between;gap:12px;padding-top:8px;border-top:1px solid rgba(7,11,14,.12)}.ramp-card dt{font-size:7px;font-weight:900;letter-spacing:.08em;opacity:.48}.ramp-card dd{font-size:9px;font-weight:900;margin:0;text-align:right}.ramp-progress{height:6px;background:rgba(7,11,14,.08);border-radius:999px;margin-top:17px;overflow:hidden}.ramp-progress i{display:block;height:100%;background:var(--ink);border-radius:999px}
        .funding-layout{display:grid;grid-template-columns:.82fr 1.18fr;gap:42px;align-items:start}.scenario-tabs{display:flex;gap:6px;flex-wrap:wrap;margin-top:28px}.scenario-tabs button{min-width:64px;border:1px solid var(--line);background:transparent;color:#fff;border-radius:999px;padding:10px 13px;font-size:8px;font-weight:950;letter-spacing:.08em}.scenario-tabs button.active{background:var(--yellow);color:var(--ink);border-color:var(--yellow)}.leverage-illu{margin-top:30px;display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center}.capital-pool{min-height:132px;border:1px solid var(--line);border-radius:22px;padding:17px;background:rgba(255,255,255,.025);position:relative;overflow:hidden}.capital-pool:after{content:'';position:absolute;left:0;right:0;bottom:0;height:var(--fill);background:rgba(244,200,66,.11);border-top:1px solid rgba(244,200,66,.35)}.capital-pool b,.capital-pool span{position:relative;z-index:2}.capital-pool b{display:block;font-size:25px;letter-spacing:-.05em}.capital-pool span{display:block;margin-top:8px;font-size:7px;font-weight:950;letter-spacing:.1em;color:var(--muted)}.capital-equals{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:var(--yellow);color:var(--ink);font-weight:950}.selected-scenario{border:1px solid var(--line);border-radius:28px;padding:25px;background:linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.012));box-shadow:0 24px 80px rgba(0,0,0,.22)}.selected-top{display:flex;justify-content:space-between;align-items:start;gap:18px}.selected-top span{font-size:8px;font-weight:950;letter-spacing:.12em;color:var(--muted)}.selected-top b{font-size:76px;line-height:.8;letter-spacing:-.08em}.selected-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:7px;margin-top:28px}.selected-grid div{border:1px solid var(--line);border-radius:16px;padding:15px;min-height:98px}.selected-grid span{font-size:7px;font-weight:900;letter-spacing:.09em;color:var(--muted)}.selected-grid b{display:block;font-size:25px;letter-spacing:-.05em;margin-top:10px}.signal{margin-top:16px;border-left:3px solid var(--yellow);padding:8px 0 8px 13px;font-size:10px;line-height:1.55;color:rgba(255,255,255,.68)}.signal strong{color:#fff}.mini-scenarios{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-top:14px}.mini-scenario{padding:10px;border:1px solid var(--line);border-radius:13px}.mini-scenario b{font-size:12px}.mini-scenario span{display:block;margin-top:4px;font-size:6px;line-height:1.35;color:var(--muted)}
        .readiness-layout{display:grid;grid-template-columns:.72fr 1.28fr;gap:44px;align-items:start}.status-stack{display:grid;gap:8px;position:sticky;top:90px}.status-card{border:1px solid rgba(7,11,14,.17);border-radius:24px;padding:23px;background:rgba(255,255,255,.42)}.status-card.pass{background:var(--ink);color:#fff}.status-card strong{display:block;font-size:clamp(52px,7vw,92px);line-height:.82;letter-spacing:-.07em}.status-card.pass strong{color:var(--green)}.status-card span{display:block;margin-top:14px;font-size:8px;font-weight:950;letter-spacing:.12em}.status-card p{font-size:10px;line-height:1.5;opacity:.58;margin:13px 0 0}.gate-list{border-top:1px solid rgba(7,11,14,.18)}.gate{display:grid;grid-template-columns:48px 1fr auto;gap:14px;align-items:center;padding:13px 0;border-bottom:1px solid rgba(7,11,14,.18)}.gate b{font-size:9px}.gate span{font-size:10px}.gate strong{font-size:8px;letter-spacing:.09em;color:#9b5b19}.path{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:28px}.path-step{border:1px solid rgba(7,11,14,.16);border-radius:17px;padding:15px;min-height:152px;position:relative}.path-step:not(:last-child):after{content:'→';position:absolute;right:-11px;top:18px;width:20px;height:20px;border-radius:50%;background:var(--yellow);display:grid;place-items:center;font-size:10px;font-weight:950;z-index:2}.path-step>b{font-size:10px;color:#9b5b19}.path-step strong{display:block;margin-top:26px;font-size:12px}.path-step span{display:block;margin-top:8px;font-size:8px;line-height:1.45;opacity:.58}
        .visual-stage{margin-top:34px;display:grid;grid-template-columns:minmax(0,1.45fr) minmax(280px,.55fr);background:#0b1217;border:1px solid var(--line);border-radius:26px;overflow:hidden}.visual-media{position:relative;min-height:540px;background:#05090c}.visual-media img{width:100%;height:100%;object-fit:cover;display:block}.visual-media:after{content:'';position:absolute;inset:54% 0 0;background:linear-gradient(transparent,rgba(5,9,12,.88))}.visual-caption{position:absolute;z-index:2;left:22px;right:22px;bottom:20px;display:flex;justify-content:space-between;align-items:end;gap:20px}.visual-caption h3{font-size:clamp(40px,6vw,78px);line-height:.8;letter-spacing:-.065em;text-transform:uppercase;margin:0}.visual-caption span{font-size:8px;font-weight:950;letter-spacing:.14em;color:var(--yellow)}.visual-rail{padding:13px;display:flex;flex-direction:column;gap:4px}.visual-button{width:100%;border:1px solid var(--line);background:transparent;color:#fff;border-radius:12px;padding:10px 11px;display:flex;justify-content:space-between;align-items:center;gap:12px;text-align:left}.visual-button b{font-size:9px}.visual-button span{font-size:7px;color:var(--muted);letter-spacing:.08em}.visual-button.active{background:var(--yellow);color:var(--ink);border-color:var(--yellow)}.visual-button.active span{color:rgba(7,11,14,.55)}
        .close{min-height:90svh;display:flex;align-items:center;background:var(--yellow);color:var(--ink);overflow:hidden}.close:after{content:'+';position:absolute;right:-5vw;bottom:-14vw;font-size:45vw;line-height:1;font-weight:1000;color:rgba(7,11,14,.05);pointer-events:none}.close-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:42px;align-items:end;width:100%;position:relative;z-index:2}.close h2{font-size:clamp(54px,9vw,126px);max-width:920px}.close h2 em{color:transparent;-webkit-text-stroke:1.5px var(--ink)}.close-copy{font-size:15px;line-height:1.5;max-width:540px}.close-actions{display:flex;gap:7px;margin-top:25px;flex-wrap:wrap}.close-actions button,.close-actions a{min-height:47px;border-radius:999px;border:1px solid var(--ink);padding:0 18px;display:inline-flex;align-items:center;justify-content:center;font-size:8px;font-weight:950;letter-spacing:.1em;background:transparent;color:var(--ink)}.close-actions .primary{background:var(--ink);color:#fff}.three-d{position:relative;z-index:1;min-height:100svh;background:linear-gradient(180deg,rgba(7,11,14,.04),rgba(7,11,14,.72));display:flex;align-items:end;padding:30px}.three-d-card{max-width:540px;background:rgba(242,238,229,.95);color:var(--ink);padding:22px;border-radius:22px;backdrop-filter:blur(12px)}.three-d-card span{font-size:8px;font-weight:950;letter-spacing:.13em}.three-d-card h3{font-size:38px;line-height:.9;letter-spacing:-.055em;text-transform:uppercase;margin:8px 0 12px}.three-d-card p{font-size:10px;line-height:1.5;opacity:.6;margin:0}
        @media(max-width:1080px){.thesis-layout{grid-template-columns:1fr}.platform-illu{min-height:380px}.funding-layout{grid-template-columns:1fr}.readiness-layout{grid-template-columns:1fr}.status-stack{position:relative;top:auto;grid-template-columns:1fr 1fr}.visual-stage{grid-template-columns:1fr}.visual-media{min-height:460px}.visual-rail{display:grid;grid-template-columns:repeat(3,1fr)}}
        @media(max-width:760px){.nav{left:8px;right:8px;top:8px}.navlinks{display:none}.hero-inner{padding-left:14px;padding-right:14px}.hero h1{font-size:clamp(54px,20vw,86px)}.hero-bottom,.engine-grid,.economics-grid,.close-grid{grid-template-columns:1fr}.hero-bottom{gap:22px}.section{padding-left:14px;padding-right:14px}.thesis-grid,.ramp-grid{grid-template-columns:1fr}.thesis-card{min-height:195px}.engine-metrics{grid-template-columns:repeat(2,1fr)}.capacity-top{grid-template-columns:90px 1fr 55px}.capacity-top i{display:none}.patient-flow{grid-template-columns:1fr}.patient-node:not(:last-child):after{content:'↓';right:50%;top:auto;bottom:-13px;transform:translateX(50%)}.capex-ring-wrap{grid-template-columns:1fr}.capex-ring{margin:auto}.economics-cards{grid-template-columns:repeat(2,1fr)}.selected-top b{font-size:62px}.mini-scenarios{grid-template-columns:repeat(5,minmax(82px,1fr));overflow-x:auto;padding-bottom:5px}.status-stack{grid-template-columns:1fr}.path{grid-template-columns:1fr}.path-step:not(:last-child):after{content:'↓';right:auto;left:18px;top:auto;bottom:-12px}.visual-stage{border-radius:18px}.visual-media{min-height:320px}.visual-rail{grid-template-columns:repeat(2,1fr)}.visual-caption h3{font-size:39px}.platform-tags span{font-size:6px}.three-d{padding:14px}}
        @media(max-width:470px){.hero-metrics{grid-template-columns:1fr 1fr}.hero-metrics b{font-size:21px}.economics-cards{grid-template-columns:1fr}.engine-metrics{grid-template-columns:1fr 1fr}.selected-grid{grid-template-columns:1fr 1fr}.platform-illu{min-height:340px}.hospital-core{height:220px;margin-top:66px}.visual-rail{grid-template-columns:1fr 1fr}}
      `}</style>

      <div className="deck">
        <nav className="nav">
          <a className="brand" href="#atas"><b>+</b><span>RS SUBANG RAYA</span></a>
          <div className="navlinks">
            <a href="#tesis">TESIS</a><a href="#operasi">OPERASI</a><a href="#ekonomi">EKONOMI</a><a href="#pendanaan">PENDANAAN</a><a href="#kesiapan">KESIAPAN</a><a href="#visual">VISUAL</a>
          </div>
        </nav>

        <header id="atas" className="hero">
          <div className="hero-bg"/><div className="hero-gridlines"/>
          <div className="hero-inner">
            <div className="kicker">Presentasi Investor · RS Subang Raya</div>
            <h1>Platform layanan kesehatan<br/><em>yang dibangun untuk tumbuh.</em></h1>
            <div className="hero-bottom">
              <p className="hero-copy">Kasus investasi saat ini berangkat dari kapasitas klinis terukur, model operasi bertahap, disiplin modal, dan sistem gate yang menjaga agar keputusan final tidak melampaui bukti yang tersedia.</p>
              <div className="hero-metrics">
                <div><b>371</b><span>BASIS RUANG ENGINEERING</span></div>
                <div><b>66</b><span>POSISI PASIEN · 56 RAWAT INAP + 10 ICU</span></div>
                <div><b>&gt;2.000</b><span>TARGET ENCOUNTERS / HARI</span></div>
                <div><b>Rp861,1 M</b><span>CAPEX DASAR · BUDGETARY</span></div>
              </div>
            </div>
            <div className="control-note"><b>CATATAN KONTROL</b> Angka finansial pada presentasi ini merupakan output perencanaan budgetary / ilustratif, bukan CAPEX tersertifikasi, harga tender, komitmen pembiayaan, atau pembagian saham final. Gate bukti eksternal T01–T11 masih terbuka.</div>
          </div>
        </header>

        <section id="tesis" className="section light">
          <div className="section-inner thesis-layout">
            <div>
              <div className="eyebrow">01 · Tesis investasi</div>
              <h2>Bukan sekadar gedung.<br/>Ini <em>platform operasi.</em></h2>
              <p className="lead">Nilai investasi dibangun dari throughput, kemampuan klinis, disiplin biaya, dan tahapan de-risking yang jelas sebelum modal diperlakukan sebagai komitmen final.</p>
              <div className="thesis-grid">
                <article className="thesis-card"><span>01 / THROUGHPUT</span><div><b>2.000 encounter / hari</b><p>Target perencanaan Tahun 4, dengan 1.600 encounter rawat jalan per hari sebagai mesin volume utama.</p></div></article>
                <article className="thesis-card"><span>02 / KLINIS</span><div><b>6 OR + critical care</b><p>Enam kamar operasi, delapan posisi pre-op, sepuluh PACU, dan sepuluh posisi pasien ICU provisional.</p></div></article>
                <article className="thesis-card"><span>03 / KONTROL MODAL</span><div><b>Rilis berbasis bukti</b><p>QA internal telah lengkap; sertifikasi biaya, DED/IFC, izin, dan struktur modal final tetap dibatasi oleh evidence gate.</p></div></article>
              </div>
            </div>
            <div className="platform-illu" aria-label="Ilustrasi platform rumah sakit">
              <div className="platform-tags"><span>RAWAT JALAN</span><span>BEDAH</span><span>DIAGNOSTIK</span><span>RAWAT INAP + ICU</span></div>
              <div className="hospital-core"><div className="tower t1">{Array.from({length:8}).map((_,i)=><i key={i}/>)}</div><div className="tower t2">{Array.from({length:10}).map((_,i)=><i key={i}/>)}</div><div className="tower t3">{Array.from({length:8}).map((_,i)=><i key={i}/>)}</div><div className="cross">+</div></div>
              <div className="platform-base"/>
            </div>
          </div>
        </section>

        <section id="operasi" className="section dark">
          <div className="section-inner engine-grid">
            <div>
              <div className="eyebrow">02 · Mesin operasi</div>
              <h2>Tumbuh dengan<br/><em>bottleneck terlihat.</em></h2>
              <p className="lead">Model tidak menyembunyikan titik yang ketat. Justru di situlah keputusan klinis dan CAPEX berikutnya perlu difokuskan.</p>
              <div className="engine-metrics">
                <div className="engine-metric"><b>56 + 10</b><span>RAWAT INAP + ICU = 66 POSISI PASIEN</span></div>
                <div className="engine-metric"><b>6 / 8 / 10</b><span>OR / PRE-OP / PACU</span></div>
                <div className="engine-metric"><b>2×1.600</b><span>kVA KONSEP TRANSFORMER</span></div>
                <div className="engine-metric"><b>≥658</b><span>MINIMUM DATA OUTLET</span></div>
              </div>
            </div>
            <div>
              <div className="capacity">
                {capacity.map((item) => <div className={`capacity-row ${item.tone}`} key={item.name}><div className="capacity-top"><b>{item.name}</b><span>{item.demand} kebutuhan / {item.capacity} kapasitas model</span><strong className={item.tone}>{item.delta}</strong><i className={item.tone}>{item.status}</i></div><div className="capacity-line"><span style={{width:`${item.width}%`}}/></div></div>)}
              </div>
              <p className="footnote">Uji tekanan perencanaan: rawat inap berada pada batas model dan CT menunjukkan kekurangan kapasitas model. Keduanya perlu divalidasi sebelum rilis investasi final.</p>
              <div className="flow-illu">
                <div className="flow-title"><b>ILUSTRASI ALUR NILAI KLINIS</b><span>dari kedatangan sampai layanan lanjutan</span></div>
                <div className="patient-flow">
                  <div className="patient-node"><b>KEDATANGAN</b><span>akses, drop-off, registrasi</span></div>
                  <div className="patient-node"><b>RAWAT JALAN</b><span>volume utama & klinik</span></div>
                  <div className="patient-node"><b>DIAGNOSTIK</b><span>lab, imaging, CT</span></div>
                  <div className="patient-node"><b>TINDAKAN</b><span>OR, critical care, terapi</span></div>
                  <div className="patient-node"><b>PEMULIHAN</b><span>PACU, rawat inap, tindak lanjut</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="ekonomi" className="section light">
          <div className="section-inner">
            <div className="eyebrow">03 · Ekonomi proyek</div>
            <h2>Biayai downside.<br/>Underwrite <em>pertumbuhannya.</em></h2>
            <p className="lead">Model memisahkan biaya proyek budgetary dari biaya tersertifikasi, lalu menunjukkan ramp-up operasi sebelum membahas return investor.</p>
            <div className="economics-grid">
              <div>
                <div className="capex-ring-wrap">
                  <div className="capex-ring"><div className="capex-ring-core"><b>Rp861,1 M</b><span>CAPEX DASAR</span></div></div>
                  <div className="capex-legend">
                    <div><i/><span>Konstruksi fisik proxy</span><b>Rp475,1 M</b></div>
                    <div><i/><span>Peralatan medis Day-1</span><b>Rp95,0 M</b></div>
                    <div><i/><span>Modal kerja</span><b>Rp76,8 M</b></div>
                    <div><i/><span>Komponen lain dalam model</span><b>sisa CAPEX</b></div>
                  </div>
                </div>
                <div className="capex-bars">{capex.map((item) => <div className="bar" key={item.label}><span>{item.label}</span><div className="bar-track"><div className="bar-fill" style={{width:`${item.pct}%`}}/></div><b>{item.value}</b></div>)}</div>
                <p className="footnote">Total CAPEX di atas masih budgetary. CAPEX tersertifikasi tetap kosong sampai T10: measured take-off, harga terverifikasi, quotation, serta rekonsiliasi QS / Finance selesai.</p>
              </div>
              <div className="economics-cards">
                <div className="finance-card"><span>KEBUTUHAN KAS DASAR · DI LUAR TANAH</span><b>Rp811,1 M</b><small>Tanah tetap diperlakukan sebagai input aset / economic equity.</small></div>
                <div className="finance-card"><span>PROXY KONSTRUKSI FISIK</span><b>Rp475,1 M</b><small>Angka pembanding untuk perencanaan.</small></div>
                <div className="finance-card"><span>PERALATAN MEDIS DAY-1</span><b>Rp95,0 M</b><small>Budgetary; T07–T09 masih terbuka.</small></div>
                <div className="finance-card"><span>MODAL KERJA</span><b>Rp76,8 M</b><small>Allowance perencanaan budgetary.</small></div>
                <div className="finance-card"><span>BASE PROJECT EQUITY IRR</span><b>20,50%</b><small>Ilustratif dan bergantung pada exit multiple.</small></div>
                <div className="finance-card"><span>MINIMUM DSCR DASAR · T4–T10</span><b>1,20x</b><small>Model arus kas declining-balance.</small></div>
              </div>
            </div>
            <div className="ramp-grid">{ramp.map((item) => <article className="ramp-card" key={item.year}><div className="year"><span>{item.year}</span><em>{item.note}</em></div><h3>{item.encounters}</h3><dl><div><dt>PENDAPATAN</dt><dd>{item.revenue}</dd></div><div><dt>EBITDA</dt><dd>{item.ebitda}</dd></div><div><dt>CFADS</dt><dd>{item.cfads}</dd></div></dl><div className="ramp-progress"><i style={{width:`${item.progress}%`}}/></div></article>)}</div>
          </div>
        </section>

        <section id="pendanaan" className="section soft">
          <div className="section-inner funding-layout">
            <div>
              <div className="eyebrow">04 · Arsitektur pendanaan</div>
              <h2>Pilih leverage.<br/>Lihat <em>trade-off.</em></h2>
              <p className="lead">Pilih skenario utang. Panel akan memperlihatkan hubungan antara beban utang, kebutuhan equity, kemampuan membayar utang pada Tahun 4, dan exit MOIC model.</p>
              <div className="scenario-tabs">{funding.map((item,index) => <button key={item.debt} className={fundingIndex===index?'active':''} onClick={() => setFundingIndex(index)}>{item.debt} UTANG</button>)}</div>
              <div className="leverage-illu">
                <div className="capital-pool" style={{'--fill':selectedFunding.debt}}><b>{selectedFunding.debtValue}</b><span>PORSI UTANG</span></div>
                <div className="capital-equals">+</div>
                <div className="capital-pool" style={{'--fill':`${100-parseInt(selectedFunding.debt)}%`}}><b>{selectedFunding.equity}</b><span>PORSI EQUITY</span></div>
              </div>
              <div className="mini-scenarios">{funding.map((item) => <div className="mini-scenario" key={item.debt}><b>{item.dscr}</b><span>{item.debt} UTANG · DSCR TAHUN 4</span></div>)}</div>
            </div>
            <div className="selected-scenario">
              <div className="selected-top"><div><span>{selectedFunding.title.toUpperCase()} · SKENARIO TERPILIH</span></div><b>{selectedFunding.debt}</b></div>
              <div className="selected-grid"><div><span>NILAI UTANG</span><b>{selectedFunding.debtValue}</b></div><div><span>NILAI EQUITY</span><b>{selectedFunding.equity}</b></div><div><span>DSCR TAHUN 4</span><b className={selectedFunding.tone}>{selectedFunding.dscr}</b></div><div><span>EXIT MOIC</span><b>{selectedFunding.moic}</b></div></div>
              <div className="signal"><strong>Kesimpulan pendanaan saat ini:</strong> struktur dasar masih membutuhkan perlindungan melalui interest reserve, grace period lebih panjang, leverage lebih rendah, atau kombinasi sebelum pembiayaan dikunci. Seluruh skenario ini adalah sensitivitas, bukan komitmen lender.</div>
            </div>
          </div>
        </section>

        <section id="kesiapan" className="section light">
          <div className="section-inner readiness-layout">
            <div className="status-stack">
              <div className="status-card pass"><strong>LULUS</strong><span>QA MODEL INTERNAL LENGKAP</span><p>Model internal terkontrol, asumsi, sensitivitas pendanaan, dan pemeriksaan QA telah lengkap.</p></div>
              <div className="status-card"><strong>0 / 11</strong><span>GATE EKSTERNAL TERTUTUP</span><p>Rilis final masih bergantung pada bukti dari pihak eksternal yang bertanggung jawab. Pemisahan ini disengaja agar investor melihat kondisi nyata proyek.</p></div>
            </div>
            <div>
              <div className="eyebrow">05 · Kesiapan & de-risking</div>
              <h2>Ketidakpastian tidak disembunyikan.<br/>Ia <em>diurutkan.</em></h2>
              <div className="gate-list">{readiness.map(([id,name,status]) => <div className="gate" key={id}><b>{id}</b><span>{name}</span><strong>{status}</strong></div>)}</div>
              <div className="path">{pathway.map(([id,title,text]) => <div className="path-step" key={id}><b>{id}</b><strong>{title}</strong><span>{text}</span></div>)}</div>
              <p className="footnote">Aturan rilis keras: tidak ada klaim DED / IFC final, harga tender, CAPEX tersertifikasi, atau persentase saham final sampai bukti eksternal yang diwajibkan benar-benar tertutup.</p>
            </div>
          </div>
        </section>

        <section id="visual" className="section dark">
          <div className="section-inner">
            <div className="eyebrow">06 · Pengalaman konsep</div>
            <h2>Lihat lingkungan<br/><em>pelayanannya.</em></h2>
            <p className="lead">Visual yang telah tersedia digunakan untuk memperjelas pengalaman pasien, keluarga dan tim klinis. Visual ini tetap bersifat konsep dan bukan gambar konstruksi terbit.</p>
            <div className="visual-stage">
              <div className="visual-media"><img src={asset(visuals[visualIndex][0])} alt={visuals[visualIndex][1]}/><div className="visual-caption"><div><span>{visuals[visualIndex][2]} · KONSEP</span><h3>{visuals[visualIndex][1]}</h3></div><span>{String(visualIndex+1).padStart(2,'0')} / {String(visuals.length).padStart(2,'0')}</span></div></div>
              <div className="visual-rail">{visuals.map((item,index) => <button key={item[0]} className={`visual-button ${visualIndex===index?'active':''}`} onClick={() => setVisualIndex(index)}><b>{item[1]}</b><span>{String(index+1).padStart(2,'0')}</span></button>)}</div>
            </div>
          </div>
        </section>

        <section className="section close">
          <div className="section-inner close-grid">
            <div><div className="eyebrow">07 · Percakapan investor</div><h2>Modal masuk.<br/><em>Kontrol tetap.</em></h2></div>
            <div className="close-copy">Langkah berikutnya adalah mengubah kasus budgetary yang transparan menjadi paket investasi yang siap diuji: menutup bukti, memvalidasi kapasitas, mensertifikasi biaya proyek, lalu mengunci struktur modal.
              <div className="close-actions"><button className="primary" onClick={enable3D}>{threeD?'BUKA 3D LAGI':'BUKA TAMPILAN 3D OPSIONAL'}</button><a href="#atas">ULANGI PRESENTASI ↑</a></div>
              <p className="footnote">RS Subang Raya · Presentasi investor · basis model perencanaan terkontrol ditinjau 10 September 2026.</p>
            </div>
          </div>
        </section>
      </div>

      {threeD ? <section id="three-d" className="three-d"><div className="three-d-card"><span>3D OPSIONAL · TAMPILAN KONSEP</span><h3>Jelajahi rumah sakit.</h3><p>Lapisan 3D adalah alat komunikasi konsep. Program klinis, kuantitas, biaya, dan desain final tetap dikendalikan oleh evidence gate dan dokumen proyek yang berlaku.</p></div></section> : null}
    </>
  )
}
