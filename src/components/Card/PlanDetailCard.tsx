import { useCreateOrder,useDowngradeFreeFunc } from 'src/api/premium';
import React from 'react';
import PlanTag from '../Tag/PlanTag';
import { gbConvert } from 'src/lib/format';
import PlanLoadingSkethon from '../Skethon/PlanLoadingSkethon';
import PaymentModal from '../Modal/PaymentModal';
import ConfirmModal from '../Modal/ConfirmModal';
import { useState } from 'react';
import { useRouter } from 'next/router';
import AllSubList from '../List/AllSubList';

type IpfsItemProps = {
  planType: string,
  price: number,
  totalStorage: number,
  transformUp: number,
  transformDown: number,
  active: boolean,
  chainId: number,
  planId: number,
}

export function IpfsItemCard({
  planType = "",
  price = 0,
  totalStorage = 0,
  transformUp = 0,
  transformDown = 0,
  active = false,
  chainId = 0,
  planId = 0,

}:IpfsItemProps){

  const itemCardStyle = {
    activeStyle : 'bg-white/5 rounded-[16px] border-[1px] border-[#00F4FF]',
    inactiveStyle : '',
  }

  const buttonStyle = {
    activeStatus : 'px-2 py-2 text-center text-white/50 text-lg mt-24 mx-8',
    inactiveStatus : 'bg-[#2A23FF] rounded-[23px] px-2 py-2 text-center text-white text-lg mt-24 mx-8 mb-4'
  }

  const buttonWording = {
    activeWording : 'Current Plan',
    inactiveWording : 'Select',
  }

  let itemCardClass = active ? itemCardStyle['activeStyle'] : itemCardStyle['inactiveStyle'];
  let buttonStyleClass = active ? buttonStyle['activeStatus'] : buttonStyle['inactiveStatus'];
  let buttonWordingText = active ? buttonWording['activeWording'] : buttonWording['inactiveWording'];

  const totalStorageGB = gbConvert(totalStorage)
  const transferUpGB = gbConvert(transformUp)
  const transferDownGB = gbConvert(transformDown)

  const{
    trigger:createOrderTrigger,
    data: createOrderData,
   } = useCreateOrder()

   const{
    trigger: downGradeTrigger,
    error: downGradeError,
   } = useDowngradeFreeFunc()

   const router = useRouter()

  const [isPaymentOpen,setIsPaymentOpen] = useState(false)

  const [paymentId,setPaymentId] = useState<string | undefined>('')
  const [paymentCurrency,setPaymentCurrency] = useState<string | undefined>('')
  const [paymentAmout,setPaymentAmout] = useState<string | undefined>('')
  const [paymentExpireTime,setPaymentExpireTime] = useState<number | undefined>(0)
  const [paymentQrcodeImgLink,setPaymentQrcodeImgLink] = useState<string | undefined>('')
  const [paymentQrContent,setPaymentQrContent] = useState<string | undefined>('')

  const [isConfirmOpen,setIsConfirmOpen] = useState(false)
  
  return (
    <div className={`${itemCardClass}`}>
      <PaymentModal
        isOpen = {isPaymentOpen}
        id = {paymentId} 
        currency = {paymentCurrency}
        totalAmout = {paymentAmout}
        expireTime = {paymentExpireTime}
        qrcodeImgLink = {paymentQrcodeImgLink}
        qrContent = {paymentQrContent}
        closeModal = {() => {
          setIsPaymentOpen(false)
        }}
        confirmModal = {() => {
          setIsPaymentOpen(false)
          router.reload()
        }}
      />
      <ConfirmModal
        isOpen = {isConfirmOpen}
        title = {'Switch to a free plan'}
        description = {'Your current plan is a paid one. If you confirm to switch to a free plan, your paid plan will become invalid. Are you sure you want to proceed with this operation?'}
        closeModal = {()=>{
          setIsConfirmOpen(false)
        }}
        confirmModal = {async ()=>{
          await downGradeTrigger({chainId:chainId})
          setIsConfirmOpen(false)
          router.reload()
        }}
      />
      <div className='text-2xl font-bold text-[#9FADC7] px-8 pt-3'>
        {planType}
      </div>
      <div className='mt-6 flex items-center space-x-0 px-8'>
        <div className="text-lg text-[#00F4FF] mt-2">$</div>
        <div className="text-3xl text-[#00F4FF]">{price}</div>
        <div className="text-lg text-[#00F4FF] mt-2">/Mo</div>
      </div>
      <div className='mt-6 space-y-2'>
        <div className='text-lg text-[#9FADC7] px-8'> {totalStorageGB} GB</div>
        <div className='border-[1px] border-white/10'></div>
        <div className='text-lg text-[#9FADC7] px-8'> {transferUpGB} GB</div>
        <div className='border-[1px] border-white/10'></div>
        <div className='text-lg text-[#9FADC7] px-8'> {transferDownGB} GB</div>
      </div>
      <div className={`${buttonStyleClass}`}>
        <button onClick={async() =>{
          if(planType == 'Free'){
            setIsConfirmOpen(true)
          } else {
            const res = await createOrderTrigger({chainId:chainId,planId:planId},)
            setPaymentId(res?.orderId)
            setPaymentCurrency(res?.currency)
            setPaymentAmout(res?.totalAmount)
            setPaymentExpireTime(res?.expireTime)
            setPaymentQrcodeImgLink(res?.qrcodeImgLink)
            setPaymentQrContent(res?.qrContent)
            setIsPaymentOpen(true)
          }
        }}>
          {buttonWordingText}
        </button>
      </div>
    </div>
  )
}

