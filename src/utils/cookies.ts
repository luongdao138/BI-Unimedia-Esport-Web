import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse } from 'next'

/**
 * This sets `cookie` using the `res` object
 */

interface Cookie {
  name: string
  value: unknown
  options: CookieSerializeOptions
}

export const setCookies = (res: NextApiResponse, cookies: Cookie[]): void => {
  const serializedCookies = cookies.map((cookie: Cookie) => {
    const stringValue = typeof cookie.value === 'object' ? 'j:' + JSON.stringify(cookie.value) : String(cookie.value)

    if ('maxAge' in cookie.options) {
      cookie.options.expires = new Date(Date.now() + cookie.options.maxAge)
      // cookie.options.maxAge /= 1000
    }
    // console.log(cookie.options)
    return serialize(cookie.name, String(stringValue), cookie.options)
  })

  res.setHeader('Set-Cookie', serializedCookies)
}
