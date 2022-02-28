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

const GiftMember: React.FC<IGiftMember> = ({
  isCutTextOverflow = false,
  isStreamer = false,
  data: { image, type: receiverType, name },
}) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  const userType = () => {
    return receiverType === GiftMasterUserType.TEAM
      ? t('streaming_setting_screen.member_list.tag_team')
      : t('streaming_setting_screen.member_list.tag_individual')
  }
  return (
    <Box className={classes.wrapStreamerInfo}>
      <ESAvatar src={image} size={56} alt={name} />
      <Box className={classes.wrapStreamerName} style={{ justifyContent: isStreamer ? 'center' : 'space-between' }}>
        {!isStreamer && <Box className={classes.receiverType}>{userType()}</Box>}
        <Typography className={`${isCutTextOverflow ? classes.streamerNameWrapText : ''} ${classes.streamerName}`}>{name}</Typography>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  wrapStreamerInfo: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  wrapStreamerName: {
    display: 'flex',
    flexDirection: 'column',
    padding: '6px 0 5px 0',
  },
  receiverType: {
    borderRadius: '3px',
    background: '#767676',
    color: '#fff',
    fontWeight: 500,
    fontSize: '10px',
    width: '51px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    lineHeight: '15px',
    marginBottom: 16,
  },
  streamerName: {
    fontSize: '12px',
    color: Colors.white_opacity[70],
    lineHeight: '16px',
  },
  streamerNameWrapText: {
    maxWidth: 100,
  },
}))

export default GiftMember
