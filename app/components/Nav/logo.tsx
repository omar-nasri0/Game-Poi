import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={'/'} 
    className="text-2xl font-semibold flex gap-2">
        <h1 className='text-rose-500'>Gaming</h1>
        <span>Boi</span>
    </Link>
  )
}

export default Logo