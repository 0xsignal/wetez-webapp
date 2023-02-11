import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { CAPTCHA_KEY } from '../../lib/constants';

export default function Captcha({ children }: { children: React.ReactNode }){
  
  return(
      <GoogleReCaptchaProvider
        reCaptchaKey={CAPTCHA_KEY}
        scriptProps={{
          async: false, // optional, default to false,
          defer: false, // optional, default to false
          appendTo: 'body', // optional, default to "head", can be "head" or "body",
          nonce: undefined // optional, default undefined
        }}
        container={{ // optional to render inside custom element
          parameters: {
            badge: 'bottomright', // optional, default undefined
            theme: 'dark', // optional, default undefined
          }
        }}
        >
        {children}
      </GoogleReCaptchaProvider>
  )

}

