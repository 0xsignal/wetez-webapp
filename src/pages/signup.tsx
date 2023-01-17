import React from 'react';
import { Meta } from '../components/Meta';
import Link from 'next/link';

export default function Signup() {
  
  return(
    <>
      <Meta
          title=''
          description=''
          image=''
        />
        <div className='flex bg-[#182036]'>
          <div className="w-2/5 bg-white/5">
            <div className="px-20 py-10 h-screen flex flex-col justify-center">
              <img src="/image/wetez_logo.png" className='w-24 h-auto'/>
              <img src="/image/signup_cover_icon.png" className='w-96 h-auto mt-16'/>
              <h2 className='text-2xl font-brand text-white mt-12'> Welcome Back</h2>
              <p className='text-lg text-white/50 mt-8 leading-relaxed'>
                Wetez is the Crypto Infra Provider since 2018, our vision is to leading the Web3 infrastructure future in crypto world, make Web3 accessible for everyone.
              </p>
            </div>
          </div>
          <div className='grow flex flex-col py-12 px-20 h-screen relative'>
            <div className='text-white/50 text-lg mt-4 absolute right-20'>
              Need Help?
            </div>
            <div className='grow flex flex-col justify-center mx-auto w-[400px] mt-16'>
              <h1 className='text-3xl text-white font-brand'> Sign Up </h1>
              <div className='text-lg text-white font-bold mt-8'>
                Email
              </div>
              <input type='email' className='rounded-[16px] border-[1px] border-white/20 text-lg text-white/30 w-[400px] px-6 py-2 bg-white/0 mt-4'>
              </input>
              <div className='text-lg text-white font-bold mt-4'>
                Password
              </div>
              <input type='password' className='rounded-[16px] border-[1px] border-white/20 text-lg text-white/30 w-[400px] px-6 py-2 bg-white/0 mt-4'>
              </input>
              <div className='text-lg text-white font-bold mt-4'>
                Confirm Password
              </div>
              <input type='password' className='rounded-[16px] border-[1px] border-white/20 text-lg text-white/30 w-[400px] px-6 py-2 bg-white/0 mt-4'>
              </input>
              
              <div className='mt-10'>
                <button className='bg-[#2A23FF] w-full text-white text-center py-3 text-lg rounded-[28px]'>
                  Sign Up
                </button>
              </div>
            </div>
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