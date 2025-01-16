'use client'
import { useEffect, useState } from 'react';
import TypeGame from './../../../../lib/TypeGame'
import { GetGame } from '@/app/components/getGame/GetGame';
import React from 'react';
import Card from '@/app/components/category/Card';

interface PlatformPageProps {
  params: Promise<{ platform: number }>; 
}

function PlatformPage({ params }: PlatformPageProps) {
  const { platform } = React.use(params);
  const [games , setGames] = useState<TypeGame[]>([]);
  const [loading , setLoading] = useState(true);
  const [page , setPage] = useState(1);
  const itemInPage = 12;

  useEffect(() => {
    async function GetTenGames() {
      try {
        const game = await GetGame({ page:page, platform:platform, page_size: itemInPage });
        if (game && game.results) {
          setGames(game.results);
        } else {
          console.error("Unexpected data structure:", game);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // إكمال التحميل
      }
    }
    GetTenGames();
  }, [page]);

  console.log(page);

  if (loading) {
   
    return (
      <div className="flex gap-6 mt-8 flex-wrap">
        {[...Array(15)].map((_, i) => (
          <div className="w-[220px] h-[400px] relative flex flex-col" key={i}>
            <div className="relative w-full h-full group overflow-hidden rounded-2xl skeleton-loader">
             
              <div className="w-full h-full bg-gray-500 bg-opacity-45 animate-pulse"></div>
            </div>
            <div className="flex justify-center mt-2">
    
              <div className="w-24 h-4 bg-gray-500 bg-opacity-45 animate-pulse rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Card games={games} />
      <div className="flex w-full gap-5 mt-6 justify-center">
        {[...Array(9).keys()].map(index => (
          <div key={index}>
            <button 
              onClick={() => (setPage(index + 1) , setLoading(true))} 
              className="px-4 py-2 bg-gray-700 text-white rounded"
            >
              {index + 1}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlatformPage;
