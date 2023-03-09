import { post } from '../lib/fetcher';
import useSWRInfinite from 'swr/infinite'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'

export type CreateOrder = {
  orderId: string,
  currency: string,
  totalAmount: string,
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

export const OrderDetailFunc = async(url:string, { arg }:{ arg:{orderId: number}}) => {
  const res = await post(url,arg)
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
  orderListAPI: string,
) => Promise<OrderList> = (pageIndex) =>
  post<OrderList>(
    orderListAPI,{page: Number(pageIndex) + 1}
)

export const useOrderList = () =>{

  const getKey:(
    pageIndex: number,
    previousPageData: OrderList,
  ) => [string,number] | null = (pageIndex,previousPageData) => {
    if(previousPageData && !previousPageData.list.length) return null
    return [orderListAPI,pageIndex+1]
  }

  const { data, error, size, setSize } = useSWRInfinite<OrderList>(
    getKey,
    ([orderListAPI,pageIndex]) => post(orderListAPI,{page:pageIndex}),
    { revalidateFirstPage: false, initialSize: 1, }
  )
  
  return {
    data,
    loading: !error && !data,
    error,
    size,
    setSize,
  }
}

export type userInfo ={
  id: number,
  apiKey: string,
  subscribedPlans:{
    id: number
    todayUsage: number
    totalStorage: number,
    transferUp : number,
    transferDown : number,
    status: 1 | 2 | 0 | -2,
    expireAt: number,
    chain:{
      chainId: number,
      name: string,
    }
    plan:{
      id: number,
      name: string,
      chainId: number,
      dayLimit: number,
      price: number,
      totalStorage:number,
      transferUp : number,
      transferDown : number,
    }
  }[]
}

export const useUserrInfo = () => {
  
  const{ data, error } = useSWR<userInfo>('/v1/get_user',url => 
    post(url,{}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}

export type PlanDetail = {
  currentPlan: string,
  list:{
    id: number,
    name: string,
    chain_id: number,
    price: number,
    dayLimit: number,
    secondLimit : number,
    totalStorage: number,
    transferUp: number,
    transferDown: number,
    current: boolean,
  }[] | undefined
}

export const usePlanDetail = (chainId:number,isReady:boolean,isRequest:boolean) => {
  const{ data, error } = useSWR<PlanDetail>((isReady && isRequest) ? '/v1/get_chain_plans': null,url => 
    post(url,{chainId: chainId}),
  )
  return {
    data,
    loading: !error && !data,
    error,
  }
}

export const PlanDetailFunc = async(url:string, { arg }:{arg:{chainId:number}}) => {
  const res = await post(url,arg)
  return res
}

export const usePlanDetailFunc = () => {
  
  const{ trigger, isMutating, error } = useSWRMutation<PlanDetail>('/v1/get_chain_plans',PlanDetailFunc)
  return {
    trigger,
    isMutating,
    error,
  }
}