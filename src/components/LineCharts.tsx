import React from 'react';
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

let base = +new Date(2000, 9, 3);
let oneDay = 24 * 3600 * 1000;
let date = [];

let data = [Math.random() * 300];

for (let i = 1; i < 100; i++) {
  var now = new Date((base += oneDay));
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}

const option: ECOption = {
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
    right: '2%',
  },

  series: [
    {
      name: 'Fake Data',
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
};

export default function LineCharts() {
  useEffect(()=>{
    const CicleChart = echarts.init(document.getElementById('echartsContentLineChart') as HTMLElement);
    const ChartOption:ECOption = option;
    CicleChart.setOption(ChartOption);
  },[])


  return(
    <div className=''>
      <div style={{ width: '100%', height: '360px' }} id='echartsContentLineChart'>
      </div>
    </div>
  )
}