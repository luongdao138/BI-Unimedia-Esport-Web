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
import IndividualGiftListContainer from '@containers/StreamingSettingContainer/IndividualGiftList'

enum TABS {
  LIVE_STREAM = 0,
  STREAMING_RESERVATION = 1,
  DISTRIBUTOR = 2,
  INDIVIDUAL_GIFT_LIST = 3,
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
  const [flagUpdateFieldDate, setFlagUpdateFieldDate] = useState(false)
  const [validateField, setValidateField] = useState<string>('')
  const [liveValidateField, setLiveValidateField] = useState<string>('')
  const [isUpdate, setIsUpdate] = useState(false)
  const [isLive, setIsLive] = useState(false)

  const formikLive = useFormik<FormLiveType>({
    initialValues: initialValues,
    validationSchema: validationLiveSettingsScheme(),
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => {
      //TODO: smt
    },
  })

  const formikSchedule = useFormik<FormLiveType>({
    initialValues: initialScheduleValues,
    validationSchema: validationScheduleScheme(!isUpdate || flagUpdateFieldDate, isLive, isUpdate),
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => {
      //TODO: smt
    },
  })
  const formikDistributor = useFormik<FormLiveType>({
    initialValues: initialDistributorsValues,
    validationSchema: validationLDistributorScheme(),
    enableReinitialize: true,
    validateOnBlur: false,
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
    if (scheduleInformation) {
      setIsUpdate(scheduleInformation?.data?.id ? true : false)
      setIsLive(scheduleInformation?.data?.live_stream_start_time ? true : false)
    }
  }, [scheduleInformation || channelInfo])

  const onUpdateFlagChangeFieldDate = (flag: boolean) => {
    setFlagUpdateFieldDate(flag)
  }

  const handleUpdateValidateField = (value: string) => {
    setValidateField(value)
  }

  const handleUpdateLiveValidateField = (value: string) => {
    setLiveValidateField(value)
  }

  const getTabs = () => {
    return (
      <Grid item xs={12} className={classes.tabsContainer}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs} scrollButtons="off" variant="scrollable">
          <ESTab label={t('streaming_setting_screen.live_stream')} value={0} disabled={disable} />
          <ESTab label={t('streaming_setting_screen.streaming_reservation')} value={1} disabled={disable} />
          <ESTab label={t('streaming_setting_screen.distributor_information')} value={2} />
          <ESTab label={t('streaming_setting_screen.individual_gift_list')} value={3} />
        </ESTabs>
      </Grid>
    )
  }
  const getContent = () => {
    switch (tab) {
      case TABS.LIVE_STREAM:
        return (
          <LiveStreamContainer
            formik={formikLive}
            validateField={liveValidateField}
            handleUpdateValidateField={handleUpdateLiveValidateField}
          />
        )
      case TABS.STREAMING_RESERVATION:
        return (
          <StreamingReservationContainer
            formik={formikSchedule}
            flagUpdateFieldDate={onUpdateFlagChangeFieldDate}
            handleUpdateValidateField={handleUpdateValidateField}
            validateFieldProps={validateField}
          />
        )
      case TABS.DISTRIBUTOR:
        return <DistributorInformationContainer formik={formikDistributor} />
      case TABS.INDIVIDUAL_GIFT_LIST:
        return <IndividualGiftListContainer />
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

const useStyles = makeStyles((theme) => ({
  tabsContainer: {
    display: 'flex',
    width: '100%',
    borderBottomColor: Colors.text[300],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
  tabs: {
    display: 'flex',
    width: '100%',
    overflow: 'hidden',
    paddingLeft: 24,
  },
  forbiddenMessageContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  [theme.breakpoints.down(419)]: {
    tabs: {
      display: 'flex',
      width: '100%',
      paddingRight: '24px',
    },
    singleTab: {
      width: 'calc((100vw - 48px) / 3)',
      minWidth: 'unset',
    },
  },
  [theme.breakpoints.down(321)]: {
    tabs: {
      display: 'flex',
      width: '100%',
      paddingLeft: 0,
      paddingRight: 0,
    },
    singleTab: {
      width: 'calc(100vw / 3)',
      minWidth: 'unset',
    },
  },
}))
