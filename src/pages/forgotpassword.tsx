import React from 'react';
import{ useCallback } from 'react';
import { Meta } from '../components/Meta';
import Link from 'next/link';
import { SlideHero } from '../components/Hero/SlideHero';
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from "react";
import Captcha from '../components/Captcha/Captcha';
import { useRouter } from 'next/router';
import ButtonLoading from '../components/Button/ButtonLoading';
import { SendEmailLink } from '../api/auth';


export default function ForgetPassword(){

  const [email, setEmail] = useState<string>('')

  const [token, setToken] = useState<string>('')
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  const [loading,setLoading] = useState(false)
  const [emailError, setEmailError] = useState<string>('')
  const [isSend,setIsSend] = useState<boolean>(false)
  const router = useRouter();


  const onVerify = useCallback((token:string) => {
    setToken(token);
  },[]);

  const valid:boolean = (email != '')

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

  const index = email?.indexOf('@') || 0
  const address = email?.slice(index+1)
  const emailDomain = 'https://' + address

  const sendEmailLink = async () =>{
    const data = {
      reCaptchaToken:token,
      email:email,
    }
    setLoading(true);
    const res = await SendEmailLink(data)
    setRefreshReCaptcha(r => !r)
    setIsSend(true)
    setLoading(false)
  }

  if(isSend){
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
            <div className='grow flex flex-col justify-center mx-auto w-[600px] mt-16'>
              <div className='bg-white/5 rounded-[24px] mx-auto my-auto'>
                <div className='px-12 py-12'>
                <div className='text-center text-3xl text-white font-brand'>
                  Email has been sent
                </div>
                <div className='mt-6 text-base text-white/50 tracking-wide leading-relaxed'>
                  The reset password email has been sent to your email address, and the email is valid for 24 hours. Please log in to your mailbox in time and click the link in the email to reset your password.
                </div>
                <div className='flex gap-x-6 mt-12 items-center justify-center'>
                  <div className='bg-[#2A23FF] w-2/5 text-white py-3 text-lg rounded-[23px] text-center'>
                    <Link href={emailDomain} target='_blank'>
                      Check Email
                    </Link>
                  </div>
                  <div className='w-2/5 text-white text-center py-3 text-lg rounded-[23px] border-[1px] border-white/20'>
                    <Link href='/login'>
                      Go Homepage
                    </Link>
                  </div>
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
                <h1 className='text-3xl text-white font-brand'> Forgot Password </h1>
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
                <div className='mt-10'>
                  <GoogleReCaptcha
                    onVerify={onVerify}
                    refreshReCaptcha={refreshReCaptcha}
                    action='sendForgetPasswordEmail'
                  />
                  <button 
                    className='inline-flex justify-center items-center bg-[#2A23FF] w-full text-white text-center py-3 text-lg rounded-[28px] disabled:bg-white/20' 
                    onClick={sendEmailLink}
                    disabled={!valid}
                  >
                    <ButtonLoading
                      loading={loading}
                    />
                    Send Reset Link
                  </button>
                </div>
              </Captcha>
            </div>
          </div>
        </div>
    </>
  )
}