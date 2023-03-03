import React from "react";
import { pass } from "src/lib/fp";
import { DelegateModal } from "../Modal/DelegateModal";
import { useState } from "react";

const delegateSteps = [
  {
    id: 0,
    description:" <P>1. Download and login a wallet that supports XTZ staking (imToken/Trust Wallet/Atomic/etc.)</p><P>2. Copy this delegate address and enter the wallet's staking section, paste to choose the validator Wetez</p><P>3. Click [delegate] to finish the delegation and wait for the staking reward</p> ",
    link:'https://docs.wetez.io/wetez/user/staking/tezos'
  },
  {

  },
]

type NodeItemCardProps = {
  id: string,
  name: string,
  apy: string,
  symbol: string,
  address: string,
  delegateAmout: string,
  stakerDelegate: string,
  slash: string,
  indexArray: number,
  open: () => void
}

export default function NodeItemCard ({
  id = '',
  name = '',
  apy = '',
  symbol = '',
  address = '',
  delegateAmout = '',
  stakerDelegate = '',
  slash = '',
  indexArray = 0,
  open = pass,
}:NodeItemCardProps){

  const [isOpen, setIsOpen] = useState<boolean>(false)


  let logoImage = '';

  switch(symbol){
    case 'ETH':
     logoImage = '/image/chainLogo/ETH.png'
    break
    case 'XTZ':
      logoImage = '/image/chainLogo/XTZ.png'
     break
     case 'ATOM':
      logoImage = '/image/chainLogo/ATOM.png'
     break
     case 'IRIS':
      logoImage = '/image/chainLogo/IRIS.png'
     break
     case 'IOTX':
      logoImage = '/image/chainLogo/IOTX.png'
     break
     case 'MATIC':
      logoImage = '/image/chainLogo/MATIC.png'
     break
     case 'SOL':
      logoImage = '/image/chainLogo/SOL.png'
     break
     case 'WAN':
      logoImage = '/image/chainLogo/WAN.png'
     break
     case 'ROSE':
      logoImage = '/image/chainLogo/ROSE.png'
     break
     case 'KAVA':
      logoImage = '/image/chainLogo/KAVA.png'
     break
     case 'AKT':
      logoImage = '/image/chainLogo/AKT.png'
     break
     case 'ATP':
      logoImage = '/image/chainLogo/ATP.png'
     break
     case 'MTRG':
      logoImage = '/image/chainLogo/MTRG.png'
     break
     case 'ROWAN':
      logoImage = '/image/chainLogo/ROWAN.png'
     break
     case 'PDEX':
      logoImage = '/image/chainLogo/PDEX.png'
     break
     case 'MINA':
      logoImage = '/image/chainLogo/MINA.png'
     break
     case 'FRA':
      logoImage = '/image/chainLogo/FRA.png'
     break
     case 'EDG':
      logoImage = '/image/chainLogo/EDG.png'
     break
     case 'PCX':
      logoImage = '/image/chainLogo/PCX.png'
     break
     case 'IOST':
      logoImage = '/image/chainLogo/IOST.png'
     break
     case 'NMT':
      logoImage = '/image/chainLogo/NMT.png'
     break
     case 'JUNO':
      logoImage = '/image/chainLogo/JUNO.png'
     break
     case 'GRAVITON':
      logoImage = '/image/chainLogo/GRAVITON.png'
     break
     case 'EVMOS':
      logoImage = '/image/chainLogo/EVMOS.png'
     break
     case 'UMEE':
      logoImage = '/image/chainLogo/UMEE.png'
     break
     case 'FLIX':
      logoImage = '/image/chainLogo/FLIX.png'
     break
     case 'CFX':
      logoImage = '/image/chainLogo/CFX.png'
     break
     case 'MYRIA':
      logoImage = '/image/chainLogo/MYRIA.png'
     break
     case 'DBIO':
      logoImage = '/image/chainLogo/DBIO.png'
     break
     case 'NYM':
      logoImage = '/image/chainLogo/NYM.png'
     break
     default:
      logoImage = ''
    break
  }


  return(
    <div className="bg-white/5 rounded-[24px] px-6 py-3">
      <DelegateModal
        isOpen = {isOpen}
        id = {id}
        symbol = {symbol}
        address = {address}
        delegateAmout = {delegateAmout}
        stakerDelegate = {stakerDelegate}
        slash = {slash}
        closeModal = {() => {
          setIsOpen(false)
        }}
      />
      <div className="mx-auto mt-4 rounded-[16px] bg-[#182036] p-2 w-fit">
        <img src={logoImage} className="mx-auto w-10 h-10"/>
      </div>
      <div className="mt-4 text-white font-bold text-base text-center">
        {name}
      </div>
      <div className="mt-6 text-4xl text-white/50 font-brand text-center">
        {apy}%
      </div>
      <div className="mt-2 text-base text-white/30 text-center">
        {symbol} APY
      </div>
      <div 
        className="mt-4 mb-3 bg-[#2A23FF] rounded-[24px] mx-auto text-center px-4 py-3 text-white w-4/5 cursor-pointer"
        onClick={() => setIsOpen(true)}
        >
        Delegate
      </div>
    </div>
  )
}