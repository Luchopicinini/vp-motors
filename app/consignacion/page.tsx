'use client'
import { useState } from 'react'
import FadeIn from '@/components/FadeIn'

export default function Consignacion() {
  const [enviado, setEnviado] = useState(false)
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', marca: '', modelo: '', año: '', km: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setForm({ ...form, [e.target.name]: e.target.value }) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('https://formspree.io/f/xnjybkja', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (res.ok) setEnviado(true)
  }

  const pasos = [
    { num: '01', titulo: 'Evaluacion', desc: 'Llevas tu auto a nuestras instalaciones, lo revisamos y te entregamos una tasacion justa segun el mercado.' },
    { num: '02', titulo: 'Publicacion', desc: 'Tomamos fotos profesionales y publicamos tu auto en nuestra web y redes sociales para llegar a mas compradores.' },
    { num: '03', titulo: 'Gestion completa', desc: 'Nosotros recibimos las consultas, coordinamos las visitas y negociamos con los interesados. Tu no tienes que lidiar con nadie.' },
    { num: '04', titulo: 'Venta y pago', desc: 'Cuando el auto se vende, te transferimos el dinero de forma segura, descontando solo nuestra comision.' },
  ]

  const beneficios = [
    { titulo: 'Sin estafas', desc: 'Nosotros filtramos a los interesados y verificamos cada transaccion.' },
    { titulo: 'Sin perdida de tiempo', desc: 'No tienes que coordinar visitas ni responder mensajes de curiosos.' },
    { titulo: 'Mejor precio de venta', desc: 'Nuestra exposicion y experiencia en negociacion te consiguen un mejor valor.' },
    { titulo: 'Papeles en regla', desc: 'Te ayudamos con toda la documentacion para que la venta sea 100% legal.' },
  ]

  const campos = [
    { name: 'nombre', label: 'NOMBRE', type: 'text', placeholder: 'Tu nombre' },
    { name: 'telefono', label: 'TELEFONO', type: 'tel', placeholder: '+56 9 ...' },
    { name: 'email', label: 'EMAIL', type: 'email', placeholder: 'tu@email.com' },
  ]

  const camposAuto = [
    { name: 'marca', label: 'MARCA', type: 'text', placeholder: 'Ej: Toyota' },
    { name: 'modelo', label: 'MODELO', type: 'text', placeholder: 'Ej: Corolla' },
    { name: 'año', label: 'AÑO', type: 'text', placeholder: 'Ej: 2020' },
    { name: 'km', label: 'KILOMETRAJE', type: 'text', placeholder: 'Ej: 45000' },
  ]

  return (
    <section className="min-h-screen pt-24 pb-20 px-4 md:px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">

        <FadeIn>
          <div className="mb-12">
            <span className="text-orange-500 text-xs font-medium tracking-[0.3em] uppercase">Vende tu auto sin complicaciones</span>
            <h1 className="text-5xl font-black tracking-tighter text-white mt-2">CONSIGNA<span className="text-orange-500">CION</span></h1>
            <p className="text-gray-500 mt-3 max-w-xl">Nosotros nos encargamos de todo el proceso de venta de tu vehiculo. Tu solo esperas la transferencia.</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-orange-500 text-black p-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs tracking-widest font-bold uppercase mb-1">Nuestra comision</p>
              <p className="text-4xl font-black">5% + IVA</p>
            </div>
            <p className="text-sm font-medium max-w-xs">Solo cobramos cuando tu auto se vende. Sin costos ocultos, sin sorpresas.</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h2 className="text-white font-black text-2xl mb-6">COMO FUNCIONA</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {pasos.map((paso) => (
              <div key={paso.num} className="flex gap-4 bg-zinc-900 border border-zinc-800 p-5 hover:border-orange-500/30 transition-all">
                <span className="text-orange-500 font-black text-3xl tracking-tighter w-12 flex-shrink-0">{paso.num}</span>
                <div>
                  <p className="text-white font-bold text-base">{paso.titulo}</p>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <h2 className="text-white font-black text-2xl mb-6">POR QUE CONSIGNAR CON NOSOTROS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {beneficios.map((b) => (
              <div key={b.titulo} className="bg-zinc-900 border border-zinc-800 p-5">
                <p className="text-orange-500 font-black text-sm mb-2">{b.titulo}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-white font-black text-2xl">QUIERO CONSIGNAR MI AUTO</h2>
              <p className="text-gray-500 text-sm leading-relaxed">Completa el formulario con tus datos y los del vehiculo. Nuestro equipo te contactara para coordinar la evaluacion.</p>
              <a href="https://wa.me/56974891078?text=Hola, quiero consignar mi auto" target="_blank" rel="noopener noreferrer" className="inline-block bg-orange-500 hover:bg-orange-600 text-black font-black text-sm px-8 py-4 tracking-widest transition-all">CONSULTAR POR WHATSAPP</a>
            </div>

            <div>
              {enviado ? (
                <div className="bg-zinc-900 border border-orange-500/30 p-8 text-center">
                  <p className="text-orange-500 text-4xl font-black mb-2">✓</p>
                  <p className="text-white font-bold text-xl">Solicitud enviada</p>
                  <p className="text-gray-400 mt-2">Te contactaremos a la brevedad para coordinar la evaluacion.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-orange-500 text-xs tracking-widest font-bold">TUS DATOS</p>
                  {campos.map((campo) => (
                    <div key={campo.name}>
                      <label className="text-orange-500 text-xs tracking-widest font-bold block mb-2">{campo.label}</label>
                      <input type={campo.type} name={campo.name} placeholder={campo.placeholder} onChange={handleChange} required className="w-full bg-zinc-900 border border-zinc-700 focus:border-orange-500 text-white px-4 py-3 text-sm outline-none transition-all placeholder:text-zinc-600" />
                    </div>
                  ))}
                  <p className="text-orange-500 text-xs tracking-widest font-bold pt-2">DATOS DEL AUTO</p>
                  <div className="grid grid-cols-2 gap-4">
                    {camposAuto.map((campo) => (
                      <div key={campo.name}>
                        <label className="text-orange-500 text-xs tracking-widest font-bold block mb-2">{campo.label}</label>
                        <input type={campo.type} name={campo.name} placeholder={campo.placeholder} onChange={handleChange} required className="w-full bg-zinc-900 border border-zinc-700 focus:border-orange-500 text-white px-4 py-3 text-sm outline-none transition-all placeholder:text-zinc-600" />
                      </div>
                    ))}
                  </div>
                  <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-black font-black text-sm py-4 tracking-widest transition-all">ENVIAR SOLICITUD</button>
                </form>
              )}
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}