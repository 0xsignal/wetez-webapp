import { post } from '../lib/fetcher';
import useSWR from 'swr'

export type IPFSPlan = {
  subscribedPlan:{
    id: number
    totalStorage: number,
    transferUp : number,
    transferDown : number,
    todayUsage: number,
    status: 1 | 2 | 0 | -2
    expireAt: number
    chain:{
      chainId: number
      name: string
    }
    plan:{
      id: number,
      name: string,
      chainId: number,
      dayLimit: number,
      totalStorage:number,
      transferUp : number,
      transferDown : number,
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

export type IPFSStats24h = {
  items:{
    time: number
    count: number
    totalStorage: number
    transferUp: number
    transferDown: number
  }[]
}

export const useIPFSStats24h = () => {
  
  const{ data, error } = useSWR<IPFSStats24h>('/v2/stats/last24h',url => 
    post(url,{chainId:14}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}

export type IPFSStats7d = {
  items:{
    time: number
    count: number
    totalStorage: number
    transferUp: number
    transferDown: number
  }[]
}

export const useIPFSStats7d = () => {
  
  const{ data, error } = useSWR<IPFSStats7d>('/v2/stats/last7d',url => 
    post(url,{chainId:14}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}

export type IPFSStats1m = {
  items:{
    time: number
    count: number
    totalStorage: number
    transferUp: number
    transferDown: number
  }[]
}

export const useIPFSStats1m = () => {
  
  const{ data, error } = useSWR<IPFSStats1m>('/v2/stats/last1m',url => 
    post(url,{chainId:14}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}