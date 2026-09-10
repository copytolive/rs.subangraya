'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const nf = new Intl.NumberFormat('id-ID')
const rp = (n) => `Rp ${nf.format(Math.round(n || 0))}`

export default function KalkulatorLahan(){
  const [luas,setLuas]=useState(10000)
  const [harga,setHarga]=useState(5000000)
  const rafLuas=useRef(null), rafHarga=useRef(null)
  const geserLuas=useCallback((n)=>{ if(rafLuas.current) cancelAnimationFrame(rafLuas.current); rafLuas.current=requestAnimationFrame(()=>setLuas(n)) },[])
  const geserHarga=useCallback((n)=>{ if(rafHarga.current) cancelAnimationFrame(rafHarga.current); rafHarga.current=requestAnimationFrame(()=>setHarga(n)) },[])
  useEffect(()=>()=>{ if(rafLuas.current) cancelAnimationFrame(rafLuas.current); if(rafHarga.current) cancelAnimationFrame(rafHarga.current) },[])
  const {nilai,bonus,total}=useMemo(()=>{const nilai=luas*harga;const bonus=nilai*.3;return{nilai,bonus,total:nilai+bonus}},[luas,harga])

  return <section id="investor-lahan" className="kl"><style>{`
    .kl{background:#060a0d;color:#fff;padding:26px 14px;font-family:Inter,system-ui,-apple-system,sans-serif;contain:layout paint style}.kl-in{max-width:1260px;margin:auto}.kl-head{display:flex;justify-content:space-between;align-items:end;gap:18px;margin-bottom:12px}.kl-head h2{margin:0;font-size:clamp(28px,3.6vw,42px);line-height:.92;letter-spacing:-.055em;text-transform:uppercase}.kl-head em{font-style:normal;color:#f4c842}.kl-head p{margin:0;max-width:430px;color:#a7b0b4;font-size:10px;line-height:1.4;text-align:right}
    .kl-box{border:1px solid #253037;border-radius:18px;padding:11px;background:#091015}.kl-controls{display:grid;grid-template-columns:1fr 1fr;gap:8px}.kl-control{border:1px solid #263036;border-radius:13px;padding:10px 12px;background:#070d10}.kl-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:6px}.kl-top span,.kl-card span,.kl-pay span{font-size:7px;font-weight:950;letter-spacing:.09em;color:#8d989e}.kl-top b{font-size:15px;letter-spacing:-.02em;font-variant-numeric:tabular-nums}.kl-line{display:grid;grid-template-columns:1fr 138px;gap:9px;align-items:center}.kl-range{width:100%;accent-color:#f4c842;cursor:pointer;touch-action:none}.kl-number{width:100%;background:#05090c;color:#fff;border:1px solid #30383c;border-radius:9px;padding:8px 10px;font-size:14px;font-weight:900;outline:none;font-variant-numeric:tabular-nums}.kl-number:focus{border-color:#f4c842}
    .kl-results{display:grid;grid-template-columns:1fr 1fr 1.25fr;gap:8px;margin-top:8px}.kl-card{border:1px solid #263036;border-radius:13px;padding:10px 12px;min-height:76px;background:#070d10}.kl-card b{display:block;margin-top:6px;font-size:clamp(19px,2.3vw,29px);letter-spacing:-.045em;line-height:1;font-variant-numeric:tabular-nums}.kl-card small{display:block;margin-top:5px;color:#7e8a90;font-size:7px}.kl-card.good b{color:#6fe0b6}.kl-card.total{background:#f4c842;color:#060a0d;border-color:#f4c842}.kl-card.total span,.kl-card.total small{color:rgba(6,10,13,.58)}
  `}</style>    <style>{`
      .kl-pay{display:grid;grid-template-columns:1.25fr .75fr .75fr;gap:8px;margin-top:8px}.kl-pay>div{border:1px solid #263036;border-radius:13px;padding:10px 12px;background:#070d10}.kl-pay .main{border-color:rgba(244,200,66,.5);background:linear-gradient(135deg,rgba(244,200,66,.13),rgba(244,200,66,.035))}.kl-pay .main b{display:block;margin-top:5px;font-size:17px;line-height:1.08;letter-spacing:-.025em}.kl-pay .cond b{display:block;margin-top:5px;font-size:14px}.kl-pay .num{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:#f4c842;color:#060a0d;font-size:9px;font-weight:950;margin-right:6px}.kl-formula{margin:7px 2px 0;color:#77838a;font-size:7px;line-height:1.4}.kl-formula strong{color:#b8c0c4}
      @media(max-width:760px){.kl{padding:23px 12px}.kl-head{display:block}.kl-head p{text-align:left;margin-top:6px}.kl-controls{grid-template-columns:1fr}.kl-results{grid-template-columns:1fr 1fr}.kl-card.total{grid-column:1/-1}.kl-pay{grid-template-columns:1fr 1fr}.kl-pay .main{grid-column:1/-1}.kl-line{grid-template-columns:1fr 116px}}
      @media(max-width:430px){.kl-results,.kl-pay{grid-template-columns:1fr}.kl-card.total,.kl-pay .main{grid-column:auto}.kl-top b{font-size:13px}.kl-line{grid-template-columns:1fr 104px}}
    `}</style>
    <div className="kl-in">
      <div className="kl-head"><h2>Investor <em>Lahan</em></h2><p>Geser atau ketik luas dan harga. Nilai lahan, tambahan 30%, dan total pembayaran berubah seketika.</p></div>
      <div className="kl-box">
        <div className="kl-controls">
          <div className="kl-control"><div className="kl-top"><span>LUAS TANAH</span><b>{nf.format(luas)} m²</b></div><div className="kl-line"><input className="kl-range" aria-label="Geser luas tanah" type="range" min="100" max="100000" step="100" value={luas} onInput={e=>geserLuas(Number(e.currentTarget.value))}/><input className="kl-number" aria-label="Ketik luas tanah" type="number" min="100" step="100" value={luas} onChange={e=>setLuas(Math.max(100,Number(e.currentTarget.value)||100))}/></div></div>
          <div className="kl-control"><div className="kl-top"><span>HARGA / m²</span><b>{rp(harga)}</b></div><div className="kl-line"><input className="kl-range" aria-label="Geser harga tanah per meter persegi" type="range" min="100000" max="10000000" step="100000" value={harga} onInput={e=>geserHarga(Number(e.currentTarget.value))}/><input className="kl-number" aria-label="Ketik harga tanah per meter persegi" type="number" min="100000" step="100000" value={harga} onChange={e=>setHarga(Math.max(100000,Number(e.currentTarget.value)||100000))}/></div></div>
        </div>        <div className="kl-results">
          <div className="kl-card"><span>NILAI LAHAN</span><b>{rp(nilai)}</b><small>luas × harga/m²</small></div>
          <div className="kl-card good"><span>KEUNTUNGAN 30%</span><b>+{rp(bonus)}</b><small>30% dari nilai lahan</small></div>
          <div className="kl-card total"><span>TOTAL PEMBAYARAN</span><b>{rp(total)}</b><small>100% nilai lahan + 30%</small></div>
        </div>
        <div className="kl-pay">
          <div className="main"><span>KETENTUAN PEMBAYARAN</span><b>DIBAYARKAN 100% SETELAH SALAH SATU KONDISI TERCAPAI</b></div>
          <div className="cond"><span><i className="num">1</i>KONDISI</span><b>Pencairan bank</b></div>
          <div className="cond"><span><i className="num">2</i>KONDISI</span><b>Investor mencapai 100%</b></div>
        </div>
        <p className="kl-formula"><strong>Rumus:</strong> nilai lahan = luas × harga/m² · keuntungan = 30% × nilai lahan · total pembayaran = 130% nilai lahan.</p>
      </div>
    </div>
  </section>
}
