'use client'

import { useMemo, useState } from 'react'

const rupiah = new Intl.NumberFormat('id-ID')
const angka = new Intl.NumberFormat('id-ID')
const fmtRp = (n) => `Rp ${rupiah.format(Math.round(n || 0))}`

export default function KalkulatorLahan() {
  const [luas, setLuas] = useState(10000)
  const [harga, setHarga] = useState(2000000)
  const { nilai, untung, total } = useMemo(() => {
    const nilai = luas * harga
    return { nilai, untung: nilai * .3, total: nilai * 1.3 }
  }, [luas, harga])

  return (
    <section id="investor-lahan" className="kl">
      <style>{`
        .kl{background:#060a0d;color:#fff;padding:28px 14px}.kl-in{max-width:1260px;margin:auto}.kl-head{display:flex;justify-content:space-between;align-items:end;gap:16px;margin-bottom:12px}.kl-head h2{margin:0;font-size:clamp(28px,3.5vw,42px);line-height:.92;letter-spacing:-.055em;text-transform:uppercase}.kl-head em{font-style:normal;color:#f4c842}.kl-head p{margin:0;max-width:500px;color:#929ca1;font-size:10px;line-height:1.45;text-align:right}
        .kl-box{border:1px solid rgba(255,255,255,.12);border-radius:16px;background:#0a1014;padding:10px}.kl-controls{display:grid;grid-template-columns:1fr 1fr;gap:8px}.kl-row{border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:10px;background:#081015}.kl-row-head{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:7px}.kl-row-head span{font-size:7px;font-weight:900;letter-spacing:.08em;color:#8f9aa0}.kl-row-head b{font-size:14px}.kl-control{display:grid;grid-template-columns:1fr 125px;gap:8px;align-items:center}.kl-range{width:100%;accent-color:#f4c842}.kl-input{width:100%;border:1px solid rgba(255,255,255,.14);background:#060a0d;color:#fff;border-radius:9px;padding:8px 9px;font-size:13px;font-weight:850;outline:none}.kl-input:focus{border-color:#f4c842}
        .kl-results{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px}.kl-card{border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:11px;background:#081015;min-height:76px}.kl-card.total{background:#f4c842;color:#060a0d;border-color:#f4c842}.kl-card span{display:block;font-size:7px;font-weight:900;letter-spacing:.07em;color:#8f9aa0}.kl-card.total span{color:rgba(6,10,13,.58)}.kl-card b{display:block;margin-top:6px;font-size:clamp(18px,2.2vw,27px);letter-spacing:-.045em}.kl-card.good b{color:#79dfb4}.kl-card small{display:block;margin-top:4px;font-size:7px;color:#7f898e}.kl-card.total small{color:rgba(6,10,13,.65)}
      `}</style>
      <style>{`
        .kl-meta{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}.kl-meta div{border-left:2px solid #f4c842;padding:7px 9px;background:rgba(244,200,66,.04)}.kl-meta span{display:block;font-size:6.5px;font-weight:900;letter-spacing:.07em;color:#8f9aa0}.kl-meta b{display:block;margin-top:4px;font-size:11px}.kl-note{margin:8px 0 0;color:#79848a;font-size:7px;line-height:1.4}.kl-note strong{color:#cbd1d4}
        @media(max-width:760px){.kl{padding:22px 12px}.kl-head{display:block}.kl-head p{text-align:left;margin-top:5px}.kl-controls,.kl-results,.kl-meta{grid-template-columns:1fr}.kl-control{grid-template-columns:1fr 110px}.kl-card{min-height:68px}.kl-card b{font-size:20px}}
      `}</style>
      <div className="kl-in">
        <div className="kl-head"><h2>Investor <em>Lahan</em></h2><p>Geser atau ketik luas dan harga. Hasil berubah otomatis.</p></div>
        <div className="kl-box">
          <div className="kl-controls">
            <div className="kl-row">
              <div className="kl-row-head"><span>LUAS TANAH</span><b>{angka.format(luas)} m²</b></div>
              <div className="kl-control"><input className="kl-range" aria-label="Geser luas tanah" type="range" min="100" max="100000" step="100" value={luas} onChange={(e)=>setLuas(Number(e.currentTarget.value))}/><input className="kl-input" aria-label="Ketik luas tanah" type="number" min="100" step="100" value={luas} onChange={(e)=>setLuas(Math.max(100,Number(e.currentTarget.value)||100))}/></div>
            </div>
            <div className="kl-row">
              <div className="kl-row-head"><span>HARGA / m²</span><b>{fmtRp(harga)}</b></div>
              <div className="kl-control"><input className="kl-range" aria-label="Geser harga per meter persegi" type="range" min="100000" max="10000000" step="100000" value={harga} onChange={(e)=>setHarga(Number(e.currentTarget.value))}/><input className="kl-input" aria-label="Ketik harga per meter persegi" type="number" min="100000" step="100000" value={harga} onChange={(e)=>setHarga(Math.max(100000,Number(e.currentTarget.value)||100000))}/></div>
            </div>
          </div>
          <div className="kl-results">
            <div className="kl-card"><span>NILAI LAHAN</span><b>{fmtRp(nilai)}</b><small>luas × harga/m²</small></div>
            <div className="kl-card good"><span>KEUNTUNGAN 30%</span><b>+{fmtRp(untung)}</b><small>30% dari nilai lahan</small></div>
            <div className="kl-card total"><span>TOTAL + 30%</span><b>{fmtRp(total)}</b><small>total pembayaran lahan</small></div>
          </div>
          <div className="kl-meta">
            <div><span>PEMICU 1</span><b>Investor proyek 100%</b></div>
            <div><span>PEMICU 2 · CADANGAN</span><b>Bank cair bila investor belum terpenuhi</b></div>
          </div>
          <p className="kl-note"><strong>Rumus:</strong> nilai lahan = luas × harga/m² · keuntungan = 30% × nilai lahan · total = 130% nilai lahan.</p>
        </div>
      </div>
    </section>
  )
}
