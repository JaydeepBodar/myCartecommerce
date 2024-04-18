import Forgotpassword from '@/Component/User/Forgotpassword'
import React from 'react'

const page = ({params}) => {
  return (
    <>
      <Forgotpassword id={params.id} token={params.token}/>
    </>
  )
}

export default page
