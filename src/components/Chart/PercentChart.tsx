import React from 'react';

type PercentChartProps = {
  status: string,
  usage: number,
}

export default function PercentChart({
  status = '',
  usage = 0,
}:PercentChartProps){
  switch(status){
    case 'Active':
      return(
        <div className='w-1/3'>
          
        </div>
      )
    case 'Overrun':
      return(
        <div className='w-1/3'>

        </div>
      )
    case 'Inactive':
      return(
        <div className='w-1/3'>
          
        </div>
      )
  }


}