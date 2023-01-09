import React from 'react';
import Link from 'next/link';


export function ApiKeyCard() {
  
  return(
    <div className='bg-white/5 rounded-[24px] px-6 py-6'>
      <div className='flex items-center gap-x-6'>
        <img src="/image/apikey_icon.png" className='w-24'/>
        <div className=''>
          <div className='text-2xl font-bold text-white flex items-center gap-x-3'>
            Admin Key
            <img src="/image/help_tips_icon.png" className='h-6'/>
          </div>
          <div className='text-base text-white/50 mt-3 flex items-center gap-x-3'>
            sisidjdjdd23734839393303030003033
            <img src="/image/copy_icon.png" className='h-4'/>
          </div>   
        </div>
        <div className='grow'>
        </div>
        <button className='border-[1px] border-white/20 px-10 py-3 text-base text-white/50 rounded-[26px]'>
          Reset
        </button>
      </div>
    </div>
  )
}