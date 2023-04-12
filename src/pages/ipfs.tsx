import React, { useEffect, useState } from 'react';
import { Meta } from '../components/Meta'
import { Menu } from '../components/Menu'
import { ApiKeyCard } from '../components/Card/ApiKeyCard'
import { StatusCard } from '../components/Card/StatusCard'
import  UsageBoard  from '../components/Ipfs/UsageBoard'
import { Header } from '../components/Header'
import dynamic from 'next/dynamic'
import { useIPFSPlan } from 'src/api/ipfs';
import { useIPFSStats1m,useIPFSStats24h,useIPFSStats7d } from 'src/api/ipfs';
import IpfsSkethon from 'src/components/Skethon/IpfsSkethon';
import { CaptchaFooter } from 'src/components/Captcha/CaptchaFooter';
import { useAccountInfo } from 'src/api/setting';
import { useRouter } from 'next/router';
import { getUserSession } from 'src/lib/storage';

import { GatewaySelect } from 'src/components/Ipfs/GatewaySelect';


const CircleChart = dynamic(
  () => import('../components/Chart/CircleChart'),
  { ssr: false }
)

export default function Ipfs() {

  // 控制请求的条件　
  const [isReady,setIsReady] = useState<boolean>(false)


  // 请求的 hooks
  const {
    data: userInfoData,
    loading: userInfoLoading,
    error: userInfoError,
  } = useAccountInfo(isReady)


  const {
    data: ipfsPlanData ,
    loading:ipfsPlanLoading,
    error:ipfsPlanError,
  } = useIPFSPlan(isReady)

  
  const {
    data: ipfsStats24hData ,
    loading: ipfsStats24hLoading,
    error: ipfsStats24hError,
  } = useIPFSStats24h(isReady)

  const {
    data: ipfsStats7dData ,
    loading: ipfsStats7dLoading,
    error: ipfsStats7dError,
  } = useIPFSStats7d(isReady)

  const {
    data: ipfsStats1mData ,
    loading: ipfsStats1mLoading,
    error: ipfsStats1mError,
  } = useIPFSStats1m(isReady)


  //如果未登录 控制条件请求
  const router = useRouter()
  const authorization = getUserSession()
  useEffect(()=>{
    if(authorization){
      setIsReady(true)
    }
    else{
      router.replace('/login')
    }
  },[authorization])

  

  if(ipfsPlanLoading && ipfsStats24hLoading && ipfsStats7dLoading && ipfsStats1mLoading && userInfoLoading){
    <IpfsSkethon/>
  }

  return(
    <>
      <Meta
        title='IPFS'
        description=''
        image=''
      />
      <div className='flex'>
        <Menu/>
        <div className='grow bg-[#182036] pl-10 pr-16 pb-10 overflow-y-auto h-screen'>
          <div className='max-w-6xl mx-auto'>
          <Header
            title="IPFS"
            description="Whole data about your plans here"
            url = ''
            back = {false}
            backTitle = ""
            backUrl=""
          />
          <div className='mt-10'>
            <ApiKeyCard
              apiKey={userInfoData?.apiKey}
            />
          </div>
          <div className='mt-10 grid grid-cols-2 gap-4'>
            <div className=''>
              <StatusCard
                planStatus={ipfsPlanData?.subscribedPlan}
              />
            </div>
            <div className=''>
              <CircleChart
                planShow = {true}
                plandata = {ipfsPlanData?.subscribedPlan}
              />
            </div>
          </div>
          <div className='mt-6'>
            <GatewaySelect
              isReady = {isReady}
            />
          </div>
          <div className='mt-6'>
            <UsageBoard
              type = {'IPFS'}
              planStatus = {ipfsPlanData?.subscribedPlan}
              items24h = {ipfsStats24hData?.items}
              items7d = {ipfsStats7dData?.items}
              items1m = {ipfsStats1mData?.items}
            />
          </div>
          <div className='mt-16 text-center'>
            <CaptchaFooter/>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}   