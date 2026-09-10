'use client'

import { useMemo, useState } from 'react'

const rp = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })
const angka = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 })

function normalisasi(nilai) {
  const n = Number(nilai)
  return Number.isFinite(n) && n > 0 ? n : 0
}

export default function KalkulatorLahan() {
  const [luas, setLuas] = useState('')
  const [harga, setHarga] = useState('')

  const hasil = useMemo(() => {
    const l = normalisasi(luas)
    const h = normalisasi(harga)
    const nilaiLahan = l * h
    const tambahan = nilaiLahan * 0.3
    return { nilaiLahan, tambahan, total: nilaiLahan + tambahan }
  }, [luas, harga])

  return (
    <section id="investor-lahan" className="kl">
      <style>{`
        .kl{background:#060a0d;color:#fff;padding:42px clamp(14px,3vw,38px);font-family:Inter,system-ui,-apple-system,sans-serif}.kl-in{max-width:1280px;margin:auto}.kl-head{display:flex;justify-content:space-between;gap:24px;align-items:end;margin-bottom:18px}.kl-head h2{margin:0;font-size:clamp(28px,3.8vw,44px);line-height:.92;letter-spacing:-.055em;text-transform:uppercase}.kl-head h2 em{font-style:normal;color:#f4c842}.kl-head p{margin:0;max-width:440px;text-align:right;color:#8f999e;font-size:10px;line-height:1.5}
        .kl-box{border:1px solid rgba(255,255,255,.12);border-radius:18px;background:#0a1014;padding:12px}.kl-inputs{display:grid;grid-template-columns:1fr 1fr;gap:7px}.kl-field{border:1px solid rgba(255,255,255,.11);border-radius:13px;padding:12px;background:#070c10}.kl-field span,.kl-card span,.kl-trigger span{display:block;font-size:7px;font-weight:950;letter-spacing:.08em;color:#879298}.kl-field label{display:block;margin-top:5px;font-size:10px;font-weight:900}.kl-field input{width:100%;margin-top:8px;border:0;border-bottom:1px solid rgba(255,255,255,.18);background:transparent;color:#fff;padding:6px 0 8px;font-size:clamp(20px,2.7vw,31px);font-weight:950;letter-spacing:-.04em;outline:none}.kl-field input:focus{border-color:#f4c842}.kl-field small{display:block;margin-top:5px;color:#667177;font-size:7px}
        .kl-results{display:grid;grid-template-columns:1fr 1fr 1.15fr;gap:7px;margin-top:7px}.kl-card{border:1px solid rgba(255,255,255,.1);border-radius:13px;padding:13px;min-height:92px}.kl-card b{display:block;margin-top:8px;font-size:clamp(18px,2.35vw,29px);letter-spacing:-.045em;line-height:.98}.kl-card.gain b{color:#79dfb4}.kl-card.total{background:#f4c842;color:#060a0d;border-color:#f4c842}.kl-card.total span{color:rgba(6,10,13,.56)}.kl-card small{display:block;margin-top:7px;font-size:7px;color:#6f7a80}.kl-card.total small{color:rgba(6,10,13,.6)}
        .kl-formula{margin:8px 0 0;border-left:2px solid #f4c842;padding:7px 10px;color:#9aa4a9;font-size:8px;line-height:1.5}.kl-formula strong{color:#f4c842}.kl-triggers{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:10px}.kl-trigger{border:1px solid rgba(255,255,255,.1);border-radius:13px;padding:12px}.kl-trigger b{display:block;margin-top:5px;font-size:16px}.kl-trigger p{margin:5px 0 0;color:#879298;font-size:8px;line-height:1.45}.kl-note{margin:8px 0 0;color:#667177;font-size:7px;line-height:1.45}
        @media(max-width:760px){.kl{padding:32px 13px}.kl-head{display:block}.kl-head p{text-align:left;margin-top:7px}.kl-inputs,.kl-results,.kl-triggers{grid-template-columns:1fr}.kl-card{min-height:80px}}
      `}</style>
      <div className="kl-in">
        <div className="kl-head">
          <h2>Investor <em>lahan</em></h2>
          <p>Masukkan luas dan harga per m². Nilai lahan, tambahan 30%, dan total pembayaran dihitung otomatis.</p>
        </div>
        <div className="kl-box">
          <div className="kl-inputs">
            <div className="kl-field"><span>1 · LUAS TANAH</span><label htmlFor="luas-lahan">Luas lahan (m²)</label><input id="luas-lahan" inputMode="decimal" type="number" min="0" step="1" placeholder="Masukkan luas" value={luas} onChange={(e) => setLuas(e.currentTarget.value)} /><small>{luas ? `${angka.format(normalisasi(luas))} m²` : 'Belum diisi'}</small></div>
            <div className="kl-field"><span>2 · HARGA TANAH</span><label htmlFor="harga-lahan">Harga per m²</label><input id="harga-lahan" inputMode="numeric" type="number" min="0" step="100000" placeholder="Masukkan harga / m²" value={harga} onChange={(e) => setHarga(e.currentTarget.value)} /><small>{harga ? `${rp.format(normalisasi(harga))} / m²` : 'Belum diisi'}</small></div>
          </div>
          <div className="kl-results">
            <div className="kl-card"><span>NILAI TOTAL LAHAN</span><b>{rp.format(hasil.nilaiLahan)}</b><small>Luas × harga per m²</small></div>
            <div className="kl-card gain"><span>TAMBAHAN / KEUNTUNGAN 30%</span><b>+{rp.format(hasil.tambahan)}</b><small>30% dari nilai total lahan</small></div>
            <div className="kl-card total"><span>TOTAL NILAI LAHAN + 30%</span><b>{rp.format(hasil.total)}</b><small>Total pembayaran kepada pemilik lahan</small></div>
          </div>
          <div className="kl-formula"><strong>RUMUS:</strong> nilai lahan = luas × harga/m² · tambahan = nilai lahan × 30% · total pembayaran = nilai lahan × 130%.</div>
          <div className="kl-triggers">
            <div className="kl-trigger"><span>PEMICU 1</span><b>INVESTOR 100%</b><p>Pembayaran dilakukan setelah pendanaan investor proyek mencapai 100%.</p></div>
            <div className="kl-trigger"><span>PEMICU 2 · CADANGAN</span><b>BANK CAIR</b><p>Jika investor belum terpenuhi, pembayaran dilakukan saat pengajuan pembiayaan bank cair.</p></div>
          </div>
          <p className="kl-note">Angka rupiah di atas berasal dari input luas dan harga yang dimasukkan pengguna. Harga tanah final tetap mengikuti nilai yang disepakati dan divalidasi.</p>
        </div>
      </div>
    </section>
  )
}
