/* eslint-disable no-console */
// import { makeStyles } from '@material-ui/core/styles'
import { useMediaQuery, useTheme } from '@material-ui/core'
import { useEffect, useState } from 'react'

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
  styleContainer?: any
  idTag?: string
}
declare global {
  interface Window {
    adsbygoogle: any
  }
}
const googleAdId = process.env.GADS_CLIENT_ID

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GoogleAd: React.FC<Props> = ({ timeout = 2000, style, id, slot, styleContainer, idTag = 'ads' }) => {
  //timeout = 2000,
  //   const classes = useStyles()
  const theme = useTheme()
  const screenDownSP = useMediaQuery(theme.breakpoints.down(576))
  const [windowDimensions, setWindowDimensions] = useState(window.innerWidth)

  useEffect(() => {
    const reportWindowSize = (e) => {
      setWindowDimensions(e.target.innerWidth)
    }
    window.addEventListener('resize', reportWindowSize)
    return () => {
      window.removeEventListener('resize', reportWindowSize)
    }
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
    height: screenDownSP ? 50 : 90,
    // background: 'red',
    width: screenDownSP ? 300 : '100%',
  }

  console.log('-check log google tag: screenDownSP: ', screenDownSP, ' ---id: ', JSON.stringify(id))
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  console.log('TAG MAN======', slot, `${idTag}`)
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
      id={`${idTag}`}
      className={`${
        id.idPatten1 ? 'google_ad_patten_1' : id.idPatten3 ? 'google_ad_patten_3' : 'google_ad_patten_4'
      } ${'banner-ads'}-${windowDimensions}`}
      style={styleContainer}
    >
      <div
        style={{
          width: screenDownSP ? 300 : '100%',
          height: screenDownSP ? 50 : 90,
          //   background: 'pink',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        {slot ? (
          <ins
            className={`adsbygoogle ${'window-ads'}-${windowDimensions}`}
            style={{ ...styles, ...style }}
            data-ad-client={googleAdId}
            data-ad-format=""
            data-ad-slot={slot}
            data-full-width-responsive="true"
          />
        ) : (
          <ins
            className={`adsbygoogle ${'window-ads'}-${windowDimensions}`}
            style={{ ...styles, ...style }}
            data-ad-client={googleAdId}
            data-ad-format=""
            data-full-width-responsive="true"
          />
        )}
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
