import { Typography, Box, makeStyles, IconButton, Icon, Link } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { useEffect } from 'react'
import useNotificationDetail from '@containers/Notifications/useNotificationDetail'
import { useRouter } from 'next/router'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import * as notificationActions from '@store/notification/actions'

import _ from 'lodash'
import { useAppDispatch } from '@store/hooks'
interface Props {
  id: any
}

const NotificationDetail: React.FC<Props> = ({ id }) => {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { notificationDetail, fetchNotificationDetail, clearNotificationDetail } = useNotificationDetail()
  useEffect(() => {
    if (id) {
      fetchNotificationDetail(id)
      dispatch(notificationActions.getNotificationBadge())
    }
    return function () {
      clearNotificationDetail()
    }
  }, [id])

  const createdAt = CommonHelper.staticSmartTime(_.get(notificationDetail, 'data.attributes.created_at', ''))

  const formatFullMessage = (description: string) => {
    const pieces = CommonHelper.cutLinksIntoPieces(description)
    return pieces.map((piece, index, _arr) => {
      if (piece.type === 'text') {
        return piece.text
      } else {
        return (
          <Link key={index} href={piece.text} target="_blank" className={classes.linkBreak}>
            {piece.text}
          </Link>
        )
      }
    })
  }

  return (
    <>
      {notificationDetail !== undefined && notificationDetail.data !== undefined ? (
        <div>
          <Box className={classes.header}>
            <Box className={classes.headerInner}>
              <IconButton className={classes.iconButton} disableRipple onClick={() => router.back()}>
                <Icon className={`fa fa-arrow-left ${classes.icon}`} />
              </IconButton>
              <Typography variant="body1" className={classes.headerTitle}>
                {notificationDetail.data.attributes.message}
              </Typography>
            </Box>
          </Box>
          <Box margin={2} marginTop={6}>
            <Box textAlign="right" mb={1}>
              <Typography variant="caption" noWrap>
                {createdAt}
              </Typography>
            </Box>
            <Box className={classes.notificationDetailWrap} display="flex" justifyContent="space-between">
              <Typography className={classes.detail}>{formatFullMessage(notificationDetail.data.attributes.full_message)}</Typography>
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
  detail: {
    whiteSpace: 'pre-line',
  },
  icon: {
    fontSize: 12,
    color: theme.palette.text.primary,
  },
  iconButton: {
    backgroundColor: theme.palette.text.secondary,
    marginRight: 14,
    position: 'absolute',
    left: 16,
    transform: 'translateY(-50%)',
    top: '50%',
  },
  headerTitle: {
    color: Colors.white,
    maxWidth: '100%',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginLeft: 66,
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
    minHeight: 60,
    borderBottom: '1px solid #212121',
  },
  headerInner: {
    position: 'relative',
    minHeight: '100%',
  },
  linkBreak: {
    wordWrap: 'break-word',
    wordBreak: 'break-word',
  },
}))

export default NotificationDetail
