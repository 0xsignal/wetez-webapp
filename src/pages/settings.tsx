import React from 'react';
import { Meta } from '../components/Meta'
import { Menu } from '../components/Menu'
import { Header } from '../components/Header'
import { AccountPassword } from '../components/Settings/AccountPassword';
import { useState } from 'react';
import { useUserrInfo } from 'src/api/premium';
import EmailEdit from 'src/components/Form/EmailEdit';

export default function Settings() {

  const [isEditing, setIsEditing] = useState(false);

  const {
    data: userInfoData,
    loading: userInfoLoading,
    error: userInfoError,
  } = useUserrInfo()

  if(userInfoLoading){
    return <>加载中</>
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
        <div className='grow bg-[#182036] pl-10 pr-16 overflow-y-auto h-screen'>
          <div className='max-w-6xl mx-auto'>
          <Header
            title="Settings"
            description="Select all the subscriptions or choose single network for the plan"
            url = ''
            back = {false}
            backTitle = ""
            backUrl=""
          />
          <div className='mt-10'>
            <div className='bg-white/5 rounded-[24px] px-6 py-6'>
              <EmailEdit
                isEdit = {true}
                email = {'Test001@gmail.com'}
              />
            </div>
            
          </div>
        </div>
      </div>
    </div>
    </>
  )

}
