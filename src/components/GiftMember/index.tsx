import ESAvatar from '@components/Avatar'
import { Box, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React from 'react'
import { GiftMasterType, GiftMasterUserType } from '@services/gift.service'
import { useTranslation } from 'react-i18next'
import { useRotateScreen } from '@utils/hooks/useRotateScreen'

export type IGiftMember = {
  data: GiftMasterType
  isStreamer?: boolean
  isCutTextOverflow?: boolean
}
interface StyleProps {
  isLandscape: boolean
}
const GiftMember: React.FC<IGiftMember> = ({ isCutTextOverflow = false, isStreamer = false, data: { image, type, name } }) => {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const { isLandscape } = useRotateScreen()
  const isMobile = useMediaQuery(theme.breakpoints.down(769))
  const classes = useStyles({ isLandscape })
  const userType = () => {
    return type === GiftMasterUserType.TEAM
      ? t('streaming_setting_screen.member_list.tag_team')
      : t('streaming_setting_screen.member_list.tag_individual')
  }
  return (
    <Box className={classes.wrapStreamerInfo}>
      <ESAvatar className={classes.wrapStreamerAvatar} src={image} size={isMobile && isLandscape ? 40 : 56} alt={name} />
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

const useStyles = makeStyles((theme) => ({
  wrapStreamerInfo: {
    display: 'flex',
    gap: 8,
    overflow: 'hidden',
    alignItems: 'center',
    flexGrow: 1,
  },
  [theme.breakpoints.down(769)]: {
    wrapStreamerAvatar: (props: StyleProps) => {
      if (props.isLandscape) {
        return {
          maxWidth: '40px',
          maxHeight: '40px',
        }
      }
    },
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
