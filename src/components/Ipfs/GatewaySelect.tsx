import React from 'react';
import Link from 'next/link';
import { useState } from 'react'
import { RadioGroup} from '@headlessui/react'

const GatewayInialList = [
  {
    name: 'http://shhdhdhduuuuuudgddhhhhhhddddd.wetez-ipfs.io',
    id: 1,
    active: false
  },
  {
    name: 'http://shhdhdhduuuuuudgddhhhhhhddddd.wetez-ipfs.io',
    id: 2,
    active: false
  },
  {
    name: 'http://shhdhdhduuuuuudgddhhhhhhddddd.wetez-ipfs.io',
    id: 3,
    active: true
  }
]

function GatewayItem(){

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
    iniGatewayData()
  }

  function DelateGateway(){
    
  }

  return(
    <div className='flex space-x-3 pr-24'>
      <div className='text-lg text-white/50'>
        https://
      </div>
      <div className='grow'>
        <div className='relative group'>
          <input 
            type='url'
            className='pr-12 rounded-[16px] border-[1px] border-white/20 px-6 py-3'
            placeholder='Input your sub-domin (only letters, numbers and dashes allowed)'
            value = {gatewayName}
            onChange = {((e) => {
              setGatewayName(e.target.value)})}
            > 
          </input>
          <div className='hidden group-active:block'>
            <button onClick={CreateGateway}>
              <img src="/image/gateway_add_active.png" className='w-4'/>
            </button>
          </div>
          <div className='block group-active:hidden'>
            <img src="/image/gateway_add_inactive.png" className='w-4'/>
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
    </div>
  )
}