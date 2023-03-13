import React from "react";
import PlanTag from "../Tag/PlanTag";
import MetricChart from "../Chart/MetricChart";
import Link from "next/link";

type ApiMetricCardProps = {
  plandata:{
    id: number
    todayUsage: number
    status: 1 | 2 | 0 | -2
    expireAt: number
    chain:{
      chainId: number
      name: string
    }
    plan:{
      id: number,
      name: string,
      chainId: number,
      dayLimit: number
    }
    endpoints:string[]
  } | undefined
}

export default function ApiMetricCard({
  plandata = {
    id: 1,
    todayUsage: 0,
    status: 1,
    expireAt: 1,
    chain:{
      chainId: 2,
      name: ''
    },
    plan:{
      id: 1,
      name: '',
      chainId: 14,
      dayLimit: 10,
    },
    endpoints:[]
}}:ApiMetricCardProps){

  let apiStatus = ''
  const usagePercent = Number((plandata.todayUsage/plandata.plan.dayLimit).toFixed(2))*100
  const usageCicle = Number((plandata.todayUsage/plandata.plan.dayLimit).toFixed(2))*315

  switch(plandata.status){
    case 1:
      apiStatus = 'Active'
      break
    case 2:
      apiStatus = 'Overrun'
      break
    case -2:
      apiStatus = 'Inative'
      break
    default:
    apiStatus = 'Upcoming'
      break
  }

  return (
    <div className='bg-white/5 rounded-[24px] px-6 py-6'>
      <div className="flex items-center space-x-2">
        <div className="text-2xl text-white font-bold">
          My Current Plan
        </div>
        <div className="grow"/>
        <PlanTag
          name = {plandata.plan.name}
        />
      </div>
      <div className="mt-4">
        <MetricChart
          status = {apiStatus}
          usage = {usagePercent}
          usageCircle = {usageCicle} 
        />
      </div>
      <div className="mt-4 text-center">
        <div className="text-white tracking-wider">
          <span className="text-3xl font-brand">{plandata.todayUsage}</span> / <span className="text-base">{plandata.plan.dayLimit}</span>
        </div>
        <div className="mt-2 text-base text-white/50">
          Requests / Day
        </div>
        <Link href='/premium'>
          <div className="mt-6 mb-3 mx-auto w-1/4 bg-[#2A23FF] flex text-white justify-center items-center px-4 py-2 rounded-[24px]">
            More
            <img src="/image/arrow_more_icon.png" className='h-4 ml-4'/>
          </div>
        </Link>
      </div>   
    </div>
  )
}