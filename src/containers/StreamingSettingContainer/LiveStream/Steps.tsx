import { Box, Grid, Icon, IconButton, InputAdornment, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useFormik } from 'formik'
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
import { Colors } from '@theme/colors'
import ESLabel from '@components/Label'
import ESButton from '@components/Button'
import { FormLiveType } from '@containers/arena/UpsertForm/FormLiveSettingsModel/FormLiveSettingsType'
import { getInitialLiveSettingValues } from '@containers/arena/UpsertForm/FormLiveSettingsModel/InitialLiveSettingsValues'
import { validationLiveSettingsScheme } from '@containers/arena/UpsertForm/FormLiveSettingsModel/ValidationLiveSettingsScheme'
import { LiveStreamSettingHelper } from '@utils/helpers/LiveStreamSettingHelper'
import useLiveSetting from '../useLiveSetting'
import {
  baseViewingURL,
  GetCategoryResponse,
  SetLiveStreamParams,
  StreamUrlAndKeyParams,
  TYPE_SECRET_KEY,
  TYPE_SETTING,
} from '@services/liveStream.service'
import useReturnHref from '@utils/hooks/useReturnHref'
import { FIELD_TITLES } from '../field_titles.constants'
import { showDialog } from '@store/common/actions'
import { FORMAT_DATE_TIME_JP, NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import ESLoader from '@components/FullScreenLoader'
import useGetProfile from '@utils/hooks/useGetProfile'
import useUploadImage from '@utils/hooks/useUploadImage'
import ESNumberInputStream from '@components/NumberInput/stream'
import ESInputDatePicker from '@components/InputDatePicker'
import moment from 'moment'
import Linkify from 'react-linkify'
import { CommonHelper } from '@utils/helpers/CommonHelper'

interface StepsProps {
  step: number
  onNext: (step: number, isShare?: boolean, post?: { title: string; content: string }) => void
  category: GetCategoryResponse
}
const KEY_TYPE = {
  URL: 1,
  KEY: 2,
  UUID: 3,
}

const Steps: React.FC<StepsProps> = ({ step, onNext, category }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])
  const [categoryName, setCategoryName] = useState('')
  const { liveSettingInformation, getLiveSettingTab, setLiveStreamConfirm, getStreamUrlAndKey, isPending } = useLiveSetting()
  const liveInfo = liveSettingInformation?.data

  const { userProfile } = useGetProfile()
  const [showStreamURL, setShowStreamURL] = useState(false)
  const [showStreamKey, setShowStreamKey] = useState(false)
  const [hasError, setError] = useState(false)
  const initialValues = getInitialLiveSettingValues(liveInfo ? liveInfo : null)
  const formik = useFormik<FormLiveType>({
    initialValues: initialValues,
    validationSchema: validationLiveSettingsScheme(),
    enableReinitialize: true,
    onSubmit: () => {
      //TODO: smt
    },
  })
  const { checkNgWordFields, checkNgWordByField } = useCheckNgWord()
  const paid_delivery_flag = userProfile?.attributes?.paid_delivery_flag
  const [showReNew, setShowReNew] = useState<boolean>(false)
  const [errPublicTime, setErrPublicTime] = useState(false)
  const [isLive, setIsLive] = useState<boolean>(false)
  // const [status, setStatus] = useState<number>(0)
  const [counter, setCounter] = useState<number>(0)

  useEffect(() => {
    getLiveSetting()
  }, [])

  useEffect(() => {
    setCounter(counter + 1)
    removeField()
    const isRequiredFieldsValid = LiveStreamSettingHelper.checkRequiredFields(1, formik.errors)
    setError(!isRequiredFieldsValid)
  }, [formik.errors.stepSettingOne])

  useEffect(() => {
    category?.data.forEach((h) => {
      if (Number(h.id) === Number(formik.values.stepSettingOne.category)) {
        setCategoryName(h.name)
      }
    })
  }, [formik.values.stepSettingOne.category])

  const removeField = () => {
    if (counter <= 1) {
      formik?.errors?.stepSettingOne?.video_publish_end_time && delete formik?.errors?.stepSettingOne?.video_publish_end_time
    }
    return formik.errors
  }

  const getLiveSetting = () => {
    getLiveSettingTab({ type: TYPE_SETTING.LIVE }).then((res) => {
      formik.validateForm()
      checkStatusRecord(res.payload)
    })
  }

  const checkStatusRecord = (data) => {
    if (!data?.data?.created_at) {
      onReNewUrlAndKey(TYPE_SECRET_KEY.URL, TYPE_SECRET_KEY.GET, false)
      setShowReNew(false)
    } else {
      setShowReNew(true)
    }
    checkStatus(data?.data)
  }

  const checkStatus = (data) => {
    //check live stream isn't it? 1 - live
    const status = data?.status === 1 ? true : false
    setIsLive(status)
    // setStatus(data?.status)
  }

  const { uploadLiveStreamThumbnailImage, isUploading } = useUploadImage()
  const handleUpload = useCallback((file: File, blob: any) => {
    uploadLiveStreamThumbnailImage(file, blob, (imageUrl) => {
      formik.setFieldValue('stepSettingOne.thumbnail', imageUrl)
    })
  }, [])

  const handleCopy = (type: number) => {
    switch (type) {
      case KEY_TYPE.UUID:
        if (window.navigator.clipboard) {
          window.navigator.clipboard.writeText(formik.values.stepSettingOne.linkUrl)
        }
        dispatch(commonActions.addToast(t('common:streaming_setting_screen.message_copy')))
        break
      case KEY_TYPE.URL:
        if (window.navigator.clipboard) {
          window.navigator.clipboard.writeText(formik.values.stepSettingOne.stream_url.toString())
        }
        dispatch(commonActions.addToast(t('common:streaming_setting_screen.message_copy')))
        break
      case KEY_TYPE.KEY:
        if (window.navigator.clipboard) {
          window.navigator.clipboard.writeText(formik.values.stepSettingOne.stream_key.toString())
        }
        dispatch(commonActions.addToast(t('common:streaming_setting_screen.message_copy')))
        break
      default:
        break
    }
  }

  const onClickNext = () => {
    const { stepSettingOne } = formik.values

    const fieldIdentifier = checkNgWordFields({
      title: stepSettingOne.title,
      description: stepSettingOne.description,
      ticket_price: stepSettingOne.ticket_price,
    })

    const ngFields = checkNgWordByField({
      [FIELD_TITLES.stepSettingOne.title]: stepSettingOne.title,
      [FIELD_TITLES.stepSettingOne.description]: stepSettingOne.description,
      [FIELD_TITLES.stepSettingOne.ticket_price]: stepSettingOne.ticket_price,
    })

    if (fieldIdentifier) {
      dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: ngFields.join(', ') }))
    } else {
      // setShowStreamKey(false)
      // setShowStreamURL(false)
      if (checkPublicTime(stepSettingOne.video_publish_end_time)) {
        setErrPublicTime(false)
        onNext(step + 1, stepSettingOne.share_sns_flag, {
          title: stepSettingOne.title,
          content: `${baseViewingURL}${stepSettingOne.linkUrl}`,
        })
      } else {
        setErrPublicTime(true)
      }
    }
  }
  const onClickPrev = () => {
    onNext(step - 1, formik.values.stepSettingOne.share_sns_flag, {
      title: formik.values.stepSettingOne.title,
      content: `${baseViewingURL}${formik.values.stepSettingOne.linkUrl}`,
    })
    setErrPublicTime(false)
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

  const onConfirm = () => {
    const {
      linkUrl,
      ticket_price,
      use_ticket,
      share_sns_flag,
      publish_flag,
      thumbnail,
      title,
      description,
      category,
      stream_url,
      stream_key,
      video_publish_end_time,
    } = formik.values.stepSettingOne
    const data: SetLiveStreamParams = {
      // ...formik.values.stepSettingOne,
      uuid: linkUrl,
      ticket_price: ticket_price + '',
      use_ticket: use_ticket === false ? '0' : '1',
      share_sns_flag: share_sns_flag === false ? '0' : '1',
      publish_flag: publish_flag === false ? '0' : '1',
      stream_notify_time: null,
      stream_schedule_start_time: null,
      stream_schedule_end_time: null,
      sell_ticket_start_time: null,
      scheduled_flag: 0,
      thumbnail: thumbnail,
      title: title.trim(),
      description: description.trim(),
      category: category,
      stream_url: stream_url,
      stream_key: stream_key,
      video_publish_end_time: video_publish_end_time !== null ? CommonHelper.formatDateTimeJP(video_publish_end_time) : null,
    }
    setLiveStreamConfirm(data, () => {
      onNext(step + 1, share_sns_flag, {
        title: formik.values.stepSettingOne.title,
        content: `${baseViewingURL}${formik.values.stepSettingOne.linkUrl}`,
      })
    })
  }

  const checkPublicTime = (time: string): boolean => {
    const current = Date.now()
    const publicTime = new Date(time).getTime()
    if (publicTime >= current || time === null) return true
    return false
  }

  const onReNewUrlAndKey = (type: string, method: string, showToast?: boolean) => {
    const params: StreamUrlAndKeyParams = {
      type: method,
      objected: type,
      is_live: TYPE_SECRET_KEY.LIVE,
    }
    getStreamUrlAndKey(params, (url, key) => {
      // if (type === KEY_TYPE.URL) {
      formik.setFieldValue('stepSettingOne.stream_url', url)
      formik.setFieldValue('stepSettingOne.stream_key', key)
      showToast && dispatch(commonActions.addToast(t('common:streaming_setting_screen.renew_success_toast')))
      // } else {
      //   formik.setFieldValue('stepSettingOne.stream_key', key)
      //   showToast && dispatch(commonActions.addToast(t('common:streaming_setting_screen.renew_success_toast')))
      // }
    })
  }
  // console.log('formik.values.stepSettingOne.description.trim()', formik.values.stepSettingOne.description);

  return (
    <Box py={4} className={classes.container}>
      <Box className={classes.formContainer}>
        <form onSubmit={formik.handleSubmit}>
          <Box className={classes.wrap_input} display="flex" flexDirection="row" alignItems="flex-end">
            <Box className={classes.firstItem}>
              <ESInput
                id="linkUrl"
                name="stepSettingOne.linkUrl"
                value={
                  formik.values.stepSettingOne.linkUrl
                    ? `${baseViewingURL}${formik.values.stepSettingOne.linkUrl}`
                    : formik.values.stepSettingOne.linkUrl
                }
                placeholder={!formik.values.stepSettingOne.linkUrl && i18n.t('common:streaming_setting_screen.placeholder_input_url')}
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
                onClick={() => handleCopy(KEY_TYPE.UUID)}
              >
                <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
                <Typography className={classes.textLink}>{t('common:streaming_setting_screen.copy_url')}</Typography>
              </Box>
            )}
          </Box>
          <Box paddingBottom={2} />
          <Box pb={2} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              <ESLabel label={i18n.t('common:streaming_setting_screen.thumbnail')} />
              <Box pt={1} className={classes.box}>
                {isFirstStep() ? (
                  <CoverUploaderStream
                    src={formik.values.stepSettingOne.thumbnail}
                    onChange={handleUpload}
                    isUploading={isUploading}
                    disabled={isLive}
                    size="big"
                    onOpenStateChange={handleCoverDailogStateChange}
                  />
                ) : !formik.values.stepSettingOne.thumbnail ? (
                  <img src={'/images/default_card.png'} className={classes.coverImg} />
                ) : (
                  <CoverUploaderStream
                    src={formik.values.stepSettingOne.thumbnail}
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
                name="stepSettingOne.title"
                required={true}
                placeholder={i18n.t('common:streaming_setting_screen.placeholder_input_title')}
                labelPrimary={i18n.t('common:streaming_setting_screen.label_input_title')}
                fullWidth
                value={isFirstStep() ? formik.values.stepSettingOne.title : formik.values.stepSettingOne.title.trim()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik?.touched?.stepSettingOne?.title && formik?.errors.stepSettingOne?.title}
                error={formik?.touched?.stepSettingOne?.title && !!formik?.errors.stepSettingOne?.title}
                size="big"
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
              />
            </Box>
          </Box>
          <Box pb={2} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              {isFirstStep() ? (
                <ESFastInput
                  id="description"
                  name="stepSettingOne.description"
                  multiline={isFirstStep()}
                  rows={8}
                  required={true}
                  placeholder={i18n.t('common:streaming_setting_screen.placeholder_input_description')}
                  labelPrimary={i18n.t('common:streaming_setting_screen.label_input_description')}
                  fullWidth
                  value={formik.values.stepSettingOne.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik?.touched?.stepSettingOne?.description && formik?.errors?.stepSettingOne?.description}
                  error={formik?.touched?.stepSettingOne?.description && !!formik?.errors?.stepSettingOne?.description}
                  size="big"
                  disabled={!isFirstStep()}
                  className={getAddClassByStep(classes.input_text)}
                />
              ) : (
                <>
                  <ESLabel label={i18n.t('common:streaming_setting_screen.label_input_description')} required={true} />
                  <Linkify>
                    <span className={classes.detectLink}> {formik.values.stepSettingOne.description.trim()}</span>
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
                  id="category"
                  name="stepSettingOne.category"
                  value={formik.values.stepSettingOne.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label={i18n.t('common:streaming_setting_screen.category')}
                  required={true}
                  size="big"
                  helperText={formik?.touched?.stepSettingOne?.category && formik?.errors?.stepSettingOne?.category}
                  error={formik?.touched?.stepSettingOne?.category && !!formik?.errors?.stepSettingOne?.category}
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
                  id="title"
                  name="title"
                  value={categoryName}
                  fullWidth
                  labelPrimary={i18n.t('common:streaming_setting_screen.category')}
                  required
                  disabled={!isFirstStep()}
                  className={getAddClassByStep(classes.input_text)}
                  size="big"
                />
              )}
            </Box>
          </Box>
          {/* public time video archive */}
          <Box pb={2} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              <ESLabel label={i18n.t('common:streaming_setting_screen.public_time_title')} required={false} />
              {isFirstStep() ? (
                <ESInputDatePicker
                  name="stepSettingOne.video_publish_end_time"
                  placeholder={'2021年7月31日 23:59'}
                  fullWidth
                  value={formik.values.stepSettingOne.video_publish_end_time}
                  onChange={(date) => {
                    const temp = moment(date).add(5, 's')
                    formik.setFieldValue('stepSettingOne.video_publish_end_time', temp)
                  }}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik?.touched?.stepSettingOne?.video_publish_end_time && formik?.errors?.stepSettingOne?.video_publish_end_time
                  }
                  error={
                    (formik?.touched?.stepSettingOne?.video_publish_end_time && !!formik?.errors?.stepSettingOne?.video_publish_end_time) ||
                    errPublicTime
                  }
                />
              ) : (
                <Box pt={1}>
                  <Typography className={classes.date}>
                    {formik.values.stepSettingOne.video_publish_end_time !== null
                      ? moment(formik.values.stepSettingOne.video_publish_end_time).format(FORMAT_DATE_TIME_JP)
                      : i18n.t('common:streaming_setting_screen.public_time_title')}
                  </Typography>
                  {/* {errPublicTime && <FormHelperText error>{errPublicTime}</FormHelperText>} */}
                </Box>
              )}
            </Box>
          </Box>
          {paid_delivery_flag && (
            <>
              {isFirstStep() ? (
                <Box pb={1}>
                  <ESCheckboxBig
                    checked={formik.values.stepSettingOne.use_ticket}
                    onChange={() => {
                      formik.setFieldValue('stepSettingOne.use_ticket', !formik.values.stepSettingOne.use_ticket)
                    }}
                    label={t('common:streaming_setting_screen.ticket_use')}
                    name="stepSettingOne.use_ticket"
                    disabled={isLive}
                  />
                </Box>
              ) : (
                <ESLabel label={i18n.t('common:streaming_setting_screen.ticket_use')} />
              )}
              {/* TODO: Apply component enter point eXeポイント */}
              {isFirstStep() ? (
                <Box pb={2} className={classes.box}>
                  <Box className={classes.firstItem}>
                    <ESNumberInputStream
                      id="ticket_price"
                      name="stepSettingOne.ticket_price"
                      type="tel"
                      fullWidth
                      nameValue={'stepSettingOne.ticket_price'}
                      // className={classes.input}
                      placeholder={'0'}
                      value={
                        isFirstStep() && (formik.values.stepSettingOne.ticket_price === 0 || !formik.values.stepSettingOne.use_ticket)
                          ? ''
                          : formik.values.stepSettingOne.ticket_price
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.values.stepSettingOne.use_ticket && formik.handleBlur}
                      helperText={formik?.touched?.stepSettingOne?.ticket_price && formik?.errors?.stepSettingOne?.ticket_price}
                      error={formik?.touched?.stepSettingOne?.ticket_price && !!formik?.errors?.stepSettingOne?.ticket_price}
                      size="big"
                      isNumber={true}
                      formik={formik}
                      disabled={isLive}
                      className={getAddClassByStep(classes.input_text)}
                      readOnly={!formik.values.stepSettingOne.use_ticket}
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
                      classes={{ root: classes.root }}
                    />
                  </Box>
                </Box>
              ) : (
                <Box pb={2}>
                  <Typography className={classes.date}>
                    {formik.values.stepSettingOne.use_ticket
                      ? `利用する（${formik.values.stepSettingOne.ticket_price} exeポイント）`
                      : '利用しない'}
                  </Typography>
                </Box>
              )}
            </>
          )}
          {isFirstStep() ? (
            <Box>
              <ESCheckboxBig
                checked={formik.values.stepSettingOne.share_sns_flag}
                onChange={() => {
                  formik.setFieldValue('stepSettingOne.share_sns_flag', !formik.values.stepSettingOne.share_sns_flag)
                }}
                label={t('common:streaming_setting_screen.share_SNS')}
                name="share_sns_flag"
                disabled={isLive}
              />
            </Box>
          ) : (
            <Box>
              <ESInput
                id="title"
                name="title"
                value={
                  formik.values.stepSettingOne.share_sns_flag
                    ? t('common:streaming_setting_screen.shared_it')
                    : t('common:streaming_setting_screen.dont_share')
                }
                fullWidth
                labelPrimary={t('common:streaming_setting_screen.share_SNS')}
                disabled={true}
                size="big"
                className={getAddClassByStep(classes.input_text)}
              />
            </Box>
          )}
          {/* stream URL */}
          <Box pt={2} className={classes.wrap_input} flexDirection="row" display="flex" alignItems="flex-end">
            <Box className={classes.firstItem}>
              <ESInput
                id="stream_url"
                name="stepSettingOne.stream_url"
                labelPrimary={i18n.t('common:streaming_setting_screen.stream_url')}
                placeholder={
                  isFirstStep()
                    ? !formik.values.stepSettingOne.stream_url && i18n.t('common:streaming_setting_screen.stream_mask')
                    : !formik.values.stepSettingOne.stream_url && t('common:streaming_setting_screen.issued_stream')
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
                      >
                        {showStreamURL ? <img src="/images/password_show.svg" /> : <img src="/images/password_hide.svg" />}
                      </IconButton>
                    </InputAdornment>
                  ) : (
                    <></>
                  )
                }
                fullWidth
                value={formik.values.stepSettingOne.stream_url}
                readOnly={true}
                size="big"
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
              />
            </Box>
            {isFirstStep() && (
              <Box flexDirection="row" display="flex" className={`${classes.lastItem}`}>
                <Box py={1} display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={() => handleCopy(KEY_TYPE.URL)}>
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
          <Box pt={2} className={classes.wrap_input} flexDirection="row" display="flex" alignItems="flex-end">
            <Box className={classes.firstItem}>
              <ESInput
                id="stream_key"
                name="stepSettingOne.stream_key"
                labelPrimary={i18n.t('common:streaming_setting_screen.stream_key')}
                placeholder={
                  isFirstStep()
                    ? !formik.values.stepSettingOne.stream_key && i18n.t('common:streaming_setting_screen.stream_mask')
                    : !formik.values.stepSettingOne.stream_key && t('common:streaming_setting_screen.issued_stream')
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
                        onMouseDown={() => setShowStreamKey(!showStreamKey)}
                      >
                        {showStreamKey ? <img src="/images/password_show.svg" /> : <img src="/images/password_hide.svg" />}
                      </IconButton>
                    </InputAdornment>
                  ) : (
                    <></>
                  )
                }
                fullWidth
                value={formik.values.stepSettingOne.stream_key}
                readOnly={true}
                size="big"
                disabled={!isFirstStep()}
                // className={isFirstStep()?getAddClassByStep(classes.input_text):classes.input_pl}
                className={getAddClassByStep(classes.input_text)}
              />
            </Box>
            {isFirstStep() && (
              <Box flexDirection="row" display="flex" className={`${classes.lastItem}`}>
                <Box py={1} display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={() => handleCopy(KEY_TYPE.KEY)}>
                  <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
                  <Typography className={classes.textLink}>{t('common:streaming_setting_screen.copy_url')}</Typography>
                </Box>

                <Box
                  py={1}
                  display="flex"
                  justifyContent="flex-end"
                  className={showReNew && !isLive ? classes.urlCopy : classes.linkDisable}
                  onClick={() => showReNew && !isLive && onReNewUrlAndKey(TYPE_SECRET_KEY.KEY, TYPE_SECRET_KEY.RE_NEW, true)}
                >
                  <Typography className={classes.textLink}>{t('common:streaming_setting_screen.reissue')}</Typography>
                </Box>
              </Box>
            )}
          </Box>
          {isFirstStep() ? (
            <Box pb={3 / 8} pt={2}>
              <ESCheckboxBig
                checked={formik.values.stepSettingOne.publish_flag}
                onChange={() => formik.setFieldValue('stepSettingOne.publish_flag', !formik.values.stepSettingOne.publish_flag)}
                label={t('common:streaming_setting_screen.publish_delivery')}
                name="stepSettingOne.publish_flag"
              />
            </Box>
          ) : (
            <Box pt={2} pb={1}>
              <ESInput
                id="title"
                name="title"
                value={!formik.values.stepSettingOne.publish_flag ? t('common:profile.dont_show') : t('common:profile.show')}
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
                    {showReNew ? i18n.t('common:streaming_setting_screen.update') : t('common:streaming_setting_screen.start_live_stream')}
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
        backgroundColor: 'transparent',
      },
      '&.MuiOutlinedInput-multiline.MuiOutlinedInput-marginDense': {
        padding: 0,
        display: 'flex',
      },
    },
    '& .MuiInputBase-input.Mui-disabled': {
      display: 'flex',
      alignItems: 'center',
      padding: '4px 0 4px 0',
    },
  },
  urlCopy: {
    paddingLeft: 12,
    cursor: 'pointer',
    color: '#EB5686',
  },
  linkDisable: {
    marginLeft: 12,
    // cursor: 'pointer',
    color: '#FFFFFF30',
    '&:focus': {
      color: '#ffffff9c',
    },
    cursor: 'default',
  },
  textLink: {
    textDecoration: 'underline',
  },
  link: {
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
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 27,
  },
  coverImg: {
    width: 200,
    // height: 278,
    objectFit: 'cover',
    objectPosition: '50% 50%',
    borderRadius: 4,
    border: `1px solid rgba(255,255,255,0.3)`,
  },
  inputAdornment: {
    color: '#fff',
    fontSize: '14px',
  },
  detectLink: {
    whiteSpace: 'pre-line',
    paddingTop: '12px',
    color: '#ffffffb3',
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
  },
  addPaddingNote: {
    paddingTop: 8,
  },
  root: {
    backgroundColor: Colors.black,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
      borderColor: '#fff',
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      background: 'rgba(247, 247, 53, 0.1)',
    },
    '& :-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #000000 inset',
    },
  },
}))
