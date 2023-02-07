import React from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'
import { pass } from '../../lib/fp';

type BillingDetailModalProps = {
  isOpen?: boolean;
  id?: string;
  planNetwork?: string;
  planType?: string;
  planMeta?: string;
  planPrice?: string;
  planStatus?: string;
  orderTime?: string;
  fromEmail?: string;
  toEmail?: string;
  company?: string;
  paymentMethod?: string;
  closeModal?: () => void;
};

export function BillingDetailModal({
  isOpen = false,
  id = '1234567890123456789',
  planNetwork = 'IPFS',
  planType = 'Team',
  planMeta = '200GB',
  planPrice = '50$',
  planStatus = 'Paid',
  orderTime = '2022-12-05 20:53:56',
  fromEmail = '12345@gmail.com',
  toEmail = '12345@gmail.com',
  company = 'EYISNS BUSINESS GROUP LTD',
  paymentMethod = 'Binance Pay id *2736, Token Payment, USDC',
  closeModal = pass,
 }:BillingDetailModalProps){


  return(
    <div className=''>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
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
                      <img src="/image/copy_bg_icon.png" className='h-6'/>
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
                        <p className='text-lg text-white/50 py-1'>{planMeta}</p>
                      </div>
                      <div className='space-y-4'>
                        <h3 className='text-base text-white/30'>
                          Price
                        </h3>
                        <div className='border-[1px] border-white/10'></div>
                        <p className='text-lg text-white/50 py-1'>{planPrice}</p>
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
                        {orderTime}
                      </div>
                    </div>
                    <div className='text-base text-white mt-2 flex items-center gap-x-3'>
                      Email:
                      <div className='text-base text-white/50'>
                        {fromEmail}
                      </div>
                    </div>
                    <div className='text-base text-white mt-2 flex items-center gap-x-3'>
                      To:
                      <div className='text-base text-white/50'>
                        {toEmail}
                      </div>
                    </div>
                    <div className='text-base text-white mt-2 flex items-center gap-x-3'>
                      From:
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
                    <button
                      className="bg-[#2A23FF] outline-none rounded-[24px] px-8 py-2 text-center text-base text-white"
                      onClick={closeModal}
                    >
                      Export PDF
                    </button>
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