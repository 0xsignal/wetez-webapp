import React from 'react';
import { useRouter } from 'next/router';
import { VerifyEmail } from 'src/api/auth';
import { useEffect } from 'react';

export default function Verify() {

  const router = useRouter()

  useEffect(() =>{
    const token = String(router.query.token)
    if(token != "undefined"){
      VerifyEmail({"token":token})
      router.replace('/dashboard')
    } else {
      router.replace('/login')
    }
  })

  return (
    <>
    </>
  )
}