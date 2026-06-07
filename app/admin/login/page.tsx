'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError('Email o contrasena incorrectos'); setLoading(false) }
    else { router.push('/admin') }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-zinc-950 to-zinc-950"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-orange-500/30 to-transparent"></div>
      <div className="absolute right-0 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-orange-500/30 to-transparent"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <span className="text-4xl font-black tracking-tighter text-white">VP<span className="text-orange-500">MOTORS</span></span>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-px w-12 bg-orange-500/30"></div>
            <p className="text-gray-500 text-xs tracking-[0.3em] uppercase">Panel Administrativo</p>
            <div className="h-px w-12 bg-orange-500/30"></div>
          </div>
        </div>

        <div className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-8">
          <div className="border-l-2 border-orange-500 pl-4 mb-8">
            <p className="text-white font-black tracking-tight">Acceso Restringido</p>
            <p className="text-gray-500 text-xs mt-1">Solo personal autorizado</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-orange-500 text-xs tracking-[0.2em] font-bold block mb-2">EMAIL</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@vpmotors.cl" className="w-full bg-zinc-800/50 border border-zinc-700 focus:border-orange-500 text-white px-4 py-3 text-sm outline-none transition-all placeholder:text-zinc-600" />
            </div>
            <div>
              <label className="text-orange-500 text-xs tracking-[0.2em] font-bold block mb-2">CONTRASEÑA</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full bg-zinc-800/50 border border-zinc-700 focus:border-orange-500 text-white px-4 py-3 text-sm outline-none transition-all placeholder:text-zinc-600" />
            </div>
            {error && (
              <div className="border border-red-500/30 bg-red-500/5 px-4 py-3">
                <p className="text-red-400 text-xs tracking-wide">{error}</p>
              </div>
            )}
            <button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-black font-black text-sm py-4 tracking-widest transition-all disabled:opacity-50 mt-2">
              {loading ? 'VERIFICANDO...' : 'INGRESAR AL PANEL'}
            </button>
          </form>
        </div>

        <p className="text-center text-zinc-700 text-xs mt-6 tracking-widest">VP MOTORS © 2025</p>
      </div>
    </div>
  )
}