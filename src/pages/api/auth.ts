
export const register() = async (data:{
  reCaptchaToken: string,
  email: string,
  password: string
}) => {
  const res = await post()
  return true 
}