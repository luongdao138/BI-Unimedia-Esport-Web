import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { ReactNode } from 'react'
import { purchasePoints } from './index'
import * as APIt from 'src/types/graphqlAPI'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { useTranslation } from 'react-i18next'
import { hexToRgba } from '@utils/helpers/CommonHelper'
import ESMenuItem from '@components/Menu/MenuItem'
import ESMenu from '@components/Menu'
import _ from 'lodash'

type DonateMessageProps = {
  message?: APIt.Message
  is_streamer?: number
  deleteMess?: (idDelete: string) => void
  getMessageWithoutNgWords: (chatMessContent: string) => ReactNode
}

const DonateMessage: React.FC<DonateMessageProps> = ({ message, deleteMess, getMessageWithoutNgWords, is_streamer }) => {
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
        <Typography className={classes.accountName}>
          <span className={getClassDeletedMess()}>{message.owner}</span>
        </Typography>
        <Typography className={classes.accountRemain}>
          <span className={getClassDeletedMess()}>{FormatHelper.currencyFormat(message.point.toString())}</span>
        </Typography>
        <Typography className={classes.accountRemainUnit}>
          <span className={getClassDeletedMess()}>{t('common.eXe_points')}</span>
        </Typography>
        {is_streamer ? (
          <ESMenu className={classes.menu_del_mess} iconClass={classes.iconClass}>
            {message.delete_flag ? (
              <ESMenuItem disabled className={classes.menu_item_disabled}>
                {t('live_stream_screen.deleted_message')}
              </ESMenuItem>
            ) : (
              <ESMenuItem onClick={() => deleteMess(message.id)}>{t('live_stream_screen.delete_message')}</ESMenuItem>
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
    marginRight: '13px',
    marginBottom: '13px',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 4,
    '&:hover $iconClass': {
      display: 'inline-flex',
    },
  },
  accountInfoHeader: {
    position: 'relative',
    display: 'flex',
    paddingTop: 7,
    paddingBottom: 11,
    paddingLeft: 16,
    paddingRight: 32,
    flexDirection: 'row',
    backgroundColor: 'rgba(71,106,255, 0.75)',
    alignItems: 'flex-end',
  },
  accountInfoContent: {
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 14,
    paddingBottom: 38,
    backgroundColor: '#476AFF',
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
  },
  accountInfoContentText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  accountName: {
    fontSize: 14,
    color: 'black',
    flex: 1,
    marginBottom: 3,
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
    marginBottom: 3,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}))

export default React.memo(DonateMessage, (prevProps, nextProps) => {
  return _.isEqual(prevProps.message, nextProps.message)
})
