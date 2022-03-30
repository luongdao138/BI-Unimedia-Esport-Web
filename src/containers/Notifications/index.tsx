import { Box, Grid, Theme, useMediaQuery } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import useNotificationList from './useNotificationList'
import NotificationListItem from './notificationItem'
import ESLoader from '@components/Loader'
import { useTranslation } from 'react-i18next'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import NOTIFICATION_ACTION_TYPES from '@store/notification/actions/types'
import HeaderWithButton from '@components/HeaderWithButton'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ESRoutes } from '@constants/route.constants'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import GoogleAd from '@components/GoogleAd'
import { GTMHelper } from '@utils/helpers/SendGTM'

const NotificationContainer: React.FC = () => {
  const classes = useStyles()
  const { notifications, fetchNotifications, clearNotificationBadge, resetMeta, meta, pages, seenNotificationBadge } = useNotificationList()
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const theme = useTheme()
  const screenDownSP = useMediaQuery(theme.breakpoints.down(576))
  const [slotDataLayer, setSlotDataLayer] = useState('')

  useEffect(() => {
    return () => resetMeta()
  }, [])

  useEffect(() => {
    fetchNotifications({
      page: 1,
    })
  }, [])

  useEffect(() => {
    if (meta.loaded) {
      clearNotificationBadge()
    }
  }, [meta.loaded])

  const hasNextPage = pages && pages.current_page !== pages.total_pages

  const loadMore = () => {
    if (hasNextPage) {
      fetchNotifications({
        page: Number(pages.current_page) + 1,
      })
    }
  }
  useEffect(() => {
    GTMHelper.getAdSlot()
    setSlotDataLayer(GTMHelper.getDataSlot(window?.dataLayer, GTMHelper.SCREEN_NAME_ADS.NOTIFICATION))
  }, [screenDownSP])

  return (
    <div>
      <div
        id={!screenDownSP ? 'ad_notifications_top' : 'ad_notifications_bottom'}
        className={!screenDownSP ? 'google_ad_patten_1' : 'google_ad_patten_4'}
      />
      {/* GADS: notifications 1-4*/}
      <GoogleAd
        id={{ idPatten1: !screenDownSP && 'ad_notifications_t', idPatten4: screenDownSP && 'ad_notifications_b' }}
        idTag={!screenDownSP ? 'ad_notifications_t' : 'ad_notifications_b'}
        slot={slotDataLayer}
      />
      <HeaderWithButton title={t('common:notification.title')} />
      <InfiniteScroll
        className={classes.container}
        dataLength={notifications.length}
        next={!meta.pending && loadMore}
        hasMore={hasNextPage}
        loader={null}
        scrollThreshold="1px"
      >
        {notifications.map((notification, index) => (
          <Grid
            item
            xs={12}
            key={index}
            onClick={() => {
              if (notification.attributes) {
                switch (notification.attributes.ntype_id) {
                  case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_FOLLOW: {
                    seenNotificationBadge()
                    CommonHelper.checkUserCode(notification.attributes.user_code, () => {
                      router.push(`${ESRoutes.PROFILE}/${notification.attributes.user_code}`)
                    })
                    break
                  }
                  case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_SYSTEM: {
                    seenNotificationBadge()
                    router.push(`${ESRoutes.NOTIFICATIONS}/${notification.id}`)
                    break
                  }
                  case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_ADMIN: {
                    seenNotificationBadge()
                    router.push(`${ESRoutes.NOTIFICATIONS}/${notification.id}`)
                    break
                  }
                  case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_TOURNAMENT: {
                    seenNotificationBadge()
                    router.push(`${ESRoutes.ARENA_DETAIL.replace(/:id/gi, notification.attributes.hash_key)}`)
                    break
                  }
                  case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_MESSAGE: {
                    seenNotificationBadge()
                    router.push(`${ESRoutes.GROUP_CHAT.replace(/:id/gi, notification.attributes.room_id)}`)
                    break
                  }
                  case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_RECRUITMENT: {
                    seenNotificationBadge()
                    router.push(`${ESRoutes.LOBBY_DETAIL.replace(/:id/gi, notification.attributes.hash_key)}`)
                    break
                  }
                  case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_COMMUNITY: {
                    seenNotificationBadge()
                    router.push(`${ESRoutes.COMMUNITY_DETAIL.replace(/:id/gi, notification.attributes.hash_key)}`)
                    break
                  }
                  case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_COMMENT: {
                    seenNotificationBadge()
                    router.push(`${ESRoutes.TOPIC.replace(/:id/gi, notification.attributes.hash_key)}/${notification.attributes.hash_key2}`)
                    break
                  }
                  default: {
                    break
                  }
                }
              }
            }}
          >
            <NotificationListItem data={notification} />
          </Grid>
        ))}
      </InfiniteScroll>
      {meta.pending && (
        <Grid item xs={12}>
          <Box my={4} display="flex" justifyContent="center" alignItems="center">
            <ESLoader />
          </Box>
        </Grid>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingBottom: 60,
    '& > div:last-child > div': {
      marginBottom: theme.spacing(2),
    },
  },
}))

export default NotificationContainer
