'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Card from '../components/add/Card'
import { Skeleton } from '@/components/ui/skeleton'

function page() {
  const [wish , setWish] = useState([])
  const [loading , setLoading] = useState(true)
 
  const getWish = async () => {
    setLoading(true)
    try {
      const req = await axios.get('/api/GetWish')
      if (req.status === 200) {
        setWish(req.data.favorite)
      }
    } catch (error: any) {
      if (error.response?.status === 422) {
        toast.error('please login')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getWish()
  }, [])

  return (
    <div>
      <p className='mt-4 font-semibold text-2xl'>My WishList ❤️</p>
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
          <div className="">
            {wish.length===0?(
                <p className='absolute top-[50%] left-[50%] font-semibold text-2xl'>No products favorite...</p>
            ):(
              <Card games={wish} onRefresh={getWish}/>
            )}
          </div>
        )}
      </div>
      </div>
    
  )
}

export default page