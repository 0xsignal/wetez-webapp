import React from 'react';
import { Meta } from '../components/Meta'
import { Menu } from '../components/Menu'
import { Header } from '../components/Header'
import { AccountPassword } from '../components/Settings/AccountPassword';
import { useState } from 'react';

export default function Settings() {

  const [isEditing, setIsEditing] = useState(false);

  return(
    <>
      <Meta
        title=''
        description=''
        image=''
      />
      <div className='flex'>
        <Menu/>
        <div className='grow bg-[#182036] pl-10 pr-6 overflow-y-auto h-screen'>
          <Header
            title="Settings"
            description="Select all the subscriptions or choose single network for the plan"
          />
          <div className='mt-10'>
            <div className='bg-white/5 rounded-[24px] px-6 py-6'>
              <h2 className='text-2xl text-white mt-4 font-bold'>
                Name
              </h2>
              <p className='text-white/50 text-lg mt-2'>
                Test001
              </p>

              <div className='mt-10'>
                <h2 className='text-2xl text-white mt-4 font-bold'>
                  Email
                </h2>
                <p className='text-white/50 text-lg mt-2'>
                  Test001@gmail.com
                </p>
              </div>

              <div className='mt-16 mb-4'>
                <button className='bg-[#2A23FF] rounded-[24px] px-14 py-3 text-lg text-white'>
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className='mt-10'>
            <AccountPassword />
          </div>
        </div>
      </div>

    </>
  )

}
