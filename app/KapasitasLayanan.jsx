const layanan = [
  ['Rawat jalan','1.600','1.620','Cadangan +20',99],
  ['IGD','160','184','Cadangan +24',87],
  ['Rawat inap','56,47','56','Hampir seimbang',100],
  ['Kamar operasi','30','48','Cadangan +18',63],
  ['CT','40','32','Optimasi kapasitas',100],
]

export default function KapasitasLayanan(){
  return <section id="operasi" className="klay">
    <style>{`
      .klay{background:#060a0d;color:#fff;padding:30px clamp(14px,3vw,38px);content-visibility:auto;contain-intrinsic-size:520px}.klay-in{max-width:1280px;margin:auto}.klay-head{display:flex;justify-content:space-between;gap:24px;align-items:end;margin-bottom:16px}.klay-head h2{margin:0;font-size:clamp(30px,4.2vw,52px);line-height:.9;letter-spacing:-.06em;text-transform:uppercase}.klay-head h2 em{font-style:normal;color:#f4c842}.klay-head p{margin:0;max-width:480px;color:#8f999f;font-size:10px;line-height:1.45;text-align:right}
      .klay-hero{display:grid;grid-template-columns:1.25fr .75fr;gap:8px}.klay-main{position:relative;overflow:hidden;border-radius:22px;border:1px solid rgba(255,255,255,.1);background:linear-gradient(135deg,#0d151a,#071015);padding:20px}.klay-main:after{content:'';position:absolute;width:280px;height:280px;right:-90px;top:-110px;border-radius:50%;background:radial-gradient(circle,rgba(244,200,66,.23),transparent 70%);pointer-events:none}.klay-kicker{font-size:7px;font-weight:950;letter-spacing:.12em;color:#8f999f;text-transform:uppercase}.klay-big{display:flex;align-items:flex-end;gap:12px;margin-top:9px}.klay-big b{font-size:clamp(58px,8vw,104px);line-height:.75;letter-spacing:-.07em;color:#f4c842}.klay-big span{font-size:12px;font-weight:900;line-height:1.1;margin-bottom:7px}.klay-main p{margin:14px 0 0;max-width:620px;color:#aeb7bb;font-size:10px;line-height:1.5}
      .klay-mini{display:grid;grid-template-columns:1fr 1fr;gap:8px}.klay-mini div{border:1px solid rgba(255,255,255,.1);border-radius:18px;background:#0a1115;padding:15px}.klay-mini b{display:block;font-size:27px;line-height:1;letter-spacing:-.05em;color:#f4c842}.klay-mini span{display:block;margin-top:6px;font-size:7px;font-weight:900;letter-spacing:.05em;color:#9aa4a9;line-height:1.35}
    `}</style>    <style>{`
      .klay-services{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:8px}.klay-service{border:1px solid rgba(255,255,255,.09);border-radius:16px;background:#081015;padding:13px 13px 12px}.klay-service-top{display:flex;justify-content:space-between;gap:8px;align-items:baseline}.klay-service-top b{font-size:12px}.klay-service-top strong{font-size:8px;color:#f4c842}.klay-pair{display:flex;gap:10px;margin-top:8px}.klay-pair span{font-size:7px;color:#7f8a90}.klay-pair b{display:block;margin-top:2px;font-size:13px;color:#fff}.klay-bar{height:4px;background:#182126;border-radius:999px;overflow:hidden;margin-top:10px}.klay-bar i{display:block;height:100%;background:#f4c842;border-radius:999px}.klay-status{display:block;margin-top:7px;font-size:7px;font-weight:900;color:#c7ced1}
      .klay-foot{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-top:8px;padding:9px 12px;border-radius:12px;background:rgba(244,200,66,.06);border-left:2px solid #f4c842}.klay-foot span{font-size:7.5px;line-height:1.4;color:#98a3a8}.klay-foot strong{font-size:8px;color:#f4c842;white-space:nowrap}
      @media(max-width:900px){.klay-hero{grid-template-columns:1fr}.klay-services{grid-template-columns:repeat(3,1fr)}.klay-head{display:block}.klay-head p{text-align:left;margin-top:7px}}
      @media(max-width:620px){.klay{padding:26px 13px}.klay-head h2{font-size:31px}.klay-mini{grid-template-columns:1fr 1fr}.klay-main{padding:16px}.klay-big b{font-size:62px}.klay-services{grid-template-columns:1fr 1fr}.klay-service:last-child{grid-column:1/-1}.klay-foot{display:block}.klay-foot strong{display:block;margin-bottom:4px}}
    `}</style>
    <div className="klay-in">
      <div className="klay-head"><h2>Kapasitas <em>Layanan</em></h2><p>Kapasitas utama dirancang untuk menangani volume tinggi dengan jalur rawat jalan, IGD, rawat inap, bedah, dan diagnostik yang terukur.</p></div>
      <div className="klay-hero">
        <div className="klay-main"><span className="klay-kicker">KAPASITAS PASIEN UTAMA</span><div className="klay-big"><b>66</b><span>POSISI<br/>PASIEN</span></div><p>56 posisi rawat inap + 10 ICU menjadi basis operasi pasien, didukung 6 kamar operasi dan alur praoperasi–PACU.</p></div>
        <div className="klay-mini"><div><b>6</b><span>KAMAR OPERASI</span></div><div><b>8 + 10</b><span>PRAOPERASI + PACU</span></div><div><b>371</b><span>RUANG TEKNIS</span></div><div><b>≥658</b><span>TITIK DATA MINIMUM</span></div></div>
      </div>      <div className="klay-services">
        {layanan.map(([nama,butuh,mampu,status,persen])=><div className="klay-service" key={nama}>
          <div className="klay-service-top"><b>{nama}</b><strong>{status}</strong></div>
          <div className="klay-pair"><span>KEBUTUHAN<b>{butuh}</b></span><span>KAPASITAS<b>{mampu}</b></span></div>
          <div className="klay-bar"><i style={{width:`${persen}%`}}/></div>
          <span className="klay-status">{nama==='CT'?'Fokus peningkatan throughput diagnostik':'Kapasitas operasional terukur'}</span>
        </div>)}
      </div>
      <div className="klay-foot"><strong>FOKUS INVESTOR</strong><span>Rawat jalan, IGD, dan kamar operasi memiliki cadangan kapasitas. Rawat inap berada dekat titik seimbang, sementara CT menjadi fokus optimasi kapasitas diagnostik.</span></div>
    </div>
  </section>
}