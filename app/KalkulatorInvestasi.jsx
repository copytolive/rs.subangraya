'use client'

import { useEffect, useMemo, useState } from 'react'

const CAPEX_DASAR = 861.088
const KAS_DI_LUAR_TANAH = 811.088
const KONTRIBUSI_ASET_DASAR = 50
const LABA_BERSIH_T4 = 58.539
const LABA_BERSIH_T10 = 150.238
const NILAI_KELUAR_REFERENSI = 2370

const pembandingBank = [
  { utang: 40, nilaiUtang: 344.435, modal: 516.653, dscr: 1.83, moic: 4.59 },
  { utang: 50, nilaiUtang: 430.544, modal: 430.544, dscr: 1.47, moic: 5.46 },
  { utang: 60, nilaiUtang: 516.653, modal: 344.435, dscr: 1.07, moic: 7.08 },
  { utang: 70, nilaiUtang: 602.762, modal: 258.326, dscr: 0.90, moic: 8.97 },
]

const formatMiliar = (angka) => {
  if (!Number.isFinite(angka)) return '—'
  if (Math.abs(angka) >= 1000) return `Rp${(angka / 1000).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`
  return `Rp${angka.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`
}

const formatPersen = (angka) => `${angka.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}%`
const formatKali = (angka) => Number.isFinite(angka) ? `${angka.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}x` : '—'

