import React from 'react';
import { useState } from 'react'
import { RadioGroup} from '@headlessui/react'
import { pass } from '../../lib/fp';
import { useEffect } from 'react';

type GatewayListProps = {
  gatewayItemList?:{
    userID: number
    id: number
    dedicatedGateway: string
    active: boolean
  }[],
  deleteGateway?:(gatewayID:number) => void,
  activeGateway?:(data:{gatewayID:number}) => void,
}

export function GatewayList({
  gatewayItemList = [{
    userID : 0,
    id : 0,
    dedicatedGateway: '',
    active : false,
  }],
  deleteGateway = pass,
  activeGateway = pass,
}:GatewayListProps){

  let listId:number = gatewayItemList.findIndex(x=>x.active === true)

  const [selected, setSelected] = useState(gatewayItemList[listId])

  useEffect(()=>{
    listId = gatewayItemList.findIndex(x=>x.active === true)
    setSelected(gatewayItemList[listId])
  },[gatewayItemList])

  useEffect(() => {
    if(selected != null){
      const gatewayID = selected.id
      activeGateway({gatewayID:gatewayID})
    }
  }, [selected]);
  
  return (
    <div className='mt-10'>
      <RadioGroup 
        value={selected || ''} 
        onChange={setSelected || ''}>
        <RadioGroup.Label className="sr-only">Gateway List</RadioGroup.Label>
        <div className="space-y-2">
          {gatewayItemList.map((gatewayItemList) => (
            <div className='w-full' key={gatewayItemList.id || ''}>
              <div className='border-[1px] border-white/10'></div>
                <div className='flex'>
                  <div className='grow'>
                  <RadioGroup.Option
                  value={gatewayItemList || ''}
                  className={({ active, checked }) =>
                    `flex cursor-pointer`
                    }
                  >
                  {({ active, checked }) => (
                    <div className='grow'>
                      <div className='py-6'>
                        <div className='flex justify-center items-center'>
                          <RadioGroup.Label
                            as="p"
                            className={`text-lg ${
                              checked ? 'text-[#FFE200]' : 'text-white/50'
                            }`}
                          >
                            {gatewayItemList.dedicatedGateway}
                          </RadioGroup.Label>
                          <div className='grow'></div>
                          {checked && (
                            <div className="px-4">
                              <img src='/image/radio_checked_icon.png' className='w-5'/>
                            </div>
                          )}
                          {!checked && (
                            <div className="px-4">
                              <img src='/image/radio_unchecked_icon.png' className='w-5'/>
                            </div>
                          )}

                        </div>
                        
                      </div>
                    </div>
                  )}
                  </RadioGroup.Option>
                  </div>
                  <div className='px-6 py-7'>
                    <button onClick={() => {
                      deleteGateway(gatewayItemList.id)
                    }}>
                      <img src='/image/delete_item_icon.png' className='w-5'/>
                    </button>
                  </div>
              </div>
            </div>
          ))}
          </div>
        </RadioGroup>
      </div>
    )
}