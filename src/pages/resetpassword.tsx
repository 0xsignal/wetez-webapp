import React from 'react';
import { Meta } from '../components/Meta';
import Link from 'next/link';
import { SlideHero } from '../components/Hero/SlideHero';
import { useState } from "react";
import { useRouter } from 'next/router';
import { ResetPassword } from '../api/auth';


export default function RestPassword(){

  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [passwordError,setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  const [isSet,setIsSet] = useState<boolean>(false)
  const router = useRouter();

  const token = String(router.query.token)

  const valid:boolean = (password != '') && (confirmPassword != '')
  
  const setResetPassword = async () => {
    const data = {
      token: token,
      newPassword: password,
    }
    const res = await ResetPassword(data)
    setIsSet(true)
  }

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
      if(input == password){
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

  if(isSet){
    return(
      <>
      <Meta
          title='Reset Password'
          description=''
          image=''
        />
        <div className='flex bg-[#182036]'>
          <SlideHero
            coverImage='/image/login_cover_icon.png'
            imageStyle='w-64 h-auto mt-16'
            title='Welcome Back'
            description='At Wetez, we believe in the decentralized Internet and powering the data infrastructure building it.'
          />
          <div className='grow flex flex-col py-12 px-20 h-screen relative'>
            <div className='text-white/50 text-lg mt-4 absolute right-20'>
              Need Help?
            </div>
            <div className='grow flex flex-col justify-center mx-auto w-[600px] mt-16'>
              <div className='bg-white/5 rounded-[24px] mx-auto my-auto'>
                <div className='px-12 py-12'>
                <div className='text-center text-3xl text-white font-brand'>
                  Congratulations!
                </div>
                <div className='mt-6 text-base text-white/50 tracking-wide leading-relaxed'>
                  Your account password has been reset. Please click the button below to log in.
                </div>
                <div className='mt-8 w-full text-white text-center py-3 text-lg rounded-[24px] bg-[#2A23FF]'>
                  <Link href='/login'>
                    Go Login
                  </Link>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return(
    <>
      <Meta
          title='Reset Password'
          description=''
          image=''
        />
        <div className='flex bg-[#182036]'>
          <SlideHero
            coverImage='/image/login_cover_icon.png'
            imageStyle='w-64 h-auto mt-16'
            title='Welcome Back'
            description='At Wetez, we believe in the decentralized Internet and powering the data infrastructure building it.'
          />
          <div className='grow flex flex-col py-12 px-20 h-screen relative'>
            <div className='text-white/50 text-lg mt-4 absolute right-20'>
              Need Help?
            </div>
            <div className='grow flex flex-col justify-center mx-auto w-[400px] mt-16'>
                <h1 className='text-3xl text-white font-brand'> Reset Password </h1>
                <div className='text-lg text-white font-bold mt-8'>
                  New Password
                </div>
                <input 
                  type='text'
                  value={password}
                  onChange={((e) => {
                    setPassword(e.target.value);
                    checkPassword(e.target.value);
                  })}
                  placeholder = 'Enter New Password'
                  className='rounded-[16px] border-[1px] border-white/20 text-lg text-white w-[400px] px-6 py-2 bg-white/0 mt-4 placeholder:text-lg placeholder:text-white/30 caret-[#00F4FF]'>
                </input>
                <p className="mt-1 text-[#FF4DB8] text-sm">{passwordError || ''}</p>
                <div className='text-lg text-white font-bold mt-6'>
                  Confirm New Password
                </div>
                <input 
                  type='text'
                  value={password}
                  onChange={((e) => {
                    setConfirmPassword(e.target.value);
                    checkConfirmPassword(e.target.value);
                  })}
                  placeholder = 'Confirm New Password'
                  className='rounded-[16px] border-[1px] border-white/20 text-lg text-white w-[400px] px-6 py-2 bg-white/0 mt-4 placeholder:text-lg placeholder:text-white/30 caret-[#00F4FF]'>
                </input>
                <p className="mt-1 text-[#FF4DB8] text-sm">{confirmPasswordError || ''}</p>
                <div className='mt-10'>
                  <button 
                    className='inline-flex justify-center items-center bg-[#2A23FF] w-full text-white text-center py-3 text-lg rounded-[28px] disabled:bg-white/20' 
                    onClick={setResetPassword}
                    disabled={!valid}
                  >
                    Reset Password
                  </button>
                </div>
            </div>
          </div>
        </div>
    </>
  )
}