export default function KalkulatorInvestasi() {
  const [porsiSponsor, setPorsiSponsor] = useState(5.8)
  const [jumlahInvestor, setJumlahInvestor] = useState(5)
  const [investasi, setInvestasi] = useState(100)
  const [caraSaham, setCaraSaham] = useState('proporsional')
  const [sahamNegosiasi, setSahamNegosiasi] = useState(12)
  const [porsiDividen, setPorsiDividen] = useState(50)
  const [nilaiKeluar, setNilaiKeluar] = useState(NILAI_KELUAR_REFERENSI)

  const nilaiSponsor = CAPEX_DASAR * (porsiSponsor / 100)
  const kebutuhanInvestor = Math.max(0, CAPEX_DASAR - nilaiSponsor)
  const porsiInvestorGabungan = Math.max(0, 100 - porsiSponsor)
  const rataInvestasi = kebutuhanInvestor / jumlahInvestor
  const rataSaham = porsiInvestorGabungan / jumlahInvestor
  const tambahanNilaiSponsor = Math.max(0, nilaiSponsor - KONTRIBUSI_ASET_DASAR)

  useEffect(() => {
    setInvestasi((nilai) => Math.min(Math.max(10, nilai), Math.max(10, Math.floor(kebutuhanInvestor))))
  }, [kebutuhanInvestor])

  const sahamProporsional = Math.min(100, (investasi / CAPEX_DASAR) * 100)
  const sahamInvestor = caraSaham === 'proporsional' ? sahamProporsional : sahamNegosiasi
  const sahamLain = Math.max(0, 100 - sahamInvestor)
  const melebihiKolamInvestor = sahamInvestor > porsiInvestorGabungan + 0.01

  const dividenT4 = LABA_BERSIH_T4 * (porsiDividen / 100) * (sahamInvestor / 100)
  const dividenT10 = LABA_BERSIH_T10 * (porsiDividen / 100) * (sahamInvestor / 100)
  const hasilDividenT10 = investasi > 0 ? (dividenT10 / investasi) * 100 : 0
  const nilaiSahamKeluar = nilaiKeluar * (sahamInvestor / 100)
  const keuntunganNilaiSaham = nilaiSahamKeluar - investasi
  const kelipatanNilaiSaham = investasi > 0 ? nilaiSahamKeluar / investasi : 0
  const balikModalKasar = dividenT10 > 0 ? investasi / dividenT10 : Infinity

  const ringkasan = useMemo(() => ({
    utangBank: 0,
    bungaBank: 0,
    investor: kebutuhanInvestor,
    sponsor: nilaiSponsor,
  }), [kebutuhanInvestor, nilaiSponsor])

  return (
    <>
      <a className="tombol-kalkulator" href="#kalkulator-investasi">HITUNG INVESTASI</a>
      <section id="kalkulator-investasi" className="kalkulator-investasi">
        <style>{`
          .tombol-kalkulator{position:fixed;right:16px;bottom:16px;z-index:95;background:#f4c842;color:#060a0d!important;border:1px solid rgba(6,10,13,.35);box-shadow:0 14px 45px rgba(0,0,0,.28);border-radius:999px;padding:12px 16px;font:900 8px/1 Inter,ui-sans-serif,system-ui;letter-spacing:.11em;text-decoration:none}
          .kalkulator-investasi{position:relative;z-index:4;background:#060a0d;color:#fff;padding:clamp(78px,9vw,132px) clamp(18px,4vw,64px);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;overflow:hidden}
          .kalkulator-investasi:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 82% 10%,rgba(244,200,66,.16),transparent 25%),linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:auto,56px 56px,56px 56px;pointer-events:none}
          .ki-dalam{position:relative;max-width:1420px;margin:auto}.ki-kecil{font-size:8px;font-weight:950;letter-spacing:.17em;color:#f4c842;margin-bottom:14px;text-transform:uppercase}.ki-judul{font-size:clamp(46px,7.4vw,98px);line-height:.86;letter-spacing:-.065em;text-transform:uppercase;margin:0;max-width:1180px}.ki-judul em{font-style:normal;color:#f4c842}.ki-pengantar{font-size:clamp(17px,2vw,25px);line-height:1.24;letter-spacing:-.025em;max-width:980px;color:rgba(255,255,255,.68);margin:24px 0 0}
          .ki-prinsip{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:30px}.ki-prinsip div{border:1px solid rgba(255,255,255,.13);border-radius:18px;padding:16px;background:rgba(255,255,255,.025)}.ki-prinsip div:first-child{background:#f4c842;color:#060a0d;border-color:#f4c842}.ki-prinsip span{display:block;font-size:7px;font-weight:950;letter-spacing:.09em;color:#8f9aa0}.ki-prinsip div:first-child span{color:rgba(6,10,13,.55)}.ki-prinsip b{display:block;font-size:25px;margin-top:9px;letter-spacing:-.05em}.ki-prinsip small{display:block;font-size:8px;line-height:1.45;margin-top:6px;color:#8f9aa0}.ki-prinsip div:first-child small{color:rgba(6,10,13,.6)}
          .ki-layout{display:grid;grid-template-columns:.9fr 1.1fr;gap:22px;margin-top:30px;align-items:start}.ki-panel{border:1px solid rgba(255,255,255,.14);border-radius:28px;background:rgba(255,255,255,.025);padding:24px;box-shadow:0 24px 80px rgba(0,0,0,.18)}.ki-kontrol{display:grid;gap:28px}.ki-label{display:flex;justify-content:space-between;gap:16px;align-items:end;margin-bottom:12px}.ki-label span{font-size:9px;font-weight:900;letter-spacing:.08em;color:#9aa4aa}.ki-label b{font-size:26px;letter-spacing:-.045em;text-align:right}.ki-range{width:100%;accent-color:#f4c842;cursor:grab}.ki-range:active{cursor:grabbing}.ki-batas{display:flex;justify-content:space-between;gap:12px;margin-top:7px;font-size:7px;color:#7f8b91}.ki-sub{font-size:8px;line-height:1.5;color:#8f9aa0;margin-top:8px}.ki-sub strong{color:#fff}.ki-pilihan{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:9px}.ki-pilihan button{border:1px solid rgba(255,255,255,.14);border-radius:14px;background:transparent;color:#fff;padding:11px 8px;font-size:8px;font-weight:900;cursor:pointer}.ki-pilihan button.aktif{background:#f4c842;color:#060a0d;border-color:#f4c842}.ki-rumus{border-left:3px solid #f4c842;padding:3px 0 3px 13px;font-size:9px;line-height:1.6;color:rgba(255,255,255,.58)}.ki-rumus b{color:#fff}
          .ki-hasil{display:grid;grid-template-columns:1fr 1fr;gap:8px}.ki-kartu{border:1px solid rgba(255,255,255,.13);border-radius:20px;padding:18px;min-height:126px;background:rgba(255,255,255,.02)}.ki-kartu.utama{grid-column:span 2;background:#f4c842;color:#060a0d;border-color:#f4c842;display:grid;grid-template-columns:1fr auto;gap:18px;align-items:end}.ki-kartu span{display:block;font-size:7px;font-weight:950;letter-spacing:.1em;color:#8f9aa0}.ki-kartu.utama span{color:rgba(6,10,13,.55)}.ki-kartu b{display:block;font-size:clamp(27px,3vw,44px);line-height:.92;letter-spacing:-.055em;margin-top:14px}.ki-kartu small{display:block;margin-top:8px;font-size:8px;line-height:1.45;color:#8f9aa0}.ki-kartu.utama small{color:rgba(6,10,13,.6)}.ki-kartu.positif b{color:#79dfb4}.ki-kartu.negatif b{color:#ff806a}
          .ki-bagi{display:grid;grid-template-columns:180px 1fr;gap:24px;align-items:center;margin-top:22px;padding-top:22px;border-top:1px solid rgba(255,255,255,.12)}.ki-cincin{width:180px;height:180px;border-radius:50%;display:grid;place-items:center;position:relative;background:conic-gradient(#f4c842 0 var(--saham),rgba(255,255,255,.1) var(--saham) 100%)}.ki-cincin:after{content:'';width:118px;height:118px;border-radius:50%;background:#0b1116;position:absolute}.ki-cincin-isi{position:relative;z-index:2;text-align:center}.ki-cincin-isi b{display:block;font-size:29px;letter-spacing:-.06em}.ki-cincin-isi span{display:block;font-size:7px;color:#9aa4aa;margin-top:4px;font-weight:900}.ki-bar{display:grid;gap:12px}.ki-bar-row{display:grid;grid-template-columns:120px 1fr 70px;gap:10px;align-items:center}.ki-bar-row span,.ki-bar-row b{font-size:8px}.ki-bar-row b{text-align:right}.ki-track{height:12px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden}.ki-isi{height:100%;border-radius:999px;background:#f4c842}.ki-isi.lain{background:rgba(255,255,255,.28)}
          .ki-rincian{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:22px}.ki-rincian div{border:1px solid rgba(255,255,255,.11);border-radius:16px;padding:14px}.ki-rincian span{display:block;font-size:7px;color:#8f9aa0;font-weight:900}.ki-rincian b{display:block;font-size:18px;margin-top:8px;letter-spacing:-.04em}.ki-rincian small{display:block;font-size:7px;line-height:1.4;color:#758188;margin-top:5px}
          .ki-peringatan{margin-top:22px;padding:16px 18px;border:1px solid rgba(244,200,66,.28);background:rgba(244,200,66,.055);border-radius:18px;font-size:9px;line-height:1.6;color:rgba(255,255,255,.62)}.ki-peringatan b{color:#f4c842}.ki-peringatan strong{color:#fff}.ki-peringatan.merah{border-color:rgba(255,128,106,.35);background:rgba(255,128,106,.06)}.ki-peringatan.merah b{color:#ff806a}
          .ki-bank{margin-top:42px;border-top:1px solid rgba(255,255,255,.13);padding-top:30px}.ki-bank-head{display:grid;grid-template-columns:1fr .8fr;gap:24px;align-items:end}.ki-bank-head h3{font-size:clamp(30px,4.5vw,58px);line-height:.92;letter-spacing:-.055em;text-transform:uppercase;margin:0}.ki-bank-head p{font-size:10px;line-height:1.55;color:#8f9aa0;margin:0}.ki-bank-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:20px}.ki-bank-card{border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:16px;background:rgba(255,255,255,.02)}.ki-bank-card>span{font-size:7px;color:#8f9aa0;font-weight:900}.ki-bank-card>strong{display:block;font-size:29px;margin:9px 0 14px;color:#fff}.ki-bank-card dl{margin:0;display:grid;gap:7px}.ki-bank-card dl div{display:flex;justify-content:space-between;gap:8px;border-top:1px solid rgba(255,255,255,.08);padding-top:7px}.ki-bank-card dt{font-size:7px;color:#7f8b91}.ki-bank-card dd{font-size:8px;font-weight:900;margin:0;text-align:right}
          @media(max-width:980px){.ki-layout{grid-template-columns:1fr}.ki-prinsip{grid-template-columns:repeat(2,1fr)}.ki-bank-grid{grid-template-columns:repeat(2,1fr)}.ki-bank-head{grid-template-columns:1fr}.ki-rincian{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:620px){.tombol-kalkulator{right:10px;bottom:10px}.ki-panel{padding:17px;border-radius:22px}.ki-label b{font-size:22px}.ki-hasil{grid-template-columns:1fr}.ki-kartu.utama{grid-column:auto;grid-template-columns:1fr}.ki-bagi{grid-template-columns:1fr}.ki-cincin{margin:auto}.ki-rincian,.ki-prinsip,.ki-bank-grid{grid-template-columns:1fr 1fr}.ki-bar-row{grid-template-columns:105px 1fr 62px}}
          @media(max-width:420px){.ki-rincian,.ki-prinsip,.ki-bank-grid{grid-template-columns:1fr}}
        `}</style>

        <div className="ki-dalam">
          <div className="ki-kecil">08 · Kalkulator pembiayaan investor tanpa bank</div>
          <h2 className="ki-judul">0% utang bank.<br/><em>100% modal pemegang saham.</em></h2>
          <p className="ki-pengantar">Skenario utama sekarang menggunakan pembiayaan ekuitas: investor tunai dan kontribusi aset sponsor membiayai proyek tanpa pinjaman bank. Geser setiap angka untuk melihat kebutuhan dana, pembagian saham, dividen indikatif, dan potensi nilai saham secara otomatis.</p>

          <div className="ki-prinsip">
            <div><span>UTANG BANK</span><b>{ringkasan.utangBank}%</b><small>Tidak ada pinjaman bank pada skenario utama.</small></div>
            <div><span>CAPEX DASAR</span><b>{formatMiliar(CAPEX_DASAR)}</b><small>Masih berupa anggaran indikatif, belum CAPEX tersertifikasi.</small></div>
            <div><span>KEBUTUHAN KAS DI LUAR TANAH</span><b>{formatMiliar(KAS_DI_LUAR_TANAH)}</b><small>Basis model perencanaan saat ini.</small></div>
            <div><span>BUNGA & CICILAN BANK</span><b>Rp0</b><small>DSCR bank tidak menjadi pembatas selama tidak ada utang bank.</small></div>
          </div>

          <div className="ki-layout">
            <div className="ki-panel ki-kontrol">
              <div>
                <div className="ki-label"><span>PORSI SPONSOR YANG DIPERTAHANKAN</span><b>{formatPersen(porsiSponsor)}</b></div>
                <input className="ki-range" type="range" min="0" max="40" step="0.5" value={porsiSponsor} onChange={(e) => setPorsiSponsor(Number(e.target.value))}/>
                <div className="ki-batas"><span>0% seluruhnya investor luar</span><span>40% sponsor</span></div>
                <div className="ki-sub">Pada basis biaya proyek, porsi ini setara kontribusi ekonomi sponsor sekitar <strong>{formatMiliar(nilaiSponsor)}</strong>. Basis aset/tanah dalam model saat ini sekitar {formatMiliar(KONTRIBUSI_ASET_DASAR)}.</div>
              </div>

              <div>
                <div className="ki-label"><span>JUMLAH INVESTOR</span><b>{jumlahInvestor} investor</b></div>
                <input className="ki-range" type="range" min="1" max="20" step="1" value={jumlahInvestor} onChange={(e) => setJumlahInvestor(Number(e.target.value))}/>
                <div className="ki-batas"><span>1 investor utama</span><span>20 investor</span></div>
                <div className="ki-sub">Jika dibagi rata: sekitar <strong>{formatMiliar(rataInvestasi)}</strong> per investor dan <strong>{formatPersen(rataSaham)}</strong> saham per investor.</div>
              </div>

              <div>
                <div className="ki-label"><span>NILAI INVESTASI ANDA</span><b>{formatMiliar(investasi)}</b></div>
                <input className="ki-range" type="range" min="10" max={Math.max(10, Math.floor(kebutuhanInvestor))} step="5" value={investasi} onChange={(e) => setInvestasi(Number(e.target.value))}/>
                <div className="ki-batas"><span>Rp10 M</span><span>Kebutuhan investor {formatMiliar(kebutuhanInvestor)}</span></div>
              </div>

              <div>
                <div className="ki-label"><span>CARA MENENTUKAN SAHAM ANDA</span><b>{caraSaham === 'proporsional' ? 'Proporsional' : 'Negosiasi'}</b></div>
                <div className="ki-pilihan"><button className={caraSaham==='proporsional'?'aktif':''} onClick={() => setCaraSaham('proporsional')}>PROPORSIONAL MODAL</button><button className={caraSaham==='negosiasi'?'aktif':''} onClick={() => { setCaraSaham('negosiasi'); setSahamNegosiasi(Number(sahamProporsional.toFixed(1))) }}>NEGOSIASI SAHAM</button></div>
                {caraSaham === 'negosiasi' ? <><input className="ki-range" type="range" min="1" max="95" step="0.5" value={sahamNegosiasi} onChange={(e) => setSahamNegosiasi(Number(e.target.value))}/><div className="ki-batas"><span>1%</span><span>95%</span></div></> : <div className="ki-sub">Otomatis: investasi Anda ÷ CAPEX dasar × 100% = <strong>{formatPersen(sahamProporsional)}</strong>.</div>}
              </div>

              <div>
                <div className="ki-label"><span>PORSI LABA YANG DIBAGIKAN</span><b>{porsiDividen}%</b></div>
                <input className="ki-range" type="range" min="0" max="100" step="5" value={porsiDividen} onChange={(e) => setPorsiDividen(Number(e.target.value))}/>
                <div className="ki-batas"><span>0% ditahan untuk ekspansi</span><span>100% dibagikan</span></div>
              </div>

              <div>
                <div className="ki-label"><span>ASUMSI NILAI PERUSAHAAN TAHUN 10</span><b>{formatMiliar(nilaiKeluar)}</b></div>
                <input className="ki-range" type="range" min="861" max="4000" step="50" value={nilaiKeluar} onChange={(e) => setNilaiKeluar(Number(e.target.value))}/>
                <div className="ki-batas"><span>sekitar CAPEX dasar</span><span>Rp4,00 T</span></div>
                <div className="ki-sub">Nilai awal {formatMiliar(NILAI_KELUAR_REFERENSI)} hanya referensi sensitivitas model lama, <strong>bukan valuasi final skenario tanpa bank</strong>.</div>
              </div>

              <div className="ki-rumus"><b>Prinsip skenario utama:</b><br/>CAPEX proyek = kontribusi sponsor + modal investor. Utang bank = Rp0. Saham proporsional dihitung terhadap nilai CAPEX dasar; saham negosiasi dapat digeser untuk menguji valuasi dan pembagian ekonomi.</div>
            </div>

            <div className="ki-panel">
              <div className="ki-hasil">
                <div className="ki-kartu utama"><div><span>PORSI SAHAM ANDA · SIMULASI</span><b>{formatPersen(sahamInvestor)}</b><small>Sisa saham seluruh pemegang saham lain: {formatPersen(sahamLain)}</small></div><div><span>INVESTASI ANDA</span><b>{formatMiliar(investasi)}</b></div></div>
                <div className="ki-kartu"><span>DIVIDEN INDIKATIF · TAHUN 4</span><b>{formatMiliar(dividenT4)}</b><small>Dari laba bersih model Tahun 4 {formatMiliar(LABA_BERSIH_T4)} × porsi laba dibagikan × saham Anda.</small></div>
                <div className="ki-kartu"><span>DIVIDEN INDIKATIF · TAHUN 10</span><b>{formatMiliar(dividenT10)}</b><small>Dari laba bersih model Tahun 10 {formatMiliar(LABA_BERSIH_T10)} × porsi laba dibagikan × saham Anda.</small></div>
                <div className="ki-kartu"><span>NILAI SAHAM ANDA · TAHUN 10</span><b>{formatMiliar(nilaiSahamKeluar)}</b><small>Asumsi nilai perusahaan × porsi saham Anda.</small></div>
                <div className={`ki-kartu ${keuntunganNilaiSaham>=0?'positif':'negatif'}`}><span>POTENSI KENAIKAN NILAI SAHAM</span><b>{formatMiliar(keuntunganNilaiSaham)}</b><small>Nilai saham Tahun 10 dikurangi investasi awal. Belum memasukkan dividen kumulatif, pajak, dan biaya transaksi.</small></div>
              </div>

              <div className="ki-bagi">
                <div className="ki-cincin" style={{'--saham':`${sahamInvestor}%`}}><div className="ki-cincin-isi"><b>{formatPersen(sahamInvestor)}</b><span>SAHAM ANDA</span></div></div>
                <div className="ki-bar">
                  <div className="ki-bar-row"><span>Anda</span><div className="ki-track"><div className="ki-isi" style={{width:`${Math.min(100,sahamInvestor)}%`}}/></div><b>{formatPersen(sahamInvestor)}</b></div>
                  <div className="ki-bar-row"><span>Pemegang lain</span><div className="ki-track"><div className="ki-isi lain" style={{width:`${Math.min(100,sahamLain)}%`}}/></div><b>{formatPersen(sahamLain)}</b></div>
                </div>
              </div>

              <div className="ki-rincian">
                <div><span>MODAL INVESTOR YANG DIBUTUHKAN</span><b>{formatMiliar(kebutuhanInvestor)}</b><small>CAPEX dikurangi kontribusi ekonomi sponsor.</small></div>
                <div><span>KONTRIBUSI EKONOMI SPONSOR</span><b>{formatMiliar(nilaiSponsor)}</b><small>Basis simulasi porsi sponsor.</small></div>
                <div><span>HASIL DIVIDEN TAHUN 10</span><b>{formatPersen(hasilDividenT10)}</b><small>Dividen Tahun 10 ÷ investasi awal.</small></div>
                <div><span>KELIPATAN NILAI SAHAM TAHUN 10</span><b>{formatKali(kelipatanNilaiSaham)}</b><small>Belum termasuk dividen kumulatif.</small></div>
                <div><span>BALIK MODAL KASAR</span><b>{Number.isFinite(balikModalKasar) ? `${balikModalKasar.toLocaleString('id-ID',{maximumFractionDigits:1})} tahun` : '—'}</b><small>Jika dividen setara Tahun 10 berlangsung konstan; bukan proyeksi payback resmi.</small></div>
                <div><span>TAMBAHAN NILAI SPONSOR DI ATAS ASET DASAR</span><b>{formatMiliar(tambahanNilaiSponsor)}</b><small>Perlu justifikasi bila porsi sponsor melebihi basis aset/tanah sekitar Rp50 M.</small></div>
                <div><span>UTANG BANK</span><b>Rp0</b><small>Tidak ada bunga atau cicilan bank.</small></div>
                <div><span>STATUS DSCR BANK</span><b>Tidak berlaku</b><small>Karena skenario utama tidak menggunakan utang bank.</small></div>
              </div>

              {melebihiKolamInvestor ? <div className="ki-peringatan merah"><b>PERIKSA NEGOSIASI.</b> Saham Anda ({formatPersen(sahamInvestor)}) melebihi total kolam saham investor luar ({formatPersen(porsiInvestorGabungan)}) pada porsi sponsor yang dipilih. Kurangi saham Anda atau kurangi porsi sponsor agar struktur total tetap masuk akal.</div> : null}
              <div className="ki-peringatan"><b>PENTING.</b> Ini adalah <strong>simulasi indikatif untuk negosiasi</strong>, bukan penawaran efek, pembagian saham final, atau janji keuntungan. CAPEX belum tersertifikasi. Nilai sponsor selain basis aset/tanah, kebijakan dividen, valuasi Tahun 10, pajak, dilusi, hak istimewa saham, dan transaksi keluar harus disepakati serta didokumentasikan. Model laba Tahun 4 dan Tahun 10 dipakai hanya sebagai basis ilustrasi yang saat ini tersedia.</div>
            </div>
          </div>

          <div className="ki-bank">
            <div className="ki-bank-head"><div><div className="ki-kecil">Pembanding saja</div><h3>Bagaimana jika memakai bank?</h3></div><p>Skenario bank tetap ditampilkan hanya untuk pembanding terhadap struktur utama tanpa utang. Angka berikut berasal dari sensitivitas pendanaan terkontrol dan bukan komitmen pemberi pinjaman.</p></div>
            <div className="ki-bank-grid">{pembandingBank.map((item) => <div className="ki-bank-card" key={item.utang}><span>PORSI UTANG BANK</span><strong>{item.utang}%</strong><dl><div><dt>Nilai utang</dt><dd>{formatMiliar(item.nilaiUtang)}</dd></div><div><dt>Modal sendiri</dt><dd>{formatMiliar(item.modal)}</dd></div><div><dt>DSCR Tahun 4</dt><dd>{formatKali(item.dscr)}</dd></div><div><dt>MOIC model lama</dt><dd>{formatKali(item.moic)}</dd></div></dl></div>)}</div>
          </div>
        </div>
      </section>
    </>
  )
}
