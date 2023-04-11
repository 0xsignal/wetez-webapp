import React, { useEffect, useState } from 'react';
import { Meta } from '../components/Meta'
import { Menu } from '../components/Menu'
import { ApiKeyCard } from '../components/Card/ApiKeyCard'
import { StatusCard } from '../components/Card/StatusCard'
import  UsageBoard  from '../components/Ipfs/UsageBoard'
import { Header } from '../components/Header'
import dynamic from 'next/dynamic'
import { useActiveGateway, useIPFSGatewayList,useIPFSPlan } from 'src/api/ipfs';
import { useIPFSStats1m,useIPFSStats24h,useIPFSStats7d } from 'src/api/ipfs';
import { useAddGateway,useRemoveGateway,useIPFSGatewayListFunc } from 'src/api/ipfs';
import IpfsSkethon from 'src/components/Skethon/IpfsSkethon';
import { CaptchaFooter } from 'src/components/Captcha/CaptchaFooter';
import { useAccountInfo } from 'src/api/setting';
import { useRouter } from 'next/router';
import { getUserSession } from 'src/lib/storage';
import { toast } from 'react-toastify';
import ConfirmModal from 'src/components/Modal/ConfirmModal';
import { RadioGroup } from '@headlessui/react';


const CircleChart = dynamic(
  () => import('../components/Chart/CircleChart'),
  { ssr: false }
)

