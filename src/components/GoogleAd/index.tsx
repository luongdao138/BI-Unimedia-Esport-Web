// import { makeStyles } from '@material-ui/core/styles'
import { useEffect } from 'react'

interface Props {
  id: string
  classNames?: string
  slot: string
  timeout?: number
  style?: any
}
declare global {
  interface Window {
    adsbygoogle: any
  }
}
const googleAdId = process.env.GADS_CLIENT_ID

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GoogleAd: React.FC<Props> = ({ id, classNames, slot, timeout = 2000 }) => {
  //   const classes = useStyles()

  useEffect(() => {
    // const googleInit = setTimeout(() => {
    //   if (typeof window !== 'undefined') (window.adsbygoogle = window.adsbygoogle || []).push({})
    // }, timeout)
    // return () => {
    //   if (googleInit) clearTimeout(googleInit)
    // }
  }, [])

  return (
    <div id={id} className={classNames}>
      {/* <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={googleAdId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins> */}
    </div>
  )
}

// const useStyles = makeStyles(() => ({
//   media: {
//     width: '100%',
//     height: 'auto',
//   },
// }))

GoogleAd.defaultProps = {
  classNames: '',
  timeout: 200,
}

export default GoogleAd
