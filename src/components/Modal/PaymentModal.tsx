import React from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { pass } from '../../lib/fp';
import Link from 'next/link';

type BillingDetailModalProps = {
  isOpen?: boolean;
  id?: string;
  planNetwork?: string;
  planType?: string;
  planMeta?: string;
  planPrice?: string;
  planStatus?: number;
  orderTime?: string;
  fromEmail?: string;
  toEmail?: string;
  company?: string;
  paymentMethod?: string;
  currency?: string;
  closeModal?: () => void;
};

export function PaymentModal({
  isOpen = false,
  id = '',
  planNetwork = '',
  planType = '',
  planMeta = '',
  planPrice = '',
  planStatus = 1,
  orderTime = '',
  fromEmail = '',
  toEmail = '',
  company = '',
  paymentMethod = '',
  currency = '',
  closeModal = pass,
 }:BillingDetailModalProps){

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
                    Use Binance to Pay
                  </Dialog.Title>
                  
                  <div className='mt-10 text-center'>
                    <div className='text-base text-white/50'>
                      Your order created successfully, please complete the payment within
                    </div>
                    <div className='text-base text-white/50 mt-10'>
                      otherwise the order will be automatically cancelled
                    </div>
                  </div>

                  <div className='mt-10 bg-white/5 border-[1px] border-white/20 rounded-[12px] flex px-4 py-2'>
                    <img src='/image/binance_logo.png' className='w-4'/>
                    <div className='text-2xl text-white'>
                      Binance Pay
                    </div>
                  </div>

                  <div className='bg-black/30 rounded-[24px] px-10 py-6 mt-10'>
                    <div className='text-center text-[#FFE200] text-base'>
                      Use Binance Pay to Scan QR Code and Send
                    </div>

                  </div>
                  
                  <div 
                    className='mt-10 text-base text-white/50'
                  >
                    I have completed the payment?
                  </div>

                  <div className='mt-10 text-sm text-white/30'>
                    <p>Notice:</p>
                    <p>1.This QR code will be expired in 15 minnuts</p>
                    <p>2.The QR code is generated uniquely, check your staute of payment on the premium tabs.</p>
                    <p>3.lf you encounter anyissue on the payment ,please send the issues to team@wetez.io</p>
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