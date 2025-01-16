'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactElement } from 'react'
function NavLink(
    {navLink}:{navLink:{id:number, label:string ,link:string, icon:ReactElement}} )  {
        const path = usePathname();
        const {link , label , icon , id} =navLink
        const isActive = path===link;
        
  return (
    <Link
        className={` flex gap-2 items-center p-2 rounded-md duration-300 my-2
            ${isActive?"text-rose-400": "text-gray-50"} hover:text-rose-400`}
         href={link} key={id}  >
            {icon}{label}
            </Link>
  )
}

export default NavLink