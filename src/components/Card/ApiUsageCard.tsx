import React from 'react';
import PlanListItem  from '../Dashboard/PlanListItem';

type ApiUsageCardProp = {
  subscribePlanList:{
    id: number
    todayUsage: number
    status: 1 | 2 | 3
    expireAt: number
    chain:{
      chainId: number
      name: string
    }
    plan:{
      id: number
      name: string
      chainId: number
      dayLimit: number
    }
  }[]| undefined
}

export function ApiUsageCard({
  subscribePlanList = [{
    id : 1, 
    todayUsage: 1000,
    status: 1,
    expireAt: 1000,
    chain:{
      chainId: 1,
      name: 'Ethereum'
    },
    plan:{
      id: 1,
      name: 'Free',
      chainId: 1,
      dayLimit: 1000,
    },
  }]}:ApiUsageCardProp){

  return(
    <div className='bg-white/5 rounded-[24px] px-6 py-6'>
      <div className='flex space-x-4'>
        <img src="/image/apikey_icon.png" className='h-16'/>
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
      </div>
      <div className='border-[0.5px] border-white/10 mt-6'></div>
      <div className='mt-6'>
        <div className='text-2xl font-bold text-white flex items-center gap-x-3'>
          My Plans
          <img src="/image/help_tips_icon.png" className='h-6'/>
        </div>
        <div className='mt-6'>
          <div className='grid grid-cols-5 gap-1 text-base text-white/30'>
            <span className='pl-2'>Network</span>
            <span className='grow pl-10 col-span-3'>Usage</span>
            <span className='pl-6'>Status</span>
          </div>
          <div className='border-[0.5px] border-white/10 mt-2'></div>
        </div>
        <div className='mt-4'>
        {(subscribePlanList.map((item) => (
          <PlanListItem
            key={item.id}
            usage={item.todayUsage}
            status={item.status}
            dayLimit={item.plan.dayLimit}
            network={item.chain.name}
          />
        )))}
        </div>
      </div>
    </div>
  )
}