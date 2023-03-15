import React from 'react';
import { useState } from 'react'
import { RadioGroup} from '@headlessui/react'
import { pass } from '../../lib/fp';
import { useEffect } from 'react';
import ConfirmModal from '../Modal/ConfirmModal';
import { useActiveGateway } from 'src/api/ipfs';

type GatewayListProps = {
  gatewayItemList?:{
    id: number
    dedicatedGateway: string
    active: boolean
  }[],
  deleteGateway?:(gatewayID:number) => void,
}

export function GatewayList({
  gatewayItemList = [{
    id : 0,
    dedicatedGateway: 'test',
    active : false,
  }],
  deleteGateway = pass,
}:GatewayListProps){

  let listId:number = 0

  const [selected, setSelected] = useState(gatewayItemList[listId])
  const [isConfirmOpen,setIsConfirmOpen] = useState(false)
  const [isActiveOpen,setIsActiveOpen] = useState(false)
  const [gatewayId,setGatewayId] = useState<number>(0)

  const {
    trigger: activeGatewayTrigger,
    loading: activeGatewayLoading,
    error: activeGatewayError,
  } = useActiveGateway()

  useEffect(()=>{
    listId = gatewayItemList.findIndex(x=>x.active === true) ===- 1 ? 0 : gatewayItemList.findIndex(x=>x.active === true)
    setSelected(gatewayItemList[listId])
  },[gatewayItemList[listId]])

  useEffect(()=>{
    if(selected != undefined){
      activeGatewayTrigger({gatewayID:selected.id})
    }
  },[selected])
  
  return (
    <div className='mt-10'>
      <ConfirmModal
        isOpen = {isConfirmOpen}
        title = {'Sure to delete gateway?'}
        description = {'Deleting the dedicated gateway means that all the traffic will be blocked and you will lose all saved settings.'}
        closeFunc = {()=>{
          setIsConfirmOpen(false)
        }}
        confirmFunc = {async ()=>{
          await deleteGateway(gatewayId)
          setIsConfirmOpen(false)
        }}
      />
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
                      setIsConfirmOpen(true)
                      setGatewayId(gatewayItemList.id)
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