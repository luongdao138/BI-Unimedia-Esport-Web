// import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'

interface Props {
  id: string
  classNames?: string
  slot?: string
  timeout?: number
  style?: any
  isHasSlot?: boolean
  classNamePatten?: string
}
declare global {
  interface Window {
    adsbygoogle: any
  }
}
const googleAdId = process.env.GADS_CLIENT_ID

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GoogleAdsPatten2: React.FC<Props> = ({ timeout = 2000, style }) => {
  //   const classes = useStyles()
  const [windowDimensions, setWindowDimensions] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize(e) {
      console.warn('RESIZE P2====', e.target.innerWidth)
      setWindowDimensions(e.target.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const googleInit = setTimeout(() => {
      if (typeof window !== 'undefined') (window.adsbygoogle = window.adsbygoogle || []).push({})
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
  }
  return (
    // <>mes
    // <div className={`${id} google_ad_patten_2`}>
    <div className={`${windowDimensions} layout_ads_div`}>
      <ins
        className={`${'banner_ads'}-${windowDimensions} adsbygoogle`}
        style={{ ...styles, ...style }}
        data-ad-client={googleAdId}
        data-ad-format=""
        data-full-width-responsive="true"
      ></ins>
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
