import ESAvatar from '@components/Avatar'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React from 'react'
import { GiftMasterType, GiftMasterUserType } from '@services/gift.service'
import { useTranslation } from 'react-i18next'

export type IGiftMember = {
  data: GiftMasterType
  isStreamer?: boolean
  isCutTextOverflow?: boolean
}

const GiftMember: React.FC<IGiftMember> = ({ isCutTextOverflow = false, isStreamer = false, data: { image, type, name } }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  const userType = () => {
    return type === GiftMasterUserType.TEAM
      ? t('streaming_setting_screen.member_list.tag_team')
      : t('streaming_setting_screen.member_list.tag_individual')
  }
  return (
    <Box className={classes.wrapStreamerInfo}>
      <ESAvatar src={image} size={56} alt={name} />
      <Box className={classes.wrapStreamerName} style={{ justifyContent: isStreamer ? 'center' : 'space-between' }}>
        {!isStreamer && (
          <Typography component="p" className={classes.receiverType}>
            {userType()}
          </Typography>
        )}
        <Typography className={`${isCutTextOverflow ? classes.streamerNameWrapText : ''} ${classes.streamerName}`}>{name}</Typography>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  wrapStreamerInfo: {
    display: 'flex',
    gap: 8,
    overflow: 'hidden',
    alignItems: 'center',
    flexGrow: 1,
  },
  wrapStreamerName: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    minWidth: '0',
    paddingRight: '15px',
    justifyContent: 'space-between',
  },
  receiverType: {
    borderRadius: '3px',
    background: '#767676',
    color: '#fff',
    fontWeight: 500,
    fontSize: '10px',
    maxWidth: 51,
    textAlign: 'center',
    padding: '2px 10px',
  },
  streamerName: {
    fontSize: '12px',
    color: Colors.white_opacity[70],
    lineHeight: '16px',
  },
  streamerNameWrapText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

export default GiftMember
