'use client'

import { useEffect, useMemo, useState } from 'react'

const skenarioPendanaan = [
  { utang: 40, nilaiUtang: 344.435, modalSendiri: 516.653, dscr: 1.83, moic: 4.59, label: 'Utang lebih rendah' },
  { utang: 50, nilaiUtang: 430.544, modalSendiri: 430.544, dscr: 1.47, moic: 5.46, label: 'Konservatif' },
  { utang: 60, nilaiUtang: 516.653, modalSendiri: 344.435, dscr: 1.07, moic: 7.08, label: 'Skenario dasar' },
  { utang: 70, nilaiUtang: 602.762, modalSendiri: 258.326, dscr: 0.90, moic: 8.97, label: 'Utang lebih tinggi' },
]

const formatMiliar = (angka) => {
  if (!Number.isFinite(angka)) return '—'
  if (angka >= 1000) return `Rp${(angka / 1000).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`
  return `Rp${angka.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`
}

const formatPersen = (angka) => `${angka.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}%`

export default function KalkulatorInvestasi() {
  const [porsiUtang, setPorsiUtang] = useState(60)
  const [investasi, setInvestasi] = useState(100)

  const skenario = useMemo(
    () => skenarioPendanaan.find((item) => item.utang === porsiUtang) || skenarioPendanaan[2],
    [porsiUtang]
  )

  useEffect(() => {
    setInvestasi((nilai) => Math.min(nilai, Math.floor(skenario.modalSendiri)))
  }, [skenario.modalSendiri])

  const porsiSaham = Math.min(100, (investasi / skenario.modalSendiri) * 100)
  const porsiLain = Math.max(0, 100 - porsiSaham)
  const nilaiKeluarProyek = skenario.modalSendiri * skenario.moic
  const nilaiKeluarInvestor = investasi * skenario.moic
  const keuntunganKotor = nilaiKeluarInvestor - investasi
  const kenaikanKumulatif = (skenario.moic - 1) * 100

  return (
    <>
      <a className="tombol-kalkulator" href="#kalkulator-investasi">HITUNG INVESTASI</a>
      <section id="kalkulator-investasi" className="kalkulator-investasi">
        <style>{`
          .tombol-kalkulator{position:fixed;right:16px;bottom:16px;z-index:95;background:#f4c842;color:#060a0d!important;border:1px solid rgba(6,10,13,.35);box-shadow:0 14px 45px rgba(0,0,0,.28);border-radius:999px;padding:12px 16px;font:900 8px/1 Inter,ui-sans-serif,system-ui;letter-spacing:.11em;text-decoration:none}
          .kalkulator-investasi{position:relative;z-index:4;background:#060a0d;color:#fff;padding:clamp(78px,9vw,132px) clamp(18px,4vw,64px);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;overflow:hidden}
          .kalkulator-investasi:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 82% 14%,rgba(244,200,66,.14),transparent 26%),linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:auto,56px 56px,56px 56px;pointer-events:none}
          .ki-dalam{position:relative;max-width:1420px;margin:auto}
          .ki-kecil{font-size:8px;font-weight:950;letter-spacing:.17em;color:#f4c842;margin-bottom:14px;text-transform:uppercase}
          .ki-judul{font-size:clamp(46px,7.4vw,98px);line-height:.86;letter-spacing:-.065em;text-transform:uppercase;margin:0;max-width:1100px}.ki-judul em{font-style:normal;color:#f4c842}
          .ki-pengantar{font-size:clamp(17px,2vw,25px);line-height:1.24;letter-spacing:-.025em;max-width:900px;color:rgba(255,255,255,.68);margin:24px 0 0}
          .ki-layout{display:grid;grid-template-columns:.88fr 1.12fr;gap:22px;margin-top:42px;align-items:start}
          .ki-panel{border:1px solid rgba(255,255,255,.14);border-radius:28px;background:rgba(255,255,255,.025);padding:24px;box-shadow:0 24px 80px rgba(0,0,0,.18)}
          .ki-kontrol{display:grid;gap:28px}.ki-label{display:flex;justify-content:space-between;gap:16px;align-items:end;margin-bottom:12px}.ki-label span{font-size:9px;font-weight:900;letter-spacing:.08em;color:#9aa4aa}.ki-label b{font-size:28px;letter-spacing:-.045em;text-align:right}
          .ki-range{width:100%;accent-color:#f4c842;cursor:grab}.ki-range:active{cursor:grabbing}.ki-batas{display:flex;justify-content:space-between;margin-top:7px;font-size:7px;color:#7f8b91}
          .ki-pilihan{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:10px}.ki-pilihan button{border:1px solid rgba(255,255,255,.14);border-radius:14px;background:transparent;color:#fff;padding:11px 8px;font-size:8px;font-weight:900;cursor:pointer}.ki-pilihan button.aktif{background:#f4c842;color:#060a0d;border-color:#f4c842}
          .ki-rumus{margin-top:6px;border-left:3px solid #f4c842;padding:3px 0 3px 13px;font-size:9px;line-height:1.6;color:rgba(255,255,255,.58)}.ki-rumus b{color:#fff}
          .ki-hasil{display:grid;grid-template-columns:1fr 1fr;gap:8px}.ki-kartu{border:1px solid rgba(255,255,255,.13);border-radius:20px;padding:18px;min-height:126px;background:rgba(255,255,255,.02)}.ki-kartu.utama{grid-column:span 2;background:#f4c842;color:#060a0d;border-color:#f4c842;display:grid;grid-template-columns:1fr auto;gap:18px;align-items:end}.ki-kartu span{display:block;font-size:7px;font-weight:950;letter-spacing:.1em;color:#8f9aa0}.ki-kartu.utama span{color:rgba(6,10,13,.55)}.ki-kartu b{display:block;font-size:clamp(27px,3vw,44px);line-height:.92;letter-spacing:-.055em;margin-top:14px}.ki-kartu small{display:block;margin-top:8px;font-size:8px;line-height:1.45;color:#8f9aa0}.ki-kartu.utama small{color:rgba(6,10,13,.58)}
          .ki-bagi{display:grid;grid-template-columns:180px 1fr;gap:24px;align-items:center;margin-top:22px;padding-top:22px;border-top:1px solid rgba(255,255,255,.12)}
          .ki-cincin{width:180px;height:180px;border-radius:50%;display:grid;place-items:center;position:relative;background:conic-gradient(#f4c842 0 var(--saham),rgba(255,255,255,.1) var(--saham) 100%)}.ki-cincin:after{content:'';width:118px;height:118px;border-radius:50%;background:#0b1116;position:absolute}.ki-cincin-isi{position:relative;z-index:2;text-align:center}.ki-cincin-isi b{display:block;font-size:29px;letter-spacing:-.06em}.ki-cincin-isi span{display:block;font-size:7px;color:#9aa4aa;margin-top:4px;font-weight:900}
          .ki-bar{display:grid;gap:12px}.ki-bar-row{display:grid;grid-template-columns:105px 1fr 70px;gap:10px;align-items:center}.ki-bar-row span,.ki-bar-row b{font-size:8px}.ki-bar-row b{text-align:right}.ki-track{height:12px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden}.ki-isi{height:100%;border-radius:999px;background:#f4c842}.ki-isi.lain{background:rgba(255,255,255,.28)}
          .ki-ringkas{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:22px}.ki-ringkas div{border:1px solid rgba(255,255,255,.11);border-radius:16px;padding:14px}.ki-ringkas span{display:block;font-size:7px;color:#8f9aa0;font-weight:900}.ki-ringkas b{display:block;font-size:18px;margin-top:8px;letter-spacing:-.04em}
          .ki-peringatan{margin-top:24px;padding:16px 18px;border:1px solid rgba(244,200,66,.28);background:rgba(244,200,66,.055);border-radius:18px;font-size:9px;line-height:1.6;color:rgba(255,255,255,.62)}.ki-peringatan b{color:#f4c842}.ki-peringatan strong{color:#fff}
          @media(max-width:950px){.ki-layout{grid-template-columns:1fr}.ki-ringkas{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:620px){.tombol-kalkulator{right:10px;bottom:10px}.ki-panel{padding:17px;border-radius:22px}.ki-label b{font-size:22px}.ki-hasil{grid-template-columns:1fr}.ki-kartu.utama{grid-column:auto;grid-template-columns:1fr}.ki-bagi{grid-template-columns:1fr}.ki-cincin{margin:auto}.ki-pilihan{grid-template-columns:repeat(2,1fr)}.ki-ringkas{grid-template-columns:1fr 1fr}.ki-bar-row{grid-template-columns:92px 1fr 62px}}
        `}</style>

        <div className="ki-dalam">
          <div className="ki-kecil">08 · Kalkulator investasi dan pembagian saham</div>
          <h2 className="ki-judul">Geser angkanya.<br/>Lihat <em>saham dan hasilnya.</em></h2>
          <p className="ki-pengantar">Simulasi ini menghitung secara otomatis porsi saham indikatif dan potensi hasil investasi berdasarkan skenario pendanaan proyek yang sedang digunakan dalam model.</p>

          <div className="ki-layout">
            <div className="ki-panel ki-kontrol">
              <div>
                <div className="ki-label"><span>PORSI UTANG PROYEK</span><b>{porsiUtang}%</b></div>
                <input className="ki-range" type="range" min="40" max="70" step="10" value={porsiUtang} onChange={(e) => setPorsiUtang(Number(e.target.value))}/>
                <div className="ki-batas"><span>40% lebih konservatif</span><span>70% lebih agresif</span></div>
                <div className="ki-pilihan">{skenarioPendanaan.map((item) => <button key={item.utang} className={porsiUtang===item.utang?'aktif':''} onClick={() => setPorsiUtang(item.utang)}>{item.utang}% UTANG</button>)}</div>
              </div>

              <div>
                <div className="ki-label"><span>NILAI INVESTASI ANDA</span><b>{formatMiliar(investasi)}</b></div>
                <input className="ki-range" type="range" min="10" max={Math.max(10,Math.floor(skenario.modalSendiri))} step="5" value={investasi} onChange={(e) => setInvestasi(Number(e.target.value))}/>
                <div className="ki-batas"><span>Rp10 M</span><span>Maks. modal sendiri {formatMiliar(skenario.modalSendiri)}</span></div>
              </div>

              <div className="ki-rumus"><b>Rumus pembagian saham indikatif:</b><br/>investasi Anda ÷ total kebutuhan modal sendiri proyek × 100%.</div>
            </div>

            <div className="ki-panel">
              <div className="ki-hasil">
                <div className="ki-kartu utama"><div><span>PORSI SAHAM INVESTOR · INDIKATIF</span><b>{formatPersen(porsiSaham)}</b><small>Bagian pemegang saham/sponsor lain: {formatPersen(porsiLain)}</small></div><div><span>INVESTASI</span><b>{formatMiliar(investasi)}</b></div></div>
                <div className="ki-kartu"><span>NILAI INVESTASI SAAT KELUAR</span><b>{formatMiliar(nilaiKeluarInvestor)}</b><small>Investasi × {skenario.moic.toFixed(2).replace('.',',')}x.</small></div>
                <div className="ki-kartu"><span>POTENSI KEUNTUNGAN KOTOR</span><b>{formatMiliar(keuntunganKotor)}</b><small>Nilai saat keluar dikurangi modal awal.</small></div>
                <div className="ki-kartu"><span>KELIPATAN MODAL</span><b>{skenario.moic.toFixed(2).replace('.',',')}x</b><small>Kenaikan kumulatif setara {formatPersen(kenaikanKumulatif)} terhadap modal awal.</small></div>
                <div className="ki-kartu"><span>NILAI MODAL SENDIRI PROYEK SAAT KELUAR</span><b>{formatMiliar(nilaiKeluarProyek)}</b><small>Berdasarkan skenario {skenario.label.toLowerCase()}.</small></div>
              </div>

              <div className="ki-bagi">
                <div className="ki-cincin" style={{'--saham':`${porsiSaham}%`}}><div className="ki-cincin-isi"><b>{formatPersen(porsiSaham)}</b><span>SAHAM INVESTOR</span></div></div>
                <div className="ki-bar">
                  <div className="ki-bar-row"><span>Investor</span><div className="ki-track"><div className="ki-isi" style={{width:`${porsiSaham}%`}}/></div><b>{formatPersen(porsiSaham)}</b></div>
                  <div className="ki-bar-row"><span>Sponsor / lainnya</span><div className="ki-track"><div className="ki-isi lain" style={{width:`${porsiLain}%`}}/></div><b>{formatPersen(porsiLain)}</b></div>
                </div>
              </div>

              <div className="ki-ringkas">
                <div><span>KEBUTUHAN MODAL SENDIRI</span><b>{formatMiliar(skenario.modalSendiri)}</b></div>
                <div><span>NILAI UTANG PROYEK</span><b>{formatMiliar(skenario.nilaiUtang)}</b></div>
                <div><span>DSCR TAHUN 4</span><b>{skenario.dscr.toFixed(2).replace('.',',')}x</b></div>
                <div><span>SKENARIO</span><b>{skenario.label}</b></div>
              </div>

              <div className="ki-peringatan"><b>PENTING.</b> Ini adalah <strong>simulasi indikatif</strong>, bukan pembagian saham final atau janji keuntungan. Perhitungan mengasumsikan investasi masuk secara proporsional terhadap kebutuhan modal sendiri dan seluruh pemegang saham memiliki syarat ekonomi yang sama. Nilai final dapat berubah karena kontribusi tanah/aset sponsor, dilusi, dividen, pajak, biaya transaksi, perubahan jadwal, struktur saham, serta nilai keluar aktual. Persentase saham final tetap harus disepakati dan didokumentasikan setelah tahapan bukti proyek yang diwajibkan selesai.</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
