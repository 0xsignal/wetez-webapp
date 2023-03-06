import React from 'react';
import { gbConvert } from 'src/lib/format';
import moment from 'moment';
import { DataSelectWithinListbox } from '../PosApi/DataSelectWithinListbox';
import { DataSelect } from './DataSelect';


type UsageBoardProps = {
  type: string,
  planStatus:{
    id: number
    totalStorage: number
    transferUp : number
    transferDown : number
    todayUsage: number
    status: 1 | 2 | 0 | -2
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
  type = '',
  planStatus = {
    id : 1,
    totalStorage: 0,
    transferUp: 0,
    transferDown: 0,
    todayUsage: 0,
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
      dayLimit: 10,
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

  const timeNow = moment().format('LL')

  if(type == 'IPFS'){

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
            Total Storage in {timeNow}
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
  )}
  else {
    return(
      <div className='bg-white/5 rounded-[24px]'>
        <div className='px-6 py-6'>
          <div className='text-xl text-white font-bold'>
            Volume History
          </div>
          <div className='mt-4 flex gap-x-2 text-sm'>
            <div className='font-bold text-white'>
              {planStatus.todayUsage}
            </div>
            <div className='text-white/50'>
              in {timeNow}
            </div>
          </div>
          <div className='mt-4'>
            <DataSelectWithinListbox
              items24h = {items24h}
              items7d = {items7d}
              items1m = {items1m}

            />
          </div>
        </div>
      </div>
    )
  }
}