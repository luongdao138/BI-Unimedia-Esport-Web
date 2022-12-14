import React, { ReactNode } from 'react'
import { Box, makeStyles, Typography, CircularProgress, Icon } from '@material-ui/core'
import ESMenuItem from '@components/Menu/MenuItem'
import { useTranslation } from 'react-i18next'
import ESMenu from '@components/Menu'
import _ from 'lodash'
import { STATUS_SEND_MESS } from '@constants/common.constants'
import { STATUS_VIDEO } from '@services/videoTop.services'
import { Colors } from '@theme/colors'
import useIsomorphicLayoutEffect from '@utils/hooks/useIsomorphicLayoutEffect'

type ChatContainerProps = {
  message?: any
  is_streamer?: number
  videoType?: number
  deleteMess: (message: any) => void
  resendMess: (message: any) => void
  reDeleteMess: (message: any) => void
  getMessageWithoutNgWords: (chatMessContent: string) => ReactNode
  measure?: any
  contentRect?: any
}

const ChatTextMessage = React.memo<ChatContainerProps>(
  ({ message, deleteMess, getMessageWithoutNgWords, is_streamer, resendMess, reDeleteMess, videoType, measure, contentRect }) => {
    const classes = useStyles()
    const { t } = useTranslation('common')
    const getClassDeletedMess = (): string => {
      if (message.delete_flag) {
        return 'line_through_text'
      } else return ''
    }

    useIsomorphicLayoutEffect(() => {
      measure?.()
    }, [message, contentRect?.width, contentRect?.height])

    return (
      <Box className={classes.chatMessageContainer}>
        <Box className={classes.container}>
          <Typography className={classes.chatMessage}>
            <span className={`${message.delete_flag ? '' : classes.chatMessageUser} ${getClassDeletedMess()}`}>{`${message.owner}: `}</span>
            {/* <span className={getClassDeletedMess()}>{getMessageWithoutNgWords(message.text) + ' ' + message.video_time + 's'}</span> */}
            <span className={`${getClassDeletedMess()} ${classes.normalMessage}`}>{getMessageWithoutNgWords(message.text)}</span>
            <Box component="span" className={classes.mess_status}>
              {message.mess_status === STATUS_SEND_MESS.PENDING ? <CircularProgress size={12} /> : ''}
              {message.mess_status === STATUS_SEND_MESS.ERROR_SEND || message.mess_status === STATUS_SEND_MESS.ERROR_DELETE ? (
                <Icon
                  color="primary"
                  className={`fa fa-exclamation-triangle ${classes.resendIcon}`}
                  fontSize="small"
                  onClick={() => {
                    if (message.mess_status === STATUS_SEND_MESS.ERROR_SEND) {
                      resendMess(message)
                    } else {
                      reDeleteMess(message)
                    }
                  }}
                />
              ) : (
                ''
              )}
            </Box>
          </Typography>
          {/* {(!message.mess_status || message.mess_status === STATUS_SEND_MESS.LOADED) ? ( */}
          {/* {(!message.mess_status || message.mess_status === STATUS_SEND_MESS.LOADED) ? (
              <Icon color="primary" className={`fa fa-check-circle ${classes.icon}`} fontSize="small" />
            ) : ''} */}

          {videoType === STATUS_VIDEO.LIVE_STREAM && is_streamer && message.id ? (
            <ESMenu className={classes.menu_del_mess} iconClass={classes.iconClass} disableRipple>
              {message.delete_flag ? (
                <ESMenuItem disabled className={classes.menu_item_disabled}>
                  {t('live_stream_screen.deleted_message')}
                </ESMenuItem>
              ) : (
                <ESMenuItem onClick={() => deleteMess(message)}>{t('live_stream_screen.delete_message')}</ESMenuItem>
              )}
            </ESMenu>
          ) : (
            ''
          )}
        </Box>
      </Box>
    )
  },
  (prevProps, nextProps) => {
    return _.isEqual(prevProps.message, nextProps.message)
  }
)

const useStyles = makeStyles(() => ({
  normalMessage: {
    wordBreak: 'break-all',
    color: Colors.white_opacity[70],
  },
  icon: {},
  resendIcon: {
    cursor: 'pointer',
  },
  mess_status: {
    paddingLeft: 4,
    alignItems: 'center',
    // display: 'inline-flex',
    marginBottom: '4px',
    display: 'none',
  },
  menu_del_mess: {},
  menu_item_disabled: {
    '&.MuiListItem-root.Mui-disabled': {
      opacity: 1,
    },
  },
  iconClass: {
    display: 'none',
    position: 'absolute',
    right: '-1px',
    padding: '2px 0 0 0',
    '& .MuiIcon-fontSizeSmall': {
      fontSize: '0.82rem',
    },
    '&.MuiIconButton-root': {
      '&:hover': {
        background: 'none',
      },
    },
  },
  chatMessageContainer: {
    flexDirection: 'column',
    display: 'flex',
    '&:hover $iconClass': {
      display: 'inline-flex',
    },
    '&:hover $mess_status': {
      display: 'inline-flex',
    },
    position: 'relative',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 8,
  },
  chatMessage: {
    fontSize: 14,
    marginBottom: 8,
    color: Colors.white_opacity[30],
  },
  chatMessageUser: {
    color: '#fff',
  },
}))

export default ChatTextMessage
