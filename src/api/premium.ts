import { post } from '../lib/fetcher';
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import useSWRMutation from 'swr/mutation'


export const CreateOrderFunc = async(url:string, { arg: PostData }:any) => {
  const res = await post(url,PostData)
  return res
}

export type CreateOrder = {
  orderId: string,
  ccurrency: string,
  totalAmout: string,
  expireTime: number,
  qrcodeImgLink: string,
  qrContent: string,
}

export const useCreateOrder = () => {
  
  const{ data, trigger,error } = useSWRMutation<CreateOrder>('/v1/payment/create_order',CreateOrderFunc)
  return {
    trigger,
    data,
    error,
  }
}

