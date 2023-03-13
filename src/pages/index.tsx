import React from 'react';
import { useEffect } from 'react';
import { getUserSession } from 'src/lib/storage';
import { useRouter } from 'next/router';

export default function Home() {

  const userSession = getUserSession()
  const router = useRouter()

  useEffect(()=>{
    if(userSession){
      router.replace('/dashboard')
    } else {
      router.replace('/login')
    }
  },[userSession])

  return (
    <>
    </>
  )
}


