import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { BillingDetailModal } from '../Modal/BillingDetailModal';

type BillingListItemProps = {
  listItemId?: string;
  listItemDate?: string;
  listItemNetwork?: string;
  listItemPlan?: string;
  listItemTotal?: string;
  listItemInvoice?: string;
};


function BillingListItem({
  listItemId = '1234567890123456789',
  listItemDate = '12:00:32 Fri 16 Dec 2022',
  listItemNetwork = 'Polygon',
  listItemPlan = 'Team',
  listItemTotal = '50 USDC',
  listItemInvoice = '/',
}:BillingListItemProps){

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return(
    <div className=''>
      <BillingDetailModal
        isOpen = {isOpen}
        closeModal = {() => {
          setIsOpen(false)
        }}/>
      <div className='border-[1px] border-white/10'></div>
      <div className='grid grid-cols-8 gap-1'>
        <div className='col-span-2 text-left text-white/50 text-base py-6'>
          {listItemId}
        </div>
        <div className='col-span-2 text-left text-white/50 text-base py-6'>
          {listItemDate}
        </div>
        <div className='text-left text-white/50 text-base py-6'>
          {listItemNetwork}
        </div>
        <div className='text-left text-white/50 text-base py-6'>
          {listItemPlan}
        </div>
        <div className='text-left text-white/50 text-base py-6'>
          {listItemTotal}
        </div>
        <div className='text-right text-[#00F4FF] text-base py-6' onClick={()=> {setIsOpen(true)}}>
            Details
        </div>
      </div>
    </div>
    
  )

}

function BillingList(){
  return (
    <div className=''>
      <div className='text-white/30 text-base mb-2 grid grid-cols-8 gap-1'>
        <div className='col-span-2 text-left'>
          ID
        </div>
        <div className='col-span-2 text-left'>
          Date
        </div>
        <div className='text-left'>
          Network
        </div>
        <div className='text-left'>
          Plan
        </div>
        <div className='text-left'>
          Total
        </div>
        <div className='text-right'>
          Invovice
        </div>
      </div>
      <BillingListItem />
      <BillingListItem />
      <BillingListItem />
    </div>
  )
}

export function BillingBoard(){

  return(
    <div className='bg-white/5 rounded-[16px] px-6 py-6'>
      <div className='flex items-center'>
        <h2 className='text-white text-2xl font-bold'> Billing </h2>
        <div className='grow'></div>
        <div className='rounded-[26px] border-[1px] border-white/20 text-base text-white/50 px-6 py-2'>
          Export PDF
        </div>
      </div>
      <div className='mt-12'>
        <BillingList/>
      </div>
    </div>
  )
}