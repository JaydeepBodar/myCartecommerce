"use client";
import "./globals.css";
import Applayout from "@/Component/Applayout";
import { config } from "dotenv";
import Head from "./head";
import Globalcontext from "@/Context/Globalcontext";
import usePreventUrlEdit from "@/Component/usePreventUrlEdit";
config();
export default function RootLayout({ children }) {
  usePreventUrlEdit()
  return (
    <html lang="en">
      <Head />
      <body>
        <Globalcontext>
          <Applayout>{children}</Applayout>
        </Globalcontext>
      </body>
    </html>
  );
}
