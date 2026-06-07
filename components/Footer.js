import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          <div>
            <span className="text-2xl font-black tracking-tighter text-white">VP<span className="text-orange-500">MOTORS</span></span>
            <p className="text-gray-500 text-sm mt-4 leading-relaxed">Automotora de confianza en Santiago. Compra, venta y consignacion de vehiculos con la mejor atencion.</p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.instagram.com/vpmotors_" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-zinc-700 hover:border-orange-500 hover:text-orange-500 text-gray-400 flex items-center justify-center transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/automotora.vpmotors" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-zinc-700 hover:border-orange-500 hover:text-orange-500 text-gray-400 flex items-center justify-center transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.mercadolibre.cl/pagina/e5kcgvzk#from=share_eshop" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-zinc-700 hover:border-orange-500 hover:text-orange-500 text-gray-400 flex items-center justify-center transition-all text-xs font-black">
                ML
              </a>
              <a href="https://wa.me/56974891078" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-zinc-700 hover:border-orange-500 hover:text-orange-500 text-gray-400 flex items-center justify-center transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <p className="text-orange-500 text-xs tracking-widest font-bold mb-6">NAVEGACION</p>
            <div className="space-y-3">
              <Link href="/" className="block text-gray-400 hover:text-orange-500 text-sm transition-all tracking-wide">INICIO</Link>
              <Link href="/stock" className="block text-gray-400 hover:text-orange-500 text-sm transition-all tracking-wide">STOCK</Link>
              <Link href="/resenas" className="block text-gray-400 hover:text-orange-500 text-sm transition-all tracking-wide">RESEÑAS</Link>
              <Link href="/contacto" className="block text-gray-400 hover:text-orange-500 text-sm transition-all tracking-wide">CONTACTO</Link>
            </div>
          </div>

          <div>
            <p className="text-orange-500 text-xs tracking-widest font-bold mb-6">CONTACTO</p>
            <div className="space-y-3">
              <p className="text-gray-400 text-sm">Av. Camino Los Trapenses 2140</p>
              <p className="text-gray-400 text-sm">Lo Barnechea, Santiago</p>
              <p className="text-gray-400 text-sm">+56 9 7489 1078</p>
              <p className="text-gray-400 text-sm">contacto@vpmotors.cl</p>
              <p className="text-gray-400 text-sm">Lun - Sab: 9:00 - 19:00</p>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs tracking-wide">© 2025 VP MOTORS. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>

      </div>
    </footer>
  )
}