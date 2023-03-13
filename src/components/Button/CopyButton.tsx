import React from "react";
import Notification from "../Notification/Notification";
import { useState } from "react";

type CopyButtonProps = {
  text:string
}

export default function CopyButton({
  text = ''
}:CopyButtonProps){

  const [isOpen,setIsOpen] = useState<boolean>(false)
  const [message,setMessage] = useState<string>('')

  const copyText = async(text:string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsOpen(true)
      setMessage('Copy Succeed!')
    } catch (err) {
    }
  }

  return(
    <>
      <button
        className='rounded-full bg-[#9FADC7]/10 p-1.5'
        onClick={(async() => {
          await copyText(text)
        })}
      >
        <img src="/image/copy_icon.png" className='h-4'/>
        
      </button>
      <Notification
        isOpen = {isOpen}
        type = 'Success'
        message = {message}
        onClose = {()=>{
          setIsOpen(false)}
        }
      />
    </>
  )
}