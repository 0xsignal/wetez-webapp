import Router from 'next/router'
import { getUserSession,removeUserSession } from './storage'

type Stringifiable =
  | string
  | number
  | boolean
  | undefined
  | null
  | Stringifiable[]

const SERVER_ENTRY = 'https://test-portal-api.wetez.io/api'

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
