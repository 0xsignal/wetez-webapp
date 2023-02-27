import React from 'react';
import { Meta } from '../components/Meta'
import { Menu } from '../components/Menu'
import { ApiKeyCard } from '../components/Card/ApiKeyCard'
import { StatusCard } from '../components/Card/StatusCard'
import  UsageBoard  from '../components/Ipfs/UsageBoard'
import { Header } from '../components/Header'
import { GatewaySelect } from '../components/Ipfs/GatewaySelect';
import dynamic from 'next/dynamic'
import { useIPFSGatewayList,useIPFSPlan } from 'src/api/ipfs';
import { addGateway,removeGateway,activeGateway } from 'src/api/ipfs';
import { useIPFSStats1m,useIPFSStats24h,useIPFSStats7d } from 'src/api/ipfs';

const CircleChart = dynamic(
  () => import('../components/Chart/CircleChart'),
  { ssr: false }
)

export default function Ipfs() {

  const {
    data: ipfsPlanData ,
    loading:ipfsPlanLoading,
    error:ipfsPlanError,
  } = useIPFSPlan()

  const {
    data: gatewayListData ,
    loading:gatewayListLoading,
    error:gatewayListError,
  } = useIPFSGatewayList()


  const {
    data: ipfsStats24hData ,
    loading: ipfsStats24hLoading,
    error: ipfsStats24hError,
  } = useIPFSStats24h()

  const {
    data: ipfsStats7dData ,
    loading: ipfsStats7dLoading,
    error: ipfsStats7dError,
  } = useIPFSStats7d()

  const {
    data: ipfsStats1mData ,
    loading: ipfsStats1mLoading,
    error: ipfsStats1mError,
  } = useIPFSStats1m()

  if( ipfsPlanLoading && gatewayListLoading && ipfsStats24hLoading && ipfsStats7dLoading && ipfsStats1mLoading){
    return(
      <div className='text-black text-7xl'>
        h1
      </div>
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
        <div className='grow bg-[#182036] pl-10 pr-10 overflow-y-auto h-screen'>
          <Header
            title="IPFS"
            description="Whole data about your plans here"
          />
          <div className='mt-10'>
            <ApiKeyCard
              apiKey=''
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
              addGateway={addGateway}
              delateGateway={removeGateway}
              activeGateway={activeGateway}
              gatewayItemList={gatewayListData}
            />
          </div>
          <div className='mt-6'>
            <UsageBoard
              planStatus = {ipfsPlanData?.subscribedPlan}
              items24h = {ipfsStats24hData?.items}
              items7d = {ipfsStats7dData?.items}
              items1m = {ipfsStats1mData?.items}
            />
          </div>
        </div>
      </div>

    </>
  )
}
