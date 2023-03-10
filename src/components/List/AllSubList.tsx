import React from "react";
import PlanTag from "../Tag/PlanTag";

export default function AllSubList(){


  return(
    <div className='rounded-[16px] px-6 py-6 bg-white/5'>
    <div className='flex space-x-4'>
      <h1 className='text-white text-2xl font-bold'> My Current Plan </h1>
    </div>
    <div className="mt-10 grid grid-cols-8 gap-2">
      <div className="text-base text-white/30">
        Network
      </div>
      <div className="text-base text-white/30">
        Type
      </div>
      <div className="col-span-2 text-base text-white/30">
        Description
      </div>
      <div className="text-base text-white/30 col-span-2">
        Expire at (UTC)
      </div>
      <div className="text-base text-white/30">
        Price
      </div>
      <div className="text-base text-white/30">
      </div>
    </div>
    <div className="mt-4 border-[1px] border-white/10"></div>

  </div>
  )
}