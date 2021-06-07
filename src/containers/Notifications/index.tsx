import { Box, Grid, Theme } from '@material-ui/core'
import React, { useEffect } from 'react'
import useNotificationList from './useNotificationList'
import NotificationListItem from './notificationItem'
import ESLoader from '@components/Loader'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import NOTIFICATION_ACTION_TYPES from '@store/notification/actions/types'
import useNotificationDetail from '@containers/Notifications/useNotificationDetail'
import HeaderWithButton from '@components/HeaderWithButton'
import InfiniteScroll from 'react-infinite-scroll-component'

const NotificationContainer: React.FC = () => {
  const classes = useStyles()
  const { fetchNotificationDetail } = useNotificationDetail()
  const { notifications, fetchNotifications, clearNotificationBadge, resetMeta, meta, pages } = useNotificationList()
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
        next={loadMore}
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
                    fetchNotificationDetail(Number(notification.id))
                    router.push(`/profile/${notification.attributes.user_code}`)
                    break
                  }
                  case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_SYSTEM: {
                    router.push(`/notifications/${notification.id}`)
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
