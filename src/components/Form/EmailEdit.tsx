import React, { useCallback, useState } from "react";
import { SendEmailCode } from "src/api/auth";
import { useEffect } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { ChangeEmail } from "src/api/auth";

type EmailEditProps ={
  email?: string,
}

export default function EmailEdit({
  email = '',
}:EmailEditProps){

  const [isEdit,setIsEdit] = useState<boolean>(false)
  const [oldEmail,setOldEmail] = useState<string>(email)
  const [newEmail,setNewEmail] = useState<string>('');
  const [oldEmailCode,setOldEmailCode] = useState<string>('');
  const [newEmailCode,setNewEmailCode] = useState<string>('');
  const [isOldEmailCodeSent,setIsOldEmailCodeSent] = useState<boolean>(false);
  const [isNewEmailCodeSent,setIsNewEmailCodeSent] = useState<boolean>(false);
  const [oldEmailCodeTimer, setOldEmailCodeTimer] = useState(0);
  const [newEmailCodeTimer, setNewEmailCodeTimer] = useState(0);
  const [token, setToken] = useState<string>('');
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [emailError,setEmailError] = useState('');

  useEffect(() => {
    let timer:any

    if (oldEmailCodeTimer > 0) {
      timer = setTimeout(() => {
        setOldEmailCodeTimer(oldEmailCodeTimer - 1)
      }, 1000)
      if(oldEmailCodeTimer == 1){
        setIsOldEmailCodeSent(false)
      }
    }
    return () => clearTimeout(timer)
  }, [oldEmailCodeTimer])

  useEffect(() => {
    let timer:any

    if (newEmailCodeTimer > 0) {
      timer = setTimeout(() => {
        setNewEmailCodeTimer(newEmailCodeTimer - 1)
      }, 1000)
      if(newEmailCodeTimer == 1){
        setIsNewEmailCodeSent(false)
      }
    }
    return () => clearTimeout(timer)
  }, [newEmailCodeTimer])

  const CheckEmail = (input: string) => {
    const regEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i
    if(input){
      if(regEmail.test(input)){
        setEmailError("")
        return true
      } else{
        setEmailError("Email is invalid")
        return false
      }
    } else {
      setEmailError("Enter your email")
      return false
    }
  }

  const onVerify = useCallback((token:string) => {
    setToken(token);
  },[]);

  const SendEmailCodeAction = async() => {
    const data ={
      reCaptchaToken:token,
      email:email,
    }
    const SendEmailCodeResult = await SendEmailCode(data);
    setRefreshReCaptcha(r => !r);
  }

  const Submit = async() => {
    const data = {
      email:newEmail,
      oldEmailVerifyCode: oldEmailCode,
      newEmailVerifyCode: newEmailCode,
    }
    const res = await ChangeEmail(data)
  }

  const InitData = () => {
    setNewEmail('')
    setEmailError('')
    setOldEmailCode('')
    setNewEmailCode('')
    setIsNewEmailCodeSent(false)
    setIsOldEmailCodeSent(false)
    setNewEmailCodeTimer(0)
    setOldEmailCodeTimer(0)
  }

  const valid:boolean = 
    (newEmail != '') && (oldEmailCode != '') && (newEmailCode != '') && (emailError == '') 

  if(isEdit){
    return(
      <>
        <div className="text-2xl text-white font-bold">
          Email Address
        </div>
        <div className="mt-6 text-lg text-white/80">
          {oldEmail}
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
          <div className="text-white text-lg font-bold">
            Email Verify Code
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <input
              type='text' 
              value={oldEmailCode}
              onChange={((e) => {
                setOldEmailCode(e.target.value);
              })}
              placeholder = 'Enter Email Verify Code'
              className='rounded-[16px] border-[1px] border-white/20 text-lg text-white w-[400px] px-6 py-2 bg-white/0 placeholder:text-lg placeholder:text-white/30 caret-[#00F4FF] focus:border-[0px]'>
            </input>
            <GoogleReCaptcha
              onVerify={onVerify}
              refreshReCaptcha={refreshReCaptcha}
              action='sendUpdateUserEmail'
            />
            <button 
              className = "text-base text-[#00F4FF] font-medium"
              disabled = {isOldEmailCodeSent}
              type = "button"
              onClick = {async () => {
                const res = await SendEmailCodeAction()
                setRefreshReCaptcha(r => !r)
                setIsOldEmailCodeSent(true)
                setOldEmailCodeTimer(60)
                console.log(isOldEmailCodeSent)
              }}
              >
              {isOldEmailCodeSent?`${oldEmailCodeTimer}s`:'Send Code'}
            </button>
          </div>

          <div className="text-white text-lg font-bold mt-6">
            New Email Address
          </div>
          <input
              type='Email' 
              value={newEmail}
              onChange={((e) => {
                setNewEmail(e.target.value)
                CheckEmail(e.target.value)
              })}
              placeholder = 'Enter New Email Address'
              className='mt-4 rounded-[16px] border-[1px] border-white/20 text-lg text-white w-[400px] px-6 py-2 bg-white/0 placeholder:text-lg placeholder:text-white/30 caret-[#00F4FF] focus:border-[0px]'>
            </input>
            <p className="mt-1 text-[#FF4DB8] text-sm">{emailError || ''}</p>
            <div className="text-white text-lg font-bold mt-6">
              New Email Verify Code
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <input
                type='text' 
                value={newEmailCode}
                onChange={((e) => {
                  setNewEmailCode(e.target.value);
                })}
                placeholder = 'Enter New Email Verify Code'
                className='rounded-[16px] border-[1px] border-white/20 text-lg text-white w-[400px] px-6 py-2 bg-white/0 placeholder:text-lg placeholder:text-white/30 caret-[#00F4FF] focus:border-[0px]'>
              </input>
              <GoogleReCaptcha
                onVerify={onVerify}
                refreshReCaptcha={refreshReCaptcha}
                action='sendUpdateUserEmail'
              />
              <button 
                className = "text-base text-[#00F4FF] font-medium"
                disabled = {isNewEmailCodeSent}
                type = "button"
                onClick = {async () => {
                  const res = await SendEmailCodeAction()
                  setRefreshReCaptcha(r => !r)
                  setIsNewEmailCodeSent(true)
                  setNewEmailCodeTimer(60)
                }}
                >
                {isNewEmailCodeSent?`${newEmailCodeTimer}s`:'Send Code'}
              </button>
            </div> 
            <button 
              className = "mt-10 mb-2 bg-[#2A23FF] text-white rounded-[24px] px-12 py-3 text-base  disabled:bg-white/20" 
              disabled = {!valid}
              type = "button"
              onClick={async () => {
                const res = await SendEmailCodeAction()
                setRefreshReCaptcha(r => !r)
                setIsOldEmailCodeSent(true)
                setOldEmailCodeTimer(60)
                console.log(isOldEmailCodeSent)
              }}
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
        Email Address
      </div>
      <div className="mt-6 text-lg text-white/80">
        {email}
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