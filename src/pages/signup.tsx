import React, { useCallback,useEffect } from 'react';
import { Meta } from '../components/Meta';
import Link from 'next/link';
import { SlideHero } from '../components/Hero/SlideHero';
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from "react";
import Captcha from '../components/Captcha/Captcha';
import { Register } from '../api/auth';
import { useRouter } from 'next/router';
import ButtonLoading from 'src/components/ButtonLoading';
import { getUserSession } from 'src/lib/storage';

export default function Signup() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  const [token, setToken] = useState<string>('');
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  const [loading,setLoading] = useState(false)
  const userSesstion = getUserSession()

  const router = useRouter()

  const onVerify = useCallback((token:string) => {
    setToken(token);
  },[]);

  useEffect(()=>{
    if(userSesstion){
      router.replace('/dashboard')
    }
  })

  const valid:boolean = 
    (email != '') && (password != '') && 
    (confirmPassword != '') && (emailError == '') &&
    (passwordError == '') && (confirmPasswordError == '')


  function checkEmail(input: string){
    const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
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

  const register = async () => {
    const data = {
      reCaptchaToken:token,
      email:email,
      password:password
    }
    setLoading(true);
    const registerResult = await Register(data);
    router.replace({pathname:'/onboard',query:{email:email},});
    setRefreshReCaptcha(r => !r);
    setLoading(false);

  }
  return(
    <>
      <Meta
          title=''
          description=''
          image=''
        />
        <div className='flex bg-[#182036]'>
          <SlideHero
            coverImage = '/image/signup_cover_icon.png'
            imageStyle = 'w-96 h-auto mt-16'
            title = 'Welcome Back'
            description = 'Wetez is the Crypto Infra Provider since 2018, our vision is to leading the Web3 infrastructure future in crypto world, make Web3 accessible for everyone.'
          />
          <div className='grow flex flex-col py-12 px-20 h-screen relative'>
            <div className='text-white/50 text-lg mt-4 absolute right-20'>
              Need Help?
            </div>
            <Captcha>
              <div className='grow flex flex-col justify-center mx-auto w-[400px] mt-16'>
                <h1 className='text-3xl text-white font-brand'> Sign Up </h1>
                  <div className='text-lg text-white font-bold mt-8'>
                    Email
                  </div>
                  <input 
                    type='email'
                    value={email}
                    onChange={((e) => {
                      setEmail(e.target.value);
                      checkEmail(e.target.value);
                    })}
                    placeholder = 'Enter Email Address'
                    className='rounded-[16px] border-[1px] border-white/20 text-lg text-white w-[400px] px-6 py-2 bg-white/0 mt-4 placeholder:text-lg placeholder:text-white/30 caret-[#00F4FF]'>
                  </input>
                  <p className="mt-1 text-[#FF4DB8] text-sm">{emailError || ''}</p>
                  <div className='text-lg text-white font-bold mt-4'>
                    Password
                  </div>
                  <input
                    type='password'
                    value={password}
                    onChange={((e) => {
                      setPassword(e.target.value);
                      checkPassword(e.target.value);
                    })}
                    placeholder='Enter Password'
                    className='rounded-[16px] border-[1px] border-white/20 text-lg text-white w-[400px] px-6 py-2 bg-white/0 mt-4 placeholder:text-lg placeholder:text-white/30 caret-[#00F4FF]'>
                  </input>
                  <p className="mt-1 text-[#FF4DB8] text-sm">{passwordError || ''}</p>
                  <div className='text-lg text-white font-bold mt-4'>
                    Confirm Password
                  </div>
                  <input 
                    type='password'
                    value={confirmPassword}
                    onChange={((e) => {
                      setConfirmPassword(e.target.value);
                      checkConfirmPassword(e.target.value);
                    })}
                    placeholder='Enter Password Again' 
                    className='rounded-[16px] border-[1px] border-white/20 text-lg text-white w-[400px] px-6 py-2 bg-white/0 mt-4 placeholder:text-lg placeholder:text-white/30 caret-[#00F4FF]'>
                  </input>
                  <p className="mt-1 text-[#FF4DB8] text-sm">{confirmPasswordError || ''}</p>
                  <div className='mt-10'>
                    <GoogleReCaptcha
                      onVerify={onVerify}
                      refreshReCaptcha={refreshReCaptcha}
                      action='register'
                    />
                    <button 
                      className='inline-flex justify-center items-center bg-[#2A23FF] w-full text-white text-center py-3 text-lg rounded-[28px] disabled:bg-white/20' 
                      onClick={register}
                      disabled={!valid}
                      >
                        <ButtonLoading
                          loading={loading}
                        />
                      Sign Up
                    </button>
                  </div>
              </div>
            </Captcha>
            <div className='grow'>
            
            </div>
            <div className=''>
              <Link href='/login'>
                <div className='text-lg text-[#00F4FF] text-center'>
                  Already have account? Go to Login
                </div>
              </Link>
            </div>
          </div>
        </div>
    </>
  )

}