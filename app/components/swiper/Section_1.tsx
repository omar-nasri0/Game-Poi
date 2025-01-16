import React from 'react'
import SwiperCard from './SwiperCard_1'
const video = [{
    src:'/Dragon-Ball-Sparking-Zero-Hero-desktop-01-03oct24.png',
    srcPagination:'/Dragon-Ball-Sparking-Zero-Hero-desktop-01-03oct24.png',
    srcImageTitle:'/Dragon-Ball-Sparking-Zero-logo-01-03oct24.webp',
    desc:"A legendary series has returned. Reach new levels of power in Dragon Ball: Sparking! Zero, out now on PS5",
    title:"Shake the earth. Break the universe !",
    btn:'Find out more !'
  },
    {
    src:'/call-of-duty-black-ops-6-animated-hero-mobile-01-en-22may24.mp4',
    srcPagination:'/call-of-duty-black-ops-6-hero-desktop-01-en-21may24.webp',
    srcImageTitle:'/call-of-duty-black-ops-6-logo-01-en-21may24.webp',
    desc:"Last chance to pre-order and get access to additional premium content. Call of Duty®: Black Ops 6 launches on October 25th",
    title:"The truth lies",
    btn:'Find out more !'
  },{
    src:'/cyberpunk-2077-phantom-liberty-video-hero-01-en-11sep23.mp4',
    srcPagination:'/cyb.webp',
    srcImageTitle:'/iconcyber.webp',
    title:'BE GREATER TOGETHER',
    desc:"Peter Parker & Miles Morales return for an exciting new adventure in the acclaimed Marvel’s Spider-Man franchise, out October 20 for PS5.",
    btn:'Find out more !'
  },{
    src:'/spidervideo.mp4',
    srcPagination:'/poster.webp',
    srcImageTitle:'/news1title.webp',
    title:'BE GREATER TOGETHER',
    desc:"Peter Parker & Miles Morales return for an exciting new adventure in the acclaimed Marvel’s Spider-Man franchise, out October 20 for PS5.",
    btn:'Find out more !'
  }]
function Section_1() {
  return (
    <div><SwiperCard 
    video={video}/></div>
  )
}

export default Section_1