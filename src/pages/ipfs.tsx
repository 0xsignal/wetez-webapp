import { Meta } from '../components/Meta'
import { Menu } from '../components/Menu'
import { ApiKeyCard } from '../components/Ipfs/ApiKeyCard'
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
        <div className='grow bg-[#182036] pl-20 pr-6'>
          <div className='mt-12 font-brand text-4xl text-white'>
            IPFS
          </div>
          <div className='text-white/30 mt-4 text-lg'>
            Whole data about your plans here
          </div>
          <div className='mt-10'>
            <ApiKeyCard/>
          </div>
          <div className='mt-10 grid grid-cols-2'>
            <div className=''>
            </div>
            <div className=''>
              <CircleChart/>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
