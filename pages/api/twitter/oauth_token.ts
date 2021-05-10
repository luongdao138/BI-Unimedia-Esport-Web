import type { NextApiRequest, NextApiResponse } from 'next'
import OAuth from 'oauth'

type Data = {
  oauth_token?: string
  error?: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  if (req.method === 'GET') {
    try {
      const oauth_token = await getToken()
      res.status(200).json({ oauth_token })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.status(404).json({ error: 'not_found' })
  }
}

const getToken = (): Promise<string> => {
  const oauth_token = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_APP_ID,
    process.env.TWITTER_APP_SECRET,
    '1.0',
    process.env.TWITTER_CALLBACK,
    'HMAC-SHA1'
  )
  return new Promise((resolve, reject) => {
    oauth_token.getOAuthRequestToken({ grant_type: 'client_credentials' }, (error, oauth_token) => {
      if (error) {
        reject(error)
      }
      resolve(oauth_token)
    })
  })
}
