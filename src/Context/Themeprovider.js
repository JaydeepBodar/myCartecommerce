'use client'
import React, { createContext,useState,useContext } from 'react'
const themeContext=createContext()
const Themeprovider = ({children}) => {
  const [theme, settheme] = useState(true);
  return (
    <themeContext.Provider value={{theme,settheme}}>
      {children}
    </themeContext.Provider>
  )
}
export default Themeprovider
export const Globalthemeprovider=()=>{
    return useContext(themeContext);
}
