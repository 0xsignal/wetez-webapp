import React from "react";
import { Menu } from "src/components/Menu";
import { Meta } from "src/components/Meta";
import { Header } from "src/components/Header";
import { useRouter } from 'next/router'
import { useChainPlan,useChainStats1m,useChainStats24h,useChainStats7d } from "src/api/posapi";
import { StatusCard } from "src/components/Card/StatusCard";
import ApiMetricCard from "src/components/Card/ApiMetricCard";
import UsageBoard from "src/components/Ipfs/UsageBoard";


export default function ChainItem(){

  const { query, isReady } = useRouter()
  const  { id }  = query

  const {
    data: chainPlanData ,
    loading:chainPlanLoading,
    error:chainPlanError,
  } = useChainPlan(Number(id),isReady)
  
  const {
    data: chainStats24hData ,
    loading: chainStats24hLoading,
    error: chainStats24hError,
  } = useChainStats24h(Number(id),isReady)
  
  const {
    data: chainStats7dData ,
    loading: chainStats7dLoading,
    error: chainStats7dError,
  } = useChainStats7d(Number(id),isReady)
  
  const {
    data: chainStats1mData ,
    loading: chainStats1mLoading,
    error: chainStats1mError,
  } = useChainStats1m(Number(id),isReady)
  
  if(!isReady && chainPlanLoading && chainStats24hLoading && chainStats7dLoading && chainStats1mLoading){
    return (
      <div>加载中</div>
    )
  }

  return(
    <>
      <Meta
        title={chainPlanData?.subscribedPlan.chain.name}
        description=''
        image=''
      />
       <div className='flex'>
        <Menu/>
        <div className='grow bg-[#182036] pl-10 pr-10 overflow-y-auto h-screen pb-6'>
          <div className="max-w-6xl mx-auto">
          <Header
            title = {`${chainPlanData?.subscribedPlan.chain.name} Mainnet`} 
            description= {`${chainPlanData?.subscribedPlan.chain.name} Mainnet API Endpoint Status`}
            url = ''
            back = {true}
            backTitle = "POS APIs"
            backUrl="/posapi"
          />
          <div className='mt-10 grid grid-cols-2 gap-4'>
            <div className=''>
              <StatusCard
                planStatus={chainPlanData?.subscribedPlan}
              />
            </div>
            <div className=''>
              <ApiMetricCard
                plandata={chainPlanData?.subscribedPlan}
              />
            </div>
          </div>
          <div className="mt-10">
            <UsageBoard
              type = 'Api'
              planStatus = {chainPlanData?.subscribedPlan}
              items24h = {chainStats24hData?.items}
              items7d = {chainStats7dData?.items}
              items1m = {chainStats1mData?.items}
            />
          </div>
        </div>
        </div>
      </div>
    </>
  )



}