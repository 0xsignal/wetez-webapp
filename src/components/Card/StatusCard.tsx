import React from 'react';
import Link from 'next/link';
import StatusTag from '../Tag/StatusTag';
import moment from 'moment';
import { EndpontsList } from 'src/components/List/EndpointsList';


type StatusCardProps = {
  planStatus:{
    id: number
    totalStorage: number
    transferUp : number
    transferDown : number
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
      totalStorage: number
      transferUp : number
      transferDown : number
    }
    endpoints:string[]
  } | undefined
}

export function StatusCard(
  {
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
  }
}:StatusCardProps){

  let expireAtTime:string = ''
  if(planStatus.plan.name == 'Free'){
    expireAtTime = '01/01/2099'
  } else{
    expireAtTime = moment(planStatus.expireAt).format('L')

  }

  return(
    <div className='bg-white/5 rounded-[26px]'>
      <div className='px-6 py-6'>
        <div className='text-2xl text-white font-bold'>
          Endpoints
        </div>
        <EndpontsList
          endpoints={planStatus.endpoints}
        />
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
          <StatusTag
            status={planStatus.status}
          />
        </div>
        <div className='flex items-center mt-4'>
          <div className='text-base text-white'>
            Expire At
          </div>
          <div className='grow'>
          </div>
          <div className='text-base text-white/50'>
            {expireAtTime}
          </div>
        </div>
      </div>
    </div>

  )

}