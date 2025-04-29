"use client"
import React from 'react'
import { usePathname } from "next/navigation";
import Header from "./Navbar/Navbar";
import Footer from "./Footer/Footer2";

function ClientLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const pathname=usePathname();

    const excludedpath=["/auth/login","/auth/signup", "/dashboard","/dashboard/edit","/dashboard/upload","/dashboard/edit"]
  
    const allowedPath=!excludedpath.includes(pathname);
  
    return (
          <div className=" bg-transparent  ">
            {
              allowedPath &&  <Header />
            }
              <main>
                {children}
              </main>
            {
              allowedPath && <Footer/>
            }
          </div>
    );
}

export default ClientLayout
