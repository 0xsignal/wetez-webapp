import React from "react";

type PlanTypeItemCardProps = {
  type: number
  chainId: number
  subscribedPlan:{
    id: number
    todayUsage: number,
    totalStorage: number,
    transferUp : number,
    transferDown : number,
    status: 1 | 2 | 3
    expireAt: number
    chain:{
      chainId: number
      name: string
    }
    plan:{
      id: number,
      name: string,
      price: number,
      dayLimit: number,
      secondLimit:number,
      chainId: number,
      totalStorage:number,
      transferUp : number,
      transferDown : number,
    }
    endpoints:string[]
  },
  upgradeablePlans:{
    id: number
  }[]
  
}

export default function PlanTypeItemCard({

}:PlanTypeItemCardProps) {

}