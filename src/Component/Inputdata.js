'use client'
import React from 'react'

const Inputdata = ({data,className,label,...rest}) => {
  return (
    <div className={className}>
      <label>{label}</label>
      <input className={data} {...rest}/>
    </div>
  )
}

export default Inputdata
