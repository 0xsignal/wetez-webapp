import { post } from '../lib/fetcher';
import useSWRInfinite from 'swr/infinite'
import useSWRMutation from 'swr/mutation'

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
    apiListAPI,{page: Number(pageIndex) + 1, pageSize: 10}
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