function SubscriptionsCTA(){
  return(
    <div className='rounded-[16px] px-3 py-3 border-[1px] border-white/30 bg-white/5 flex'>
      <p className='text-sm text-white/50'>
        You don't have a paid plan. Please add a credit/debit card and select a plan to prevent storage issues beyond your plan limits.
      </p>
      <div className='grow'>
      </div>
      <img src="/image/premium_arrow_icon..png" className='w-6'/>
    </div>
  )
}

type IpfsCardProps = {
  name: string,
  currentPlan: string,
  list:{
    id: number,
    name: string,
    chain_id: number,
    price: number,
    dayLimit: number,
    secondLimit : number,
    totalStorage: number,
    transferUp: number,
    transferDown: number,
    current: boolean,
  }[],
}

export function IpfsCard({
  name = '',
  currentPlan = '',
  list =[{
    id: 0,
    name: '',
    chain_id: 0,
    price: 0,
    dayLimit: 1,
    secondLimit : 1,
    totalStorage: 1,
    transferUp: 1,
    transferDown: 1,
    current: false,
  }]
}:IpfsCardProps){
  return(
    <div className='rounded-[16px] px-6 py-6 bg-white/5'>
      <div className='flex space-x-4'>
        <h1 className='text-white text-2xl font-bold'> My {name} Plan </h1>
        <PlanTag
          name = {currentPlan}
        />
      </div>
      <div className='mt-10 grid grid-cols-5'>
        <div className='pt-32 space-y-2'>
          <div className='text-lg text-[#9FADC7] px-4'> totalStorage </div>
          <div className='border-[1px] border-white/10'></div>
          <div className='text-lg text-[#9FADC7] px-4'> transformUp </div>
          <div className='border-[1px] border-white/10'></div>
          <div className='text-lg text-[#9FADC7] px-4'> transformDown </div>
        </div>
        {list.map((item) => (
          <IpfsItemCard
            key = {item.id}
            planType = {item.name}
            price = {item.price}
            active = {item.current}
            planId = {item.id}
            chainId = {item.chain_id}
            totalStorage = {item.totalStorage}
            transformUp = {item.transferUp}
            transformDown = {item.transferDown}
          />
        ))}
      </div>
    </div>
  )
}

type ApiItemProps = {
  planType: string,
  price: number,
  dayLimit: number,
  secondLimit: number,
  active: boolean,
  planId: number,
  chainId: number,
  name: string,
}

