import Image from 'next/image'
import TypeGame from './../../../lib/TypeGame'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Add from '../add/Add';
function SwiperCard_2({games}:{games:TypeGame[]}) {
   
  return (
    <div className="mt-8 flex flex-wrap gap-6">
        <Swiper
        modules={[Autoplay]}
        autoplay={{delay:3000}}
      spaceBetween={20}
      slidesPerView={4}
    >
        {games?.map((val, i) => (
        val.background_image&&(
            <SwiperSlide key={i}>
            <div className="w-[220px] h-[530px] mt-10 relative flex flex-col" key={i}>
        <div className="relative w-full h-3/4 group overflow-hidden rounded-2xl">
        <div className="absolute top-2 left-2 z-40"><Add gameId={val.id} gameImageUrl={val.background_image} gameName={val.name}/></div>
            <img 
                src={val.background_image} 
                alt="game image" 
                  className="w-full h-full object-cover duration-300 group-hover:scale-125 group-hover:rotate-6"
            />
             <div className=" absolute inset-0 bg-rose-500/60 w-0 group-hover:w-full transition-all duration-300 "></div>
        </div>
        <div className="flex justify-center mt-2">
            <p className="text-center">{val.name}</p>
        </div>
    </div>
    </SwiperSlide>
        )
    ))}
    </Swiper>
    
</div>
  )
}

export default SwiperCard_2