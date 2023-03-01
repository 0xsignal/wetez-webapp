import { post } from '../lib/fetcher';
import useSWRInfinite from 'swr/infinite'
import useSWRMutation from 'swr/mutation'
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

export const ApiListFetcher:(
  pageIndex: number,
) => Promise<ApiList> = pageIndex =>
  post<ApiList>(
    apiListAPI,{page: Number(pageIndex) + 1, pageSize: 10, chainType: 1}
)

export const useApiList = () => {
  const getKey: (
    pageIndex: number,
    previousPageData: ApiList,
  ) => [number] | null = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.list?.length) return null
    return [pageIndex]
  }

  const { data, error, size, setSize } = useSWRInfinite<ApiList>(
    getKey,
    ApiListFetcher,
    { revalidateFirstPage: false },
  )

  return {
    data,
    loading: !error && !data,
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