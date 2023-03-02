import React from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import * as echarts from 'echarts/core';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { PolarComponent, PolarComponentOption } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import PlanTag from '../Tag/PlanTag';


type CicleChartProps = {
  planShow: boolean
  plandata:{
    id: number
    totalStorage: number,
    transferUp : number,
    transferDown : number,
    status: 1 | 2 | 0 | -2 ,
    expireAt: number
    chain:{
      chainId: number
      name: string
    }
    plan:{
      id: number,
      name: string,
      chainId: number,
      totalStorage:number,
      transferUp : number,
      transferDown : number,
    }
    endpoints:string[]
  } | undefined
}


type ECOption = echarts.ComposeOption<
  BarSeriesOption
  | PolarComponentOption
>;

echarts.use([
  BarChart, 
  PolarComponent,
  SVGRenderer,
  LabelLayout,
  UniversalTransition,
]);

export default function CircleChart({
  planShow = false,
  plandata = {
    id: 1,
    totalStorage: 1,
    transferUp : 1,
    transferDown : 1,
    status: 1,
    expireAt: 1,
    chain:{
      chainId: 14,
      name: 'IPFS'
    },
    plan:{
      id: 1,
      name: 'Free',
      chainId: 14,
      totalStorage: 1,
      transferUp : 1,
      transferDown : 1,
    },
    endpoints:[]
  }

}:CicleChartProps){

  let totalStorageNum = 0
  let transferUpNum = 0
  let transferDownNum = 0

  let totalStorageArray = [0]
  let transferUpArray = [0]
  let transferDownArray = [0]


  useEffect(()=>{
    totalStorageNum = Math.ceil(plandata.totalStorage*100/plandata.plan.totalStorage)
    if( totalStorageNum > 100){
      totalStorageNum = 100
    }
    totalStorageArray = [totalStorageNum]
    
    transferUpNum = Math.ceil(plandata.transferUp*100/plandata.plan.transferUp)
    if( transferUpNum > 100){
      transferUpNum = 100
    }
    transferUpArray=[transferUpNum]
    
    transferDownNum = Math.ceil(plandata.transferDown*100/plandata.plan.transferDown)
    if( transferDownNum > 100){
      transferDownNum = 100
    }
    transferDownArray=[transferDownNum]


  },[plandata])

  let option: ECOption ={}

  useEffect(() => {

  option= {
    // ...
    angleAxis: {
      max: 100,
      silent: true,
      startAngle: 270,
      clockwise: false,
      axisLine:{
        show:false,
      },
      splitLine:{
        show:false,
      },
      axisLabel:{
        show:false,
      },
      axisTick:{
        show:false,
      },
    },
    color:['#FF4DB8','#2A23FF','#00F4FF'],
    radiusAxis:{
      type:'category',
      silent: true,
      axisLine:{
        show:false,
      },
      axisLabel:{
        show:false,
      },
      axisTick:{
        show:false,
      },
      interval:10,
    },
    polar: {
      radius: ['15%', '85%'], 
      center:['40%','50%']
    },
   
    series: [
      {
        type: 'bar',
        data: [100],
        coordinateSystem: 'polar',
        stack: '2021',
        color: 'rgba(255,255,255,0.1)',
        silent: true,
      },
      {
        type: 'bar',
        data: [100],
        coordinateSystem: 'polar',
        stack: '2022',
        color: 'rgba(255,255,255,0.1)',
        silent: true,
      },
      {
        type: 'bar',
        data: [100],
        coordinateSystem: 'polar',
        stack: '2023',
        color: 'rgba(255,255,255,0.1)',
        silent: true,
      },
      {
        type: 'bar',
        data: transferDownArray,
        coordinateSystem: 'polar',
        name: '2021',
        stack: '2021',
        roundCap: true,
        silent: true,
      },
      {
        type: 'bar',
        data: transferUpArray,
        coordinateSystem: 'polar',
        name: '2022',
        stack: '2022',
        roundCap: true,
        silent: true,
      },
      {
        type: 'bar',
        data: totalStorageArray,
        coordinateSystem: 'polar',
        name: '2023',
        stack: '2023',
        roundCap: true,
        silent: true,
      }
    ]
  };},[plandata])


  useEffect(()=>{
    const CicleChart = echarts.init(document.getElementById('echartsContent') as HTMLElement);
    const ChartOption:ECOption = option;
    CicleChart.setOption(ChartOption);
  },[plandata])

  if(planShow){
    return (
      <div className='bg-white/5 rounded-[24px]'>
        <div className='px-6 py-6'>
          <div className='flex items-center'>
            <div className='text-xl text-white font-bold'>
              My IPFS Usage
            </div>
            <div className='grow'></div>
            <PlanTag
              name={plandata.plan.name}
            />
          </div>
         
          <div className='grid grid-cols-2 gap-2'>
          {/* 这里样式必须设置高度 */}
            <div style={{ width: '100%', height: '200px' }} id='echartsContent'>
            </div>
            <div className='my-auto'>
              <div className='flex items-center gap-x-2'>
                <div className='w-3 h-3 rounded-full bg-[#00F4FF]'>
                </div>
                <div className='text-white/50 font-bold text-base'>
                  Total Storage:
                </div>
                <div className='text-white/50 text-base'>
                  {totalStorageNum}%
                </div>
              </div>
              <div className='flex items-center gap-x-2 mt-4'>
                <div className='w-3 h-3 rounded-full bg-[#2A23FF]'>
                </div>
                <div className='text-white/50 font-bold text-base'>
                  Up Data:
                </div>
                <div className='text-white/50 text-base'>
                {transferDownNum}%
                </div>
              </div>
              <div className='flex items-center gap-x-2 mt-4'>
                <div className='w-3 h-3 rounded-full bg-[#FF4DB8]'>
                </div>
                <div className='text-white/50 font-bold text-base'>
                  Down Data:
                </div>
                <div className='text-white/50 text-base'>
                  {transferDownNum}%
                </div>
              </div>
            </div>
          </div>
          <div className='mt-2 flex items-center'>
            <div className='grow'></div>
            <div className=''>
              <button className='flex items-center justify-center bg-[#2A23FF] rounded-[23px] text-white px-6 py-2 text-base'>
                More
                <img src="/image/arrow_more_icon.png" className='h-4 ml-4'/>
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

  return (
    <div className='bg-white/5 rounded-[24px]'>
      <div className='px-6 py-6'>
        <div className='text-xl text-white font-bold'>
          My IPFS Usage
        </div>
        <div className='grid grid-cols-2 gap-2'>
        {/* 这里样式必须设置高度 */}
          <div style={{ width: '100%', height: '200px' }} id='echartsContent'>
          </div>
          <div className='my-auto'>
            <div className='flex items-center gap-x-2'>
              <div className='w-3 h-3 rounded-full bg-[#00F4FF]'>
              </div>
              <div className='text-white/50 font-bold text-base'>
                Total Storage:
              </div>
              <div className='text-white/50 text-base'>
                50%
              </div>
            </div>
            <div className='flex items-center gap-x-2 mt-4'>
              <div className='w-3 h-3 rounded-full bg-[#2A23FF]'>
              </div>
              <div className='text-white/50 font-bold text-base'>
                Up Data:
              </div>
              <div className='text-white/50 text-base'>
                50%
              </div>
            </div>
            <div className='flex items-center gap-x-2 mt-4'>
              <div className='w-3 h-3 rounded-full bg-[#FF4DB8]'>
              </div>
              <div className='text-white/50 font-bold text-base'>
                Down Data:
              </div>
              <div className='text-white/50 text-base'>
                50%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}