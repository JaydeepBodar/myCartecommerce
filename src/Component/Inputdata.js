'use client'
import React from 'react'

const Inputdata = ({className,label,...rest}) => {
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...rest}/>
    </div>
  )
}

export default Inputdata
