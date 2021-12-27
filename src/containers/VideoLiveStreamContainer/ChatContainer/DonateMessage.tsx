import { Box, makeStyles, Typography, CircularProgress, Icon } from '@material-ui/core'
import React, { ReactNode } from 'react'
import { purchasePoints } from './index'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { useTranslation } from 'react-i18next'
import { hexToRgba } from '@utils/helpers/CommonHelper'
import ESMenuItem from '@components/Menu/MenuItem'
import ESMenu from '@components/Menu'
import _ from 'lodash'
import { STATUS_SEND_MESS } from '@constants/common.constants'
import { STATUS_VIDEO } from '@services/videoTop.services'
import ESAvatar from '@components/Avatar'

type DonateMessageProps = {
  message?: any
  is_streamer?: number
  videoType?: number
  deleteMess: (message: any) => void
  resendMess: (message: any) => void
  reDeleteMess: (message: any) => void
  getMessageWithoutNgWords: (chatMessContent: string) => ReactNode
}

const DonateMessage: React.FC<DonateMessageProps> = ({
  message,
  deleteMess,
  getMessageWithoutNgWords,
  is_streamer,
  resendMess,
  reDeleteMess,
  videoType,
}) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  const bgColor = message.delete_flag ? '#7e7c80' : message.point ? purchasePoints[`p_${message.point}`].backgroundColor : '#7e7c80'

  const getClassDeletedMess = (): string => {
    if (message.delete_flag) {
      return 'line_through_text'
    } else return ''
  }

  return (
    <Box className={classes.accountInfo}>
      <Box className={classes.accountInfoHeader} style={{ backgroundColor: hexToRgba(bgColor, 0.8) }}>
        <ESAvatar src={message?.parent?.avatar} size={32} alt={message.parent.user_name} className={classes.userAvatar} />
        <Typography className={classes.accountName}>
          <span className={getClassDeletedMess()}>{message.owner}</span>
        </Typography>
        <Typography className={classes.accountRemain}>
          <span className={getClassDeletedMess()}>{FormatHelper.currencyFormat(message.point.toString())}</span>
        </Typography>
        <Typography className={classes.accountRemainUnit}>
          <span className={getClassDeletedMess()}>{t('common.eXe_points')}</span>
        </Typography>
        <Box className={classes.mess_status}>
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
          {/* {(!message.mess_status || message.mess_status === STATUS_SEND_MESS.LOADED) ? ( */}
          {/* {(!message.mess_status || message.mess_status === STATUS_SEND_MESS.LOADED) ? (
            <Icon color="primary" className={`fa fa-check-circle ${classes.icon}`} fontSize="small" />
          ) : ''} */}
        </Box>
        {videoType === STATUS_VIDEO.LIVE_STREAM && is_streamer && message.id ? (
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
      <Box className={classes.accountInfoContent} style={{ backgroundColor: bgColor }}>
        <Typography className={classes.accountInfoContentText}>
          {/* <span className={getClassDeletedMess()}>{getMessageWithoutNgWords(message.text) + ' ' + message.video_time + 's'}</span> */}
          <span className={getClassDeletedMess()}>{getMessageWithoutNgWords(message.text)}</span>
        </Typography>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  userAvatar: {
    marginRight: 5,
    alignSelf: 'center',
  },
  icon: {},
  resendIcon: {
    cursor: 'pointer',
  },
  mess_status: {
    // paddingLeft: 4,
    // alignItems: "center",
    // display: "flex",
    // marginBottom: "4px",
    display: 'none',
    position: 'absolute',
    right: '16px',
    top: '16px',
  },
  menu_del_mess: {
    position: 'absolute',
    right: '5px',
    top: '13px',
  },
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
  accountInfo: {
    display: 'flex',
    marginRight: '16px',
    marginBottom: '13px',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 4,
    '&:hover $iconClass': {
      display: 'inline-flex',
    },
    '&:hover $mess_status': {
      display: 'inline-flex',
    },
  },
  accountInfoHeader: {
    position: 'relative',
    display: 'flex',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 14,
    paddingRight: 32,
    flexDirection: 'row',
    backgroundColor: 'rgba(71,106,255, 0.75)',
    alignItems: 'baseline',
  },
  accountInfoContent: {
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#476AFF',
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    wordBreak: 'break-all',
  },
  accountInfoContentText: {
    fontSize: 14,
    color: '#000',
  },
  accountName: {
    fontSize: 14,
    color: 'black',
    flex: 1,
    // marginBottom: 3,
    marginRight: 20,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  accountRemain: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  accountRemainUnit: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 17,
    // marginBottom: 3,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}))

export default React.memo(DonateMessage, (prevProps, nextProps) => {
  return _.isEqual(prevProps.message, nextProps.message)
})
