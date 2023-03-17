import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { pass } from '../../lib/fp';
import Link from 'next/link';
import CopyButton from '../Button/CopyButton';

type DelegateModalProps = {
  isOpen?: boolean,
  id?: string,
  symbol: string,
  address: string,
  delegateAmout: string,
  stakerDelegate: string,
  slash: string,
  closeModal?: () => void;
};

export function DelegateModal({
  isOpen = false,
  id = '',
  symbol = '',
  address = '',
  delegateAmout = '',
  stakerDelegate = '',
  slash = '',
  closeModal = pass,
 }:DelegateModalProps){

  let description = ''
  let link = ''

  switch(symbol){
    case 'ETH':
      description = '1. Please be sure that Metamask is installed and ETH account is imported \n 2. Enter the <a href="https://app.stafi.io/rETH" target="_blank" style="color:#00F4FF">StaFi rToken App</a> and connect Metamask \n 3.Input the amount of ETH that will be staked in the [Stake ETH] page. \n 4. Confirm the amount of staked ETH and the Gas fee, click [Confirm] \n 5. Check delegation details in the "Status" page',
      link = 'https://docs.wetez.io/wetez/user/staking/ethereum'
    break
    case 'XTZ':
      description = "1. Download and login a wallet that supports XTZ staking (imToken/Trust Wallet/Atomic/etc.) \n 2. Copy this delegate address and enter the wallet's staking section, paste to choose the validator Wetez \n 3. Click [delegate] to finish the delegation and wait for the staking reward. \n ",
      link = 'https://docs.wetez.io/wetez/user/staking/tezos'
     break
     case 'ATOM':
      description = "1. Install and login to Keplr plugin wallet \n 2. Click [Stake] to enter the staking section \n 3. Scroll down the page to find the validator Wetez, delegate ATOM to Wetez and wait for the staking reward",
      link = 'https://docs.wetez.io/wetez/user/staking/cosmos'
     break
     case 'IRIS':
      description = "1. Install and login to the Keplr plugin wallet \n 2. Click [Stake] to enter the staking section \n 3. Scroll down the page to find the validator Wetez, delegate IRIS to Wetez and wait for the staking reward",
      link = 'https://docs.wetez.io/wetez/user/staking/cosmos'
     break
     case 'IOTX':
      description = "1. Install and login to ioPay \n 2. Visit voting website to stake when remain logged in ioPay Desktop app (in the case of using desktop) \n 3. Enter [Wetez] to find the validator Wetez on the pop-up window, delegate IOTX to Wetez and wait for the staking reward",
      link = 'https://docs.wetez.io/wetez/user/staking/cosmos'
     break
     case 'MATIC':
      description = "1. Install and login to Metamask on Google Chrome \n 2. Open the Polygon Staking UI and click on [connect] in the top right corner to link to the Metamask wallet \n 3. Enter [Wetez] or paste validator address copied here to find the validator Wetez, click [Delegate] to delegate MATIC to Wetez and wait for the staking reward",
      link = 'https://docs.wetez.io/wetez/user/staking/polygon'
     break
     case 'SOL':
      description = '1. Visit and login to <a href="https://solflare.com/" target="_blank" style="color:#00F4FF">SolFlare.com</a> \n 2. Copy the delegate address above and click [STAKE SOLANA] to enter the staking section on SolFlare.com \n 3. Enter the amount of SOL you want to delegate, paste Wetez’s delegate address to delegate to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/solana'
     break
     case 'WAN':
      description = "1. Install and login to the Wanchain Desktop Wallet \n 2. Copy the delegate address above and enter the delegation section via [Galaxy] - [Delegation] on the wallet \n 3. Paste Wetez’s delegate address, enter the amount of WAN to delegate to Wetez and wait for the staking reward",
      link = 'https://docs.wetez.io/wetez/user/staking/wanchain'
     break
     case 'ROSE':
      description = '1. Visit and login to the <a href="https://chrome.google.com/webstore/detail/oasis-wallet/ppdadbejkmjnefldpcdjhnkpbjkikoip/related" target="_blank" style="color:#00F4FF">Oasis Wallet-Browser Extension</a> \n 2. Click [Staking] to enter the staking section \n 3. Click [Validator] tab and scroll down the page to find the validator Wetez, delegate ROSE to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/oasis'
     break
     case 'KAVA':
      description = '1. Install and login to the <a href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en" target="_blank" style="color:#00F4FF">Keplr</a> plugin wallet \n 2. Click [Stake] to enter the staking section \n 3. Scroll down the page to find the validator Wetez, delegate KAVA to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/kava'
     break
     case 'AKT':
      description = '1. Install and login to the <a href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en" target="_blank" style="color:#00F4FF">Keplr</a>  plugin wallet \n 2. Click [Stake] to enter the staking section \n 3. Scroll down the page to find the validator Wetez, delegate AKT to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/akash'
     break
     case 'ATP':
      description = '1. Install and login to the <a href="https://www.platon.network/en/developer/#aton" target="_blank" style="color:#00F4FF">ATON wallet</a> \n 2. Click [Delegate] to enter the delegate related section \n 3. Scroll down the page to find the validator Wetez, delegate ATP to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/projects-inactive/alaya'
     break
     case 'MTRG':
      description = '1. Install and login to the <a href="https://meter.io/" target="_blank" style="color:#00F4FF">Meter</a> desktop wallet, create or import a wallet account \n 2. Enter the delegation process via [Staking]- [Buckets voted to me] - [CREATE VOTE] \n 3. Select the validator Wetez and enter the amount of MTRG you want to delegate, then sign to delegate and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/meter'
     break
     case 'ROWAN':
      description = '1. Install and login to the <a href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en" target="_blank" style="color:#00F4FF">Keplr</a> plugin wallet \n 2. Click [Stake] to enter the staking section \n 3. Scroll down the page to find the validator Wetez, delegate ROWAN to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/projects-inactive/sifchain'
     break
     case 'PDEX':
      description = '1. Install and login to the <a href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en" target="_blank" style="color:#00F4FF">polkadot{.js} extension</a> \n 2. Visit staking section of Polkadex app and connect to your wallet account, then continue via "Account actions"-"+ Nominator" \n 3. Enter the amount of PDEX you want to delegate, then find the validator Wetez by inputting "Wetez" or pasting the address copied here, delegate PDEX to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/projects-inactive/polkadex'
     break
     case 'MINA':
      description = '1. Install and login to <a href="https://www.aurowallet.com/" target="_blank" style="color:#00F4FF">Auro</a>  wallet on Google Chrome \n 2. Click [Staking]-[go to staking] to enter the staking section \n 3. Enter [Wetez] or paste address copied here to find the validator Wetez, delegate MINA to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/mina'
     break
     case 'FRA':
      description = '1. Download and install <a href="https://wallet.findora.org/" target="_blank" style="color:#00F4FF">Findora</a>  Wallet \n 2. Create or import a wallet account \n 3. Enter the delegation process via staking-stake and select the validator Wetez for delegation',
      link = 'https://docs.wetez.io/wetez/user/staking/projects-inactive/findora'
     break
     case 'EDG':
      description = '1. Install and login to the <a href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en" target="_blank" style="color:#00F4FF">polkadot{.js} extension</a> \n 2. Visit staking section of Edgeware and connect to your wallet account, then continue via "Account actions"-"+ Nominator" \n 3. Enter the amount of you want to delegate, then find the validator Wetez by inputting "Wetez" or pasting the address copied here, delegate EDG to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/edgeware'
     break
     case 'PCX':
      description = '1. Install and login to the <a href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en" target="_blank" style="color:#00F4FF">polkadot{.js} extension</a> \n 2. Visit staking section of ChainX app and connect to your wallet account \n 3. Find the validator Wetez by scroll down the page, enter the amount of PCX, delegate PXC to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/chainx'
     break
     case 'IOST':
      description = '1. Install and login to <a href="https://chrome.google.com/webstore/detail/iwallet/kncchdigobghenbbaddojjnnaogfppfj?hl=en-GB" target="_blank" style="color:#00F4FF">iWallet</a> on Google Chrome \n 2. Visit IOSTABC browser via the same chrome browser, click [Producer Vote] tab \n 3. Enter [Wetez] or paste address copied here to find the validator Wetez, delegate MINA to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/iost'
     break
     case 'NMT':
      description = '1. Install and login to the <a href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en" target="_blank" style="color:#00F4FF">polkadot{.js} extension</a> \n 2. Visit staking section of NFTMart and connect to your wallet account, then continue via "Account actions"-"+ Nominator" \n 3. Enter the amount of NMT you want to delegate, then find the validator Wetez by inputting "Wetez" or pasting the address copied here, delegate NMT to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/projects-inactive/nftmart'
     break
     case 'JUNO':
      description = '1. Install and login to the <a href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en" target="_blank" style="color:#00F4FF">Keplr</a> plugin Wallet \n 2. Open the Omniflix UI page and click on [connect] in the top right corner to link to the Keplr wallet \n 3. Scroll down the page to find the validator Wetez, click "delegate" to delegate JUNO to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/juno'
     break
     case 'GRAVITON':
      description = '1. Login to the <a href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en" target="_blank" style="color:#00F4FF">Keplr</a> plugin wallet on theezstaking front end \n 2. Click [Validator] to enter the staking section 3. Type [Wetez] to find the validator Wetez, delegate GRAVITON to Wetez and wait for the staking reward ',
      link = 'https://docs.wetez.io/wetez/user/staking/gravity-bridge'
     break
     case 'EVMOS':
      description = '1. Login to the MetaMask on the <a href="https://evmos.me/" target="_blank" style="color:#00F4FF">Evmos</a>  Wallet \n 2. Click [Stake] to enter the staking section \n 3. Paste the validator address that copied here to the [Destination] box and enter the amount of EVMOS, then delegate to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/evmos'
     break
     case 'UMEE':
      description = '1. Install and login to the <a href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en" target="_blank" style="color:#00F4FF">Keplr</a> plugin Wallet 2. Click [Stake] to enter the staking section 3. Scroll down the page to find the validator Wetez, delegate UMEE to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/umee'
     break
     case 'FLIX':
      description = "Upcoming",
      link = 'https://docs.wetez.io/wetez/user/staking/omniflix-coming-soon'
     break
     case 'CFX':
      description = "upcoming",
      link = ''
     break
     case 'MYRIA':
      description = '1. Login to the Octopus Network with NEAR wallet \n 2. Enter the staking section via [Appchains]- [myriad] \n 3. Scroll down the page to find the validator [wetezpos.near], delegate OTC to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/myriad'
     break
     case 'DBIO':
      description = '1. Login to the Octopus Network with NEAR wallet \n 2. Enter the staking section via [Appchains] - [debionetwork] \n 3. Scroll down the page to find the validator [wetezpos.near], delegate OTC to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/debio-network'
     break
     case 'NYM':
      description = '1. Install and login to the Nym Desktop Wallet \n 2. Copy the delegate address above and enter the [Delegation] section on the wallet \n 3. Paste Wetez’s delegate address, enter the amount of NYM to delegate to Wetez and wait for the staking reward',
      link = 'https://docs.wetez.io/wetez/user/staking/projects-inactive/nym-mixnode'
     break
     default:
      description = "Upcoming",
      link = ''
    break
  }

  return(
    <div className=''>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-250"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-[#182036] p-10 text-left align-middle shadow-xl transition-all">
                  <button className='float-right outline-none' onClick={closeModal}>
                    <img src='/image/cancle_icon.png' className='w-5' />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-brand leading-6 text-white text-center"
                  >
                    Delegate {symbol}
                  </Dialog.Title>
                  
                  <div className='mt-20'>
                    <div className='text-2xl text-white font-bold'>
                      Delegate Address
                    </div>
                    <div className='text-base text-white/50 mt-4 flex items-center gap-x-3'>
                      {address}
                      <CopyButton
                        text = {address}
                      />
                    </div>
                  </div>

                  <div className='mt-10'>
                    <div className='text-2xl text-white font-bold'>
                      Delegate Steps
                    </div>
                    <div className='text-base text-white/50 mt-6 whitespace-pre-line leading-relaxed' dangerouslySetInnerHTML={{__html:description}}>
                    </div>
                    <div className='mt-8'>
                      <Link href={link} target='_blank'>
                        <div className='rounded-[26px] px-4 py-2 border-[1px] text-white/50 text-base text-center border-white/20 w-1/4'>
                          Learn More
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className='mt-10'>
                    <div className='text-2xl text-white font-bold'>
                      Performance
                    </div>
                    <div className='mt-6 grid grid-cols-3 gap-4'>
                      <div className='text-white/30 text-sm'>Delegate Amount</div>
                      <div className='text-white/30 text-sm'>Delegated Address Amount</div>
                      <div className='text-white/30 text-sm'>Slash Record</div>
                    </div>
                    <div className='border-[0.5px] border-white/10 mt-3'/>
                    <div className='mt-6 grid grid-cols-3 gap-4'>
                      <div className='text-white/30 text-sm'>{delegateAmout}{symbol}</div>
                      <div className='text-white/30 text-sm'>{stakerDelegate}</div>
                      <div className='text-white/30 text-sm'>{slash}</div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>

  )


}