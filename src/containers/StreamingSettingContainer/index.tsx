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
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DistributorInformationContainer from './DistributorInformation'
import LiveStreamContainer from './LiveStream'
import StreamingReservationContainer from './StreamingReservation'
import useLiveSetting from './useLiveSetting'
import { useFormik } from 'formik'
// import IndividualGiftListContainer from '@containers/StreamingSettingContainer/IndividualGiftList'
import MemberList from './GiftMemberListContainer/MemberList'
import ESModal from '@components/Modal'
import ListGroupGift from './ListGroupGift'
import GiftManageTab, { TabState } from '@containers/StreamingSettingContainer/GiftManageTab'
import { GiftGroupType } from '@services/gift.service'
// import ESButton from '@components/Button'
// import useListGroupGift from './ListGroupGift/useListGroupGift'

enum TABS {
  LIVE_STREAM = 0,
  STREAMING_RESERVATION = 1,
  DISTRIBUTOR = 2,
  // INDIVIDUAL_GIFT_LIST = 3,
  GIFT_MEMBERS_LIST = 3,
}

const StreamingSettingContainer: React.FC<{ default_tab: any }> = ({ default_tab }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const router = useRouter()
  const [tab, setTab] = useState(default_tab)
  const [disable, setDisable] = useState(false)
  const [giftManageTabState, setGiftManageTabState] = useState(TabState.LIST)
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
  const [openDialog, setOpenDialog] = useState(false)

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
    if (tab !== TABS.GIFT_MEMBERS_LIST) {
      setGiftManageTabState(TabState.LIST)
    }
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
          <ESTab label={t('streaming_setting_screen.live_stream')} value={0} disabled={disable} className={classes.singleTab} />
          <ESTab label={t('streaming_setting_screen.streaming_reservation')} value={1} disabled={disable} className={classes.singleTab} />
          <ESTab label={t('streaming_setting_screen.distributor_information')} value={2} className={classes.singleTab} />
          <ESTab label={t('streaming_setting_screen.gift_members_list_title')} value={3} className={classes.singleTab} />
        </ESTabs>
      </Grid>
    )
  }

  const giftManageChangeTab = (tab: TabState) => {
    setGiftManageTabState(tab)
    setTab(3)
  }
  const giftManageChangeTabSubmitSuccess = () => {
    setTab(TABS.LIVE_STREAM)
    setOpenDialog(true)
  }

  const getContent = () => {
    switch (tab) {
      case TABS.LIVE_STREAM:
        return (
          <LiveStreamContainer
            formik={formikLive}
            validateField={liveValidateField}
            handleUpdateValidateField={handleUpdateLiveValidateField}
            openPopupGroupList={handleClickSelectGift}
          />
        )
      case TABS.STREAMING_RESERVATION:
        return (
          <StreamingReservationContainer
            formik={formikSchedule}
            flagUpdateFieldDate={onUpdateFlagChangeFieldDate}
            handleUpdateValidateField={handleUpdateValidateField}
            validateFieldProps={validateField}
            openPopupGroupList={handleClickSelectGift}
          />
        )
      case TABS.DISTRIBUTOR:
        return <DistributorInformationContainer formik={formikDistributor} />
      case TABS.GIFT_MEMBERS_LIST:
        return (
          <GiftManageTab
            tabState={giftManageTabState}
            onChangeTab={giftManageChangeTab}
            onChangeTabSubmitSuccess={giftManageChangeTabSubmitSuccess}
          />
        )
      default:
        break
    }
    return (
      <Box className={classes.forbiddenMessageContainer}>
        <Typography variant="h3">{i18n.t('common:common:private')}</Typography>
      </Box>
    )
  }

  const getListGroupGift = () => {
    return (
      <ESModal open={openDialog}>
        <ListGroupGift onChangeTab={giftManageChangeTab} handleSelectGroup={handleSelectGroup} handleClose={handleClickSelectGift} />
      </ESModal>
    )
  }

  const handleSelectGroup = (value: GiftGroupType) => {
    switch (tab) {
      case TABS.LIVE_STREAM:
        formikLive?.setFieldValue('stepSettingOne.group_title', value.title)
        formikLive?.setFieldValue('stepSettingOne.gift_group_id', value.id)
        break

      case TABS.STREAMING_RESERVATION:
        formikSchedule?.setFieldValue('stepSettingTwo.group_title', value.title)
        formikSchedule?.setFieldValue('stepSettingTwo.gift_group_id', value.id)
        break

      default:
        break
    }
  }

  const handleClickSelectGift = useCallback((open) => {
    setOpenDialog(open)
  }, [])

  return (
    <>
      <Box className="header_streaming_setting">
        <HeaderWithButtonStream
          title={t('streaming_setting_screen.title')}
          onClickBack={() => router.push(ESRoutes.VIDEO_STREAMING_MANAGEMENT)}
        />
      </Box>

      <Grid container direction="row">
        <Grid item xs={12} md={tab === TABS.GIFT_MEMBERS_LIST ? 8 : 12}>
          <Grid container direction="column">
            {getTabs()}
            <Box className={tab === TABS.GIFT_MEMBERS_LIST ? classes.wrapMemberListContent : classes.wrapTabContent}>
              {getListGroupGift()}
              {getContent()}
            </Box>
          </Grid>
        </Grid>

        {tab === TABS.GIFT_MEMBERS_LIST && giftManageTabState === TabState.CREATE_NEW && (
          <Grid item xs={12} md={4}>
            <MemberList />
          </Grid>
        )}
      </Grid>
    </>
  )
}
export default StreamingSettingContainer

const useStyles = makeStyles((theme) => ({
  wrapMemberListContent: {},
  wrapTabContent: {
    maxWidth: '622px',
    marginLeft: '120px',
  },
  tabsContainer: {
    display: 'flex',
    width: '100%',
    borderBottomColor: Colors.text[300],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    maxWidth: '622px',
    marginLeft: '48px',
  },
  tabs: {
    display: 'flex',
    width: '100%',
    overflow: 'hidden',
    paddingLeft: 24,
    '& .MuiTab-root': {
      minWidth: 'unset',
    },
  },
  forbiddenMessageContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  [theme.breakpoints.down(1201)]: {
    wrapTabContent: {
      marginLeft: 48,
    },
  },
  [theme.breakpoints.down(769)]: {
    tabsContainer: {
      marginLeft: 0,
    },
    wrapTabContent: {
      marginLeft: 0,
    },
  },
  [theme.breakpoints.down(419)]: {
    tabs: {
      display: 'flex',
      width: '100%',
      paddingRight: '24px',
    },
    singleTab: {
      // width: 'calc((100vw - 48px) / 3)',
      // minWidth: 'unset',
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
