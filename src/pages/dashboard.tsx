import { Meta } from '../components/Meta'
import { Menu } from '../components/Menu'
import { CurrentPlanCard } from '../components/Card/CurrentPlanCard'
import { Header } from '../components/Header'
import { ApiUsageCard } from '../components/Card/ApiUsageCard'
import { useCurrentPlans,useSubscribedList } from 'src/api/dashboard'
import { useIPFSPlan } from 'src/api/ipfs'
import dynamic from 'next/dynamic'
import DashboardSkethon from 'src/components/Skethon/DashboardSkethon'

const CircleChart = dynamic(
  () => import('../components/Chart/CircleChart'),
  { ssr: false }
)

const TagList = [
  {
    planName:'Team'
  },
  {
    planName:'Growth'
  },
  {
    planName:'Developer'
  },
]

export default function Dashboard() {

  const{
    data: currentPlan,
    error: planError,
    loading: planLoading,
  } = useCurrentPlans()

  const{
    data: subscribedList,
    error: listError,
    loading: listLoading,
  } = useSubscribedList()

  const {
    data: ipfsPlanData ,
    loading:ipfsPlanLoading,
    error:ipfsPlanError,
  } = useIPFSPlan()

  let paid:boolean = false
  if(!currentPlan && !planLoading && !ipfsPlanLoading){
    paid = true
  }

  if( planLoading && listLoading && ipfsPlanLoading){
    return <DashboardSkethon/>
  }


  return(
    <>
      <Meta
        title=''
        description=''
        image=''
      />
      <div className='flex'>
        <Menu/>
        <div className='grow bg-[#182036] pl-10 pr-16'>
          <div className='max-w-6xl mx-auto'>
            <Header
              title="Dashboard"
              description="Whole data about your plans here"
              url = ''
              back = {false}
              backTitle = ""
              backUrl=""
            />
            <div className='px-0 py-10'>
              <div className='grid grid-cols-5 gap-4'>
                <div className='col-span-3'>
                  <ApiUsageCard
                    subscribePlanList={subscribedList?.list}
                  />
                </div>
                <div className='col-span-2'>
                  <CurrentPlanCard
                    paid = {paid}
                    tagList = {TagList}
                    planList = {currentPlan?.subscribedPlan}
                  />
                  <div className='mt-6'>
                    <CircleChart
                      planShow = {false}
                      plandata = {ipfsPlanData?.subscribedPlan}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
