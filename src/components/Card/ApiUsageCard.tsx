import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import PlanListItem  from '../Dashboard/PlanListItem';
import { copyText } from 'src/lib/format';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import ConfirmModal from '../Modal/ConfirmModal';
import { useResetKey } from 'src/api/auth';

type ApiUsageCardProp = {
  apikey?: string,
  subscribePlanList:{
    id: number
    todayUsage: number
    status: 1 | 2 | 0 | -2
    expireAt: number
    chain:{
      chainId: number
      name: string
    }
    plan:{
      id: number
      name: string
      chainId: number
      dayLimit: number
    }
  }[]| undefined
}

export function ApiUsageCard({
  apikey = '',
  subscribePlanList = [{
    id : 1, 
    todayUsage: 1000,
    status: 1,
    expireAt: 1000,
    chain:{
      chainId: 1,
      name: ''
    },
    plan:{
      id: 1,
      name: '',
      chainId: 1,
      dayLimit: 1000,
    },
  }]}:ApiUsageCardProp){

    const [token, setToken] = useState<string>('');
    const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
    const [isConfirmOpen,setIsConfirmOpen] = useState(false)

    const [isApikey,setIsApikey] = useState<string | undefined>(apikey)

    useEffect(()=>{
      setIsApikey(apikey)
    },[apikey])

    const {
      trigger: useResetKeyTrigger,
      data: useResetKeyData,
      error: useResetKeyError,
    } = useResetKey()

    const onVerify = useCallback((token:string) => {
      setToken(token);
    },[]);

  return(
    <div className='bg-white/5 rounded-[24px] px-6 py-6'>
      <div className='flex space-x-4'>
        <img src="/image/apikey_icon.png" className='h-16'/>
        <div className=''>
          <div className='text-2xl font-bold text-white flex items-center gap-x-3'>
              Admin Key
            <img src="/image/help_tips_icon.png" className='h-6'/>
          </div>
          <div className='text-base text-white/50 mt-3 flex items-center gap-x-3'>
            {isApikey}
            <div className='mt-1'>
                <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className='focus:outline-none'>
                      <img src={open ? '/image/more_button_active.png':'/image/more_button_inactive.png'} className='w-6'/>
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute mt-2 right-1 w-28 z-10 p-4 rounded-[16px] backdrop-blur-[40px] bg-white/5 ">
                        <div 
                          className='text-base text-white/50 text-center cursor-pointer'
                          onClick={()=>{
                            copyText(apikey)
                          }}
                          >
                          Copy
                        </div>
                        <div className='border-white/10 border-[0.5px] my-3'/>
                        <div className='mt-3'>
                          <GoogleReCaptcha
                            onVerify={onVerify}
                            refreshReCaptcha={refreshReCaptcha}
                            action='resetApiKey'
                          />
                          <ConfirmModal
                            isOpen = {isConfirmOpen}
                            title = {'Sure you want to reset key?'}
                            description = {'Reset key will reset all of your endpoints, please make sure you know the changes.'}
                            closeFunc = {()=>{
                              setIsConfirmOpen(false)
                            }}
                            confirmFunc = {async ()=>{
                              const res = await useResetKeyTrigger({reCaptchaToken:token})
                              setIsApikey(res?.newApiKey)
                              setIsConfirmOpen(false)
                              setRefreshReCaptcha(r => !r);
                            }}
                          />
                          <div 
                            className='text-base text-white/50 text-center cursor-pointer'
                            onClick={()=>{
                              setIsConfirmOpen(true)
                            }}
                          >
                          Reset
                        </div>
                        </div>
                        
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          </div>
        </div> 
      </div>
      <div className='border-[0.5px] border-white/10 mt-6'></div>
      <div className='mt-6'>
        <div className='text-2xl font-bold text-white flex items-center gap-x-3'>
          My Plans
          <img src="/image/help_tips_icon.png" className='h-6'/>
        </div>
        <div className='mt-6'>
          <div className='grid grid-cols-7 gap-1 text-base text-white/30'>
            <span className='pl-2 col-span-2'>Network</span>
            <span className='grow col-span-4'>Usage</span>
            <span className=''>Status</span>
          </div>
          <div className='border-[0.5px] border-white/10 mt-2'></div>
        </div>
        <div className='mt-4 space-y-1'>
        {(subscribePlanList.map((item) => (
          <PlanListItem
            key={item.id}
            usage={4}
            status={item.status}
            dayLimit={item.plan.dayLimit}
            network={item.chain.name}
          />
        )))}
        </div>
        <Link href="/posapi">
          <div className='rounded-[23px] mt-6 w-1/4 border-[1px] border-white/20 mx-auto'>
            <div className='px-8 py-3 flex items-center justify-center'>
              <div className='text-base text-white/50'>
                More
              </div>
              <img src="/image/change_password_inactive.png" className='h-4 ml-2'/>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}