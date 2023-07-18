import "./globals.css";
import Navbar from "@/Component/Navbar/Navbar";
import { config } from "dotenv";
import Head from "./head";
import Footer from "@/Component/Footer/Footer";
import Globalcontext from "@/Context/Globalcontext";
config();
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body>
        <Globalcontext>
          <Navbar />
          {children}
          <Footer />
        </Globalcontext>
      </body>
    </html>
  );
}
