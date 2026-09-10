'use client'

import { useState } from 'react'

const asset = (file) => `/rs.subangraya/visual/${file}`
const visual = [
  ['01-arrival.jpg', 'Area kedatangan'],
  ['08-operating-theatre.jpg', 'Kamar operasi'],
  ['06-patient-room.jpg', 'Kamar pasien'],
]

export default function VisualGaleri() {
  const [aktif, setAktif] = useState(0)
  return (
    <div className="vg-stage">
      <div className="vg-main">
        <img src={asset(visual[aktif][0])} alt={visual[aktif][1]} decoding="async" />
        <div className="vg-label"><b>{visual[aktif][1]}</b><span>{aktif + 1} / {visual.length}</span></div>
      </div>
      <div className="vg-list">
        {visual.map(([img, label], index) => (
          <button key={img} className={aktif === index ? 'aktif' : ''} onClick={() => setAktif(index)} aria-label={`Tampilkan ${label}`}>
            <img src={asset(img)} alt="" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* Gaya galeri sengaja lokal dan ringan: tidak ada animasi berjalan atau 3D. */
