import { post } from '../lib/fetcher';
import useSWR from 'swr'

export type IPFSPlan = {
  subscribedPlan:{
    id: number
    todayUsage: number
    status: 1 | 2 | 3
    expireAt: number
    chain:{
      chainId: number
      name: string
    }
    plan:{
      id: number
      name: string
      chainId: number
      dayLimit: number
    }
    endpoints:string[]
  }
}

export const useIPFSPlan = () => {
  
  const{ data, error } = useSWR<IPFSPlan>('/v1/get_premium_plans',url => 
    post(url,{chainId: 14}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}

export type IPFSGatewayList = {
  id: number
  userID: number
  dedicatedGateway: string
  active: boolean
}[]

export const useIPFSGatewayList = () => {
  
  const{ data, error } = useSWR<IPFSGatewayList>('/v1/ipfs/gateway/list',url => 
    post(url,{}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}


export const addGateway = async(data:{
  gateway: string
}) => {
  const res = await post('/v1/ipfs/gateway/add',data)
  return res
}

export const removeGateway = async(data:{
  gatewayID: number
}) => {
  const res = await post('/v1/ipfs/gateway/remove',data)
  return res
}

export const activeGateway = async(data:{
  gatewayID: number
}) => {
  const res = await post('/v1/ipfs/gateway/active',data)
  return res
}


