"use client";
import Container from "@/Component/Container";
import React from "react";
// import Accessdenied from "@/Component/Accessdenied";
import Sidebar from "@/Component/User/Sidebar";
import Tostify from "@/Component/Tostify";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
// import Loader from "@/Component/Loader"
const Dashboard = ({ children }) => {
  const { data } = useSession();
  const pathname = usePathname();
  return (
    <>
      <section>
        <Tostify />
        {pathname !== "/User/Admin/Register" && (
          <div className="capitalize tracking-[1.2px] bg-[#197693] text-white font-semibold text-2xl py-5 max-sm:py-2 max-sm:text-lg">
            <Container>
              <h3>
                <span>{data?.user?.role}</span> Dashboard
              </h3>
            </Container>
          </div>
        )}
        <Container>
          <div className="flex py-10 justify-between items-stretch max-sm:flex-col">
            {pathname !== "/User/Admin/Register" && (
              <div
                className="h-[55.4vh] max-sm:h-[auto] max-sm:pb-4"
                title="user info"
              >
                <Sidebar />
              </div>
            )}
            <div
              className={`${
                pathname !== "/User/Admin/Register"
                  ? "max-sm:basis-[97%] basis-[75%]"
                  : "mx-[auto]"
              }`}
            >
              {children}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
{
  /* {session.status === "unauthenticated"  ?  session.status === 'loading' ? <div className="font-semibold text-xl h-[70vh] flex items-center justify-center"><Loader/></div>:(
        <Accessdenied />
      ) : session.status === 'loading' ? <div className="font-semibold text-xl h-[81.8vh] flex items-center justify-center"><Loader/></div> :(
       )}
       {session.status === "unauthenticated" || session.status === "authenticated" && session.status === "loading" && <Accessdenied/>} */
}
