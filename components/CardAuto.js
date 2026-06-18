'use client'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CardAuto({ auto }) {
  const [imgActual, setImgActual] = useState(0)
  const [copiado, setCopiado] = useState(false)

  const anterior = (e) => {
    e.preventDefault()
    setImgActual((prev) => (prev === 0 ? auto.imagenes.length - 1 : prev - 1))
  }

  const siguiente = (e) => {
    e.preventDefault()
    setImgActual((prev) => (prev === auto.imagenes.length - 1 ? 0 : prev + 1))
  }

  const compartir = (e) => {
    e.preventDefault()
    const url = window.location.origin + '/stock/' + auto.id
    navigator.clipboard.writeText(url)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  const badgeClass = 'border border-zinc-700 bg-black text-white text-xs font-bold px-2 py-1 tracking-wide'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Link href={"/stock/" + auto.id} className="group block">
        <div className="bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 overflow-hidden">

          <div className="relative overflow-hidden h-52">
            <img
              src={auto.imagenes[imgActual]}
              alt={auto.marca + " " + auto.modelo}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-black/80 border border-orange-500/30 px-2 py-1">
              <span className="text-orange-500 text-xs font-bold tracking-widest">{auto.año}</span>
            </div>
            {auto.vendido ? (
              <div className="absolute top-3 right-3 bg-black/80 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                Vendido
              </div>
            ) : (
              <button onClick={compartir} className="absolute top-3 right-3 bg-black/70 hover:bg-orange-500 text-white px-2 py-1 text-xs font-bold tracking-widest transition-all">
                {copiado ? '✓ COPIADO' : '⬡ COMPARTIR'}
              </button>
            )}
            {auto.imagenes.length > 1 && (
              <>
                <button onClick={anterior} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-orange-500 text-white w-7 h-7 flex items-center justify-center transition-all text-xs">‹</button>
                <button onClick={siguiente} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-orange-500 text-white w-7 h-7 flex items-center justify-center transition-all text-xs">›</button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {auto.imagenes.map((_, i) => (
                    <span key={i} className={"block w-1.5 h-1.5 rounded-full transition-all " + (i === imgActual ? 'bg-orange-500' : 'bg-white/40')}></span>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="p-5">
            <h3 className="text-white font-black text-lg tracking-tight">
              {auto.marca} <span className="text-orange-500">{auto.modelo}</span>
            </h3>
            <div className="flex flex-wrap gap-2 mt-3 mb-4">
              <span className={badgeClass}>{auto.km.toLocaleString()} KM</span>
              <span className={badgeClass}>{auto.combustible.toUpperCase()}</span>
              <span className={badgeClass}>{auto.transmision.toUpperCase()}</span>
            </div>
            <div className="border-t border-zinc-800 pt-4 flex items-center justify-between">
              <p className="text-white font-black text-xl">${auto.precio.toLocaleString('es-CL')}</p>
              <span className="text-orange-500 text-xs font-bold tracking-widest group-hover:translate-x-1 transition-transform">VER MÁS →</span>
            </div>
          </div>

        </div>
      </Link>
    </motion.div>
  )
}