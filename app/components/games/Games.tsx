'use client';
import React, { useEffect, useState } from 'react';
import { GetGame } from '../getGame/GetGame';
import TypeGame from '../../../lib/TypeGame';
import Card from './Card';
import { Skeleton } from '../../../components/ui/skeleton'; 
import { Button } from '@/components/ui/button';

const genresList = [
  'action',
  'adventure',
  'indie',
  'strategy',
  'shooter',
  'casual',
  'simulation',
  'puzzle',
  'arcade',
  'platformer',
  'racing',
  'sports',
  'fighting'
];

function Games() {
  const [game, setGame] = useState<TypeGame[]>([]);
  const [genre, setGenre] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1); 

  useEffect(() => {
    async function getGames() {
      setLoading(true);
      const response = await GetGame({
        platform: [21, 4, 187],
        page_size: 15, 
        page: currentPage, 
        genre: genre 
      });
      setGame(response.results);
      setTotalPages(response.count ? Math.ceil(response.count / 15) : 1);
      setLoading(false);
    }
    getGames();
  }, [genre, currentPage]);

  function handleGenres(genre: string) {
    setGenre(genre);
    setCurrentPage(1); 
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div className="">
      <div className="mt-5 flex gap-5">
      <div className="text-center sticky mt-3 inset-0 h-max bg-[#333839] items-center px-7 py-2 rounded-3xl ">
        <button
          onClick={() => handleGenres('')} 
          className={`px-2 py-2 rounded-md ${genre === '' ? 'bg-rose-400' : ''} mt-3`}
        >
          All
        </button>
        {genresList.map((val, i) => (
          <div key={i}>
            <button
              onClick={() => handleGenres(val)}
              className={`px-2 py-2 rounded-md ${genre === val ? 'bg-rose-400' : ''} mt-3`}
            >
              {val.charAt(0).toUpperCase() + val.slice(1)}
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-between">
        {loading ? (
          [...Array(15)].map((_, i) => (
            <div key={i} className="flex flex-col h-[300px] w-[250px] mt-4">
              <Skeleton className="rounded-xl w-[100%] h-[100%]" />
              <Skeleton className="mt-2 h-[20px]" />
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-[20px] w-[20px]" />
                <Skeleton className="h-[20px] w-[20px]" />
                <Skeleton className="h-[20px] w-[20px]" />
              </div>
            </div>
          ))
        ) : (
          <Card game={game} />
        )}
      </div>


      
    </div>
    <div className="flex justify-center gap-4 mt-5">
        <Button 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1} 
          className="bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          Previous
        </Button>
        <span className="flex items-center justify-center text-xl">
          Page <span className='px-3 bg-rose-500 mx-3 rounded-xl'>{currentPage}</span> of  <span className='px-3 bg-rose-500 mx-3 rounded-xl'>{totalPages}</span>
        </span>
        <Button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages} 
          className="bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Games;
