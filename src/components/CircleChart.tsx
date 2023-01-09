import React from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import * as echarts from 'echarts/core';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { PolarComponent, PolarComponentOption } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import { LabelLayout, UniversalTransition } from 'echarts/features';


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

const option: ECOption = {
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
      data: [85],
      coordinateSystem: 'polar',
      name: '2021',
      stack: '2021',
      roundCap: true,
      silent: true,
    },
    {
      type: 'bar',
      data: [75],
      coordinateSystem: 'polar',
      name: '2022',
      stack: '2022',
      roundCap: true,
      silent: true,
    },
    {
      type: 'bar',
      data: [75],
      coordinateSystem: 'polar',
      name: '2023',
      stack: '2023',
      roundCap: true,
      silent: true,
    }
  ]
};


const CircleChart=() => {
  useEffect(()=>{
    const CicleChart = echarts.init(document.getElementById('echartsContent') as HTMLElement);
    const ChartOption:ECOption = option;
    CicleChart.setOption(ChartOption);
  },[])

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

export default CircleChart