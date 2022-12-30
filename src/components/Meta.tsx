import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';


type MetaProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  pathname?: string;
};

export function Meta({
  title = 'test',
  description = 'test',
  image,
  url = "https://test.com",
  pathname,

}:MetaProps){
  const router = useRouter();
  const imageUrl = `${url}/social/${image || 'default.png'}`;
  const path = pathname || router.pathname;
  
  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta property="og:url" content={`${url}${path}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:site" content="" />
      <meta name="twitter:card" content="" />
    </Head>
  );


}