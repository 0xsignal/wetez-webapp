import React from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Meta } from 'src/components/Meta';
import { useVerifyEmail } from 'src/api/auth';

export default function Verify_email() {

  const router = useRouter()

  const {
    trigger: verifyEmailTrigger,
    isMutating: verifyEmailIsMutating,
  } = useVerifyEmail()

  useEffect(() => {
    const token = String(router.query.token)
    if(router.isReady){
      if(token != undefined){
        verifyEmail(token)
      } else {
        router.replace('/login')
      }
    }},[router.isReady])
    

  const verifyEmail = async(token:string) =>{
    const res = await verifyEmailTrigger({token:token})
      if(!verifyEmailIsMutating){
        if(res?.sessionId != undefined){
          localStorage.setItem("Authorization", res.sessionId);
          localStorage.setItem("expire", String(res.expire));
          router.replace('/dashboard')
        } else {
          router.replace('/login')
        }
      }  
  } 

  return (
    <Meta
      title='Verify Email'
    />
  )
}