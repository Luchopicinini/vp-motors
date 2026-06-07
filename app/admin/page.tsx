'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, useSortable, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function ImagenSortable({ url, index, onEliminar }: { url: string, index: number, onEliminar: (i: number) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: url })
  const style = { transform: CSS.Transform.toString(transform), transition }
  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <div {...attributes} {...listeners} className="w-24 h-16 overflow-hidden border-2 border-zinc-700 cursor-grab active:cursor-grabbing">
        <img src={url} alt="" className="w-full h-full object-cover" />
      </div>
      <button onClick={() => onEliminar(index)} className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all">x</button>
      <p className="text-zinc-600 text-xs text-center mt-1">{index + 1}</p>
    </div>
  )
}

export default function Admin() {
  const [autos, setAutos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [subiendo, setSubiendo] = useState(false)
  const [fotos, setFotos] = useState<File[]>([])
  const [editando, setEditando] = useState<any>(null)
  const [imagenesEditando, setImagenesEditando] = useState<string[]>([])
  const [form, setForm] = useState({ marca: '', modelo: '', año: '', precio: '', km: '', combustible: 'Bencina', transmision: 'Automatico', color: '', descripcion: '' })
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const sensors = useSensors(useSensor(PointerSensor))

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/admin/login'); return }
      fetchAutos()
    }
    checkAuth()
  }, [])

  const fetchAutos = async () => {
    const { data } = await supabase.from('autos').select('*').order('id', { ascending: false })
    setAutos(data || [])
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFotos(Array.from(e.target.files))
  }

  const handleEditar = (auto: any) => {
    setEditando(auto)
    setImagenesEditando(auto.imagenes ? auto.imagenes.split(',') : [])
    setForm({ marca: auto.marca, modelo: auto.modelo, año: auto.año, precio: auto.precio, km: auto.km, combustible: auto.combustible, transmision: auto.transmision, color: auto.color, descripcion: auto.descripcion })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelar = () => {
    setEditando(null)
    setImagenesEditando([])
    setForm({ marca: '', modelo: '', año: '', precio: '', km: '', combustible: 'Bencina', transmision: 'Automatico', color: '', descripcion: '' })
    setFotos([])
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleEliminarImagen = (i: number) => {
    setImagenesEditando(imagenesEditando.filter((_, idx) => idx !== i))
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = imagenesEditando.indexOf(active.id)
      const newIndex = imagenesEditando.indexOf(over.id)
      setImagenesEditando(arrayMove(imagenesEditando, oldIndex, newIndex))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubiendo(true)
    const urls: string[] = []
    const carpeta = form.marca.toLowerCase() + '-' + form.modelo.toLowerCase().replace(/ /g, '-') + '-' + form.año

    for (const foto of fotos) {
      const nombre = carpeta + '/' + Date.now() + '-' + foto.name.replace(/ /g, '-')
      const { error } = await supabase.storage.from('autos').upload(nombre, foto)
      if (!error) {
        const { data } = supabase.storage.from('autos').getPublicUrl(nombre)
        urls.push(data.publicUrl)
      }
    }

    if (editando) {
      const imagenesFinales = fotos.length > 0 ? [...imagenesEditando, ...urls].join(',') : imagenesEditando.join(',')
      await supabase.from('autos').update({ ...form, año: parseInt(form.año), precio: parseInt(form.precio), km: parseInt(form.km), imagenes: imagenesFinales }).eq('id', editando.id)
    } else {
      await supabase.from('autos').insert([{ ...form, año: parseInt(form.año), precio: parseInt(form.precio), km: parseInt(form.km), imagenes: urls.join(',') }])
    }

    handleCancelar()
    fetchAutos()
    setSubiendo(false)
  }

  const handleEliminar = async (id: number) => {
    if (!confirm('Seguro que quieres eliminar este auto?')) return
    await supabase.from('autos').delete().eq('id', id)
    fetchAutos()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const inputClass = 'w-full bg-zinc-800 border border-zinc-700 focus:border-orange-500 text-white px-4 py-3 text-sm outline-none transition-all'
  const labelClass = 'text-orange-500 text-xs tracking-widest font-bold block mb-2'

  return (
    <section className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-orange-500 text-xs tracking-[0.3em] uppercase">Panel</span>
            <h1 className="text-4xl font-black tracking-tighter text-white mt-1">ADMINISTRACION</h1>
          </div>
          <button onClick={handleLogout} className="border border-zinc-700 hover:border-orange-500 text-gray-400 hover:text-orange-500 text-xs tracking-widest px-4 py-2 transition-all">CERRAR SESION</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-black text-xl">{editando ? 'EDITANDO AUTO' : 'AGREGAR AUTO'}</h2>
              {editando && <button onClick={handleCancelar} className="text-gray-500 hover:text-orange-500 text-xs tracking-widest transition-all">CANCELAR</button>}
            </div>
            {editando && (
              <div className="bg-orange-500/10 border border-orange-500/30 px-4 py-3 mb-4">
                <p className="text-orange-500 text-xs tracking-widest">EDITANDO: {editando.marca} {editando.modelo} {editando.año}</p>
              </div>
            )}

            {editando && imagenesEditando.length > 0 && (
              <div className="mb-4">
                <label className={labelClass}>IMAGENES ACTUALES — ARRASTRA PARA REORDENAR</label>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={imagenesEditando} strategy={horizontalListSortingStrategy}>
                    <div className="flex gap-2 flex-wrap p-3 bg-zinc-800 border border-zinc-700">
                      {imagenesEditando.map((url, i) => (
                        <ImagenSortable key={url} url={url} index={i} onEliminar={handleEliminarImagen} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
                <p className="text-zinc-600 text-xs mt-2">Hover sobre la imagen para eliminarla</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>MARCA</label><input name="marca" value={form.marca} onChange={handleChange} required className={inputClass} /></div>
                <div><label className={labelClass}>MODELO</label><input name="modelo" value={form.modelo} onChange={handleChange} required className={inputClass} /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className={labelClass}>AÑO</label><input name="año" value={form.año} onChange={handleChange} required className={inputClass} /></div>
                <div><label className={labelClass}>PRECIO</label><input name="precio" value={form.precio} onChange={handleChange} required className={inputClass} /></div>
                <div><label className={labelClass}>KM</label><input name="km" value={form.km} onChange={handleChange} required className={inputClass} /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>COMBUSTIBLE</label>
                  <select name="combustible" value={form.combustible} onChange={handleChange} className={inputClass}>
                    <option>Bencina</option><option>Diesel</option><option>Electrico</option><option>Hibrido</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>TRANSMISION</label>
                  <select name="transmision" value={form.transmision} onChange={handleChange} className={inputClass}>
                    <option>Automatico</option><option>Manual</option><option>CVT</option>
                  </select>
                </div>
                <div><label className={labelClass}>COLOR</label><input name="color" value={form.color} onChange={handleChange} required className={inputClass} /></div>
              </div>
              <div><label className={labelClass}>DESCRIPCION</label><textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows={3} required className={inputClass + ' resize-none'} /></div>
              <div>
                <label className={labelClass}>FOTOS {editando ? '(se agregan a las actuales)' : ''}</label>
                <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleFotos} className="w-full bg-zinc-800 border border-zinc-700 text-gray-400 text-sm px-4 py-3 file:mr-4 file:bg-orange-500 file:border-0 file:text-black file:font-bold file:px-4 file:py-1 file:text-xs cursor-pointer" />
                {fotos.length > 0 && <p className="text-orange-500 text-xs mt-2">{fotos.length} foto(s) nueva(s)</p>}
              </div>
              <button type="submit" disabled={subiendo} className="w-full bg-orange-500 hover:bg-orange-600 text-black font-black text-sm py-4 tracking-widest transition-all disabled:opacity-50">
                {subiendo ? 'GUARDANDO...' : editando ? 'GUARDAR CAMBIOS' : 'AGREGAR AUTO'}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-white font-black text-xl mb-6">STOCK ACTUAL ({autos.length})</h2>
            {loading ? (
              <p className="text-gray-500">Cargando...</p>
            ) : (
              <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2">
                {autos.map((auto) => (
                  <div key={auto.id} className="bg-zinc-900 border border-zinc-800 p-4 flex items-center gap-4">
                    <div className="w-16 h-12 overflow-hidden flex-shrink-0">
                      {auto.imagenes ? (
                        <img src={auto.imagenes.split(',')[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600 text-xs">-</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold truncate">{auto.marca} {auto.modelo}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{auto.año} • {auto.km?.toLocaleString()} km • </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => handleEditar(auto)} className="text-orange-500 hover:text-orange-400 text-xs tracking-widest border border-orange-500/30 hover:border-orange-500 px-3 py-1.5 transition-all">EDITAR</button>
                      <button onClick={() => handleEliminar(auto.id)} className="text-red-400 hover:text-red-300 text-xs tracking-widest border border-red-400/30 hover:border-red-400 px-3 py-1.5 transition-all">ELIMINAR</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}