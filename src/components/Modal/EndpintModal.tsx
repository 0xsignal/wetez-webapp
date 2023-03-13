import React from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { pass } from '../../lib/fp';
import Link from 'next/link';
import CopyButton from '../Button/CopyButton';

type EndpointModalProps = {
  isOpen?: boolean,
  enpointList?: string[],
  closeModal?: () => void;
};

export function EndpointModal({
  isOpen = false,
  enpointList = [''],
  closeModal = pass,
 }:EndpointModalProps){


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
                    className="text-3xl font-brand leading-6 text-white"
                  >
                    Endponits
                  </Dialog.Title>
                  
                  <div className='mt-10'>
                    {(enpointList.map((item,index) => (
                      <div className='mt-6 flex items-center' key={index}>
                      <div className='text-white/50 text-base w-3/4 break-words'>
                        {item}
                      </div>
                      <div className='grow'>
                      </div>
                      <CopyButton
                        text = {item}
                      />
                    </div>
                    )))}
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