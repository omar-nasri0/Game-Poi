'use client';
import { Button } from '@/components/ui/button';
import Search from './Search';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NavBar({ className }: { className: string }) {
  const [user, setUser] = useState<Record<string, string | null> | null>(null);

  useEffect(() => {
    async function getInfo() {
      try {
        const res = await axios.get('/api/user');
        const data = res.data;

        if (res.status === 200) {
          setUser({ name: data.name, email: data.email });
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          console.log('User is not logged in:', error.response.data.message);
          setUser(null);
        } else {
          console.error('Unexpected error fetching user info:', error);
        }                   
      }
    }

    getInfo();
  }, []);

  return (
    <nav className={`col-span-10 ${className}`}>
      <header className="flex justify-between">
        <Search />
        <div>
          {user ? (
            <div className="flex flex-col">
              <p>{user.name}</p>
            </div>
          ) : (
            <div className="flex gap-5">
              <Button asChild>
                <Link href="/Login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/SignUp">SignUp</Link>
              </Button>
            </div>
          )}
        </div>
      </header>
    </nav>
  );
}
