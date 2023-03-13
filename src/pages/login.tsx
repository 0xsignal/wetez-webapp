import React from 'react';
import{ useCallback } from 'react';
import { Meta } from '../components/Meta';
import Link from 'next/link';
import { SlideHero } from '../components/Hero/SlideHero';
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState,useEffect } from "react";
import Captcha from '../components/Captcha/Captcha';
import { useRouter } from 'next/router';
import ButtonLoading from '../components/ButtonLoading';
import { SignIn } from '../api/auth';
import { getUserSession } from 'src/lib/storage';


export default function Login(){

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [token, setToken] = useState<string>('');
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  const [loading,setLoading] = useState(false)
  const [emailError, setEmailError] = useState<string>('');

  const router = useRouter()
  const userSesstion = getUserSession()

  const onVerify = useCallback((token:string) => {
    setToken(token);
  },[]);

  const valid:boolean = (email != '') && (password != '')

  useEffect(()=>{
    if(userSesstion){
      router.replace('/dashboard')
    }
  },[userSesstion])

  function checkEmail(input: string){
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

  const login = async () =>{
    const data = {
      reCaptchaToken:token,
      email:email,
      password:password
    }
    setLoading(true);
    const loginResult = await SignIn(data);
    router.replace('/dashboard');
    setRefreshReCaptcha(r => !r);
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
              <Captcha>
                <h1 className='text-3xl text-white font-brand'> Login </h1>
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
                <div className='flex items-center mt-4'>
                  <div className='text-lg text-white font-bold'>
                    Password
                  </div>
                  <div className='grow'>
                  </div>
                  <div className='text-white/50 text-sm'>
                    <Link href='/forgotpassword'>
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <input 
                  type='password'
                  value={password}
                  onChange={((e) => {
                    setPassword(e.target.value);
                  })}
                  placeholder = 'Enter Password'
                  className='rounded-[16px] border-[1px] border-white/20 text-lg text-white w-[400px] px-6 py-2 bg-white/0 mt-4 placeholder:text-lg placeholder:text-white/30 caret-[#00F4FF]'>
                </input>
                <div className='mt-10'>
                  <GoogleReCaptcha
                    onVerify={onVerify}
                    refreshReCaptcha={refreshReCaptcha}
                    action='login'
                  />
                  <button 
                    className='inline-flex justify-center items-center bg-[#2A23FF] w-full text-white text-center py-3 text-lg rounded-[28px] disabled:bg-white/20' 
                    onClick={login}
                    disabled={!valid}
                  >
                    <ButtonLoading
                      loading={loading}
                    />
                    Sign In
                  </button>
                </div>
              </Captcha>
            </div>
            <div className='grow'>
            
            </div>
            <div className=''>
              <Link href='/signup'>
                <div className='text-lg text-[#00F4FF] text-center'>
                  Create New Account
                </div>
              </Link>
            </div>
          </div>
        </div>
    </>
  )
}