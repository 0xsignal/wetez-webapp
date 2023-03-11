import React from 'react';
import NodeItemCard from 'src/components/Card/NodeItemCard';
import { useNodeList } from 'src/api/node';
import { Meta } from 'src/components/Meta';
import { Menu } from 'src/components/Menu';
import { Header } from 'src/components/Header';
import { Disclosure } from '@headlessui/react'
import { pass } from 'src/lib/fp';
import NodeSkethon from 'src/components/Skethon/NodeSkethon';


export default function Node(){

  const {
    data: nodeListData ,
    loading: nodeListLoading,
    error: nodeListError,
  } = useNodeList()

  if(nodeListLoading){
    return(
      <NodeSkethon/>
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
        <div className='grow bg-[#182036] pl-10 pr-16 overflow-y-auto h-screen pb-6'>
          <div className='max-w-6xl mx-auto'>
            <Header
              title="Node"
              description="Whole data about your plans here"
              url = ''
              back = {false}
              backTitle = ""
              backUrl=""
            />
            <div className="mt-10 w-full rounded-[16px] px-5 py-3 border-[1px] border-white/30 bg-white/5">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex items-center w-full p-2 text-white/50">
                      <span>How to delegate to Wetez Validator?</span>
                      <div className='grow'></div>
                      <img src={open ? '/image/arrow_disclousure_open.png':'/image/arrow_disclousure_icon.png'} className='h-4'/>
                    </Disclosure.Button>
                    <Disclosure.Panel className="pt-4 px-2 pb-2 text-sm text-white/50 leading-relaxed">
                      <p>1. Find the Token Portal you want to stake</p>
                      <p>2. Click the Delegate button and get the delegated info</p>
                      <p>3. Follow the delegate info and delegate your stake, then sit behind and enjoy the reward</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            <div className='mt-12 grid grid-cols-4 gap-x-4 gap-y-6'>
              {nodeListData?.list.map((item,index) => (
                <NodeItemCard
                  id = {item.id}
                  name = {item.nodeName}
                  apy = {item.apy}
                  symbol = {item.symbol}
                  open = {pass}
                  key = {item.id}
                  address = {item.validatorAddress}
                  stakerDelegate = {item.stakerAmount}
                  slash = {item.slash}
                  delegateAmout = {item.delegateAmount}
                  indexArray = {index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}