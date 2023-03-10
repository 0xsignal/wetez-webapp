import React, { useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { pass } from '../../lib/fp';
import TimeCounter from '../TimeCounter';
import { useCheckOrderStatus,useCheckOrderStatusInterval } from 'src/api/premium';
import ButtonLoading from '../ButtonLoading'


type PaymentModalProps = {
  isOpen?: boolean,
  id?: string,
  currency?: string,
  totalAmout?: string,
  expireTime?: number,
  qrcodeImgLink?: string,
  qrContent?: string,
  closeModal?: () => void,
  confirmModal?: () => void,
};

type ModalStatusProps = {
  isOpen?: boolean,
  id?: string,
  currency?: string,
  totalAmout?: string,
  expireTime?: number,
  qrcodeImgLink?: string,
  qrContent?: string,
  closeModal?: () => void,
  confirmModal?: () => void,
}

export function ModalStatus({
  isOpen = false,
  id = '',
  currency = '',
  totalAmout = '',
  expireTime = 0,
  qrcodeImgLink = '',
  qrContent = '',
  closeModal = pass,
  confirmModal = pass,
}:ModalStatusProps){

  const [orderId,setOrderId] = useState(id)

  const { 
    trigger: checkOrderTrigger, 
    isMutating: checkOrderisMutating, 
    error: checkOrderError
  } = useCheckOrderStatus()

  const {
    data: orderStatusData,
    error: orderStatusError,
  } = useCheckOrderStatusInterval(orderId,isOpen)

  useEffect(() => {
    setOrderId(id)
  },[id])

  const [orderStatus,setOrderStatus] = useState<number>(0)

  useEffect( () => {
    if(orderStatusData){
      setOrderStatus(orderStatusData.status)
    }
  },[orderStatusData])

  if(orderStatusData){
    if(orderStatus == 1){
      return (
        <div className=''>
          <img src="/image/onboard_success_icon.png" className='mt-10 w-32 mx-auto'/>
          <div className='mt-10 text-4xl text-white font-brand text-center'>
            Your Payment is complete!
          </div>
          <div className='mt-8 text-white/50 text-base text-center'>
            You will be receiving a confirmation email with order details.
          </div>
          <div className='mt-16 mb-8 bg-[#2A23FF] rounded-[24px] py-4 px-6 w-1/2 text-base text-white cursor-pointer text-center mx-auto'
            onClick = {confirmModal}
          >
            Explore More Plans
          </div>
        </div>
      )
    }
  }

  return(
    <>
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
        <div className='mt-2 text-2xl text-white font-bold'>
          <TimeCounter arriveTime = {expireTime}/>
        </div>
        <div className='text-base text-white/50 mt-3'>
          otherwise the order will be automatically cancelled
        </div>
      </div>

      <div className='mt-10 mx-auto w-1/3 bg-white/5 border-[1px] border-white/20 rounded-[12px] space-x-3 flex px-4 py-3 items-center justify-center'>
        <img src='/image/binance_logo.png' className='w-8'/>
        <div className='text-2xl text-white'>
          Binance Pay
        </div>
      </div>

      <div className='bg-black/30 rounded-[24px] px-10 py-6 mt-10'>
        <div className='text-center text-[#FFE200] text-base'>
         Use Binance Pay to Scan QR Code and Send
        </div>
        <img src={qrcodeImgLink} className="mx-auto w-44 h-44 mt-3"/>
        <div className='mt-3 text-center font-bold text-2xl text-white'>
           {totalAmout} {currency}
        </div>
      </div>
                  
      <div 
        className='mt-10 text-base text-white/50 text-center cursor-pointer flex items-center justify-center space-x-2'
        onClick={async ()=>{
          //@ts-ignore
          const res = await checkOrderTrigger({orderId:orderId})
          setOrderStatus(res?.status || 0)
        }}
      >
        <div className=''>
          I have completed the payment ?
        </div>
        <ButtonLoading
          loading = {checkOrderisMutating}
        />
      </div>

      <div className='mt-10 mb-3 text-sm text-white/30'>
        <p>Notice:</p>
        <p>1. This QR code will be expired in 15 minnuts.</p>
        <p>2. The QR code is generated uniquely, check your staute of payment on the premium tabs.</p>
        <p>3. If you encounter anyissue on the payment ,please send the issues to team@wetez.io.</p>
      </div>
    </>
  )
}


export default function PaymentModal({
  isOpen = false,
  id = '',
  currency = '',
  totalAmout = '',
  expireTime = 0,
  qrcodeImgLink = '',
  qrContent = '',
  closeModal = pass,
  confirmModal = pass,
 }:PaymentModalProps){

  
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

                  <ModalStatus
                    isOpen = {isOpen}
                    id = {id}
                    currency = {currency}
                    totalAmout = {totalAmout}
                    expireTime = {expireTime}
                    closeModal = {closeModal}
                    confirmModal = {confirmModal}
                    qrContent = {qrContent}
                    qrcodeImgLink = {qrcodeImgLink}
                  />
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )


}