import React from 'react';
import Link from 'next/link';

export function CaptchaFooter(){
  return(
    <div className='text-sm text-white/10 tracking-wider'>
      This site is protected by reCAPTCHA and the Google
      <Link href="https://policies.google.com/privacy" target='_blank' className="before:content-['_'] after:content-['_']">
        Privacy Policy
      </Link> 
        and
      <Link href="https://policies.google.com/terms" target='_blank' className="before:content-['_'] after:content-['_']">
        Terms of Service
      </Link> 
      apply.
    </div>
  )
}