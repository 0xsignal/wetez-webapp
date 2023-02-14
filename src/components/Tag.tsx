import React from 'react';

type TagProps = {
  name?: string;
};

export default function Tags({
  name = "free",
}:TagProps){

  let tagBgColor = 'bg-white/10'
  let tagFontColor = 'text-white/60'

  switch(name){
    case 'Free':
      tagBgColor = 'bg-white/10'
      tagFontColor = 'text-white/60'
      break
    case 'Develpoer':
      tagBgColor = 'bg-[#00F3AB]/10'
      tagFontColor = 'text-[#00F3AB]'
      break
    case 'Growth':
      tagBgColor = 'bg-[#FFE200]/10'
      tagFontColor = 'text-[#FFE200]'
      break
    case 'Team':
      tagBgColor = 'bg-[#00F4FF]/10'
      tagFontColor = 'text-[#00F4FF]'
      break
  }

  return(
    <>
      <div className={`${tagBgColor} ${tagFontColor} px-2 py-1 text-sm rounded-[6px]`}>
        {name}
      </div>
    </>
  )
}