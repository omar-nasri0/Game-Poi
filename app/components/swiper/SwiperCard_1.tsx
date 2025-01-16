'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import SwiperType from 'swiper'
import {motion} from 'framer-motion'
interface Video {
  src: string;
  srcPagination: string;
  srcImageTitle:string,
  desc:string,
  title:string,
  btn:string
}

interface Props {
  video: Video[];
}

function SwiperCard({ video }: Props) {
  const [swiper , setSwiper] = useState<SwiperType>()
  const [progress , setProgress] = useState(0)
  useEffect(()=>{
    const timer =setTimeout(()=>{setProgress((prev)=>prev>100?100:prev+3.7)},110)
    return()=>clearInterval(timer)
  },[progress])
  useEffect(()=>{
    swiper?.on("slideChange" , ()=>{setProgress(0)})
  },[swiper])
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay]}
        autoplay={{delay:3000}}
        spaceBetween={50}
        slidesPerView={1}
        className="relative h-[30rem] rounded-3xl"
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {video?.map((val, i) => (
          <SwiperSlide key={i}>
            <section className="h-full relative">
              {i===0?(<Image
              alt="image"
              src="/Dragon-Ball-Sparking-Zero-Hero-desktop-01-03oct24.png"
              layout="fill"
              className="object-cover"
            />):(<video
              autoPlay
              muted
              loop
              className="w-full h-full object-cover object-top"
            >
              <source src={val.src} type="video/mp4" />
            </video>)}
              <motion.div
              key={swiper?.realIndex} 
                 initial={{ opacity: 0, y:20}}
                 animate={{ opacity: 1, y:0 }}
                 transition={{ duration: 1.0}}
              className="absolute left-20 top-20 flex flex-col items-start max-w-md">
                  <div className="w-96 h-40 relative">
                    <Image alt='imagePoster' fill src={val.srcImageTitle} loading='lazy' 
                    className='object-contain'/>
                  </div>
                  <h1 className='text-white text-2xl font-semibold mt-3'>{val.title}</h1>
                  <p className='text-base text-gray-200 mt-3'> {val.desc}</p>
                  <Button className='mt-3 rounded-2xl'>{val.btn}</Button>
              </motion.div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex gap-4 mt-4 w-full">
        {video.map((val, i) => (
          <div 
          onClick={()=>swiper?.slideTo(i)}
          className={`hover:-translate-y-7 cursor-pointer duration-200 z-20 relative w-full h-36 rounded-lg overflow-hidden ${swiper?.realIndex===i?"-translate-y-10":""}`} key={i}>
            <Image
              alt={`Thumbnail ${i}`}
              src={val.srcPagination}
              layout="fill"
              className='object-cover '
            />
           {swiper?.realIndex===i&&( 
            <div style={{width:`${progress}%`}}
             className="duration-200 opacity-50 absolute w-full h-full bg-gray-600 inset-0 z-10"></div>)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SwiperCard;
