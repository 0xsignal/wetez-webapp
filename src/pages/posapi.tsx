import { Menu } from '../components/Menu'
import { Header } from '../components/Header'
import { ApiKeyCard } from 'src/components/Card/ApiKeyCard'
import { ApiList,useApiList } from 'src/api/posapi'
import InfiniteList from 'src/components/List/InfiniteList';
import { useEvent } from 'src/lib/hooks';
import ApiPlanCard from 'src/components/Card/ApiPlanCard';
import { Meta } from 'src/components/Meta';


export default function Posapi() {

  const { data, error, loading, size, setSize } = useApiList()
  
  const getApiList =  (data: ApiList[] | undefined) =>
    data?.map(page => page?.list).filter(Boolean)
    .reduce((accu, curr) => accu.concat(curr), [])
  
  const apiList = getApiList(data) || []

  const onLoadMore = useEvent(() => setSize(size + 1))
  const canLoadMore = size < (data == undefined ? 0 : data?.[data?.length - 1]?.pagination.totalPages)

  console.log(data)

  if (loading || !data) return <>加载中</>
  if (error) return <>加载失败</>


  return(
    <>
       <Meta
        title=''
        description=''
        image=''
      />
       <div className='flex'>
        <Menu/>
        <div className='grow bg-[#182036] pl-10 pr-10 overflow-y-auto h-screen pb-6'>
          <Header
            title="POS APIs"
            description="Whole data about your plans here"
          />
          <div className='mt-10'>
            <ApiKeyCard
              apiKey = {data[0]?.apiKey}
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
    </>
  )


}