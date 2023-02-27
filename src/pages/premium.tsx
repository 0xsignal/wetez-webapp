import React from 'react';
import { Meta } from '../components/Meta';
import { Menu } from '../components/Menu';
import { Header } from '../components/Header';
import PlanListCard from '../components/Card/PlanListCard';
import Contact from '../components/Premium/Contact';
import Link from 'next/link';
import { OrderList,useOrderList} from '../api/premium'
import { useEvent } from 'src/lib/hooks';
import InfiniteList from 'src/components/List/InfiniteList';
import BillingListItem from 'src/components/Premium/BillingListItem';

export default function Premium() {

  const { data, error, loading, size, setSize } = useOrderList()
  
  const getOrderList =  (data: OrderList[] | undefined) =>
    data?.map(page => page?.list).filter(Boolean)
    .reduce((accu, curr) => accu.concat(curr), [])
  
  const orderList = getOrderList(data) || []

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
        <div className='grow bg-[#182036] pl-10 pr-10 overflow-y-auto h-screen pb-12'>
          <Header
            title="Premium"
            description="Select all the subscriptions or choose single network for the plan"
          />
          <div className='mt-10'>
            <PlanListCard />
          </div>
          <div className='mt-10'>
            <Contact />
          </div>
          <div className='mt-10'>
            <div className='bg-white/5 rounded-[16px] px-6 py-6'>
              <div className='flex items-center'>
                <h2 className='text-white text-2xl font-bold'> Billing </h2>
                <div className='grow'></div>
                <div className='rounded-[26px] border-[1px] border-white/20 text-base text-white/50 px-6 py-2'>
                  Export PDF
                </div>
              </div>
              <div className='mt-12'>
                  <div className='text-white/30 text-base mb-2 grid grid-cols-8 gap-1'>
                    <div className='col-span-2 text-left'>
                      ID
                    </div>
                    <div className='col-span-2 text-left'>
                      Date
                    </div>
                    <div className='text-left'>
                      Network
                    </div>
                    <div className='text-left'>
                      Plan
                    </div>
                    <div className='text-left'>
                      Total
                    </div>
                    <div className='text-right'>
                      Invovice
                    </div>
                  </div>
                  <InfiniteList
                    onLoadMore = {onLoadMore}
                    canLoadMore = {canLoadMore}
                  >
                    <div className=''>
                    {(orderList.map((item) => (
                      <BillingListItem
                        listItemId = {item.orderId}
                        listItemDate = {item.date}
                        listItemNetwork = {item.chainName}
                        listItemPlan = {item.planName}
                        listItemTotal = {item.totalAmount}
                        listItemCurrency = {item.currency}
                        key = {item.orderId}
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