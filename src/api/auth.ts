import { post } from '../lib/fetcher';
import { removeUserSession } from '../lib/storage';

export const Register = async(data:{
  reCaptchaToken: string
  email:string
  password: string
}) => {
  const res = await post('/v1/register',data)
  return res
}

export const SendVerifyEmail = async (data:{
  reCaptchaToken: string
  email:string
}) => {
  const res = await post('/v1/send_verify_email',data)
  return res
}

export const VerifyEmail = async (data:{
  token:string
}) => {
  const {
    sessionId: sessionId,
    expire: expire,
  } = await post('/v1/verify_email',{
    token: data.token,
  })
  
  localStorage.setItem("Authorization", sessionId);
  localStorage.setItem("expire", expire);

}

export const SignIn = async(data:{
  reCaptchaToken: string
  email:string
  password: string
}) => {
  const {
    sessionId: sessionId,
    expire: expire,
  } = await post('/v1/auth/login',{
    reCaptchaToken: data.reCaptchaToken,
    email:data.email,
    password: data.password,
  })
  
  localStorage.setItem("Authorization", sessionId);
  localStorage.setItem("expire", expire);
}

export const LogOut = async(data:{
}) => {
  const res = await post('/v1/auth/logout',data)
  removeUserSession()
  return res
}