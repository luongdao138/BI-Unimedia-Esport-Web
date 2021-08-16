import HeaderWithButton from '@components/HeaderWithButton'
import ESTab from '@components/Tab'
import ESTabs from '@components/Tabs'
import i18n from '@locales/i18n'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DistributorInformationContainer from './DistributorInformation'
import LiveStreamContainer from './LiveStream'
import StreamingReservationContainer from './StreamingReservation'

enum TABS {
  LIVE_STREAM = 0,
  STREAMING_RESERVATION = 1,
  DISTRIBUTOR = 2,
}

const StreamingSettingContainer: React.FC<{default_tab: any}> = ({default_tab}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [tab, setTab] = useState(default_tab)
  useEffect(() => {
    setTab(default_tab)
  }, [])
  const getTabs = () => {
    return (
      <Grid item xs={12}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs}>
          <ESTab label={t('streaming_setting_screen.live_stream')} value={0} />
          <ESTab label={t('streaming_setting_screen.streaming_reservation')} value={1} />
          <ESTab label={t('streaming_setting_screen.distributor_information')} value={2} />
        </ESTabs>
      </Grid>
    )
  }
  const getContent = () => {
    switch (tab) {
      case TABS.LIVE_STREAM:
        return <LiveStreamContainer />
      case TABS.STREAMING_RESERVATION:
        return <StreamingReservationContainer />
      case TABS.DISTRIBUTOR:
        return <DistributorInformationContainer />
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
      <HeaderWithButton title={t('streaming_setting_screen.title')} />
      <Grid container direction="column">
        {getTabs()}
        {getContent()}
      </Grid>
    </>
  )
}
export default StreamingSettingContainer

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
