import type { Metadata } from "next";

import {Montserrat} from 'next/font/google'
import SideBar from "../components/Nav/SideBar";
import NavBar from "../components/Nav/NavBar";
import { ToastContainer } from "react-toastify";
const montserrat = Montserrat({weight:['300' , '400' , '700'], subsets:['latin']})
export const metadata: Metadata = {
  title: "Gaming social",
  description: "this is a gaming web site",
};

export default function gamePage({
children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="background grid grid-cols-12 min-h-screen">
      <SideBar className="col-span-2" />
      <div className="col-span-10 my-8 mx-20">
      <NavBar className="" />
        {children}</div>
        <ToastContainer/>
    </div>
  );
}
