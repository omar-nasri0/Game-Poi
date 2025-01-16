import React from 'react'
import TypeGame  from './../../../lib/TypeGame'
import Image from 'next/image'
import Add from '../add/Add'

function Card({games}:{games:TypeGame[]}) {
  return (
    <div className='flex gap-6 mt-8 flex-wrap'>
        {games.map((val , i )=>(
            <div className="w-[220px] h-[400px]  relative flex flex-col" key={i}>
        <div className="relative w-full h-full group overflow-hidden rounded-2xl">
        <div className="absolute top-2 left-2 z-50"><Add  gameId={val.id} gameImageUrl={val.background_image} gameName={val.name}/></div>
            <img 
                src={val.background_image} 
                alt="game image" 
                loading="lazy"
                  className="w-full h-full object-cover duration-300 group-hover:scale-125 group-hover:rotate-6"
            />
             <div className=" absolute inset-0 bg-rose-500/60 w-0 group-hover:w-full transition-all duration-300 "></div>
        </div>
        <div className="flex justify-center mt-2">
            <p className="text-center line-clamp-1">{val.name}</p>
        </div>
    </div>
        ))}
    </div>
  )
}

export default Card