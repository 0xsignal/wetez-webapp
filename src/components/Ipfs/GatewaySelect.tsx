import React, { useEffect } from 'react';
import { useState } from 'react'
import { GatewayInput } from './GatewayInput';
import { GatewayList } from '../List/GatewayList';
import { useAddGateway,useRemoveGateway } from 'src/api/ipfs';
import { toast } from 'react-toastify';

type GatewaySelectProps = {
  gatewayItemList:{
    id: number
    dedicatedGateway: string
    active: boolean
  }[] | undefined,
}

export function GatewaySelect({
  gatewayItemList = []

}:GatewaySelectProps) {

  let nextId = gatewayItemList.length - 1;
  const [gatewayList,setGatewayList] = useState(gatewayItemList);

  const {
    trigger: addGatewayTrigger,
    loading: addGatewayLoading,
    error: addGatewayError,
  } = useAddGateway()

  const {
    trigger: removeGatewayTrigger,
    loading: removeGatewayLoading,
    error: removeGatewayError,
  } = useRemoveGateway()

  

  useEffect(()=>{
    setGatewayList(gatewayItemList)
  },[gatewayItemList])

  async function addGatewayList(gatewayName:string){
    const res =  await addGatewayTrigger({gateway:gatewayName})
    if(res?.data == true){
      setGatewayList(
        [...gatewayList,{
          id: nextId++,
          dedicatedGateway:gatewayName,
          active: false,
        }]
      )
      toast.success('Add Succeed')
    }
  }

  async function delateGatewayLsit(gatewayID:number){
    const res =  await removeGatewayTrigger({gatewayID:gatewayID})
    if(res?.data == true){
      setGatewayList(
        gatewayList.filter(t => t.id !== gatewayID)
      );
      nextId = nextId - 1
      toast.success('Remove Succeed')
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
      />
    </div>
  )
}