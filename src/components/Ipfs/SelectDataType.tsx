import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

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

export function SelectDataType(){

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
