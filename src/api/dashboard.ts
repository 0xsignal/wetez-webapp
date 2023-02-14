import { post } from '../lib/fetcher';
import useSWR from 'swr'

export type CurrenPlans = {
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
    }
  }[]
}

export const useCurrentPlans = () => {
  
  const{ data, error } = useSWR<CurrenPlans>('/get_paid_plans',url => 
    post(url,{}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}

export type SubscribedList = {
  list:{
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
  }[]
}

export const useSubscribedList = () => {
  
  const{ data, error } = useSWR<SubscribedList>('/get_subscribed_list',url => 
    post(url,{page:1,pageSize:6}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}