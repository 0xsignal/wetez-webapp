
export const gbConvert = (byteNumber = 0) => {
  const gbNumber:number = Number(Number(byteNumber/1024/1024/1024).toFixed(2))
  return gbNumber
}