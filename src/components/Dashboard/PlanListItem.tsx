import React from 'react';

type PlanListItemProps = {
  network?: string,
  usage?: number,
  status?: number, 
  dayLimit?: number,
}

export default function PlanListItem(
  {
    network = 'Ethereum',
    usage = 0.23,
    status = 1,
    dayLimit = 10,
  }:PlanListItemProps){

    let logoImage: string = ''
    let statusStyle: string = ''
    let progressBarStyle: string = ''
    let progressBarNumber: string = ''
    let usageNumber: number = 0
    let apiStatus: string = ''


    if(Number(usage) > 1){
      progressBarNumber = '100%'
    } else{
      usageNumber = Number(usage) * 100
      progressBarNumber = String(usageNumber) + '%'
    }

    
    switch(network){
      case 'Ethereum':
        logoImage = '/image/ethereum_logo_icon.png'
        break
      case 'Polygon':
        logoImage = '/image/polygon_logo_icon.png'
        break
      case 'Cosmos':
        logoImage = '/image/cosmos_logo_icon.png'
        break
      case 'Arbitrum':
        logoImage = '/image/arbitrum_logo_icon.png'
        break
      default:
        logoImage = '/image/ethereum_logo_icon.png'
        break
    }

    switch(status){
      case 1:
        apiStatus = 'Active'
        statusStyle = 'text-lg text-white/50 pl-4'
        progressBarStyle = 'bg-[#9FADC7] rounded-[6px] h-4'
        break
      case 2:
        apiStatus = 'Overrun'
        statusStyle = 'text-lg text-[#00F4FF]/80 pl-4'
        progressBarStyle = 'bg-[#00F4FF] rounded-[6px] h-4'
        break
      case 3:
        apiStatus = 'Inative'
        statusStyle = 'text-lg text-[#C57D00] pl-4'
        progressBarStyle = ''
        break
    }

  return(
    <div className='grid grid-cols-5 gap-1 py-2 space-x-2 items-center'>
      <div className='flex items-center space-x-2'>
        <img src={logoImage} className='w-10'/>
        <p className='text-lg text-white'>{network}</p>
      </div>
      <div className='flex space-x-4 items-center col-span-3 pl-8'>
        <div className='w-3/4 bg-[#9FADC7]/10 rounded-[6px] h-4'>
          <div className={progressBarStyle} style={{width:(progressBarNumber)}}></div>
        </div>
        <div className='text-lg text-white/50'>
          {progressBarNumber}
        </div>
      </div>
      <div className={statusStyle}>
        {apiStatus}
      </div>
    </div>
  )
}