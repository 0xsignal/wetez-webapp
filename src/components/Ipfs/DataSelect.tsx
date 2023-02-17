import React, { useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Tab } from '@headlessui/react';
import dynamic from 'next/dynamic'
import moment from 'moment';
import { gbConvert } from 'src/lib/format';


const LineAreaChart = dynamic(
  () => import('../Chart/LineAreaChart'),
  { ssr: false }
)

type DataSelectProp = {
  items24h:{
    time: number
    count: number
    totalStorage: number
    transferUp: number
    transferDown: number
  }[],
  items7d:{
    time: number
    count: number
    totalStorage: number
    transferUp: number
    transferDown: number
  }[],
  items1m:{
    time: number
    count: number
    totalStorage: number
    transferUp: number
    transferDown: number
  }[],
}

function classNames(...classes:any[]) {
  return classes.filter(Boolean).join(' ')
}

const dataType = [
  {
    id: "1",
    name: "Total Storage",
  },
  {
    id: "2",
    name: "Data Transfer Up",
  },
  {
    id: "3",
    name: "Data Transfer Down",
  },
]


export function DataSelect({
  items24h = [{
    time: 1,
    count: 1,
    totalStorage: 1,
    transferUp: 1,
    transferDown: 1,
}],
  items7d = [{
    time: 1,
    count: 1,
    totalStorage: 1,
    transferUp: 1,
    transferDown: 1,
}],
  items1m = [{
    time: 1,
    count: 1,
    totalStorage: 1,
    transferUp: 1,
    transferDown: 1,
}],}:DataSelectProp){

  let item24hStorageData = [0]
  let item24hUpData = [0]
  let item24hDownData = [0]
  let item24hDate = 
  ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00',
  '13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
  let item24hLength = items24h.length

  let item1wStorageData = [0]
  let item1wUpData = [0]
  let item1wDownData = [0]
  let item1wDate = ['']
  let item1wLength = items7d.length

  let item1mStorageData = [0]
  let item1mUpData = [0]
  let item1mDownData = [0]
  let item1mDate = ['']
  let item1mLength = items1m.length


  for (let i = 0; i < item24hLength; i++) {
    item24hStorageData[i] = gbConvert(items24h[i].totalStorage)
    item24hUpData[i] = gbConvert(items24h[i].transferUp)
    item24hDownData[i] = gbConvert(items24h[i].transferDown)
  }

  for (let i = 0; i < item1wLength; i++) {
    item1wStorageData[i] = gbConvert(items7d[i].totalStorage)
    item1wUpData[i] = gbConvert(items7d[i].transferUp)
    item1wDownData[i] = gbConvert(items7d[i].transferDown)
    item1wDate[i] = moment(items7d[i].time*1000).format('l')
  }

  for (let i = 0; i < item1mLength; i++) {
    item1mStorageData[i] = gbConvert(items1m[i].totalStorage)
    item1mUpData[i] = gbConvert(items1m[i].transferUp)
    item1mDownData[i] = gbConvert(items1m[i].transferDown)
    item1mDate[i] = moment(items1m[i].time*1000).format('l')
  }

  const [selected, setSelected] = useState(dataType[0])
  const [item1DData,setItem1DData] = useState(item24hStorageData)
  const [item1wData,setItem1wData] = useState(item1wStorageData)
  const [item1mData,setItem1mData] = useState(item1mStorageData)


  useEffect(()=>{
    switch(selected){
      case dataType[0]:
        setItem1DData(item24hStorageData)
        break
      case dataType[1]:
        setItem1DData(item24hUpData)
        break
      case dataType[2]:
        setItem1DData(item24hDownData)
        break
    }
  },[selected,items24h])

  useEffect(()=>{
    switch(selected){
      case dataType[0]:
        setItem1wData(item1wStorageData)
        break
      case dataType[1]:
        setItem1wData(item1wUpData)
        break
      case dataType[2]:
        setItem1wData(item1wDownData)
        break
    }
  },[selected,items7d])

  useEffect(()=>{
    switch(selected){
      case dataType[0]:
        setItem1mData(item1mStorageData)
        break
      case dataType[1]:
        setItem1mData(item1mUpData)
        break
      case dataType[2]:
        setItem1mData(item1mDownData)
        break
    }
  },[selected,items1m])

  return (
    <div className='relative'>
      <div className="sticky w-52 z-10">
        <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <div className="relative mt-1">
            <Listbox.Button className="relative flex gap-x-1 items-center text-left w-full rounded-[6px] border-[1px] border-white/20 py-3 px-5 text-white text-sm">
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
              <Listbox.Options className="absolute mt-1 w-full text-left overflow-auto rounded-[6px] text-white/50 bg-[#1A2238] text-sm">
                {dataType.map((dataType) => (
                  <Listbox.Option
                    key={dataType.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-3 px-5 ${
                        active ? 'bg-[#2A23FF] text-white' : 'text-white/50'
                      }`
                    }
                    value={dataType}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {dataType.name}
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
    <div className=''>
      <Tab.Group>
        <Tab.List className="space-x-0 float-right -mt-10 rounded-[28px] bg-white/5 border-[1px] border-[#262D42]">
          <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={classNames(
                selected ? 'bg-[#2A23FF] text-white font-bold':'text-white/50',
                'px-8 py-2 text-center text-base border-[0px] outline-none rounded-[28px]',
          )}
            >
              1D
            </button>
          )}
          </Tab>
          <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={classNames(
                selected ? 'bg-[#2A23FF] text-white font-bold':'text-white/50',
                'px-8 py-2 text-center text-base border-[0px] outline-none rounded-[28px]',
          )}
            >
              1W
            </button>
          )}
          </Tab>
          <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={classNames(
                selected ? 'bg-[#2A23FF] text-white font-bold':'text-white/50',
                'px-8 py-2 text-center text-base border-[0px] outline-none rounded-[28px]',
          )}
            >
              1M
            </button>
          )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
        <Tab.Panel className="pt-2">
          <LineAreaChart
            data = {item1DData}
            date = {item24hDate}
          />
        </Tab.Panel>
        <Tab.Panel className="pt-2">
          <LineAreaChart
            data = {item1wData}
            date = {item1wDate}
          />
        </Tab.Panel>
        <Tab.Panel className="pt-2">
          <LineAreaChart
            data = {item1mData}
            date = {item1mDate}
          />
        </Tab.Panel>
        </Tab.Panels>     
      </Tab.Group>
    </div>
  </div>
  )
}