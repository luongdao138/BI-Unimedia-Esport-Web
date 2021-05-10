import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
  access_token?: string
  access_token_secret?: string
  error?: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  try {
    if (req.method === 'POST') {
      const { data } = await axios.post<string>(`https://api.twitter.com/oauth/access_token${req.body.data}`)
      const params = new URLSearchParams(data)
      const access_token = params.get('oauth_token')
      const access_token_secret = params.get('oauth_token_secret')
      res.status(200).json({
        access_token,
        access_token_secret,
      })
    } else {
      res.status(404).json({ error: 'not_found' })
    }
  } catch (error) {
    res.status(400).json({ error: 'bad_request' })
  }
}
