import { post } from '../lib/fetcher';
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import useSWRImmutable from 'swr'

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

export const useIPFSPlan = (isReady:boolean) => {
  const{ data, error } = useSWR<IPFSPlan>(isReady?'/v1/get_premium_plans':null,url => 
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

export const useIPFSGatewayList = (isReady:boolean) => {
  const{ data, error } = useSWRImmutable<IPFSGatewayList>(isReady?'/v1/ipfs/gateway/list':false,url => 
    post(url,{}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}

export const IPFSGatewayListFunc:(url:string,{arg}:{arg:{}}) => Promise<IPFSGatewayList> = async(url,{arg})=>{
  const res = await post(url,arg)
  return res
}

export const useIPFSGatewayListFunc = () => {
  const{ data, trigger,isMutating,error } = useSWRMutation('/v1/ipfs/gateway/list',IPFSGatewayListFunc)
  return {
    trigger,
    isMutating,
    data,
    error,
  }
}


export const addGateway = async(data:{
  gateway: string
}) => {
  const res = await post('/v1/ipfs/gateway/add',data)
  return res
}

export type GatewayRes = boolean 

export const AddGatewayFunc:(url:string,{arg}:{arg:{gateway:string}}) => Promise<GatewayRes> = async(url,{arg})=>{
  const res = await post(url,arg)
  return res
}

export const useAddGateway = () => {
  const{ data, trigger,isMutating,error } = useSWRMutation('/v1/ipfs/gateway/add',AddGatewayFunc)
  return {
    trigger,
    isMutating,
    data,
    error,
  }
}

export const removeGatewayFunc:(url:string,{arg}:{arg:{gatewayID:number}}) => Promise<GatewayRes> = async(url,{arg})=>{
  const res = await post(url,arg)
  return res
}

export const useRemoveGateway = () => {
  const{ isMutating, trigger,error } = useSWRMutation('/v1/ipfs/gateway/remove',removeGatewayFunc)
  return {
    trigger,
    isMutating,
    error,
  }
}

export const activeGatewayFunc:(url:string,{arg}:{arg:{gatewayID:number}}) => Promise<GatewayRes> = async(url,{arg})=>{
  const res = await post(url,arg)
  return res
}

export const useActiveGateway = () => {
  const{ data, trigger,error } = useSWRMutation('/v1/ipfs/gateway/active',removeGatewayFunc)
  return {
    trigger,
    loading: !error && !data,
    data,
    error,
  }
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

export const useIPFSStats24h = (isReady:boolean) => {
  
  const{ data, error } = useSWR<IPFSStats24h>(isReady ? '/v2/stats/last24h':null,url => 
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

export const useIPFSStats7d = (isReady:boolean) => {
  
  const{ data, error } = useSWR<IPFSStats7d>(isReady?'/v2/stats/last7d':null,url => 
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

export const useIPFSStats1m = (isReady:boolean) => {
  
  const{ data, error } = useSWR<IPFSStats1m>(isReady ? '/v2/stats/last1m':null,url => 
    post(url,{chainId:14}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}