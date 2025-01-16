'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '../Nav/logo';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export interface inputs {
  type: string;
  placeholder: string;
  id: string;
  name: string;
  dec: string;
  htmlFor: string;
}

interface prop {
  input: inputs[];
  btn: string;
  footer: string;
  link: string;
}

interface handleInput {
  value: string;
  name: string;
}

function FormToLogIn({ input, btn, footer, link }: prop) {
  const [data, setData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  function handleInput({ value, name }: handleInput) {
    setData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  }

  async function send(event: React.FormEvent) {
    event.preventDefault();

    // إذا كانت البيانات غير مكتملة
    if (Object.values(data).includes('')) {
      setErrors((prev) => ({ ...prev, general: 'All fields are required.' }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, general: '' }));
    }

    try {
      console.log(data);
      const response = await axios.post('/api/LogIn', data);
      if (response.status === 200) {
        toast.success("SingUp successfully!")
        setTimeout(() => {
          router.push('/');
        }, 1500);
        
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 422 || error.response.status === 409||error.response.status === 403) {
          const apiErrors = error.response.data.errors || {};
          setErrors(apiErrors);
          
          // عرض الإشعارات باستخدام toast
          toast.error(error.response.data.message || 'An error occurred');
        } else {
          console.log('Unexpected Error:', error.response);
        }
      } else {
        console.log('Network error:', error);
      }
    }
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      className="max-w-[50%] py-11 px-20 flex flex-col gap-4 w-full bg-black/70 rounded-2xl border border-white"
    >
      <div className="m-auto">
        <Logo />
      </div>
      <form onSubmit={send}>
        {input?.map((val, i) => (
          <div className="flex flex-col mt-5" key={i}>
            <Label htmlFor={val.htmlFor}>{val.dec}</Label>
            <Input
              id={val.id}
              placeholder={val.placeholder}
              type={val.type}
              onChange={(event) =>
                handleInput({ name: val.name, value: event.target.value })
              }
              className="bg-transparent border border-white/50 mt-2"
            />
          </div>
        ))}
        {errors.general && (
          <p className="text-red-500 text-sm mt-1">{errors.general}</p>
        )}
        <div className="w-full mt-5">
          <Button type="submit" className="rounded-xl w-full">
            {btn}
          </Button>
        </div>
      </form>
      <div className="m-auto">
        <p>
          {footer}
          <span className="text-rose-500">
            <Link href="/SignUp">{link}</Link>
          </span>
        </p>
      </div>
    </motion.div>
  );
}

export default FormToLogIn;
