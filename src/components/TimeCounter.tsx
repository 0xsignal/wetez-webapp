import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';

type TimeCounterProps = {
  arriveTime: number
}

export default function TimeCounter({
  arriveTime = 0
}:TimeCounterProps) {
  const [current, setTime] = useState("-m : -s");

  const timerID: any = useRef();
  
  const deadLine= moment(arriveTime*1000);

  const deadLineTime = deadLine.diff(moment())

  let durationTime = moment.duration(deadLineTime);

  
  let isArrived =  deadLineTime < 0;
  
  useEffect(() => {
    timerID.current = setInterval(() => {
      let arriveTime = `${durationTime.minutes()}m : ${durationTime.seconds()}s`;
      if (!isArrived) {
        durationTime = moment.duration(deadLine.diff(moment()));
        setTime(() => arriveTime); // make pretty
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (isArrived) {
      clearInterval(timerID.current);
    }
  });

  return (
    <div>
      {current}
    </div>
  );
}