import React from 'react';
import { useState } from 'react'
import { pass } from '../../lib/fp';

type GatewayInputProps = {
  addGateway:(gateway:string) => void
}

export function GatewayInput({
  addGateway = pass
}:GatewayInputProps){

    const [gatewayName,setGatewayName] = useState<string>('')    
  
    return(
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
              <button className='outline-none' onClick={() => {
                setGatewayName('');
                addGateway(gatewayName);
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
    )
}