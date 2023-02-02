import { Meta } from '../components/Meta'
import { Menu } from '../components/Menu'
import { PlanCard } from '../components/Dashboard/PlanCard'
import { Header } from '../components/Header'
import { ApiUsageCard } from '../components/Dashboard/ApiUsageCard'
import dynamic from 'next/dynamic'

const CircleChart = dynamic(
  () => import('../components/CircleChart'),
  { ssr: false }
)


export default function Dashboard() {

  return(
    <>
      <Meta
        title=''
        description=''
        image=''
      />
      <div className='flex'>
        <Menu/>
        <div className='grow bg-[#182036] pl-20 pr-10'>
          <Header
            title="Dashboard"
            description="Whole data about your plans here"
          />
          <div className='px-0 py-10'>
            <div className='grid grid-cols-5 gap-4'>
              <div className='col-span-3'>
                <ApiUsageCard/>
              </div>
              <div className='col-span-2'>
                <PlanCard/>
                <div className='mt-6'>
                  <CircleChart/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
