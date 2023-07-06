import './globals.css'
import Navbar from '@/Component/Navbar/Navbar'
import { config } from 'dotenv'
import Head from './head'
config()
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head/>
      <body><Navbar/>{children}</body>
    </html>
  )
}
