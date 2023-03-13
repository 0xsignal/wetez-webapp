import React from 'react';
import Link from 'next/link';
import Notification from '../Notification';

type ApiKeyCardProps = {
  apiKey?: string
}

export function ApiKeyCard({
  apiKey = 'sisidjdjdd23734839393303030003033'
}:ApiKeyCardProps) {

  const copy = async(text:string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
  }

  }

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
            {apiKey}
            <button
              onClick={(async() => {
                await copy(apiKey)
              })}
            >
              <img src="/image/copy_icon.png" className='h-4'/>
            </button>
          </div>   
        </div>
        <div className='grow'>
        </div>
      </div>
    </div>
  )
}