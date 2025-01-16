'use client'
import { GetGame } from '../getGame/GetGame'
import TypeGame from '../../../lib/TypeGame'
import React, { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import SwiperCard_2 from './SwiperCard_2'
import Link from 'next/link'

interface prop {
  title: string,
  btn: string,
  platform: number,
  page_size: number
}

function Section_2({ title, btn, platform, page_size }: prop) {
  const [games, setGames] = useState<TypeGame[]>([]);
  const [loading , setLoading] = useState(true)
  useEffect(() => {
    async function GetTenGames() {
      try {
        const game = await GetGame({ platform: platform, page_size: page_size });
        if (game && game.results) {
          setGames(game.results);
          setTimeout(() => {
            setLoading(false)
          }, 1500);
        } else {
          console.error("Unexpected data structure:", game);
        }
      } catch (error) {
        console.log(error);
      }
      
    }
    GetTenGames();
  }, [platform, page_size]);

  if (loading) {
    return(
        <div className="flex items-center z-50 justify-center absolute min-h-screen inset-0 bg-black">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
  </div>)
  }
    
  return (
    
      <div className="mt-6">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <Button className="text-xl font-medium" asChild>
            <Link href={`/category/${platform}`}>{btn}</Link>
          </Button>
        </div>
        <SwiperCard_2 games={games} />
      </div>
    
  );
}

export default Section_2;