export function ApiItemCard({
  planType = "",
  price = 0,
  dayLimit = 0,
  secondLimit = 0,
  active = false,
  planId = 0,
  chainId = 0,
}:ApiItemProps){

  const itemCardStyle = {
    activeStyle : 'bg-white/5 rounded-[16px] border-[1px] border-[#00F4FF]',
    inactiveStyle : '',
  }

  const buttonStyle = {
    activeStatus : 'px-2 py-2 text-center text-white/50 text-lg mt-24 mx-8',
    inactiveStatus : 'bg-[#2A23FF] rounded-[23px] px-2 py-2 text-center text-white text-lg mt-24 mx-8 mb-4'
  }

  const buttonWording = {
    activeWording : 'Current Plan',
    inactiveWording : 'Select',
  }

  let itemCardClass = active ? itemCardStyle['activeStyle'] : itemCardStyle['inactiveStyle'];
  let buttonStyleClass = active ? buttonStyle['activeStatus'] : buttonStyle['inactiveStatus'];
  let buttonWordingText = active ? buttonWording['activeWording'] : buttonWording['inactiveWording'];

  const{
    trigger:createOrderTrigger,
    data: createOrderData,
   } = useCreateOrder()

   const{
    trigger: downGradeTrigger,
    error: downGradeError,
   } = useDowngradeFreeFunc()

   const router = useRouter()

  const [isPaymentOpen,setIsPaymentOpen] = useState(false)

  const [paymentId,setPaymentId] = useState<string | undefined>('')
  const [paymentCurrency,setPaymentCurrency] = useState<string | undefined>('')
  const [paymentAmout,setPaymentAmout] = useState<string | undefined>('')
  const [paymentExpireTime,setPaymentExpireTime] = useState<number | undefined>(0)
  const [paymentQrcodeImgLink,setPaymentQrcodeImgLink] = useState<string | undefined>('')
  const [paymentQrContent,setPaymentQrContent] = useState<string | undefined>('')

  const [isConfirmOpen,setIsConfirmOpen] = useState(false)

  return (
    <div className={`${itemCardClass}`}>
      <PaymentModal
        isOpen = {isPaymentOpen}
        id = {paymentId} 
        currency = {paymentCurrency}
        totalAmout = {paymentAmout}
        expireTime = {paymentExpireTime}
        qrcodeImgLink = {paymentQrcodeImgLink}
        qrContent = {paymentQrContent}
        closeModal = {() => {
          setIsPaymentOpen(false)
        }}
        confirmModal = {() => {
          setIsPaymentOpen(false)
          router.reload()
        }}
      />
      <ConfirmModal
        isOpen = {isConfirmOpen}
        title = {'Switch to a free plan'}
        description = {'Your current plan is a paid one. If you confirm to switch to a free plan, your paid plan will become invalid. Are you sure you want to proceed with this operation?'}
        closeModal = {()=>{
          setIsConfirmOpen(false)
        }}
        confirmModal = {async ()=>{
          await downGradeTrigger({chainId:chainId})
          setIsConfirmOpen(false)
          router.reload()
        }}
      />
      <div className='text-2xl font-bold text-[#9FADC7] px-8 pt-3'>
        {planType}
      </div>
      <div className='mt-6 flex items-center space-x-0 px-8'>
        <div className="text-lg text-[#00F4FF] mt-2">$</div>
        <div className="text-3xl text-[#00F4FF]">{price}</div>
        <div className="text-lg text-[#00F4FF] mt-2">/Mo</div>
      </div>
      <div className='mt-6 space-y-2'>
        <div className='text-lg text-[#9FADC7] px-8'> {secondLimit}</div>
        <div className='border-[1px] border-white/10'></div>
        <div className='text-lg text-[#9FADC7] px-8'> {dayLimit}</div>
      </div>
      <div className={`${buttonStyleClass}`}>
      <button onClick={async() =>{
          if(planType == 'Free'){
            setIsConfirmOpen(true)
          } else {
            //@ts-ignore
            const res = await createOrderTrigger({chainId:chainId,planId:planId},)
            setPaymentId(res?.orderId)
            setPaymentCurrency(res?.currency)
            setPaymentAmout(res?.totalAmount)
            setPaymentExpireTime(res?.expireTime)
            setPaymentQrcodeImgLink(res?.qrcodeImgLink)
            setPaymentQrContent(res?.qrContent)
            setIsPaymentOpen(true)
          }
        }}>
          {buttonWordingText}
        </button>
      </div>
    </div>
  )
}

