"use client"
import React from 'react'
import Tostify from '@/Component/Tostify'
import Sidebar from '@/Component/User/Sidebar'
import Container from '@/Component/Container'
const Admindashboard = ({children}) => {
  return (
    <>
      <section>
        <Tostify/>
        <div className="tracking-[1.2px] bg-red-600 text-white font-semibold text-2xl py-5">
          <Container>
            <h3>User Dashboard</h3>
          </Container>
        </div>
        <Container>
          <div className="flex py-10 justify-between items-stretch max-sm:flex-col">
            <div className="h-[55.4vh] max-sm:h-[auto] max-sm:pb-4" title="user info">
              <Sidebar />
            </div>
            <div className="max-sm:basis-[97%] basis-[75%]">{children}</div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Admindashboard
