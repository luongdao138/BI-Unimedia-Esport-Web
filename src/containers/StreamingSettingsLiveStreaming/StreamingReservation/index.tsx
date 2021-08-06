import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

const StreamingReservationContainer: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  return (
    <Box className={classes.forbiddenMessageContainer}>
      <Typography variant="h3">{t('streaming_settings_live_streaming_screen.streaming_reservation')}</Typography>
    </Box>
  )
}
export default StreamingReservationContainer

const useStyles = makeStyles(() => ({
  forbiddenMessageContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
}))
