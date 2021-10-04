import HeaderWithButtonStream from '@components/HeaderWithButtonStream'
import ESTab from '@components/Tab'
import ESTabs from '@components/Tabs'
import { ESRoutes } from '@constants/route.constants'
import { FormLiveType } from '@containers/arena/UpsertForm/FormLiveSettingsModel/FormLiveSettingsType'
import {
  getInitialDistributorValues,
  getInitialLiveSettingValues,
  getInitialScheduleValues,
} from '@containers/arena/UpsertForm/FormLiveSettingsModel/InitialLiveSettingsValues'
import {
  validationLDistributorScheme,
  validationLiveSettingsScheme,
  validationScheduleScheme,
} from '@containers/arena/UpsertForm/FormLiveSettingsModel/ValidationLiveSettingsScheme'
import i18n from '@locales/i18n'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { LiveStreamSettingResponse, TYPE_SETTING } from '@services/liveStream.service'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DistributorInformationContainer from './DistributorInformation'
import LiveStreamContainer from './LiveStream'
import StreamingReservationContainer from './StreamingReservation'
import useLiveSetting from './useLiveSetting'
import { useFormik } from 'formik'

enum TABS {
  LIVE_STREAM = 0,
  STREAMING_RESERVATION = 1,
  DISTRIBUTOR = 2,
}

const StreamingSettingContainer: React.FC<{ default_tab: any }> = ({ default_tab }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const router = useRouter()
  const [tab, setTab] = useState(default_tab)
  const [disable, setDisable] = useState(false)
  //TODO: check call api
  const {
    liveSettingInformation,
    getLiveSettingTab,
    getScheduleSettingTab,
    scheduleInformation,
    getChannelLive,
    channelInfo,
    getCategory,
  } = useLiveSetting()
  const liveInfo = liveSettingInformation?.data
  const initialValues = getInitialLiveSettingValues(liveInfo ? liveInfo : null)
  const scheduleInfo = scheduleInformation?.data
  const initialScheduleValues = getInitialScheduleValues(scheduleInfo ? scheduleInfo : null)
  const initialDistributorsValues = getInitialDistributorValues(channelInfo?.data ? channelInfo?.data : null)
  const isFirstRunTab2 = useRef(true)
  const isFirstRunTab3 = useRef(true)

  const formikLive = useFormik<FormLiveType>({
    initialValues: initialValues,
    validationSchema: validationLiveSettingsScheme(),
    enableReinitialize: true,
    onSubmit: () => {
      //TODO: smt
    },
  })

  const formikSchedule = useFormik<FormLiveType>({
    initialValues: initialScheduleValues,
    validationSchema: validationScheduleScheme(),
    enableReinitialize: true,
    onSubmit: () => {
      //TODO: smt
    },
  })
  const formikDistributor = useFormik<FormLiveType>({
    initialValues: initialDistributorsValues,
    validationSchema: validationLDistributorScheme(),
    enableReinitialize: true,
    onSubmit: () => {
      //TODO: smt
    },
  })

  useEffect(() => {
    let data: LiveStreamSettingResponse = null
    getLiveSettingTab({ type: TYPE_SETTING.LIVE }).then((res) => {
      formikLive.validateForm()
      data = res?.payload
      if (!data?.data) {
        setTab(default_tab)
      } else if (data?.data?.channel_id === 0) {
        setTab(TABS.DISTRIBUTOR)
        setDisable(true)
      } else {
        setTab(default_tab)
        getCategory()
      }
      // setTab(data?.data?.channel_id === 0 || !data?.data?.channel_id ? 2 : default_tab)
      // setDisable(data?.data?.channel_id === 0 || !data?.data?.channel_id ? true : false)
      // data?.data?.channel_id !== 0 && getCategory()
    })
  }, [])

  useEffect(() => {
    if (tab === TABS.STREAMING_RESERVATION) {
      isFirstRunTab2.current && getScheduleSettingTab({ type: TYPE_SETTING.SCHEDULE })
      if (isFirstRunTab2.current) {
        isFirstRunTab2.current = false
        return
      }
    }
    if (tab === TABS.DISTRIBUTOR) {
      isFirstRunTab3.current && getChannelLive()

      if (isFirstRunTab3.current) {
        isFirstRunTab3.current = false
        return
      }
    }
    if (tab === TABS.LIVE_STREAM) {
      formikLive.validateForm()
    }
  }, [tab])

  useEffect(() => {
    formikSchedule.validateForm()
    formikDistributor.validateForm()
  }, [scheduleInformation || channelInfo])

  const getTabs = () => {
    return (
      <Grid item xs={12}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs}>
          <ESTab label={t('streaming_setting_screen.live_stream')} value={0} disabled={disable} />
          <ESTab label={t('streaming_setting_screen.streaming_reservation')} value={1} disabled={disable} />
          <ESTab label={t('streaming_setting_screen.distributor_information')} value={2} />
        </ESTabs>
      </Grid>
    )
  }
  const getContent = () => {
    switch (tab) {
      case TABS.LIVE_STREAM:
        return <LiveStreamContainer formik={formikLive} />
      case TABS.STREAMING_RESERVATION:
        return <StreamingReservationContainer formik={formikSchedule} />
      case TABS.DISTRIBUTOR:
        return <DistributorInformationContainer formik={formikDistributor} />
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
      <HeaderWithButtonStream
        title={t('streaming_setting_screen.title')}
        onClickBack={() => router.push(ESRoutes.VIDEO_STREAMING_MANAGEMENT)}
      />
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
