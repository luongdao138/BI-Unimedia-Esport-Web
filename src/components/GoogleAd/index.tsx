// import { makeStyles } from '@material-ui/core/styles'
import { useMediaQuery, useTheme } from '@material-ui/core'
import { useEffect } from 'react'

type Patten = {
  idPatten1?: string
  idPatten2?: string
  idPatten3?: string
  idPatten4?: string
}
interface Props {
  id: Patten
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
const GoogleAd: React.FC<Props> = ({ timeout = 2000, style, id }) => {
  //   const classes = useStyles()
  const theme = useTheme()
  const screenDownSP = useMediaQuery(theme.breakpoints.down(576))

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
    height: screenDownSP ? 50 : 90,
    // background: 'red',
    width: screenDownSP ? 320 : '100%',
  }
  return (
    // <>
    //   {isHasSlot ? (
    //     <ins
    //       className="adsbygoogle"
    //       style={{ display: 'block' }}
    //       data-ad-client={googleAdId}
    //       data-ad-slot={slot}
    //       data-ad-format="auto"
    //       data-full-width-responsive="true"
    //     ></ins>
    //   ) : (
    <div
      id={id.idPatten1 || id.idPatten2 || id.idPatten3 || id.idPatten4}
      className={id.idPatten1 ? 'google_ad_patten_1' : id.idPatten3 ? 'google_ad_patten_3' : 'google_ad_patten_4'}
    >
      <div
        style={{
          width: screenDownSP ? 320 : '100%',
          height: screenDownSP ? 50 : 90,
          // background: 'pink',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <ins
          className="adsbygoogle"
          style={{ ...styles, ...style }}
          data-ad-client={googleAdId}
          data-ad-format=""
          data-full-width-responsive="true"
        ></ins>
      </div>
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
