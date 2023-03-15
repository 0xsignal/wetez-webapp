import React from "react";
import { toast } from 'react-toastify';

type CopyButtonProps = {
  text:string
}

export default function CopyButton({
  text = ''
}:CopyButtonProps){


  const copyText = async(text:string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copy Succeed !')
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
    </>
  )
}