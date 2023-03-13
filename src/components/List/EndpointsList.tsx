import React, { useState } from 'react';
import { EndpointModal } from '../Modal/EndpintModal';
import CopyButton from '../Button/CopyButton';

type EndpontsListProp = {
  endpoints : string[]
}

export const EndpontsList = ({
  endpoints = [
]}:EndpontsListProp) =>{

  let length = endpoints.length

  const [isOpen,setIsOpen] = useState(false)

  if(length < 3){
    return(
      <div className=''>
        <div className='text-2xl text-white font-bold'>
          Endpoints
        </div>
        {endpoints.map((item,index) => (
          <div className='mt-4 flex items-center' key={index}>
            <div className='text-white/50 text-base w-3/4 break-words'>
              {item}
            </div>
            <div className='grow'>
            </div>
            <CopyButton
              text = {item}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className=''>
      <EndpointModal
        isOpen = {isOpen}
        enpointList = {endpoints}
        closeModal ={()=>
          setIsOpen(false)
        }

      />
      <div className='flex items-center space-x-4'>
        <div className='text-2xl text-white font-bold'>
          Endpoints
        </div>
        <button onClick={()=>{setIsOpen(true)}}>
          <img src='/image/change_password_inactive.png' className='w-2'/>
        </button>
      </div>
      
        {endpoints.slice(0,2).map((item,index) => (
          <div className='mt-4 flex items-center' key={index}>
            <div className='text-white/50 text-base w-3/4 break-words'>
              {item}
            </div>
            <div className='grow'>
            </div>
            <CopyButton
              text={item}
            />
          </div>
        ))}
      </div>
  )
}