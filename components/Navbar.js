'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-orange-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-white">
            VP<span className="text-orange-500">MOTORS</span>
          </span>
        </Link>

        {/* Links escritorio */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium tracking-wide">
            INICIO
          </Link>
          <Link href="/stock" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium tracking-wide">
            STOCK
          </Link>
          <Link href="/financiamiento" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium tracking-wide">
            FINANCIAMIENTO
          </Link>
          <Link href="/resenas" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium tracking-wide">
            RESEÑAS
          </Link>
          <Link href="/contacto" className="bg-orange-500 hover:bg-orange-600 text-black font-bold text-sm px-5 py-2 transition-colors tracking-wide">
            CONTACTO
          </Link>
        </div>

        {/* Botón menú móvil */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-orange-500 transition-all ${menuAbierto ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-orange-500 transition-all ${menuAbierto ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-orange-500 transition-all ${menuAbierto ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className="md:hidden bg-black border-t border-orange-500/20 px-6 py-4 flex flex-col gap-4">
          <Link href="/" className="text-gray-400 hover:text-orange-500 text-sm font-medium tracking-wide" onClick={() => setMenuAbierto(false)}>INICIO</Link>
          <Link href="/stock" className="text-gray-400 hover:text-orange-500 text-sm font-medium tracking-wide" onClick={() => setMenuAbierto(false)}>STOCK</Link>
          <Link href="/resenas" className="text-gray-400 hover:text-orange-500 text-sm font-medium tracking-wide" onClick={() => setMenuAbierto(false)}>RESEÑAS</Link>
          <Link href="/contacto" className="text-orange-500 font-bold text-sm tracking-wide" onClick={() => setMenuAbierto(false)}>CONTACTO</Link>
        </div>
      )}
    </nav>
  )
}