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

  if( ipfsPlanLoading && gatewayListLoading){
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
            <ApiKeyCard/>
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
            <UsageBoard/>
          </div>
        </div>
      </div>

    </>
  )
}
