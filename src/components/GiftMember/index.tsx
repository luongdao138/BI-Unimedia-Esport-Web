import ESAvatar from '@components/Avatar'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React from 'react'

export type IGiftMember = {
  data: {
    src?: string
    receiverType?: string
    name?: string
  }
  isStreamer?: boolean
  isCutTextOverflow?: boolean
}

const GiftMember: React.FC<IGiftMember> = ({ isCutTextOverflow = true, isStreamer = false, data: { src, receiverType, name } }) => {
  const classes = useStyles()

  return (
    <Box className={classes.wrapStreamerInfo}>
      <ESAvatar src={src} size={56} alt={'item.parent.user_name'} />
      <Box className={classes.wrapStreamerName} style={{ justifyContent: isStreamer ? 'center' : 'space-between' }}>
        {!isStreamer && <Box className={classes.receiverType}>{receiverType}</Box>}
        <Typography className={`${isCutTextOverflow ? '' : ''} ${classes.streamerName}`}>{name}</Typography>
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
    maxWidth: 100,
  },
}))

export default GiftMember
