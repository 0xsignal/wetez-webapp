import { post } from '../lib/fetcher';

export const Register = async(data:{
  reCaptchaToken: string
  email:string
  password: string
}) => {
  const res = await post('/register',data)
  return res
}

export const SendVerifyEmail = async (data:{
  reCaptchaToken: string
  email:string
}) => {
  const res = await post('/send_verify_email',data)
  return res
}

export const VerifyEmail = async (data:{
  token:string
}) => {
  const {
    sessionId: sessionId,
    expire: expire,
  } = await post('/verify_email',{
    token: data.token,
  })
  
  localStorage.setItem("Authorization", sessionId);
  localStorage.setItem("expire", expire);

}

export const UpdateUser = async (data:{
  token:string
}) => {
  const res = await post('/verify_email',data)
}

export const SignIn = async(data:{
  reCaptchaToken: string
  email:string
  password: string
}) => {
  const {
    sessionId: sessionId,
    expire: expire,
  } = await post('/auth/login',{
    reCaptchaToken: data.reCaptchaToken,
    email:data.email,
    password: data.password,
  })
  
  localStorage.setItem("Authorization", sessionId);
  localStorage.setItem("expire", expire);
}