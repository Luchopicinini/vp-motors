'use client'
import { useState } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

export default function Financiamiento() {
  const [precio, setPrecio] = useState('')
  const [pie, setPie] = useState('')
  const [plazo, setPlazo] = useState('48')

  const precioNum = parseInt(precio.replace(/\./g, '').replace(/,/g, '')) || 0
  const pieNum = parseInt(pie.replace(/\./g, '').replace(/,/g, '')) || 0
  const monto = precioNum - pieNum
  const tasa = 0.0185
  const plazoNum = parseInt(plazo)
  const cuota = monto > 0 ? Math.round((monto * tasa) / (1 - Math.pow(1 + tasa, -plazoNum))) : 0
  const totalPagar = cuota * plazoNum + pieNum
  const totalIntereses = totalPagar - precioNum
  const formatear = (n: number) => n.toLocaleString('es-CL')

  const handlePrecio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\./g, '').replace(/,/g, '').replace(/\D/g, '')
    setPrecio(raw ? parseInt(raw).toLocaleString('es-CL') : '')
  }

  const handlePie = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\./g, '').replace(/,/g, '').replace(/\D/g, '')
    setPie(raw ? parseInt(raw).toLocaleString('es-CL') : '')
  }

  const porcentajePie = precioNum > 0 ? Math.round((pieNum / precioNum) * 100) : 0
  const pasos = [
    { num: '01', titulo: 'Elige tu auto', desc: 'Navega nuestro stock y encuentra el vehiculo que mas te gusta.' },
    { num: '02', titulo: 'Simula tu cuota', desc: 'Usa la calculadora para estimar tu cuota mensual segun tu pie y plazo.' },
    { num: '03', titulo: 'Contactanos', desc: 'Nuestro equipo te asesora y gestiona el credito con los mejores bancos.' },
    { num: '04', titulo: 'Maneja tu auto', desc: 'Aprobado el credito, coordinamos la entrega rapida con toda la documentacion al dia.' },
  ]

  return (
    <section className="min-h-screen pt-24 pb-20 px-4 md:px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">

        <FadeIn>
          <div className="mb-12">
            <span className="text-orange-500 text-xs font-medium tracking-[0.3em] uppercase">Haz realidad tu compra</span>
            <h1 className="text-5xl font-black tracking-tighter text-white mt-2">FINANCIA<span className="text-orange-500">MIENTO</span></h1>
            <p className="text-gray-500 mt-3 max-w-xl">Calcula tu cuota mensual estimada y consulta con nuestro equipo para conseguir el mejor credito del mercado.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <h2 className="text-white font-black text-xl">CALCULADORA DE CUOTA</h2>
              <div>
                <label className="text-orange-500 text-xs tracking-widest font-bold block mb-2">PRECIO DEL AUTO</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <input type="text" value={precio} onChange={handlePrecio} placeholder="0" className="w-full bg-zinc-900 border border-zinc-700 focus:border-orange-500 text-white pl-8 pr-4 py-3 text-sm outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="text-orange-500 text-xs tracking-widest font-bold block mb-2">PIE — {porcentajePie}% del precio (minimo 20%)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <input type="text" value={pie} onChange={handlePie} placeholder="0" className="w-full bg-zinc-900 border border-zinc-700 focus:border-orange-500 text-white pl-8 pr-4 py-3 text-sm outline-none transition-all" />
                </div>
                <div className="flex gap-2 mt-2">
                  {[20, 30, 40].map((p) => (
                    <button key={p} onClick={() => setPie(precioNum > 0 ? Math.round(precioNum * p / 100).toLocaleString('es-CL') : '')} className="text-xs border border-zinc-700 hover:border-orange-500 hover:text-orange-500 text-gray-500 px-3 py-1 transition-all">{p}%</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-orange-500 text-xs tracking-widest font-bold block mb-2">PLAZO</label>
                <div className="grid grid-cols-3 gap-2 max-w-xs">
                  {['24', '36', '48'].map((p) => (
                    <button key={p} onClick={() => setPlazo(p)} className={"py-3 text-sm font-bold tracking-wide transition-all border " + (plazo === p ? 'bg-orange-500 border-orange-500 text-black' : 'bg-zinc-900 border-zinc-700 hover:border-orange-500 text-gray-400')}>{p} meses</button>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-1">
                <div className="border border-orange-500/20 p-5 space-y-4">
                  <div className="flex items-center justify-between"><span className="text-gray-500 text-xs tracking-widest uppercase">Monto a financiar</span><span className="text-white font-bold">${formatear(monto)}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-500 text-xs tracking-widest uppercase">Plazo</span><span className="text-white font-bold">{plazo} meses</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-500 text-xs tracking-widest uppercase">Tasa referencial</span><span className="text-white font-bold">1,85% mensual</span></div>
                  <div className="border-t border-zinc-700 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-orange-500 text-sm tracking-widest uppercase font-bold">Cuota estimada</span>
                      <span className="text-orange-500 font-black text-3xl">${formatear(cuota)}</span>
                    </div>
                    <p className="text-gray-600 text-xs mt-1 text-right">/mes</p>
                  </div>
                  {cuota > 0 && (
                    <div className="border-t border-zinc-800 pt-3 space-y-1">
                      <div className="flex justify-between"><span className="text-gray-600 text-xs">Total a pagar</span><span className="text-gray-400 text-xs">${formatear(totalPagar)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600 text-xs">Intereses totales</span><span className="text-gray-400 text-xs">${formatear(totalIntereses)}</span></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-orange-500/5 border border-orange-500/20 p-4">
                <p className="text-orange-500 text-xs font-bold mb-1">VALOR ESTIMADO</p>
                <p className="text-zinc-400 text-xs leading-relaxed">Este calculo es solo referencial con una tasa minima del 1,85% mensual y pie minimo del 20%. La cuota real depende del banco, tu perfil crediticio y las condiciones vigentes. Consulta con nuestro equipo para una simulacion oficial.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col gap-6">
              <h2 className="text-white font-black text-xl">COMO FUNCIONA</h2>
              <div className="space-y-4">
                {pasos.map((paso) => (
                  <div key={paso.num} className="flex gap-4 bg-zinc-900 border border-zinc-800 p-4 hover:border-orange-500/30 transition-all">
                    <span className="text-orange-500 font-black text-2xl tracking-tighter w-10 flex-shrink-0">{paso.num}</span>
                    <div>
                      <p className="text-white font-bold text-sm">{paso.titulo}</p>
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed">{paso.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-6">
                <p className="text-white font-black text-lg mb-2">Trabajamos con los <span className="text-orange-500">mejores bancos</span></p>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">Tenemos convenios con las principales instituciones financieras de Chile para conseguirte la mejor tasa posible.</p>
                <div className="flex flex-col gap-3">
                  <a href="https://wa.me/56974891078?text=Hola, quiero consultar sobre financiamiento" target="_blank" rel="noopener noreferrer" className="bg-orange-500 hover:bg-orange-600 text-black font-black text-sm px-6 py-4 tracking-widest transition-all text-center">CONSULTAR POR WHATSAPP</a>
                  <Link href="/contacto" className="border border-zinc-700 hover:border-orange-500 text-white font-bold text-sm px-6 py-4 tracking-widest transition-all text-center">FORMULARIO DE CONTACTO</Link>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>

        <FadeIn delay={0.4}>
          <div className="mt-16">
            <div className="border border-zinc-800 bg-zinc-900/50 rounded-2xl p-12 text-center">
              <h2 className="text-4xl font-black tracking-tighter text-white mb-3">Listo para <span className="text-orange-500">comenzar?</span></h2>
              <p className="text-gray-500 mb-8">Contactanos y descubre la diferencia</p>
              <a href="https://wa.me/56974891078?text=Hola, quiero consultar sobre financiamiento" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border border-white/20 hover:border-orange-500 hover:text-orange-500 text-white font-bold text-sm px-8 py-4 rounded-full tracking-wide transition-all">
                Hablar con un asesor →
              </a>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}