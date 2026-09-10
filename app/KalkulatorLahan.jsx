'use client'
import { useMemo, useState } from 'react'
const nf = new Intl.NumberFormat('id-ID')
const rp = (n) => `Rp ${nf.format(Math.round(n || 0))}`

export default function KalkulatorLahan(){
  const [luas,setLuas]=useState(10000)
  const [harga,setHarga]=useState(5000000)
  const {nilai,bonus,total}=useMemo(()=>{const nilai=luas*harga;const bonus=nilai*.3;return{nilai,bonus,total:nilai+bonus}},[luas,harga])
  return <section id="investor-lahan" className="kl"><style>{`
    .kl{background:#060a0d;color:#fff;padding:30px 14px;font-family:Inter,system-ui,-apple-system,sans-serif}.kl-in{max-width:1260px;margin:auto}.kl-head{display:flex;justify-content:space-between;align-items:end;gap:18px;margin-bottom:14px}.kl-head h2{margin:0;font-size:clamp(30px,4vw,46px);line-height:.9;letter-spacing:-.055em;text-transform:uppercase}.kl-head em{font-style:normal;color:#f4c842}.kl-head p{margin:0;max-width:420px;color:#8e989d;font-size:10px;line-height:1.45;text-align:right}
    .kl-box{border:1px solid #263036;border-radius:18px;padding:12px;background:#091015}.kl-controls{display:grid;grid-template-columns:1fr 1fr;gap:8px}.kl-control{border:1px solid #263036;border-radius:13px;padding:11px 12px;background:#070d10}.kl-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:7px}.kl-top span,.kl-card span,.kl-pay span{font-size:7px;font-weight:950;letter-spacing:.09em;color:#8d989e}.kl-top b{font-size:15px;letter-spacing:-.02em}.kl-line{display:grid;grid-template-columns:1fr 142px;gap:10px;align-items:center}.kl-range{width:100%;accent-color:#f4c842;cursor:pointer}.kl-number{width:100%;background:#05090c;color:#fff;border:1px solid #30383c;border-radius:9px;padding:8px 10px;font-size:14px;font-weight:900;outline:none}.kl-number:focus{border-color:#f4c842}
    .kl-results{display:grid;grid-template-columns:1fr 1fr 1.25fr;gap:8px;margin-top:8px}.kl-card{border:1px solid #263036;border-radius:13px;padding:11px 12px;min-height:82px;background:#070d10}.kl-card b{display:block;margin-top:6px;font-size:clamp(20px,2.4vw,31px);letter-spacing:-.045em;line-height:1}.kl-card small{display:block;margin-top:5px;color:#7e8a90;font-size:7px}.kl-card.good b{color:#6fe0b6}.kl-card.total{background:#f4c842;color:#060a0d;border-color:#f4c842}.kl-card.total span,.kl-card.total small{color:rgba(6,10,13,.58)}
  `}</style><style>{`
    .kl-pay{display:grid;grid-template-columns:1.2fr .8fr .8fr;gap:8px;margin-top:8px}.kl-pay>div{border:1px solid #263036;border-radius:13px;padding:11px 12px;background:#070d10}.kl-pay .main{border-color:rgba(244,200,66,.45);background:linear-gradient(135deg,rgba(244,200,66,.12),rgba(244,200,66,.03))}.kl-pay .main b{display:block;margin-top:5px;font-size:18px;line-height:1.05;letter-spacing:-.025em}.kl-pay .cond b{display:block;margin-top:5px;font-size:14px}.kl-pay .num{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:#f4c842;color:#060a0d;font-size:9px;font-weight:950;margin-right:7px;vertical-align:middle}.kl-formula{margin:8px 2px 0;color:#77838a;font-size:7px;line-height:1.4}.kl-formula strong{color:#b8c0c4}
    @media(max-width:760px){.kl{padding:24px 12px}.kl-head{display:block}.kl-head p{text-align:left;margin-top:7px}.kl-controls{grid-template-columns:1fr}.kl-results{grid-template-columns:1fr 1fr}.kl-card.total{grid-column:1/-1}.kl-pay{grid-template-columns:1fr 1fr}.kl-pay .main{grid-column:1/-1}.kl-line{grid-template-columns:1fr 116px}}
    @media(max-width:430px){.kl-results{grid-template-columns:1fr}.kl-card.total{grid-column:auto}.kl-pay{grid-template-columns:1fr}.kl-pay .main{grid-column:auto}.kl-top b{font-size:13px}.kl-line{grid-template-columns:1fr 105px}}
  `}</style>
    <div className="kl-in">
      <div className="kl-head"><h2>Investor <em>Lahan</em></h2><p>Geser atau ketik luas dan harga. Nilai lahan dan tambahan 30% dihitung langsung.</p></div>
      <div className="kl-box">
        <div className="kl-controls">
          <div className="kl-control"><div className="kl-top"><span>LUAS TANAH</span><b>{nf.format(luas)} m²</b></div><div className="kl-line"><input className="kl-range" type="range" min="100" max="100000" step="100" value={luas} onChange={e=>setLuas(Number(e.target.value))}/><input className="kl-number" type="number" min="100" step="100" value={luas} onChange={e=>setLuas(Math.max(100,Number(e.target.value)||100))}/></div></div>
          <div className="kl-control"><div className="kl-top"><span>HARGA / m²</span><b>{rp(harga)}</b></div><div className="kl-line"><input className="kl-range" type="range" min="100000" max="10000000" step="100000" value={harga} onChange={e=>setHarga(Number(e.target.value))}/><input className="kl-number" type="number" min="100000" step="100000" value={harga} onChange={e=>setHarga(Math.max(100000,Number(e.target.value)||100000))}/></div></div>
        </div>
        <div className="kl-results">
          <div className="kl-card"><span>NILAI LAHAN</span><b>{rp(nilai)}</b><small>luas × harga/m²</small></div>
          <div className="kl-card good"><span>KEUNTUNGAN 30%</span><b>+{rp(bonus)}</b><small>30% dari nilai lahan</small></div>
          <div className="kl-card total"><span>TOTAL + 30%</span><b>{rp(total)}</b><small>total pembayaran lahan</small></div>
        </div>
        <div className="kl-pay">
          <div className="main"><span>KETENTUAN PEMBAYARAN</span><b>DIBAYARKAN 100% SETELAH SALAH SATU KONDISI TERCAPAI</b></div>
          <div className="cond"><span><i className="num">1</i>KONDISI</span><b>Pencairan bank</b></div>
          <div className="cond"><span><i className="num">2</i>KONDISI</span><b>Investor mencapai 100%</b></div>
        </div>
        <p className="kl-formula"><strong>Rumus:</strong> nilai lahan = luas × harga/m² · keuntungan = 30% × nilai lahan · total = 130% nilai lahan.</p>
      </div>
    </div>
  </section>
}
