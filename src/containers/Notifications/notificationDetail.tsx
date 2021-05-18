import { Typography, Box, makeStyles, IconButton, Icon } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { useEffect } from 'react'
import useNotificationDetail from '@containers/Notifications/useNotificationDetail'
import { useRouter } from 'next/router'
import useSmartTime from '@utils/hooks/useSmartTime'
import _ from 'lodash'
interface Props {
  id: any
}

const NotificationDetail: React.FC<Props> = ({ id }) => {
  const classes = useStyles()
  const router = useRouter()
  const { notificationDetail, fetchNotificationDetail, clearNotificationDetail } = useNotificationDetail()
  useEffect(() => {
    if (id) {
      fetchNotificationDetail(id)
    }
    return function () {
      clearNotificationDetail()
    }
  }, [id])

  const createdAt = useSmartTime(_.get(notificationDetail, 'data.attributes.created_at', ''))

  return (
    <>
      {notificationDetail !== undefined && notificationDetail.data !== undefined ? (
        <div>
          <Box className={classes.header}>
            <IconButton className={classes.iconButton} disableRipple onClick={() => router.back()}>
              <Icon className={`fa fa-arrow-left ${classes.icon}`} />
            </IconButton>
            <Typography variant="body1" className={classes.headerTitle}>
              {notificationDetail.data.attributes.message}
            </Typography>
          </Box>
          <Box margin={2} marginTop={6}>
            <Box textAlign="right">
              <Typography variant="caption" noWrap>
                {createdAt}
              </Typography>
            </Box>
            <Box className={classes.notificationDetailWrap} display="flex" justifyContent="space-between">
              <Typography>{notificationDetail.data.attributes.full_message}</Typography>
            </Box>
          </Box>
        </div>
      ) : (
        <span></span>
      )}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  notificationDetailWrap: {
    padding: theme.spacing(2),
    background: Colors.black,
    borderRadius: '4px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
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

export default NotificationDetail
