import { Box, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import useNotificationList from './useNotificationList'
import NotificationListItem from './notificationItem'
import ESLoader from '@components/Loader'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import NOTIFICATION_ACTION_TYPES from '@store/notification/actions/types'
import useNotificationDetail from '@containers/Notifications/useNotificationDetail'
import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import HeaderWithButton from '@components/HeaderWithButton'

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
    <div>
      <HeaderWithButton title={t('common:notification.title')} />
      <Box className={(classes.container, 'scroll-bar')}>
        <InfiniteLoader isItemLoaded={(index: number) => index < notifications.length} itemCount={itemCount} loadMoreItems={loadMore}>
          {({ onItemsRendered, ref }) => (
            <List
              height={800}
              width={'100%'}
              itemCount={notifications.length}
              itemData={notifications}
              itemSize={110}
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

const useStyles = makeStyles(() => ({
  container: {
    height: 800,
    padding: 24,
    paddingTop: 16,
    paddingBottom: 0,
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

export default NotificationContainer
