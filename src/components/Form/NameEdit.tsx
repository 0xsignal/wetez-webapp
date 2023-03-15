import React, { useState } from "react";
import { useEffect } from "react";
import { ChangeName } from "src/api/auth";

type NameEditProps ={
  name?: string,
}

export default function NameEdit({
  name = '',
}:NameEditProps){

  const [isEdit,setIsEdit] = useState<boolean>(false)
  const [oldName,setOldName] = useState<string>(name)
  const [newName,setNewName] = useState<string>('');
  const [nameError,setNameError] = useState<string>('');


  const Submit = async() => {
    const data = {
      name: newName,
    }
    const res = await ChangeName(data)
  }

  const InitData = () => {
    setNewName('')
  }

  const CheckName = (input: string) => {
    const regEmail = /^[a-zA-Z0-9_-]+$/
    if(input){
      if(regEmail.test(input)){
        setNameError("")
        return true
      } else{
        setNameError("Contains illegal characters")
        return false
      }
    } else {
      setNameError("Enter your new name")
      return false
    }
  }

  const valid:boolean = (newName != '') 

  if(isEdit){
    return(
      <>
        <div className="text-2xl text-white font-bold">
          Account Name
        </div>
        <div className="mt-6 text-lg text-white/80">
          {oldName}
        </div>
        <div 
          className="mt-6 text-base text-[#00F4FF] flex items-center space-x-3 cursor-pointer"
          onClick = {() => {
            setIsEdit(false)
            InitData()
          }}
        >
          <div className="">
            Change Name
          </div>
          <img src='/image/change_password_active.png' className="w-4 h-2"/>
        </div>
        <div className="mt-6 rounded-[24px] bg-[#182036] border-[1px] border-[#9FADC7]/20 px-6 py-6">
          <form onSubmit={()=>{
            return false
          }}>
          <div className="text-white text-lg font-bold">
            New User Name
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <input
              type='text' 
              value={newName}
              onChange={((e) => {
                setNewName(e.target.value);
              })}
              placeholder = 'Enter your new name'
              className='rounded-[16px] border-[1px] border-white/20 text-lg text-white w-[400px] px-6 py-2 bg-white/0 placeholder:text-lg placeholder:text-white/30 caret-[#00F4FF] focus:border-[0px]'>
            </input>
            <p className="mt-1 text-[#FF4DB8] text-sm">{nameError || ''}</p>
            </div>
            <button 
              className = "mt-10 mb-2 bg-[#2A23FF] text-white rounded-[24px] px-12 py-3 text-base  disabled:bg-white/20" 
              disabled = {!valid}
              type = "button"
              onClick={async() => {
                const res = await Submit()
                setOldName(newName)
                InitData()
                setIsEdit(false)}}
            >
              Save
            </button>
          </form>
        </div>
      </>
    )
  }

  return(
    <>
      <div className="text-2xl text-white font-bold">
        Account Name
      </div>
      <div className="mt-6 text-lg text-white/80">
        {oldName}
      </div>
      <div 
        className = "mt-6 text-base text-white/50 flex items-center space-x-3 cursor-pointer"
        onClick = {() => {
          setIsEdit(true)
        }}
        >
        <div className="">
          Change Name
        </div>
        <img src='/image/change_password_inactive.png' className="h-4 w-2"/>
      </div>
    </>
  )

} 