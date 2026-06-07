'use client'

const resenas = [
  { id: 1, inicial: 'S', comentario: 'Encontramos un vehiculo por medio de chileautos y resulto ser que lo tenian en esta automotora. La atencion de Analia en todo momento fue muy buena, muy preocupada y profesional.', fecha: 'Hace 3 meses' },
  { id: 2, inicial: 'F', comentario: 'Los recomiendo al 100%!! Desde el minuto 1 un trato excelente, muy preocupados por el cliente, muy transparentes y excelentes precios. Fue muy buena experiencia.', fecha: 'Hace 9 meses' },
  { id: 3, inicial: 'M', comentario: 'Excelente servicio brindado por Analia e Ignacio. Recomiendo utilizar sus servicios de compra y venta de autos al 100%. 10/10', fecha: 'Hace 3 meses' },
  { id: 4, inicial: 'E', comentario: 'Apreciamos la capacidad de respuesta y pro actividad de Analia, la compra fue una experiencia muy agradable. Nos fuimos con Tag y seguro en menos de 12 horas.', fecha: 'Hace 4 meses' },
  { id: 5, inicial: 'C', comentario: 'Toda muy eficiente, pasos claros y el vehiculo es tal como lo habian publicitado. Nos prestaron toda la ayuda necesaria con el credito. 100% recomendable.', fecha: 'Hace 3 meses' },
  { id: 6, inicial: 'D', comentario: 'Excelente experiencia con la compra de mi auto. Atencion cercana, rapido y eficiente. El lugar es muy comodo para ver el auto y la comunicacion fue siempre impecable.', fecha: 'Hace 5 meses' },
  { id: 7, inicial: 'J', comentario: 'Muchas gracias por la excelente atencion. Analia se preocupo por cada detalle durante la compra; incluso me fui con el tag listo para Valparaiso. Totalmente recomendable!', fecha: 'Hace 8 meses' },
  { id: 8, inicial: 'D', comentario: 'Llegue a la automotora de Analia gracias a las excelentes resenas que habia leido y ahora entiendo perfectamente por que tantas personas la recomiendan. Una atencion impecable.', fecha: 'Hace 10 meses' },
  { id: 9, inicial: 'J', comentario: 'Excelente atencion de Analia desde la primera cita hasta la post venta. Recomiendo 1000% porque se ve pocas veces gente tan dedicada. Referente al vehiculo felices con nuestro BMW 520.', fecha: 'Hace 10 meses' },
  { id: 10, inicial: 'G', comentario: 'Un atencion y experiencia de compra excepcional. La gestion fue eficiente y transparente, haciendo la compra de mi auto facil y agradable. Altamente recomendados por su servicio realmente premium.', fecha: 'Hace un año' },
  { id: 11, inicial: 'S', comentario: 'Excelente servicio! Estoy muy feliz con mi auto y Analia me hizo muy facil todo. Contesto todas mis preguntas, me ayudo con seguro, tag, y asegurar que yo me sintiera comoda. 100% recomendada.', fecha: 'Hace un año' },
  { id: 12, inicial: 'R', comentario: 'Increible atencion, rapida y clara. Responden todas las dudas y cuentan con toda la documentacion necesaria del auto. 100% recomendados.', fecha: 'Hace 7 meses' },
]

export default function Resenas() {
  const total = resenas.length
  const promedio = '5.0'
  return (
    <section className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-orange-500 text-xs font-medium tracking-[0.3em] uppercase">Lo que dicen nuestros clientes</span>
          <h2 className="text-5xl font-black tracking-tighter text-white mt-2">RESEÑAS</h2>
        </div>
        <div className="flex items-center gap-6 mb-10 p-6 bg-zinc-900 border border-zinc-800">
          <div className="text-center">
            <p className="text-6xl font-black text-orange-500">{promedio}</p>
            <div className="flex gap-1 mt-1 justify-center">
              {[1,2,3,4,5].map((s) => (<span key={s} className="text-orange-500 text-lg">★</span>))}
            </div>
            <p className="text-gray-500 text-xs mt-1">+100 reseñas</p>
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-lg">Calificacion general</p>
            <p className="text-gray-400 text-sm mt-1">Basado en opiniones reales de Google.</p>
            <a href="https://www.google.com/search?q=VP+MOTORS+resenas" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-orange-500 text-xs tracking-widest hover:underline">VER EN GOOGLE →</a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resenas.map((r) => (
            <div key={r.id} className="bg-zinc-900 border border-zinc-800 p-5 hover:border-orange-500/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 flex items-center justify-center font-black text-black text-lg">{r.inicial}</div>
                  <p className="text-gray-500 text-xs">{r.fecha}</p>
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (<span key={s} className="text-orange-500 text-sm">★</span>))}
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{r.comentario}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 border-t border-zinc-800 pt-12 text-center">
          <span className="text-orange-500 text-xs font-medium tracking-[0.3em] uppercase">Siguenos en Instagram</span>
          <h3 className="text-3xl font-black tracking-tighter text-white mt-2 mb-6">@<span className="text-orange-500">vpmotors_</span></h3>
          <a href="https://www.instagram.com/vpmotors_" target="_blank" rel="noopener noreferrer" className="inline-block bg-orange-500 hover:bg-orange-600 text-black font-black text-sm px-10 py-4 tracking-widest transition-all">VER INSTAGRAM</a>
        </div>
    </section>
  )
}