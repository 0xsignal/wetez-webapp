import React, { useCallback, useState } from "react";
import { SendEmailCode } from "src/api/auth";
import { useEffect } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { ChangePassword } from "src/api/auth";


export default function PasswordEdit(){

  const [isEdit,setIsEdit] = useState<boolean>(false)
  const [oldPassword,setOldPassword] = useState<string>('')
  const [newPassword,setNewPassword] = useState<string>('')
  const [confirmPassword,setConfirmPassword] = useState<string>('')
  
  const [token, setToken] = useState<string>('');
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [passwordError,setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');


  function checkPassword(input: string){
    const regPassword = /^(?=.*[A-Z])(?=.*[a-z0-9])[!-~]{8,}$/
    if(input){
      if(regPassword.test(input)){
        setPasswordError("")
        return true
      } else{
        setPasswordError("Password at least 8 characters and 1 uppercase letter.")
        return false
      }
    } else {
      setPasswordError("Please enter a password")
      return false
    }
  }

  function checkConfirmPassword(input: string){
    if(input){
      if(input == newPassword){
        setConfirmPasswordError('')
        return true
      } else {
        setConfirmPasswordError('Password inconsistencies')
        return false
      }
    } else {
      setConfirmPasswordError('Please enter confirm password')
    }
  }

  const onVerify = useCallback((token:string) => {
    setToken(token);
  },[]);


  const Submit = async() => {
    const data = {
      reCaptchaToken: token,
      oldPassword: oldPassword,
      newPassword: newPassword,
    }
    const res = await ChangePassword(data)
  }

  const InitData = () => {
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setPasswordError('')
    setConfirmPasswordError('')
  }

  const valid:boolean = 
    (oldPassword != '') && (confirmPassword != '') && (passwordError == '') && (confirmPasswordError == '')
    && (newPassword != '')

  
  if(isEdit){
    return(
      <>
        <div className="text-2xl text-white font-bold">
          Account Password
        </div>
        <div className="mt-6 text-lg text-white/80">
          ***************
        </div>
        <div 
          className="mt-6 text-base text-[#00F4FF] flex items-center space-x-3 cursor-pointer"
          onClick = {() => {
            setIsEdit(false)
            InitData()
          }}
        >
          <div className="">
            Change Password
          </div>
          <img src='/image/change_password_active.png' className="w-4"/>
        </div>
        <div className="mt-6 rounded-[24px] bg-[#182036] border-[1px] border-[#9FADC7]/20 px-6 py-6">
          <form>

          <div className="text-white text-lg font-bold mt-6">
            Current Password
          </div>
          <input
            type='text' 
            value={oldPassword}
            onChange={((e) => {
              setOldPassword(e.target.value)
            })}
            placeholder = 'Enter Current Password'
            className='mt-4 rounded-[16px] border-[1px] border-white/20 text-lg text-white w-[400px] px-6 py-2 bg-white/0 placeholder:text-lg placeholder:text-white/30 caret-[#00F4FF] focus:border-[0px]'>
          </input>
          <div className="text-white text-lg font-bold mt-6">
            New Password
          </div>
          <input
            type='text' 
            value={newPassword}
            onChange={((e) => {
              setNewPassword(e.target.value)
            })}
            placeholder = 'Enter New Password'
            className='mt-4 rounded-[16px] border-[1px] border-white/20 text-lg text-white w-[400px] px-6 py-2 bg-white/0 placeholder:text-lg placeholder:text-white/30 caret-[#00F4FF] focus:border-[0px]'>
          </input>
          <p className="mt-1 text-[#FF4DB8] text-sm">{passwordError || ''}</p>
          <div className="text-white text-lg font-bold mt-6">
            Confirm New Password
          </div>
          <input
            type='text' 
            value={confirmPassword}
            onChange={((e) => {
              setConfirmPassword(e.target.value)
              checkConfirmPassword(e.target.value)
            })}
            placeholder = 'Confirm New Password'
            className='mt-4 rounded-[16px] border-[1px] border-white/20 text-lg text-white w-[400px] px-6 py-2 bg-white/0 placeholder:text-lg placeholder:text-white/30 caret-[#00F4FF] focus:border-[0px]'>
          </input>
          <p className="mt-1 text-[#FF4DB8] text-sm">{confirmPasswordError || ''}</p>
          <div className="">
            <GoogleReCaptcha
              onVerify={onVerify}
              refreshReCaptcha={refreshReCaptcha}
              action='changePassword'
            />
            <button 
              className = "mt-10 mb-2 bg-[#2A23FF] text-white rounded-[24px] px-12 py-3 text-base  disabled:bg-white/20" 
              disabled = {!valid}
              type = "button"
              onClick={async () => {
                const res = await Submit()
                setRefreshReCaptcha(r => !r)
                InitData()
                setIsEdit(false)  
              }}
            >
            Save
          </button>
          </div>
          
          </form>
        </div>
      </>
    )
  }

  return(
    <>
      <div className="text-2xl text-white font-bold">
        Account Password
      </div>
      <div className="mt-6 text-lg text-white/80">
        ***************
      </div>
      <div 
        className = "mt-6 text-base text-white/50 flex items-center space-x-3 cursor-pointer"
        onClick = {() => {
          setIsEdit(true)
        }}
        >
        <div className="">
          Change Password
        </div>
        <img src='/image/change_password_inactive.png' className="h-4"/>
      </div>
    </>
  )

} 