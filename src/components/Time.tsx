import React, { useEffect, useState } from 'react';
import moment from 'moment';

type TimeProps = {
  timestramp : number
}

export function Time({
  timestramp = 0
}:TimeProps){

  const [utcTime,setUtcTime] = useState('')

  useEffect(()=>{
    setUtcTime(moment(timestramp*1000).format('L'))
  },[timestramp])
  return(
    <div>
      {utcTime}
    </div>
  )
} 