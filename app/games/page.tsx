import React from 'react'
import Games from '../components/games/Games'

function page() {
  return (
    <div>
        <p className='mt-8 text-4xl font-semibold'>Games From Genres</p>
   <div className="flex">
    <div className=""><Games/></div>
   
   </div>
        
  
    </div>
  )
}

export default page