import React, { useEffect } from 'react';
import { useState } from 'react'
import { toast } from 'react-toastify';
import ConfirmModal from '../Modal/ConfirmModal';
import { RadioGroup } from '@headlessui/react';
import { useAddGateway,useRemoveGateway,useIPFSGatewayListFunc, useActiveGateway, useIPFSGatewayList } from 'src/api/ipfs';
import * as Tooltip from '@radix-ui/react-tooltip';


type GatewaySelectProps = {
  isReady : boolean
}

export function GatewaySelect({
  isReady = false
}:GatewaySelectProps) {

  const {
    data: gatewayListData ,
    loading:gatewayListLoading,
    error:gatewayListError,
  } = useIPFSGatewayList(isReady)


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


  // 控制删除确认对话框
  const [isConfirmOpen,setIsConfirmOpen] = useState<boolean>(false)

  const [listId,setListId] = useState<number>(0)

  // 确定删除时所选的 gatewayID
  const [gatewayId,setGatewayId] = useState<number>(0)
  
  // 增删改操作控制 gateway list 的状态显示
  const [gatewayList,setGatewayList] = useState(gatewayListData)

  // 传给 checkbox 组件
  const [selected, setSelected] = useState(gatewayList?.[listId])

  // 控制 active 请求
  const [count,setCount] = useState(0)


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
    setCount(count+1)
    if(count > 1){
      if(selected != undefined){
        activeGatewayTrigger({gatewayID:selected.id})
      }
    }
  },[selected])

  const [gatewayName, setGatewayName] = useState<string>('')

  return (
    <div className='bg-white/5 rounded-[24px] px-6 py-6'>
      <div className='flex items-center space-x-3'>
        <h3 className='font-bold text-2xl text-white'>
          Dedicated Gateway
        </h3>
        <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <img src="/image/help_tips_icon.png" className='h-6'/>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="w-96
                      data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade 
                      text-white/50 rounded-[12px] bg-black/70 px-5 py-3 text-sm leading-normal shadow-[0_0px_3px_6px_rgba(0,0,0,0.05)]"
                    sideOffset={5}
                  >
                      IPFS Dedicated Gateway is a gateway server that is specifically designed to serve content from the InterPlanetary File System (IPFS). It is different from a regular IPFS gateway in that it is dedicated to serving a single IPFS node, rather than serving content from the IPFS network as a whole. This means that the gateway can be optimized for specific use cases, such as serving large files or handling high traffic volumes. Using a dedicated gateway can also provide increased security, as it allows for greater control over access to the IPFS node and the content it serves.
                    <Tooltip.Arrow className="fill-white/5" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
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
                value={gatewayName}
                onChange={(e)=>{
                  setGatewayName(e.target.value)
                }}
              >
              </input>
              <div className='absolute top-0 right-0 z-20 px-4 py-3 hidden peer-focus:block active:block'>
                <button className='outline-none' onClick={async () => {
                  const res = await addGatewayTrigger({ gateway: gatewayName })
                  if (!addGatewayIsMutating) {
                    if (res == true) {
                      const resList = await gatewayListTrigger({})
                      if (!gatewayListIsMutating) {
                        setGatewayList(resList)
                      }
                      toast.success('Add Succeed')
                    }
                  }
                  setGatewayName('');
                }}>
                  <img src="/image/gateway_add_active.png" className='w-5' />
                </button>
              </div>
              <div className='absolute top-0 right-0 z-10 px-4 py-3 block peer-focus:hidden'>
                <img src="/image/gateway_add_inactive.png" className='w-5' />
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
          isOpen={isConfirmOpen}
          title={'Sure to delete gateway?'}
          description={'Deleting the dedicated gateway means that all the traffic will be blocked and you will lose all saved settings.'}
          closeFunc={() => {
            setIsConfirmOpen(false)
          }}
          confirmFunc={async () => {
            const res = await removeGatewayTrigger({ gatewayID: gatewayId })
            if (!removeGatewayIsMutating) {
              if (res == true) {
                const resList = await gatewayListTrigger({})
                if (!gatewayListIsMutating) {
                  setGatewayList(resList)
                }
                toast.success('Remove Succeed')
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
                                className={`text-lg ${checked ? 'text-[#FFE200]' : 'text-white/50'
                                  }`}
                              >
                                {gatewayItemList.dedicatedGateway}
                              </RadioGroup.Label>
                              <div className='grow'></div>
                              {checked && (
                                <div className="px-4">
                                  <img src='/image/radio_checked_icon.png' className='w-5' />
                                </div>
                              )}
                              {!checked && (
                                <div className="px-4">
                                  <img src='/image/radio_unchecked_icon.png' className='w-5' />
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
                      <img src='/image/delete_item_icon.png' className='w-5' />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}