'use client'
import axios from "axios";
import React, { createContext } from "react"
import { env } from "@/config/env";
const Usercontext=createContext()
const Usercontextprovider=({children})=>{
    return <Usercontext.Provider>{children}</Usercontext.Provider>
}
export default  Usercontextprovider;