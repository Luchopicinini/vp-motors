'use client'
import { useState } from 'react'
import FadeIn from '@/components/FadeIn'

export default function Contacto() {
  const [enviado, setEnviado] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setForm({ ...form, [e.target.name]: e.target.value }) }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('https://formspree.io/f/xnjybkja', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (res.ok) setEnviado(true)
  }
  const campos = [
    { name: 'nombre', label: 'NOMBRE', type: 'text', placeholder: 'Tu nombre' },
    { name: 'email', label: 'EMAIL', type: 'email', placeholder: 'tu@email.com' },
    { name: 'telefono', label: 'TELEFONO', type: 'tel', placeholder: '+56 9 ...' }
  ]
  const info = [
    { label: 'WHATSAPP', valor: '+56 9 7489 1078' },
    { label: 'EMAIL', valor: 'contacto@vpmotors.cl' },
    { label: 'DIRECCION', valor: 'Av. Camino Los Trapenses 2140 - Oficina 304-1.' }
  ]
  return (
    <section className="min-h-screen pt-28 pb-20 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-12">
            <span className="text-orange-500 text-xs font-medium tracking-[0.3em] uppercase">Estamos para ayudarte</span>
            <h2 className="text-5xl font-black tracking-tighter text-white mt-2">CONT<span className="text-orange-500">ACTO</span></h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <p className="text-gray-400 text-lg leading-relaxed">Tienes dudas sobre algun vehiculo? Quieres agendar una visita? Contactanos y te respondemos a la brevedad.</p>
              <div className="space-y-4">
                {info.map((item) => (<div key={item.label} className="flex gap-4 border-b border-zinc-800 pb-4"><span className="text-orange-500 text-xs tracking-widest font-bold w-24 pt-0.5">{item.label}</span><span className="text-white font-medium">{item.valor}</span></div>))}
              </div>
              <a href="https://wa.me/56974891078" target="_blank" rel="noopener noreferrer" className="inline-block bg-orange-500 hover:bg-orange-600 text-black font-black text-sm px-8 py-4 tracking-widest transition-all">ESCRIBIR POR WHATSAPP</a>
            </div>
            <div>
              {enviado ? (
                <div className="bg-zinc-900 border border-orange-500/30 p-8 text-center">
                  <p className="text-orange-500 text-4xl font-black mb-2">✓</p>
                  <p className="text-white font-bold text-xl">Mensaje enviado</p>
                  <p className="text-gray-400 mt-2">Te contactaremos a la brevedad.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {campos.map((campo) => (<div key={campo.name}><label className="text-orange-500 text-xs tracking-widest font-bold block mb-2">{campo.label}</label><input type={campo.type} name={campo.name} placeholder={campo.placeholder} onChange={handleChange} required className="w-full bg-zinc-900 border border-zinc-700 focus:border-orange-500 text-white px-4 py-3 text-sm outline-none transition-all placeholder:text-zinc-600" /></div>))}
                  <div>
                    <label className="text-orange-500 text-xs tracking-widest font-bold block mb-2">MENSAJE</label>
                    <textarea name="mensaje" placeholder="En que te podemos ayudar?" onChange={handleChange} required rows={4} className="w-full bg-zinc-900 border border-zinc-700 focus:border-orange-500 text-white px-4 py-3 text-sm outline-none transition-all placeholder:text-zinc-600 resize-none" />
                  </div>
                  <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-black font-black text-sm py-4 tracking-widest transition-all">ENVIAR MENSAJE</button>
                </form>
              )}
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="mt-16">
            <div className="flex items-center justify-between mb-4">
              <span className="text-orange-500 text-xs tracking-widest font-bold">COMO LLEGAR</span>
              <a href="https://maps.app.goo.gl/JfxcpUUTp8CfKjjz5" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 text-xs tracking-widest transition-all">ABRIR EN GOOGLE MAPS →</a>
            </div>
            <div className="border border-zinc-800 overflow-hidden">
              <iframe src="https://maps.google.com/maps?q=Av+Camino+Los+Trapenses+2140+Lo+Barnechea+Santiago&output=embed" width="100%" height="400" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="grayscale" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}