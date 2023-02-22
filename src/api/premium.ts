import { post } from '../lib/fetcher';
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import useSWRMutation from 'swr/mutation'

export type PlanDetail = {
  subscribedPlan:{
    id: number
    totalStorage: number,
    transferUp : number,
    transferDown : number,
    status: 1 | 2 | 3
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
    }
    endpoints:string[]
  },
  upgradeablePlans:{
    id: number
  }[]
}


export type CreateOrder = {
  orderId: string,
  ccurrency: string,
  totalAmout: string,
  expireTime: number,
  qrcodeImgLink: string,
  qrContent: string,
}

export const CreateOrderFunc = async(url:string, { arg: PostData }:any) => {
  const res = await post(url,PostData)
  return res
}

export const useCreateOrder = () => {
  
  const{ data, trigger,error } = useSWRMutation<CreateOrder>('/v1/payment/create_order',CreateOrderFunc)
  return {
    trigger,
    loading: !error && !data,
    data,
    error,
  }
}

export type OrderDetail = {
  orderId: string,
  chainId: number,
  chainName: string,
  planId: number,
  planName: string,
  totalAmount: string,
  quantity: number,
  currency: string,
  date: string,
  status: number,
  shippingStatus: number,
  description: string,
  unitPrice: string,
  summary: {
    date: string,
    from: string,
    to: string,
    paymentMethod: string,
  }
}

export const OrderDetailFunc = async(url:string, { arg: PostData }:any) => {
  const res = await post(url,PostData)
  return res
}

export const useOrderDetail = () => {
  const{ data, trigger,error } = useSWRMutation<OrderDetail>('/v1/payment/get_order_detail',OrderDetailFunc)
  return {
    trigger,
    loading: !error && !data,
    data,
    error,
  }
}

export type OrderList = {
  list:{
    orderId: string,
    chainId: number,
    chainName: string,
    planId: number,
    planName: string,
    totalAmount: string,
    quantity: number,
    currency: string,
    date: string,
  }[],
  pagination:{
    currentPage: number,
    pageSize: number,
    totalCount: number,
    totalPages: number,
  },
}


export const orderListAPI = '/v1/payment/get_order_list'

export const OrderListFetcher:(
  pageIndex: number,
) => Promise<OrderList> = pageIndex =>
  post<OrderList>(
    orderListAPI,{page: Number(pageIndex) + 1}
)

export const useOrderList = () =>{
  const getKey:(
    pageIndex: number,
    previousPageData:OrderList,
  ) => [number] | null = (pageIndex,previousPageData) => {
    if(previousPageData && !previousPageData.list.length) return null
    return [pageIndex]
  }

  const { data, error, size, setSize } = useSWRInfinite<OrderList>(
    getKey,
    OrderListFetcher,
    { revalidateFirstPage: false, initialSize: 1 },
  )

  return {
    data,
    loading: !error && !data,
    error,
    size,
    setSize,
  }

}