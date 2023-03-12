import React from "react";
import { Meta } from "../Meta";
import { Menu } from "../Menu";
import { Header } from "../Header";

export default function SettingsSkethon(){
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
            title="Settings"
            description="Account Settings : name, email and password"
            url = ''
            back = {false}
            backTitle = ""
            backUrl=""
          />
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
