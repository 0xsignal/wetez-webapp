import { Meta } from '../components/Meta'
import { Menu } from '../components/Menu'
import { ApiKeyCard } from '../components/Ipfs/ApiKeyCard'
import { StatusCard } from '../components/Ipfs/StatusCard'
import  UsageBoard  from '../components/Ipfs/UsageBoard'
import { Header } from '../components/Header'
import dynamic from 'next/dynamic'

const CircleChart = dynamic(
  () => import('../components/CircleChart'),
  { ssr: false }
)


export default function Ipfs() {

  return(
    <>
      <Meta
        title=''
        description=''
        image=''
      />
      <div className='flex'>
        <Menu/>
        <div className='grow bg-[#182036] pl-20 pr-6 overflow-y-auto h-screen'>
          <Header
            title="IPFS"
            description="Whole data about your plans here"
          />
          <div className='mt-10'>
            <ApiKeyCard/>
          </div>
          <div className='mt-10 grid grid-cols-2 gap-4'>
            <div className=''>
              <StatusCard/>
            </div>
            <div className=''>
              <CircleChart/>
            </div>
          </div>
          <div className='mt-6'>
            <UsageBoard/>
          </div>
        </div>
      </div>

    </>
  )
}
