import { Box, Grid, Icon, IconButton, InputAdornment, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { Colors } from '@theme/colors'
import ESLabel from '@components/Label'
import ESButton from '@components/Button'
import { FormLiveType } from '@containers/arena/UpsertForm/FormLiveSettingsModel/FormLiveSettingsType'

import useLiveSetting from '../useLiveSetting'
import {
  baseViewingURL,
  CODE_ERROR_RENEW_SPECIAL,
  GetCategoryResponse,
  SetLiveStreamParams,
  StreamUrlAndKeyParams,
  TAG_STATUS_RECORD,
  TYPE_SECRET_KEY,
} from '@services/liveStream.service'
import useReturnHref from '@utils/hooks/useReturnHref'
import { FIELD_TITLES } from '../field_titles.constants'
import { showDialog } from '@store/common/actions'
import { EVENT_STATE_CHANNEL, FORMAT_DATE_TIME_JP, NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import ESLoader from '@components/FullScreenLoaderNote'
import useGetProfile from '@utils/hooks/useGetProfile'
import useUploadImage from '@utils/hooks/useUploadImage'
import ESNumberInputStream from '@components/NumberInput/stream'
import ESInputDatePicker from '@components/InputDatePicker'
import moment from 'moment'
import Linkify from 'react-linkify'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import SmallLoader from '@components/Loader/SmallLoader'
import { LiveStreamSettingHelper } from '@utils/helpers/LiveStreamSettingHelper'
import { STATUS_VIDEO } from '@services/videoTop.services'
import ESLabelWithSwitch from '@components/LabelWithSwitch'
import ESBoxftDashColumn from '@components/ESBoxftDashColumn'
import { useListGiftInfoDialog, useRankingInfoDialog } from '../useListGiftInfoDialog'
import CharacterLimited from '@components/CharacterLimited'
import { hhmmss } from '@containers/VideoPlayer/customPlugins/time'
import { TABS } from '@containers/StreamingSettingContainer'

interface StepsProps {
  step: number
  onNext: (step: number, isShare?: boolean, post?: { title: string; content: string }) => void
  category: GetCategoryResponse
  formik?: FormikProps<FormLiveType>
  isShare?: boolean
  titlePost?: string
  contentPost?: string
  stateChannelArn?: string
  visibleLoading?: boolean
  disableLoader?: boolean
  obsStatusDynamo?: string | number
  videoStatusDynamo?: string | number
  validateField?: string
  handleUpdateValidateField?: (value: string) => void
  openPopupGroupList?: (open: boolean, tab: TABS) => void
  liveStartTime?: string
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
  stateChannelArn,
  visibleLoading,
  disableLoader,
  obsStatusDynamo,
  videoStatusDynamo,
  validateField,
  handleUpdateValidateField,
  openPopupGroupList,
  liveStartTime,
}) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])
  const [categoryName, setCategoryName] = useState('')
  const { liveSettingInformation, setLiveStreamConfirm, getStreamUrlAndKey, isPending, isPendingSetting } = useLiveSetting()
  const { checkLiveDisplayErrorOnSubmit, getLiveDisplayErrorField } = LiveStreamSettingHelper
  const { userProfile } = useGetProfile()
  const [showStreamURL, setShowStreamURL] = useState(false)
  const [showStreamKey, setShowStreamKey] = useState(false)
  const { checkVideoNgWordFields, checkVideoNgWordByField } = useCheckNgWord()
  const paid_delivery_flag = userProfile?.attributes?.paid_delivery_flag
  const [obsNotEnable, setObsNotEnable] = useState<boolean>(false)
  // const [errPublicTime, setErrPublicTime] = useState(false)
  const [isLive, setIsLive] = useState<boolean>(false)
  const [isLoading, setLoading] = useState(false)
  const [clickShowText, setClickShowText] = useState(false)
  const [renewData, setRenewData] = useState(null)
  // const [statusTag, setStatusTag] = useState<number>(0)
  const classes = useStyles({ statusRecord: obsStatusDynamo, channelArn: stateChannelArn, videoStatusDynamo })
  const listGiftInfo = useListGiftInfoDialog()
  const rankingInfo = useRankingInfoDialog()
  const [countTime, setCountTime] = useState('')

  const formRef = {
    title: useRef(null),
    description: useRef(null),
    category: useRef(null),
    ticket_price: useRef(null),
    video_publish_end_time: useRef(null),
  }

  useEffect(() => {
    // getLiveSetting()
    // checkStatusRecord(liveSettingInformation)
    checkStatus(liveSettingInformation?.data)
  }, [liveSettingInformation])

  useEffect(() => {
    category?.data.forEach((h) => {
      if (Number(h.id) === Number(formik?.values?.stepSettingOne?.category)) {
        setCategoryName(h.name)
      }
    })
  }, [formik?.values?.stepSettingOne?.category, category?.data])

  // const removeField = () => {
  //   if (counter <= 1 && isLive) {
  //     formik?.errors?.stepSettingOne?.video_publish_end_time && delete formik?.errors?.stepSettingOne?.video_publish_end_time
  //   }
  //   return formik.errors
  // }

  const checkStatus = (data) => {
    //check live stream isn't it? 1 - live
    const status = data?.status === 1 && data?.live_stream_start_time ? true : false
    setIsLive(status)
    //if live, disable btn re-new
    // setShowReNew(data?.status === 1 && data?.live_stream_start_time ? false : true)
    setObsNotEnable(data?.status === 1 ? true : false)
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
          window.navigator.clipboard.writeText(
            formik?.values?.stepSettingOne?.linkUrl && `${baseViewingURL}${formik?.values?.stepSettingOne?.linkUrl}`
          )
        }
        dispatch(commonActions.addToast(t('common:streaming_setting_screen.message_copy')))
        break
      case KEY_TYPE.URL:
        if (window.navigator.clipboard) {
          window.navigator.clipboard.writeText(formik?.values?.stepSettingOne?.stream_url.toString())
        }
        dispatch(commonActions.addToast(t('common:streaming_setting_screen.message_copy')))
        break
      case KEY_TYPE.KEY:
        if (window.navigator.clipboard) {
          window.navigator.clipboard.writeText(formik?.values?.stepSettingOne?.stream_key.toString())
        }
        dispatch(commonActions.addToast(t('common:streaming_setting_screen.message_copy')))
        break
      default:
        break
    }
  }

  const onValidateForm = () => {
    handleUpdateValidateField('all')
    setTimeout(() => {
      formik.validateForm().then((err) => {
        if (_.isEmpty(err)) {
          onClickNext()
          handleUpdateValidateField('')
        } else {
          const errorField = getLiveDisplayErrorField(err)
          if (formRef[errorField]) {
            window.scrollTo({ behavior: 'smooth', top: formRef[errorField].current.offsetTop - 200 })
          }
        }
      })
    }, 300)
  }

  const onClickNext = () => {
    const { stepSettingOne } = formik.values

    const fieldIdentifier = checkVideoNgWordFields({
      title: stepSettingOne.title,
      description: stepSettingOne.description,
      ticket_price: stepSettingOne.ticket_price,
    })

    const ngFields = checkVideoNgWordByField({
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
        onNext(step + 1, stepSettingOne.share_sns_flag, {
          title: stepSettingOne.title,
          content: `${baseViewingURL}${stepSettingOne.linkUrl}`,
        })
        formik.setFieldValue('stepSettingOne.step_setting', step + 1)
      }
    }
  }
  const onClickPrev = () => {
    setClickShowText(false)
    onNext(step - 1, formik.values.stepSettingOne.share_sns_flag, {
      title: formik.values.stepSettingOne.title,
      content: `${baseViewingURL}${formik.values.stepSettingOne.linkUrl}`,
    })
    formik.setFieldValue('stepSettingOne.step_setting', step - 1)
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
      uuid_clone,
      use_gift,
      gift_group_id,
      group_title,
      ranking_flag,
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
      uuid_clone: uuid_clone,
      use_gift: use_gift === false ? 0 : 1,
      gift_group_id: gift_group_id,
      group_title: group_title,
      ranking_flag: ranking_flag === false ? 0 : 1,
    }
    setClickShowText(true)
    debouncedHandleConfirmForm(data, share_sns_flag, step, isShare)
  }

  const debouncedHandleConfirmForm = useCallback(
    _.debounce((data: SetLiveStreamParams, share_sns_flag: boolean, step: number, isShare: boolean) => {
      setLiveStreamConfirm(
        data,
        () => {
          onNext(step + 1, share_sns_flag, {
            title: formik.values.stepSettingOne.title,
            content: `${baseViewingURL}${formik.values.stepSettingOne.linkUrl}`,
          })
          formik.setFieldValue('stepSettingOne.step_setting', step + 1)
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
        },
        (codeError) => {
          if (codeError === CODE_ERROR_RENEW_SPECIAL.GROUP_LIST_DOES_NOT_EXIST) {
            formik.setFieldValue('stepSettingOne.step_setting', 1)
            formik.setFieldValue('stepSettingOne.has_group_list', true)
            window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight })
          }
        }
      )
    }, 700),
    [titlePost, contentPost]
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

  const checkPublicTime = (time: string): boolean => {
    const current = Date.now()
    const publicTime = new Date(time).getTime()
    if (publicTime >= current || time === null) return true
    return false
  }

  const debouncedHandleRenewURLAndKey = useCallback(
    _.debounce((params: StreamUrlAndKeyParams) => {
      getStreamUrlAndKey(params, (url, key, arn, data) => {
        setRenewData(data)
        setLoading(true)
        if (data) {
          formik.setFieldValue('stepSettingOne.stream_url', url)
          formik.setFieldValue('stepSettingOne.stream_key', key)
          formik.setFieldValue('stepSettingOne.arn', arn)
        }
      })
    }, 700),
    []
  )

  const onReNewUrlAndKey = (type: string, method: string) => {
    const params: StreamUrlAndKeyParams = {
      type: method,
      objected: type,
      is_live: TYPE_SECRET_KEY.LIVE,
    }
    debouncedHandleRenewURLAndKey(params)
  }

  useEffect(() => {
    //keep (loading + text) when reload page : update + STARTING
    setLoading(stateChannelArn === EVENT_STATE_CHANNEL.STARTING && obsNotEnable)
    setClickShowText(stateChannelArn === EVENT_STATE_CHANNEL.STARTING && obsNotEnable)
    if (isLoading) {
      if (!obsNotEnable) {
        //created
        setLoading(!renewData)
        if (stateChannelArn === EVENT_STATE_CHANNEL.STOPPED || stateChannelArn === EVENT_STATE_CHANNEL.UPDATED) {
          dispatch(commonActions.addToast(t('common:streaming_setting_screen.renew_success_toast')))
        }
      } else if (renewData) {
        setLoading(!(stateChannelArn === EVENT_STATE_CHANNEL.STOPPED || stateChannelArn === EVENT_STATE_CHANNEL.UPDATED))
        if (stateChannelArn === EVENT_STATE_CHANNEL.STOPPED || stateChannelArn === EVENT_STATE_CHANNEL.UPDATED) {
          dispatch(commonActions.addToast(t('common:streaming_setting_screen.renew_success_toast')))
        }
      }
    }
  }, [stateChannelArn, isLoading, formik?.values?.stepSettingOne?.stream_key])

  const handleNavigateToDetailLink = () => {
    if (
      (obsStatusDynamo == TAG_STATUS_RECORD.UPDATED_NOT_START || obsStatusDynamo == TAG_STATUS_RECORD.LIVE_STREAMING) &&
      stateChannelArn !== EVENT_STATE_CHANNEL.STOPPED
    ) {
      if (!(obsStatusDynamo == TAG_STATUS_RECORD.UPDATED_NOT_START && videoStatusDynamo == STATUS_VIDEO.OVER_LOAD)) {
        window.open(`${baseViewingURL}${formik?.values?.stepSettingOne?.linkUrl}`, '_blank')
      }
    }
  }

  const changeFieldAndResetSelectedGift = (): void => {
    // formik.handleChange(e)
    formik.setFieldValue('stepSettingOne.use_gift', !formik?.values?.stepSettingOne?.use_gift)
    formik.setFieldValue('stepSettingOne.ranking_flag', false)
    formik.setFieldValue('stepSettingOne.group_title', '')
    formik.setFieldValue('stepSettingOne.gift_group_id', null)
  }

  const handleListGiftInfo = () => {
    listGiftInfo().then(() => {
      return
    })
  }

  const handleRankingInfo = () => {
    rankingInfo().then(() => {
      return
    })
  }

  const changeFieldUseTicket = (): void => {
    formik.setFieldValue('stepSettingOne.use_ticket', !formik?.values?.stepSettingOne?.use_ticket)
  }

  const onClearNameListChip = () => {
    formik.setFieldValue('stepSettingOne.group_title', '')
    formik.setFieldValue('stepSettingOne.gift_group_id', null)
    formik.setFieldValue('stepSettingOne.has_group_list', false)
  }

  const openGroupList = () => {
    openPopupGroupList(true, TABS.LIVE_STREAM)
  }

  //V3.0 count time
  useEffect(() => {
    const updTime = () => {
      const diff = (moment.now() - moment(liveStartTime).valueOf()) / 1000
      // const diff = (Date.now() - new Date(liveStartTime).getTime()) / 1000
      hhmmss(diff)
      setCountTime(hhmmss(diff))
    }
    updTime()
    const interval = setInterval(() => {
      if (liveStartTime && obsStatusDynamo === TAG_STATUS_RECORD.LIVE_STREAMING && videoStatusDynamo == '1') {
        updTime()
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  })
  const returnTextChip = () => {
    if (formik?.values?.stepSettingOne?.use_gift) {
      if (formik?.values?.stepSettingOne?.group_title) {
        return formik?.values?.stepSettingOne?.group_title
      } else {
        return i18n.t('common:streaming_setting_screen.unselected')
      }
    } else {
      return i18n.t('common:streaming_setting_screen.ranking_flag.off')
    }
  }

  const ticketPriceInputView = useMemo(() => {
    return (
      <Box>
        {paid_delivery_flag && (
          <>
            {isFirstStep() ? (
              <Box pb={2} className={classes.wrap_input_box_switch}>
                <div className={classes.firstItem}>
                  <ESLabelWithSwitch
                    fullWidth
                    labelPrimary={t('common:streaming_setting_screen.ticket_use')}
                    valueSwitch={formik?.values?.stepSettingOne?.use_ticket}
                    handleChangeSwitch={changeFieldUseTicket}
                    disabled={isLive}
                  />
                </div>
              </Box>
            ) : (
              <ESLabel label={i18n.t('common:streaming_setting_screen.ticket_use')} />
            )}
            {isFirstStep() ? (
              <ESBoxftDashColumn isSelectedGift={formik?.values?.stepSettingOne?.use_ticket}>
                {/* TODO: Apply component enter point eXeポイント */}
                <div className={classes.boxRightTicket}>
                  <Box pb={1} className={classes.box}>
                    <div ref={formRef['video_publish_end_time']} className={classes.firstItemShort}>
                      <ESNumberInputStream
                        id="ticket_price"
                        name="stepSettingOne.ticket_price"
                        type="tel"
                        fullWidth
                        nameValue={'stepSettingOne.ticket_price'}
                        // className={classes.input}
                        placeholder={'0'}
                        value={
                          isFirstStep() &&
                          (formik?.values?.stepSettingOne?.ticket_price === 0 || !formik?.values?.stepSettingOne?.use_ticket)
                            ? ''
                            : formik?.values?.stepSettingOne?.ticket_price
                        }
                        onChange={(e) => {
                          formik.handleChange(e)
                          handleUpdateValidateField('ticket_price')
                        }}
                        helperText={
                          validateField !== 'all'
                            ? validateField === 'ticket_price'
                              ? formik?.errors?.stepSettingOne?.ticket_price
                              : ''
                            : checkLiveDisplayErrorOnSubmit(formik, 'ticket_price').helperText
                        }
                        error={
                          validateField !== 'all'
                            ? validateField === 'ticket_price'
                              ? !!formik?.errors?.stepSettingOne?.ticket_price
                              : false
                            : checkLiveDisplayErrorOnSubmit(formik, 'ticket_price').error
                        }
                        size="big"
                        isNumber={true}
                        formik={formik}
                        disabled={isLive}
                        className={getAddClassByStep(classes.input_text_ticket)}
                        readOnly={!formik?.values?.stepSettingOne?.use_ticket}
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
                    </div>
                  </Box>
                </div>
              </ESBoxftDashColumn>
            ) : (
              <Box pb={2} pt={2}>
                <ESBoxftDashColumn colorLine="#767676" isSelectedGift={true}>
                  <Typography className={`${classes.date} ${classes.newTextftDash}`}>
                    {formik?.values?.stepSettingOne?.use_ticket
                      ? `利用する（${formik?.values?.stepSettingOne?.ticket_price} ${t('common:common.eXe_points')}）`
                      : '利用しない'}
                  </Typography>
                </ESBoxftDashColumn>
              </Box>
            )}
          </>
        )}
      </Box>
    )
  }, [formik?.values?.stepSettingOne?.use_ticket, formik?.values?.stepSettingOne?.ticket_price, step, validateField])

  const publicTimeViewArchiveInputView = useMemo(() => {
    return (
      // public time video archive
      <Box pb={2} className={classes.wrap_input} flexDirection="row" display="flex" alignItems="flex-end">
        <div ref={formRef['ticket_price']} className={classes.firstItem}>
          <ESLabel label={i18n.t('common:streaming_setting_screen.public_time_title')} required={false} />
          {isFirstStep() ? (
            <ESInputDatePicker
              name="stepSettingOne.video_publish_end_time"
              placeholder={i18n.t('common:streaming_setting_screen.archived_end_time_pl')}
              fullWidth
              value={formik?.values?.stepSettingOne?.video_publish_end_time}
              onChange={(e) => {
                const temp = moment(e).add(5, 's')
                formik.setFieldValue('stepSettingOne.video_publish_end_time', temp)
                handleUpdateValidateField('video_publish_end_time')
              }}
              helperText={
                validateField !== 'all'
                  ? validateField === 'video_publish_end_time'
                    ? formik?.errors?.stepSettingOne?.video_publish_end_time
                    : ''
                  : checkLiveDisplayErrorOnSubmit(formik, 'video_publish_end_time').helperText
              }
              error={
                validateField !== 'all'
                  ? validateField === 'video_publish_end_time'
                    ? !!formik?.errors?.stepSettingOne?.video_publish_end_time
                    : false
                  : checkLiveDisplayErrorOnSubmit(formik, 'video_publish_end_time').error
              }
              minutesStep={1}
            />
          ) : (
            <Box pt={1}>
              <Typography className={classes.date}>
                {formik?.values?.stepSettingOne?.video_publish_end_time !== null
                  ? moment(formik?.values?.stepSettingOne?.video_publish_end_time).format(FORMAT_DATE_TIME_JP)
                  : ''}
              </Typography>
              {/* {errPublicTime && <FormHelperText error>{errPublicTime}</FormHelperText>} */}
            </Box>
          )}
        </div>
        {isFirstStep() && (
          <Box
            flexDirection="row"
            display="flex"
            className={`${classes.lastItem}`}
            marginBottom={
              formik?.touched?.stepSettingOne?.video_publish_end_time && !!formik?.errors?.stepSettingOne?.video_publish_end_time
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
                formik.setFieldValue('stepSettingOne.video_publish_end_time', null)
              }}
            >
              <Typography className={formik?.values?.stepSettingOne?.video_publish_end_time ? classes.clearEnable : classes.clearDisable}>
                <Icon className={`fas fa-times ${classes.clear}`} fontSize="small" />
                {t('common:streaming_setting_screen.clear')}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    )
  }, [formik?.values?.stepSettingOne?.video_publish_end_time, validateField, step])

  const descriptionInputView = useMemo(() => {
    return (
      <Box pb={2} className={classes.wrap_input}>
        <div ref={formRef['description']} className={classes.firstItem}>
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
              value={formik?.values?.stepSettingOne?.description}
              onChange={(e) => {
                formik.handleChange(e)
                handleUpdateValidateField('description')
              }}
              helperText={
                validateField !== 'all'
                  ? validateField === 'description'
                    ? formik?.errors?.stepSettingOne?.description
                    : ''
                  : checkLiveDisplayErrorOnSubmit(formik, 'description').helperText
              }
              error={
                validateField !== 'all'
                  ? validateField === 'description'
                    ? !!formik?.errors?.stepSettingOne?.description
                    : false
                  : checkLiveDisplayErrorOnSubmit(formik, 'description').error
              }
              size="big"
              disabled={!isFirstStep()}
              className={`${getAddClassByStep(classes.input_text)} ${
                CommonHelper.hasScrollBar('description') ? 'hide-scroll-indicator' : null
              }`}
              endAdornment={
                isFirstStep() && (
                  <CharacterLimited
                    value={formik.values.stepSettingOne.description}
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
                <span className={classes.detectLink}> {formik?.values?.stepSettingOne?.description.trim()}</span>
              </Linkify>
            </>
          )}
        </div>
      </Box>
    )
  }, [formik.values.stepSettingOne.description, step, validateField])

  const linkUrlView = useMemo(() => {
    return (
      <Box className={classes.wrap_input} display="flex" flexDirection="row" alignItems="flex-end">
        <Box className={classes.firstItem}>
          <ESInput
            id="linkUrl"
            name="stepSettingOne.linkUrl"
            value={
              formik?.values?.stepSettingOne?.linkUrl
                ? `${baseViewingURL}${formik?.values?.stepSettingOne?.linkUrl}`
                : formik?.values?.stepSettingOne?.linkUrl
            }
            placeholder={!formik?.values?.stepSettingOne?.linkUrl && i18n.t('common:streaming_setting_screen.placeholder_input_url')}
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
    )
  }, [formik?.values?.stepSettingOne?.linkUrl, step])

  const shareSnsFlagView = useMemo(() => {
    return (
      <Box>
        {isFirstStep() ? (
          <Box pb={2}>
            <ESCheckboxBig
              checked={formik?.values?.stepSettingOne?.share_sns_flag}
              onChange={() => {
                formik.setFieldValue('stepSettingOne.share_sns_flag', !formik?.values?.stepSettingOne?.share_sns_flag)
              }}
              label={t('common:streaming_setting_screen.share_SNS')}
              name="share_sns_flag"
              disabled={isLive}
            />
          </Box>
        ) : (
          <Box pb={2}>
            <ESInput
              id="title"
              name="title"
              value={
                formik?.values?.stepSettingOne?.share_sns_flag
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
      </Box>
    )
  }, [formik?.values?.stepSettingOne?.share_sns_flag, isLive, step])

  const imagePickerInputView = useMemo(() => {
    return (
      <Box pb={2} className={classes.wrap_input}>
        <Box className={classes.firstItem}>
          <ESLabel label={i18n.t('common:streaming_setting_screen.thumbnail')} />
          <Box pt={1} className={classes.box}>
            {isFirstStep() ? (
              <CoverUploaderStream
                src={formik?.values?.stepSettingOne?.thumbnail}
                onChange={handleUpload}
                isUploading={isUploading}
                disabled={false}
                size="big"
                onOpenStateChange={handleCoverDailogStateChange}
              />
            ) : !formik?.values?.stepSettingOne?.thumbnail ? (
              <img src={'/images/default_card.png'} className={classes.coverImg} />
            ) : (
              <CoverUploaderStream
                src={formik?.values?.stepSettingOne?.thumbnail}
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
    )
  }, [formik?.values?.stepSettingOne?.thumbnail, step, isUploading])

  // const titleInputView = () => {
  //   return (
  //     <ESInput
  //       id='title'
  //       name='stepSettingOne.title'
  //       required={true}
  //       placeholder={i18n.t('common:streaming_setting_screen.placeholder_input_title')}
  //       labelPrimary={i18n.t('common:streaming_setting_screen.label_input_title')}
  //       fullWidth
  //       value={isFirstStep() ? formik?.values?.stepSettingOne?.title : formik?.values?.stepSettingOne?.title.trim()}
  //       onChange={(e) => {
  //         formik.handleChange(e)
  //         handleUpdateValidateField('title')
  //       }}
  //       helperText={
  //         validateField !== 'all'
  //           ? validateField === 'title'
  //             ? formik?.errors?.stepSettingOne?.title
  //             : ''
  //           : checkLiveDisplayErrorOnSubmit(formik, 'title').helperText
  //       }
  //       error={
  //         validateField !== 'all'
  //           ? validateField === 'title'
  //             ? !!formik?.errors?.stepSettingOne?.title
  //             : false
  //           : checkLiveDisplayErrorOnSubmit(formik, 'title').error
  //       }
  //       size='big'
  //       disabled={!isFirstStep()}
  //       className={getAddClassByStep(classes.input_text)}
  //       endAdornment={isFirstStep() &&
  //         <CharacterLimited value={formik.values.stepSettingOne.title} limit={100} />}
  //     />
  //   )
  // }

  const giftInputView = useMemo(() => {
    return (
      <Box>
        {isFirstStep() ? (
          <Box pb={2} pt={2} className={classes.wrap_input_box_switch}>
            <div className={classes.firstItem}>
              <ESLabelWithSwitch
                fullWidth
                labelPrimary={i18n.t('common:streaming_setting_screen.title_gift')}
                valueSwitch={formik?.values?.stepSettingOne?.use_gift}
                handleChangeSwitch={changeFieldAndResetSelectedGift}
              />
            </div>
          </Box>
        ) : (
          <ESLabel label={i18n.t('common:streaming_setting_screen.title_gift')} />
        )}
        {isFirstStep() ? (
          <ESBoxftDashColumn isSelectedGift={formik?.values?.stepSettingOne?.use_gift}>
            <Box className={classes.boxAboutGift}>
              <Box className={classes.select_show_about_gift} pt={1}>
                <label className={classes.labelNavigate} onClick={openGroupList}>
                  {i18n.t('common:streaming_setting_screen.chooses_list_person_gift')}
                </label>
                <Typography className={classes.giftInfoList} variant="body2" onClick={handleListGiftInfo}>
                  <Icon className={`fa fa-info-circle ${classes.iconMargin}`} fontSize="small" />{' '}
                  {i18n.t('common:streaming_setting_screen.about_the_gift_list')}
                </Typography>
              </Box>
              <Box pt={1} className={classes.nameList}>
                <div className={classes.textAndClear}>
                  <Typography className={classes.labelNameObject}>
                    {`${i18n.t('common:streaming_setting_screen.list_gift_selected')} ${
                      formik?.values?.stepSettingOne?.group_title
                        ? formik?.values?.stepSettingOne?.group_title
                        : i18n.t('common:streaming_setting_screen.unselected')
                    }`}
                  </Typography>
                  <Box
                    className={classes.iconClear}
                    style={{ visibility: formik?.values?.stepSettingOne?.group_title ? 'visible' : 'hidden' }}
                    onClick={onClearNameListChip}
                  >
                    <Icon className={`far fa-times-circle ${classes.sizeIconClear}`} />{' '}
                  </Box>
                </div>
              </Box>
              <Box className={classes.select_show_about_gift} pt={1.8} pb={1}>
                <ESCheckboxBig
                  checked={formik?.values?.stepSettingOne?.ranking_flag}
                  onChange={() => formik.setFieldValue('stepSettingOne.ranking_flag', !formik?.values?.stepSettingOne?.ranking_flag)}
                  label={t('common:streaming_setting_screen.individual_gift_ranking_display')}
                  name="stepSettingOne.ranking_flag"
                  classNameLabel={classes.esCheckBox}
                />
                <Typography className={classes.giftInfoList} variant="body2" onClick={handleRankingInfo}>
                  <Icon className={`fa fa-info-circle ${classes.iconMargin}`} fontSize="small" />{' '}
                  {i18n.t('common:streaming_setting_screen.about_individual_gift_ranking')}
                </Typography>
              </Box>
            </Box>
          </ESBoxftDashColumn>
        ) : (
          <Box pb={2} pt={2}>
            <ESBoxftDashColumn colorLine="#767676" isSelectedGift={true}>
              <Box className={classes.newTextftDash}>
                <Box pt={1} className={classes.nameList}>
                  <Typography className={`${classes.labelNameObject} ${classes.labelRank}`}>
                    {`${i18n.t('common:streaming_setting_screen.list_gift_selected')} ${returnTextChip()}`}
                  </Typography>
                </Box>
                <Box className={`${classes.nameList} ${classes.nameListRanking}`}>
                  <Typography className={`${classes.labelNameObject} ${classes.labelRank}`}>
                    {`${i18n.t('common:streaming_setting_screen.individual_gift_ranking_display')}： ${
                      formik?.values?.stepSettingOne?.ranking_flag
                        ? i18n.t('common:streaming_setting_screen.ranking_flag.on')
                        : i18n.t('common:streaming_setting_screen.ranking_flag.off')
                    }`}
                  </Typography>
                </Box>
              </Box>
            </ESBoxftDashColumn>
          </Box>
        )}
      </Box>
    )
  }, [
    formik?.values?.stepSettingOne?.use_gift,
    formik?.values?.stepSettingOne?.group_title,
    formik?.values?.stepSettingOne?.ranking_flag,
    step,
  ])

  const streamUrlView = useMemo(() => {
    return (
      <Box>
        <Box pt={isFirstStep() ? 2 : 0} className={classes.wrap_input} flexDirection="row" display="flex" alignItems="flex-end">
          <Box className={classes.firstItem}>
            <ESInput
              id="stream_url"
              name="stepSettingOne.stream_url"
              labelPrimary={i18n.t('common:streaming_setting_screen.stream_url')}
              placeholder={
                isFirstStep()
                  ? !formik?.values?.stepSettingOne?.stream_url && i18n.t('common:streaming_setting_screen.stream_mask')
                  : !formik?.values?.stepSettingOne?.stream_url && t('common:streaming_setting_screen.issued_stream')
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
              value={formik?.values?.stepSettingOne?.stream_url}
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
                className={!isLive ? classes.urlCopy : classes.linkDisable}
                onClick={() => !isLive && onReNewUrlAndKey(TYPE_SECRET_KEY.URL, TYPE_SECRET_KEY.RE_NEW)}
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
      </Box>
    )
  }, [formik?.values?.stepSettingOne?.stream_url, isLive, showStreamURL, step])

  const streamKeyView = useMemo(() => {
    return (
      <Box pt={2} className={classes.wrap_input} flexDirection="row" display="flex" alignItems="flex-end">
        <Box className={classes.firstItem}>
          <ESInput
            id="stream_key"
            name="stepSettingOne.stream_key"
            labelPrimary={i18n.t('common:streaming_setting_screen.stream_key')}
            placeholder={
              isFirstStep()
                ? !formik?.values?.stepSettingOne?.stream_key && i18n.t('common:streaming_setting_screen.stream_mask')
                : !formik?.values?.stepSettingOne?.stream_key && t('common:streaming_setting_screen.issued_stream')
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
            value={formik?.values?.stepSettingOne?.stream_key}
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

            {/* <Box
                  py={1}
                  display="flex"
                  justifyContent="flex-end"
                  className={showReNew && !isLive ? classes.urlCopy : classes.linkDisable}
                  onClick={() => showReNew && !isLive && onReNewUrlAndKey(TYPE_SECRET_KEY.KEY, TYPE_SECRET_KEY.RE_NEW, true)}
                >
                  <Typography className={classes.textLink}>{t('common:streaming_setting_screen.reissue')}</Typography>
                </Box> */}
          </Box>
        )}
      </Box>
    )
  }, [formik?.values?.stepSettingOne?.stream_key, step, showStreamKey])

  const publishDeliveryView = useMemo(() => {
    return (
      <Box>
        {isFirstStep() ? (
          <Box pb={3 / 8} pt={2}>
            <ESCheckboxBig
              checked={formik?.values?.stepSettingOne?.publish_flag}
              onChange={() => formik.setFieldValue('stepSettingOne.publish_flag', !formik?.values?.stepSettingOne?.publish_flag)}
              label={t('common:streaming_setting_screen.publish_delivery')}
              name="stepSettingOne.publish_flag"
            />
          </Box>
        ) : (
          <Box pt={2} pb={1}>
            <ESInput
              id="title"
              name="title"
              value={!formik?.values?.stepSettingOne?.publish_flag ? t('common:profile.dont_show') : t('common:profile.show')}
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
      </Box>
    )
  }, [formik?.values?.stepSettingOne?.publish_flag, step])

  const submitButtonView = useMemo(() => {
    return (
      <Box>
        {isFirstStep() ? (
          <Grid item xs={12} md={9}>
            <Box maxWidth={280} className={classes.buttonContainer}>
              <ButtonPrimary type="submit" round fullWidth onClick={onValidateForm}>
                {i18n.t('common:streaming_setting_screen.check_submit')}
              </ButtonPrimary>
            </Box>
            <Typography
              className={classes.textErrorGroupDelete}
              style={{ display: formik?.values?.stepSettingOne?.has_group_list ? 'flex' : 'none' }}
            >
              {i18n.t('common:streaming_setting_screen.group_list_does_not_exist')}
            </Typography>
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
                  {obsNotEnable ? i18n.t('common:streaming_setting_screen.update') : t('common:streaming_setting_screen.start_live_stream')}
                </ButtonPrimary>
              </Box>
            </Box>
          </Grid>
        )}
      </Box>
    )
  }, [formik?.values?.stepSettingOne?.has_group_list, obsNotEnable, step])

  const categoryView = useMemo(() => {
    return (
      <Box pb={2} className={classes.wrap_input}>
        <div ref={formRef['category']} className={classes.firstItem}>
          {isFirstStep() ? (
            <ESSelect
              fullWidth
              id="category"
              name="stepSettingOne.category"
              value={formik?.values?.stepSettingOne?.category}
              onChange={(e) => {
                formik.handleChange(e)
                handleUpdateValidateField('category')
              }}
              label={i18n.t('common:streaming_setting_screen.category')}
              required={true}
              size="big"
              helperText={
                validateField !== 'all'
                  ? validateField === 'category'
                    ? formik?.errors?.stepSettingOne?.category
                    : ''
                  : checkLiveDisplayErrorOnSubmit(formik, 'category').helperText
              }
              error={
                validateField !== 'all'
                  ? validateField === 'category'
                    ? !!formik?.errors?.stepSettingOne?.category
                    : false
                  : checkLiveDisplayErrorOnSubmit(formik, 'category').error
              }
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
        </div>
      </Box>
    )
  }, [formik?.values?.stepSettingOne?.category, categoryName, step])

  return (
    <Box py={4} className={classes.container}>
      <Box className={classes.formContainer}>
        {obsStatusDynamo === null && stateChannelArn === null ? (
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
              <Box
                className={classes.countTime}
                style={{
                  visibility:
                    liveStartTime && obsStatusDynamo === TAG_STATUS_RECORD.LIVE_STREAMING && videoStatusDynamo == '1'
                      ? 'visible'
                      : 'hidden',
                }}
              >
                <Typography className={classes.textTagStatus}>{i18n.t('common:streaming_setting_screen.title_count_time')}</Typography>
                <Typography className={classes.textTagStatus} style={{ marginLeft: 16 }}>
                  {countTime}
                </Typography>
              </Box>
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
          {linkUrlView}
          <Box paddingBottom={2} />
          {/* TODO: V3.0 SNS */}
          {shareSnsFlagView}
          {imagePickerInputView}
          <Box pb={2} className={classes.wrap_input}>
            <div ref={formRef['title']} className={classes.firstItem}>
              <ESInput
                id="title"
                name="stepSettingOne.title"
                required={true}
                placeholder={i18n.t('common:streaming_setting_screen.placeholder_input_title')}
                labelPrimary={i18n.t('common:streaming_setting_screen.label_input_title')}
                fullWidth
                value={isFirstStep() ? formik?.values?.stepSettingOne?.title : formik?.values?.stepSettingOne?.title.trim()}
                onChange={(e) => {
                  formik.handleChange(e)
                  handleUpdateValidateField('title')
                }}
                helperText={
                  validateField !== 'all'
                    ? validateField === 'title'
                      ? formik?.errors?.stepSettingOne?.title
                      : ''
                    : checkLiveDisplayErrorOnSubmit(formik, 'title').helperText
                }
                error={
                  validateField !== 'all'
                    ? validateField === 'title'
                      ? !!formik?.errors?.stepSettingOne?.title
                      : false
                    : checkLiveDisplayErrorOnSubmit(formik, 'title').error
                }
                size="big"
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
                endAdornment={isFirstStep() && <CharacterLimited value={formik.values.stepSettingOne.title} limit={100} />}
              />
            </div>
          </Box>
          {descriptionInputView}
          {categoryView}
          {publicTimeViewArchiveInputView}
          {/*TODO: V3.0 form ticket new v3.0 */}
          {ticketPriceInputView}
          {/* gift */}
          {giftInputView}
          {/* stream URL */}
          {streamUrlView}
          {/* stream key */}
          {streamKeyView}
          {publishDeliveryView}
          {submitButtonView}
        </form>
      </Box>
      <Box style={{ display: !visibleLoading && !disableLoader ? 'flex' : 'none' }}>
        <ESLoader open={isPending || isPendingSetting || isLoading} showNote={clickShowText} />
      </Box>
    </Box>
  )
}

export default memo(Steps)

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
      color: Colors.white_opacity['70'],
    },
    '& :-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px transparent inset',
    },
  },
  input_text_ticket: {
    '&.Mui-disabled': {
      color: Colors.white_opacity['70'],
      '& .MuiOutlinedInput-notchedOutline': {
        // borderColor: 'transparent',
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
      padding: '10.5px 14px 10.5px 14px',
      color: Colors.white_opacity['70'],
      borderColor: 'transparent',
    },
    '& :-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px transparent inset',
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
  // coverImg: {
  //   width: 200,
  //   // height: 278,
  //   objectFit: 'cover',
  //   objectPosition: '50% 50%',
  //   borderRadius: 4,
  //   border: `1px solid rgba(255,255,255,0.3)`,
  // },
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
    // color: '#ffffffb3',
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 400,
    '& a': {
      color: '#FF4786',
    },
  },
  select_show_about_gift: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
  firstItemBoxSwitch: {
    // width: '494px',
  },
  wrap_input: {
    paddingLeft: 0,
  },
  wrap_input_box_switch: {
    paddingLeft: 0,
    paddingBottom: 0,
  },
  labelNavigate: {
    fontWeight: 'bold',
    fontSize: theme.typography.h3.fontSize,
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    color: '#FFFFFF70',
    cursor: 'pointer',
  },
  labelNameObject: {
    fontWeight: 'normal',
    fontSize: 14,
    color: '#FFFFFF50',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  giftInfoList: {
    position: 'relative',
    color: Colors.secondary,
    cursor: 'pointer',
    marginLeft: theme.spacing(2),
    fontSize: 10,
  },
  iconMargin: {
    marginRight: theme.spacing(1 / 2),
  },
  boxAboutGift: {
    paddingLeft: 24,
  },
  esCheckBox: {
    color: '#FFFFFF70',
  },
  boxRightTicket: {
    marginLeft: 24,
    marginTop: 10,
  },
  firstItemShort: {
    width: '450px',
  },
  nameList: {
    width: 450,
  },
  newTextftDash: {
    paddingLeft: 22,
  },
  nameListRanking: {
    paddingTop: 8,
  },
  labelRank: {
    paddingBottom: 8,
    color: Colors.white_opacity[70],
  },
  textAndClear: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  iconClear: {
    paddingLeft: 20,
  },
  sizeIconClear: {
    fontSize: 21,
    color: Colors.white_opacity[50],
  },
  countTime: {
    flexDirection: 'row',
    display: 'flex',
    marginLeft: 24,
  },
  textErrorGroupDelete: {
    color: '#F7F735',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.66,
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
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
    wrap_input_box_switch: {
      position: 'relative',
      width: '100%',
      flexWrap: 'wrap-reverse',
      justifyContent: 'flex-end',
    },
    firstItem: {
      width: '100%',
    },
    firstItemBoxSwitch: {
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
    select_show_about_gift: {
      flexDirection: 'column',
      alignItems: 'start',
    },
    boxAboutGift: {
      paddingLeft: 16,
    },
    labelNameObject: {
      marginLeft: 0,
      paddingTop: 8,
    },
    giftInfoList: {
      marginLeft: 0,
      paddingTop: 8,
    },
    boxRightTicket: {
      marginLeft: 16,
      width: '100%',
      marginTop: 8,
    },
    firstItemShort: {
      width: '100%',
    },
    nameList: {
      width: window.innerWidth - 74,
    },
    newTextftDash: {
      paddingLeft: 13,
    },
    nameListRanking: {
      // paddingLeft: 13,
      paddingTop: 8,
    },
    labelRank: {
      paddingTop: 0,
      paddingBottom: 8,
    },
    countTime: {
      marginLeft: 16,
    },
  },
  addPaddingNote: {
    paddingTop: 8,
  },
  root: {
    backgroundColor: Colors.black,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
      borderColor: '#FFFFFF',
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      background: 'rgba(247, 247, 53, 0.1)',
    },
    '& :-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #000000 inset',
    },
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
  dot: (props: { statusRecord?: number | string; channelArn?: string; videoStatusDynamo?: string }) => ({
    width: 12,
    height: 12,
    background:
      props.statusRecord === TAG_STATUS_RECORD.LIVE_STREAMING && props.channelArn !== EVENT_STATE_CHANNEL.STOPPED
        ? '#FF0000'
        : props.statusRecord === TAG_STATUS_RECORD.UPDATED_NOT_START && props.videoStatusDynamo == '3'
        ? 'none'
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
  urlCopyTag: (props: { statusRecord?: number | string; channelArn?: string; videoStatusDynamo?: string | number }) => ({
    paddingLeft: 12,
    cursor:
      (props.statusRecord === TAG_STATUS_RECORD.LIVE_STREAMING ||
        (props.statusRecord === TAG_STATUS_RECORD.UPDATED_NOT_START && props.videoStatusDynamo == 0)) &&
      props.channelArn !== EVENT_STATE_CHANNEL.STOPPED
        ? 'pointer'
        : 'not-allowed',
    color:
      (props.statusRecord === TAG_STATUS_RECORD.LIVE_STREAMING ||
        (props.statusRecord === TAG_STATUS_RECORD.UPDATED_NOT_START && props.videoStatusDynamo == 0)) &&
      props.channelArn !== EVENT_STATE_CHANNEL.STOPPED
        ? '#FF4786'
        : '#B5B5B5',
  }),
}))
