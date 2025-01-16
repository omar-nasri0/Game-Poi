import type { Metadata } from "next";

import {Montserrat} from 'next/font/google'
import SideBar from "../components/Nav/SideBar";
import NavBar from "../components/Nav/NavBar";
import { Component } from "lucide-react";
import { ToastContainer } from "react-toastify";
const montserrat = Montserrat({weight:['300' , '400' , '700'], subsets:['latin']})
export const metadata: Metadata = {
  title: "Gaming social",
  description: "this is a gaming web site",
};

export default function AuthPage({
children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative bg-[url('/bg2.jpg')] min-h-screen min-w-screen">
        {children}
        <ToastContainer />
    </div>
  );
}
