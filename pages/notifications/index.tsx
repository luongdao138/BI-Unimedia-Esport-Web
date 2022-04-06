import NotificationContainer from '@containers/Notifications'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { useEffect, useState } from 'react'
import GoogleAd from '@components/GoogleAd'
import { GTMHelper } from '@utils/helpers/SendGTM'

const NotificationsPage: PageWithLayoutType = () => {
  const theme = useTheme()
  const screenDownSP = useMediaQuery(theme.breakpoints.down(576))
  const [slotDataLayer, setSlotDataLayer] = useState('')
  const classes = useStyles()
  useEffect(() => {
    GTMHelper.getAdSlot()
    setSlotDataLayer(GTMHelper.getDataSlot(window?.dataLayer, GTMHelper.SCREEN_NAME_ADS.NOTIFICATION, screenDownSP))
  }, [screenDownSP])
  return (
    <MainLayout
      loginRequired
      adsOption={true}
      styleContentMainLayout={classes.contentMainLayout}
      childrenAds={
        <>
          {screenDownSP && (
            <GoogleAd
              id={{ idPatten3: 'ad_notifications_b' }}
              idTag={'ad_notifications_b'}
              slot={slotDataLayer}
              currenPath={window.location.href}
            />
          )}
        </>
      }
    >
      <NotificationContainer />
    </MainLayout>
  )
}
const useStyles = makeStyles(() => ({
  contentMainLayout: {
    minHeight: 'auto',
    height: 'calc(100vh - 110px)', //60px(header)+50px(ads)
    overflow: 'auto',
  },
}))
export default NotificationsPage
