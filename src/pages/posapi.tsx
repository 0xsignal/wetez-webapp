import { Menu } from '../components/Menu'
import { Header } from '../components/Header'
import { ApiKeyCard } from 'src/components/Card/ApiKeyCard'
import { ApiList,useApiList } from 'src/api/posapi'
import InfiniteList from 'src/components/List/InfiniteList';
import { useEvent } from 'src/lib/hooks';
import ApiPlanCard from 'src/components/Card/ApiPlanCard';
import { Meta } from 'src/components/Meta';
import PosapiSkethon from 'src/components/Skethon/PosapiSkethon';


export default function Posapi() {

  const { 
    data: apiListData, 
    error: apiListError, 
    isLoading: apiListLoading, 
    size: apiListSize, 
    setSize: setApiListSize } = useApiList()
  
  const getApiList =  (apiListData: ApiList[] | undefined) =>
  apiListData?.map(page => page?.list).filter(Boolean)
    .reduce((accu, curr) => accu.concat(curr), [])
  
  const apiList = getApiList(apiListData) || []

  const onLoadMore = useEvent(() => setApiListSize(apiListSize + 1))
  const canLoadMore = apiListSize < (apiListData == undefined ? 0 : apiListData?.[apiListData?.length - 1]?.pagination.totalPages)

  if (apiListLoading) return <PosapiSkethon/>
  

  return(
    <>
       <Meta
        title=''
        description=''
        image=''
      />
       <div className='flex'>
        <Menu/>
        <div className='grow bg-[#182036] pl-10 pr-16 overflow-y-auto h-screen pb-6'>
        <div className='max-w-6xl mx-auto'>
          <Header
            title="POS APIs"
            description="Whole data about your plans here"
            url = ''
            back = {false}
            backTitle = ""
            backUrl=""
          />
          <div className='mt-10'>
            <ApiKeyCard
              apiKey = {apiListData?.[0]?.apiKey || ''}
            />
            <div className='mt-2 py-2'>
              <div className='my-8 text-xl text-white/30 font-bold'> All Plans</div>
              <InfiniteList
                onLoadMore = {onLoadMore}
                canLoadMore = {canLoadMore}
              >
                <div className='grid grid-cols-2 gap-6'>
                  {(apiList.map((item) => (
                    <ApiPlanCard
                      id = {item.id}
                      chainId = {item.chain.chainId}
                      name = {item.chain.name}
                      status = {item.status}
                      usage = {item.todayUsage}
                      dayLimit = {item.plan.dayLimit}
                      key = {item.id}
                    />
                  )))}
                </div>
              </InfiniteList>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}