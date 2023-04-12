import React from "react";
import UsagePercentChart from "../Chart/UsagePercentChart";
import moment from "moment";
import { useRouter } from "next/router";
import { gbConvert } from "src/lib/format";

type AllSubListProps = {
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

type ListItemProps = {
  network: string,
  type: string,
  status: number,
  expireAt: number,
  price: number,
  chainId: number,
  dayLimit: number,
  todayUsage:number,
  totalStorageUsage: number,
  totalStrorage: number,
  transferUpUsage: number,
  transferUp: number,
  transferDownUsage: number,
  transferDown: number,
}


export default function AllSubList({
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
}:AllSubListProps){



  return(
    <div className='rounded-[16px] px-6 py-6 bg-white/5'>
    <div className='flex space-x-4'>
      <h1 className='text-white text-2xl font-bold'> My Current Plan </h1>
    </div>
    <div className="mt-10 grid grid-cols-8 gap-2">
      <div className="text-base text-white/30">
        Network
      </div>
      <div className="text-base text-white/30">
        Type
      </div>
      <div className="col-span-2 text-base text-white/30">
        Description
      </div>
      <div className="text-base text-white/30 col-span-2">
        Expire at (UTC)
      </div>
      <div className="text-base text-white/30">
        Price
      </div>
      <div className="text-base text-white/30">
      </div>
    </div>
    <div className="mt-4 border-[1px] border-white/10"></div>
    {(subscribedPlans.map((item) => (
      <ListItem
       key = {item.chain.chainId}
       type = {item.plan.name}
       network = {item.chain.name}
       chainId = {item.chain.chainId}
       expireAt = {item.expireAt}
       price = {item.plan.price}
       todayUsage = {item.todayUsage}
       status = {item.status}
       dayLimit = {item.plan.dayLimit}
       totalStorageUsage = {item.totalStorage}
       transferDownUsage = {item.transferDown}
       transferUpUsage = {item.transferUp}
       totalStrorage = {item.plan.totalStorage}
       transferDown = {item.plan.transferDown}
       transferUp = {item.plan.transferUp}
      />
    )))}
  </div>
  )
}


export function ListItem({
  network = '',
  type = '',
  expireAt = 0,
  price = 0,
  chainId = 0,
  dayLimit = 0,
  todayUsage = 0,
  totalStorageUsage = 0,
  totalStrorage = 0,
  transferUpUsage = 0,
  transferUp = 0,
  transferDownUsage = 0,
  transferDown = 0,
  status = 0,
}:ListItemProps){

  let timeShow = ''

  const router = useRouter()

  if(type == 'Free'){
    timeShow = '01/01/2099'
  } else {
    timeShow = moment(expireAt*1000).format('L')
  }

  // 计算环形图百分比，62.8 是圆的周长

  const usageApi = Number((todayUsage / dayLimit).toFixed(2))*62.8

  const totalStorageShow = gbConvert(totalStrorage)
  const transferUpShow = gbConvert(transferUp)
  const transferDownShow = gbConvert(transferDown)

  const usageTotalStorage = Number((totalStorageUsage / totalStrorage).toFixed(2))*62.8
  const usageTransferUp = Number((transferUpUsage / transferUp ).toFixed(2))*62.8
  const usageTransferDown = Number((transferDownUsage / transferDown ).toFixed(2))*62.8

  if(chainId == 14){
    return(
      <>
        <div className="mt-6 grid grid-cols-8 gap-2 items-center">
        <div className="text-lg text-white/50">
          {network}
        </div>
        <div className="text-lg text-white/50">
          {type}
        </div>
        <div className="col-span-2 flex items-center space-x-3">
          <UsagePercentChart
            status = {status}
            usageCircle = {usageTotalStorage}
          />
          <div className="text-base text-white/30">
            {totalStorageShow} GB TotalStorage / day
          </div>
        </div>
        <div className="text-base text-white/30 col-span-2">
          {timeShow}
        </div>
        <div className="text-base text-white/30">
          ${price} / Mo
        </div>
        <div 
          className="bg-[#2A23FF] rounded-[24px] px-5 py-2 flex items-center justify-center cursor-pointer space-x-3"
          onClick={()=>{
            router.push(`/ipfs/`)
          }}
          >
          <div className="text-base text-white">
            More
          </div>
          <img src='/image/arrow_more_icon.png' className="h-4"/>
        </div>
        </div>
        <div className="mt-4 grid grid-cols-8 gap-2 items-center">
        <div className="text-lg text-white/50">
        </div>
        <div className="text-lg text-white/50">
        </div>
        <div className="col-span-2 flex items-center space-x-3">
          <UsagePercentChart
            status = {status}
            usageCircle = {usageTransferUp}
          />
          <div className="text-base text-white/30">
            {transferUpShow} GB TransferUp / day
          </div>
        </div>
        <div className="text-base text-white/30 col-span-2">
          {timeShow}
        </div>
        <div className="text-base text-white/30">
          ${price} / Mo
        </div>
        </div>
        <div className="mt-6 grid grid-cols-8 gap-2 items-center">
        <div className="text-lg text-white/50">
        </div>
        <div className="text-lg text-white/50">
        </div>
        <div className="col-span-2 flex items-center space-x-3">
          <UsagePercentChart
            status = {status}
            usageCircle = {usageTransferDown}
          />
          <div className="text-base text-white/30">
            {transferDownShow} GB TransferDown / day
          </div>
        </div>
        <div className="text-base text-white/30 col-span-2">
          {timeShow}
        </div>
        <div className="text-base text-white/30">
          ${price} / Mo
        </div>
        </div>
        <div className="mt-6 border-[1px] border-white/10"></div>
      </>
    )
  }

  return(
    <>
      <div className="mt-6 grid grid-cols-8 gap-2 items-center">
        <div className="text-lg text-white/50">
          {network}
        </div>
        <div className="text-lg text-white/50">
          {type}
        </div>
        <div className="col-span-2 flex items-center space-x-3">
          <UsagePercentChart
            status = {status}
            usageCircle = {usageApi}
          />
          <div className="text-base text-white/30">
            {dayLimit} Requests / day
          </div>
        </div>
        <div className="text-base text-white/30 col-span-2">
          {timeShow}
        </div>
        <div className="text-base text-white/30">
          ${price} / Mo
        </div>
        <div 
          className="bg-[#2A23FF] rounded-[24px] px-5 py-2 flex items-center justify-center cursor-pointer space-x-3"
          onClick={()=>{
            router.push(`/chain/${chainId}`)
          }}
          >
          <div className="text-base text-white">
            More
          </div>
          <img src='/image/arrow_more_icon.png' className="h-4"/>
        </div>
        </div>
      <div className="mt-6 border-[1px] border-white/10"></div>
     </>
  )

}