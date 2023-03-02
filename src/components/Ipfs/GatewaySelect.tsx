import React, { useEffect } from 'react';
import { useState } from 'react'
import { GatewayInput } from './GatewayInput';
import { GatewayList } from '../List/GatewayList';
import { pass } from 'src/lib/fp';

type GatewaySelectProps = {
  addGateway:(data:{
    gateway: string
  }) => void,
  delateGateway:(data:{gatewayID:number}) => void,
  activeGateway:(data:{gatewayID:number}) => void,
  gatewayItemList:{
    userID: number
    id: number
    dedicatedGateway: string
    active: boolean
  }[] | undefined,
}

export function GatewaySelect({
  addGateway = pass,
  delateGateway = pass,
  activeGateway = pass,
  gatewayItemList = []

}:GatewaySelectProps) {

  let nextId = gatewayItemList.length - 1;
  const [gatewayList,setGatewayList] = useState(gatewayItemList);

  useEffect(()=>{
    setGatewayList(gatewayItemList)
  },[gatewayItemList])

  function addGatewayList(gatewayName:string){
    const res =  addGateway({gateway:gatewayName})
    if(res != null){
      setGatewayList(
        [...gatewayList,{
          id: nextId++,
          userID: 19,
          dedicatedGateway:gatewayName,
          active: false,
        }]
      )
    }
  }

  function delateGatewayLsit(gatewayID:number){
    const res =  delateGateway({gatewayID:gatewayID})
    if(res != null){
      setGatewayList(
        gatewayList.filter(t => t.id !== gatewayID)
      );
    }
  }


  return(
    <div className='bg-white/5 rounded-[24px] px-6 py-6'>
      <div className='flex items-center space-x-3'>
        <h3 className='font-bold text-2xl text-white'>
          Dedicated Gateway
        </h3>
        <img src="/image/help_tips_icon.png" className='w-5'/>
      </div>
      <div className='mt-4 text-white/30 text-lg'>
        Name your custom sub-domain here
      </div>
      <div className='mt-8'>
        <GatewayInput
          addGateway = {addGatewayList}
        />
      </div>
      <GatewayList
        gatewayItemList={gatewayList}
        deleteGateway={delateGatewayLsit}
        activeGateway={activeGateway}
      />
    </div>
  )
}