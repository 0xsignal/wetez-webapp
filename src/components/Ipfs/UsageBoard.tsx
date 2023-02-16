import React from 'react';
import { SelectDataType } from './SelectDataType';
import { SelectDataTime } from './SelectDataTime';


type UsageBoardProps = {
  
}

export default function UsageBoard() {

  return(
    <div className='bg-white/5 rounded-[24px]'>
      <div className='px-6 py-6'>
        <div className='text-xl text-white font-bold'>
          Volume History
        </div>
        <div className='mt-4 flex gap-x-2 text-sm'>
          <div className='font-bold text-white'>
            23.24GB
          </div>
          <div className='text-white/50'>
            Total Storage in Fri 16 Dec 2022
          </div>
        </div>
        <div className='mt-4 relative'>
          <SelectDataType/>
          <SelectDataTime/>
        </div>
      </div>
    </div>
  )
}