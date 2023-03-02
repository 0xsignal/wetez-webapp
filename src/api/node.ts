import { getOutLink } from 'src/lib/fetcher'
import useSWR from 'swr'

type NodeList = {
  info:{
    delegateAmount: string,
    nodeAmount: string,
    totalStakeAmount: string,
  },
  list:{
    id: string,
    nodeName: string,
    symbol: string,
    apy: string,
    validatorAddress: string,
    delegateAmount: string,
    stakerAmout: string,
    slash: string,
  }[],
}

export const useNodeList = () => {
  
  const{ data, error } = useSWR<NodeList>("https://api.wetez.io/blossom/v1/officialapi/wallet/poollist",getOutLink)

  return {
    data,
    loading: !error && !data,
    error,
  }
}
