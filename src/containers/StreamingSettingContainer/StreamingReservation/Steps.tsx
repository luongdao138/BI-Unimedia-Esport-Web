import { Box, Grid, Icon, IconButton, InputAdornment, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { FormikProps } from 'formik'
import ESInput from '@components/Input'
import i18n from '@locales/i18n'
import ESSelect from '@components/Select'
import { useAppDispatch } from '@store/hooks'
import { useTranslation } from 'react-i18next'
import * as commonActions from '@store/common/actions'
import ESFastInput from '@components/FastInput'
import CoverUploaderStream from '@containers/arena/UpsertForm/Partials/CoverUploaderStream'
import ESCheckboxBig from '@components/CheckboxBig'
import ButtonPrimary from '@components/ButtonPrimary'
import ESInputDatePicker from '@components/InputDatePicker'
import ESLabel from '@components/Label'
import ESButton from '@components/Button'
import { Colors } from '@theme/colors'
import { FormLiveType } from '@containers/arena/UpsertForm/FormLiveSettingsModel/FormLiveSettingsType'
import { LiveStreamSettingHelper } from '@utils/helpers/LiveStreamSettingHelper'
import useLiveSetting from '../useLiveSetting'
import {
  baseViewingURL,
  GetCategoryResponse,
  SetLiveStreamParams,
  StreamUrlAndKeyParams,
  TAG_STATUS_RECORD,
  TYPE_SECRET_KEY,
} from '@services/liveStream.service'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { FIELD_TITLES } from '../field_titles.constants'
import { EVENT_LIVE_STATUS, EVENT_STATE_CHANNEL, FORMAT_DATE_TIME_JP, NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import { showDialog } from '@store/common/actions'
import useReturnHref from '@utils/hooks/useReturnHref'
import moment from 'moment'
import useGetProfile from '@utils/hooks/useGetProfile'
import ESLoader from '@components/FullScreenLoaderNote'
import useUploadImage from '@utils/hooks/useUploadImage'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import ESNumberInputStream from '@components/NumberInput/stream'
import Linkify from 'react-linkify'
import SmallLoader from '@components/Loader/SmallLoader'
import { STATUS_VIDEO } from '@services/videoTop.services'
import CharacterLimited from '@components/CharacterLimited'

interface StepsProps {
  step: number
  onNext: (step: number, isShare?: boolean, post?: { title: string; content: string }, channel_progress?: string) => void
  category: GetCategoryResponse
  formik?: FormikProps<FormLiveType>
  isShare?: boolean
  titlePost?: string
  contentPost?: string
  flagUpdateFieldDate?: (flag: boolean) => void
  handleUpdateValidateField?: (value: string) => void
  validateFieldProps?: string
  stateChannelArn?: string
  visibleLoading?: boolean
  disableLoader?: boolean
  obsStatusDynamo?: string | number
  videoStatusDynamo?: string | number
  processStatusDynamo?: string
}

const KEY_TYPE = {
  URL: 1,
  KEY: 2,
  UUID: 3,
}

const Steps: React.FC<StepsProps> = ({
  step,
  onNext,
  category,
  formik,
  isShare,
  titlePost,
  contentPost,
  flagUpdateFieldDate,
  validateFieldProps,
  handleUpdateValidateField,
  stateChannelArn,
  visibleLoading,
  disableLoader,
  obsStatusDynamo,
  videoStatusDynamo,
  processStatusDynamo,
}) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])

  const current = moment().set('second', 0).unix()
  const notifyTime =
    formik?.values?.stepSettingTwo?.stream_notify_time && moment(formik?.values?.stepSettingTwo?.stream_notify_time).set('second', 0).unix()

  const [showStreamURL, setShowStreamURL] = useState(false)
  const [showStreamKey, setShowStreamKey] = useState(false)

  const { getStreamUrlAndKey, isPending, setLiveStreamConfirm, scheduleInformation, isPendingSetting } = useLiveSetting()
  const { checkNgWordFields, checkNgWordByField } = useCheckNgWord()
  const { checkDisplayErrorOnChange, checkDisplayErrorOnSubmit, getDisplayErrorField } = LiveStreamSettingHelper
  const { userProfile } = useGetProfile()
  const paid_delivery_flag = userProfile?.attributes?.paid_delivery_flag
  const [categoryName, setCategoryName] = useState('')
  const [isLive, setIsLive] = useState<boolean>(false)
  const [status, setStatus] = useState<number>(null)
  const [counter, setCounter] = useState<number>(0)
  const [disable, setDisable] = useState<boolean>(false)
  const [validateField, setValidateField] = useState('')
  // const [statusRecordSetting, setStatusRecordSetting] = useState()
  const [onChangeFlag, setOnChangeFlag] = useState(false) //false-edit # date, true - edit date,
  const [isLoading, setLoading] = useState(false)
  const [dataRenew, setDataRenew] = useState(null)
  const [flagArn, setFlagArn] = useState(false)
  const handleEnableLink = () => {
    if (
      status === 1 ||
      (notifyTime && notifyTime <= current) ||
      obsStatusDynamo == TAG_STATUS_RECORD.LIVE_STREAMING
      // && stateChannelArn !== EVENT_STATE_CHANNEL.STOPPED
    ) {
      if (obsStatusDynamo == TAG_STATUS_RECORD.UPDATED_NOT_START && videoStatusDynamo == STATUS_VIDEO.OVER_LOAD) return false
      return true
    }

    return false
  }

  const classes = useStyles({ statusRecord: obsStatusDynamo, isEnable: handleEnableLink(), channelArn: stateChannelArn, videoStatusDynamo })

  const formRef = {
    title: useRef(null),
    description: useRef(null),
    stream_notify_time: useRef(null),
    stream_schedule_start_time: useRef(null),
    stream_schedule_end_time: useRef(null),
    video_publish_end_time: useRef(null),
    sell_ticket_start_time: useRef(null),
  }

  useEffect(() => {
    // getLiveSetting()
    // checkStatusRecord(scheduleInformation)
    checkStatus(scheduleInformation?.data)
  }, [scheduleInformation])

  // const getLiveSetting = () => {
  //   getScheduleSettingTab({ type: TYPE_SETTING.SCHEDULE }).then((res) => {
  //     checkStatusRecord(res.payload)
  //     formik.validateForm()
  //   })
  // }

  const checkStatus = (data) => {
    //check live stream isn't it? 1 - live
    const status = data?.status === 1 ? true : false
    setIsLive(status)
    setDisable(data?.status === 0 || !data?.status ? false : true)
    setStatus(data?.status)
  }

  useEffect(() => {
    setValidateField(validateFieldProps)
    formik.validateForm().then(() => {
      setCounter(counter + 1)
    })
  }, [formik?.errors?.stepSettingTwo])

  useEffect(() => {
    category?.data.forEach((h) => {
      if (Number(h.id) === Number(formik?.values?.stepSettingTwo?.category)) {
        setCategoryName(h.name)
      }
    })
  }, [formik?.values?.stepSettingTwo?.category, category?.data])

  const { uploadLiveStreamThumbnailImage, isUploading } = useUploadImage()
  const handleUpload = useCallback((file: File, blob: any) => {
    uploadLiveStreamThumbnailImage(file, blob, (imageUrl) => {
      formik.setFieldValue('stepSettingTwo.thumbnail', imageUrl)
    })
  }, [])
  const handleCopy = (type: number) => {
    switch (type) {
      case KEY_TYPE.UUID:
        if (window.navigator.clipboard) {
          window.navigator.clipboard.writeText(
            formik?.values?.stepSettingTwo?.uuid && `${baseViewingURL}${formik?.values?.stepSettingTwo?.uuid}`
          )
        }
        dispatch(commonActions.addToast(t('common:streaming_setting_screen.message_copy')))
        break
      case KEY_TYPE.URL:
        if (window.navigator.clipboard) {
          window.navigator.clipboard.writeText(formik?.values?.stepSettingTwo?.stream_url.toString())
        }
        dispatch(commonActions.addToast(t('common:streaming_setting_screen.message_copy')))
        break
      case KEY_TYPE.KEY:
        if (window.navigator.clipboard) {
          window.navigator.clipboard.writeText(formik?.values?.stepSettingTwo?.stream_key.toString())
        }
        dispatch(commonActions.addToast(t('common:streaming_setting_screen.message_copy')))
        break
      default:
        break
    }
  }

  const onValidateForm = () => {
    // if (onChangeFlag && !statusRecordSetting) {
    setValidateField('all')
    handleUpdateValidateField('all')
    setTimeout(() => {
      formik.validateForm().then((err) => {
        if (_.isEmpty(err.stepSettingTwo)) {
          onClickNext()
        } else {
          const errorField = getDisplayErrorField(err)
          handleUpdateValidateField(errorField)
          if (formRef[errorField]) {
            window.scrollTo({ behavior: 'smooth', top: formRef[errorField].current.offsetTop - 200 })
          }
        }
      })
    }, 300)
  }

  const onClickNext = () => {
    const { stepSettingTwo } = formik.values

    const fieldIdentifier = checkNgWordFields({
      title: stepSettingTwo.title,
      description: stepSettingTwo.description,
      ticket_price: stepSettingTwo.ticket_price,
    })
    const ngFields = checkNgWordByField({
      [FIELD_TITLES.stepSettingTwo.title]: stepSettingTwo.title,
      [FIELD_TITLES.stepSettingTwo.description]: stepSettingTwo.description,
      [FIELD_TITLES.stepSettingTwo.ticket_price]: stepSettingTwo.ticket_price,
    })
    if (fieldIdentifier) {
      dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: ngFields.join(', ') }))
    } else {
      // setShowStreamKey(false)
      // setShowStreamURL(false)
      onNext(step + 1, stepSettingTwo.share_sns_flag, {
        title: stepSettingTwo.title,
        content: `${baseViewingURL}${stepSettingTwo.uuid}`,
      })
      formik.setFieldValue('stepSettingTwo.step_setting', step + 1)
    }
  }
  const onClickPrev = () => {
    onNext(step - 1, formik.values.stepSettingTwo.share_sns_flag, {
      title: formik.values.stepSettingTwo.title,
      content: `${baseViewingURL}${formik.values.stepSettingTwo.uuid}`,
    })
    formik.setFieldValue('stepSettingTwo.step_setting', step - 1)
  }

  const isFirstStep = () => {
    return step === 1 ? true : false
  }

  const getAddClassByStep = (addClass: string, otherClass?: string) => {
    if (step === 2) {
      return ' ' + addClass
    } else {
      return otherClass ? ' ' + otherClass : ' ' + addClass
    }
  }

  const { hasUCRReturnHref } = useReturnHref()
  const handleCoverDailogStateChange = (_open: boolean) => {
    if (hasUCRReturnHref) {
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.height = '100%'
    }
  }

  const currentDate = () => {
    const current = new Date()
    current.setSeconds(0)
    return current
  }

  const checkUseTicket = () => {
    formik.setFieldValue('stepSettingTwo.use_ticket', !formik?.values?.stepSettingTwo?.use_ticket)
    formik.setFieldValue(
      'stepSettingTwo.sell_ticket_start_time',
      !formik?.values?.stepSettingTwo?.use_ticket ? currentDate().toString() : null
    )
  }

  const debouncedHandleRenewURLAndKey = useCallback(
    _.debounce((params: StreamUrlAndKeyParams) => {
      getStreamUrlAndKey(params, (url, key, arn, data) => {
        setDataRenew(data)
        setLoading(true)
        if (data) {
          formik.setFieldValue('stepSettingTwo.stream_url', url)
          formik.setFieldValue('stepSettingTwo.stream_key', key)
          formik.setFieldValue('stepSettingTwo.arn', arn)
          // showToast && dispatch(commonActions.addToast(t('common:streaming_setting_screen.renew_success_toast')))
        }
      })
    }, 700),
    []
  )
  const onReNewUrlAndKey = (type: string, method: string) => {
    const params: StreamUrlAndKeyParams = {
      type: method,
      objected: type,
      is_live: TYPE_SECRET_KEY.SCHEDULE,
    }
    debouncedHandleRenewURLAndKey(params)
  }

  useEffect(() => {
    if (stateChannelArn === EVENT_STATE_CHANNEL.RUNNING) {
      setFlagArn(true)
    }
    if (!isLoading) return
    if (status || status === 0) {
      if (flagArn) {
        if (dataRenew) {
          setLoading(stateChannelArn !== EVENT_STATE_CHANNEL.STOPPED && stateChannelArn !== EVENT_STATE_CHANNEL.UPDATED)
          stateChannelArn === EVENT_STATE_CHANNEL.STOPPED &&
            dispatch(commonActions.addToast(t('common:streaming_setting_screen.renew_success_toast')))
        } else {
          setLoading(true)
        }
      } else {
        setLoading(!dataRenew)
        stateChannelArn === EVENT_STATE_CHANNEL.STOPPED &&
          dispatch(commonActions.addToast(t('common:streaming_setting_screen.renew_success_toast')))
      }
    } else {
      setLoading(!dataRenew)
      stateChannelArn === EVENT_STATE_CHANNEL.STOPPED &&
        dispatch(commonActions.addToast(t('common:streaming_setting_screen.renew_success_toast')))
    }
  }, [stateChannelArn, isLoading])

  const onConfirm = () => {
    const { stepSettingTwo } = formik.values
    const data: SetLiveStreamParams = {
      ticket_price: stepSettingTwo.ticket_price + '',
      use_ticket: stepSettingTwo.use_ticket === false ? '0' : '1',
      share_sns_flag: stepSettingTwo.share_sns_flag === false ? '0' : '1',
      publish_flag: stepSettingTwo.publish_flag === false ? '0' : '1',
      scheduled_flag: 1,
      uuid: stepSettingTwo.uuid,
      thumbnail: stepSettingTwo.thumbnail,
      title: stepSettingTwo.title.trim(),
      description: stepSettingTwo.description.trim(),
      category: stepSettingTwo.category,
      stream_notify_time: CommonHelper.formatDateTimeJP(stepSettingTwo.stream_notify_time),
      stream_schedule_start_time: CommonHelper.formatDateTimeJP(stepSettingTwo.stream_schedule_start_time),
      stream_schedule_end_time: CommonHelper.formatDateTimeJP(stepSettingTwo.stream_schedule_end_time),
      sell_ticket_start_time:
        stepSettingTwo.sell_ticket_start_time !== null ? CommonHelper.formatDateTimeJP(stepSettingTwo.sell_ticket_start_time) : null,
      stream_url: stepSettingTwo.stream_url,
      stream_key: stepSettingTwo.stream_key,
      video_publish_end_time:
        stepSettingTwo.video_publish_end_time !== null ? CommonHelper.formatDateTimeJP(stepSettingTwo.video_publish_end_time) : null,
    }
    debouncedHandleConfirmForm(data, stepSettingTwo, step)
  }

  const debouncedHandleConfirmForm = useCallback(
    _.debounce((data: SetLiveStreamParams, stepSettingTwo, step: number) => {
      setLiveStreamConfirm(data, (process) => {
        // console.log('process===', process);
        onNext(
          step + 1,
          stepSettingTwo.share_sns_flag,
          {
            title: stepSettingTwo.title,
            content: `${baseViewingURL}${stepSettingTwo.uuid}`,
          },
          process
        )
        formik.setFieldValue('stepSettingTwo.step_setting', step + 1)
        const { left, top } = getBoxPositionOnWindowCenter(550, 400)
        if (isShare) {
          window
            .open(
              getTwitterShareUrl(),
              '',
              `width=550,height=400,location=no,toolbar=no,status=no,directories=no,menubar=no,scrollbars=yes,resizable=no,centerscreen=yes,chrome=yes,left=${left},top=${top}`
            )
            ?.focus()
        }
      })
    }, 700),
    []
  )

  const getBoxPositionOnWindowCenter = function (width, height) {
    return {
      left: window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2,
      top: window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2,
    }
  }

  const getTwitterShareUrl = () => {
    return `https://twitter.com/intent/tweet?text=${titlePost}%0a${contentPost}`
  }

  const handleNavigateToDetailLink = () => {
    if (
      status === 1 ||
      (notifyTime && notifyTime <= current) ||
      obsStatusDynamo == TAG_STATUS_RECORD.LIVE_STREAMING
      //  && stateChannelArn !== EVENT_STATE_CHANNEL.STOPPED
    ) {
      if (
        !(obsStatusDynamo == TAG_STATUS_RECORD.UPDATED_NOT_START && videoStatusDynamo == STATUS_VIDEO.OVER_LOAD) ||
        !(processStatusDynamo === EVENT_LIVE_STATUS.STREAM_END && videoStatusDynamo == STATUS_VIDEO.ARCHIVE)
      ) {
        window.open(`${baseViewingURL}${formik?.values?.stepSettingTwo?.uuid}`, '_blank')
      }
    }
  }

  return (
    <Box py={4} className={classes.container}>
      <Box className={classes.formContainer}>
        {obsStatusDynamo === null ? (
          <div
            style={{
              margin: '10px 0 0 10px',
              height: '21px',
            }}
          >
            <SmallLoader />
          </div>
        ) : (
          <Box
            pb={2}
            className={`${classes.wrap_input} ${classes.sp_wrap_input_tag}`}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Box className={classes.firstItem} display="flex" flexDirection="row" alignItems="center">
              <div className={classes.dot} />
              <Typography className={classes.textTagStatus}>
                {obsStatusDynamo == TAG_STATUS_RECORD.CREATED_n ||
                obsStatusDynamo == TAG_STATUS_RECORD.CREATED_in ||
                (obsStatusDynamo == TAG_STATUS_RECORD.LIVE_STREAMING && stateChannelArn === EVENT_STATE_CHANNEL.STOPPED) ||
                (obsStatusDynamo == TAG_STATUS_RECORD.UPDATED_NOT_START && videoStatusDynamo == '3')
                  ? i18n.t('common:streaming_setting_screen.status_tag_created')
                  : obsStatusDynamo == TAG_STATUS_RECORD.UPDATED_NOT_START && videoStatusDynamo == '0'
                  ? i18n.t('common:streaming_setting_screen.status_tag_updated')
                  : i18n.t('common:streaming_setting_screen.status_tag_live_streaming')}
              </Typography>
            </Box>
            <Box
              // py={1}
              display="flex"
              justifyContent="center"
              alignItems={'center'}
              className={`${classes.urlCopyTag} ${classes.lastItem}`}
              onClick={handleNavigateToDetailLink}
            >
              {/* <img src={'/images/ic_play_box.png'} style={{ width: 16, height: 14, marginRight: 5, }} /> */}
              <Icon className={`fab fa-youtube ${classes.linkVideoIcon}`} fontSize="small" />
              <Typography className={`${classes.textLink} ${classes.textNavigateDetail}`}>
                {t('common:streaming_setting_screen.navigate_to_detail')}
              </Typography>
            </Box>
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <Box className={classes.wrap_input} pb={2} display="flex" flexDirection="row" alignItems="flex-end">
            <Box className={classes.firstItem}>
              <ESInput
                id="uuid"
                name="stepSettingTwo.uuid"
                value={
                  formik?.values?.stepSettingTwo?.uuid
                    ? `${baseViewingURL}${formik?.values?.stepSettingTwo?.uuid}`
                    : formik?.values?.stepSettingTwo?.uuid
                }
                placeholder={!formik?.values?.stepSettingTwo?.uuid && i18n.t('common:streaming_setting_screen.placeholder_input_url')}
                labelPrimary={i18n.t('common:streaming_setting_screen.label_input_url')}
                fullWidth
                rows={8}
                readOnly={true}
                size="big"
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
              />
            </Box>
            {isFirstStep() && (
              <Box
                py={1}
                display="flex"
                justifyContent="flex-end"
                className={`${classes.urlCopy} ${classes.lastItem}`}
                onClick={() => {
                  handleCopy(KEY_TYPE.UUID)
                }}
              >
                <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
                <Typography className={classes.textLink}>{t('common:streaming_setting_screen.copy_url')}</Typography>
              </Box>
            )}
          </Box>
          <Box pb={2} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              <ESLabel label={i18n.t('common:streaming_setting_screen.thumbnail')} />
              <Box pt={1} className={classes.box}>
                {isFirstStep() ? (
                  <CoverUploaderStream
                    src={formik?.values?.stepSettingTwo?.thumbnail}
                    onChange={handleUpload}
                    isUploading={isUploading}
                    disabled={false}
                    size="big"
                    onOpenStateChange={handleCoverDailogStateChange}
                  />
                ) : !formik?.values?.stepSettingTwo?.thumbnail ? (
                  <img src={'/images/default_card.png'} className={classes.coverImg} />
                ) : (
                  <CoverUploaderStream
                    src={formik?.values?.stepSettingTwo?.thumbnail}
                    onChange={handleUpload}
                    isUploading={isUploading}
                    disabled={!isFirstStep()}
                    size="big"
                    onOpenStateChange={handleCoverDailogStateChange}
                  />
                )}
              </Box>
            </Box>
          </Box>
          <Box pb={2} className={classes.wrap_input}>
            <div ref={formRef['title']} className={classes.firstItem}>
              <ESInput
                id="title"
                name="stepSettingTwo.title"
                required={true}
                placeholder={i18n.t('common:streaming_setting_screen.placeholder_input_title')}
                labelPrimary={i18n.t('common:streaming_setting_screen.label_input_title')}
                fullWidth
                value={isFirstStep() ? formik?.values?.stepSettingTwo?.title : formik?.values?.stepSettingTwo?.title.trim()}
                onChange={(e) => {
                  formik.handleChange(e)
                  setValidateField('title')
                  handleUpdateValidateField('title')
                  if (onChangeFlag) {
                    setOnChangeFlag(true)
                    flagUpdateFieldDate(true)
                  }
                }}
                onBlur={formik.handleBlur}
                helperText={
                  validateField !== 'all'
                    ? checkDisplayErrorOnChange(formik, 'title', validateField).helperText
                    : checkDisplayErrorOnSubmit(formik, 'title').helperText
                }
                error={
                  validateField !== 'all'
                    ? checkDisplayErrorOnChange(formik, 'title', validateField).error
                    : checkDisplayErrorOnSubmit(formik, 'title').error
                }
                size="big"
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
                endAdornment={isFirstStep() && <CharacterLimited value={formik.values.stepSettingTwo.title} limit={100} />}
              />
            </div>
          </Box>
          <Box pb={1} className={classes.wrap_input}>
            <div ref={formRef['description']} className={classes.firstItem}>
              {isFirstStep() ? (
                <ESFastInput
                  id="description"
                  name="stepSettingTwo.description"
                  multiline={isFirstStep()}
                  rows={8}
                  placeholder={i18n.t('common:streaming_setting_screen.placeholder_input_description')}
                  labelPrimary={i18n.t('common:streaming_setting_screen.label_input_description')}
                  fullWidth
                  value={formik?.values?.stepSettingTwo?.description}
                  onChange={(e) => {
                    setValidateField('description')
                    handleUpdateValidateField('description')
                    formik.handleChange(e)
                    if (onChangeFlag) {
                      setOnChangeFlag(true)
                      flagUpdateFieldDate(true)
                    }
                  }}
                  onBlur={formik.handleBlur}
                  helperText={
                    validateField !== 'all'
                      ? checkDisplayErrorOnChange(formik, 'description', validateField).helperText
                      : checkDisplayErrorOnSubmit(formik, 'description').helperText
                  }
                  error={
                    validateField !== 'all'
                      ? checkDisplayErrorOnChange(formik, 'description', validateField).error
                      : checkDisplayErrorOnSubmit(formik, 'description').error
                  }
                  size="big"
                  required
                  disabled={!isFirstStep()}
                  className={`${getAddClassByStep(classes.input_text)} ${
                    CommonHelper.hasScrollBar('description') ? 'hide-scroll-indicator' : null
                  }`}
                  endAdornment={
                    isFirstStep() && (
                      <CharacterLimited
                        value={formik.values.stepSettingTwo.description}
                        limit={5000}
                        multiLines
                        isScroll={CommonHelper.hasScrollBar('description')}
                      />
                    )
                  }
                />
              ) : (
                <>
                  <ESLabel label={i18n.t('common:streaming_setting_screen.label_input_description')} required={true} />
                  <Linkify
                    componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a target="blank" href={decoratedHref} key={key} className={classes.detectLink}>
                        {' '}
                        {decoratedText}
                      </a>
                    )}
                  >
                    <span className={classes.detectLink}> {formik?.values?.stepSettingTwo?.description.trim()}</span>
                  </Linkify>
                </>
              )}
            </div>
          </Box>
          <Box pb={2} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              {isFirstStep() ? (
                <ESSelect
                  fullWidth
                  name="stepSettingTwo.category"
                  value={formik?.values?.stepSettingTwo?.category}
                  onChange={(e) => {
                    setValidateField('category')
                    handleUpdateValidateField('category')
                    if (onChangeFlag) {
                      setOnChangeFlag(true)
                      flagUpdateFieldDate(true)
                    }
                    formik.handleChange(e)
                  }}
                  label={i18n.t('common:delivery_reservation_tab.category')}
                  required={true}
                  size="big"
                  disabled={false}
                  helperText={
                    validateField !== 'all'
                      ? checkDisplayErrorOnChange(formik, 'category', validateField).helperText
                      : checkDisplayErrorOnSubmit(formik, 'category').helperText
                  }
                  error={
                    validateField !== 'all'
                      ? checkDisplayErrorOnChange(formik, 'category', validateField).error
                      : checkDisplayErrorOnSubmit(formik, 'category').error
                  }
                  // helperText={formik?.touched?.stepSettingTwo?.category && formik?.errors?.stepSettingTwo?.category}
                  // error={formik?.touched?.stepSettingTwo?.category && !!formik?.errors?.stepSettingTwo?.category}
                >
                  <option disabled value={-1}>
                    {i18n.t('common:please_select')}
                  </option>
                  {(category?.data || []).map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </ESSelect>
              ) : (
                <ESInput
                  id="category"
                  name="stepSettingTwo.category"
                  value={categoryName}
                  fullWidth
                  labelPrimary={i18n.t('common:delivery_reservation_tab.category')}
                  required
                  disabled={!isFirstStep()}
                  className={getAddClassByStep(classes.input_text)}
                  size="big"
                />
              )}
            </Box>
          </Box>
          <Box pb={2} className={classes.wrap_input}>
            <div ref={formRef['stream_notify_time']} className={classes.firstItem}>
              <ESLabel label={i18n.t('common:delivery_reservation_tab.notification_datetime')} required />
              {isFirstStep() ? (
                <ESInputDatePicker
                  name="stepSettingTwo.stream_notify_time"
                  placeholder={i18n.t('common:delivery_reservation_tab.notification_datetime')}
                  fullWidth
                  value={formik?.values?.stepSettingTwo?.stream_notify_time}
                  onChange={(date) => {
                    formik.setFieldValue('stepSettingTwo.stream_notify_time', date.toString())
                    setValidateField('stream_notify_time')
                    handleUpdateValidateField('stream_notify_time')
                    setOnChangeFlag(true)
                    flagUpdateFieldDate(true)
                  }}
                  onBlur={formik.handleBlur}
                  helperText={
                    validateField !== 'all'
                      ? checkDisplayErrorOnChange(formik, 'stream_notify_time', validateField).helperText
                      : checkDisplayErrorOnSubmit(formik, 'stream_notify_time').helperText
                  }
                  error={
                    validateField !== 'all'
                      ? checkDisplayErrorOnChange(formik, 'stream_notify_time', validateField).error
                      : checkDisplayErrorOnSubmit(formik, 'stream_notify_time').error
                  }
                  disabled={disable}
                  minDateMessage={''}
                  InputProps={{
                    classes: { root: classes.root },
                  }}
                  minutesStep={1}
                  minDate={'0'}
                  disablePast={!(!!status || status === 0)}
                  // readOnly={!isFirstStep()}
                />
              ) : (
                <Box pt={1}>
                  <Typography className={classes.date}>
                    {moment(formik?.values?.stepSettingTwo?.stream_notify_time).format(FORMAT_DATE_TIME_JP)}
                  </Typography>
                </Box>
              )}
            </div>
          </Box>
          <Box pb={2} className={classes.wrap_input}>
            <div ref={formRef['stream_schedule_start_time']} className={classes.firstItem}>
              <ESLabel label={i18n.t('common:delivery_reservation_tab.scheduled_delivery_start_datetime')} required />
              {isFirstStep() ? (
                <ESInputDatePicker
                  name="stepSettingTwo.stream_schedule_start_time"
                  placeholder={i18n.t('common:delivery_reservation_tab.scheduled_delivery_start_datetime')}
                  fullWidth
                  value={formik?.values?.stepSettingTwo?.stream_schedule_start_time}
                  onChange={(date) => {
                    formik.setFieldValue('stepSettingTwo.stream_schedule_start_time', date.toString())
                    setValidateField('stream_schedule_start_time')
                    handleUpdateValidateField('stream_schedule_start_time')
                    setOnChangeFlag(true)
                    flagUpdateFieldDate(true)
                  }}
                  helperText={
                    validateField !== 'all'
                      ? checkDisplayErrorOnChange(formik, 'stream_schedule_start_time', validateField).helperText
                      : checkDisplayErrorOnSubmit(formik, 'stream_schedule_start_time').helperText
                  }
                  error={
                    validateField !== 'all'
                      ? checkDisplayErrorOnChange(formik, 'stream_schedule_start_time', validateField).error
                      : checkDisplayErrorOnSubmit(formik, 'stream_schedule_start_time').error
                  }
                  disabled={disable}
                  minDateMessage={''}
                  InputProps={{
                    classes: { root: classes.root },
                  }}
                  minutesStep={1}
                  onBlur={formik.handleBlur}
                />
              ) : (
                <Box pt={1}>
                  <Typography className={classes.date}>
                    {moment(formik?.values?.stepSettingTwo?.stream_schedule_start_time).format(FORMAT_DATE_TIME_JP)}
                  </Typography>
                </Box>
              )}
            </div>
          </Box>
          <Box pb={2} className={classes.wrap_input}>
            <div ref={formRef['stream_schedule_end_time']} className={classes.firstItem}>
              <ESLabel label={i18n.t('common:delivery_reservation_tab.scheduled_end_datetime')} required />
              {isFirstStep() ? (
                <ESInputDatePicker
                  name="stepSettingTwo.stream_schedule_end_time"
                  placeholder={i18n.t('common:delivery_reservation_tab.scheduled_end_datetime')}
                  fullWidth
                  value={formik?.values?.stepSettingTwo?.stream_schedule_end_time}
                  onChange={(date) => {
                    formik.setFieldValue('stepSettingTwo.stream_schedule_end_time', date.toString())
                    setValidateField('stream_schedule_end_time')
                    handleUpdateValidateField('stream_schedule_end_time')
                    setOnChangeFlag(true)
                    flagUpdateFieldDate(true)
                  }}
                  // helperText={checkDisplayError(formik, 'stream_schedule_end_time').helperText}
                  // error={checkDisplayError(formik, 'stream_schedule_end_time').error}
                  helperText={
                    validateField !== 'all'
                      ? checkDisplayErrorOnChange(formik, 'stream_schedule_end_time', validateField).helperText
                      : checkDisplayErrorOnSubmit(formik, 'stream_schedule_end_time').helperText
                  }
                  error={
                    validateField !== 'all'
                      ? checkDisplayErrorOnChange(formik, 'stream_schedule_end_time', validateField).error
                      : checkDisplayErrorOnSubmit(formik, 'stream_schedule_end_time').error
                  }
                  disabled={disable}
                  minDateMessage={''}
                  InputProps={{
                    classes: { root: classes.root },
                  }}
                  minutesStep={1}
                  onBlur={formik.handleBlur}
                />
              ) : (
                <Box pt={1}>
                  <Typography className={classes.date}>
                    {moment(formik?.values?.stepSettingTwo?.stream_schedule_end_time).format(FORMAT_DATE_TIME_JP)}
                  </Typography>
                </Box>
              )}
            </div>
          </Box>
          {/* public time video archive */}
          <Box pb={2} className={classes.wrap_input} flexDirection="row" display="flex" alignItems="flex-end">
            <div ref={formRef['video_publish_end_time']} className={classes.firstItem}>
              <ESLabel label={i18n.t('common:streaming_setting_screen.public_time_title')} required={false} />
              {isFirstStep() ? (
                <ESInputDatePicker
                  name="stepSettingTwo.video_publish_end_time"
                  placeholder={i18n.t('common:streaming_setting_screen.archived_end_time_pl')}
                  fullWidth
                  value={formik?.values?.stepSettingTwo?.video_publish_end_time}
                  onChange={(date) => {
                    const temp = moment(date).add(5, 's')
                    formik.setFieldValue('stepSettingTwo.video_publish_end_time', temp)
                    setValidateField('video_publish_end_time')
                    handleUpdateValidateField('video_publish_end_time')
                    if (!isLive) {
                      setOnChangeFlag(true)
                      flagUpdateFieldDate(true)
                    } else {
                      setOnChangeFlag(false)
                      flagUpdateFieldDate(false)
                    }
                  }}
                  helperText={
                    validateField !== 'all'
                      ? checkDisplayErrorOnChange(formik, 'video_publish_end_time', validateField).helperText
                      : checkDisplayErrorOnSubmit(formik, 'video_publish_end_time').helperText
                  }
                  error={
                    validateField !== 'all'
                      ? checkDisplayErrorOnChange(formik, 'video_publish_end_time', validateField).error
                      : checkDisplayErrorOnSubmit(formik, 'video_publish_end_time').error
                  }
                  minDateMessage={''}
                  minutesStep={1}
                  onBlur={formik.handleBlur}
                />
              ) : (
                <Box pt={1}>
                  <Typography className={classes.date}>
                    {formik?.values?.stepSettingTwo?.video_publish_end_time !== null
                      ? moment(formik?.values?.stepSettingTwo?.video_publish_end_time).format(FORMAT_DATE_TIME_JP)
                      : ''}
                  </Typography>
                </Box>
              )}
            </div>
            {isFirstStep() && (
              <Box
                flexDirection="row"
                display="flex"
                className={`${classes.lastItem}`}
                marginBottom={
                  (
                    validateField !== 'all'
                      ? checkDisplayErrorOnChange(formik, 'video_publish_end_time', validateField).error
                      : checkDisplayErrorOnSubmit(formik, 'video_publish_end_time').error
                  )
                    ? '22px'
                    : 0
                }
              >
                <Box
                  py={1}
                  display="flex"
                  justifyContent="flex-end"
                  className={classes.urlCopy}
                  onClick={() => {
                    formik.setFieldValue('stepSettingTwo.video_publish_end_time', null)
                  }}
                >
                  <Typography
                    className={formik?.values?.stepSettingTwo?.video_publish_end_time ? classes.clearEnable : classes.clearDisable}
                  >
                    <Icon className={`fas fa-times ${classes.clear}`} fontSize="small" />
                    {t('common:streaming_setting_screen.clear')}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          {paid_delivery_flag && (
            <>
              {isFirstStep() ? (
                <Box pb={3 / 8}>
                  <ESCheckboxBig
                    checked={formik?.values?.stepSettingTwo?.use_ticket}
                    onChange={() => {
                      checkUseTicket()
                    }}
                    label={t('common:streaming_setting_screen.ticket_use')}
                    name="stepSettingTwo.use_ticket"
                    disabled={disable}
                  />
                </Box>
              ) : (
                <ESLabel label={i18n.t('common:streaming_setting_screen.ticket_use')} />
              )}
              {/* TODO: Apply component enter point eXeポイント */}
              {isFirstStep() ? (
                <Box pb={2} className={classes.wrap_input}>
                  <Box className={classes.firstItem}>
                    <ESNumberInputStream
                      id="ticket_price"
                      name="stepSettingTwo.ticket_price"
                      type="tel"
                      fullWidth
                      nameValue={'stepSettingTwo.ticket_price'}
                      // className={classes.input}
                      placeholder={'0'}
                      value={
                        isFirstStep() && (formik?.values?.stepSettingTwo?.ticket_price === 0 || !formik?.values?.stepSettingTwo?.use_ticket)
                          ? ''
                          : formik?.values?.stepSettingTwo?.ticket_price
                      }
                      onChange={(e) => {
                        setValidateField('ticket_price')
                        handleUpdateValidateField('ticket_price')
                        formik.handleChange(e)
                        if (onChangeFlag) {
                          setOnChangeFlag(true)
                          flagUpdateFieldDate(true)
                        }
                      }}
                      helperText={
                        validateField !== 'all'
                          ? checkDisplayErrorOnChange(formik, 'ticket_price', validateField).helperText
                          : checkDisplayErrorOnSubmit(formik, 'ticket_price').helperText
                      }
                      error={
                        validateField !== 'all'
                          ? checkDisplayErrorOnChange(formik, 'ticket_price', validateField).error
                          : checkDisplayErrorOnSubmit(formik, 'ticket_price').error
                      }
                      size="big"
                      isNumber={true}
                      formik={formik}
                      disabled={isLive}
                      // className={getAddClassByStep(classes.input_text_number)}
                      className={classes.input_text_number}
                      readOnly={!formik?.values?.stepSettingTwo?.use_ticket}
                      nowrapHelperText
                      endAdornment={
                        isFirstStep() ? (
                          <InputAdornment position="end" className={classes.inputContainer}>
                            <Box className={classes.inputAdornment}>{t('common:common.eXe_points')}</Box>
                          </InputAdornment>
                        ) : (
                          <></>
                        )
                      }
                    />
                  </Box>
                </Box>
              ) : (
                <Box pb={2}>
                  <Typography className={classes.date}>
                    {formik.values.stepSettingTwo.use_ticket
                      ? `利用する（${formik?.values?.stepSettingTwo?.ticket_price} ${t('common:common.eXe_points')}）`
                      : '利用しない'}
                  </Typography>
                </Box>
              )}

              <Box pb={2} className={classes.wrap_input}>
                <div ref={formRef['sell_ticket_start_time']} className={classes.firstItem}>
                  <ESLabel
                    label={i18n.t('common:delivery_reservation_tab.ticket_sales_start_datetime')}
                    required={formik?.values?.stepSettingTwo?.use_ticket}
                  />
                  {isFirstStep() ? (
                    <ESInputDatePicker
                      name="stepSettingTwo.sell_ticket_start_time"
                      placeholder={i18n.t('common:delivery_reservation_tab.ticket_sales_start_datetime')}
                      fullWidth
                      value={formik?.values?.stepSettingTwo?.sell_ticket_start_time}
                      onChange={(date) => {
                        const temp = moment(date).add(5, 's')
                        formik.setFieldValue('stepSettingTwo.sell_ticket_start_time', temp)
                        setValidateField('sell_ticket_start_time')
                        handleUpdateValidateField('sell_ticket_start_time')
                        setOnChangeFlag(true)
                        flagUpdateFieldDate(true)
                      }}
                      helperText={
                        validateField !== 'all'
                          ? checkDisplayErrorOnChange(formik, 'sell_ticket_start_time', validateField).helperText
                          : checkDisplayErrorOnSubmit(formik, 'sell_ticket_start_time').helperText
                      }
                      error={
                        validateField !== 'all'
                          ? checkDisplayErrorOnChange(formik, 'sell_ticket_start_time', validateField).error
                          : checkDisplayErrorOnSubmit(formik, 'sell_ticket_start_time').error
                      }
                      readOnly={!formik?.values?.stepSettingTwo?.use_ticket}
                      minDateMessage={''}
                      disabled={isLive}
                      InputProps={{
                        classes: { root: classes.root },
                      }}
                      onBlur={formik.handleBlur}
                      minutesStep={1}
                      disablePast={!(!!status || status === 0)}
                    />
                  ) : (
                    <Box pt={1}>
                      <Typography className={classes.date}>
                        {formik?.values?.stepSettingTwo?.sell_ticket_start_time !== null
                          ? moment(formik?.values?.stepSettingTwo?.sell_ticket_start_time).format('YYYY年MM月DD日 HH:mm')
                          : i18n.t('common:delivery_reservation_tab.ticket_sales_start_datetime')}
                      </Typography>
                    </Box>
                  )}
                </div>
              </Box>
            </>
          )}
          {isFirstStep() ? (
            <Box>
              <ESCheckboxBig
                checked={formik?.values?.stepSettingTwo?.share_sns_flag}
                onChange={() => formik.setFieldValue('stepSettingTwo.share_sns_flag', !formik?.values?.stepSettingTwo?.share_sns_flag)}
                label={t('common:streaming_setting_screen.share_SNS')}
                name="isShareSNS"
                disabled={isLive}
              />
            </Box>
          ) : (
            <ESInput
              id="title"
              name="title"
              value={
                formik?.values?.stepSettingTwo?.share_sns_flag
                  ? t('common:streaming_setting_screen.shared_it')
                  : t('common:streaming_setting_screen.dont_share')
              }
              fullWidth
              labelPrimary={t('common:streaming_setting_screen.share_SNS')}
              disabled={true}
              size="big"
              className={getAddClassByStep(classes.input_text)}
            />
          )}
          {/* stream URL */}
          <Box pt={2} className={classes.wrap_input} flexDirection="row" display="flex" alignItems="flex-end">
            <Box className={classes.firstItem}>
              <ESInput
                id="stream_url"
                name="stepSettingTwo.stream_url"
                labelPrimary={i18n.t('common:streaming_setting_screen.stream_url')}
                placeholder={
                  // isFirstStep()
                  //   ? !formik?.values?.stepSettingTwo?.stream_url && i18n.t('common:streaming_setting_screen.stream_mask')
                  //   : !formik?.values?.stepSettingTwo?.stream_url && t('common:streaming_setting_screen.issued_stream')
                  formik?.values?.stepSettingTwo?.stream_url
                    ? formik?.values?.stepSettingTwo?.stream_url
                    : t('common:streaming_setting_screen.issued_stream')
                }
                type={showStreamURL ? 'text' : 'password'}
                endAdornment={
                  isFirstStep() ? (
                    <InputAdornment position="end" className={classes.inputContainer}>
                      <div className={classes.borderLeft}></div>
                      <IconButton
                        aria-label="toggle password visibility"
                        size="small"
                        disableRipple
                        color="inherit"
                        onMouseDown={() => setShowStreamURL(!showStreamURL)}
                        disabled={!formik?.values?.stepSettingTwo?.stream_url}
                      >
                        {showStreamURL ? (
                          <img src="/images/password_show.svg" className={!formik?.values?.stepSettingTwo?.stream_url && classes.iconEye} />
                        ) : (
                          <img src="/images/password_hide.svg" className={!formik?.values?.stepSettingTwo?.stream_url && classes.iconEye} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ) : (
                    <></>
                  )
                }
                fullWidth
                value={formik?.values?.stepSettingTwo?.stream_url}
                readOnly={true}
                size="big"
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
              />
            </Box>
            {isFirstStep() && (
              <Box flexDirection="row" display="flex" className={`${classes.lastItem}`}>
                <Box
                  py={1}
                  display="flex"
                  justifyContent="flex-end"
                  className={formik?.values?.stepSettingTwo?.stream_url ? classes.copyBtn : classes.copyBtnDisable}
                  onClick={() => {
                    formik?.values?.stepSettingTwo?.stream_url && handleCopy(KEY_TYPE.URL)
                  }}
                >
                  <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
                  <Typography className={classes.textLink}>{t('common:streaming_setting_screen.copy_url')}</Typography>
                </Box>
                <Box
                  py={1}
                  display="flex"
                  justifyContent="flex-end"
                  className={!isLive && formik?.values?.stepSettingTwo?.stream_url ? classes.urlCopy : classes.linkDisable}
                  onClick={() =>
                    !isLive && formik?.values?.stepSettingTwo?.stream_url && onReNewUrlAndKey(TYPE_SECRET_KEY.URL, TYPE_SECRET_KEY.RE_NEW)
                  }
                >
                  <Typography className={classes.textLink}>{t('common:streaming_setting_screen.reissue')}</Typography>
                </Box>
              </Box>
            )}
          </Box>
          {isFirstStep() && (
            <>
              <Typography className={`${classes.captionNote} ${classes.addPaddingNote}`}>
                {i18n.t('common:streaming_setting_screen.note_stream_url')}
              </Typography>
              <Typography className={`${classes.captionNote} ${classes.addPaddingNote}`}>
                {i18n.t('common:streaming_setting_screen.note_stream_url_bottom')}
              </Typography>
            </>
          )}
          {/* stream key */}
          <Box pb={2} pt={2} className={classes.wrap_input} flexDirection="row" display="flex" alignItems="flex-end">
            <Box className={classes.firstItem}>
              <ESInput
                id="stream_key"
                name="stepSettingTwo.stream_key"
                labelPrimary={i18n.t('common:streaming_setting_screen.stream_key')}
                placeholder={
                  // isFirstStep()
                  //   ? !formik?.values?.stepSettingTwo?.stream_key && i18n.t('common:streaming_setting_screen.stream_mask')
                  //   : !formik?.values?.stepSettingTwo?.stream_key && t('common:streaming_setting_screen.issued_stream')
                  formik?.values?.stepSettingTwo?.stream_key
                    ? formik?.values?.stepSettingTwo?.stream_key
                    : t('common:streaming_setting_screen.issued_stream')
                }
                type={showStreamKey ? 'text' : 'password'}
                endAdornment={
                  isFirstStep() ? (
                    <InputAdornment position="end" className={classes.inputContainer}>
                      <div className={classes.borderLeft}></div>
                      <IconButton
                        aria-label="toggle password visibility"
                        size="small"
                        disableRipple
                        color="inherit"
                        disabled={!formik?.values?.stepSettingTwo?.stream_key}
                        onMouseDown={() => setShowStreamKey(!showStreamKey)}
                      >
                        {showStreamKey ? (
                          <img src="/images/password_show.svg" className={!formik?.values?.stepSettingTwo?.stream_key && classes.iconEye} />
                        ) : (
                          <img src="/images/password_hide.svg" className={!formik?.values?.stepSettingTwo?.stream_key && classes.iconEye} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ) : (
                    <></>
                  )
                }
                fullWidth
                value={formik?.values?.stepSettingTwo?.stream_key}
                readOnly={true}
                size="big"
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
              />
            </Box>
            {isFirstStep() && (
              <Box flexDirection="row" display="flex" className={`${classes.lastItem}`}>
                <Box
                  py={1}
                  display="flex"
                  justifyContent="flex-end"
                  className={formik?.values?.stepSettingTwo?.stream_key ? classes.copyBtn : classes.copyBtnDisable}
                  onClick={() => {
                    formik?.values?.stepSettingTwo?.stream_key && handleCopy(KEY_TYPE.KEY)
                  }}
                >
                  <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
                  <Typography className={classes.textLink}>{t('common:streaming_setting_screen.copy_url')}</Typography>
                </Box>
                {/* <Box
                  py={1}
                  display="flex"
                  justifyContent="flex-end"
                  className={showReNew && !isLive ? classes.urlCopy : classes.linkDisable}
                  onClick={() => showReNew && !isLive && onReNewUrlAndKey(TYPE_SECRET_KEY.URL, TYPE_SECRET_KEY.RE_NEW, true)}
                >
                  <Typography className={classes.textLink}>{t('common:streaming_setting_screen.reissue')}</Typography>
                </Box> */}
              </Box>
            )}
          </Box>
          {isFirstStep() ? (
            <Box pb={3 / 8} pt={2}>
              <ESCheckboxBig
                checked={formik?.values?.stepSettingTwo?.publish_flag}
                onChange={() => formik.setFieldValue('stepSettingTwo.publish_flag', !formik?.values?.stepSettingTwo?.publish_flag)}
                label={t('common:streaming_setting_screen.publish_delivery')}
                name="isReissue"
              />
            </Box>
          ) : (
            <Box pb={2}>
              <ESInput
                id="title"
                name="title"
                value={!formik?.values?.stepSettingTwo?.publish_flag ? t('common:profile.dont_show') : t('common:profile.show')}
                fullWidth
                labelPrimary={t('common:streaming_setting_screen.publish_delivery')}
                disabled={true}
                size="big"
                className={getAddClassByStep(classes.input_text)}
              />
            </Box>
          )}
          <Typography className={classes.captionNote}>{i18n.t('common:streaming_setting_screen.note_for_publish_delivery_pt')}</Typography>
          <Typography className={classes.captionNote}>{i18n.t('common:streaming_setting_screen.note_for_publish_delivery_pb')}</Typography>
          <Box paddingBottom={3} />
          {isFirstStep() ? (
            <Grid item xs={12} md={9}>
              <Box maxWidth={280} className={classes.buttonContainer}>
                <ButtonPrimary type="submit" round fullWidth onClick={onValidateForm}>
                  {i18n.t('common:streaming_setting_screen.check_submit')}
                </ButtonPrimary>
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Box className={classes.actionButtonContainer}>
                <Box className={classes.actionButton}>
                  <ESButton className={classes.cancelBtn} variant="outlined" round fullWidth size="large" onClick={onClickPrev}>
                    {t('common:common.cancel')}
                  </ESButton>
                </Box>
                <Box className={classes.actionButton}>
                  <ButtonPrimary round fullWidth onClick={onConfirm}>
                    {status || status === 0
                      ? i18n.t('common:streaming_setting_screen.update')
                      : t('common:delivery_reservation_tab.delivery_data_save')}
                  </ButtonPrimary>
                </Box>
              </Box>
            </Grid>
          )}
        </form>
      </Box>
      <Box style={{ display: !visibleLoading && !disableLoader ? 'flex' : 'none' }}>
        <ESLoader open={isPending || isPendingSetting || isLoading} showNote={false} />
      </Box>
    </Box>
  )
}

export default Steps
const useStyles = makeStyles((theme: Theme) => ({
  input_text: {
    '&.Mui-disabled': {
      color: Colors.white_opacity['70'],
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
      '&.MuiOutlinedInput-multiline.MuiOutlinedInput-marginDense': {
        padding: 0,
      },
    },
    '& .MuiInputBase-input.Mui-disabled': {
      display: 'flex',
      alignItems: 'center',
      padding: '4px 0 4px 0',
    },
    '& :-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px transparent inset',
    },
  },
  input_text_number: {
    backgroundColor: Colors.black,
    borderRadius: 4,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
      borderColor: '#fff',
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      background: 'rgba(247, 247, 53, 0.1)',
    },
    '&.Mui-disabled': {
      backgroundColor: '#000000',
      border: 'solid 1px rgba(255,255,255,.3)',
      color: 'rgba(255,255,255,.5)',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
      '&.MuiOutlinedInput-multiline.MuiOutlinedInput-marginDense': {
        // padding: 0,
      },
    },
    '& .MuiInputBase-input.Mui-disabled': {
      backgroundColor: '#000000',
      padding: '10.5px 14px',
      borderRadius: 4,
    },
    '& :-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px transparent inset',
    },
  },
  urlCopy: {
    paddingLeft: 12,
    cursor: 'pointer',
    color: '#EB5686',
    // textDecoration: 'underline',
  },
  copyBtn: {
    paddingLeft: 12,
    cursor: 'pointer',
    color: '#EB5686',
    // textDecoration: 'underline',
  },
  copyBtnDisable: {
    paddingLeft: 12,
    color: '#FFFFFF30',
    '&:focus': {
      color: '#FFFFFF9C',
    },
    cursor: 'default',
  },
  linkDisable: {
    marginLeft: 12,
    // cursor: 'pointer',
    color: '#FFFFFF30',
    '&:focus': {
      color: '#FFFFFF9C',
    },
    cursor: 'default',
  },
  clearEnable: {
    color: '#EB5686',
    textDecoration: 'underline',
  },
  clearDisable: {
    color: '#FFFFFF30',
    textDecoration: 'underline',
  },
  textLink: {
    textDecoration: 'underline',
  },
  link: {
    // marginRight: 5,
    fontSize: 14,
    paddingTop: 3,
  },
  box: {
    paddingLeft: 0,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  formContainer: {
    maxWidth: '617px',
  },
  inputContainer: {
    position: 'relative',
    paddingRight: 7,
  },
  borderLeft: {
    width: 1,
    height: 24,
    backgroundColor: '#4B4B4D',
    position: 'absolute',
    left: -8,
  },
  flexBox: {
    display: 'flex',
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
  },
  captionNote: {
    fontSize: 12,
  },
  date: {
    fontSize: 14,
    color: Colors.white_opacity['70'],
  },
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 27,
    '& .MuiButtonBase-root.button-primary': {
      padding: 0,
    },
  },
  coverImg: {
    width: '100%',
    objectFit: 'cover',
    objectPosition: '50% 50%',
    borderRadius: 4,
    border: `1px solid rgba(255,255,255,0.3)`,
  },
  inputAdornment: {
    color: '#FFFFFF',
    fontSize: '14px',
  },
  detectLink: {
    whiteSpace: 'pre-line',
    color: '#FFFFFFB3',
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 400,
    '& a': {
      color: '#FF4786',
    },
  },
  [theme.breakpoints.down('sm')]: {
    actionButtonContainer: {
      flexDirection: 'column-reverse',
    },
  },
  actionButton: {
    width: theme.spacing(27.5),
    margin: 8,
  },
  cancelBtn: {
    padding: '12px 22px',
  },
  firstItem: {
    width: '494px',
  },
  wrap_input: {
    paddingLeft: 0,
  },
  [theme.breakpoints.down(768)]: {
    container: {
      padding: '34px 24px 32px 24px',
    },
    wrap_input: {
      position: 'relative',
      width: '100%',
      flexWrap: 'wrap-reverse',
      justifyContent: 'flex-end',
    },
    firstItem: {
      width: '100%',
    },
    lastItem: {
      position: 'absolute',
      // top: '-2px',
    },
    coverImg: {
      height: 'calc((100vw - 48px) * 9/16)',
    },
    sp_wrap_input_tag: {
      paddingBottom: 13,
    },
  },
  addPaddingNote: {
    paddingTop: 8,
  },
  root: {
    backgroundColor: Colors.black,
    borderRadius: 4,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
      borderColor: '#FFFFFF',
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      background: 'rgba(247, 247, 53, 0.1)',
    },
    '&.Mui-disabled': {
      borderWidth: 1,
      // backgroundColor:'transparent',
      '& .MuiOutlinedInput-notchedOutline': {
        // borderColor: 'transparent',
      },
    },
    '& :-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #000000 inset',
    },
  },
  iconEye: {
    filter: 'opacity(0.5)',
  },
  statusTag: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 13,
  },
  tagLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '494px',
  },
  dot: (props: { statusRecord?: number | string; isEnable?: boolean; channelArn?: string; videoStatusDynamo?: string }) => ({
    width: 12,
    height: 12,
    background:
      props.statusRecord === TAG_STATUS_RECORD.LIVE_STREAMING && props.channelArn !== EVENT_STATE_CHANNEL.STOPPED
        ? '#FF0000'
        : props.statusRecord === TAG_STATUS_RECORD.UPDATED_NOT_START && props.videoStatusDynamo == '3'
        ? '#707070'
        : props.statusRecord === TAG_STATUS_RECORD.UPDATED_NOT_START && props.videoStatusDynamo == '0'
        ? 'none'
        : '#707070',
    borderRadius: 6,
    marginRight: 6,
    border: props.statusRecord === TAG_STATUS_RECORD.UPDATED_NOT_START && props.videoStatusDynamo == '0' ? '2px solid #FF0000' : 'none',
  }),
  textTagStatus: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  textNavigateDetail: {
    marginLeft: 6,
  },
  linkVideoIcon: {
    fontSize: 14,
  },
  urlCopyTag: (props: {
    statusRecord?: number | string
    isEnable?: boolean
    channelArn?: string
    videoStatusDynamo?: string | number
  }) => ({
    paddingLeft: 12,
    cursor: props.isEnable
      ? 'pointer'
      : props.statusRecord === TAG_STATUS_RECORD.UPDATED_NOT_START && props.videoStatusDynamo == STATUS_VIDEO.OVER_LOAD
      ? 'not-allowed'
      : 'not-allowed',
    color: props.isEnable
      ? '#FF4786'
      : props.statusRecord === TAG_STATUS_RECORD.UPDATED_NOT_START && props.videoStatusDynamo == STATUS_VIDEO.OVER_LOAD
      ? 'rgba(255,255,255,0.7)'
      : 'rgba(255,255,255,0.7)',
  }),
}))
