import React from "react";
import { Menu } from "src/components/Menu";
import { Meta } from "src/components/Meta";
import { Header } from "src/components/Header";
import { useRouter } from 'next/router'
import { useChainPlan,useChainStats1m,useChainStats24h,useChainStats7d } from "src/api/posapi";
import { StatusCard } from "src/components/Card/StatusCard";

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
  
  if(!isReady){
    return (
      <div>加载中</div>
    )
  }

  return(
    <>
      <Meta
        title=''
        description=''
        image=''
      />
       <div className='flex'>
        <Menu/>
        <div className='grow bg-[#182036] pl-10 pr-10 overflow-y-auto h-screen pb-6'>
          <Header
            title = {`${chainPlanData?.subscribedPlan.chain.name} Mainnet`} 
            description= {`${chainPlanData?.subscribedPlan.chain.name} Mainnet API Endpoint, learn more about API settings`}
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
              
            </div>
          </div>
        </div>
      </div>
    </>
  )



}