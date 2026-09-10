'use client'

import { useState } from 'react'

const CAPEX_DASAR = 861.088067662
const KAS_DI_LUAR_TANAH = 811.088067662
const UTANG_BANK = 0
const CICILAN_BANK = 0
const CFADS_T4_TANPA_BANK = 110.706492086
const NILAI_EKUITAS_KELUAR_T10 = 2438.974065938
const MOIC_TANPA_BANK = NILAI_EKUITAS_KELUAR_T10 / CAPEX_DASAR

const formatMiliar = (angka, digit = 1) => {
  if (!Number.isFinite(angka)) return '—'
  if (Math.abs(angka) >= 1000) return `Rp${(angka / 1000).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 3 })} T`
  return `Rp${angka.toLocaleString('id-ID', { minimumFractionDigits: digit, maximumFractionDigits: digit })} M`
}
const formatPersen = (angka) => `${angka.toLocaleString('id-ID', { minimumFractionDigits: 3, maximumFractionDigits: 5 })}%`
const formatKali = (angka) => `${angka.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}x`

export default function KalkulatorInvestasi() {
  const [investasi, setInvestasi] = useState(1)
  const porsi = Math.min(100, (investasi / CAPEX_DASAR) * 100)
  const nilaiT10 = investasi * MOIC_TANPA_BANK
  const kenaikanNilai = nilaiT10 - investasi
  const sisaPendanaan = Math.max(0, CAPEX_DASAR - investasi)
  return (
    <>
      <a className="tombol-kalkulator" href="#kalkulator-investasi">HITUNG INVESTASI</a>
      <section id="kalkulator-investasi" className="kalkulator-investasi">
        <style>{`
          .tombol-kalkulator{position:fixed;right:16px;bottom:16px;z-index:95;background:#f4c842;color:#060a0d!important;border:1px solid rgba(6,10,13,.35);box-shadow:0 14px 45px rgba(0,0,0,.28);border-radius:999px;padding:12px 16px;font:900 8px/1 Inter,ui-sans-serif,system-ui;letter-spacing:.11em;text-decoration:none}
          .kalkulator-investasi{position:relative;z-index:4;background:#060a0d;color:#fff;padding:clamp(78px,9vw,132px) clamp(18px,4vw,64px);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;overflow:hidden}
          .kalkulator-investasi:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 82% 10%,rgba(244,200,66,.16),transparent 25%),linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:auto,56px 56px,56px 56px;pointer-events:none}
          .ki-dalam{position:relative;max-width:1420px;margin:auto}.ki-kecil{font-size:8px;font-weight:950;letter-spacing:.17em;color:#f4c842;margin-bottom:14px;text-transform:uppercase}.ki-judul{font-size:clamp(46px,7.4vw,98px);line-height:.86;letter-spacing:-.065em;text-transform:uppercase;margin:0;max-width:1180px}.ki-judul em{font-style:normal;color:#f4c842}.ki-pengantar{font-size:clamp(17px,2vw,25px);line-height:1.24;letter-spacing:-.025em;max-width:980px;color:rgba(255,255,255,.68);margin:24px 0 0}
          .ki-sumber{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:30px}.ki-sumber div{border:1px solid rgba(255,255,255,.13);border-radius:18px;padding:16px;background:rgba(255,255,255,.025)}.ki-sumber div:first-child{background:#f4c842;color:#060a0d;border-color:#f4c842}.ki-sumber span{display:block;font-size:7px;font-weight:950;letter-spacing:.09em;color:#8f9aa0}.ki-sumber div:first-child span{color:rgba(6,10,13,.55)}.ki-sumber b{display:block;font-size:25px;margin-top:9px;letter-spacing:-.05em}.ki-sumber small{display:block;font-size:8px;line-height:1.45;margin-top:6px;color:#8f9aa0}.ki-sumber div:first-child small{color:rgba(6,10,13,.6)}
          .ki-layout{display:grid;grid-template-columns:.82fr 1.18fr;gap:22px;margin-top:30px;align-items:start}.ki-panel{border:1px solid rgba(255,255,255,.14);border-radius:28px;background:rgba(255,255,255,.025);padding:24px;box-shadow:0 24px 80px rgba(0,0,0,.18)}
          .ki-label{display:flex;justify-content:space-between;gap:16px;align-items:end;margin-bottom:12px}.ki-label span{font-size:9px;font-weight:900;letter-spacing:.08em;color:#9aa4aa}.ki-label b{font-size:30px;letter-spacing:-.045em;text-align:right}.ki-range{width:100%;accent-color:#f4c842;cursor:grab}.ki-range:active{cursor:grabbing}.ki-batas{display:flex;justify-content:space-between;gap:12px;margin-top:7px;font-size:7px;color:#7f8b91}.ki-input{width:100%;margin-top:18px;background:#0c1419;color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:13px 14px;font-size:18px;font-weight:900;outline:none}.ki-input:focus{border-color:#f4c842}.ki-rumus{margin-top:20px;border-left:3px solid #f4c842;padding:3px 0 3px 13px;font-size:9px;line-height:1.65;color:rgba(255,255,255,.58)}.ki-rumus b{color:#fff}
          .ki-hasil{display:grid;grid-template-columns:1fr 1fr;gap:8px}.ki-kartu{border:1px solid rgba(255,255,255,.13);border-radius:20px;padding:18px;min-height:126px;background:rgba(255,255,255,.02)}.ki-kartu.utama{grid-column:span 2;background:#f4c842;color:#060a0d;border-color:#f4c842;display:grid;grid-template-columns:1fr auto;gap:18px;align-items:end}.ki-kartu span{display:block;font-size:7px;font-weight:950;letter-spacing:.1em;color:#8f9aa0}.ki-kartu.utama span{color:rgba(6,10,13,.55)}.ki-kartu b{display:block;font-size:clamp(27px,3vw,44px);line-height:.92;letter-spacing:-.055em;margin-top:14px}.ki-kartu small{display:block;margin-top:8px;font-size:8px;line-height:1.45;color:#8f9aa0}.ki-kartu.utama small{color:rgba(6,10,13,.6)}.ki-kartu.positif b{color:#79dfb4}
          .ki-bagi{display:grid;grid-template-columns:180px 1fr;gap:24px;align-items:center;margin-top:22px;padding-top:22px;border-top:1px solid rgba(255,255,255,.12)}.ki-cincin{width:180px;height:180px;border-radius:50%;display:grid;place-items:center;position:relative;background:conic-gradient(#f4c842 0 var(--saham),rgba(255,255,255,.1) var(--saham) 100%)}.ki-cincin:after{content:'';width:118px;height:118px;border-radius:50%;background:#0b1116;position:absolute}.ki-cincin-isi{position:relative;z-index:2;text-align:center}.ki-cincin-isi b{display:block;font-size:28px;letter-spacing:-.06em}.ki-cincin-isi span{display:block;font-size:7px;color:#9aa4aa;margin-top:4px;font-weight:900}
          .ki-rincian{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:22px}.ki-rincian div{border:1px solid rgba(255,255,255,.11);border-radius:16px;padding:14px}.ki-rincian span{display:block;font-size:7px;color:#8f9aa0;font-weight:900}.ki-rincian b{display:block;font-size:18px;margin-top:8px;letter-spacing:-.04em}.ki-rincian small{display:block;font-size:7px;line-height:1.4;color:#758188;margin-top:5px}
          .ki-catatan{margin-top:22px;padding:16px 18px;border:1px solid rgba(244,200,66,.28);background:rgba(244,200,66,.055);border-radius:18px;font-size:9px;line-height:1.65;color:rgba(255,255,255,.62)}.ki-catatan b{color:#f4c842}.ki-catatan strong{color:#fff}
          @media(max-width:980px){.ki-layout{grid-template-columns:1fr}.ki-sumber{grid-template-columns:repeat(2,1fr)}.ki-rincian{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:620px){.tombol-kalkulator{right:10px;bottom:10px}.ki-panel{padding:17px;border-radius:22px}.ki-label b{font-size:23px}.ki-hasil{grid-template-columns:1fr}.ki-kartu.utama{grid-column:auto;grid-template-columns:1fr}.ki-bagi{grid-template-columns:1fr}.ki-cincin{margin:auto}.ki-rincian,.ki-sumber{grid-template-columns:1fr 1fr}}
          @media(max-width:420px){.ki-rincian,.ki-sumber{grid-template-columns:1fr}}
        `}</style>

        <div className="ki-dalam">
          <div className="ki-kecil">08 · Investasi satu orang · angka terkendali</div>
          <h2 className="ki-judul">Masukkan modal Anda.<br/><em>Langsung terlihat porsinya.</em></h2>
          <p className="ki-pengantar">Satu-satunya input adalah nilai investasi Anda. Seluruh hasil lain dihitung otomatis dari skenario 0% utang bank dan angka model keuangan terkendali.</p>

          <div className="ki-sumber">
            <div><span>UTANG BANK · SKENARIO UTAMA</span><b>{formatMiliar(UTANG_BANK)}</b><small>0% bank. Tidak ada bunga dan cicilan bank.</small></div>
            <div><span>TOTAL MODAL PROYEK · BASIS CAPEX</span><b>{formatMiliar(CAPEX_DASAR,3)}</b><small>Anggaran dasar terkendali; masih berstatus budgetary, belum CAPEX tersertifikasi.</small></div>
            <div><span>ARUS KAS PROYEK TAHUN 4 · TANPA BANK</span><b>{formatMiliar(CFADS_T4_TANPA_BANK,3)}</b><small>Hasil formula model 0% utang yang sekarang tercatat di skenario investor.</small></div>
            <div><span>NILAI EKUITAS KELUAR · TAHUN 10</span><b>{formatMiliar(NILAI_EKUITAS_KELUAR_T10,3)}</b><small>Output model yang sama; tetap bergantung pada asumsi kelipatan nilai keluar yang sudah tercatat.</small></div>
          </div>
          <div className="ki-layout">
            <div className="ki-panel">
              <div className="ki-label"><span>NILAI INVESTASI ANDA</span><b>{formatMiliar(investasi)}</b></div>
              <input className="ki-range" type="range" min="1" max="861" step="1" value={investasi} onChange={(e) => setInvestasi(Number(e.target.value))}/>
              <div className="ki-batas"><span>Rp1 M</span><span>Maks. Rp861 M</span></div>
              <input className="ki-input" type="number" min="1" max="861.088067662" step="1" value={investasi} onChange={(e) => setInvestasi(Math.min(CAPEX_DASAR, Math.max(1, Number(e.target.value) || 1)))}/>
              <div className="ki-rumus"><b>Rumus tetap:</b><br/>porsi modal/saham basis presentasi = investasi Anda ÷ Rp861.088.067.662 × 100%.<br/>Nilai Tahun 10 = porsi Anda × Rp2.438.974.065.938.</div>
              <div className="ki-catatan"><b>NILAI AWAL RP1 MILIAR.</b> Rp1 miliar menghasilkan porsi <strong>{formatPersen(1 / CAPEX_DASAR * 100)}</strong> dari basis modal proyek. Setiap presentasi menghitung satu orang langsung dari modalnya sendiri.</div>
            </div>

            <div className="ki-panel">
              <div className="ki-hasil">
                <div className="ki-kartu utama"><div><span>PORSI SAHAM BASIS PENDANAAN</span><b>{formatPersen(porsi)}</b><small>Dihitung langsung dari total CAPEX dasar Rp861.088.067.662.</small></div><div><span>MODAL ANDA</span><b>{formatMiliar(investasi)}</b></div></div>
                <div className="ki-kartu"><span>NILAI EKUITAS ANDA · TAHUN 10</span><b>{formatMiliar(nilaiT10,3)}</b><small>Berdasarkan nilai ekuitas keluar Tahun 10 yang sudah ada di model terkendali.</small></div>
                <div className="ki-kartu positif"><span>KENAIKAN NILAI EKUITAS · MODEL TAHUN 10</span><b>{formatMiliar(kenaikanNilai,3)}</b><small>Nilai ekuitas Tahun 10 dikurangi modal awal; bukan dividen dan bukan janji hasil.</small></div>
                <div className="ki-kartu"><span>KELIPATAN NILAI EKUITAS</span><b>{formatKali(MOIC_TANPA_BANK)}</b><small>Output skenario 0% bank pada model terkendali.</small></div>
                <div className="ki-kartu"><span>SISA MODAL PROYEK YANG BELUM TERISI</span><b>{formatMiliar(sisaPendanaan,3)}</b><small>Total basis modal dikurangi investasi orang ini.</small></div>
              </div>
              <div className="ki-bagi">
                <div className="ki-cincin" style={{'--saham':`${Math.max(0.1,porsi)}%`}}><div className="ki-cincin-isi"><b>{formatPersen(porsi)}</b><span>PORSI ANDA</span></div></div>
                <div>
                  <div className="ki-rincian">
                    <div><span>KEBUTUHAN KAS DI LUAR TANAH</span><b>{formatMiliar(KAS_DI_LUAR_TANAH,3)}</b><small>Angka kontrol proyek; bukan pembagi saham.</small></div>
                    <div><span>UTANG BANK</span><b>Rp0</b><small>Tidak ada biaya bunga bank.</small></div>
                    <div><span>CICILAN POKOK BANK</span><b>{formatMiliar(CICILAN_BANK)}</b><small>Tidak ada kewajiban pembayaran pokok bank.</small></div>
                    <div><span>DSCR BANK</span><b>Tidak berlaku</b><small>Karena skenario utama memakai 0% utang bank.</small></div>
                  </div>
                </div>
              </div>

              <div className="ki-catatan"><b>BATAS VALIDITAS.</b> Persentase di atas adalah <strong>basis pembagian modal presentasi yang diarahkan pemilik</strong>: modal investor dibagi total CAPEX dasar. Cap table legal proyek saat ini belum memiliki pre-money, post-money, dan nilai tanah tersertifikasi. Karena itu halaman ini hanya menampilkan angka yang dapat ditarik langsung dari basis model terkendali. Nilai Tahun 10 hanya memakai output nilai keluar yang sudah ada di model terkendali dan tetap bergantung pada asumsi kelipatan nilai keluar tersebut.</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
