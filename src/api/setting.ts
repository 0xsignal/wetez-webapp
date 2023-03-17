import { post } from '../lib/fetcher';
import useSWR from 'swr'

export type accountInfo ={
  id: number,
  apiKey: string,
  email: string,
  name: string,
}

export const useAccountInfo = (isReady:boolean) => {
  
  const{ data, error } = useSWR<accountInfo>(isReady ? '/v1/get_user' : null ,url => 
    post(url,{}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}