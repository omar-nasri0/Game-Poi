'use client';
import React, { useEffect, useState } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { MdDashboard } from 'react-icons/md';
import NavLink from './NavLink';
import Logo from './logo';
import axios from 'axios';
import ButtonLogOut from './ButtonLogOut';
import {toast} from 'react-toastify'
function SideBar({ className }: { className: string }) {
  const Nav_Link = [
    {
      id: 1,
      label: 'Home',
      link: '/',
      icon: <GoHomeFill />,
    },
    {
      id: 2,
      label: 'Games',
      link: '/games',
      icon: <MdDashboard />,
    },
    {
      id: 3,
      label: 'Wishlist',
      link: '/wishlist',
      icon: <FaHeart />,
    },
  ];
  const [log, setLog] = useState(false);

  useEffect(() => {
    async function getButton() {
      try {
        const res = await axios.get('/api/user/logoutbtn');
        if (res.status === 201) {
          setLog(true);
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          toast.error('Please Login');
          setLog(false);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    }
  
    getButton();
  }, []);

  return (
    <div
      className={`h-screen sticky top-0 flex flex-col justify-between items-start px-10 py-5 text-gray-50 bg-black/30 ${className}`}
    >
      <div className="flex flex-col">
        <Logo />
        {Nav_Link.map((nav_link) => (
          <NavLink key={nav_link.id} navLink={nav_link} />
        ))}
      </div>
      <div className='w-full'>{log ? <ButtonLogOut /> : <></>}</div>
    </div>
  );
}

export default SideBar;
