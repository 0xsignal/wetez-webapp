import React from 'react';
import { DataSelect } from './DataSelect';
import { gbConvert } from 'src/lib/format';


type UsageBoardProps = {
  planStatus:{
    id: number
    totalStorage: number
    transferUp : number
    transferDown : number
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
      totalStorage: number
      transferUp : number
      transferDown : number
    }
    endpoints:string[]
  } | undefined,
  items24h:{
    time: number
    count: number
    totalStorage: number
    transferUp: number
    transferDown: number
  }[] | undefined,
  items7d:{
    time: number
    count: number
    totalStorage: number
    transferUp: number
    transferDown: number
  }[] | undefined,
  items1m:{
    time: number
    count: number
    totalStorage: number
    transferUp: number
    transferDown: number
  }[] | undefined,
}

export default function UsageBoard({
  planStatus = {
    id : 1,
    totalStorage: 0,
    transferUp: 0,
    transferDown: 0,
    status : 1,
    expireAt : 10000,
    chain : {
      chainId : 14,
      name : "IPFS",
    },
    plan : {
      id : 14,
      name : 'Free',
      chainId : 14,
      totalStorage: 0,
      transferDown: 0,
      transferUp: 0,
    },
    endpoints : [ 
    ]
  },
  items24h = [{
    time: 1,
    count: 1,
    totalStorage: 1,
    transferUp: 1,
    transferDown: 1,
}],
  items7d = [{
    time: 1,
    count: 1,
    totalStorage: 1,
    transferUp: 1,
    transferDown: 1,
}],
  items1m = [{
    time: 1,
    count: 1,
    totalStorage: 1,
    transferUp: 1,
    transferDown: 1,
}],
}:UsageBoardProps){

  const totalStorage = gbConvert(planStatus.plan.totalStorage)

  return(
    <div className='bg-white/5 rounded-[24px]'>
      <div className='px-6 py-6'>
        <div className='text-xl text-white font-bold'>
          Volume History
        </div>
        <div className='mt-4 flex gap-x-2 text-sm'>
          <div className='font-bold text-white'>
            {totalStorage} GB
          </div>
          <div className='text-white/50'>
            Total Storage in Fri 16 Dec 2022
          </div>
        </div>
        <div className='mt-4'>
          <DataSelect
            items24h = {items24h}
            items7d = {items7d}
            items1m = {items1m}
          />
        </div>
      </div>
    </div>
  )
}