import { post } from '../lib/fetcher';
import useSWR from 'swr'

export type accountInfo ={
  id: number,
  apiKey: string,
  email: string,
  name: string,
}

export const useAccountInfo = () => {
  
  const{ data, error } = useSWR<accountInfo>('/v1/get_user',url => 
    post(url,{}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}