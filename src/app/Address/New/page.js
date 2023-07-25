'use client'
import React from 'react'
import Address from '@/Component/Address'
import { useSession } from 'next-auth/react'
const Addressdata = () => {
  const {data}=useSession()
  console.log("newdaat",data)
  return (
      <Address/>
  )
}

export default Addressdata
