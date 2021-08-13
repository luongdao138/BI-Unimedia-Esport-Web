import getLineAccessToken, { GetLineAccessTokenResponse } from '@utils/helpers/getLineAccessToken'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse<GetLineAccessTokenResponse>): Promise<void> => {
  try {
    if (req.method === 'POST' && req.body.code) {
      const data = await getLineAccessToken(req.body.code)
      res.status(200).json(data)
    } else {
      res.status(404).json({ error: 'not_found' })
    }
  } catch (error) {
    res.status(400).json({ error: 'bad_request' })
  }
}
