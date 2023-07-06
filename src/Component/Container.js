import React from 'react'

const Container = ({children}) => {
  return (
    <div className="max-w-[2500px] mx-auto 2xl:px-24 xl:px-20 md:px-14 sm:px-3 px-2">{children}</div>
  )
}

export default Container;