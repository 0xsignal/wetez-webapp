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
        logoImage = '/image/chainLogo/ETH.png'
        break
      case 'Polygon':
        logoImage = '/image/chainLogo/MATIC.png'
        break
      case 'Cosmos':
        logoImage = '/image/chainLogo/ATOM.png'
        break
      case 'Arbitrum':
        logoImage = '/image/chainLogo/Arbitrum.png'
        break
      case 'Solana':
        logoImage = '/image/chainLogo/SOL.png'
        break
      case 'Kava':
        logoImage = '/image/chainLogo/KAVA.png'
        break
      case 'IRISnet':
        logoImage = '/image/chainLogo/IRIS.png'
        break
      case 'Juno':
        logoImage = '/image/chainLogo/JUNO.png'
        break
      case 'Umee':
        logoImage = '/image/chainLogo/UMEE.png'
        break
      case 'Evmos':
        logoImage = '/image/chainLogo/EVMOS.png'
        break
      case 'OKC':
        logoImage = '/image/chainLogo/OKX.png'
        break
      case 'HSC':
        logoImage = '/image/chainLogo/EVMOS.png'
        break
      case 'Gravity':
        logoImage = '/image/chainLogo/GRAVITON.png'
        break
      default:
        logoImage = '/image/chainLogo/EVMOS.png'
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
      <div className='flex items-center space-x-2.5'>
        <div className='rounded-full p-1 bg-white/5 w-10'>
          <img src={logoImage} className='w-8'/>
        </div>
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