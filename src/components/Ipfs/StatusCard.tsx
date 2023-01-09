import React from 'react';
import Link from 'next/link';


export function StatusCard() {
  return(
    <div className='bg-white/5 rounded-[26px]'>
      <div className='px-6 py-6'>
        <div className='text-2xl text-white font-bold'>
          Endpoints
        </div>
        <div className='mt-4 flex items-center'>
          <div className='text-white/50 text-base w-3/4 break-words'>
            https://mainnet-rpc.wetez.io/eth/v1/adc0b15dd5b4897fe5b15512e7c34bd3
          </div>
          <div className='grow'>
          </div>
          <div className=''>
            <img src="/image/copy_bg_icon.png" className='h-8'/>
          </div>
        </div>
        <div className='border-t-[1px] border-[#3b4158] mt-6'>
        </div>
        <div className='text-2xl text-white font-bold mt-4'>
          My Status
        </div>
        <div className='flex items-center mt-4'>
          <div className='text-base text-white'>
            Status
          </div>
          <div className='grow'>
          </div>
          <div className='bg-[#00F4FF] rounded-[6px] text-[#182036] text-sm px-3 py-1'>
            Active
          </div>
        </div>
        <div className='flex items-center mt-4'>
          <div className='text-base text-white'>
            Expire At
          </div>
          <div className='grow'>
          </div>
          <div className='text-base text-white/50'>
            2099.11.11
          </div>
        </div>
      </div>
    </div>

  )

}