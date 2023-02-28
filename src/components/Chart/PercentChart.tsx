import React from 'react';

type PercentChartProps = {
  status: string,
  usage: number,
  usageCircle : number,
}

export default function PercentChart({
  status = '',
  usage = 0,
  usageCircle = 0,
}:PercentChartProps){

  switch(status){
    case 'Active':
      return(
        <div className='relative inline-block'>
          <svg width="200" height="200">
            <circle cx="100" cy="100" r="65" strokeWidth="15" stroke="rgba(255,255,255,.03)" fill="none"></circle>
            <circle cx="100" cy="100" r="65" strokeWidth="15" stroke="rgba(0,244,255,.6)" fill="none" transform="matrix(0,-1,1,0,0,200)" strokeDasharray={`${usageCircle} 535`}></circle>
          </svg>
          <div className='text-center text-2xl text-[#00F4FF]/60 font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            {usage}% 
            <div className='text-center text-sm text-[#00F4FF]/60 font-normal'>Used</div>
          </div>
        </div>
      )
    case 'Overrun':
      return(
        <div className='relative inline-block'>
        <svg width="200" height="200">
          <circle cx="100" cy="100" r="65" strokeWidth="15" stroke="rgba(255,255,255,.03)" fill="none"></circle>
          <circle cx="100" cy="100" r="65" strokeWidth="15" stroke="#EC57A4" fill="none" transform="matrix(0,-1,1,0,0,200)" strokeDasharray="535 535"></circle>
        </svg>
        <div className='text-center text-2xl text-[#EC57A4] font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            100% 
          <div className='text-center text-sm text-[#EC57A4] font-normal'>Used</div>
        </div>
      </div>
      )
    case 'Inactive':
      return(
        <div className='relative inline-block'>
          <svg width="200" height="200">
            <circle cx="100" cy="100" r="65" strokeWidth="15" stroke="rgba(255,255,255,.03)" fill="none"></circle>
            <circle cx="100" cy="100" r="65" strokeWidth="15" stroke="rgba(0,244,255,.6)" fill="none" transform="matrix(0,-1,1,0,0,200)" strokeDasharray="0 535"></circle>
          </svg>
        </div>
      )
    default:
      return(
        <div className='relative inline-block'>
          <svg width="200" height="200">
            <circle cx="100" cy="100" r="65" strokeWidth="15" stroke="rgba(255,255,255,.03)" fill="none"></circle>
            <circle cx="100" cy="100" r="65" strokeWidth="15" stroke="rgba(0,244,255,.6)" fill="none" transform="matrix(0,-1,1,0,0,200)" strokeDasharray="0 535"></circle>
          </svg>
        </div>
      )
  }


}