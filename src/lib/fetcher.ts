import Router from 'next/router'
import { getUserSession,removeUserSession } from './storage'
import { toast } from 'react-toastify';
import { SERVER_ENTRY } from './constants';

type Stringifiable =
  | string
  | number
  | boolean
  | undefined
  | null
  | Stringifiable[]

//const SERVER_ENTRY = 'https://test-portal-api.wetez.io/api'

export type FetcherHeaders = { 'Authorization'?: string; 'Content-Type'?: string }

export type PostData = Record<string, Stringifiable>

export type FetcherConfig = RequestInit & {
  headers?: FetcherHeaders
}

function addHeader(
  config: FetcherConfig,
  key: keyof FetcherHeaders,
  value: string,
) {
  if (config.headers) config.headers[key] = value
  else config.headers = { [key]: value }
}

export const fetcher: <T>(url: string, config: FetcherConfig) => Promise<T> = (
  url,
  config = {},
) => {

  url = `${SERVER_ENTRY}${url}`
  console.log(url)
  const urlObject = new URL(url)
  
  return fetch(urlObject, config)
  .then(response => response.json())
  .then(json => {
    switch(true){
      case json.status === 80000:
        return json
      case json.status === 81007:
        removeUserSession()
        Router.replace({
          pathname: '/login',
          query: { redirect: Router.query.redirect ?? Router.asPath },
        })
        throw new Error('This email verify address is not valid, please try another.')
      case json.status === 81002:
        throw new Error('Login email or password is incorrect, please try again.')
      case json.status === 81003:
        throw new Error('Verify link is not correct, please try again.')
      case json.status === 81005:
        throw new Error('This email has been used, please try another one.')
      case json.status === 81006:
        throw new Error('This email address is not registered, please try another one.')
      case json.status === 81008:
        throw new Error('Please refresh your page.')
      case json.status === 81010:
        throw new Error('The plan need to contact us to subscribe.')
      case json.status === 81012:
        throw new Error('Illegal characters detected, please try another.')
      case json.status === 81014:
        throw new Error('There are unpaid and unexpired orders, new orders cannot be created.')
      case json.status === 80401:
        removeUserSession()
        Router.replace({
          pathname: '/login',
          query: { redirect: Router.query.redirect ?? Router.asPath },
      })
      throw new Error('Please Login First')
      case json.status === 80403:
        removeUserSession()
        Router.replace({
          pathname: '/login',
          query: { redirect: Router.query.redirect ?? Router.asPath },
      })
      throw new Error('Please Login First')
      case json.status === 80502:
        throw new Error('Network error, please tye again later')
      case json.status === 80503:
        throw new Error('Service error, please tye again later')
      case json.status === 80504:
        throw new Error('Network error, please tye again later')
      default:
        throw new Error(json.message || '未知错误')
    }
  })
  .then(json => json.data)
  .catch(error => {
    const message = error.msg || error.message
    toast.error(message)
    throw error
  })
}


export const post: <T>(
  url: string,
  data: PostData,
  config?: FetcherConfig,
) => Promise<any> = (url, data, config = {}) => {
  addHeader(config, 'Content-Type', 'application/json')
  
  const authorization = getUserSession()
  if(authorization){
    addHeader(config, 'Authorization', authorization)
  }

  return fetcher(url, {
    ...config,
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const fetcherOutLink: <T>(url: string) => Promise<T> = (
  url
) => {
  url = `${url}`
  const urlObject = new URL(url)
  return fetch(urlObject)
  .then(response => response.json())
  .then(json => {
    switch(true){
      case json.status === "80000":
        return json
        default:
          throw new Error(json.message || '未知错误')
    }
  })
  .then(json => json.data)
  .catch(error => {
    const message = error.msg || error.message
    throw error
  })
}

export const getOutLink: <T>(url: string, config?: FetcherConfig) => Promise<T> = (
  url
) => fetcherOutLink(url)
