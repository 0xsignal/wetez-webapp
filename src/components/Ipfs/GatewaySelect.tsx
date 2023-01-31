import React from 'react';
import Link from 'next/link';
import { useState } from 'react'
import { RadioGroup} from '@headlessui/react'

const GatewayInialList:{name:string,id:number,active:boolean}[] = [
  {
    name: 'http://shhdhdhduuuuuudgddhhhhhhddddd.wetez-ipfs.io',
    id: 1,
    active: false
  },
  {
    name: 'http://ahhdhdhduuuuuudgddhhhhhhddddd.wetez-ipfs.io',
    id: 2,
    active: false
  },
  {
    name: 'http://bhhdhdhduuuuuudgddhhhhhhddddd.wetez-ipfs.io',
    id: 3,
    active: true
  },
]

type GatewayListProps = {
  gatewayItemList?:
    {
      name?: string
      id?: number
      active?: boolean
    }[]
}

function GatewayList({
  gatewayItemList = [
    {
      name : 'test',
      id : 0,
      active : false,
    },
  ]
}:GatewayListProps){

  let listId:number = gatewayItemList.findIndex(x=>x.active === true)
  console.log(listId)

  const [selected, setSelected] = useState(gatewayItemList[listId])
  console.log(selected)
  
  return (
    <div className='mt-10'>
      <RadioGroup value={selected} onChange={setSelected}>
        <RadioGroup.Label className="sr-only">Gateway List</RadioGroup.Label>
        <div className="space-y-2">
          {gatewayItemList.map((gatewayItemList) => (
            <RadioGroup.Option
            key={gatewayItemList.id}
            value={gatewayItemList}
            className={({ active, checked }) =>
              `flex cursor-pointer`
            }
          >
          {({ active, checked }) => (
            <div className='w-full'>
              <div className='border-[1px] border-white/10'></div>
              <div className='py-8'>
                <div className='flex justify-center items-center'>
                  <RadioGroup.Label
                    as="p"
                    className={`text-lg ${
                      checked ? 'text-[#FFE200]' : 'text-white/50'
                    }`}
                  >
                    {gatewayItemList.name}
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
                  <div className='px-6 pt-1'>
                    <button>
                      <img src='/image/delete_item_icon.png' className='w-5'/>
                    </button>
                  </div>

                </div>
                
              </div>
            </div>
          )}
          </RadioGroup.Option>

        ))}
        </div>
      </RadioGroup>
    </div>
  )
}

function GatewayInput(){

  const [gatewayName,setGatewayName] = useState<string>('')
  const [gatewayList,setGatewayList] = useState(GatewayInialList)

  let nextId = 3;

  function iniGatewayData(){
    setGatewayName('')
  }

  function CreateGateway(){

    setGatewayList([
      ...gatewayList,{
        name: 'https://' + {gatewayName} + '.wetez-ipfs.io',
        id: nextId++,
        active: false,
      }
    ])
    console.log(gatewayList)

    iniGatewayData()

  }

  function DelateGateway(gatewayId:number){
    setGatewayList(
      gatewayList.filter(t => t.id !== gatewayId)
    );
  }

  return(
    <div className='flex space-x-3 pr-24 justify-center items-center'>
      <div className='text-lg text-white/50'>
        https://
      </div>
      <div className='grow'>
        <div className='relative flex justify-center items-center'>
          <input 
            type='url'
            className='peer pr-16 rounded-[16px] border-[1px] border-white/20 pl-6 py-2 grow bg-white/0 caret-[#00F4FF] focus:outline-0 focus:ring-0 text-white text-lg'
            placeholder='Input your sub-domin (only letters, numbers and dashes allowed)'
            value = {gatewayName}
            onChange = {((e) => {
              setGatewayName(e.target.value)})}
            > 
          </input>
          <div className='absolute top-0 right-0 z-10 px-4 py-3 hidden peer-focus:block'>
            <button onClick={CreateGateway}>
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
  )
}


export function GatewaySelect() {

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
        <GatewayInput/>
      </div>
      <GatewayList
        gatewayItemList={GatewayInialList}
      />
    </div>
  )
}