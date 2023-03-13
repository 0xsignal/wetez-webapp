import React from 'react';
import { BillingDetailModal } from '../Modal/BillingDetailModal';
import { useState } from 'react';
import { useOrderDetail } from 'src/api/premium';

type BillingListItemProps = {
  listItemId?: string;
  listItemDate?: string;
  listItemNetwork?: string;
  listItemPlan?: string;
  listItemTotal?: string;
  listItemCurrency?: string;

};

export default function BillingListItem({
  listItemId = '',
  listItemDate = '',
  listItemNetwork = '',
  listItemPlan = '',
  listItemTotal = '',
  listItemCurrency = '',
}:BillingListItemProps){

  const [isOpen, setIsOpen] = useState<boolean>(false)
  
  const {
    data: orderDtailData,
    trigger: orderDtailTrigger,
    loading: orderDetailLoading,
    error: orderDetailPError,
  } = useOrderDetail()

  return(
    <div className=''>
      <BillingDetailModal
        id = {orderDtailData?.orderId}
        planNetwork = {orderDtailData?.chainName}
        planType = {orderDtailData?.planName}
        planPrice = {orderDtailData?.totalAmount}
        planStatus = {orderDtailData?.status}
        orderTime = {orderDtailData?.summary.date}
        fromEmail = {orderDtailData?.summary.to}
        toEmail = {orderDtailData?.summary.to}
        company = {orderDtailData?.summary.from}
        paymentMethod = {orderDtailData?.summary.paymentMethod}
        currency = {orderDtailData?.currency}
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
          {listItemTotal} {listItemCurrency}
        </div>
        <div 
          className='text-right text-[#00F4FF] text-base py-6 cursor-pointer' 
          onClick={async () => {
            await orderDtailTrigger({orderId:listItemId})
            setIsOpen(true)
          }}>
          Details
        </div>
      </div>
    </div>
    
  )

}