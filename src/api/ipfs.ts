import { post } from '../lib/fetcher';
import useSWR from 'swr'

export type IPFSPlan = {
  IPFSPlan:{
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
    endpoints:{
      endpoint: string
    }[]
  }
}

export const useIPFSPlan = () => {
  
  const{ data, error } = useSWR<IPFSPlan>('/get_premium_plans',url => 
    post(url,{chainId: 14}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}