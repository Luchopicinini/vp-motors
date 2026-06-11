'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import FadeIn from '@/components/FadeIn'

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

  useEffect(() => {
    if (lightbox) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  if (!auto) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Cargando...</p>
    </div>
  )

  const msgWhatsapp = "https://wa.me/56974891078?text=Hola me interesa el " + auto.marca + " " + auto.modelo + " " + auto.año
  const specs = [
    { label: 'Kilometraje', valor: auto.km?.toLocaleString() + ' km' },
    { label: 'Combustible', valor: auto.combustible },
    { label: 'Transmisión', valor: auto.transmision },
    { label: 'Color', valor: auto.color },
  ]

  return (
    <section className="min-h-screen pt-24 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <Link href="/stock" className="text-orange-500 text-xs tracking-widest hover:underline mb-6 inline-block">← VOLVER AL STOCK</Link>
        </FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FadeIn delay={0.1}>
            <div>
              <div className="relative overflow-hidden bg-zinc-900 cursor-zoom-in" style={{aspectRatio:'4/3', maxHeight:'420px'}} onClick={() => setLightbox(true)}>
                {auto.imagenes.length > 0 ? (
                  <img src={auto.imagenes[imgActual]} alt={auto.marca} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">Sin imagen</div>
                )}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 tracking-widest">AMPLIAR</div>
                {auto.imagenes.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); setImgActual((prev) => (prev === 0 ? auto.imagenes.length - 1 : prev - 1)) }} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-orange-500 text-white w-9 h-9 flex items-center justify-center transition-all text-lg">‹</button>
                    <button onClick={(e) => { e.stopPropagation(); setImgActual((prev) => (prev === auto.imagenes.length - 1 ? 0 : prev + 1)) }} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-orange-500 text-white w-9 h-9 flex items-center justify-center transition-all text-lg">›</button>
                  </>
                )}
              </div>
              <div className="grid grid-cols-5 gap-1.5 mt-2">
                {auto.imagenes.slice(0, 10).map((img: string, i: number) => (
                  <button key={i} onClick={() => setImgActual(i)} className={"overflow-hidden border-2 transition-all " + (i === imgActual ? "border-orange-500" : "border-zinc-700")} style={{aspectRatio:'1'}}>
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
              {auto.imagenes.length > 10 && <p className="text-gray-600 text-xs mt-2">+{auto.imagenes.length - 10} fotos más</p>}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-orange-500 text-lg font-black tracking-widest">{auto.año}</span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mt-1 leading-none">{auto.marca} <span className="text-orange-500">{auto.modelo}</span></h1>
                <p className="text-3xl font-black text-orange-500 mt-3">${auto.precio?.toLocaleString('es-CL')}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {specs.map((item) => (
                  <div key={item.label} className="bg-zinc-900 border border-zinc-800 p-3">
                    <p className="text-gray-500 text-xs tracking-widest uppercase">{item.label}</p>
                    <p className="text-white font-bold mt-1 text-sm">{item.valor}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-zinc-800 pt-4">
                <p className="text-orange-500 text-xs tracking-widest font-bold mb-2">DESCRIPCIÓN</p>
                <div className="max-h-36 overflow-y-auto pr-1">
                  <p className="text-gray-400 leading-relaxed text-xs">{auto.descripcion}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={msgWhatsapp} target="_blank" rel="noopener noreferrer" className="bg-orange-500 hover:bg-orange-600 text-black font-black text-sm px-6 py-4 tracking-widest transition-all text-center flex-1">CONSULTAR POR WHATSAPP</a>
                <Link href="/contacto" className="border border-zinc-700 hover:border-orange-500 text-white font-bold text-sm px-6 py-4 tracking-widest transition-all text-center flex-1">FORMULARIO DE CONTACTO</Link>
              </div>
            </div>
          </FadeIn>
        </div>

        {similares.length > 0 && (
          <FadeIn delay={0.3}>
            <div className="mt-16 border-t border-zinc-800 pt-10">
              <span className="text-orange-500 text-xs tracking-[0.3em] uppercase">Puede que te interese</span>
              <h2 className="text-3xl font-black tracking-tighter text-white mt-2 mb-6">AUTOS <span className="text-orange-500">SIMILARES</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {similares.map((sim) => (
                  <Link key={sim.id} href={"/stock/" + sim.id} className="group block bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 transition-all overflow-hidden">
                    <div className="overflow-hidden" style={{aspectRatio:'16/9'}}>
                      {sim.imagenes.length > 0 ? (
                        <img src={sim.imagenes[0]} alt={sim.marca} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-gray-600 text-sm">Sin imagen</div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-black">{sim.marca} <span className="text-orange-500">{sim.modelo}</span></h3>
                      <p className="text-gray-500 text-xs mt-1">{sim.año} • {sim.km?.toLocaleString()} km</p>
                      <p className="text-orange-500 font-black mt-2">${sim.precio?.toLocaleString('es-CL')}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col" onClick={() => setLightbox(false)}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
            <span className="text-white font-black text-sm">{auto.marca} {auto.modelo}</span>
            <button onClick={() => setLightbox(false)} className="text-white hover:text-orange-500 text-2xl transition-all">✕</button>
          </div>
          <div className="flex-1 flex items-center justify-center relative" onClick={(e) => e.stopPropagation()}>
            <img src={auto.imagenes[imgActual]} alt={auto.marca} className="max-h-[80vh] max-w-[90vw] object-contain" />
            {auto.imagenes.length > 1 && (
              <>
                <button onClick={() => setImgActual((prev) => (prev === 0 ? auto.imagenes.length - 1 : prev - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 bg-zinc-800 hover:bg-orange-500 text-white w-10 h-10 flex items-center justify-center transition-all text-xl">‹</button>
                <button onClick={() => setImgActual((prev) => (prev === auto.imagenes.length - 1 ? 0 : prev + 1))} className="absolute right-2 top-1/2 -translate-y-1/2 bg-zinc-800 hover:bg-orange-500 text-white w-10 h-10 flex items-center justify-center transition-all text-xl">›</button>
              </>
            )}
          </div>
          <div className="px-4 py-3 border-t border-zinc-800 flex gap-2 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
            {auto.imagenes.map((img: string, i: number) => (
              <button key={i} onClick={() => setImgActual(i)} className={"flex-shrink-0 w-16 h-12 overflow-hidden border-2 transition-all " + (i === imgActual ? "border-orange-500" : "border-zinc-700")}>
                <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
          <p className="text-center text-gray-500 text-xs py-2">{imgActual + 1} / {auto.imagenes.length}</p>
        </div>
      )}

    </section>
  )
}