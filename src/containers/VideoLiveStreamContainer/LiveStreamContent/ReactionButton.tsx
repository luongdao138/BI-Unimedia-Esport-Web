import { Box, Icon, makeStyles, Typography } from '@material-ui/core'

import { FormatHelper } from '@utils/helpers/FormatHelper'
import React from 'react'

type ReactionButtonProps = {
  onPress?: () => void
  value?: number
  iconName?: string
  status?: number
  showPointer?: boolean
}

const ReactionButton: React.FC<ReactionButtonProps> = ({ onPress, value, iconName, status, showPointer }) => {
  const classes = useStyles({ showPointer: showPointer })
  const isReaction = status === 1
  const activeIcon = { color: isReaction ? 'white' : 'gray' }

  return (
    <Box onClick={onPress} className={classes.container}>
      <Icon className={`${iconName} ${classes.iconStyle}`} style={activeIcon} fontSize="small" />
      <Typography className={classes.textStyle}>{FormatHelper.japaneseWanFormatter(value)}</Typography>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  container: (props: { showPointer?: boolean }) => ({
    height: 30,
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 6,
    '&:hover': props?.showPointer && {
      cursor: 'pointer',
    },
  }),
  textStyle: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    height: '100%',
  },
  iconStyle: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 8,
  },
}))

export default ReactionButton
