import React from 'react'

type HeaderPrpos = {
  title?:string;
  description?:string;
}

export function Header({
  title,
  description,
  }:HeaderPrpos) {
  return (
    <>
      <div className='mt-12 font-brand text-4xl text-white'>
        {title}
      </div>
      <div className='text-white/30 mt-4 text-lg'>
        {description}
      </div>
    </>
  )
}
