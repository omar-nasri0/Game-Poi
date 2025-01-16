'use client'
import axios from 'axios';
import { CirclePlus, CircleX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface AddProps {
  gameId: number
  gameName: string
  gameImageUrl: string
  onRefresh: () => void
}

function Add({ gameId, gameName, gameImageUrl, onRefresh }: AddProps) {
  const [isPlus, setIsPlus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter()
  // التحقق من حالة اللعبة عند التحميل
  useEffect(() => {
    async function fetchFavoriteStatus() {
      try {
        const response = await axios.post("/api/CheckGameStatus", { gameId });
        if (response.status === 200) {
          setIsPlus(!response.data.isFavorite);
          
        }
      } catch (error) {
        console.log("Error fetching favorite status:", error);
      }
    }

    fetchFavoriteStatus();
  }, [gameId]);

  async function toggleWish() {
    setIsLoading(true);
    try {
      if (isPlus) {
        const req = await axios.post("/api/AddToWish", {
          gameName,
          gameId,
          gameImageUrl,
        });

        if (req.status === 200) {
          setIsPlus(false);
          toast.success("Game has been added to favorites");
          onRefresh()
        }
      } else {
        const req = await axios.delete("/api/RemoveFromWish", {
          data: { gameId },
        });

        if (req.status === 200) {
          setIsPlus(true);
          toast.success("Game has been removed from favorites");
          onRefresh()
        }
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error("Please Login");
      } else {
        console.log("Unexpected error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className=''>
      {isLoading ? (
        <p className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500'></p>
      ) : isPlus ? (
        <CirclePlus onClick={toggleWish} className='cursor-pointer' />
      ) : (
        <CircleX onClick={toggleWish} className='cursor-pointer' />
      )}
    </div>
  );
}

export default Add;
