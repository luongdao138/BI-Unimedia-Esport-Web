import HeaderWithButton from '@components/HeaderWithButton'
import ESTab from '@components/Tab'
import ESTabs from '@components/Tabs'
import i18n from '@locales/i18n'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

enum TABS {
  LIVE_STREAM = 0,
  STREAMING_RESERVATION = 1,
  DISTRIBUTOR = 2,
}

const StreamingManage: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  useEffect(() => {
    setTab(0)
  }, [])
  const getTabs = () => {
    return (
      <Grid item xs={12}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs}>
          <ESTab label={t('streaming_settings_live_streaming_screen.live_stream')} value={0} />
          <ESTab label={t('streaming_settings_live_streaming_screen.streaming_reservation')} value={1} />
          <ESTab label={t('streaming_settings_live_streaming_screen.distributor_information')} value={2} />
        </ESTabs>
      </Grid>
    )
  }
  const getContent = () => {
    switch (tab) {
      case TABS.LIVE_STREAM:
        return (
          <Box className={classes.forbiddenMessageContainer}>
            <Typography variant="h3">{t('streaming_settings_live_streaming_screen.live_stream')}</Typography>
          </Box>
        )
        break
      case TABS.STREAMING_RESERVATION:
        return (
          <Box className={classes.forbiddenMessageContainer}>
            <Typography variant="h3">{t('streaming_settings_live_streaming_screen.streaming_reservation')}</Typography>
          </Box>
        )
        break
      case TABS.DISTRIBUTOR:
        return (
          <Box className={classes.forbiddenMessageContainer}>
            <Typography variant="h3">{t('streaming_settings_live_streaming_screen.distributor_information')}</Typography>
          </Box>
        )
        break
      default:
        break
    }
    return (
      <Box className={classes.forbiddenMessageContainer}>
        <Typography variant="h3">{i18n.t('common:common:private')}</Typography>
      </Box>
    )
  }
  return (
    <>
      <HeaderWithButton title={t('streaming_settings_live_streaming_screen.title')} />
      <Grid container direction="column">
        {getTabs()}
        {getContent()}
      </Grid>
    </>
  )
}
export default StreamingManage

const useStyles = makeStyles(() => ({
  tabs: {
    overflow: 'hidden',
    borderBottomColor: Colors.text[300],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    paddingLeft: 24,
  },
  forbiddenMessageContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
}))
