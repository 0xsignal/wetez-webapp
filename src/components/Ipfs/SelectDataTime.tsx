import React from 'react';
import { Tab } from '@headlessui/react';
import dynamic from 'next/dynamic'


const LineCharts = dynamic(
  () => import('../Chart/LineCharts'),
  { ssr: false }
)

function classNames(...classes:any[]) {
  return classes.filter(Boolean).join(' ')
}


export function SelectDataTime(){
  return (
    <div className=''>
      <Tab.Group>
        <Tab.List className="space-x-0 float-right -mt-10 rounded-[28px] bg-white/5 border-[1px] border-[#262D42]">
          <Tab className={({ selected }) =>
            classNames(
              'px-8 py-2 text-center text-base border-[0px] outline-none rounded-[28px]',
              selected
              ? 'bg-[#2A23FF] text-white font-bold'
              : 'text-white/50'
            )
          }>
            1D
          </Tab>
          <Tab className={({ selected }) =>
            classNames(
              'px-8 py-2 text-center text-base border-[0px] outline-none rounded-[28px]',
              selected
              ? 'bg-[#2A23FF] text-white font-bold'
              : 'text-white/50'
            )
          }>
            1W
          </Tab>
          <Tab className={({ selected }) =>
            classNames(
              'px-8 py-2 text-center text-base border-[0px] outline-none rounded-[28px]',
              selected
              ? 'bg-[#2A23FF] text-white font-bold '
              : 'text-white/50'
            )
          }>
            1M
          </Tab>
        </Tab.List>
        <Tab.Panels>
            
        <Tab.Panel className="pt-2">
          <LineCharts/>
        </Tab.Panel>

        

        </Tab.Panels>
        
        
      </Tab.Group>
    </div>
  )
}