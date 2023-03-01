import React from 'react'
import Link from 'next/link'

type HeaderPrpos = {
  title?: string,
  description?: string,
  url: string,
  back: boolean,
  backTitle: string,
  backUrl: string,
}

export function Header({
  title,
  description,
  url,
  back,
  backTitle,
  backUrl,
  }:HeaderPrpos) {

  if(back){
    return(
      <>
        <Link href={backUrl}>
          <div className='mt-12 flex items-center space-x-2'>
            <img src='/image/arrow_navigate.png' className='h-4'/>
            <div className='text-xl font-bold text-white/30'>
              {backTitle}
            </div>
          </div>
        </Link>
        <div className='mt-6 font-brand text-4xl text-white'>
          {title}
        </div>
        <div className='text-white/30 mt-4 text-lg'>
          {description}
        </div>
      </>
    )
  }
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
