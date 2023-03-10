import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { pass } from "src/lib/fp";

type ConfirmModalProps = {
  isOpen?: boolean
  title?: string,
  description?: string,
  closeModal?: () => void,
  confirmModal?: () => void,
}

export default function ConfirmModal({
  isOpen = false,
  title = '',
  description = '',
  closeModal = pass,
  confirmModal = pass,
}:ConfirmModalProps){

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
          <div className="fixed inset-0 bg-black bg-opacity-80" />
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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-black p-10 text-left align-middle transition-all">
                <Dialog.Title
                    as="h4"
                    className="text-2xl font-bold leading-6 text-white text-center"
                  >
                    {title}
                </Dialog.Title>

                <div className="text-xl text-center text-white/50 mt-10 leading-relaxed tracking-wide">
                  {description}
                </div>

                <div className="mt-10 grid grid-cols-2 divide-x-[1px] divide-white/20">
                  <div 
                    className = "text-center text-xl text-white/50 cursor-pointer"
                    onClick = {closeModal}
                    >
                    Cancel
                  </div>
                  <div 
                    className = "text-center text-xl text-[#00F4FF] cursor-pointer"
                    onClick = {confirmModal}
                    >
                    Confirm
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