type ApiCardProps = {
  name: string,
  currentPlan: string,
  list:{
    id: number,
    name: string,
    chain_id: number,
    price: number,
    dayLimit: number,
    secondLimit : number,
    totalStorage: number,
    transferUp: number,
    transferDown: number,
    current: boolean,
  }[],
}

export function ApiCard({
  name = '',
  currentPlan = '',
  list =[{
    id: 0,
    name: '',
    chain_id: 0,
    price: 0,
    dayLimit: 1,
    secondLimit : 1,
    totalStorage: 1,
    transferUp: 1,
    transferDown: 1,
    current: false,
  }],

}:ApiCardProps){
  return(
    <div className='rounded-[16px] px-6 py-6 bg-white/5'>
      <div className='flex space-x-4'>
        <h1 className='text-white text-2xl font-bold'> My {name} Plan </h1>
        <PlanTag
          name = {currentPlan}
        />
      </div>
      <div className='mt-10 grid grid-cols-5'>
        <div className='pt-32 space-y-2'>
          <div className='text-lg text-[#9FADC7] px-4'> Request/Second </div>
          <div className='border-[1px] border-white/10'></div>
          <div className='text-lg text-[#9FADC7] px-4'> Request/Day </div>
        </div>
        {list.map((item) => (
          <ApiItemCard
            key = {item.id}
            planType = {item.name}
            price = {item.price}
            dayLimit = {item.dayLimit}
            secondLimit = {item.secondLimit}
            active = {item.current}
            planId = {item.id}
            chainId = {item.chain_id}
            name = {name}
          />
        ))}
      </div>
    </div>
  )
}


type PlanDetailCardPrpos = {
  name: string,
  currentPlan: string,
  chainId: number,
  loading: boolean,
  list:{
    id: number,
    name: string,
    chain_id: number,
    price: number,
    dayLimit: number,
    secondLimit : number,
    totalStorage: number,
    transferUp: number,
    transferDown: number,
    current: boolean,
  }[],
  subscribedPlans:{
    id: number
    totalStorage: number,
    transferUp : number,
    transferDown : number,
    todayUsage: number,
    status: 1 | 2 | 0 | -2,
    expireAt: number,
    chain:{
      chainId: number,
      name: string,
    }
    plan:{
      id: number,
      name: string,
      dayLimit: number,
      chainId: number,
      price: number,
      totalStorage:number,
      transferUp : number,
      transferDown : number,
    }
  }[] | undefined,
}

export default function PlanDetailCard({
  name = '',
  currentPlan = '',
  chainId = 0,
  loading = false,
  list =[{
    id: 0,
    name: '',
    chain_id: 0,
    price: 0,
    dayLimit: 1,
    secondLimit : 1,
    totalStorage: 1,
    transferUp: 1,
    transferDown: 1,
    current: false,
  }],
  subscribedPlans = [{
    id: 0,
    totalStorage: 0,
    transferUp : 0,
    transferDown : 0,
    todayUsage: 0,
    status: 1,
    expireAt: 0,
    chain:{
      chainId: 14,
      name: '',
    },
    plan:{
      id: 0,
      name: '',
      chainId: 0,
      dayLimit: 1,
      price: 0,
      totalStorage: 1,
      transferUp : 1,
      transferDown : 1,
    },
  }],
}:PlanDetailCardPrpos){
  switch(chainId){
    case 14:
      if(loading){
        return <PlanLoadingSkethon/>
      }
      return(
        <IpfsCard
          name = {name}
          currentPlan = {currentPlan}
          list = {list}
        />
      )
    break
    case 0 :
      return(
        <AllSubList
          subscribedPlans={subscribedPlans}
        />
      )
    default:
      if(loading){
        return <PlanLoadingSkethon/>
      }
      return(
        <ApiCard
          name = {name}
          currentPlan = {currentPlan}
          list = {list}
        />
      )
    break
  }
}