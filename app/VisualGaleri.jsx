'use client'

import { useState } from 'react'

const asset = (file) => `/rs.subangraya/visual/${file}`
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

export default function VisualGaleri() {
  const [aktif, setAktif] = useState(0)
  const item = visual[aktif]
  return (
    <div className="vg-stage">
      <div className="vg-main">
        <img key={item[0]} src={asset(item[0])} alt={item[1]} decoding="async" />
        <div className="vg-label"><div><span>{item[2]} · KONSEP</span><b>{item[1]}</b></div><strong>{String(aktif + 1).padStart(2,'0')} / {String(visual.length).padStart(2,'0')}</strong></div>
      </div>
      <div className="vg-list">
        {visual.map(([img, label, kategori], index) => (
          <button key={img} className={aktif === index ? 'aktif' : ''} onClick={() => setAktif(index)} aria-label={`Tampilkan ${label}`}>
            <div><small>{kategori}</small><b>{label}</b></div><span>{String(index + 1).padStart(2,'0')}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
