'use client'

import { useState } from 'react'

const asset = (file) => `/rs.subangraya/visual/${file}`

const capex = [
  { label: 'RENDAH', value: 'Rp699,9 M', pct: 70 },
  { label: 'DASAR', value: 'Rp861,1 M', pct: 86 },
  { label: 'TINGGI', value: 'Rp1.003,9 M', pct: 100 },
]

const pertumbuhan = [
  { tahun: 'TAHUN 1', kunjungan: '900 / hari', pendapatan: 'Rp585,0 M', ebitda: '-Rp29,3 M', kas: '-Rp41,0 M', catatan: 'Masa pertumbuhan awal', progres: 34 },
  { tahun: 'TAHUN 4', kunjungan: '2.000 / hari', pendapatan: 'Rp1,30 T', ebitda: 'Rp162,5 M', kas: 'Rp120,0 M', catatan: 'Target operasi dasar', progres: 75 },
  { tahun: 'TAHUN 10', kunjungan: '2.680 / hari', pendapatan: 'Rp1,74 T', ebitda: 'Rp243,9 M', kas: 'Rp166,7 M', catatan: 'Tahap operasi matang', progres: 100 },
]

const kapasitas = [
  { nama: 'RAWAT JALAN', kebutuhan: '1.600', kapasitas: '1.620', selisih: '+20', status: 'KETAT', warna: 'waspada', lebar: 99 },
  { nama: 'IGD', kebutuhan: '160', kapasitas: '184', selisih: '+24', status: 'MASIH LONGGAR', warna: 'aman', lebar: 87 },
  { nama: 'RAWAT INAP', kebutuhan: '56,47', kapasitas: '56', selisih: '-0,47', status: 'BATAS', warna: 'risiko', lebar: 100 },
  { nama: 'KAMAR OPERASI', kebutuhan: '30', kapasitas: '48', selisih: '+18', status: 'MASIH LONGGAR', warna: 'aman', lebar: 63 },
  { nama: 'CT', kebutuhan: '40', kapasitas: '32', selisih: '-8', status: 'KENDALA KAPASITAS', warna: 'risiko', lebar: 100 },
]

const kesiapan = [
  ['T01', 'Survei batas, topografi, utilitas, akses, dan drainase', 'EKSTERNAL'],
  ['T02', 'Paket investigasi geoteknik', '0 / 19'],
  ['T03', 'Rilis final struktur dan fondasi', 'TERBUKA'],
  ['T04', 'Persetujuan penetrasi struktur', '0 / 80'],
  ['T05', 'Keputusan proteksi kebakaran dan keselamatan jiwa', '0 / 1.362'],
  ['T06', 'Studi lalu lintas lift dan paket pemasok', '0 / 9'],
  ['T07', 'Paket pemasok peralatan medis', '0 / 43'],
  ['T08', 'Bukti pelindung radiasi atau pernyataan tidak berlaku', 'TERBUKA'],
  ['T09', 'Persetujuan program klinis dan kebutuhan ruang', '0 / 371'],
  ['T10', 'BOQ terukur dan rekonsiliasi QS/Keuangan', 'TERBUKA'],
  ['T11', 'Bukti izin dan persetujuan otoritas', 'TERBUKA'],
]

const visual = [
  ['01-arrival.jpg', 'Area Kedatangan', 'EKSTERIOR'],
  ['03-main-lobby.jpg', 'Lobi Utama', 'AREA PUBLIK'],
  ['04-polyclinic.jpg', 'Poliklinik', 'RAWAT JALAN'],
  ['05-nurse-station.jpg', 'Pos Perawat', 'RAWAT INAP'],
  ['06-patient-room.jpg', 'Kamar Pasien', 'PASIEN'],
  ['07-icu-hcu.jpg', 'ICU + HCU', 'PERAWATAN KRITIS'],
  ['08-operating-theatre.jpg', 'Kamar Operasi', 'BEDAH'],
  ['09-imaging.jpg', 'Pencitraan Medis', 'DIAGNOSTIK'],
  ['10-pharmacy.jpg', 'Farmasi', 'FARMASI'],
  ['11-executive-lounge.jpg', 'Ruang Eksekutif', 'EKSEKUTIF'],
  ['12-public-lounge.jpg', 'Ruang Publik', 'FASILITAS UMUM'],
]

const tahapan = [
  ['01', 'Kontrol internal', 'Model, asumsi, pendanaan, dan pemeriksaan internal lengkap.'],
  ['02', 'Penutupan bukti', 'Survei, geoteknik, klinis, pemasok, struktur, dan izin.'],
  ['03', 'Sertifikasi biaya', 'BOQ terukur, harga terverifikasi, dan rekonsiliasi T10.'],
  ['04', 'Rilis investasi', 'Struktur modal final dikunci setelah tahap wajib tertutup.'],
]

