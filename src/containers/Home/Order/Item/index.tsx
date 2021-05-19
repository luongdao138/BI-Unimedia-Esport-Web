import React, { forwardRef } from 'react'
import { Typography, Box, IconButton, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { HOME_SETTINGS } from '@constants/common.constants'

export type Props = {
  id: any
  ref?: any
  style?: any
}

export const Item: React.FC<Props> = forwardRef(({ id, ...props }, ref: any) => {
  const classes = useStyles()

  const getSettingName = (id: string) => {
    switch (id) {
      case HOME_SETTINGS.RECOMMENDED_USER.id:
        return HOME_SETTINGS.RECOMMENDED_USER.value
      case HOME_SETTINGS.RECOMMENDED_RECRUITMENT.id:
        return HOME_SETTINGS.RECOMMENDED_RECRUITMENT.value
      case HOME_SETTINGS.RECOMMENDED_EVENT.id:
        return HOME_SETTINGS.RECOMMENDED_EVENT.value
      case HOME_SETTINGS.RECRUITMENT_FOLLOW.id:
        return HOME_SETTINGS.RECRUITMENT_FOLLOW.value
      case HOME_SETTINGS.TOURNAMENT_FOLLOW.id:
        return HOME_SETTINGS.TOURNAMENT_FOLLOW.value
      case HOME_SETTINGS.TOURNAMENT_RESULT.id:
        return HOME_SETTINGS.TOURNAMENT_RESULT.value
      case HOME_SETTINGS.TOPIC_FOLLOW.id:
        return HOME_SETTINGS.TOPIC_FOLLOW.value
      default:
        return ''
    }
  }

  return (
    <div {...props} ref={ref}>
      <Box mb={3} className={classes.dragItemWrap}>
        <IconButton className={classes.iconButton}>
          <Icon className="fas fa-bars" fontSize="small" />
        </IconButton>
        <Typography variant="h3" className={classes.dragTitle}>
          {getSettingName(id)}
        </Typography>
      </Box>
    </div>
  )
})

const useStyles = makeStyles(() => ({
  dragItemWrap: {
    display: 'flex',
    height: 40,
    alignItems: 'center',
    '&:hover': {
      background: Colors.white_opacity[30],
      cursor: 'grab',
    },
  },
  iconButton: {
    color: Colors.white_opacity[30],
  },
  dragTitle: {
    color: Colors.white_opacity[30],
  },
}))
