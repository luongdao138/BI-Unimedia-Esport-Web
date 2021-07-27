import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import axios from 'axios'
import { Signer } from 'aws-sdk/clients/cloudfront'
import { setCookies } from '@utils/cookies'

type Response = { status: 'OK' }

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> => {
  const expiry = 4 * 60 * 60
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/v1/live_events/top`, {
      headers: {
        Authorization: `Bearer ${req.headers['authorization']}`,
      },
    })
    if (data.data && data.data.attributes.has_ticket) {
      const PRIVATE_KEY = fs.readFileSync(`./${process.env.CK_PK_NAME}`, {
        encoding: 'utf8',
      })
      const signer = new Signer(process.env.CF_KEY_ID, PRIVATE_KEY)
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
      const options = { httpOnly: true, path: '/', expiry, sameSite: true }

      setCookies(res, [
        {
          name: 'CloudFront-Key-Pair-Id',
          value: cookie['CloudFront-Key-Pair-Id'],
          options,
        },
        {
          name: 'CloudFront-Policy',
          value: cookie['CloudFront-Policy'],
          options,
        },
        {
          name: 'CloudFront-Signature',
          value: cookie['CloudFront-Signature'],
          options,
        },
      ])
    }
  } catch (e) {
    setCookies(res, [
      {
        name: 'CloudFront-Key-Pair-Id',
        value: '',
        options: { maxAge: 0 },
      },
      {
        name: 'CloudFront-Policy',
        value: '',
        options: { maxAge: 0 },
      },
      {
        name: 'CloudFront-Signature',
        value: '',
        options: { maxAge: 0 },
      },
    ])
  }
  return res.json({
    status: 'OK',
  })
}

export default handler
