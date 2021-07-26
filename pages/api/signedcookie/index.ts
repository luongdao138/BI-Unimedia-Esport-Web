import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import axios from 'axios'
import { Signer } from 'aws-sdk/clients/cloudfront'
import { setCookie } from '@utils/cookies'

type Data = { status: 'OK' }

export default async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  try {
    const { data } = await axios.get(`https://${process.env.NEXT_PUBLIC_API}/v1/live_events/top`, {
      headers: {
        Authorization: `Bearer ${req.headers['authorization']}`,
      },
    })
    if (data.data && data.data.attributes.has_ticket) {
      const PRIVATE_KEY = fs.readFileSync(`./${process.env.CK_PK_NAME}`, {
        encoding: 'utf8',
      })
      const signer = new Signer(process.env.CF_KEY_ID, PRIVATE_KEY)
      const expiry = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 4
      const cookie = signer.getSignedCookie({
        policy: JSON.stringify({
          Statement: [
            {
              Resource: `${process.env.SPEKE_ENDPOINT}/5E99137A-BD6C-4ECC-A24D-A3EE04B4E011/*`,
              Condition: {
                DateLessThan: {
                  'AWS:EpochTime': expiry,
                },
              },
            },
          ],
        }),
      })
      setCookie(res, 'CloudFront-Key-Pair-Id', cookie['CloudFront-Key-Pair-Id'], { httpOnly: true, maxAge: expiry })
      setCookie(res, 'CloudFront-Policy', cookie['CloudFront-Policy'], { httpOnly: true, maxAge: expiry })
      setCookie(res, 'CloudFront-Signature', cookie['CloudFront-Signature'], { httpOnly: true, maxAge: expiry })
    }
  } catch (e) {
    console.error(e.message)
  }
  res.send({ status: 'OK' })
}
