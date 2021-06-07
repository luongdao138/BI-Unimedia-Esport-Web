import React, { forwardRef } from 'react'
import { Typography, Box, IconButton, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { HOME_SETTINGS } from '@constants/common.constants'
import { useTranslation } from 'react-i18next'

export type Props = {
  id: any
  ref?: any
  style?: any
}

export const Item: React.FC<Props> = forwardRef(({ id, ...props }, ref: any) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  const getSettingName = (id: string) => {
    switch (id) {
      case HOME_SETTINGS.RECOMMENDED_USER:
        return t('common:home.recommended_user')
      // case HOME_SETTINGS.RECOMMENDED_RECRUITMENT: //TODO skip 2.0
      //   return t('common:home.recommended_recruitment')
      // case HOME_SETTINGS.RECOMMENDED_EVENT: //TODO skip 2.0
      //   return t('common:home.recommended_event')
      // case HOME_SETTINGS.RECRUITMENT_FOLLOW: //TODO skip 2.0
      //   return t('common:home.recruitment_follow')
      case HOME_SETTINGS.TOURNAMENT_FOLLOW:
        return t('common:tournament.follower_entering')
      case HOME_SETTINGS.TOURNAMENT_RESULT:
        return t('common:tournament.follower_ended')
      // case HOME_SETTINGS.TOPIC_FOLLOW: //TODO skip 2.0
      //   return t('common:home.topic_follow')
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
    alignItems: 'baseline',
    '&:hover': {
      background: Colors.white_opacity[30],
      cursor: 'grab',
    },
  },
  iconButton: {
    color: Colors.white_opacity[30],
  },
  dragTitle: {
    color: Colors.white_opacity[70],
  },
}))
