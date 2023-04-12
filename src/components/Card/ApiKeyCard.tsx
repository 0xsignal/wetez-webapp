import React from 'react';
import CopyButton from '../Button/CopyButton';
import * as Tooltip from '@radix-ui/react-tooltip';


type ApiKeyCardProps = {
  apiKey?: string
}

export function ApiKeyCard({
  apiKey = 'sisidjdjdd23734839393303030003033'
}:ApiKeyCardProps) {

  return(
    <div className='bg-white/5 rounded-[24px] px-6 py-6'>
      <div className='flex items-center gap-x-6'>
      <img src="/image/apikey_icon.png" className='w-24'/>
        <div className=''>
          <div className='text-2xl font-bold text-white flex items-center gap-x-3'>
            Admin Key
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
                      After the user registers, each account will be allocated a unique API key that corresponds one-to-one with the user for API requests. Every project will share the same API key.
                    <Tooltip.Arrow className="fill-white/5" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
          <div className='text-base text-white/50 mt-3 flex items-center gap-x-3'>
            {apiKey}
            <CopyButton
              text={apiKey}
            />
          </div>   
        </div>
        <div className='grow'>
        </div>
      </div>
    </div>
  )
}