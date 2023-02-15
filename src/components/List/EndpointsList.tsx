import React from 'react';

type EndpontsListProp = {
  endpoints : string[]
}

export const EndpontsList = ({
  endpoints = [
]}:EndpontsListProp) =>{

  let length = endpoints.length

  if(length < 3){
    return(
      <div className=''>
        {endpoints.map((item,index) => (
          <div className='mt-4 flex items-center' key={index}>
            <div className='text-white/50 text-base w-3/4 break-words'>
              {item}
            </div>
            <div className='grow'>
            </div>
            <div className=''>
              <img src="/image/copy_bg_icon.png" className='h-8'/>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className=''>
      
    </div>
  )
}