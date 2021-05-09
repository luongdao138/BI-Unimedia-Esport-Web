import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
  access_token?: string
  error?: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    if (req.method === 'POST') {
      const { data } = await axios.post<Data>(
        `https://api.line.me/oauth2/v2.1/token`,
        `grant_type=authorization_code&code=${req.body.code}&redirect_uri=${process.env.NEXT_PUBLIC_LINE_CALLBACK}&client_id=${process.env.NEXT_PUBLIC_LINE_CLIENT_ID}&client_secret=${process.env.LINE_CLIENT_SECRET}`
      )
      res.status(200).json(data)
    } else {
      res.status(404).json({ error: 'not_found' })
    }
  } catch (error) {
    res.status(400).json({ error: 'bad_request' })
  }
}
