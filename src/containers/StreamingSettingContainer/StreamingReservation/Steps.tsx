import { Box, Grid, Icon, IconButton, InputAdornment, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
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
  TYPE_RM,
  TYPE_SECRET_KEY,
} from '@services/liveStream.service'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { FIELD_TITLES } from '../field_titles.constants'
import { FORMAT_DATE_TIME_JP, NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import { showDialog } from '@store/common/actions'
import useReturnHref from '@utils/hooks/useReturnHref'
import moment from 'moment'
import useGetProfile from '@utils/hooks/useGetProfile'
import ESLoader from '@components/FullScreenLoader'
import useUploadImage from '@utils/hooks/useUploadImage'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import ESNumberInputStream from '@components/NumberInput/stream'
import Linkify from 'react-linkify'

interface StepsProps {
  step: number
  onNext: (step: number, isShare?: boolean, post?: { title: string; content: string }) => void
  category: GetCategoryResponse
  formik?: FormikProps<FormLiveType>
  isShare?: boolean
  titlePost?: string
  contentPost?: string
}

const KEY_TYPE = {
  URL: 1,
  KEY: 2,
  UUID: 3,
}

const Steps: React.FC<StepsProps> = ({ step, onNext, category, formik, isShare, titlePost, contentPost }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])

  const [showStreamURL, setShowStreamURL] = useState(false)
  const [showStreamKey, setShowStreamKey] = useState(false)
  const [hasError, setError] = useState(true)

  const { getStreamUrlAndKey, isPending, setLiveStreamConfirm, scheduleInformation } = useLiveSetting()
  const { checkNgWordFields, checkNgWordByField } = useCheckNgWord()
  const { userProfile } = useGetProfile()
  const paid_delivery_flag = userProfile?.attributes?.paid_delivery_flag
  const [categoryName, setCategoryName] = useState('')
  const [showReNew, setShowReNew] = useState<boolean>(false)
  const [isLive, setIsLive] = useState<boolean>(false)
  // const [status, setStatus] = useState<number>(0)
  const [counter, setCounter] = useState<number>(0)
  const [disable, setDisable] = useState<boolean>(false)
  const [type, setType] = useState(TYPE_RM.NEW)

  useEffect(() => {
    // getLiveSetting()
    checkStatusRecord(scheduleInformation)
  }, [scheduleInformation])

  // const getLiveSetting = () => {
  //   getScheduleSettingTab({ type: TYPE_SETTING.SCHEDULE }).then((res) => {
  //     checkStatusRecord(res.payload)
  //     formik.validateForm()
  //   })
  // }

  const checkStatusRecord = (data) => {
    if (!data?.data?.stream_key || data?.data?.status === 1) {
      // onReNewUrlAndKey(TYPE_SECRET_KEY.URL, TYPE_SECRET_KEY.GET, false)
      setShowReNew(false)
    } else {
      setShowReNew(true)
    }
    checkStatus(data?.data)
  }

  const checkStatus = (data) => {
    //check live stream isn't it? 1 - live
    const status = data?.status === 1 ? true : false
    const isAvailable =
      formik?.values?.stepSettingTwo?.status === 0 &&
      (!!formik?.values?.stepSettingTwo?.stream_notify_time ||
        !!formik?.values?.stepSettingTwo?.sell_ticket_start_time ||
        !!formik?.values?.stepSettingTwo?.video_publish_end_time)
    setIsLive(status)
    setDisable(data?.status === 0 || !data?.status ? false : true)
    setType(isAvailable ? TYPE_RM.ALL : TYPE_RM.NEW)
  }

  useEffect(() => {
    formik.validateForm().then(() => {
      setCounter(counter + 1)
      onHandleError()
    })
  }, [formik?.errors?.stepSettingTwo, type])

  const onHandleError = () => {
    removeField()
    const isRequiredFieldsValid = LiveStreamSettingHelper.checkRequiredFields(2, formik.errors, type)
    setError(!isRequiredFieldsValid)
  }

  const removeField = () => {
    if (counter <= 1 && (isLive || disable)) {
      formik?.errors?.stepSettingTwo?.stream_notify_time && delete formik?.errors?.stepSettingTwo?.stream_notify_time
      formik?.errors?.stepSettingTwo?.video_publish_end_time && delete formik?.errors?.stepSettingTwo?.video_publish_end_time
      formik?.errors?.stepSettingTwo?.sell_ticket_start_time && delete formik?.errors?.stepSettingTwo?.sell_ticket_start_time
    }
    return formik.errors
  }

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
      return otherClass ? ' ' + otherClass : ''
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

  const checkUseTicket = () => {
    formik.setFieldValue('stepSettingTwo.use_ticket', !formik?.values?.stepSettingTwo?.use_ticket)
    formik.setFieldValue(
      'stepSettingTwo.sell_ticket_start_time',
      !formik?.values?.stepSettingTwo?.use_ticket ? new Date().toString() : null
    )
  }

  const onReNewUrlAndKey = (type: string, method: string, showToast?: boolean) => {
    const params: StreamUrlAndKeyParams = {
      type: method,
      objected: type,
      is_live: TYPE_SECRET_KEY.SCHEDULE,
    }
    getStreamUrlAndKey(params, (url, key) => {
      // if (type === KEY_TYPE.URL) {
      formik.setFieldValue('stepSettingTwo.stream_url', url)
      formik.setFieldValue('stepSettingTwo.stream_key', key)
      showToast && dispatch(commonActions.addToast(t('common:streaming_setting_screen.renew_success_toast')))
      // } else {
      //   formik.setFieldValue('stepSettingTwo.stream_key', key)
      //   showToast && dispatch(commonActions.addToast(t('common:streaming_setting_screen.renew_success_toast')))
      // }
    })
  }

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
    setLiveStreamConfirm(data, () => {
      onNext(step + 1, stepSettingTwo.share_sns_flag, {
        title: stepSettingTwo.title,
        content: `${baseViewingURL}${stepSettingTwo.uuid}`,
      })
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
  }

  const getBoxPositionOnWindowCenter = function (width, height) {
    return {
      left: window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2,
      top: window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2,
    }
  }

  const getTwitterShareUrl = () => {
    return `https://twitter.com/intent/tweet?text=${titlePost}%0a${contentPost}`
  }

  return (
    <Box py={4} className={classes.container}>
      <Box className={classes.formContainer}>
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
            <Box className={classes.firstItem}>
              <ESInput
                id="title"
                name="stepSettingTwo.title"
                required={true}
                placeholder={i18n.t('common:streaming_setting_screen.placeholder_input_title')}
                labelPrimary={i18n.t('common:streaming_setting_screen.label_input_title')}
                fullWidth
                value={isFirstStep() ? formik?.values?.stepSettingTwo?.title : formik?.values?.stepSettingTwo?.title.trim()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik?.touched?.stepSettingTwo?.title && formik?.errors?.stepSettingTwo?.title}
                error={formik?.touched?.stepSettingTwo?.title && !!formik?.errors?.stepSettingTwo?.title}
                size="big"
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
              />
            </Box>
          </Box>
          <Box pb={1} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik?.touched?.stepSettingTwo?.description && formik?.errors?.stepSettingTwo?.description}
                  error={formik?.touched?.stepSettingTwo?.description && !!formik?.errors?.stepSettingTwo?.description}
                  size="big"
                  required
                  disabled={!isFirstStep()}
                  className={getAddClassByStep(classes.input_text)}
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
            </Box>
          </Box>
          <Box pb={2} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              {isFirstStep() ? (
                <ESSelect
                  fullWidth
                  name="stepSettingTwo.category"
                  value={formik?.values?.stepSettingTwo?.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label={i18n.t('common:delivery_reservation_tab.category')}
                  required={true}
                  size="big"
                  disabled={isLive}
                  helperText={formik?.touched?.stepSettingTwo?.category && formik?.errors?.stepSettingTwo?.category}
                  error={formik?.touched?.stepSettingTwo?.category && !!formik?.errors?.stepSettingTwo?.category}
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
            <Box className={classes.firstItem}>
              <ESLabel label={i18n.t('common:delivery_reservation_tab.notification_datetime')} required />
              {isFirstStep() ? (
                <ESInputDatePicker
                  name="stepSettingTwo.stream_notify_time"
                  placeholder={i18n.t('common:delivery_reservation_tab.notification_datetime')}
                  fullWidth
                  value={formik?.values?.stepSettingTwo?.stream_notify_time}
                  onChange={(date) => {
                    formik.setFieldValue('stepSettingTwo.stream_notify_time', date.toString())
                  }}
                  onBlur={(e) => {
                    formik.handleBlur(e)
                    setType(TYPE_RM.NOTIFY)
                  }}
                  helperText={
                    (formik?.touched?.stepSettingTwo?.stream_notify_time && formik?.errors?.stepSettingTwo?.stream_notify_time) ||
                    // formik?.errors?.stepSettingTwo?.notify_live_start_date ||
                    formik?.errors?.stepSettingTwo?.notify_live_end_date
                  }
                  error={formik?.touched?.stepSettingTwo?.stream_notify_time && !!formik?.errors?.stepSettingTwo?.stream_notify_time}
                  disabled={disable}
                  minDateMessage={''}
                  InputProps={{
                    classes: { root: classes.root },
                  }}
                  // readOnly={!isFirstStep()}
                />
              ) : (
                <Box pt={1}>
                  <Typography className={classes.date}>
                    {moment(formik?.values?.stepSettingTwo?.stream_notify_time).format(FORMAT_DATE_TIME_JP)}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          <Box pb={2} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              <ESLabel label={i18n.t('common:delivery_reservation_tab.scheduled_delivery_start_datetime')} required />
              {isFirstStep() ? (
                <ESInputDatePicker
                  name="stepSettingTwo.stream_schedule_start_time"
                  placeholder={i18n.t('common:delivery_reservation_tab.scheduled_delivery_start_datetime')}
                  fullWidth
                  value={formik?.values?.stepSettingTwo?.stream_schedule_start_time}
                  onChange={(date) => formik.setFieldValue('stepSettingTwo.stream_schedule_start_time', date.toString())}
                  onBlur={formik.handleBlur}
                  helperText={
                    (formik?.touched?.stepSettingTwo?.stream_schedule_start_time &&
                      formik?.errors?.stepSettingTwo?.stream_schedule_start_time) ||
                    formik?.errors?.stepSettingTwo?.notify_live_start_date
                    // || formik?.errors?.stepSettingTwo?.schedule_live_date
                  }
                  error={
                    formik?.touched?.stepSettingTwo?.stream_schedule_start_time &&
                    !!formik?.errors?.stepSettingTwo?.stream_schedule_start_time
                  }
                  disabled={disable}
                  minDateMessage={''}
                  InputProps={{
                    classes: { root: classes.root },
                  }}
                />
              ) : (
                <Box pt={1}>
                  <Typography className={classes.date}>
                    {moment(formik?.values?.stepSettingTwo?.stream_schedule_start_time).format(FORMAT_DATE_TIME_JP)}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          <Box pb={2} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              <ESLabel label={i18n.t('common:delivery_reservation_tab.scheduled_end_datetime')} required />
              {isFirstStep() ? (
                <ESInputDatePicker
                  name="stepSettingTwo.stream_schedule_end_time"
                  placeholder={i18n.t('common:delivery_reservation_tab.scheduled_end_datetime')}
                  fullWidth
                  value={formik?.values?.stepSettingTwo?.stream_schedule_end_time}
                  onChange={(date) => formik.setFieldValue('stepSettingTwo.stream_schedule_end_time', date.toString())}
                  onBlur={formik.handleBlur}
                  helperText={
                    (formik?.touched?.stepSettingTwo?.stream_schedule_end_time &&
                      formik?.errors?.stepSettingTwo?.stream_schedule_end_time) ||
                    formik?.errors?.stepSettingTwo?.schedule_live_date ||
                    formik?.errors?.stepSettingTwo?.max_schedule_live_date
                  }
                  error={
                    formik?.touched?.stepSettingTwo?.stream_schedule_end_time && !!formik?.errors?.stepSettingTwo?.stream_schedule_end_time
                  }
                  disabled={disable}
                  minDateMessage={''}
                  InputProps={{
                    classes: { root: classes.root },
                  }}
                />
              ) : (
                <Box pt={1}>
                  <Typography className={classes.date}>
                    {moment(formik?.values?.stepSettingTwo?.stream_schedule_end_time).format(FORMAT_DATE_TIME_JP)}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          {/* public time video archive */}
          <Box pb={2} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              <ESLabel label={i18n.t('common:streaming_setting_screen.public_time_title')} required={false} />
              {isFirstStep() ? (
                <ESInputDatePicker
                  name="stepSettingTwo.video_publish_end_time"
                  placeholder={'2021年7月31日 23:59'}
                  fullWidth
                  value={formik?.values?.stepSettingTwo?.video_publish_end_time}
                  onChange={(date) => {
                    const temp = moment(date).add(5, 's')
                    formik.setFieldValue('stepSettingTwo.video_publish_end_time', temp)
                  }}
                  onBlur={(e) => {
                    formik.handleBlur(e)
                    setType(TYPE_RM.PUBLISH)
                  }}
                  helperText={
                    (formik?.touched?.stepSettingTwo?.video_publish_end_time && formik?.errors?.stepSettingTwo?.video_publish_end_time) ||
                    (type === TYPE_RM.PUBLISH &&
                      (formik?.errors?.stepSettingTwo?.public_time_less_than_start ||
                        formik?.errors?.stepSettingTwo?.public_time_more_than_end))
                  }
                  error={
                    formik?.touched?.stepSettingTwo?.video_publish_end_time && !!formik?.errors?.stepSettingTwo?.video_publish_end_time
                  }
                  minDateMessage={''}
                />
              ) : (
                <Box pt={1}>
                  <Typography className={classes.date}>
                    {formik?.values?.stepSettingTwo?.video_publish_end_time !== null
                      ? moment(formik?.values?.stepSettingTwo?.video_publish_end_time).format(FORMAT_DATE_TIME_JP)
                      : i18n.t('common:streaming_setting_screen.public_time_title')}
                  </Typography>
                </Box>
              )}
            </Box>
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
                      onChange={formik.handleChange}
                      onBlur={formik?.values?.stepSettingTwo?.use_ticket && formik.handleBlur}
                      helperText={
                        formik?.values?.stepSettingTwo?.use_ticket
                          ? formik?.touched?.stepSettingTwo?.ticket_price && formik?.errors?.stepSettingTwo?.ticket_price
                          : null
                      }
                      error={
                        formik?.values?.stepSettingTwo?.use_ticket
                          ? formik?.touched?.stepSettingTwo?.ticket_price && !!formik?.errors?.stepSettingTwo?.ticket_price
                          : false
                      }
                      size="big"
                      isNumber={true}
                      formik={formik}
                      disabled={!isFirstStep()}
                      className={getAddClassByStep(classes.input_text)}
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
                <Box className={classes.firstItem}>
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
                      }}
                      // onBlur={formik.values.stepSettingTwo.use_ticket && formik.handleBlur}
                      onBlur={(e) => {
                        formik?.values?.stepSettingTwo?.use_ticket && formik.handleBlur(e)
                        setType(TYPE_RM.SELL)
                      }}
                      helperText={
                        (formik?.touched?.stepSettingTwo?.sell_ticket_start_time &&
                          formik?.errors?.stepSettingTwo?.sell_ticket_start_time) ||
                        formik?.errors?.stepSettingTwo?.sell_less_than_start
                      }
                      error={
                        formik?.touched?.stepSettingTwo?.sell_ticket_start_time && !!formik?.errors?.stepSettingTwo?.sell_ticket_start_time
                      }
                      readOnly={!formik?.values?.stepSettingTwo?.use_ticket}
                      minDateMessage={''}
                      disabled={isLive}
                      InputProps={{
                        classes: { root: classes.root },
                      }}
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
                </Box>
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
                  className={showReNew && !isLive ? classes.urlCopy : classes.linkDisable}
                  onClick={() => showReNew && !isLive && onReNewUrlAndKey(TYPE_SECRET_KEY.URL, TYPE_SECRET_KEY.RE_NEW, true)}
                >
                  <Typography className={classes.textLink}>{t('common:streaming_setting_screen.reissue')}</Typography>
                </Box>
              </Box>
            )}
          </Box>
          {isFirstStep() && (
            <Typography className={`${classes.captionNote} ${classes.addPaddingNote}`}>
              {i18n.t('common:streaming_setting_screen.note_stream_url')}
            </Typography>
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
                <Box
                  py={1}
                  display="flex"
                  justifyContent="flex-end"
                  className={showReNew && !isLive ? classes.urlCopy : classes.linkDisable}
                  onClick={() => showReNew && !isLive && onReNewUrlAndKey(TYPE_SECRET_KEY.URL, TYPE_SECRET_KEY.RE_NEW, true)}
                >
                  <Typography className={classes.textLink}>{t('common:streaming_setting_screen.reissue')}</Typography>
                </Box>
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
                <ButtonPrimary type="submit" round fullWidth onClick={onClickNext} disabled={hasError}>
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
                    {showReNew ? i18n.t('common:streaming_setting_screen.update') : t('common:delivery_reservation_tab.delivery_data_save')}
                  </ButtonPrimary>
                </Box>
              </Box>
            </Grid>
          )}
        </form>
      </Box>
      <ESLoader open={isPending} />
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
    paddingTop: '12px',
    color: '#FFFFFFB3',
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 400,
    paddingBottom: 16,
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
}))
