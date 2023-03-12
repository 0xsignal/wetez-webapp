import React, { useState } from "react";

type EmailEditProps ={
  isEdit: boolean,
  email: string,
}

export default function EmailEdit({
  isEdit = false,
  email = '',
}:EmailEditProps){

  const [newEmail,setNewEmail] = useState<string>('')
  const [oldEmailCode,setOldEmailCode] = useState<string>('')
  const [newEmailCode,setNewEmailCode] = useState<string>('')
  const [isOldEmailCodeSent,setIsOldEmailCodeSent] = useState<boolean>(false)
  const [isNewEmailCodeSent,setIsNewEmailCodeSent] = useState<boolean>(false)




  if(isEdit){
    return(
      <>
        <div className="text-2xl text-white font-bold">
          Email Address
        </div>
        <div className="mt-6 text-base text-white/50">
          {email}
        </div>
        <div className="mt-6 rounded-[24px] bg-[#182036] border-[1px] border-[#9FADC7]/20 px-6 py-6">
          <div className="text-white text-lg font-bold">
            Email Verify Code
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <input 
              value={oldEmailCode}
              onChange={((e) => {
                setOldEmailCode(e.target.value);
              })}
              placeholder = 'Enter Email Verify Code'
              className='rounded-[16px] border-[1px] border-white/20 text-lg text-white w-[400px] px-6 py-2 bg-white/0 placeholder:text-lg placeholder:text-white/30 caret-[#00F4FF]'>
            </input>
            <button className="text-base text-[#2A23FF]">
              Send Code
            </button>
          </div>
          
          <div className="text-white text-base">
          </div>
        </div>
      </>
    )
  }

  return(
    <>
      <div className="mt-10 text-2xl text-white">
        Email Address
      </div>
      <div className="mt-6 text-base text-white/50">
        {email}
      </div>
    </>
  )

} 