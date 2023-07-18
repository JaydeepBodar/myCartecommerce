import React from 'react'
import Cartprovider from '../Context/Cartcontext'

const Globalcontext = ({children}) => {
  return (
    <Cartprovider>{children}</Cartprovider>
  )
}

export default Globalcontext
