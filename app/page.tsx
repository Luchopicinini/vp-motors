'use client'
import Link from 'next/link'
import CardAuto from '@/components/CardAuto'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [autos, setAutos] = useState<any[]>([])

  useEffect(() => {
    const fetchAutos = async () => {
      const { data } = await supabase.from('autos').select('*').order('id', { ascending: false }).limit(3)
      if (data) setAutos(data.map((a: any) => ({ ...a, imagenes: a.imagenes ? a.imagenes.split(',') : [] })))
    }
    fetchAutos()
  }, [])

  return (
    <div className="bg-zinc-950">

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-zinc-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-zinc-950 to-zinc-950"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>
        <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-orange-500/50 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-16 md:pt-0">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/5 px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-orange-500 text-xs font-medium tracking-[0.2em] uppercase">Santiago, Chile</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-none">
            TU PRÓXIMO<br />
            <span className="text-orange-500">AUTO</span> TE<br />
            ESPERA
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            En <span className="text-white font-semibold">VP Motors</span> encontrarás los mejores autos usados con garantía, financiamiento y respaldo total.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/stock" className="bg-orange-500 hover:bg-orange-600 text-black font-black text-sm px-10 py-4 tracking-widest transition-all hover:scale-105">VER STOCK</Link>
            <Link href="/contacto" className="border border-orange-500/50 hover:border-orange-500 text-white font-bold text-sm px-10 py-4 tracking-widest transition-all hover:bg-orange-500/5">CONTÁCTANOS</Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto border-t border-orange-500/10 pt-10">
            <div>
              <p className="text-3xl font-black text-orange-500">+100</p>
              <p className="text-gray-500 text-xs tracking-widest uppercase mt-1">Autos vendidos</p>
            </div>
            <div>
              <p className="text-3xl font-black text-orange-500">+130</p>
              <p className="text-gray-500 text-xs tracking-widest uppercase mt-1">Clientes</p>
            </div>
            <div>
              <p className="text-3xl font-black text-orange-500">5★</p>
              <p className="text-gray-500 text-xs tracking-widest uppercase mt-1">Reseñas</p>
            </div>
          </motion.div>

        </div>
        <div className="absolute right-0 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-orange-500/50 to-transparent"></div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-orange-500 text-xs font-medium tracking-[0.3em] uppercase">Recien llegados</span>
              <h2 className="text-4xl font-black tracking-tighter text-white mt-2">AUTOS <span className="text-orange-500">DESTACADOS</span></h2>
            </div>
            <Link href="/stock" className="text-orange-500 text-xs tracking-widest hover:underline hidden sm:block">VER TODOS →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {autos.map((auto) => (<CardAuto key={auto.id} auto={auto} />))}
          </div>
          <div className="text-center mt-10">
            <Link href="/stock" className="border border-orange-500/50 hover:border-orange-500 hover:bg-orange-500/5 text-white font-bold text-sm px-10 py-4 tracking-widest transition-all inline-block">VER STOCK COMPLETO</Link>
          </div>
        </div>
      </section>

    </div>
  )
}