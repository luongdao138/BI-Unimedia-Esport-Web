// import { makeStyles } from '@material-ui/core/styles'
import { useEffect } from 'react'

interface Props {
  id: string
  classNames?: string
  slot?: string
  timeout?: number
  style?: any
  isHasSlot?: boolean
  classNamePatten?: string
  idTag?: string
}
declare global {
  interface Window {
    adsbygoogle: any
  }
}
const googleAdId = process.env.GADS_CLIENT_ID

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GoogleAdsPatten2: React.FC<Props> = ({ timeout = 2000, style, idTag, slot }) => {
  //   const classes = useStyles()

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('=====check lai=========')
    const googleInit = setTimeout(() => {
      if (typeof window !== 'undefined') {
        if (document.getElementById('ad_message_r').innerHTML) {
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        }
      }
    }, timeout)
    return () => {
      if (googleInit) clearTimeout(googleInit)
    }
  }, [])
  const styles = {
    display: 'block',
    height: 250,
    // background: 'red',
    width: 'calc((100% - 960px) / 2)',
    maxWidth: 300,
    minWidth: 170,
    // border: '1px solid red',
  }
  return (
    // <>mes
    // <div className={`${id} google_ad_patten_2`}>
    <div id={`${idTag}`} className="layout_ads_div">
      {slot ? (
        <ins
          className="adsbygoogle"
          style={{ ...styles, ...style }}
          data-ad-client={googleAdId}
          data-ad-slot={slot}
          data-ad-format=""
          data-full-width-responsive="true"
        ></ins>
      ) : (
        <ins
          className="adsbygoogle"
          style={{ ...styles, ...style }}
          data-ad-client={googleAdId}
          data-ad-format=""
          data-full-width-responsive="true"
        ></ins>
      )}
    </div>
    // </div>
  )
}

// const useStyles = makeStyles(() => ({
//   media: {
//     width: '100%',
//     height: 'auto',
//   },
// }))

GoogleAdsPatten2.defaultProps = {
  classNames: '',
  timeout: 200,
}

export default GoogleAdsPatten2