export default function Ipfs() {

  // 控制请求的条件　
  const [isReady,setIsReady] = useState<boolean>(false)

  // input 的输入 
  const [gatewayName,setGatewayName] = useState<string>('')

  // 控制删除确认对话框
  const [isConfirmOpen,setIsConfirmOpen] = useState<boolean>(false)

  // 确定删除时所选的 gatewayID
  const [gatewayId,setGatewayId] = useState<number>(0)

  const [listId,setListId] = useState<number>(0)

  // 请求的 hooks
  const {
    data: userInfoData,
    loading: userInfoLoading,
    error: userInfoError,
  } = useAccountInfo(isReady)


  const {
    data: ipfsPlanData ,
    loading:ipfsPlanLoading,
    error:ipfsPlanError,
  } = useIPFSPlan(isReady)

  const {
    data: gatewayListData ,
    loading:gatewayListLoading,
    error:gatewayListError,
  } = useIPFSGatewayList(isReady)

  const {
    data: ipfsStats24hData ,
    loading: ipfsStats24hLoading,
    error: ipfsStats24hError,
  } = useIPFSStats24h(isReady)

  const {
    data: ipfsStats7dData ,
    loading: ipfsStats7dLoading,
    error: ipfsStats7dError,
  } = useIPFSStats7d(isReady)

  const {
    data: ipfsStats1mData ,
    loading: ipfsStats1mLoading,
    error: ipfsStats1mError,
  } = useIPFSStats1m(isReady)

  const {
    trigger: addGatewayTrigger,
    isMutating: addGatewayIsMutating,
    error: addGatewayError,
  } = useAddGateway()

  const {
    trigger: gatewayListTrigger,
    isMutating: gatewayListIsMutating,
  } = useIPFSGatewayListFunc()

  const {
    trigger: activeGatewayTrigger,
    loading: activeGatewayLoading,
    error: activeGatewayError,
  } = useActiveGateway()


  const {
    trigger: removeGatewayTrigger,
    isMutating: removeGatewayIsMutating,
    error: removeGatewayError,
  } = useRemoveGateway()

  
  // 增删改操作控制 gateway list 的状态显示
  const [gatewayList,setGatewayList] = useState(gatewayListData)

  // 传给 checkbox 组件
  const [selected, setSelected] = useState(gatewayList?.[listId])

  useEffect(()=>{
    setGatewayList(gatewayListData)
  },[gatewayListData])

  useEffect(()=>{
    if(gatewayList){
      let activeId = gatewayList.findIndex(x=>x.active === true)
      setListId(activeId)
      setSelected(gatewayList?.[activeId])
    }
  },[gatewayList])

  useEffect(()=>{
    if(selected != undefined){
      activeGatewayTrigger({gatewayID:selected.id})
    }
  },[selected])


  //如果未登录 控制条件请求
  const router = useRouter()
  const authorization = getUserSession()
  useEffect(()=>{
    if(authorization){
      setIsReady(true)
    }
    else{
      router.replace('/login')
    }
  },[authorization])

  // 从 list 中 remove gateway，同时更新 list
  async function delateGatewayLsit(gatewayID:number){
    const res =  await removeGatewayTrigger({gatewayID:gatewayID})
    if(res == true){
      const resList = await gatewayListTrigger({})
      if(!gatewayListIsMutating){
        setGatewayList(resList)
        toast.success('Remove Succeed')
      }
    }
  }

  if(ipfsPlanLoading && gatewayListLoading && ipfsStats24hLoading && ipfsStats7dLoading && ipfsStats1mLoading && userInfoLoading){
    <IpfsSkethon/>
  }

  return(
    <>
      <Meta
        title='IPFS'
        description=''
        image=''
      />
      <div className='flex'>
        <div className=''></div>
        <Menu/>
        <div className='grow bg-[#182036] pl-10 pr-16 pb-10 overflow-y-auto h-screen'>
          <div className='max-w-6xl mx-auto'>
          <Header
            title="IPFS"
            description="Whole data about your plans here"
            url = ''
            back = {false}
            backTitle = ""
            backUrl=""
          />
          <div className='mt-10'>
            <ApiKeyCard
              apiKey={userInfoData?.apiKey}
            />
          </div>
          <div className='mt-10 grid grid-cols-2 gap-4'>
            <div className=''>
              <StatusCard
                planStatus={ipfsPlanData?.subscribedPlan}
              />
            </div>
            <div className=''>
              <CircleChart
                planShow = {true}
                plandata = {ipfsPlanData?.subscribedPlan}
              />
            </div>
          </div>
          <div className='mt-6'>
            <div className='bg-white/5 rounded-[24px] px-6 py-6'>
                <div className='flex items-center space-x-3'>
                  <h3 className='font-bold text-2xl text-white'>
                    Dedicated Gateway
                  </h3>
                  <img src="/image/help_tips_icon.png" className='w-5'/>
                </div>
                <div className='mt-4 text-white/30 text-lg'>
                  Name your custom sub-domain here
                </div>
                <div className='mt-8'>
                <div className='flex space-x-3 pr-24 justify-center items-center'>
                  <div className='text-lg text-white/50'>
                    https://
                  </div>
                  <div className='grow'>
                    <div className='relative flex justify-center items-center'>
                      <input 
                        className='peer pr-16 rounded-[16px] border-[1px] border-white/20 pl-6 py-2 grow bg-white/0 caret-[#00F4FF] focus:outline-0 focus:ring-0 text-white text-lg'
                        placeholder='Input your sub-domin (only letters, numbers and dashes allowed)'
                        value = {gatewayName}
                        onChange = {e => 
                          setGatewayName(e.target.value)}
                        > 
                      </input>
                      <div className='absolute top-0 right-0 z-20 px-4 py-3 hidden peer-focus:block active:block'>
                        <button className='outline-none' onClick={async() => {
                          const res =  await addGatewayTrigger({gateway:gatewayName})
                          if(!addGatewayIsMutating){
                            if(res == true){
                              const resList = await gatewayListTrigger({})
                              if(!gatewayListIsMutating){
                                setGatewayList(resList)
                              }
                              toast.success('Add Succeed')
                            }
                          }
                          setGatewayName('');
                        }}>
                          <img src="/image/gateway_add_active.png" className='w-5'/>
                        </button>
                      </div>
                      <div className='absolute top-0 right-0 z-10 px-4 py-3 block peer-focus:hidden'>
                        <img src="/image/gateway_add_inactive.png" className='w-5'/>
                      </div>
                    </div>
                  </div>
                  <div className='text-lg text-white/50'>
                    .wetez-ipfs.io
                  </div>
                </div>
              </div>
              <div className='mt-10'>
              <ConfirmModal
                isOpen = {isConfirmOpen}
                title = {'Sure to delete gateway?'}
                description = {'Deleting the dedicated gateway means that all the traffic will be blocked and you will lose all saved settings.'}
                closeFunc = {()=>{
                  setIsConfirmOpen(false)
                }}
                confirmFunc = {async ()=>{
                  const res =  await removeGatewayTrigger({gatewayID:gatewayId})
                  if(!removeGatewayIsMutating){
                    if(res == true){
                      const resList = await gatewayListTrigger({})
                      if(!gatewayListIsMutating){
                        setGatewayList(resList)
                      }
                        toast.success('Add Succeed')
                      }
                    }
                  setIsConfirmOpen(false)
                }}
              />
              <RadioGroup 
                value={selected} 
                onChange={setSelected}>
                <RadioGroup.Label className="sr-only">Gateway List</RadioGroup.Label>
                <div className="space-y-2">
                  {gatewayList?.map((gatewayItemList) => (
                    <div className='w-full' key={gatewayItemList?.id}>
                      <div className='border-[1px] border-white/10'></div>
                        <div className='flex'>
                          <div className='grow'>
                          <RadioGroup.Option
                          value={gatewayItemList || ''}
                          className={({ active, checked }) =>
                            `flex cursor-pointer`
                            }
                          >
                          {({ active, checked }) => (
                            <div className='grow'>
                              <div className='py-6'>
                                <div className='flex justify-center items-center'>
                                  <RadioGroup.Label
                                    as="p"
                                    className={`text-lg ${
                                      checked ? 'text-[#FFE200]' : 'text-white/50'
                                    }`}
                                  >
                                    {gatewayItemList.dedicatedGateway}
                                  </RadioGroup.Label>
                                  <div className='grow'></div>
                                  {checked && (
                                    <div className="px-4">
                                      <img src='/image/radio_checked_icon.png' className='w-5'/>
                                    </div>
                                  )}
                                  {!checked && (
                                    <div className="px-4">
                                      <img src='/image/radio_unchecked_icon.png' className='w-5'/>
                                    </div>
                                  )}

                                </div>
                                
                              </div>
                            </div>
                          )}
                          </RadioGroup.Option>
                          </div>
                          <div className='px-6 py-7'>
                            <button onClick={() => {
                              setIsConfirmOpen(true)
                              setGatewayId(gatewayItemList.id)
                            }}>
                              <img src='/image/delete_item_icon.png' className='w-5'/>
                            </button>
                          </div>
                      </div>
                    </div>
                  ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          <div className='mt-6'>
            <UsageBoard
              type = "IPFS"
              planStatus = {ipfsPlanData?.subscribedPlan}
              items24h = {ipfsStats24hData?.items}
              items7d = {ipfsStats7dData?.items}
              items1m = {ipfsStats1mData?.items}
            />
          </div>
          <div className='mt-16 text-center'>
            <CaptchaFooter/>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}   