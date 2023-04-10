import React, { useState,useEffect } from 'react';

type PlanListItemProps = {
  network?: string,
  usage?: number,
  status?: number, 
  dayLimit?: number,
}

export default function PlanListItem(
  {
    network = 'Ethereum',
    usage = 1,
    status = 1,
    dayLimit = 10,
  }:PlanListItemProps){

    let logoImage: string = ''
    let statusStyle: string = ''
    let progressBarStyle: string = ''
    let progressBarNumber: string = ''
    let usageNumber: number = 0
    let apiStatus: string = ''

    const [dispalyNumber,setDisplayNumber] = useState(0)
    const [displayUsage,setDisplayUsage] = useState('')

    const usagePercent = usage/dayLimit


    useEffect(()=>{
      if(Number(usagePercent) > 1){
        progressBarNumber = '100%'
      } else{
        usageNumber = Number(usagePercent.toFixed(2)) * 100
        progressBarNumber = String(usageNumber) + '%'
        setDisplayNumber(Number(usagePercent) * 100)
        setDisplayUsage(String(dispalyNumber) + '%')
      }
    },)

    
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
        statusStyle = 'text-lg text-white/50'
        progressBarStyle = 'bg-[#9FADC7] rounded-[6px] h-4'
        break
      case 2:
        apiStatus = 'Overrun'
        statusStyle = 'text-lg text-[#00F4FF]/80'
        progressBarStyle = 'bg-[#00F4FF] rounded-[6px] h-4'
        break
      case 3:
        apiStatus = 'Inative'
        statusStyle = 'text-lg text-[#C57D00]'
        progressBarStyle = ''
        break
    }

  return(
    <div className='grid grid-cols-7 gap-1 py-2 items-center'>
      <div className='flex items-center space-x-1.5 col-span-2'>
        <div className='rounded-full p-1.5 bg-white/5'>
          <img src={logoImage} className='w-7 h-7 mx-auto'/>
        </div>
        <p className='text-lg text-white'>{network}</p>
      </div>
      <div className='flex space-x-4 items-center col-span-4'>
        <div className='w-3/4 bg-[#9FADC7]/10 rounded-[6px] h-4'>
          <div className={progressBarStyle} style={{width:(displayUsage)}}></div>
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