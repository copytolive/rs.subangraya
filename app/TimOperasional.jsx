const kelompok = [
  {
    nama: 'Dokter', total: 100, sub: 'Layanan medis & spesialis',
    posisi: [
      ['Dokter umum & IGD', 28], ['Penyakit Dalam', 10], ['Bedah', 10],
      ['Obstetri & Ginekologi', 8], ['Anak', 8], ['Anestesi & Intensif', 8],
      ['Radiologi', 5], ['Patologi Klinik/Anatomi', 4], ['THT-KL', 4],
      ['Mata', 4], ['Saraf', 4], ['Jantung', 4], ['Ortopedi', 3],
    ],
  },
  {
    nama: 'Perawat', total: 300, sub: 'Cakupan layanan 24/7',
    posisi: [
      ['Rawat jalan', 80], ['IGD', 36], ['Rawat inap', 70], ['ICU / HCU', 40],
      ['Kamar operasi & anestesi', 42], ['Praoperasi / PACU / bedah sehari', 20],
      ['PPI, manajemen kasus & edukasi', 12],
    ],
  },
  {
    nama: 'Penunjang medis', total: 100, sub: 'Diagnostik & terapi',
    posisi: [
      ['Farmasi', 25], ['Laboratorium', 22], ['Radiologi', 18], ['Fisioterapi', 10],
      ['Gizi', 10], ['Rekam medis & coding', 8], ['CSSD', 7],
    ],
  },
  {
    nama: 'Nonklinis & pendukung', total: 200, sub: 'Operasi rumah sakit',
    posisi: [
      ['Pendaftaran, front office & pusat layanan', 35], ['Keuangan, penagihan & kasir', 20],
      ['SDM, legal & umum', 15], ['TI & sistem informasi RS', 12],
      ['Teknik, pemeliharaan & utilitas', 20], ['Kebersihan & sanitasi', 35],
      ['Keamanan', 24], ['Laundry & linen', 12], ['Pengadaan & gudang', 15],
      ['Manajemen, mutu & risiko', 12],
    ],
  },
]

export default function TimOperasional() {
  return <section id="tim-operasional" className="st">
    <style>{`
      .st{background:#0b1115;color:#fff;padding:38px clamp(14px,3vw,38px);content-visibility:auto;contain-intrinsic-size:650px}.st-in{max-width:1280px;margin:auto}.st-head{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:end;margin-bottom:14px}.st-head h2{margin:0;font-size:clamp(30px,4vw,48px);line-height:.9;letter-spacing:-.06em;text-transform:uppercase}.st-head h2 em{font-style:normal;color:#f4c842}.st-total{text-align:right}.st-total b{display:block;font-size:clamp(42px,6vw,72px);line-height:.8;letter-spacing:-.06em;color:#f4c842}.st-total span{display:block;margin-top:8px;font-size:7px;font-weight:950;letter-spacing:.09em;color:#8d979c}.st-lead{margin:0 0 14px;max-width:860px;color:#9ca6aa;font-size:9px;line-height:1.5}
      .st-cats{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}.st-cat{border:1px solid rgba(255,255,255,.1);border-radius:16px;background:#071015;overflow:hidden}.st-cat-head{padding:12px 13px;background:#10181d;border-bottom:1px solid rgba(255,255,255,.08);display:flex;justify-content:space-between;gap:12px;align-items:end}.st-cat-head b{font-size:14px;letter-spacing:-.02em}.st-cat-head span{display:block;margin-top:3px;color:#7f8a90;font-size:6.5px}.st-cat-head strong{font-size:26px;color:#f4c842;letter-spacing:-.05em}.st-list{padding:6px 11px 9px}.st-row{display:grid;grid-template-columns:1fr auto;gap:9px;align-items:center;padding:6px 1px;border-bottom:1px solid rgba(255,255,255,.055)}.st-row:last-child{border-bottom:0}.st-row span{font-size:7.5px;line-height:1.3;color:#c3c9cc}.st-row b{font-size:9px;color:#fff;font-variant-numeric:tabular-nums}.st-strip{margin-top:8px;display:grid;grid-template-columns:1.15fr repeat(3,.7fr);gap:7px}.st-strip>div{border-radius:13px;padding:10px 12px;background:#060a0d;border:1px solid rgba(255,255,255,.08)}.st-strip .key{background:#f4c842;color:#060a0d;border-color:#f4c842}.st-strip b{display:block;font-size:17px;letter-spacing:-.04em}.st-strip span{display:block;margin-top:4px;font-size:6.5px;font-weight:900;letter-spacing:.05em;color:#818d92}.st-strip .key span{color:rgba(6,10,13,.56)}
    `}</style>
    <style>{`
      @media(max-width:980px){.st-cats{grid-template-columns:1fr 1fr}.st-strip{grid-template-columns:1fr 1fr}}
      @media(max-width:620px){.st{padding:30px 13px}.st-head{grid-template-columns:1fr auto;gap:10px}.st-head h2{font-size:29px}.st-total b{font-size:42px}.st-cats{grid-template-columns:1fr}.st-strip{grid-template-columns:1fr 1fr}.st-strip .key{grid-column:1/-1}}
    `}</style>
    <div className="st-in">
      <div className="st-head"><h2>Tim <em>Operasional</em></h2><div className="st-total"><b>±700</b><span>SDM / KARYAWAN OPERASIONAL</span></div></div>
      <p className="st-lead">Basis rencana tenaga kerja untuk operasi 24/7: 66 posisi pasien, 6 kamar operasi, layanan diagnostik, dan target lebih dari 2.000 kunjungan per hari.</p>
      <div className="st-cats">
        {kelompok.map((grup) => <article className="st-cat" key={grup.nama}>
          <div className="st-cat-head"><div><b>{grup.nama}</b><span>{grup.sub}</span></div><strong>{grup.total}</strong></div>
          <div className="st-list">{grup.posisi.map(([nama,jumlah]) => <div className="st-row" key={nama}><span>{nama}</span><b>{jumlah}</b></div>)}</div>
        </article>)}
      </div>
      <div className="st-strip"><div className="key"><b>700 orang</b><span>TOTAL RENCANA SDM OPERASIONAL</span></div><div><b>500</b><span>KLINIS + PENUNJANG MEDIS</span></div><div><b>200</b><span>NONKLINIS & PENDUKUNG</span></div><div><b>24/7</b><span>BASIS CAKUPAN OPERASI</span></div></div>
    </div>
  </section>
}
