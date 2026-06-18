'use client'
import { useState, useEffect } from 'react'
import CardAuto from '@/components/CardAuto'
import { supabase } from '@/lib/supabase'
import FadeIn from '@/components/FadeIn'

export default function Stock() {
  const [lista, setLista] = useState<any[]>([])
  const [marcaFiltro, setMarcaFiltro] = useState('Todas')
  const [precioFiltro, setPrecioFiltro] = useState('Todos')
  const [transmisionFiltro, setTransmisionFiltro] = useState('Todas')

  useEffect(() => {
    const fetchAutos = async () => {
      const { data } = await supabase.from('autos').select('*').order('id', { ascending: false })
      if (data) {
        const autosConImagenes = data.map((a: any) => ({ ...a, imagenes: a.imagenes ? a.imagenes.split(',') : [] }))
        setLista(autosConImagenes)
      }
    }
    fetchAutos()
  }, [])

  const marcas = ['Todas', ...new Set(lista.map((a) => a.marca as string))]
  const transmisiones = ['Todas', ...new Set(lista.map((a) => a.transmision as string))]
  const precios = [
    { label: 'Todos', min: 0, max: Infinity },
    { label: 'Hasta $10M', min: 0, max: 10000000 },
    { label: '$10M - $15M', min: 10000000, max: 15000000 },
    { label: '$15M - $20M', min: 15000000, max: 20000000 },
    { label: 'MÃƒÂ¡s de $20M', min: 20000000, max: Infinity },
  ]
  const autosFiltrados = lista.filter((auto) => {
    const rango = precios.find((p) => p.label === precioFiltro)!
    const cumpleMarca = marcaFiltro === 'Todas' || auto.marca === marcaFiltro
    const cumplePrecio = auto.precio >= rango.min && auto.precio <= rango.max
    const cumpleTransmision = transmisionFiltro === 'Todas' || auto.transmision === transmisionFiltro
    return cumpleMarca && cumplePrecio && cumpleTransmision
  })
  const selectClass = 'bg-zinc-900 border border-zinc-700 hover:border-orange-500/50 text-white text-xs tracking-widest px-4 py-2.5 focus:outline-none focus:border-orange-500 transition-all cursor-pointer'

  return (
    <section className='min-h-screen pt-28 pb-20 px-6 bg-zinc-950'>
      <div className='max-w-7xl mx-auto'>
        <FadeIn>
          <div className='mb-10'>
            <span className='text-orange-500 text-xs font-medium tracking-[0.3em] uppercase'>Disponibles ahora</span>
            <h2 className='text-5xl font-black tracking-tighter text-white mt-2'>NUESTRO <span className='text-orange-500'>STOCK</span></h2>
            <p className='text-gray-500 mt-3'><span className='text-orange-500 font-bold'>{autosFiltrados.length}</span> Vehiculos encontrados</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className='flex flex-wrap gap-3 mb-8 pb-8 border-b border-zinc-800'>
            <select value={marcaFiltro} onChange={(e) => setMarcaFiltro(e.target.value)} className={selectClass}>{marcas.map((m) => <option key={m} value={m}>{m}</option>)}</select>
            <select value={precioFiltro} onChange={(e) => setPrecioFiltro(e.target.value)} className={selectClass}>{precios.map((p) => <option key={p.label} value={p.label}>{p.label}</option>)}</select>
            <select value={transmisionFiltro} onChange={(e) => setTransmisionFiltro(e.target.value)} className={selectClass}>{transmisiones.map((t) => <option key={t} value={t}>{t}</option>)}</select>
            {(marcaFiltro !== 'Todas' || precioFiltro !== 'Todos' || transmisionFiltro !== 'Todas') && (<button onClick={() => { setMarcaFiltro('Todas'); setPrecioFiltro('Todos'); setTransmisionFiltro('Todas') }} className='text-orange-500 border border-orange-500/30 hover:border-orange-500 text-xs tracking-widest px-4 py-2.5 transition-all'>LIMPIAR Ã¢Å“â€¢</button>)}
          </div>
        </FadeIn>
        {autosFiltrados.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {autosFiltrados.map((auto, i) => (
              <FadeIn key={auto.id} delay={i * 0.05}>
                <CardAuto auto={auto} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn>
            <div className='text-center py-20'><p className='text-gray-600 text-lg'>No hay autos con esos filtros.</p></div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}