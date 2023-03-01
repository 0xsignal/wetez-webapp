import React from "react";
import { pass } from "src/lib/fp";

type NodeItemCardProps = {
  id: string,
  name: string,
  apy: string,
  symbol: string,
  open: () => void
}

export default function NodeItemCard ({
  id = '',
  name = '',
  apy = '',
  symbol = '',
  open = pass,
}:NodeItemCardProps){


  return(
    <div className="bg-white/5 rounded-[24px] px-6 py-3">
      <div className="mt-4 text-white font-bold text-base text-center">
        {name}
      </div>
      <div className="mt-8 text-4xl text-white/50 font-brand">
        {apy}
      </div>
      <div className="mt-2 text-base text-white/30">
        {symbol} APY
      </div>
      <div 
        className="mt-3 bg-[#2A23FF] rounded-[24px] mx-auto text-center px-4 py-2 text-white"
        onClick={open}
        >
        Delegate
      </div>
    </div>
  )
}