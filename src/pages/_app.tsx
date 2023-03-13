import '../styles/globals.css';
import '../styles/fonts.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () =>  NProgress.start());
    router.events.on('routeChangeComplete', () =>  NProgress.done());
    router.events.on('routeChangeError', () =>  NProgress.done());
  }, []);


  return (
    <>
    <Component {...pageProps} />
    <ToastContainer />
    </>
  )
  
}

