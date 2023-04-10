import React from 'react';
import Link from 'next/link';

export default function Contact() {
  
  return(
    <div className='bg-white/5 rounded-[24px] px-10 py-6 text-center'>
      <h2 className='text-white font-bold text-2xl'>
        Personalized Plan
      </h2>
      <p className='text-lg text-white/50 mt-4 tracking-wide'>
        For serious projects, brands, and organizations that require enterprise-grade features, custom packaging, and 1:1 support.
      </p>
      <Link href="mailto:contact@wetez.io">
        <div className='w-1/2 rounded-[26px] text-center text-white/50 mx-auto px-16 py-3 border-[1px] border-white/20 mt-6 cursor-pointer'>
            Contact Us
        </div>
      </Link>
      
    </div>
  )

}