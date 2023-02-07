import React from 'react';
import { CaptchaFooter } from '../Captcha/CaptchaFooter';

type SlideHeroProps = {
  coverImage?: string,
  imageStyle?: string,
  title?: string,
  description?: string,
}

export  function SlideHero({
  coverImage = '/image/signup_cover_icon.png',
  imageStyle = 'w-96 h-auto mt-16',
  title = 'Welcome Back',
  description = 'Wetez is the Crypto Infra Provider since 2018, our vision is to leading the Web3 infrastructure future in crypto world, make Web3 accessible for everyone.',
  }:SlideHeroProps) {
  return(
    <div className="w-2/5 bg-white/5">
      <div className="px-20 py-10 h-screen flex flex-col justify-center">
        <img src="/image/wetez_logo.png" className='w-24 h-auto'/>
        <img src={coverImage} className={imageStyle}/>
        <h2 className='text-2xl font-brand text-white mt-12'> {title} </h2>
        <p className='text-lg text-white/50 mt-8 leading-relaxed'>
          {description}
        </p>
        <div className='mt-10'>
          <CaptchaFooter/>
        </div>
      </div>
    </div>
  )

}