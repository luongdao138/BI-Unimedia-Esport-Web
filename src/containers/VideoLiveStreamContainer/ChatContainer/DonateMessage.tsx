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
import useIsomorphicLayoutEffect from '@utils/hooks/useIsomorphicLayoutEffect'

type DonateMessageProps = {
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

const DonateMessage: React.FC<DonateMessageProps> = ({
  message,
  deleteMess,
  getMessageWithoutNgWords,
  is_streamer,
  resendMess,
  reDeleteMess,
  videoType,
  measure,
  contentRect,
}) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  useIsomorphicLayoutEffect(() => {
    measure?.()
  }, [message, contentRect?.width, contentRect?.height])

  const renderBgColor = (bgColorProperty: string, isHeader = false) => {
    const bgColor = purchasePoints[`p_${message.point}`][bgColorProperty]
    const deletedBgColor = '#7e7c80'
    const newBgColor = message.delete_flag ? (isHeader ? hexToRgba(deletedBgColor, 0.8) : deletedBgColor) : bgColor
    return { backgroundColor: newBgColor }
  }

  const getClassDeletedMess = (): string => {
    if (message.delete_flag) {
      return 'line_through_text'
    } else return ''
  }

  return (
    <Box className={classes.accountInfo}>
      <Box className={classes.accountInfoHeader} style={renderBgColor('headerBgColor', true)}>
        <ESAvatar src={message?.parent?.avatar} size={34} alt={message?.parent?.user_name} className={classes.userAvatar} />
        <Typography className={classes.accountName}>
          <span className={getClassDeletedMess()}>{message.owner}</span>
        </Typography>
        <Typography className={classes.accountRemain}>
          <span className={getClassDeletedMess()}>{FormatHelper.currencyFormat(message.point.toString())}</span>
        </Typography>
        <Typography className={classes.accountRemainUnit}>
          <span className={getClassDeletedMess()}>{t('common.eXe_points')}</span>
        </Typography>
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
      <Box className={classes.accountInfoContent} style={renderBgColor('backgroundColor')}>
        {message?.receiver && (
          <Box className={classes.receiverContainer} style={renderBgColor('receiverHeaderBgColor', true)}>
            <img className={classes.receiverSign} src="/images/receiverSign.svg" />
            <ESAvatar src={message?.receiver?.image} size={34} alt={message?.receiver?.name} className={classes.receiverAvatar} />
            <Typography className={classes.receiverName}>
              <span className={getClassDeletedMess()}>{message?.receiver?.name}</span>
            </Typography>
          </Box>
        )}

        <Typography className={classes.accountInfoContentText}>
          {/* <span className={getClassDeletedMess()}>{getMessageWithoutNgWords(message.text) + ' ' + message.video_time + 's'}</span> */}
          <span className={getClassDeletedMess()}>{getMessageWithoutNgWords(message.text)}</span>
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
        </Typography>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  receiverName: {
    color: '#000',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontWeight: 500,
  },
  receiverAvatar: {},
  receiverSign: {},
  receiverContainer: { display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', padding: '8px' },
  userAvatar: {
    marginRight: 8,
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
    // position: 'absolute',
    // right: 2,
    // top: 14,
    marinLeft: 8,
  },
  menu_del_mess: {
    top: '13px',
    right: '0px',
    position: 'absolute',
  },
  menu_item_disabled: {
    '&.MuiListItem-root.Mui-disabled': {
      opacity: 1,
    },
  },
  iconClass: {
    display: 'none',
    // display: 'inline-flex',
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
  accountInfo: {
    display: 'flex',
    marginRight: 8,
    marginBottom: 8,
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
    padding: '5px 16px',
    flexDirection: 'row',
    backgroundColor: 'rgba(71,106,255, 0.75)',
    alignItems: 'baseline',
    borderTopRightRadius: '4px',
    borderTopLeftRadius: '4px',
    height: '44px',
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
    color: '#fff',
    display: 'flex',
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
    fontWeight: 500,
  },
  accountRemain: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  accountRemainUnit: {
    fontSize: 12,
    fontWeight: 500,
    color: 'black',
    marginLeft: 15,
    // marginBottom: 3,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}))

export default React.memo(DonateMessage, (prevProps, nextProps) => {
  return _.isEqual(prevProps.message, nextProps.message)
})
