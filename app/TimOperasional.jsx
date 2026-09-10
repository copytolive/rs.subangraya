const kelompok = [
  {nama:'Dokter',total:100,posisi:[['Dokter umum & IGD',28],['Penyakit Dalam',10],['Bedah',10],['Obstetri & Ginekologi',8],['Anak',8],['Anestesi & Intensif',8],['Radiologi',5],['Patologi Klinik/Anatomi',4],['THT-KL',4],['Mata',4],['Saraf',4],['Jantung',4],['Ortopedi',3]]},
  {nama:'Perawat',total:300,posisi:[['Rawat jalan',80],['IGD',36],['Rawat inap',70],['ICU / HCU',40],['Kamar operasi & anestesi',42],['Praoperasi / PACU / bedah sehari',20],['PPI, manajemen kasus & edukasi',12]]},
  {nama:'Penunjang medis',total:100,posisi:[['Farmasi',25],['Laboratorium',22],['Radiologi',18],['Fisioterapi',10],['Gizi',10],['Rekam medis & coding',8],['CSSD',7]]},
  {nama:'Nonklinis & pendukung',total:200,posisi:[['Pendaftaran, front office & pusat layanan',35],['Keuangan, penagihan & kasir',20],['SDM, legal & umum',15],['TI & sistem informasi RS',12],['Teknik, pemeliharaan & utilitas',20],['Kebersihan & sanitasi',35],['Keamanan',24],['Laundry & linen',12],['Pengadaan & gudang',15],['Manajemen, mutu & risiko',12]]},
]

export default function TimOperasional(){
  return <section id="tim-operasional" className="st">
    <style>{`
      .st{background:#0b1115;color:#fff;padding:30px clamp(14px,3vw,38px);content-visibility:auto;contain-intrinsic-size:620px}.st-in{max-width:1280px;margin:auto}.st-head{display:grid;grid-template-columns:1fr auto;gap:20px;align-items:end;margin-bottom:14px}.st-head h2{margin:0;font-size:clamp(30px,4.2vw,52px);line-height:.9;letter-spacing:-.06em;text-transform:uppercase}.st-head h2 em{font-style:normal;color:#f4c842}.st-head p{margin:8px 0 0;max-width:690px;color:#909ba0;font-size:9px;line-height:1.45}.st-total{text-align:right}.st-total b{display:block;font-size:clamp(50px,6vw,78px);line-height:.78;letter-spacing:-.06em;color:#f4c842}.st-total span{display:block;margin-top:7px;font-size:7px;font-weight:900;color:#8f999f;letter-spacing:.08em}
      .st-mix{display:grid;grid-template-columns:100fr 300fr 100fr 200fr;height:48px;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.09);background:#071015}.st-mix div{display:flex;align-items:center;justify-content:center;gap:6px;border-right:1px solid rgba(255,255,255,.08);min-width:0}.st-mix div:last-child{border-right:0}.st-mix div:nth-child(2){background:rgba(244,200,66,.14)}.st-mix b{font-size:16px;color:#fff}.st-mix span{font-size:6.5px;font-weight:900;color:#a6b0b4;white-space:nowrap}.st-mix div:nth-child(2) b{color:#f4c842}
      .st-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:8px}.st-group{border:1px solid rgba(255,255,255,.09);border-radius:18px;background:#081015;padding:13px}.st-group-head{display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding-bottom:8px;margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,.07)}.st-group-head b{font-size:13px;text-transform:uppercase}.st-group-head strong{font-size:27px;color:#f4c842;letter-spacing:-.05em}.st-chips{display:flex;flex-wrap:wrap;gap:5px}.st-chip{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:6px 8px;background:#0d171c;border:1px solid rgba(255,255,255,.055);font-size:7.5px;color:#bfc7ca;line-height:1.15}.st-chip b{font-size:8px;color:#fff;font-variant-numeric:tabular-nums}
    `}</style>    <style>{`
      .st-foot{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center;margin-top:8px;padding:10px 12px;border-radius:12px;background:rgba(244,200,66,.055);border-left:2px solid #f4c842}.st-foot span{font-size:7.5px;line-height:1.45;color:#9ca6aa}.st-foot strong{font-size:8px;color:#f4c842;white-space:nowrap}
      @media(max-width:900px){.st-grid{grid-template-columns:1fr}.st-mix{grid-template-columns:1fr 1fr;height:auto}.st-mix div{padding:10px;border-bottom:1px solid rgba(255,255,255,.08)}.st-mix div:nth-child(2){border-right:0}.st-head{grid-template-columns:1fr}.st-total{text-align:left;display:flex;align-items:baseline;gap:10px}.st-total b{font-size:50px}}
      @media(max-width:620px){.st{padding:26px 13px}.st-head h2{font-size:31px}.st-mix b{font-size:15px}.st-chip{font-size:7px;padding:6px 7px}.st-foot{grid-template-columns:1fr}.st-foot strong{grid-row:1}}
    `}</style>
    <div className="st-in">
      <div className="st-head"><div><h2>Tim <em>Operasional</em></h2><p>Struktur tenaga kerja dirancang untuk menopang operasi 24/7, layanan klinis utama, diagnostik, 6 kamar operasi, dan target lebih dari 2.000 kunjungan per hari.</p></div><div className="st-total"><b>±700</b><span>SDM OPERASIONAL</span></div></div>
      <div className="st-mix"><div><b>100</b><span>DOKTER</span></div><div><b>300</b><span>PERAWAT</span></div><div><b>100</b><span>PENUNJANG MEDIS</span></div><div><b>200</b><span>NONKLINIS</span></div></div>
      <div className="st-grid">
        {kelompok.map((grup)=><article className="st-group" key={grup.nama}>
          <div className="st-group-head"><b>{grup.nama}</b><strong>{grup.total}</strong></div>
          <div className="st-chips">{grup.posisi.map(([nama,jumlah])=><span className="st-chip" key={nama}>{nama}<b>{jumlah}</b></span>)}</div>
        </article>)}
      </div>
      <div className="st-foot"><strong>OPERASI 24/7</strong><span>500 tenaga klinis + penunjang medis dan 200 tenaga nonklinis membentuk basis rencana SDM operasional RS Subang Raya.</span></div>
    </div>
  </section>
}