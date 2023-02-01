import React from 'react';
import Link from 'next/link';
import { useState } from 'react'
import { GatewayInput } from './GatewayInput';
import { GatewayList } from './GatewayList';

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

let nextId = 4;

export function GatewaySelect() {

  const [gatewayList,setGatewayList] = useState(GatewayInialList);

  function addGateway(gatewayName:string){
    setGatewayList([
      ...gatewayList,
      {
        id: nextId++,
        name: 'https://' + gatewayName + '.wetez-ipfs.io',
        active: false,
      }
    ]);
  }

  function delateGateway(gatewayId?:number){
    setGatewayList(
      gatewayList.filter(t => t.id !== gatewayId)
    );
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
          addGateway = {addGateway}
        />
      </div>
      <GatewayList
        gatewayItemList={gatewayList}
        deleteGateway={delateGateway}
      />
    </div>
  )
}