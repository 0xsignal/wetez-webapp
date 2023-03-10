import React from 'react';

type UsagePercentChartProps = {
  status: number,
  usageCircle : number,
}

export default function UsagePercentChart({
  status = 0,
  usageCircle = 0,
}:UsagePercentChartProps){

  switch(status){
    case 1:
      return(
        <div className='relative inline-block'>
          <svg width="24" height="24">
            <circle cx="12" cy="12" r="10" strokeWidth="5" stroke="rgba(255,255,255,.1)" fill="none"></circle>
            <circle cx="12" cy="12" r="10" strokeWidth="5" stroke="rgba(0,244,255,.6)" fill="none" transform="matrix(0,-1,1,0,0,24)" strokeDasharray={`${usageCircle},62.8`}></circle>
          </svg>
        </div>
      )
    case 2:
      return(
        <div className='relative inline-block'>
        <svg width="24" height="24">
          <circle cx="12" cy="12" r="10" strokeWidth="5" stroke="rgba(255,255,255,.1)" fill="none"></circle>
          <circle cx="12" cy="12" r="10" strokeWidth="5" stroke="#EC57A4" fill="none" transform="matrix(0,-1,1,0,0,24)" strokeDasharray="62.8 62.8"></circle>
        </svg>
      </div>
      )
    case 0:
      return(
        <div className='relative inline-block'>
          <svg width="24" height="24">
            <circle cx="12" cy="12" r="10" strokeWidth="5" stroke="rgba(255,255,255,.1)" fill="none"></circle>
            <circle cx="12" cy="12" r="10" strokeWidth="5" stroke="rgba(0,244,255,.6)" fill="none" transform="matrix(0,-1,1,0,0,24)" strokeDasharray="0 62.8"></circle>
          </svg>
        </div>
      )
    default:
      return(
        <div className='relative inline-block'>
          <svg width="24" height="24">
            <circle cx="12" cy="12" r="10" strokeWidth="5" stroke="rgba(255,255,255,.1)" fill="none"></circle>
            <circle cx="12" cy="12" r="10" strokeWidth="5" stroke="rgba(0,244,255,.6)" fill="none" transform="matrix(0,-1,1,0,0,24)" strokeDasharray="0 62.8"></circle>
          </svg>
        </div>
      )
  }


}