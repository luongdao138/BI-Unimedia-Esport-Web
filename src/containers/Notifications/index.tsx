import { Box, Grid, Icon, IconButton, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import useNotificationList from './useNotificationList'
import NotificationListItem from './notificationItem'
import ESLoader from '@components/Loader'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'
import NOTIFICATION_ACTION_TYPES from '@store/notification/actions/types'
import useNotificationDetail from '@containers/Notifications/useNotificationDetail'
import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'

const NotificationContainer: React.FC = () => {
  const classes = useStyles()
  const { fetchNotificationDetail } = useNotificationDetail()
  const { notifications, fetchNotifications, resetMeta, meta, pages } = useNotificationList()
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

  const hasNextPage = pages && pages.current_page !== pages.total_pages

  const loadMore = () => {
    if (hasNextPage) {
      fetchNotifications({
        page: Number(pages.current_page) + 1,
      })
    }
  }

  const Row = (props: { index: number; style: React.CSSProperties; data: any }) => {
    const { index, style, data } = props
    const notification = data[index]
    return (
      <Grid
        item
        style={style}
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
    )
  }

  const itemCount = hasNextPage ? notifications.length + 1 : notifications.length

  return (
    <div className={classes.wrap}>
      <Box className={classes.header}>
        <IconButton className={classes.iconButton} disableRipple onClick={() => router.back()}>
          <Icon className={`fa fa-arrow-left ${classes.icon}`} />
        </IconButton>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('common:notification.title')}
        </Typography>
      </Box>
      <Box className={(classes.container, 'scroll-bar')}>
        <InfiniteLoader isItemLoaded={(index: number) => index < notifications.length} itemCount={itemCount} loadMoreItems={loadMore}>
          {({ onItemsRendered, ref }) => (
            <List
              height={800}
              width={'100%'}
              itemCount={notifications.length}
              itemData={notifications}
              itemSize={100}
              onItemsRendered={onItemsRendered}
              ref={ref}
            >
              {Row}
            </List>
          )}
        </InfiniteLoader>
        {meta.pending && (
          <Grid item xs={12}>
            <Box my={4} display="flex" justifyContent="center" alignItems="center">
              <ESLoader />
            </Box>
          </Grid>
        )}
      </Box>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    height: 'calc(100vh - 60px)',
    padding: 24,
    paddingTop: 16,
    paddingBottom: 0,
    display: 'flex',
    flexWrap: 'wrap',
  },
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

export default NotificationContainer
