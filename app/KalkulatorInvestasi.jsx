'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const CAPEX_DASAR = 861.088067662
const NILAI_EKUITAS_KELUAR_T10 = 2438.974065938
const MOIC_TANPA_BANK = NILAI_EKUITAS_KELUAR_T10 / CAPEX_DASAR
const rupiah1 = new Intl.NumberFormat('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const rupiah3 = new Intl.NumberFormat('id-ID', { minimumFractionDigits: 3, maximumFractionDigits: 3 })
const persen = new Intl.NumberFormat('id-ID', { minimumFractionDigits: 3, maximumFractionDigits: 5 })
const kali = new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const formatMiliar = (angka, presisi = 1) => {
  const f = presisi === 3 ? rupiah3 : rupiah1
  if (angka >= 1000) return `Rp${f.format(angka / 1000)} T`
  return `Rp${f.format(angka)} M`
}

export default function KalkulatorInvestasi() {
  const [investasi, setInvestasi] = useState(1)
  const rafRef = useRef(null)
  const ubahCepat = useCallback((nilai) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => setInvestasi(nilai))
  }, [])
  useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), [])

  const porsi = Math.min(100, (investasi / CAPEX_DASAR) * 100)
  const nilaiT10 = investasi * MOIC_TANPA_BANK
  const kenaikanNilai = nilaiT10 - investasi
  const sisaPendanaan = Math.max(0, CAPEX_DASAR - investasi)

  return (
    <>
      <a className="tombol-kalkulator" href="#kalkulator-investasi">HITUNG INVESTASI</a>
      <section id="kalkulator-investasi" className="kalkulator-investasi">
        <style>{`
          .tombol-kalkulator{position:fixed;right:14px;bottom:14px;z-index:95;background:#f4c842;color:#060a0d!important;border-radius:999px;padding:10px 14px;font:900 8px/1 Inter,system-ui;letter-spacing:.1em;text-decoration:none}
          .kalkulator-investasi{position:relative;z-index:4;background:#060a0d;color:#fff;padding:44px clamp(16px,3vw,42px);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;contain:layout paint style;content-visibility:auto;contain-intrinsic-size:620px}
          .ki-dalam{max-width:1320px;margin:auto}.ki-head{display:flex;justify-content:space-between;gap:24px;align-items:end;margin-bottom:18px}.ki-kecil{font-size:8px;font-weight:950;letter-spacing:.15em;color:#f4c842;text-transform:uppercase}.ki-judul{font-size:clamp(30px,4.4vw,58px);line-height:.92;letter-spacing:-.055em;text-transform:uppercase;margin:5px 0 0}.ki-judul em{font-style:normal;color:#f4c842}.ki-head p{max-width:480px;margin:0;color:#8f9aa0;font-size:10px;line-height:1.5;text-align:right}
          .ki-kotak{border:1px solid rgba(255,255,255,.14);border-radius:20px;padding:18px;background:#0a1014}.ki-kontrol{display:grid;grid-template-columns:210px 1fr 150px;gap:16px;align-items:center}.ki-nilai span,.ki-output span,.ki-dasar span{display:block;font-size:7px;font-weight:900;letter-spacing:.08em;color:#8f9aa0}.ki-nilai b{display:block;font-size:28px;letter-spacing:-.05em;margin-top:5px}.ki-range{width:100%;accent-color:#f4c842;cursor:pointer}.ki-input{width:100%;background:#060a0d;color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:10px 12px;font-size:17px;font-weight:900;outline:none}.ki-input:focus{border-color:#f4c842}
          .ki-output-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:10px}.ki-output{border:1px solid rgba(255,255,255,.11);border-radius:15px;padding:13px 14px;min-height:92px}.ki-output.utama{background:#f4c842;color:#060a0d;border-color:#f4c842}.ki-output.utama span{color:rgba(6,10,13,.58)}.ki-output b{display:block;font-size:clamp(21px,2.7vw,33px);letter-spacing:-.05em;margin-top:9px}.ki-output small{display:block;color:#7f8b91;font-size:7px;line-height:1.35;margin-top:5px}.ki-output.utama small{color:rgba(6,10,13,.58)}.ki-output.positif b{color:#79dfb4}
          .ki-dasar{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:10px}.ki-dasar div{border-top:1px solid rgba(255,255,255,.1);padding:10px 4px 0}.ki-dasar b{display:block;font-size:13px;margin-top:5px}.ki-catatan{margin-top:12px;color:#8f9aa0;font-size:8px;line-height:1.55}.ki-catatan strong{color:#fff}.ki-detail{margin-top:10px;border-top:1px solid rgba(255,255,255,.1);padding-top:10px}.ki-detail summary{cursor:pointer;font-size:8px;font-weight:900;color:#f4c842;letter-spacing:.08em}.ki-detail p{margin:9px 0 0;color:#7f8b91;font-size:8px;line-height:1.55;max-width:980px}
          @media(max-width:860px){.ki-head{display:block}.ki-head p{text-align:left;margin-top:8px}.ki-kontrol{grid-template-columns:1fr}.ki-output-grid{grid-template-columns:repeat(2,1fr)}.ki-dasar{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:500px){.kalkulator-investasi{padding:32px 14px}.ki-kotak{padding:14px}.ki-output-grid,.ki-dasar{grid-template-columns:1fr 1fr}.ki-output{min-height:82px;padding:11px}.ki-output b{font-size:21px}.ki-input{font-size:16px}}
        `}</style>

        <div className="ki-dalam">
          <div className="ki-head">
            <div><div className="ki-kecil">08 · Investasi Anda</div><h2 className="ki-judul">Rp1 miliar → <em>{persen.format(1 / CAPEX_DASAR * 100)}%</em></h2></div>
            <p>Satu orang, satu input. Geser atau ketik nilai investasi; porsi saham basis pendanaan dan nilai Tahun 10 langsung dihitung dari angka model terkendali.</p>
          </div>

          <div className="ki-kotak">
            <div className="ki-kontrol">
              <div className="ki-nilai"><span>NILAI INVESTASI ANDA</span><b>{formatMiliar(investasi)}</b></div>
              <input className="ki-range" aria-label="Nilai investasi dalam miliar rupiah" type="range" min="1" max="861" step="1" value={Math.min(861, Math.round(investasi))} onInput={(e) => ubahCepat(Number(e.currentTarget.value))}/>
              <input className="ki-input" aria-label="Ketik nilai investasi dalam miliar rupiah" type="number" min="1" max={CAPEX_DASAR} step="1" value={investasi} onChange={(e) => setInvestasi(Math.min(CAPEX_DASAR, Math.max(1, Number(e.currentTarget.value) || 1)))}/>
            </div>

            <div className="ki-output-grid">
              <div className="ki-output utama"><span>PORSI SAHAM BASIS PENDANAAN</span><b>{persen.format(porsi)}%</b><small>Investasi ÷ Rp861.088.067.662</small></div>
              <div className="ki-output"><span>NILAI EKUITAS TAHUN 10</span><b>{formatMiliar(nilaiT10,3)}</b><small>Berdasarkan nilai keluar terkendali</small></div>
              <div className="ki-output positif"><span>KENAIKAN NILAI EKUITAS</span><b>{formatMiliar(kenaikanNilai,3)}</b><small>Nilai Tahun 10 dikurangi modal awal</small></div>
              <div className="ki-output"><span>KELIPATAN NILAI</span><b>{kali.format(MOIC_TANPA_BANK)}x</b><small>Skenario 0% utang bank</small></div>
            </div>
            <div className="ki-dasar">
              <div><span>TOTAL MODAL PROYEK</span><b>{formatMiliar(CAPEX_DASAR,3)}</b></div>
              <div><span>NILAI EKUITAS KELUAR TAHUN 10</span><b>{formatMiliar(NILAI_EKUITAS_KELUAR_T10,3)}</b></div>
              <div><span>UTANG BANK</span><b>Rp0</b></div>
              <div><span>SISA KEBUTUHAN MODAL</span><b>{formatMiliar(sisaPendanaan,3)}</b></div>
            </div>

            <div className="ki-catatan"><strong>Dasar angka:</strong> skenario 0% utang bank pada model terkendali. CAPEX masih berstatus anggaran perencanaan dan belum CAPEX tersertifikasi.</div>
            <details className="ki-detail"><summary>LIHAT RUMUS & BATAS VALIDITAS</summary><p>Porsi saham basis pendanaan = investasi ÷ Rp861.088.067.662 × 100%. Nilai ekuitas Tahun 10 = porsi × Rp2.438.974.065.938. Ini bukan janji hasil atau cap table legal final; pre-money, post-money, dan nilai tanah tersertifikasi masih belum ditetapkan.</p></details>
          </div>
        </div>
      </section>
    </>
  )
}
