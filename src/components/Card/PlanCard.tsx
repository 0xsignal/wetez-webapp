import React from 'react';
import Link from 'next/link';
import Tags from '../Tag';


export function PlanCard() {
  return(
    <>
      <div className='bg-white/5 rounded-[24px]'>
        <div className='px-6 py-8'>
          <div className=''>
            <h2 className='font-bold text-xl text-white'>My Current Plan</h2>
            <div className='float-right -mt-8'>
              <Tags
                name = "Free"
                bgColor = "bg-white/10"
                fontColor = 'text-white/60'
              />
            </div>
          </div>
          <div className='mt-6 text-base text-white/50'>
            You don't have a paid plan. Please select a plan to prevent storage issues beyond your plan limits.
          </div>
          <Link href="/">
            <div className='bg-[#2A23FF] rounded-[23px] mt-6 w-1/3'>
              <div className='px-8 py-3 flex items-center'>
                <div className='text-base text-white'>
                  More
                </div>
                <img src="/image/arrow_more_icon.png" className='h-4 ml-4'/>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
