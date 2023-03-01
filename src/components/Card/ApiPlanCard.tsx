import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx';
import Link from 'next/link';
import PercentChart from '../Chart/PercentChart';


type ApiPlanCardProps = {
  id: number,
  name: string,
  status: number,
  usage: number,
  dayLimit: number,
  chainId: number,
}

type UpgradeShowProps = {
  show: boolean,
  id: number,
}

export function UpgradeShow({
  show = false,
  id = 0,
}:UpgradeShowProps){
  if(show){
    return (
      <Link href=''>
        <div className='w-4/5 rounded-[24px] px-1 py-3 flex items-center mt-4 space-x-2 border-[1px] border-white/20 justify-center'>
          <div className='text-base text-white/50'>
            Upgrade
          </div>
          <img src='/image/arrow_upgrade.png' className='h-5'/>
        </div>
      </Link>
    )
  } else {
    return (
      <div className='mt-2 text-base text-white/30'>
        Requests / Day
      </div>
    )
  }
}


export default function ApiPlanCard({
  id = 0,
  name = '',
  status =  0,
  usage = 0,
  dayLimit = 0,
  chainId = 0
}:ApiPlanCardProps){

  let logoImage = ''
  let apiStatus = ''
  let statusStyle = ''
  let textStyle = ''
  let upgradeShowStatus = false

  const usagePercent = Number((usage/dayLimit).toFixed(2))*100
  const usageCicle = Number((usage/dayLimit).toFixed(2))*535

  switch(name){
    case 'Ethereum':
      logoImage = '/image/ethereum_logo_icon.png'
      break
    case 'Polygon':
      logoImage = '/image/polygon_logo_icon.png'
      break
    case 'Cosmos':
      logoImage = '/image/cosmos_logo_icon.png'
      break
    case 'Arbitrum':
      logoImage = '/image/arbitrum_logo_icon.png'
      break
    default:
      logoImage = '/image/ethereum_logo_icon.png'
      break
  }

  switch(status){
    case 1:
      apiStatus = 'Active'
      statusStyle = 'text-base text-[#00F4FF] px-2 py-1 rounded-[6px] bg-[#00F4FF]/10'
      textStyle = 'text-[#00F4FF]/60'
      upgradeShowStatus = false
      break
    case 2:
      apiStatus = 'Overrun'
      statusStyle = 'text-base text-[#FF4D88] px-2 py-1 rounded-[6px] bg-[#FF4DB8]/10'
      textStyle = 'text-[#EC57A4]'
      upgradeShowStatus = true
      break
    case -2:
      apiStatus = 'Inative'
      statusStyle = 'text-base text-[#9FADC7] px-2 py-1 rounded-[6px] bg-[#9FADC7]/10'
      upgradeShowStatus = false
      break
  }

  return (
    <div className='bg-white/5 rounded-[24px] px-6 pt-5 pb-4 hover:border-[1px] hover:border-white/20'>
      <div className='flex items-center space-x-4'>
        <img src={logoImage} className='w-8'/>
        <div className='text-2xl text-white font-bold'>{name}</div>
        <div className={statusStyle}>{apiStatus}</div>
        <div className='grow'/>
        <div className="h-8">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button className='focus:outline-none'>
                  <img src={open ? '/image/more_button_active.png':'/image/more_button_inactive.png'} className='w-8'/>
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
                  <Popover.Panel className="absolute mt-2 right-1 w-32 z-10 p-4 rounded-[16px] backdrop-blur-[40px] bg-white/5 ">
                    <div className='text-base text-white/50 text-center'>
                      <Link href={`/chain/${chainId}`}>
                        API Details
                      </Link>
                    </div>
                    <div className='border-white/20 border-[0.5px] my-3'/>
                    <div className='text-base text-white/50 mt-3 text-center'>
                      <Link href=''>
                        View Plan
                      </Link>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
      
      <div className='flex items-center space-x-6'>
        <div className='mt-2'>
          <div className='text-4xl text-white/50 font-brand tracking-widest'>
            {dayLimit}
          </div>
          <UpgradeShow
            show = {upgradeShowStatus}
            id = {id}
          />
        </div>
        <div className='grow'/>
        <div className='pr-10'>
          <PercentChart
            status = {apiStatus}
            usage = {usagePercent}
            usageCircle = {usageCicle}
          />
        </div>
      </div>       

    </div>
  )

}