import { post } from '../lib/fetcher';
import useSWRInfinite from 'swr/infinite'
import useSWR from 'swr'


export type ApiList = {
  apiKey: string,
  list: {
    id: number,
    todayUsage: number,
    status: number,
    expireAt: number,
    chain:{
      chainId: number,
      name: string,
    },
    plan:{
      id: number,
      name: string,
      chainId: number,
      price: number,
      dayLimit: number,
      secondLimit: number,
      subscriptionStatus: number,
      totalStorage: number,
      transferUp: number,
      transferDown: number,
      current: boolean,
    }
  }[],
  pagination:{
    totalCount: number,
    totalPages: number,
    currentPage: number,
    pageSize: number
  }
}

export const apiListAPI = '/v1/get_subscribed_list'

export const useApiList = () => {
  const getKey: (
    pageIndex: number,
    previousPageData?: ApiList,
  ) => [string, number] | null = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.list.length) return null
    return [apiListAPI, pageIndex+1]
  }

  const { data, error, isLoading, size, setSize } = useSWRInfinite<ApiList>(
    getKey,
    ([apiListAPI,pageIndex]) => post(apiListAPI,{ page: pageIndex, pageSize: 10, chainType: 1}),
    { revalidateFirstPage: false },
  )

  return {
    data,
    isLoading,
    error,
    size,
    setSize,
  }
}

export type ChainPlan = {
  subscribedPlan:{
    id: number
    todayUsage: number
    totalStorage: number,
    transferUp : number,
    transferDown : number,
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
      totalStorage:number,
      transferUp : number,
      transferDown : number,
      dayLimit: number,
    }
    endpoints:string[]
  }
}

export const useChainPlan = (chainId:number,isReady:boolean) => {
  
  const{ data, error } = useSWR<ChainPlan>(isReady ? '/v1/get_premium_plans' : null,url => 
    post(url,{chainId: chainId}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}

export type ChainStats24h = {
  items:{
    time: number
    count: number
    totalStorage: number
    transferUp: number
    transferDown: number
  }[]
}

export const useChainStats24h = (chainId:number,isReady:boolean) => {
  
  const{ data, error } = useSWR<ChainStats24h>(isReady ? '/v2/stats/last24h': null,url => 
    post(url,{chainId:chainId}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}

export type ChainStats7d = {
  items:{
    time: number
    count: number
    totalStorage: number
    transferUp: number
    transferDown: number
  }[]
}

export const useChainStats7d = (chainId:number,isReady:boolean) => {
  
  const{ data, error } = useSWR<ChainStats7d>(isReady? '/v2/stats/last7d':null,url => 
    post(url,{chainId:chainId}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}

export type ChainStats1m = {
  items:{
    time: number
    count: number
    totalStorage: number
    transferUp: number
    transferDown: number
  }[]
}

export const useChainStats1m = (chainId:number,isReady:boolean) => {
  
  const{ data, error } = useSWR<ChainStats1m>(isReady ? '/v2/stats/last1m': null ,url => 
    post(url,{chainId:chainId}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}