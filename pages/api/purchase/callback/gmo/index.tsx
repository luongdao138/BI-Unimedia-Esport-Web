import { NextApiRequest, NextApiResponse } from 'next'
import { liveEventsServices } from '@services/liveEvents.service'

export default async function postGmoCallBack(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  let data: any = 'result'
  if (req.method === 'POST') {
    data = req.body
  }
  try {
    const handlerResponse = await liveEventsServices.gmoCallBack({
      result: data.result,
    })
    if (handlerResponse.data && handlerResponse.data.stauts === 'PAYSUCCESS') {
      //res.json(handlerResponse.data)
      res.writeHead(302, { Location: '/purchase/result/gmo/success' })
    } else {
      res.writeHead(302, { Location: '/purchase/result/gmo/fail' })
    }
  } catch (e) {
    res.writeHead(302, { Location: '/purchase/result/gmo/fail' })
  }
  //res.writeHead(302, { Location: '/purchase/result/gmo/success' })
  //res.writeHead(302, { Location: '/purchase/result/gmo/fail' })
  res.end()
}
