import React from 'react';
import Link from 'next/link';
import PlanTag from '../Tag/PlanTag';

type IpfsItemProps = {
  planType?: string;
  price?: string;
  totalStorage?: string;
  transformUp?: string;
  transformDown?: string;
  image?: string;
  active?: boolean;
};

type ApiItemProps = {
  planType?: string;
  price?: string;
  quota?: string;
  image?: string;
};

function IpfsItemCard({
  planType = "Free",
  price = "0",
  totalStorage = "10GB",
  transformUp = "5GB",
  transformDown = "5GB",
  image = "",
  active = false,
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

  return (
    <div className={`${itemCardClass}`}>
      <div className='text-2xl font-bold text-[#9FADC7] px-8 pt-3'>
        {planType}
      </div>
      <div className='mt-6 flex items-center space-x-0 px-8'>
        <div className="text-lg text-[#00F4FF] mt-2">$</div>
        <div className="text-3xl text-[#00F4FF]">{price}</div>
        <div className="text-lg text-[#00F4FF] mt-2">/Mo</div>
      </div>
      <div className='mt-6 space-y-2'>
        <div className='text-lg text-[#9FADC7] px-8'> {totalStorage}</div>
        <div className='border-[1px] border-white/10'></div>
        <div className='text-lg text-[#9FADC7] px-8'> {transformUp}</div>
        <div className='border-[1px] border-white/10'></div>
        <div className='text-lg text-[#9FADC7] px-8'> {transformDown}</div>
      </div>
      <div className={`${buttonStyleClass}`}>
        <Link href='/'>
          {buttonWordingText}
        </Link>
      </div>
    </div>
  )
}

function ApiItemCard(){

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

function IpfsCard(){
  return(
    <div className='rounded-[16px] px-6 py-6 bg-white/5'>
      <div className='flex space-x-4'>
        <h1 className='text-white text-2xl font-bold'> My IPFS Plan </h1>
        <PlanTag
          name = "Free"
        />
      </div>
      <div className='mt-10'>
        <SubscriptionsCTA/>
      </div>
      <div className='mt-10 grid grid-cols-5'>
        <div className='pt-32 space-y-2'>
          <div className='text-lg text-[#9FADC7] px-4'> totalStorage </div>
          <div className='border-[1px] border-white/10'></div>
          <div className='text-lg text-[#9FADC7] px-4'> transformUp </div>
          <div className='border-[1px] border-white/10'></div>
          <div className='text-lg text-[#9FADC7] px-4'> transformDown </div>
        </div>
        <IpfsItemCard
          planType = "Free"
          price = "0"
          totalStorage = "10GB"
          transformUp = "5GB"
          transformDown = "5GB"
          image = ""
          active = {true}
        />
        <IpfsItemCard
          planType = "Developer"
          price = "3"
          totalStorage = "50GB"
          transformUp = "25GB"
          transformDown = "25GB"
          image = ""
        />
        <IpfsItemCard
          planType = "Team"
          price = "13"
          totalStorage = "100GB"
          transformUp = "50GB"
          transformDown = "50GB"
          image = ""
        />
        <IpfsItemCard
          planType = "Growth"
          price = "23"
          totalStorage = "500GB"
          transformUp = "250GB"
          transformDown = "250GB"
          image = ""
        />
      </div>
    </div>
  )
}

export default function PlanListCard() {
  return(
    <>
      <IpfsCard/>
    </>
  )

}