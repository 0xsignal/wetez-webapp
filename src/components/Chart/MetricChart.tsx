import React from "react";

type MetricChartProps = {
  status: string,
  usage: number,
  usageCircle : number,
}

export default function MetricChart({
  status = '',
  usage = 0,
  usageCircle = 0,
}:MetricChartProps){
  switch(status){
    case 'Active':
      return(
        <div className='relative inline-block mx-auto'>
          <svg width="480" height="150">
            <circle cx="260" cy="135" r="100" strokeWidth="40" stroke="rgba(255,255,255,.03)" fill="none" strokeDashoffset="-315" strokeDasharray="315"></circle>
            <circle cx="260" cy="135" r="100" strokeWidth="40" stroke="rgba(0,244,255,.6)" fill="none" strokeDashoffset="-315" strokeDasharray={`${usageCircle} 315`}></circle>
          </svg>
          <div className='text-center font-brand text-3xl text-[#00F4FF]/60 font-bold absolute left-1/2 top-2/3 -translate-x-1/4 -translate-y-1/4'>
            {usage}% 
            <div className='text-center text-sm text-[#00F4FF]/60 font-normal font-sans'>Used</div>
          </div>
        </div>
      )
    case 'Overrun':
      return(
        <div className='relative inline-block mx-auto'>
          <svg width="480" height="150">
            <circle cx="260" cy="135" r="100" strokeWidth="40" stroke="rgba(255,255,255,.03)" fill="none" strokeDashoffset="-315" strokeDasharray="315"></circle>
            <circle cx="260" cy="135" r="100" strokeWidth="40" stroke="rgba(0,244,255,.6)" fill="none" strokeDashoffset="-315" strokeDasharray="315 315"></circle>
          </svg>
          <div className='text-center font-brand text-3xl text-[#EC57A4] font-bold absolute left-1/2 top-2/3 -translate-x-1/4 -translate-y-1/4'>
            100% 
            <div className='text-center text-sm text-[#EC57A4] font-normal font-sans'>Used</div>
          </div>
        </div>
      )
    case 'Inactive':
      return(
        <div className='relative inline-block'>
          <svg width="480" height="150">
            <circle cx="260" cy="135" r="100" strokeWidth="40" stroke="rgba(255,255,255,.03)" fill="none" strokeDashoffset="-315" strokeDasharray="315"></circle>
            <circle cx="260" cy="135" r="100" strokeWidth="40" stroke="rgba(0,244,255,.6)" fill="none" strokeDashoffset="-315" strokeDasharray="0 315"></circle>
          </svg>
        </div>
      )
    default:
      return(
        <div className='relative inline-block'>
          <svg width="480" height="150">
            <circle cx="260" cy="135" r="100" strokeWidth="40" stroke="rgba(255,255,255,.03)" fill="none" strokeDashoffset="-315" strokeDasharray="315"></circle>
            <circle cx="260" cy="135" r="100" strokeWidth="40" stroke="rgba(0,244,255,.6)" fill="none" strokeDashoffset="-315" strokeDasharray="0 315"></circle>
          </svg>
        </div>
      )
  }

}