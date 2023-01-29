import React from 'react';
import { Dialog, Transition } from '@headlessui/react'


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
  openModal?: () => void;
};


export function BillingDetailModal({
  isOpen = false ,
  id = '1234567890123456789',
  planNetwork = 'IPFS',
  planType = 'Team',
  planMeta = '200GB',
  planPrice = '50$',
  planStatus = 'Paid',
  orderTime = '2022-12-05 20:53:56',
  fromEmail = '',
  toEmail = '',
  company = '',
  paymentMethod = '',

 }:BillingDetailModalProps ){
  return(
    <div className=''>

    </div>

  )


}