"use client";
import Container from "@/Component/Container";
import React from "react";
// import Accessdenied from "@/Component/Accessdenied";
import Sidebar from "@/Component/User/Sidebar";
import Tostify from "@/Component/Tostify";
// import Loader from "@/Component/Loader"
const Dashboard = ({ children }) => {

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
      {/* {session.status === "unauthenticated"  ?  session.status === 'loading' ? <div className="font-semibold text-xl h-[70vh] flex items-center justify-center"><Loader/></div>:(
        <Accessdenied />
      ) : session.status === 'loading' ? <div className="font-semibold text-xl h-[81.8vh] flex items-center justify-center"><Loader/></div> :(
       )}
       {session.status === "unauthenticated" || session.status === "authenticated" && session.status === "loading" && <Accessdenied/>} */}
    </>
  );
};

export default Dashboard;
