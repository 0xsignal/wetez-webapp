
export const gbConvert = (byteNumber = 0) => {
  const gbNumber:number = Number(Number(byteNumber/1024/1024/1024).toFixed(2))
  return gbNumber
}

export const copyText = async(text:string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
  }
}