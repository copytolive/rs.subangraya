const kelompok = [
  { nama:'Dokter', total:100, posisi:[['Dokter umum & IGD',28],['Penyakit Dalam',10],['Bedah',10],['Obstetri & Ginekologi',8],['Anak',8],['Anestesi & Intensif',8],['Radiologi',5],['Patologi Klinik/Anatomi',4],['THT-KL',4],['Mata',4],['Saraf',4],['Jantung',4],['Ortopedi',3]] },
  { nama:'Perawat', total:300, posisi:[['Rawat jalan',80],['IGD',36],['Rawat inap',70],['ICU / HCU',40],['Kamar operasi & anestesi',42],['Praoperasi / PACU / bedah sehari',20],['PPI, manajemen kasus & edukasi',12]] },
  { nama:'Penunjang medis', total:100, posisi:[['Farmasi',25],['Laboratorium',22],['Radiologi',18],['Fisioterapi',10],['Gizi',10],['Rekam medis & coding',8],['CSSD',7]] },
  { nama:'Nonklinis & pendukung', total:200, posisi:[['Pendaftaran, front office & pusat layanan',35],['Keuangan, penagihan & kasir',20],['SDM, legal & umum',15],['TI & sistem informasi RS',12],['Teknik, pemeliharaan & utilitas',20],['Kebersihan & sanitasi',35],['Keamanan',24],['Laundry & linen',12],['Pengadaan & gudang',15],['Manajemen, mutu & risiko',12]] },
]

export default function TimOperasional(){
  return <section id="tim-operasional" className="st">
    <style>{`
      .st{background:#0b1115;color:#fff;padding:24px clamp(14px,3vw,38px);content-visibility:auto;contain-intrinsic-size:420px}.st-in{max-width:1280px;margin:auto}.st-top{display:grid;grid-template-columns:auto 1fr;gap:18px;align-items:center;padding-bottom:11px;border-bottom:1px solid rgba(255,255,255,.1)}.st-title{display:flex;align-items:baseline;gap:12px;white-space:nowrap}.st-title h2{margin:0;font-size:clamp(24px,3vw,34px);line-height:.92;letter-spacing:-.05em;text-transform:uppercase}.st-title h2 em{font-style:normal;color:#f4c842}.st-title b{font-size:30px;color:#f4c842;letter-spacing:-.05em}.st-summary{display:flex;justify-content:flex-end;gap:16px;flex-wrap:wrap}.st-summary span{font-size:7px;color:#8f999e;font-weight:900}.st-summary strong{color:#fff;font-size:11px;margin-right:4px}
      .st-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 22px}.st-group{padding:11px 0;border-bottom:1px solid rgba(255,255,255,.08)}.st-group-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}.st-group-head b{font-size:11px;text-transform:uppercase;letter-spacing:.02em}.st-group-head strong{font-size:17px;color:#f4c842}.st-inline{display:flex;flex-wrap:wrap;gap:3px 0}.st-inline span{font-size:7.5px;line-height:1.5;color:#aeb7bb}.st-inline span:not(:last-child):after{content:' · ';color:#59646a;margin-right:4px}.st-inline b{color:#fff;font-size:7.5px;font-variant-numeric:tabular-nums}.st-foot{margin:9px 0 0;color:#758087;font-size:7px;line-height:1.4}
    `}</style>    <style>{`
      @media(max-width:850px){.st-top{grid-template-columns:1fr}.st-summary{justify-content:flex-start}.st-grid{grid-template-columns:1fr}.st-group{padding:9px 0}}
      @media(max-width:520px){.st{padding:20px 13px}.st-title{justify-content:space-between}.st-title h2{font-size:25px}.st-title b{font-size:27px}.st-summary{gap:7px 12px}.st-inline span,.st-inline b{font-size:7px}}
    `}</style>
    <div className="st-in">
      <div className="st-top">
        <div className="st-title"><h2>Tim <em>Operasional</em></h2><b>±700</b></div>
        <div className="st-summary"><span><strong>100</strong> DOKTER</span><span><strong>300</strong> PERAWAT</span><span><strong>100</strong> PENUNJANG MEDIS</span><span><strong>200</strong> NONKLINIS</span><span><strong>24/7</strong> OPERASI</span></div>
      </div>
      <div className="st-grid">
        {kelompok.map((grup)=><div className="st-group" key={grup.nama}>
          <div className="st-group-head"><b>{grup.nama}</b><strong>{grup.total}</strong></div>
          <div className="st-inline">{grup.posisi.map(([nama,jumlah])=><span key={nama}>{nama} <b>{jumlah}</b></span>)}</div>
        </div>)}
      </div>
      <p className="st-foot">Basis rencana tenaga kerja untuk operasi 24/7: 66 posisi pasien, 6 kamar operasi, layanan diagnostik, dan target lebih dari 2.000 kunjungan per hari.</p>
    </div>
  </section>
}
