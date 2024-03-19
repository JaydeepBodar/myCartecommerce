"use client"
import React from 'react'
import Commonproduct from '@/Component/Commonproduct'
import { Globalproductcontext } from '@/Context/Productprovider'
const pageData = () => {
  const { product } = Globalproductcontext();
  return (
    <div>
      <h3>Home</h3>
    </div>
  )
}

export default pageData