export default function Home() {
  const [pilihanVisual, setPilihanVisual] = useState(0)
  const [tigaDimensi, setTigaDimensi] = useState(false)

  const buka3D = () => {
    setTigaDimensi(true)
    window.dispatchEvent(new CustomEvent('hospital-enable-3d', { detail: true }))
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('hospital-mode', { detail: 'overview' }))
      document.getElementById('tiga-dimensi')?.scrollIntoView({ behavior: 'smooth' })
    }, 120)
  }

  return (
    <>
      <style>{`
        :root{--gelap:#060a0d;--gelap2:#0b1217;--terang:#f2eee5;--kuning:#f4c842;--abu:#8f9aa0;--garis:rgba(255,255,255,.13);--hijau:#79dfb4;--merah:#ff806a}
        *{box-sizing:border-box}html{scroll-behavior:smooth;background:var(--gelap)}body{margin:0;background:var(--gelap)!important;color:#fff!important;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}button,a{font:inherit}a{color:inherit;text-decoration:none}button{cursor:pointer}.halaman{position:relative;z-index:2;overflow:hidden}
        .nav{position:fixed;z-index:80;left:14px;right:14px;top:14px;display:flex;justify-content:space-between;gap:10px}.merek,.menu{background:rgba(6,10,13,.84);backdrop-filter:blur(18px);border:1px solid var(--garis);border-radius:999px}.merek{display:flex;align-items:center;gap:9px;padding:6px 13px 6px 6px;font-size:9px;font-weight:950;letter-spacing:.11em}.merek b{width:27px;height:27px;border-radius:50%;display:grid;place-items:center;background:var(--kuning);color:var(--gelap);font-size:17px}.menu{display:flex;gap:2px;padding:4px;overflow:auto}.menu a{padding:9px 11px;border-radius:999px;font-size:7px;font-weight:950;letter-spacing:.1em;color:rgba(255,255,255,.65);white-space:nowrap}.menu a:hover{background:rgba(255,255,255,.08);color:#fff}
        .hero{min-height:100svh;position:relative;display:flex;align-items:flex-end;background:#05090c}.hero-bg{position:absolute;inset:0;background-image:url('${asset('01-arrival.jpg')}');background-size:cover;background-position:center}.hero-bg:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,7,10,.96),rgba(3,7,10,.76) 42%,rgba(3,7,10,.18) 76%),linear-gradient(0deg,var(--gelap),transparent 40%)}.grid{position:absolute;inset:0;background:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:70px 70px;mask-image:linear-gradient(to right,#000,transparent 72%)}.hero-inner{position:relative;width:100%;max-width:1420px;margin:auto;padding:128px clamp(18px,4vw,64px) clamp(34px,5vw,72px)}.penanda{display:flex;align-items:center;gap:10px;color:var(--kuning);font-size:8px;font-weight:950;letter-spacing:.18em;text-transform:uppercase}.penanda:before{content:'';width:28px;height:2px;background:currentColor}.hero h1{font-size:clamp(58px,10.5vw,150px);line-height:.78;letter-spacing:-.075em;text-transform:uppercase;margin:18px 0 28px;max-width:1060px}.hero h1 em{font-style:normal;color:transparent;-webkit-text-stroke:1.4px rgba(255,255,255,.72)}.hero-bawah{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(380px,.92fr);gap:34px;align-items:end}.hero-copy{font-size:clamp(17px,2vw,27px);line-height:1.18;letter-spacing:-.025em;margin:0;max-width:760px;color:rgba(255,255,255,.84)}.angka-utama{display:grid;grid-template-columns:repeat(2,1fr);border-top:1px solid var(--garis);border-left:1px solid var(--garis);background:rgba(6,10,13,.34);backdrop-filter:blur(12px)}.angka-utama div{padding:14px;border-right:1px solid var(--garis);border-bottom:1px solid var(--garis);min-height:84px}.angka-utama b{display:block;font-size:26px;letter-spacing:-.05em}.angka-utama span{display:block;margin-top:7px;font-size:7px;font-weight:900;letter-spacing:.1em;line-height:1.35;color:var(--abu)}.catatan{margin-top:17px;max-width:930px;border-left:3px solid var(--kuning);padding:7px 0 7px 14px;font-size:8px;line-height:1.5;color:rgba(255,255,255,.68)}.catatan b{color:var(--kuning);letter-spacing:.08em;margin-right:8px}
        .bagian{padding:clamp(74px,9vw,132px) clamp(18px,4vw,64px);position:relative}.dalam{max-width:1420px;margin:auto}.terang{background:var(--terang);color:var(--gelap)}.gelap{background:var(--gelap);color:#fff}.lembut{background:var(--gelap2);color:#fff}.judul-kecil{font-size:8px;font-weight:950;letter-spacing:.17em;text-transform:uppercase;opacity:.55;margin-bottom:14px}.bagian h2{font-size:clamp(44px,7vw,94px);line-height:.86;letter-spacing:-.065em;text-transform:uppercase;margin:0 0 24px;max-width:1100px}.bagian h2 em{font-style:normal;color:var(--kuning)}.pengantar{font-size:clamp(17px,2vw,25px);line-height:1.23;letter-spacing:-.025em;max-width:880px;margin:0;opacity:.7}.kaki{font-size:8px;line-height:1.55;opacity:.52;margin-top:18px;max-width:960px}
        .tesis-layout{display:grid;grid-template-columns:.74fr 1.26fr;gap:46px;align-items:start}.tesis-kartu{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:42px}.kartu{border:1px solid rgba(7,11,14,.17);border-radius:22px;padding:22px;min-height:245px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}.kartu:after{content:'';position:absolute;width:90px;height:90px;border:1px solid rgba(7,11,14,.1);border-radius:50%;right:-28px;bottom:-30px}.kartu span{font-size:8px;font-weight:950;letter-spacing:.13em}.kartu b{display:block;font-size:clamp(28px,3vw,43px);line-height:.92;letter-spacing:-.055em;text-transform:uppercase}.kartu p{font-size:11px;line-height:1.55;opacity:.6;margin:15px 0 0}.ilustrasi-rs{min-height:420px;border:1px solid rgba(7,11,14,.16);border-radius:30px;padding:24px;position:relative;overflow:hidden;background:linear-gradient(145deg,#faf7f0,#eae4d8)}.ilustrasi-rs:before{content:'';position:absolute;inset:0;background:linear-gradient(rgba(7,11,14,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(7,11,14,.04) 1px,transparent 1px);background-size:38px 38px}.inti-rs{position:relative;width:min(280px,70%);height:265px;margin:54px auto 0;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;align-items:end}.menara{border:2px solid var(--gelap);border-radius:14px 14px 5px 5px;background:rgba(244,200,66,.12);display:grid;grid-template-columns:repeat(2,1fr);gap:5px;padding:10px;height:72%}.menara.t2{height:100%;background:var(--gelap)}.menara.t3{height:84%}.menara i{display:block;border-radius:2px;background:var(--gelap);opacity:.75}.menara.t2 i{background:var(--kuning);opacity:.8}.tanda-rs{position:absolute;left:50%;top:17%;transform:translate(-50%,-50%);width:50px;height:50px;border-radius:50%;background:var(--kuning);color:var(--gelap);display:grid;place-items:center;font-size:30px;font-weight:950;box-shadow:0 12px 35px rgba(244,200,66,.35)}.label-rs{position:absolute;inset:20px}.label-rs span{position:absolute;border:1px solid rgba(7,11,14,.18);background:rgba(255,255,255,.7);backdrop-filter:blur(8px);border-radius:999px;padding:8px 10px;font-size:7px;font-weight:950;letter-spacing:.1em}.label-rs span:nth-child(1){left:0;top:18px}.label-rs span:nth-child(2){right:0;top:70px}.label-rs span:nth-child(3){left:3px;bottom:22px}.label-rs span:nth-child(4){right:8px;bottom:8px}.garis-dasar{position:absolute;left:8%;right:8%;bottom:24px;height:2px;background:var(--gelap)}
        .operasi-layout{display:grid;grid-template-columns:.82fr 1.18fr;gap:44px;align-items:start}.metrik{display:grid;grid-template-columns:repeat(2,1fr);gap:7px;margin-top:30px}.metrik div{border:1px solid var(--garis);border-radius:18px;padding:18px;min-height:130px;display:flex;flex-direction:column;justify-content:space-between;background:rgba(255,255,255,.025)}.metrik b{font-size:clamp(29px,3.8vw,50px);letter-spacing:-.06em;color:var(--kuning)}.metrik span{font-size:8px;font-weight:900;letter-spacing:.09em;line-height:1.45;color:var(--abu)}.kapasitas{border-top:1px solid var(--garis)}.baris-kapasitas{padding:14px 0;border-bottom:1px solid var(--garis)}.atas-kapasitas{display:grid;grid-template-columns:116px 1fr 75px 120px;gap:12px;align-items:center}.atas-kapasitas b{font-size:9px}.atas-kapasitas span{font-size:9px;color:var(--abu)}.atas-kapasitas strong{font-size:12px;text-align:right}.atas-kapasitas i{font-style:normal;font-size:7px;font-weight:950;letter-spacing:.06em;text-align:right}.garis-kapasitas{height:4px;background:rgba(255,255,255,.08);border-radius:999px;margin-top:10px;overflow:hidden}.garis-kapasitas span{display:block;height:100%;border-radius:999px;background:var(--kuning)}.baris-kapasitas.aman .garis-kapasitas span{background:var(--hijau)}.baris-kapasitas.risiko .garis-kapasitas span{background:var(--merah)}.aman{color:var(--hijau)}.waspada{color:var(--kuning)}.risiko{color:var(--merah)}.alur{margin-top:34px;border:1px solid var(--garis);border-radius:24px;padding:18px;background:rgba(255,255,255,.02)}.alur-head{display:flex;justify-content:space-between;gap:12px;margin-bottom:16px}.alur-head b{font-size:8px;letter-spacing:.12em}.alur-head span{font-size:8px;color:var(--abu)}.alur-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}.titik{min-height:86px;border:1px solid var(--garis);border-radius:16px;padding:12px;position:relative;display:flex;flex-direction:column;justify-content:space-between}.titik:not(:last-child):after{content:'→';position:absolute;right:-10px;top:50%;transform:translateY(-50%);z-index:2;width:18px;height:18px;border-radius:50%;background:var(--kuning);color:var(--gelap);display:grid;place-items:center;font-size:10px;font-weight:950}.titik b{font-size:9px}.titik span{font-size:7px;color:var(--abu);line-height:1.35}
        .ekonomi-layout{display:grid;grid-template-columns:.72fr 1.28fr;gap:44px;align-items:start;margin-top:38px}.ring-wrap{display:grid;grid-template-columns:170px 1fr;gap:20px;align-items:center;margin-bottom:24px}.ring{width:170px;height:170px;border-radius:50%;background:conic-gradient(var(--kuning) 0 59%,#d7d0c3 59% 79%,#c7bfae 79% 88%,#b3aa98 88% 100%);display:grid;place-items:center;position:relative}.ring:after{content:'';width:112px;height:112px;border-radius:50%;background:var(--terang);position:absolute}.ring-isi{position:relative;z-index:2;text-align:center}.ring-isi b{display:block;font-size:24px;letter-spacing:-.06em}.ring-isi span{font-size:7px;font-weight:950;letter-spacing:.1em;opacity:.55}.legenda{display:grid;gap:8px}.legenda div{display:grid;grid-template-columns:10px 1fr auto;gap:8px;align-items:center;padding-bottom:8px;border-bottom:1px solid rgba(7,11,14,.1)}.legenda i{width:8px;height:8px;border-radius:50%;background:var(--kuning)}.legenda div:nth-child(2) i{background:#d7d0c3}.legenda div:nth-child(3) i{background:#c7bfae}.legenda div:nth-child(4) i{background:#b3aa98}.legenda span{font-size:8px;opacity:.58}.legenda b{font-size:9px}.capex-bars{display:flex;flex-direction:column;gap:14px}.bar{display:grid;grid-template-columns:60px 1fr 112px;gap:11px;align-items:center}.bar span{font-size:8px;font-weight:950;letter-spacing:.12em}.track{height:13px;border-radius:999px;background:rgba(7,11,14,.09);overflow:hidden}.isi-bar{height:100%;border-radius:999px;background:var(--gelap)}.bar b{text-align:right;font-size:13px}.kartu-ekonomi{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.kartu-ekonomi div{border:1px solid rgba(7,11,14,.16);border-radius:18px;padding:18px;min-height:126px;position:relative;overflow:hidden}.kartu-ekonomi div:before{content:'';position:absolute;left:0;top:0;width:4px;height:100%;background:var(--kuning);opacity:.75}.kartu-ekonomi span{font-size:7px;font-weight:950;letter-spacing:.08em;opacity:.5}.kartu-ekonomi b{display:block;margin-top:12px;font-size:clamp(25px,2.6vw,38px);letter-spacing:-.055em}.kartu-ekonomi small{display:block;margin-top:7px;font-size:8px;line-height:1.4;opacity:.5}.pertumbuhan{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:42px}.tahun{border:1px solid rgba(7,11,14,.16);border-radius:20px;padding:19px}.tahun-head{display:flex;justify-content:space-between;gap:10px;font-size:8px;font-weight:950;letter-spacing:.08em}.tahun-head em{font-style:normal;opacity:.42}.tahun h3{font-size:34px;letter-spacing:-.055em;margin:20px 0 14px}.tahun dl{margin:0;display:grid;gap:9px}.tahun dl div{display:flex;justify-content:space-between;gap:12px;padding-top:8px;border-top:1px solid rgba(7,11,14,.12)}.tahun dt{font-size:7px;font-weight:900;letter-spacing:.08em;opacity:.48}.tahun dd{font-size:9px;font-weight:900;margin:0;text-align:right}.progres{height:6px;background:rgba(7,11,14,.08);border-radius:999px;margin-top:17px;overflow:hidden}.progres i{display:block;height:100%;background:var(--gelap);border-radius:999px}
        .pendanaan-layout{display:grid;grid-template-columns:.82fr 1.18fr;gap:42px;align-items:start}.pilihan{display:flex;gap:6px;flex-wrap:wrap;margin-top:28px}.pilihan button,.pilihan a{min-width:64px;border:1px solid var(--garis);background:transparent;color:#fff;border-radius:999px;padding:10px 13px;font-size:8px;font-weight:950;text-decoration:none;display:inline-flex;align-items:center;justify-content:center}.pilihan button.aktif,.pilihan a.aktif{background:var(--kuning);color:var(--gelap);border-color:var(--kuning)}.komposisi{margin-top:30px;display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center}.kolam{min-height:132px;border:1px solid var(--garis);border-radius:22px;padding:17px;background:rgba(255,255,255,.025);position:relative;overflow:hidden}.kolam:after{content:'';position:absolute;left:0;right:0;bottom:0;height:var(--isi);background:rgba(244,200,66,.11);border-top:1px solid rgba(244,200,66,.35)}.kolam b,.kolam span{position:relative;z-index:2}.kolam b{display:block;font-size:25px}.kolam span{display:block;margin-top:8px;font-size:7px;font-weight:950;color:var(--abu)}.plus{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:var(--kuning);color:var(--gelap);font-weight:950}.skenario{border:1px solid var(--garis);border-radius:28px;padding:25px;background:linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.012));box-shadow:0 24px 80px rgba(0,0,0,.22)}.skenario-head{display:flex;justify-content:space-between;gap:18px}.skenario-head span{font-size:8px;font-weight:950;color:var(--abu)}.skenario-head b{font-size:76px;line-height:.8}.skenario-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:7px;margin-top:28px}.skenario-grid div{border:1px solid var(--garis);border-radius:16px;padding:15px;min-height:98px}.skenario-grid span{font-size:7px;font-weight:900;color:var(--abu)}.skenario-grid b{display:block;font-size:25px;margin-top:10px}.sinyal{margin-top:16px;border-left:3px solid var(--kuning);padding:8px 0 8px 13px;font-size:10px;line-height:1.55;color:rgba(255,255,255,.68)}.sinyal strong{color:#fff}.mini{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-top:14px}.mini div{padding:10px;border:1px solid var(--garis);border-radius:13px}.mini b{font-size:12px}.mini span{display:block;margin-top:4px;font-size:6px;color:var(--abu)}
        .kesiapan-layout{display:grid;grid-template-columns:.72fr 1.28fr;gap:44px;align-items:start}.status{display:grid;gap:8px;position:sticky;top:90px}.status div{border:1px solid rgba(7,11,14,.17);border-radius:24px;padding:23px;background:rgba(255,255,255,.42)}.status .lulus{background:var(--gelap);color:#fff}.status strong{display:block;font-size:clamp(52px,7vw,92px);line-height:.82;letter-spacing:-.07em}.status .lulus strong{color:var(--hijau)}.status span{display:block;margin-top:14px;font-size:8px;font-weight:950;letter-spacing:.1em}.status p{font-size:10px;line-height:1.5;opacity:.58;margin:13px 0 0}.daftar{border-top:1px solid rgba(7,11,14,.18)}.item{display:grid;grid-template-columns:48px 1fr auto;gap:14px;align-items:center;padding:13px 0;border-bottom:1px solid rgba(7,11,14,.18)}.item b{font-size:9px}.item span{font-size:10px}.item strong{font-size:8px;color:#9b5b19}.tahapan{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:28px}.tahap{border:1px solid rgba(7,11,14,.16);border-radius:17px;padding:15px;min-height:152px;position:relative}.tahap:not(:last-child):after{content:'→';position:absolute;right:-11px;top:18px;width:20px;height:20px;border-radius:50%;background:var(--kuning);display:grid;place-items:center;font-size:10px;font-weight:950;z-index:2}.tahap>b{font-size:10px;color:#9b5b19}.tahap strong{display:block;margin-top:26px;font-size:12px}.tahap span{display:block;margin-top:8px;font-size:8px;line-height:1.45;opacity:.58}
        .visual-stage{margin-top:34px;display:grid;grid-template-columns:minmax(0,1.45fr) minmax(280px,.55fr);background:#0b1217;border:1px solid var(--garis);border-radius:26px;overflow:hidden}.visual-media{position:relative;min-height:540px;background:#05090c}.visual-media img{width:100%;height:100%;object-fit:cover;display:block}.visual-media:after{content:'';position:absolute;inset:54% 0 0;background:linear-gradient(transparent,rgba(5,9,12,.88))}.visual-caption{position:absolute;z-index:2;left:22px;right:22px;bottom:20px;display:flex;justify-content:space-between;align-items:end;gap:20px}.visual-caption h3{font-size:clamp(40px,6vw,78px);line-height:.8;letter-spacing:-.065em;text-transform:uppercase;margin:0}.visual-caption span{font-size:8px;font-weight:950;letter-spacing:.14em;color:var(--kuning)}.visual-list{padding:13px;display:flex;flex-direction:column;gap:4px}.visual-list button{width:100%;border:1px solid var(--garis);background:transparent;color:#fff;border-radius:12px;padding:10px 11px;display:flex;justify-content:space-between;gap:12px;text-align:left}.visual-list button.aktif{background:var(--kuning);color:var(--gelap);border-color:var(--kuning)}.visual-list b{font-size:9px}.visual-list span{font-size:7px;color:var(--abu)}.visual-list button.aktif span{color:rgba(7,11,14,.55)}
        .penutup{min-height:90svh;display:flex;align-items:center;background:var(--kuning);color:var(--gelap);overflow:hidden}.penutup:after{content:'+';position:absolute;right:-5vw;bottom:-14vw;font-size:45vw;line-height:1;font-weight:1000;color:rgba(7,11,14,.05)}.penutup-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:42px;align-items:end;width:100%;position:relative;z-index:2}.penutup h2{font-size:clamp(54px,9vw,126px);max-width:920px}.penutup h2 em{color:transparent;-webkit-text-stroke:1.5px var(--gelap)}.penutup-copy{font-size:15px;line-height:1.5;max-width:540px}.aksi{display:flex;gap:7px;margin-top:25px;flex-wrap:wrap}.aksi button,.aksi a{min-height:47px;border-radius:999px;border:1px solid var(--gelap);padding:0 18px;display:inline-flex;align-items:center;justify-content:center;font-size:8px;font-weight:950;background:transparent;color:var(--gelap)}.aksi .utama{background:var(--gelap);color:#fff}.tiga-dimensi{position:relative;z-index:1;min-height:100svh;background:linear-gradient(180deg,rgba(7,11,14,.04),rgba(7,11,14,.72));display:flex;align-items:end;padding:30px}.tiga-dimensi-card{max-width:540px;background:rgba(242,238,229,.95);color:var(--gelap);padding:22px;border-radius:22px}.tiga-dimensi-card span{font-size:8px;font-weight:950;letter-spacing:.13em}.tiga-dimensi-card h3{font-size:38px;line-height:.9;letter-spacing:-.055em;text-transform:uppercase;margin:8px 0 12px}.tiga-dimensi-card p{font-size:10px;line-height:1.5;opacity:.6;margin:0}
        @media(max-width:1080px){.tesis-layout,.pendanaan-layout,.kesiapan-layout{grid-template-columns:1fr}.status{position:relative;top:auto;grid-template-columns:1fr 1fr}.visual-stage{grid-template-columns:1fr}.visual-media{min-height:460px}.visual-list{display:grid;grid-template-columns:repeat(3,1fr)}}
        @media(max-width:760px){.nav{left:8px;right:8px;top:8px}.menu{display:none}.hero-inner{padding-left:14px;padding-right:14px}.hero h1{font-size:clamp(54px,20vw,86px)}.hero-bawah,.operasi-layout,.ekonomi-layout,.penutup-grid{grid-template-columns:1fr}.bagian{padding-left:14px;padding-right:14px}.tesis-kartu,.pertumbuhan{grid-template-columns:1fr}.kartu{min-height:195px}.metrik{grid-template-columns:repeat(2,1fr)}.atas-kapasitas{grid-template-columns:90px 1fr 55px}.atas-kapasitas i{display:none}.alur-grid{grid-template-columns:1fr}.titik:not(:last-child):after{content:'↓';right:50%;top:auto;bottom:-13px;transform:translateX(50%)}.ring-wrap{grid-template-columns:1fr}.ring{margin:auto}.kartu-ekonomi{grid-template-columns:repeat(2,1fr)}.skenario-head b{font-size:62px}.mini{grid-template-columns:repeat(5,minmax(82px,1fr));overflow-x:auto}.status{grid-template-columns:1fr}.tahapan{grid-template-columns:1fr}.tahap:not(:last-child):after{content:'↓';right:auto;left:18px;top:auto;bottom:-12px}.visual-stage{border-radius:18px}.visual-media{min-height:320px}.visual-list{grid-template-columns:repeat(2,1fr)}.visual-caption h3{font-size:39px}.tiga-dimensi{padding:14px}}
        @media(max-width:470px){.angka-utama{grid-template-columns:1fr 1fr}.angka-utama b{font-size:21px}.kartu-ekonomi{grid-template-columns:1fr}.metrik{grid-template-columns:1fr 1fr}.skenario-grid{grid-template-columns:1fr 1fr}.ilustrasi-rs{min-height:340px}.inti-rs{height:220px;margin-top:66px}.visual-list{grid-template-columns:1fr 1fr}}
      `}</style>

      <div className="halaman">
        <nav className="nav">
          <a className="merek" href="#atas"><b>+</b><span>RS SUBANG RAYA</span></a>
          <div className="menu"><a href="#tesis">TESIS</a><a href="#operasi">OPERASI</a><a href="#ekonomi">EKONOMI</a><a href="#pendanaan">PENDANAAN</a><a href="#kalkulator-investasi">INVESTASI</a><a href="#kesiapan">KESIAPAN</a><a href="#visual">VISUAL</a></div>
        </nav>

        <header id="atas" className="hero">
          <div className="hero-bg"/><div className="grid"/>
          <div className="hero-inner">
            <div className="penanda">Presentasi Investor · RS Subang Raya</div>
            <h1>Sistem layanan kesehatan<br/><em>yang dibangun untuk tumbuh.</em></h1>
            <div className="hero-bawah">
              <p className="hero-copy">Kasus investasi dibangun dari kapasitas klinis yang terukur, pertumbuhan operasi bertahap, disiplin modal, serta tahap verifikasi yang menjaga keputusan final tetap sesuai bukti yang tersedia.</p>
              <div className="angka-utama">
                <div><b>371</b><span>BASIS RUANG TEKNIS</span></div>
                <div><b>66</b><span>POSISI PASIEN · 56 RAWAT INAP + 10 ICU</span></div>
                <div><b>&gt;2.000</b><span>TARGET KUNJUNGAN PASIEN / HARI</span></div>
                <div><b>Rp861,1 M</b><span>CAPEX DASAR · TARGET 0% UTANG BANK</span></div>
              </div>
            </div>
            <div className="catatan"><b>CATATAN KONTROL</b> Angka keuangan pada presentasi ini merupakan hasil perencanaan anggaran indikatif dan ilustratif, bukan CAPEX tersertifikasi, harga tender, atau pembagian saham final. Arah utama pembiayaan adalah tanpa utang bank; struktur saham tetap simulasi sampai disepakati. Tahap bukti eksternal T01–T11 masih terbuka.</div>
          </div>
        </header>

        <section id="tesis" className="bagian terang">
          <div className="dalam tesis-layout">
            <div>
              <div className="judul-kecil">01 · Tesis investasi</div>
              <h2>Bukan sekadar gedung.<br/>Ini <em>sistem operasi layanan.</em></h2>
              <p className="pengantar">Nilai investasi dibangun dari volume layanan, kemampuan klinis, disiplin biaya, dan tahapan pengurangan risiko yang jelas sebelum modal diperlakukan sebagai komitmen final.</p>
              <div className="tesis-kartu">
                <article className="kartu"><span>01 / VOLUME LAYANAN</span><div><b>2.000 kunjungan / hari</b><p>Target perencanaan Tahun 4, dengan 1.600 kunjungan rawat jalan per hari sebagai penggerak volume utama.</p></div></article>
                <article className="kartu"><span>02 / KEMAMPUAN KLINIS</span><div><b>6 kamar operasi + perawatan kritis</b><p>Enam kamar operasi, delapan posisi praoperasi, sepuluh posisi pemulihan pasca-anestesi, dan sepuluh posisi ICU sementara.</p></div></article>
                <article className="kartu"><span>03 / KONTROL MODAL</span><div><b>Rilis berbasis bukti</b><p>Pemeriksaan internal telah lengkap; sertifikasi biaya, DED/IFC, izin, dan struktur modal final tetap menunggu verifikasi bukti.</p></div></article>
              </div>
            </div>
            <div className="ilustrasi-rs" aria-label="Ilustrasi sistem layanan rumah sakit">
              <div className="label-rs"><span>RAWAT JALAN</span><span>BEDAH</span><span>DIAGNOSTIK</span><span>RAWAT INAP + ICU</span></div>
              <div className="inti-rs"><div className="menara">{Array.from({length:8}).map((_,i)=><i key={i}/>)}</div><div className="menara t2">{Array.from({length:10}).map((_,i)=><i key={i}/>)}</div><div className="menara t3">{Array.from({length:8}).map((_,i)=><i key={i}/>)}</div><div className="tanda-rs">+</div></div><div className="garis-dasar"/>
            </div>
          </div>
        </section>

        <section id="operasi" className="bagian gelap">
          <div className="dalam operasi-layout">
            <div>
              <div className="judul-kecil">02 · Mesin operasi</div>
              <h2>Tumbuh dengan<br/><em>kendala terlihat.</em></h2>
              <p className="pengantar">Model tidak menyembunyikan titik kapasitas yang ketat. Titik tersebut justru menjadi penentu keputusan klinis dan belanja modal berikutnya.</p>
              <div className="metrik">
                <div><b>56 + 10</b><span>RAWAT INAP + ICU = 66 POSISI PASIEN</span></div>
                <div><b>6 / 8 / 10</b><span>KAMAR OPERASI / PRAOPERASI / PEMULIHAN</span></div>
                <div><b>2×1.600</b><span>kVA KONSEP TRANSFORMATOR</span></div>
                <div><b>≥658</b><span>MINIMUM TITIK DATA</span></div>
              </div>
            </div>
            <div>
              <div className="kapasitas">{kapasitas.map((item) => <div className={`baris-kapasitas ${item.warna}`} key={item.nama}><div className="atas-kapasitas"><b>{item.nama}</b><span>{item.kebutuhan} kebutuhan / {item.kapasitas} kapasitas model</span><strong className={item.warna}>{item.selisih}</strong><i className={item.warna}>{item.status}</i></div><div className="garis-kapasitas"><span style={{width:`${item.lebar}%`}}/></div></div>)}</div>
              <p className="kaki">Uji tekanan perencanaan menunjukkan rawat inap berada pada batas model dan CT memiliki kekurangan kapasitas. Keduanya perlu divalidasi sebelum rilis investasi final.</p>
              <div className="alur"><div className="alur-head"><b>ILUSTRASI ALUR NILAI KLINIS</b><span>dari kedatangan hingga layanan lanjutan</span></div><div className="alur-grid">
                <div className="titik"><b>KEDATANGAN</b><span>akses, area turun, registrasi</span></div>
                <div className="titik"><b>RAWAT JALAN</b><span>volume utama dan klinik</span></div>
                <div className="titik"><b>DIAGNOSTIK</b><span>laboratorium, pencitraan, CT</span></div>
                <div className="titik"><b>TINDAKAN</b><span>operasi, perawatan kritis, terapi</span></div>
                <div className="titik"><b>PEMULIHAN</b><span>pemulihan, rawat inap, tindak lanjut</span></div>
              </div></div>
            </div>
          </div>
        </section>

        <section id="ekonomi" className="bagian terang">
          <div className="dalam">
            <div className="judul-kecil">03 · Ekonomi proyek</div>
            <h2>Uji skenario penurunan.<br/>Nilai <em>pertumbuhannya.</em></h2>
            <p className="pengantar">Model memisahkan anggaran indikatif dari biaya tersertifikasi, lalu menunjukkan pertumbuhan operasi sebelum membahas imbal hasil investor.</p>
            <div className="ekonomi-layout">
              <div>
                <div className="ring-wrap"><div className="ring"><div className="ring-isi"><b>Rp861,1 M</b><span>CAPEX DASAR</span></div></div><div className="legenda">
                  <div><i/><span>Perkiraan konstruksi fisik</span><b>Rp475,1 M</b></div>
                  <div><i/><span>Peralatan medis tahap awal</span><b>Rp95,0 M</b></div>
                  <div><i/><span>Modal kerja</span><b>Rp76,8 M</b></div>
                  <div><i/><span>Komponen lain dalam model</span><b>sisa CAPEX</b></div>
                </div></div>
                <div className="capex-bars">{capex.map((item) => <div className="bar" key={item.label}><span>{item.label}</span><div className="track"><div className="isi-bar" style={{width:`${item.pct}%`}}/></div><b>{item.value}</b></div>)}</div>
                <p className="kaki">Total CAPEX masih berupa anggaran indikatif. CAPEX tersertifikasi menunggu T10: pengukuran kuantitas rinci, harga terverifikasi, penawaran harga, dan rekonsiliasi QS/Keuangan.</p>
              </div>
              <div className="kartu-ekonomi">
                <div><span>KEBUTUHAN KAS DASAR · DI LUAR TANAH</span><b>Rp811,1 M</b><small>Nilai terkendali dari model perencanaan; tidak dipakai sebagai pembagi saham.</small></div>
                <div><span>PERKIRAAN KONSTRUKSI FISIK</span><b>Rp475,1 M</b><small>Angka pembanding untuk perencanaan.</small></div>
                <div><span>PERALATAN MEDIS TAHAP AWAL</span><b>Rp95,0 M</b><small>Anggaran indikatif; T07–T09 masih terbuka.</small></div>
                <div><span>MODAL KERJA</span><b>Rp76,8 M</b><small>Cadangan anggaran untuk kebutuhan awal operasi.</small></div>
                <div><span>NILAI EKUITAS KELUAR · TAHUN 10</span><b>Rp2,439 T</b><small>Output model terkendali pada skenario 0% utang; tetap bergantung pada kelipatan nilai keluar yang tercatat.</small></div>
                <div><span>UTANG BANK · SKENARIO UTAMA</span><b>Rp0</b><small>DSCR bank tidak berlaku pada struktur utama tanpa pinjaman bank.</small></div>
              </div>
            </div>
            <div className="pertumbuhan">{pertumbuhan.map((item) => <article className="tahun" key={item.tahun}><div className="tahun-head"><span>{item.tahun}</span><em>{item.catatan}</em></div><h3>{item.kunjungan}</h3><dl><div><dt>PENDAPATAN</dt><dd>{item.pendapatan}</dd></div><div><dt>EBITDA</dt><dd>{item.ebitda}</dd></div><div><dt>ARUS KAS TERSEDIA</dt><dd>{item.kas}</dd></div></dl><div className="progres"><i style={{width:`${item.progres}%`}}/></div></article>)}</div>
          </div>
        </section>

        <section id="pendanaan" className="bagian lembut">
          <div className="dalam pendanaan-layout">
            <div>
              <div className="judul-kecil">04 · Struktur pendanaan utama</div>
              <h2>Tanpa utang bank.<br/><em>Modal investor.</em></h2>
              <p className="pengantar">Skenario utama presentasi menggunakan 0% utang bank dan 100% modal investor. Untuk presentasi per orang, porsi dihitung langsung dari nilai investasi orang tersebut terhadap total CAPEX dasar Rp861.088.067.662.</p>
              <div className="pilihan"><a className="aktif" href="#kalkulator-investasi">BUKA KALKULATOR TANPA BANK ↓</a></div>
              <div className="komposisi"><div className="kolam" style={{'--isi':'0%'}}><b>Rp0</b><span>UTANG BANK</span></div><div className="plus">+</div><div className="kolam" style={{'--isi':'100%'}}><b>Rp861,1 M</b><span>EKUITAS / MODAL PEMEGANG SAHAM</span></div></div>
              <div className="mini"><div><b>Rp861,1 M</b><span>TOTAL MODAL PROYEK · BASIS CAPEX</span></div><div><b>Rp110,7 M</b><span>ARUS KAS TAHUN 4 · SKENARIO 0% BANK</span></div><div><b>Rp0</b><span>BUNGA BANK</span></div><div><b>Rp0</b><span>CICILAN BANK</span></div><div><b>2,83x</b><span>MOIC EKUITAS MODEL TAHUN 10</span></div></div>
            </div>
            <div className="skenario">
              <div className="skenario-head"><div><span>SKENARIO UTAMA · TANPA BANK</span></div><b>0%</b></div>
              <div className="skenario-grid"><div><span>NILAI UTANG BANK</span><b>Rp0</b></div><div><span>TOTAL EKUITAS / MODAL INVESTOR</span><b>Rp861,1 M</b></div><div><span>ARUS KAS TAHUN 4 · TANPA BANK</span><b>Rp110,7 M</b></div><div><span>NILAI EKUITAS KELUAR · TAHUN 10</span><b>Rp2,439 T</b></div></div>
              <div className="sinyal"><strong>Arah pembiayaan utama:</strong> 0% utang bank. Kalkulator hanya meminta satu angka: nilai investasi orang yang sedang melihat presentasi. Porsi modal dan nilai ekuitas dihitung otomatis dari angka model terkendali.</div>
            </div>
          </div>
        </section>

        <section id="kesiapan" className="bagian terang">
          <div className="dalam kesiapan-layout">
            <div className="status"><div className="lulus"><strong>LULUS</strong><span>PEMERIKSAAN MODEL INTERNAL LENGKAP</span><p>Model internal terkontrol, asumsi, sensitivitas pendanaan, dan pemeriksaan mutu telah lengkap.</p></div><div><strong>0 / 11</strong><span>TAHAP EKSTERNAL TERTUTUP</span><p>Rilis final masih bergantung pada bukti dari pihak eksternal yang bertanggung jawab. Pemisahan ini menunjukkan kondisi proyek secara transparan.</p></div></div>
            <div>
              <div className="judul-kecil">05 · Kesiapan & pengurangan risiko</div>
              <h2>Ketidakpastian tidak disembunyikan.<br/>Ia <em>diurutkan.</em></h2>
              <div className="daftar">{kesiapan.map(([id,nama,status]) => <div className="item" key={id}><b>{id}</b><span>{nama}</span><strong>{status}</strong></div>)}</div>
              <div className="tahapan">{tahapan.map(([id,judul,teks]) => <div className="tahap" key={id}><b>{id}</b><strong>{judul}</strong><span>{teks}</span></div>)}</div>
              <p className="kaki">Aturan rilis: tidak ada klaim DED/IFC final, harga tender, CAPEX tersertifikasi, atau persentase saham final sampai bukti eksternal yang diwajibkan benar-benar tertutup.</p>
            </div>
          </div>
        </section>

        <section id="visual" className="bagian gelap">
          <div className="dalam">
            <div className="judul-kecil">06 · Pengalaman konsep</div>
            <h2>Lihat lingkungan<br/><em>pelayanannya.</em></h2>
            <p className="pengantar">Visual yang sudah tersedia digunakan untuk memperjelas pengalaman pasien, keluarga, dan tim klinis. Visual tetap bersifat konsep dan bukan gambar konstruksi final.</p>
            <div className="visual-stage"><div className="visual-media"><img src={asset(visual[pilihanVisual][0])} alt={visual[pilihanVisual][1]}/><div className="visual-caption"><div><span>{visual[pilihanVisual][2]} · KONSEP</span><h3>{visual[pilihanVisual][1]}</h3></div><span>{String(pilihanVisual+1).padStart(2,'0')} / {String(visual.length).padStart(2,'0')}</span></div></div><div className="visual-list">{visual.map((item,index) => <button key={item[0]} className={pilihanVisual===index?'aktif':''} onClick={() => setPilihanVisual(index)}><b>{item[1]}</b><span>{String(index+1).padStart(2,'0')}</span></button>)}</div></div>
          </div>
        </section>

        <section className="bagian penutup">
          <div className="dalam penutup-grid">
            <div><div className="judul-kecil">07 · Pembahasan investor</div><h2>Modal masuk.<br/><em>Kontrol tetap.</em></h2></div>
            <div className="penutup-copy">Langkah berikutnya adalah menyiapkan paket investasi tanpa utang bank yang siap diuji: menutup bukti, memvalidasi kapasitas, mensertifikasi biaya proyek, lalu mengunci dokumen kepemilikan dan hak ekonomi investor.
              <div className="aksi"><button className="utama" onClick={buka3D}>{tigaDimensi?'BUKA 3D LAGI':'BUKA TAMPILAN 3D OPSIONAL'}</button><a href="#atas">ULANGI PRESENTASI ↑</a></div>
              <p className="kaki">RS Subang Raya · Presentasi investor · basis model perencanaan terkontrol ditinjau 10 September 2026.</p>
            </div>
          </div>
        </section>
      </div>

      {tigaDimensi ? <section id="tiga-dimensi" className="tiga-dimensi"><div className="tiga-dimensi-card"><span>3D OPSIONAL · TAMPILAN KONSEP</span><h3>Jelajahi rumah sakit.</h3><p>Lapisan 3D adalah alat komunikasi konsep. Program klinis, kuantitas, biaya, dan desain final tetap dikendalikan oleh tahapan verifikasi bukti serta dokumen proyek yang berlaku.</p></div></section> : null}
    </>
  )
}
