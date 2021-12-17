import { Box, Grid, Icon, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
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

// import useLiveSetting from '../useLiveSetting'
import {
  baseViewingURL,
  GetCategoryResponse,
  // SetLiveStreamParams,
  // StreamUrlAndKeyParams,
  // TYPE_SECRET_KEY,
} from '@services/liveStream.service'
import useReturnHref from '@utils/hooks/useReturnHref'
// import { FIELD_TITLES } from '../field_titles.constants'
// import { showDialog } from '@store/common/actions'
import { FORMAT_DATE_TIME_JP } from '@constants/common.constants'
// import useCheckNgWord from '@utils/hooks/useCheckNgWord'
// import ESLoader from '@components/FullScreenLoaderNote'
// import useGetProfile from '@utils/hooks/useGetProfile'
import useUploadImage from '@utils/hooks/useUploadImage'
// import ESNumberInputStream from '@components/NumberInput/stream'
import ESInputDatePicker from '@components/InputDatePicker'
import moment from 'moment'
import Linkify from 'react-linkify'
// import { CommonHelper } from '@utils/helpers/CommonHelper'
import { ArchiveDetailFormType } from './ArchiveDetailFormData'
import { FormatHelper } from '@utils/helpers/FormatHelper'

interface StepsProps {
  step: number
  onNext: (step: number, isShare?: boolean, post?: { title: string; content: string }) => void
  category: GetCategoryResponse
  formik?: FormikProps<ArchiveDetailFormType>
  //   isShare?: boolean
  //   titlePost?: string
  //   contentPost?: string
  //   stateChannelArn?: string
  //   visibleLoading?: boolean
  //   disableLoader?: boolean
}

const KEY_TYPE = {
  URL: 1,
  KEY: 2,
  UUID: 3,
}

const Steps: React.FC<StepsProps> = ({
  step,
  // onNext,
  category,
  formik,
  //   isShare,
  //   titlePost,
  //   contentPost,
  //   stateChannelArn,
  //   visibleLoading,
  //   disableLoader,
}) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])
  const [categoryName, setCategoryName] = useState('')

  //   const { liveSettingInformation, setLiveStreamConfirm, getStreamUrlAndKey, isPending, isPendingSetting } = useLiveSetting()
  // const { userProfile } = useGetProfile()
  // const { checkNgWordFields, checkNgWordByField } = useCheckNgWord()
  // const paid_delivery_flag = userProfile?.attributes?.paid_delivery_flag
  // const [obsNotEnable, setObsNotEnable] = useState<boolean>(false)
  // const [errPublicTime, setErrPublicTime] = useState(false)
  // const [isLive, setIsLive] = useState<boolean>(false)
  // const [isLoading, setLoading] = useState(false)
  // const [clickShowText, setClickShowText] = useState(false)
  // const [renewData, setRenewData] = useState(null)

  //   useEffect(() => {
  //     // getLiveSetting()
  //     // checkStatusRecord(liveSettingInformation)
  //     checkStatus(liveSettingInformation?.data)
  //   }, [liveSettingInformation])

  useEffect(() => {
    category?.data.forEach((h) => {
      if (Number(h.id) === Number(formik?.values?.category)) {
        setCategoryName(h.name)
      }
    })
  }, [formik?.values?.category, category?.data])

  // const removeField = () => {
  //   if (counter <= 1 && isLive) {
  //     formik?.errors?.video_publish_end_time && delete formik?.errors?.video_publish_end_time
  //   }
  //   return formik.errors
  // }

  //   const checkStatus = (data) => {
  //     //check live stream isn't it? 1 - live
  //     const status = data?.status === 1 && data?.live_stream_start_time ? true : false
  //     setIsLive(status)
  //     //if live, disable btn re-new
  //     // setShowReNew(data?.status === 1 && data?.live_stream_start_time ? false : true)
  //     setObsNotEnable(data?.status === 1 ? true : false)
  //     // setStatus(data?.status)
  //   }

  const { uploadLiveStreamThumbnailImage, isUploading } = useUploadImage()
  const handleUpload = useCallback((file: File, blob: any) => {
    uploadLiveStreamThumbnailImage(file, blob, (imageUrl) => {
      formik.setFieldValue('thumbnail', imageUrl)
    })
  }, [])

  const handleCopy = (type: number) => {
    switch (type) {
      case KEY_TYPE.UUID:
        if (window.navigator.clipboard) {
          window.navigator.clipboard.writeText(formik?.values?.linkUrl && `${baseViewingURL}${formik?.values?.linkUrl}`)
        }
        dispatch(commonActions.addToast(t('common:streaming_setting_screen.message_copy')))
        break
      default:
        break
    }
  }

  const onValidateForm = () => {
    formik.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        onClickNext()
      }
    })
  }

  const onClickNext = () => {
    // const { stepSettingOne } = formik.values
    //
    // const fieldIdentifier = checkNgWordFields({
    //   title: title,
    //   description: description,
    //   ticket_price: ticket_price,
    // })
    //
    // const ngFields = checkNgWordByField({
    //   [FIELD_TITLES.title]: title,
    //   [FIELD_TITLES.description]: description,
    //   [FIELD_TITLES.ticket_price]: ticket_price,
    // })
    //
    // if (fieldIdentifier) {
    //   dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: ngFields.join(', ') }))
    // } else {
    //   // setShowStreamKey(false)
    //   // setShowStreamURL(false)
    //   if (checkPublicTime(video_publish_end_time)) {
    //     onNext(step + 1, share_sns_flag, {
    //       title: title,
    //       content: `${baseViewingURL}${linkUrl}`,
    //     })
    //     formik.setFieldValue('step_setting', step + 1)
    //   }
    // }
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
  const handleCoverDialogStateChange = (_open: boolean) => {
    if (hasUCRReturnHref) {
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.height = '100%'
    }
  }

  // const onConfirm = () => {
  // const {
  //   linkUrl,
  //   ticket_price,
  //   use_ticket,
  //   share_sns_flag,
  //   publish_flag,
  //   thumbnail,
  //   title,
  //   description,
  //   category,
  //   stream_url,
  //   stream_key,
  //   video_publish_end_time,
  // } = formik.values.stepSettingOne
  // const data: SetLiveStreamParams = {
  //   // ...formik.values.stepSettingOne,
  //   uuid: linkUrl,
  //   ticket_price: ticket_price + '',
  //   use_ticket: use_ticket === false ? '0' : '1',
  //   share_sns_flag: share_sns_flag === false ? '0' : '1',
  //   publish_flag: publish_flag === false ? '0' : '1',
  //   stream_notify_time: null,
  //   stream_schedule_start_time: null,
  //   stream_schedule_end_time: null,
  //   sell_ticket_start_time: null,
  //   scheduled_flag: 0,
  //   thumbnail: thumbnail,
  //   title: title.trim(),
  //   description: description.trim(),
  //   category: category,
  //   stream_url: stream_url,
  //   stream_key: stream_key,
  //   video_publish_end_time: video_publish_end_time !== null ? CommonHelper.formatDateTimeJP(video_publish_end_time) : null,
  // }
  // setClickShowText(true)
  // setLiveStreamConfirm(data, () => {
  //   onNext(step + 1, share_sns_flag, {
  //     title: formik.values.title,
  //     content: `${baseViewingURL}${formik.values.linkUrl}`,
  //   })
  //   formik.setFieldValue('step_setting', step + 1)
  //   const { left, top } = getBoxPositionOnWindowCenter(550, 400)
  //   if (isShare) {
  //     window
  //       .open(
  //         getTwitterShareUrl(),
  //         '',
  //         `width=550,height=400,location=no,toolbar=no,status=no,directories=no,menubar=no,scrollbars=yes,resizable=no,centerscreen=yes,chrome=yes,left=${left},top=${top}`
  //       )
  //       ?.focus()
  //   }
  // })
  // }

  //   const getBoxPositionOnWindowCenter = function (width, height) {
  //     return {
  //       left: window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2,
  //       top: window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2,
  //     }
  //   }

  //   const getTwitterShareUrl = () => {
  //     return `https://twitter.com/intent/tweet?text=${titlePost}%0a${contentPost}`
  //   }

  //   const checkPublicTime = (time: string): boolean => {
  //     const current = Date.now()
  //     const publicTime = new Date(time).getTime()
  //     if (publicTime >= current || time === null) return true
  //     return false
  //   }

  //   const debouncedHandleRenewURLAndKey = useCallback(
  //     _.debounce((params: StreamUrlAndKeyParams) => {
  //       getStreamUrlAndKey(params, (url, key, arn, data) => {
  //         setRenewData(data)
  //         setLoading(true)
  //         if (data) {
  //           formik.setFieldValue('stream_url', url)
  //           formik.setFieldValue('stream_key', key)
  //           formik.setFieldValue('arn', arn)
  //         }
  //       })
  //     }, 700),
  //     []
  //   )

  //   const onReNewUrlAndKey = (type: string, method: string) => {
  //     const params: StreamUrlAndKeyParams = {
  //       type: method,
  //       objected: type,
  //       is_live: TYPE_SECRET_KEY.LIVE,
  //     }
  //     debouncedHandleRenewURLAndKey(params)
  //   }

  //   useEffect(() => {
  //     //keep (loading + text) when reload page : update + STARTING
  //     setLoading(stateChannelArn === EVENT_STATE_CHANNEL.STARTING && obsNotEnable)
  //     setClickShowText(stateChannelArn === EVENT_STATE_CHANNEL.STARTING && obsNotEnable)
  //     if (isLoading) {
  //       if (!obsNotEnable) {
  //         //created
  //         setLoading(!renewData)
  //         if (stateChannelArn === EVENT_STATE_CHANNEL.STOPPED || stateChannelArn === EVENT_STATE_CHANNEL.UPDATED) {
  //           dispatch(commonActions.addToast(t('common:streaming_setting_screen.renew_success_toast')))
  //         }
  //       } else if (renewData) {
  //         setLoading(!(stateChannelArn === EVENT_STATE_CHANNEL.STOPPED || stateChannelArn === EVENT_STATE_CHANNEL.UPDATED))
  //         if (stateChannelArn === EVENT_STATE_CHANNEL.STOPPED || stateChannelArn === EVENT_STATE_CHANNEL.UPDATED) {
  //           dispatch(commonActions.addToast(t('common:streaming_setting_screen.renew_success_toast')))
  //         }
  //       }
  //     }
  //   }, [stateChannelArn, isLoading, formik?.values?.stream_key])

  return (
    <Box py={4} className={classes.container}>
      <Box className={classes.formContainer}>
        <form onSubmit={formik.handleSubmit}>
          {/* link url */}
          <Box className={classes.wrap_input} display="flex" flexDirection="row" alignItems="flex-end">
            <Box className={classes.firstItem}>
              <ESInput
                id="linkUrl"
                name="linkUrl"
                value={formik?.values?.linkUrl ? `${baseViewingURL}${formik?.values?.linkUrl}` : formik?.values?.linkUrl}
                placeholder={!formik?.values?.linkUrl && i18n.t('common:streaming_setting_screen.placeholder_input_url')}
                labelPrimary={i18n.t('common:archive_detail_screen.label_input_url')}
                fullWidth
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

          {/* thumbnail */}
          <Box pb={2} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              <ESLabel label={i18n.t('common:streaming_setting_screen.thumbnail')} />
              <Box pt={1} className={classes.box}>
                {isFirstStep() ? (
                  <CoverUploaderStream
                    src={formik?.values?.thumbnail}
                    onChange={handleUpload}
                    isUploading={isUploading}
                    disabled={false}
                    size="big"
                    onOpenStateChange={handleCoverDialogStateChange}
                  />
                ) : !formik?.values?.thumbnail ? (
                  <img src={'/images/default_card.png'} className={classes.coverImg} />
                ) : (
                  <CoverUploaderStream
                    src={formik?.values?.thumbnail}
                    onChange={handleUpload}
                    isUploading={isUploading}
                    disabled={!isFirstStep()}
                    size="big"
                    onOpenStateChange={handleCoverDialogStateChange}
                  />
                )}
              </Box>
            </Box>
          </Box>

          {/* title */}
          <Box pb={2} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              <ESInput
                id="title"
                name="title"
                required={true}
                placeholder={i18n.t('common:archive_detail_screen.placeholder_input_title')}
                labelPrimary={i18n.t('common:streaming_setting_screen.label_input_title')}
                fullWidth
                value={isFirstStep() ? formik?.values?.title : formik?.values?.title.trim()}
                onChange={formik.handleChange}
                helperText={formik?.touched?.title && formik?.errors.title}
                error={formik?.touched?.title && !!formik?.errors.title}
                size="big"
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
              />
            </Box>
          </Box>

          {/* description */}
          <Box pb={2} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              {isFirstStep() ? (
                <ESFastInput
                  id="description"
                  name="description"
                  multiline={isFirstStep()}
                  rows={8}
                  required={true}
                  placeholder={i18n.t('common:archive_detail_screen.placeholder_input_description')}
                  labelPrimary={i18n.t('common:streaming_setting_screen.label_input_description')}
                  fullWidth
                  value={formik?.values?.description}
                  onChange={formik.handleChange}
                  helperText={formik?.touched?.description && formik?.errors?.description}
                  error={formik?.touched?.description && !!formik?.errors?.description}
                  size="big"
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
                    <span className={classes.detectLink}> {formik?.values?.description.trim()}</span>
                  </Linkify>
                </>
              )}
            </Box>
          </Box>

          {/* category */}
          <Box pb={2} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              {isFirstStep() ? (
                <ESSelect
                  fullWidth
                  id="category"
                  name="category"
                  value={formik?.values?.category}
                  onChange={formik.handleChange}
                  label={i18n.t('common:streaming_setting_screen.category')}
                  required={true}
                  size="big"
                  helperText={formik?.touched?.category && formik?.errors?.category}
                  error={formik?.touched?.category && !!formik?.errors?.category}
                >
                  <option disabled value={-1}>
                    {i18n.t('common:archive_detail_screen.please_select')}
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

          <Box pb={2}>
            <Box className={classes.label}>{i18n.t('common:archive_detail_screen.notify_date_time')}</Box>
            <Box className={classes.dateTime} pt={1} pl={1}>
              2021年6月20日 10:00
            </Box>
          </Box>

          <Box pb={2}>
            <Box className={classes.label}>{i18n.t('common:archive_detail_screen.delivery_date_time')}</Box>
            <Box className={classes.dateTime} pt={1} pl={1}>
              2021年6月20日 10:00
            </Box>
          </Box>

          <Box pb={2}>
            <Box className={classes.label}>{i18n.t('common:archive_detail_screen.ticket_amount')}</Box>
            <Box className={classes.dateTime} pt={1} pl={1}>
              {`${FormatHelper.currencyFormat('1500')} ${i18n.t('common:common.money')}`}
            </Box>
          </Box>

          <Box pb={2}>
            <Box className={classes.label}>{i18n.t('common:archive_detail_screen.ticket_sale_date_time')}</Box>
            <Box className={classes.dateTime} pt={1} pl={1}>
              2021年6月20日 10:00
            </Box>
          </Box>

          {/* Archive delivery end date and time */}
          <Box pb={2} className={classes.wrap_input} flexDirection="row" display="flex" alignItems="flex-end">
            <Box className={classes.firstItem}>
              <ESLabel label={i18n.t('common:streaming_setting_screen.public_time_title')} required={false} />
              {isFirstStep() ? (
                <ESInputDatePicker
                  name="video_publish_end_time"
                  placeholder={i18n.t('common:streaming_setting_screen.archived_end_time_pl')}
                  fullWidth
                  value={formik?.values?.video_publish_end_time}
                  onChange={(date) => {
                    const temp = moment(date).add(5, 's')
                    formik.setFieldValue('video_publish_end_time', temp)
                  }}
                  helperText={formik?.touched?.video_publish_end_time && formik?.errors?.video_publish_end_time}
                  error={formik?.touched?.video_publish_end_time && !!formik?.errors?.video_publish_end_time}
                  minutesStep={1}
                />
              ) : (
                <Box pt={1}>
                  <Typography className={classes.date}>
                    {formik?.values?.video_publish_end_time !== null
                      ? moment(formik?.values?.video_publish_end_time).format(FORMAT_DATE_TIME_JP)
                      : ''}
                  </Typography>
                </Box>
              )}
            </Box>
            {/* button clear date*/}
            {isFirstStep() && (
              <Box
                flexDirection="row"
                display="flex"
                className={`${classes.lastItem}`}
                marginBottom={formik?.touched?.video_publish_end_time && !!formik?.errors?.video_publish_end_time ? '22px' : 0}
              >
                <Box
                  py={1}
                  display="flex"
                  justifyContent="flex-end"
                  className={classes.urlCopy}
                  onClick={() => {
                    formik.setFieldValue('video_publish_end_time', null)
                  }}
                >
                  <Typography className={formik?.values?.video_publish_end_time ? classes.clearEnable : classes.clearDisable}>
                    <Icon className={`fas fa-times ${classes.clear}`} fontSize="small" />
                    {t('common:streaming_setting_screen.clear')}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          {/* public delivery */}
          {isFirstStep() ? (
            <Box pb={3 / 8}>
              <ESCheckboxBig
                checked={formik?.values?.publish_flag}
                onChange={() => formik.setFieldValue('publish_flag', !formik?.values?.publish_flag)}
                label={t('common:streaming_setting_screen.publish_delivery')}
                name="publish_flag"
              />
            </Box>
          ) : (
            <Box pt={2} pb={1}>
              <ESInput
                id="title"
                name="title"
                value={!formik?.values?.publish_flag ? t('common:profile.dont_show') : t('common:profile.show')}
                fullWidth
                labelPrimary={t('common:streaming_setting_screen.publish_delivery')}
                disabled={true}
                size="big"
                className={getAddClassByStep(classes.input_text)}
              />
            </Box>
          )}

          <Typography className={classes.captionNote}>{i18n.t('common:archive_detail_screen.note_for_publish_delivery_pt')}</Typography>
          <Typography className={classes.captionNote}>{i18n.t('common:archive_detail_screen.note_for_publish_delivery_pb')}</Typography>
          <Box paddingBottom={3} />

          <Box display="flex" alignItems="flex-end" pb={2}>
            <Box className={classes.wrapIcon}>
              <img src={'/images/icons/download.svg'} className={classes.imageIcon} />
            </Box>
            <Box className={classes.textIcon} pl={1}>
              {i18n.t('common:archive_detail_screen.download_data')}
            </Box>
          </Box>
          <Box display="flex" alignItems="flex-end" pb={6}>
            <Box className={classes.wrapIcon}>
              <img src={'/images/icons/trash.svg'} className={classes.imageIcon} />
            </Box>
            <Box className={classes.textIcon} pl={1}>
              {i18n.t('common:archive_detail_screen.delete_data')}
            </Box>
          </Box>

          {isFirstStep() ? (
            <Box className={classes.wrapBtn}>
              <Grid item xs={12}>
                <Box maxWidth={280} className={classes.buttonContainer}>
                  <ButtonPrimary type="submit" round fullWidth onClick={onValidateForm}>
                    {i18n.t('common:streaming_setting_screen.check_submit')}
                  </ButtonPrimary>
                </Box>
              </Grid>
            </Box>
          ) : (
            <Grid item xs={12}>
              <Box className={classes.actionButtonContainer}>
                <Box className={classes.actionButton}>
                  <ESButton
                    className={classes.cancelBtn}
                    variant="outlined"
                    round
                    fullWidth
                    size="large"
                    // onClick={onClickPrev}
                  >
                    {t('common:common.cancel')}
                  </ESButton>
                </Box>
                {/* <Box className={classes.actionButton}>
                  <ButtonPrimary round fullWidth onClick={onConfirm}>
                    {obsNotEnable
                      ? i18n.t('common:streaming_setting_screen.update')
                      : t('common:streaming_setting_screen.start_live_stream')}
                  </ButtonPrimary>
                </Box> */}
              </Box>
            </Grid>
          )}
        </form>
      </Box>
      {/* <Box style={{ display: !visibleLoading && !disableLoader ? 'flex' : 'none' }}>
        <ESLoader open={isPending || isPendingSetting || isLoading} showNote={clickShowText} />
      </Box> */}
    </Box>
  )
}

export default Steps
const useStyles = makeStyles((theme: Theme) => ({
  wrapIcon: {
    marginBottom: '2px',
    display: 'flex',
    alignItems: 'flex-end',
    width: '21px',
    justifyContent: 'center',
  },
  wrapBtn: {
    width: 494,
  },
  imageIcon: {},
  textIcon: {
    fontSize: '12px',
    textDecoration: 'underline',
    color: 'rgb(255 255 255 / 70%)',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  dateTime: {
    fontSize: '14px',
    color: 'rgb(255 255 255 / 30%)',
  },
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
  urlCopy: {
    paddingLeft: 12,
    cursor: 'pointer',
    color: '#EB5686',
  },
  linkDisable: {
    marginLeft: 12,
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
    maxWidth: '573px',
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
    wrapBtn: {
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
      borderColor: '#FFFFFF',
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      background: 'rgba(247, 247, 53, 0.1)',
    },
    '& :-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #000000 inset',
    },
  },
}))
