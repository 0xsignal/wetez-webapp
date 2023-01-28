import React from 'react';

type TagProps = {
  name?: string;
  bgColor?: string;
  fontColor?: string;
};

export default function Tags({
  name = "free",
  bgColor = "bg-white/10",
  fontColor = "text-white/60"

}:TagProps){

  let tagBgColor = bgColor;
  let tagFontColor = fontColor;

  return(
    <>
      <div className={`${tagBgColor} ${tagFontColor} px-2 py-1 text-base rounded-[6px]`}>
        {name}
      </div>
    </>
  )
}