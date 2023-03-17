import React, { useEffect, useState } from 'react';
import { Meta } from '../components/Meta'
import { Menu } from '../components/Menu'
import { Header } from '../components/Header'
import { useAccountInfo } from 'src/api/setting';
import EmailEdit from 'src/components/Form/EmailEdit';
import Captcha from '../components/Captcha/Captcha';
import NameEdit from 'src/components/Form/NameEdit';
import PasswordEdit from 'src/components/Form/PasswordEdit';
import { CaptchaFooter } from 'src/components/Captcha/CaptchaFooter';
import SettingsSkethon from 'src/components/Skethon/SettingsSkethon';
import { getUserSession } from 'src/lib/storage';
import { useRouter } from 'next/router';


export default function Settings() {

  const [isReady,setIsReady] = useState(false)

  const {
    data: userInfoData,
    loading: userInfoLoading,
    error: userInfoError,
  } = useAccountInfo(isReady)

  const router = useRouter()
  const authorization = getUserSession()
  useEffect(()=>{
    if(authorization){
      setIsReady(true)
    }
    else{
      router.replace('/login')
    }
  },[authorization])

  if(userInfoLoading){
    return <SettingsSkethon/>
  }

  return(
    <>
      <Meta
        title='Setting'
        description=''
        image=''
      />
      <div className='flex'>
        <Menu/>
        <div className='grow bg-[#182036] pl-10 pr-16 pb-20 overflow-y-auto h-screen'>
          <div className='max-w-6xl mx-auto'>
          <Header
            title="Settings"
            description="Account Settings : name, email and password"
            url = ''
            back = {false}
            backTitle = ""
            backUrl=""
          />
          <Captcha>
            <div className='mt-10'>
              <div className='bg-white/5 rounded-[24px] px-6 py-6'>
                <NameEdit
                  name = {userInfoData?.name}
                />
              <div className='mt-10 border-[0.5px] border-white/10'></div>
              <div className='mt-10'>
                <EmailEdit
                  email = {userInfoData?.email}
                />
              </div>
              <div className='mt-10 border-[0.5px] border-white/10'></div>
              <div className='mt-10'>
                <PasswordEdit
                />
              </div>
                
              </div>
              <div className='mt-12 text-center'>
                <CaptchaFooter/>
              </div>
            </div>
          </Captcha>
          
        </div>
      </div>
    </div>
    </>
  )

}
