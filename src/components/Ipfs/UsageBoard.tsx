import React from 'react';
import { Fragment, useState } from 'react'
import { Listbox, Transition, Tab } from '@headlessui/react'
import dynamic from 'next/dynamic'


const LineCharts = dynamic(
  () => import('../LineCharts'),
  { ssr: false }
)


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

function classNames(...classes:any[]) {
  return classes.filter(Boolean).join(' ')
}

function SelectDataType(){

  const [selected, setSelected] = useState(dataType[0])

  return (
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
  )

}

function SelectDataTime(){
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


export default function UsageBoard() {


  return(
    <div className='bg-white/5 rounded-[24px]'>
      <div className='px-6 py-6'>
        <div className='text-xl text-white font-bold'>
          Volume History
        </div>
        <div className='mt-4 flex gap-x-2 text-sm'>
          <div className='font-bold text-white'>
            23.24GB
          </div>
          <div className='text-white/50'>
            Total Storage in Fri 16 Dec 2022
          </div>
        </div>
        <div className='mt-4 relative'>
          <SelectDataType/>
          <SelectDataTime/>
        </div>
      </div>
    </div>
  )
}