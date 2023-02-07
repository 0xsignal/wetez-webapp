import React from 'react';
import { Meta } from '../components/Meta';
import { Menu } from '../components/Menu';
import { Header } from '../components/Header';
import PlanListCard from '../components/Card/PlanListCard';
import Contact from '../components/Premium/Contact';
import { BillingBoard } from '../components/Premium/BillingBoard';
import Link from 'next/link';

export default function Premium() {

  return(
    <>
    <Meta
        title=''
        description=''
        image=''
      />
      <div className='flex'>
        <Menu/>
        <div className='grow bg-[#182036] pl-20 pr-10 overflow-y-auto h-screen pb-12'>
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
            <BillingBoard />
          </div>
        </div>

      </div>
    
    </>
  )
}