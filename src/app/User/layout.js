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
          <div className="flex py-10 justify-between items-stretch">
            <div className="h-[55.4vh]">
              <Sidebar />
            </div>
            <div className="basis-[75%]">{children}</div>
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
