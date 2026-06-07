'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function DetalleAuto() {
  const params = useParams()
  const id = params?.id
  const [auto, setAuto] = useState<any>(null)
  const [similares, setSimilares] = useState<any[]>([])
  const [imgActual, setImgActual] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    const fetchAuto = async () => {
      const { data } = await supabase.from('autos').select('*').eq('id', id).single()
      if (data) {
        const autoData = { ...data, imagenes: data.imagenes ? data.imagenes.split(',') : [] }
        setAuto(autoData)
        const { data: sim } = await supabase.from('autos').select('*').eq('marca', data.marca).neq('id', id).limit(3)
        if (sim) setSimilares(sim.map((a: any) => ({ ...a, imagenes: a.imagenes ? a.imagenes.split(',') : [] })))
      }
    }
    fetchAuto()
  }, [id])

  if (!auto) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Cargando...</p>
    </div>
  )

  const msgWhatsapp = "https://wa.me/56974891078?text=Hola me interesa el " + auto.marca + " " + auto.modelo + " " + auto.año
  const specs = [
    { label: 'Kilometraje', valor: auto.km?.toLocaleString() + ' km' },
    { label: 'Combustible', valor: auto.combustible },
    { label: 'Transmision', valor: auto.transmision },
    { label: 'Color', valor: auto.color },
  ]

  return (
    <section className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/stock" className="text-orange-500 text-xs tracking-widest hover:underline mb-8 inline-block">VOLVER AL STOCK</Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
          <div>
            <div className="relative overflow-hidden h-96 bg-zinc-900 cursor-zoom-in" onClick={() => setLightbox(true)}>
              {auto.imagenes.length > 0 ? (
                <img src={auto.imagenes[imgActual]} alt={auto.marca} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">Sin imagen</div>
              )}
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 tracking-widest">CLICK PARA AMPLIAR</div>
              {auto.imagenes.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); setImgActual((prev) => (prev === 0 ? auto.imagenes.length - 1 : prev - 1)) }} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-orange-500 text-white w-9 h-9 flex items-center justify-center transition-all">‹</button>
                  <button onClick={(e) => { e.stopPropagation(); setImgActual((prev) => (prev === auto.imagenes.length - 1 ? 0 : prev + 1)) }} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-orange-500 text-white w-9 h-9 flex items-center justify-center transition-all">›</button>
                </>
              )}
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {auto.imagenes.map((img: string, i: number) => (
                <button key={i} onClick={() => setImgActual(i)} className={"w-20 h-14 overflow-hidden border-2 transition-all " + (i === imgActual ? "border-orange-500" : "border-zinc-700")}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-orange-500 text-2xl font-black tracking-widest">{auto.año}</span>
            <h1 className="text-5xl font-black tracking-tighter text-white mt-1">{auto.marca} <span className="text-orange-500">{auto.modelo}</span></h1>
            <p className="text-4xl font-black text-orange-500 mt-4"></p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {specs.map((item) => (
                <div key={item.label} className="bg-zinc-900 border border-zinc-800 p-4">
                  <p className="text-gray-500 text-xs tracking-widest uppercase">{item.label}</p>
                  <p className="text-white font-bold mt-1">{item.valor}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-zinc-800 pt-6">
              <p className="text-gray-400 leading-relaxed">{auto.descripcion}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href={msgWhatsapp} target="_blank" rel="noopener noreferrer" className="bg-orange-500 hover:bg-orange-600 text-black font-black text-sm px-8 py-4 tracking-widest transition-all text-center">CONSULTAR POR WHATSAPP</a>
              <Link href="/contacto" className="border border-zinc-700 hover:border-orange-500 text-white font-bold text-sm px-8 py-4 tracking-widest transition-all text-center">FORMULARIO DE CONTACTO</Link>
            </div>
          </div>
        </div>

        {similares.length > 0 && (
          <div className="mt-20 border-t border-zinc-800 pt-12">
            <span className="text-orange-500 text-xs tracking-[0.3em] uppercase">Puede que te interese</span>
            <h2 className="text-3xl font-black tracking-tighter text-white mt-2 mb-8">AUTOS <span className="text-orange-500">SIMILARES</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similares.map((sim) => (
                <Link key={sim.id} href={"/stock/" + sim.id} className="group block bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 transition-all overflow-hidden">
                  <div className="h-44 overflow-hidden">
                    {sim.imagenes.length > 0 ? (
                      <img src={sim.imagenes[0]} alt={sim.marca} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-gray-600 text-sm">Sin imagen</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-black">{sim.marca} <span className="text-orange-500">{sim.modelo}</span></h3>
                    <p className="text-gray-500 text-xs mt-1">{sim.año} • {sim.km?.toLocaleString()} km</p>
                    <p className="text-orange-500 font-black mt-2"></p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 text-white text-3xl hover:text-orange-500 transition-all">✕</button>
          {auto.imagenes.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); setImgActual((prev) => (prev === 0 ? auto.imagenes.length - 1 : prev - 1)) }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-zinc-800 hover:bg-orange-500 text-white w-12 h-12 flex items-center justify-center transition-all text-xl">‹</button>
              <button onClick={(e) => { e.stopPropagation(); setImgActual((prev) => (prev === auto.imagenes.length - 1 ? 0 : prev + 1)) }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-zinc-800 hover:bg-orange-500 text-white w-12 h-12 flex items-center justify-center transition-all text-xl">›</button>
            </>
          )}
          <img src={auto.imagenes[imgActual]} alt={auto.marca} className="max-h-screen max-w-screen-lg object-contain px-16" onClick={(e) => e.stopPropagation()} />
          <div className="absolute bottom-4 text-gray-500 text-xs tracking-widest">{imgActual + 1} / {auto.imagenes.length}</div>
        </div>
      )}

    </section>
  )
}