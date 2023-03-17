import React, { useEffect } from 'react';
import { useState } from 'react'
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

  const [nextId,setNextId] = useState<number>(gatewayItemList.length - 1)
  const [gatewayList,setGatewayList] = useState(gatewayItemList);

  const {
    trigger: addGatewayTrigger,
    isMutating: addGatewayIsMutating,
    error: addGatewayError,
  } = useAddGateway()

  const {
    trigger: removeGatewayTrigger,
    loading: removeGatewayLoading,
    error: removeGatewayError,
  } = useRemoveGateway()

  const [gatewayName,setGatewayName] = useState<string>('')    


  useEffect(()=>{
    setGatewayList(gatewayItemList)
  },[gatewayItemList])

  async function delateGatewayLsit(gatewayID:number){
    const res =  await removeGatewayTrigger({gatewayID:gatewayID})
    if(res == true){
      setGatewayList(
        gatewayList.filter(t => t.id !== gatewayID)
      );
      setNextId(nextId-1)
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
      <div className='flex space-x-3 pr-24 justify-center items-center'>
        <div className='text-lg text-white/50'>
          https://
        </div>
        <div className='grow'>
          <div className='relative flex justify-center items-center'>
            <input 
              className='peer pr-16 rounded-[16px] border-[1px] border-white/20 pl-6 py-2 grow bg-white/0 caret-[#00F4FF] focus:outline-0 focus:ring-0 text-white text-lg'
              placeholder='Input your sub-domin (only letters, numbers and dashes allowed)'
              value = {gatewayName}
              onChange = {e => 
                setGatewayName(e.target.value)}
              > 
            </input>
            <div className='absolute top-0 right-0 z-20 px-4 py-3 hidden peer-focus:block active:block'>
              <button className='outline-none' onClick={async() => {
                const res =  await addGatewayTrigger({gateway:gatewayName})
                if(!addGatewayIsMutating){
                  console.log(res)
                  if(res == true){
                    setGatewayList(
                      [...gatewayList,{
                        id: nextId+1,
                        dedicatedGateway:gatewayName,
                        active: false,
                      }]
                    )
                    setNextId(nextId+1)
                    toast.success('Add Succeed')
                  }
                }
                setGatewayName('');
              }}>
                <img src="/image/gateway_add_active.png" className='w-5'/>
              </button>
            </div>
            <div className='absolute top-0 right-0 z-10 px-4 py-3 block peer-focus:hidden'>
              <img src="/image/gateway_add_inactive.png" className='w-5'/>
            </div>
          </div>
        </div>
        <div className='text-lg text-white/50'>
          .wetez-ipfs.io
        </div>
      </div>
      </div>
      <GatewayList
        gatewayItemList={gatewayList}
        deleteGateway={delateGatewayLsit}
      />
    </div>
  )
}