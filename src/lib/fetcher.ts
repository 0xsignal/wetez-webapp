import Router from 'next/router'

type Stringifiable =
  | string
  | number
  | boolean
  | undefined
  | null
  | Stringifiable[]

export type PostData = Record<string, Stringifiable>

export type FetcherHeaders = { 'Content-Type'?: string }

export type FetcherConfig = RequestInit & {
  headers?: FetcherHeaders
}

export const post: <T>(
  url: string,
  data: PostData,
  config?: FetcherConfig,
) => Promise<T> = (url, data, config = {}) => {
  addHeader(config, 'Content-Type', 'application/json')
  return fetcher(url, {
    ...config,
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const fetcher: <T>(url: string, config: FetcherConfig) => Promise<T> = (
  url,
  config = {},
) => {
  if (!isInternalLink(url)) {
    return fetch(url, config)
  }

  url = `${SERVER_ENTRY}${url}`
  const urlObject = new URL(url)
  addLoginInfo(urlObject, config)

  return fetch(urlObject, config)
    .then(response => response.json())
    .then(json => {
      switch (true) {
        case json.code == 200:
          return json
        case json.code == -1: // 未登录
        case json.code == -2: // 登录失效
          if (config.login === LoginType.Login) {
            Router.replace({
              pathname: '/auth/login',
              query: { redirect: Router.query.redirect ?? Router.asPath },
            })
            throw new Error('登录失效，请重新登录')
          }
          throw new Error(json.msg || json.message || '未知错误')
        default:
          throw new Error(json.msg || json.message || '未知错误')
      }
    })
    .then(json => json.data)
    .catch(error => {
      const message = error.msg || error.message
      useToast
        .getState()
        .toast?.current?.message({ message, type: MessageTypes.Error })

      throw error
    })
}

function addHeader(
  config: FetcherConfig,
  key: keyof FetcherHeaders,
  value: string,
) {
  if (config.headers) config.headers[key] = value
  else config.headers = { [key]: value }
}