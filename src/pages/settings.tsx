import React from 'react';
import { Meta } from '../components/Meta'
import { Menu } from '../components/Menu'
import { Header } from '../components/Header'
import { AccountInfo } from '../components/Settings/AccountInfo';
import { AccountPassword } from '../components/Settings/AccountPassword';

export default function Settings() {
  return(
    <>
      <Meta
        title=''
        description=''
        image=''
      />
      <div className='flex'>
        <Menu/>
        <div className='grow bg-[#182036] pl-20 pr-6 overflow-y-auto h-screen'>
          <Header
            title="Settings"
            description="Select all the subscriptions or choose single network for the plan"
          />
          <div className='mt-10'>
            <AccountInfo />
          </div>
          <div className='mt-10'>
            <AccountPassword />
          </div>
        </div>
      </div>

    </>
  )

}
