import React, { ReactNode } from 'react'
import { Box, makeStyles, Typography, CircularProgress } from '@material-ui/core'
import ESMenuItem from '@components/Menu/MenuItem'
import { useTranslation } from 'react-i18next'
import ESMenu from '@components/Menu'
// import * as APIt from 'src/types/graphqlAPI'
import _ from 'lodash'
import {STATUS_SEND_MESS} from '@constants/common.constants'

type ChatContainerProps = {
  message?: any
  is_streamer?: number
  deleteMess: (message: any) => void
  getMessageWithoutNgWords: (chatMessContent: string) => ReactNode
}

const ChatTextMessage = React.memo<ChatContainerProps>(
  ({ message, deleteMess, getMessageWithoutNgWords, is_streamer }) => {
    const classes = useStyles()
    const { t } = useTranslation('common')
    const getClassDeletedMess = (): string => {
      if (message.delete_flag) {
        return 'line_through_text'
      } else return ''
    }

    return (
      <Box className={classes.chatMessageContainer}>
        <Box className={classes.container}>
          <Typography className={classes.chatMessage}>
            <span className={`${message.delete_flag ? '' : classes.chatMessageUser} ${getClassDeletedMess()}`}>{`${message.owner}: `}</span>
            {/* <span className={getClassDeletedMess()}>{getMessageWithoutNgWords(message.text) + ' ' + message.video_time + 's'}</span> */}
            <span className={getClassDeletedMess()}>{getMessageWithoutNgWords(message.text)}</span>
          </Typography>
          <Box className={classes.mess_status}>
            {message.mess_status === STATUS_SEND_MESS.PENDING ? (
              <CircularProgress size={12} />
            ) : ''}
            {/* {message.mess_status === STATUS_SEND_MESS.ERROR ? (
              <Icon color="primary" className={`fa fa-exclamation-triangle ${classes.icon}`} fontSize="small" />
            ) : ''} */}
            {/* {(!message.mess_status || message.mess_status === STATUS_SEND_MESS.LOADED) ? ( */}
            {/* {(!message.mess_status || message.mess_status === STATUS_SEND_MESS.LOADED) ? (
              <Icon color="primary" className={`fa fa-check-circle ${classes.icon}`} fontSize="small" />
            ) : ''} */}
          </Box>
          {is_streamer && message.id ? (
            <ESMenu className={classes.menu_del_mess} iconClass={classes.iconClass}>
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
  icon: {},
  mess_status: {
    paddingLeft: 4,
    alignItems: "center", 
    // display: "flex", 
    marginBottom: "4px",
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
    padding: 4,
    '& .MuiIcon-fontSizeSmall': {
      fontSize: '0.82rem',
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
  },
  chatMessage: {
    fontSize: 14,
    marginBottom: 4,
    color: '#FFFFFF',
  },
  chatMessageUser: {
    color: '#FF4786',
  },
}))

export default ChatTextMessage
