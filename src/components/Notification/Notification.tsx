import React, { useEffect, useState } from 'react'
import { pass } from 'src/lib/fp'

type NotificationProps = {
  message: string,
  type: string
  isOpen: boolean,
  onClose: () => void,
}

export default function Notification({
  message = '',
  type = '',
  isOpen = false,
  onClose = pass,
}:NotificationProps){

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  const [isType,setIsType] = useState(type)

  useEffect(()=>{
    setIsType(type)
  },[type])

  if(isType == 'Success'){
    return(
    <>
      {isOpen && (
        <div className="fixed top-0 right-0 z-50 px-4 py-5 mx-10 my-10 bg-white/5 border-none shadow-md w-1/4 rounded-[16px]">
          <div className="flex items-center space-x-3">
            <img src='/image/success_notification.png' className='w-5'/>
            <p className="text-base text-white/50 grow">{message}</p>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
              <img src='/image/cancle_icon.png' className='w-5' />
            </button>
          </div>
        </div>
      )}
    </>
    )
  }
  
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 right-0 z-50 px-4 py-5 mx-10 my-6 bg-white/5 border-none shadow-md w-1/5 rounded-[16px]">
          <div className="flex items-center justify-between">
            <p className="text-base text-white/50">{message}</p>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
              <img src='/image/cancle_icon.png' className='w-5' />
            </button>
          </div>
        </div>
      )}
    </>
  )
}


