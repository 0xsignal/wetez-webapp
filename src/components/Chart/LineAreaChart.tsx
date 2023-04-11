import React, { useRef } from 'react';
import { useEffect, useState } from 'react'
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption
} from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import ReactEcharts from 'echarts-for-react';


echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

type ECOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LineSeriesOption
>;

type LineAreaChartPrpos = {
  data:{}[],
  date:{}[]
}

export default function LineAreaChart({
  data = [0],
  date = [''],
}) {

  const chartRef = useRef<ReactEcharts>(null);
  const [option, setOption] = useState<ECOption>({
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date
    },
    yAxis: {
      type: 'value',
      boundaryGap: false,
      splitLine:{
        show:false
      }
    },
    grid:{
      left: '3%',
      right: '3%',
    },
  
    series: [
      {
        name: 'Data',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: '#2A23FF'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(42,35,255,0.6)'
            },
            {
              offset: 1,
              color: '#1F263C'
            }
          ])
        },
        data: data
      }
    ]
  })
  
  useEffect(()=>{
    setOption({
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
      },
      yAxis: {
        type: 'value',
        boundaryGap: false,
        splitLine:{
          show:false
        }
      },
      grid:{
        left: '3%',
        right: '3%',
      },
    
      series: [
        {
          name: 'Data',
          type: 'line',
          symbol: 'none',
          sampling: 'lttb',
          itemStyle: {
            color: '#2A23FF'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(42,35,255,0.6)'
              },
              {
                offset: 1,
                color: '#1F263C'
              }
            ])
          },
          data: data
        }
      ]
    })
  },[data,date])

  useEffect(()=>{
    if(chartRef.current) {
      const chartInstance = chartRef.current.getEchartsInstance();
      chartInstance.setOption(option)
      if (chartInstance) {
        chartInstance.dispose()
      }
    }
  },[date])
  
  useEffect(()=>{
    if(chartRef.current) {
      const chartInstance = chartRef.current.getEchartsInstance();
      chartInstance.setOption(option)
    }
  },[option])


  return(
    <div className=''>
      <ReactEcharts 
        ref={chartRef}
        option={option} 
        style={{ width: '100%', height: '360px' }}
        lazyUpdate={true}
        echarts={echarts}
      />
    </div>
  )
}