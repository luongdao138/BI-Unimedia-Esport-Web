import { Box, Grid, Icon, IconButton, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useNotificationList from './useNotificationList'
import NotificationListItem from './notificationItem'
import ESLoader from '@components/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'
import NOTIFICATION_ACTION_TYPES from '@store/notification/actions/types'
import useNotificationDetail from '@containers/Notifications/useNotificationDetail'

const useStyles = makeStyles((theme) => ({
  loaderCenter: {
    textAlign: 'center',
  },
  icon: {
    fontSize: 12,
    color: theme.palette.text.primary,
  },
  iconButton: {
    backgroundColor: theme.palette.text.secondary,
    marginRight: 14,
  },
  headerTitle: {
    color: Colors.white,
    display: 'inline-block',
  },
  create: {
    marginLeft: 'auto',
  },
  wrap: {
    height: 'calc(100vh - 60px)',
    overflow: 'auto',
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      width: 0,
      height: 0,
    },
  },
  header: {
    padding: 16,
    width: '100%',
    position: 'sticky',
    background: Colors.black,
    zIndex: 10,
    left: 0,
    top: 0,
    right: 0,
    height: 60,
    borderBottom: '1px solid #212121',
  },
}))

const NotificationContainer: React.FC = () => {
  const classes = useStyles()
  const { fetchNotificationDetail } = useNotificationDetail()
  const { t } = useTranslation(['common'])
  const [hasMore, setHasMore] = useState(true)
  const { notifications, fetchNotifications, page } = useNotificationList()
  const router = useRouter()
  const fetchMoreData = () => {
    if (page.current_page >= page.total_pages) {
      setHasMore(false)
      return
    }
    fetchNotifications({ page: Number(page.current_page) + Number(1) })
  }

  useEffect(() => {
    const params = { page: 1 }
    fetchNotifications(params)
  }, [])

  return (
    <div className={classes.wrap} id="test">
      <Box className={classes.header}>
        <IconButton className={classes.iconButton} disableRipple onClick={() => router.back()}>
          <Icon className={`fa fa-arrow-left ${classes.icon}`} />
        </IconButton>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('common:notification.title')}
        </Typography>
      </Box>
      <InfiniteScroll
        scrollableTarget={'test'}
        dataLength={notifications.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className={classes.loaderCenter}>
            <ESLoader />
          </div>
        }
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>{t('common:infinite_scroll.message')}</b>
          </p>
        }
      >
        {notifications.map((notification, i) => (
          <Grid
            item
            xs={12}
            key={i}
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
    </div>
  )
}

export default NotificationContainer
