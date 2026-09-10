'use client'

import { useState } from 'react'

const CAPEX = 861.088067662
const NILAI_T10 = 2438.974065938
const MOIC = NILAI_T10 / CAPEX
const uang1 = new Intl.NumberFormat('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const uang3 = new Intl.NumberFormat('id-ID', { minimumFractionDigits: 3, maximumFractionDigits: 3 })
const persen = new Intl.NumberFormat('id-ID', { minimumFractionDigits: 3, maximumFractionDigits: 5 })
const kali = new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function uang(nilai, presisi = 1) {
  const f = presisi === 3 ? uang3 : uang1
  return nilai >= 1000 ? `Rp${f.format(nilai / 1000)} T` : `Rp${f.format(nilai)} M`
}

export default function KalkulatorInvestasi() {
  const [investasi, setInvestasi] = useState(1)

  const porsi = Math.min(100, investasi / CAPEX * 100)
  const nilaiAkhir = investasi * MOIC
  const kenaikan = nilaiAkhir - investasi
  return (
    <>
      <a className="tombol-kalkulator" href="#kalkulator-investasi">HITUNG INVESTASI</a>
      <section id="kalkulator-investasi" className="ki">
        <style>{`
          .tombol-kalkulator{position:fixed;right:12px;bottom:12px;z-index:95;background:#f4c842;color:#060a0d!important;border-radius:999px;padding:9px 13px;font:900 8px/1 Inter,system-ui;letter-spacing:.09em;text-decoration:none}
          .ki{position:relative;z-index:4;background:#060a0d;color:#fff;padding:28px clamp(14px,3vw,36px);font-family:Inter,system-ui,-apple-system,sans-serif}
          .ki-in{max-width:1260px;margin:auto}.ki-head{display:flex;align-items:baseline;justify-content:space-between;gap:20px;margin-bottom:13px}.ki-head h2{font-size:clamp(27px,3.3vw,42px);line-height:.95;letter-spacing:-.05em;text-transform:uppercase;margin:0}.ki-head h2 em{font-style:normal;color:#f4c842}.ki-head p{margin:0;max-width:390px;color:#8f9aa0;font-size:9px;line-height:1.45;text-align:right}
          .ki-box{border:1px solid rgba(255,255,255,.13);border-radius:16px;padding:13px;background:#0a1014}.ki-control{display:grid;grid-template-columns:155px 1fr 125px;gap:13px;align-items:center}.ki-label span,.ki-card span,.ki-base span{display:block;font-size:7px;font-weight:900;letter-spacing:.07em;color:#8f9aa0}.ki-label b{display:block;font-size:23px;letter-spacing:-.045em;margin-top:3px}.ki-range{width:100%;accent-color:#f4c842;cursor:pointer}.ki-input{width:100%;background:#060a0d;color:#fff;border:1px solid rgba(255,255,255,.16);border-radius:10px;padding:9px 10px;font-size:15px;font-weight:900;outline:none}.ki-input:focus{border-color:#f4c842}
          .ki-results{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:8px}.ki-card{border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:11px 12px;min-height:72px}.ki-card.primary{background:#f4c842;color:#060a0d;border-color:#f4c842}.ki-card.primary span{color:rgba(6,10,13,.55)}.ki-card b{display:block;font-size:clamp(18px,2.2vw,27px);letter-spacing:-.045em;margin-top:6px}.ki-card.good b{color:#79dfb4}.ki-card small{display:block;font-size:6.5px;color:#778187;margin-top:3px}.ki-card.primary small{color:rgba(6,10,13,.55)}
          .ki-base{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:9px;padding-top:9px;border-top:1px solid rgba(255,255,255,.08)}.ki-base b{display:block;font-size:11px;margin-top:3px}.ki-note{margin:8px 0 0;color:#717d84;font-size:7px;line-height:1.4}.ki-note strong{color:#cbd1d4}
          @media(max-width:760px){.ki{padding:24px 12px}.ki-head{display:block}.ki-head p{text-align:left;margin-top:5px}.ki-control{grid-template-columns:1fr}.ki-results{grid-template-columns:1fr 1fr}.ki-base{grid-template-columns:1fr 1fr 1fr}.ki-card{min-height:68px}.ki-card b{font-size:20px}}
          @media(max-width:420px){.ki-head h2{font-size:27px}.ki-results{grid-template-columns:1fr 1fr}.ki-base{grid-template-columns:1fr}.ki-input{font-size:14px}}
        `}</style>
        <div className="ki-in">
          <div className="ki-head">
            <h2>Investasi <em>Anda</em></h2>
            <p>Masukkan satu angka. Porsi dan nilai Tahun 10 dihitung langsung dari model 0% utang bank.</p>
          </div>
          <div className="ki-box">
            <div className="ki-control">
              <div className="ki-label"><span>MODAL ANDA</span><b>{uang(investasi)}</b></div>
              <input className="ki-range" aria-label="Nilai investasi dalam miliar rupiah" type="range" min="1" max="861" step="1" value={Math.min(861, Math.round(investasi))} onChange={(e) => setInvestasi(Number(e.currentTarget.value))}/>
              <input className="ki-input" aria-label="Nilai investasi dalam miliar rupiah" type="number" min="1" max={CAPEX} step="1" value={investasi} onChange={(e) => setInvestasi(Math.min(CAPEX, Math.max(1, Number(e.currentTarget.value) || 1)))}/>
            </div>
            <div className="ki-results">
              <div className="ki-card primary"><span>PORSI SAHAM</span><b>{persen.format(porsi)}%</b><small>basis pendanaan proyek</small></div>
              <div className="ki-card"><span>NILAI TAHUN 10</span><b>{uang(nilaiAkhir, 3)}</b><small>output nilai ekuitas model</small></div>
              <div className="ki-card good"><span>KENAIKAN NILAI</span><b>+{uang(kenaikan, 3)}</b><small>di atas modal awal</small></div>
              <div className="ki-card"><span>KELIPATAN</span><b>{kali.format(MOIC)}x</b><small>model 0% utang bank</small></div>
            </div>
            <div className="ki-base">
              <div><span>TOTAL MODAL PROYEK</span><b>{uang(CAPEX, 3)}</b></div>
              <div><span>NILAI EKUITAS TAHUN 10</span><b>{uang(NILAI_T10, 3)}</b></div>
              <div><span>UTANG BANK</span><b>Rp0</b></div>
            </div>
            <p className="ki-note"><strong>Dasar:</strong> CAPEX masih anggaran perencanaan, belum tersertifikasi. Porsi legal final mengikuti dokumen kepemilikan yang disepakati.</p>
          </div>
        </div>
      </section>
    </>
  )
}