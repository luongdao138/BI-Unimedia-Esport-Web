import { Box, Grid, Icon, IconButton, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useNotificationList from './useNotificationList'
import NotificationListItem from './notificationItem'
import ESLoader from '@components/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

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
}))

const NotificationContainer: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const [hasMore, setHasMore] = useState(true)
  const { notifications, fetchNotifications, page } = useNotificationList()
  const fetchMoreData = () => {
    if (page.current_page >= page.total_pages) {
      setHasMore(false)
      return
    }
    fetchNotifications({ page: page.current_page + 1 })
  }

  useEffect(() => {
    const params = { page: 1 }
    fetchNotifications(params)
  }, [])

  return (
    <div>
      <Box className="header-first-column" style={{ maxWidth: '100%' }}>
        <IconButton className={classes.iconButton} disableRipple>
          <Icon className={`fa fa-arrow-left ${classes.icon}`} />
        </IconButton>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('common:notification.title')}
        </Typography>
      </Box>
      <InfiniteScroll
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
          <Grid item xs={12} key={i}>
            <NotificationListItem data={notification} />
          </Grid>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default NotificationContainer
