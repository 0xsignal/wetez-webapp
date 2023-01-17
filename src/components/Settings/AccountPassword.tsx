import React from 'react';


export function AccountPassword(){
  return(
    <div className='bg-white/5 rounded-[24px] px-6 py-6'>
      <h2 className='text-2xl text-white mt-4 font-bold'>
        Current Password
      </h2>
      <input type='password' className='rounded-[16px] border-[1px] border-white/20 text-lg text-white/30 w-1/3 px-6 py-3 bg-white/0 mt-10 mb-10'>

      </input>
    </div>
  )

}