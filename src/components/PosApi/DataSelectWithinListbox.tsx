import React, { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { Tab } from '@headlessui/react';
import dynamic from 'next/dynamic'
import moment from 'moment';


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


export function DataSelectWithinListbox({
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

  let item24hUsage = [0]
  let item24hDate = 
  ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00',
  '13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
  let item24hLength = items24h.length

  let item1wUsage = [0]
  let item1wDate = ['']
  let item1wLength = items7d.length

  let item1mUsage = [0]
  let item1mDate = ['']
  let item1mLength = items1m.length


  for (let i = 0; i < item24hLength; i++) {
    item24hUsage[i] = items24h[i].count
  }

  for (let i = 0; i < item1wLength; i++) {
    item1wUsage[i] = items7d[i].totalStorage
    item1wDate[i] = moment(items7d[i].time*1000).format('l')
  }

  for (let i = 0; i < item1mLength; i++) {
    item1mUsage[i] = items1m[i].totalStorage
    item1mDate[i] = moment(items1m[i].time*1000).format('l')
  }

  const [item1DData,setItem1DData] = useState(item24hUsage)
  const [item1wData,setItem1wData] = useState(item1wUsage)
  const [item1mData,setItem1mData] = useState(item1mUsage)


  useEffect(()=>{
    setItem1DData(item24hUsage)
  },[items24h])

  useEffect(()=>{
   setItem1wData(item1wUsage)
  },[items7d])

  useEffect(()=>{
    setItem1mData(item1mUsage)
  },[items1m])

  return (
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
  )
}