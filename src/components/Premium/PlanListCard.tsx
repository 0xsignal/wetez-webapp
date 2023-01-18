import React from 'react';
import Link from 'next/link';

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
  return (
    <div className='px-4 py-6'>
      <div className='text-2xl font-bold text-[#9FADC7]'>
        {planType}
      </div>
      <div className='flex'>
      </div>
    </div>
  )
}

function ApiItemCard(){

}

export default function PlanListCard() {
  return(
    <>
    </>
  )

}