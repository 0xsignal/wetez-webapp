import React from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { pass } from '../../lib/fp';
import Link from 'next/link';

type DelegateModalProps = {
  isOpen?: boolean,
  id?: string,
  symbol: string,
  address: string,
  description: string,
  link: string,
  delegateAmout: string,
  stakerDelegate: string,
  slash: string,
  closeModal?: () => void;
};

export function DelegateModal({
  isOpen = false,
  id = '',
  symbol = '',
  address = '',
  description = '',
  link = '',
  delegateAmout = '',
  stakerDelegate = '',
  slash = '',
  closeModal = pass,
 }:DelegateModalProps){

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
                    Delegate {symbol}
                  </Dialog.Title>
                  
                  <div className='mt-10'>
                    <div className='text-2xl text-white font-bold'>
                      Delegate Address
                    </div>
                    <div className='text-base text-white/50 mt-4 flex items-center gap-x-3'>
                      {address}
                      <img src="/image/copy_bg_icon.png" className='h-6'/>
                    </div>
                  </div>

                  <div className='mt-10'>
                    <div className='text-2xl text-white font-bold'>
                      Delegate Steps
                    </div>
                    <div className='text-base text-white/50 mt-6 mb-3'>
                      {description}
                    </div>
                    <Link href={link} target='_blank'>
                      <div className='rounded-[26px] px-4 py-2 border-[1px] text-white/50 text-base text-center border-white/20 w-1/4'>
                        Learn More
                      </div>
                    </Link>
                  </div>

                  <div className='mt-10'>
                    <div className='text-2xl text-white font-bold'>
                      Performance
                    </div>
                    <div className='mt-6 grid grid-cols-3 gap-4'>
                      <div className='text-white/30 text-sm'>Delegate Amount</div>
                      <div className='text-white/30 text-sm'>Delegated Address Amount</div>
                      <div className='text-white/30 text-sm'>Slash Record</div>
                    </div>
                    <div className='border-[0.5px] border-white/10 mt-3'/>
                    <div className='mt-6 grid grid-cols-3 gap-4'>
                      <div className='text-white/30 text-sm'>{delegateAmout}{symbol}</div>
                      <div className='text-white/30 text-sm'>{stakerDelegate}</div>
                      <div className='text-white/30 text-sm'>{slash}</div>
                    </div>
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