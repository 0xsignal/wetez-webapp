import React from "react";
import { Meta } from "../Meta";
import { Menu } from "../Menu";
import { Header } from "../Header";
import clsx from "clsx";
import { Disclosure } from "@headlessui/react";

export default function NodeSkethon(){
  return(
  <>
    <Meta
      title=''
      description=''
      image=''
    />
    <div className='flex'>
      <Menu/>
      <div className='grow bg-[#182036] pl-10 pr-10'>
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
            <div className="mt-20">
              <div className="relative space-y-5 overflow-hidden rounded-2xl bg-white/5 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:-skew-x-12 before:animate-[shimmer_2s_infinite] before:border-t before:border-white/10 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent">
                <div className="h-24 rounded-lg bg-white/5"></div>
                <div className="space-y-3">
                  <div className="h-5 w-4/5 rounded-lg bg-white/5"></div>
                  <div className="h-5 w-4/5 rounded-lg bg-white/10"></div>
                  <div className="h-5 w-4/5 rounded-lg bg-white/5"></div>
                  <div className="h-5 w-4/5 rounded-lg bg-white/5"></div>
                  <div className="h-5 w-4/5 rounded-lg bg-white/5"></div>
                  <div className="h-5 w-4/5 rounded-lg bg-white/5"></div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </>
  )
}
