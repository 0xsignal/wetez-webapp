import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function Captcha({ children }: { children: React.ReactNode }){

  const reCaptchaKey = "6LeRR2gfAAAAAD-Vp57E2syC1GFq58ca5pJMdF-4";

  return(
      <GoogleReCaptchaProvider
        reCaptchaKey={reCaptchaKey}
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

