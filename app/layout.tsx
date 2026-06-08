import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsappFlotante from '@/components/WhatsappFlotante'

const geist = Geist({ subsets: ['latin'] })

export const metadata = {
  title: 'VP Motors',
  description: 'Los mejores autos usados de Santiago',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="bg-zinc-950">
      <body className={`${geist.className} bg-zinc-950 text-white`}>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <WhatsappFlotante />
      </body>
    </html>
  )
}