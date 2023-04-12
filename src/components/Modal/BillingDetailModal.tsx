import React from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { pass } from '../../lib/fp';
import Link from 'next/link';
import CopyButton from '../Button/CopyButton';
import { gbConvert } from 'src/lib/format';
import moment from 'moment';

type BillingDetailModalProps = {
  isOpen?: boolean;
  id?: string;
  planNetwork?: string;
  planType?: string;
  planMeta?: string;
  planPrice?: string;
  planStatus?: number;
  orderTime?: number;
  fromEmail?: string;
  toEmail?: string;
  company?: string;
  paymentMethod?: string;
  currency?: string;
  orderId?: string;
  orderUserAccount?: string;
  usageLimit?: number;
  closeModal?: () => void;
};

export function BillingDetailModal({
  isOpen = false,
  id = '',
  planNetwork = '',
  planType = '',
  planMeta = '',
  planPrice = '',
  planStatus = 1,
  orderTime = 0,
  fromEmail = '',
  toEmail = '',
  company = '',
  paymentMethod = '',
  currency = '',
  orderId = '',
  orderUserAccount = '',
  usageLimit = 0,
  closeModal = pass,
 }:BillingDetailModalProps){

  const SERVER_ENTRY = 'https://test-portal-api.wetez.io/api'

  const [orderPdfDownlink,setOrderPdfDownlink] = useState(`${SERVER_ENTRY}` + '/v1/payment/export_order_pdf?order_id=' + `${id}`)

  const [usage,setUsage] = useState<String>('')
  const [orderTimeShow,setOrderTimeShow] = useState('')

  useEffect(()=>{
    setOrderTimeShow(moment(orderTime*1000).format('lll'))
  },[orderTime])

  useEffect(()=>{
    if(planNetwork == 'IPFS'){
      setUsage(`${(gbConvert(usageLimit))} GB`)
    }
    else{
      setUsage(`${usageLimit} Requests/day`)
    }
  },[usageLimit])

  useEffect(() => {
    setOrderPdfDownlink(`${SERVER_ENTRY}` + '/v1/payment/export_order_pdf?order_id=' + `${id}`)
  },[id])

  return(
    <div className=''>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-250"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-[#182036] p-10 text-left align-middle shadow-xl transition-all">
                  <button className='float-right outline-none' onClick={closeModal}>
                    <img src='/image/cancle_icon.png' className='w-5' />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-brand leading-6 text-white text-center"
                  >
                    Invoice Detail
                  </Dialog.Title>
                  
                  <div className='mt-10'>
                    <div className='text-2xl text-white font-bold'>
                      ID
                    </div>
                    <div className='text-base text-white/50 mt-4 flex items-center gap-x-3'>
                      {id}
                      <CopyButton
                        text = {id}
                      />
                    </div>
                  </div>

                  <div className='mt-10'>
                    <div className='text-2xl text-white font-bold'>
                      Plan
                    </div>
                    <div className='grid grid-cols-6 mt-6'>
                      <div className='space-y-4'>
                        <h3 className='text-base text-white/30'>
                          Network
                        </h3>
                        <div className='border-[1px] border-white/10'></div>
                        <p className='text-lg text-white/50 py-1'>{planNetwork}</p>
                      </div>
                      <div className='space-y-4'>
                        <h3 className='text-base text-white/30'>
                          Type
                        </h3>
                        <div className='border-[1px] border-white/10'></div>
                        <p className='text-lg text-white/50 py-1'>{planType}</p>
                      </div>
                      <div className='space-y-4 col-span-2'>
                        <h3 className='text-base text-white/30'>
                          Requests/Storage
                        </h3>
                        <div className='border-[1px] border-white/10'></div>
                        <p className='text-lg text-white/50 py-1'>{usage}</p>
                      </div>
                      <div className='space-y-4'>
                        <h3 className='text-base text-white/30'>
                          Price
                        </h3>
                        <div className='border-[1px] border-white/10'></div>
                        <p className='text-lg text-white/50 py-1'>{planPrice} {currency}</p>
                      </div>
                      <div className='space-y-4'>
                        <h3 className='text-base text-white/30'>
                          Status
                        </h3>
                        <div className='border-[1px] border-white/10'></div>
                        <p className='text-lg text-white/50 py-1'>{planStatus}</p>
                      </div>
                    </div>
                  </div>

                  <div className='mt-10'>
                    <div className='text-2xl text-white font-bold'>
                      Detail
                    </div>
                    <div className='text-base text-white mt-6 flex items-center gap-x-3'>
                      Order Time:
                      <div className='text-base text-white/50'>
                        {orderTimeShow}
                      </div>
                    </div>
                    <div className='text-base text-white mt-2 flex items-center gap-x-3'>
                      Order ID:
                      <div className='text-base text-white/50'>
                        {orderId}
                      </div>
                    </div>
                    <div className='text-base text-white mt-2 flex items-center gap-x-3'>
                      Order User Account:
                      <div className='text-base text-white/50'>
                        {orderUserAccount}
                      </div>
                    </div>
                    <div className='text-base text-white mt-2 flex items-center gap-x-3'>
                      Invoice From:
                      <div className='text-base text-white/50'>
                        {company}
                      </div>
                    </div>
                    <div className='text-base text-white mt-2 flex items-center gap-x-3'>
                      Payment Method:
                      <div className='text-base text-white/50'>
                        {paymentMethod}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 float-right">
                    <Link href={orderPdfDownlink} target='_blank'>
                      <div
                        className="bg-[#2A23FF] outline-none rounded-[24px] px-8 py-2 text-center text-base text-white"
                      >
                        Export PDF
                      </div>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>

  )


}