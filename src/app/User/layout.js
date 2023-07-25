"use client";
import Container from "@/Component/Container";
import React from "react";
// import Accessdenied from "@/Component/Accessdenied";
import Sidebar from "@/Component/User/Sidebar";
import Loader from "@/Component/Loader";
const Dashboard = ({ children }) => {
  return (
    <>
      <section>
        <div className="tracking-[1.2px] bg-red-600 text-white font-semibold text-2xl py-5">
          <Container>
            <h3>User Dashboard</h3>
          </Container>
        </div>
        <Container>
          <div className="flex py-10 h-[71.5vh] justify-between">
            <Sidebar />
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
