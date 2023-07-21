'use client'
import React from 'react'

const Inputdata = ({data1,data,className,label,...rest}) => {
  return (
    <div className={className}>
      <label className={data1}>{label}</label>
      <input className={data} {...rest}/>
    </div>
  )
}

export default Inputdata
