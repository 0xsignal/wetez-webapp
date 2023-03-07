import React, { useEffect, useState } from 'react';
import { PlanDetail, useCreateOrder, usePlanDetailFunc } from 'src/api/premium';
import { Listbox,Transition } from '@headlessui/react';
import { Fragment } from 'react';
import clsx from 'clsx';
import PlanDetailCard from '../Card/PlanDetailCard';


type PlanListProps = {
  id?: number,
  apiKey?: string,
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
  currentPlan: string | undefined,
  list:{
    id: number,
    name: string,
    chainId: number,
    price: number,
    dayLimit: number,
    secondLimit : number,
    totalStorage: number,
    transferUp: number,
    transferDown: number,
    current: boolean,
  }[] | undefined,
}

export default function PlanList({
  id: number,
  apiKey: string,
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
  currentPlan = '',
  list = [{
    id: 0,
    name: '',
    chainId: -1,
    price: 0,
    dayLimit: 1,
    secondLimit : 1,
    totalStorage: 1,
    transferUp: 1,
    transferDown: 1,
    current: false,
  }],
}:PlanListProps) {

  const{
    trigger: planDetailTrigger,
    isMutating: planDetailIsMutating, 
    data: planDetailData,
   } = usePlanDetailFunc()
  
  const listLength = subscribedPlans.length


  let categoryList: {
    id: number,
    name: string,
  }[] = [{id: 0 , name: 'All Subscriptions'},]

  for(let i=0;i<listLength;i++){
    categoryList.push({id:subscribedPlans[i].chain.chainId,name:subscribedPlans[i].chain.name})
  }

  const [selected,setSelected] = useState(categoryList[0])
  const [planList,setPlanList] = useState(list)
  const [currentPlanName,setCurrentPlanName] = useState(currentPlan)

  const upgradeListData = async() => {
    const res = await planDetailTrigger({chainId:selected.id})
    setPlanList(res?.list || [])
    setCurrentPlanName(res?.currentPlan || '')
  }

  useEffect(() => {
    if(selected.name == 'All Subscriptions'){
    } else {
      upgradeListData()
  }
  },[selected])

  return(
      <div className=''>
        <div className="sticky w-52 z-10">
          <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <div className="relative mt-1">
              <Listbox.Button 
                className="relative flex gap-x-1 items-center text-left w-full rounded-[6px] border-[1px] border-white/20 py-3 px-5 text-white text-sm" 
              >
                <span className="block truncate">{selected.name}</span>
                <div className='grow'></div>
                <img
                  className={ `${ open ? 'rotate-180':''} h-2`}
                  src="/image/dropdown_icon.png"
                  alt="dropdown"
                />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 w-full text-left overflow-auto rounded-[6px] text-white/50 bg-[#1A2238] text-sm h-64 overflow-x-auto">
                  {categoryList.map((item) => (
                    <Listbox.Option
                      key={item.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-3 px-5 ${
                          active ? 'bg-[#2A23FF] text-white' : 'text-white/50'
                        }`
                      }
                      value={item}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {item.name}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>)}
          </Listbox>
      </div>
      <div className='mt-10'>
        <PlanDetailCard
          name = {selected.name}
          chainId = {selected.id}
          currentPlan = {currentPlanName}
          list = {planList}
          loading = {planDetailIsMutating}
        />
      </div>
    </div>
  )

}