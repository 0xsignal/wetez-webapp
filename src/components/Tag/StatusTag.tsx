import React from 'react';

type TagProps = {
  status?: number;
};

export default function PlanTag({
  status = 1,
}:TagProps){

  let statusName = 'Active'
  let tagBgColor = 'bg-white/10'
  let tagFontColor = 'text-white/60'

  switch(status){
    case 1:
      statusName = 'Active'
      tagBgColor = 'bg-[#00F4FF]'
      tagFontColor = 'text-#182036'
      break
    case 2:
      statusName = 'Overrun'
      tagBgColor = 'bg-[#00F3AB]/10'
      tagFontColor = 'text-[#00F3AB]'
      break
    case 0:
      statusName = 'Upcoming'
      tagBgColor = 'bg-[#A7B2CC]'
      tagFontColor = 'text-[#FFE200]'
      break
    case 3:
      statusName = 'Inactive'
      tagBgColor = 'bg-[#A7B2CC]'
      tagFontColor = 'text-[#00F3AB]'
      break
  }

  return(
    <>
      <div className={`${tagBgColor} ${tagFontColor} px-3 py-1 text-sm rounded-[6px]`}>
        {statusName}
      </div>
    </>
  )
}