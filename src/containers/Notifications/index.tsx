import { Box, Grid, Theme } from '@material-ui/core'
import React, { useEffect } from 'react'
import useNotificationList from './useNotificationList'
import NotificationListItem from './notificationItem'
import ESLoader from '@components/Loader'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import NOTIFICATION_ACTION_TYPES from '@store/notification/actions/types'
import HeaderWithButton from '@components/HeaderWithButton'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ESRoutes } from '@constants/route.constants'

const NotificationContainer: React.FC = () => {
  const classes = useStyles()
  const { notifications, fetchNotifications, clearNotificationBadge, resetMeta, meta, pages, seenNotificationBadge } = useNotificationList()
  const { t } = useTranslation(['common'])
  const router = useRouter()

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

  return (
    <div>
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
                    router.push(`${ESRoutes.PROFILE}/${notification.attributes.user_code}`)
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
    '& > div:last-child > div': {
      marginBottom: theme.spacing(2),
    },
  },
}))

export default NotificationContainer
