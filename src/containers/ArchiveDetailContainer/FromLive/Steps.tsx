import { Box, Grid, Icon, makeStyles, Theme, Typography } from '@material-ui/core'
import _ from 'lodash'
import React, { useCallback, useEffect, useRef, useState } from 'react'
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

import { baseViewingURL, GetCategoryResponse } from '@services/liveStream.service'
import useReturnHref from '@utils/hooks/useReturnHref'
import { FORMAT_DATE_TIME_JP, NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import useUploadImage from '@utils/hooks/useUploadImage'
import ESInputDatePicker from '@components/InputDatePicker'
import moment from 'moment'
import Linkify from 'react-linkify'
import { ArchiveDetailFormType } from './ArchiveDetailFromLiveFormData'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { FIELD_TITLES } from '@containers/StreamingSettingContainer/field_titles.constants'
import { showDialog } from '@store/common/actions'
import useArchivedList from '@containers/ArchivedListContainer/useArchivedList'
import useCommonData from '@containers/Lobby/UpsertForm/useCommonData'
import { useRouter } from 'next/router'
import { LiveStreamSettingHelper } from '@utils/helpers/LiveStreamSettingHelper'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import VideoDeleteConfirmModal from '@containers/ArchiveDetailContainer/DeleteVideoConfirmModal/VideoDeleteConfirmModal'
import ESLoader from '@components/FullScreenLoader'
import { CookieData } from '@services/archiveList.service'
import ESBoxftDashColumn from '@components/ESBoxftDashColumn'
import { ESRoutes } from '@constants/route.constants'

interface StepsProps {
  step: number
  onNext: (step: number, isShare?: boolean, post?: { title: string; content: string }) => void
  category: GetCategoryResponse
  formik?: FormikProps<ArchiveDetailFormType>
  isFromSchedule?: boolean
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
  isFromSchedule,
}) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { t } = useTranslation(['common'])
  const [categoryName, setCategoryName] = useState('')
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [validateMode, setValidateMode] = useState('-')
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteErrorMsg, setDeleteMsg] = useState('')

  const { checkVideoNgWordFields, checkVideoNgWordByField } = useCheckNgWord()
  const { getDisplayErrorFieldArchiveEdit } = LiveStreamSettingHelper
  const {
    videoArchivedDetail,
    updateVideoDetail,
    overrideVideoArchive,
    deleteVideoDetail,
    overrideDeleteVideo,
    meta_archive_detail,
    getCookieVideoDownload,
  } = useArchivedList()
  const { user } = useCommonData()

  const formRef = {
    title: useRef(null),
    description: useRef(null),
  }

  useEffect(() => {
    category?.data.forEach((h) => {
      if (Number(h.id) === Number(formik?.values?.category)) {
        setCategoryName(h.name)
      }
    })
  }, [formik?.values?.category, category?.data])

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

  const onSubmit = () => {
    const { title, description, thumbnail, category, publish_flag, video_publish_end_time } = formik.values
    const { uuid } = videoArchivedDetail
    const requestParams = {
      title,
      description,
      thumbnail,
      category,
      uuid,
      user_id: user?.id,
      publish_flag: publish_flag ? 1 : 0,
      video_publish_end_time: video_publish_end_time ? CommonHelper.formatDateTimeJP(video_publish_end_time) : '',
    }

    updateVideoDetail(requestParams, (isSuccess, message, data) => {
      // Show toast
      dispatch(commonActions.addToast(isSuccess ? t('common:archive_detail_screen.update_archive_video_success') : message))
      // Update list
      overrideVideoArchive(data)
      // Back to prev screen
      if (isSuccess) {
        // eslint-disable-next-line no-console
        console.log('backToTopVideo::back::6')
        router.back()
      }
    })
  }

  const onDelete = () => {
    const { uuid } = videoArchivedDetail
    const requestParams = {
      user_id: user?.id,
      video_id: uuid,
    }
    setDeleteLoading(true)
    deleteVideoDetail(requestParams, (isSuccess, message) => {
      setDeleteLoading(false)
      // Update list
      overrideDeleteVideo(uuid)
      // Back to prev screen
      if (isSuccess) {
        // eslint-disable-next-line no-console
        console.log('backToTopVideo::back::7')
        router.back()
      } else {
        setDeleteMsg(message)
      }
    })
  }

  const onClickNext = () => {
    const { values } = formik
    const fieldIdentifier = checkVideoNgWordFields({
      title: values.title,
      description: values.description,
    })
    const ngFields = checkVideoNgWordByField({
      [FIELD_TITLES.stepSettingTwo.title]: values.title,
      [FIELD_TITLES.stepSettingTwo.description]: values.description,
    })
    if (fieldIdentifier) {
      dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: ngFields.join(', ') }))
    } else {
      onSubmit()
    }
  }

  const onValidateForm = () => {
    setValidateMode('all')
    // TODO:
    formik.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        onClickNext()
      } else {
        const errorField = getDisplayErrorFieldArchiveEdit(formik.errors)
        if (formRef[errorField]) {
          window.scrollTo({ behavior: 'smooth', top: formRef[errorField].current.offsetTop - 200 })
        }
      }
    })
  }

  const isFirstStep = () => {
    return step === 1
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

  const handleCloseDeleteModal = () => {
    setDeleteModalVisible(false)
  }

  const handleOpenDeleteModal = () => {
    setDeleteModalVisible(true)
    setDeleteMsg('')
  }

  const handleDownloadVideo = () => {
    const { uuid } = videoArchivedDetail
    if (videoArchivedDetail?.convert_status === 'COMPLETE') {
      const { isChrome } = CommonHelper.getBrowserInfo()
      if (!isChrome) {
        const newTab = window.open('', '_blank')
        getCookieVideoDownload({ video_id: uuid }, async (dataCookie: CookieData) => {
          newTab.location.href = dataCookie?.url
        })
      } else {
        getCookieVideoDownload({ video_id: uuid }, async (dataCookie: CookieData) => {
          window.open(dataCookie?.url, '_blank')
        })
      }
    }
  }

  const handleReportClick = () => {
    const { uuid } = videoArchivedDetail
    router.push({ pathname: ESRoutes.STREAMING_GIFT_REPORT, query: { video_id: uuid } })
  }

  const returnTextChip = () => {
    if (videoArchivedDetail?.use_gift) {
      if (videoArchivedDetail?.group_title) {
        return videoArchivedDetail?.group_title
      } else {
        return i18n.t('common:streaming_setting_screen.unselected')
      }
    } else {
      return i18n.t('common:streaming_setting_screen.ranking_flag.off')
    }
  }

  return (
    <Box py={4} className={classes.container}>
      <Box className={classes.formContainer}>
        <Typography className={classes.textTitleReup}>{i18n.t('common:archive_detail_screen.title')}</Typography>
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
                    src={
                      formik?.values?.thumbnail
                        ? formik?.values?.thumbnail
                        : !formik?.values?.thumbnail && formik?.values?.video_thumbnail
                        ? formik?.values?.video_thumbnail
                        : '/images/default_card.png'
                    }
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
            <div ref={formRef['title']} className={classes.firstItem}>
              <ESInput
                id="title"
                name="title"
                required={true}
                placeholder={i18n.t('common:archive_detail_screen.placeholder_input_title')}
                labelPrimary={i18n.t('common:streaming_setting_screen.label_input_title')}
                fullWidth
                value={isFirstStep() ? formik?.values?.title : formik?.values?.title.trim()}
                onChange={(e) => {
                  formik.handleChange(e)
                  setValidateMode('title')
                }}
                helperText={
                  validateMode === 'all'
                    ? getDisplayErrorFieldArchiveEdit(formik.errors) === 'title' && formik?.errors?.title
                    : validateMode === 'title' && formik?.errors?.title
                }
                error={
                  validateMode === 'all'
                    ? getDisplayErrorFieldArchiveEdit(formik.errors) === 'title'
                    : validateMode === 'title' && !!formik?.errors?.title
                }
                size="big"
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
              />
            </div>
          </Box>

          {/* description */}
          <Box pb={2} className={classes.wrap_input}>
            <div ref={formRef['description']} className={classes.firstItem}>
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
                  onChange={(e) => {
                    formik.handleChange(e)
                    setValidateMode('description')
                  }}
                  helperText={
                    validateMode === 'all'
                      ? getDisplayErrorFieldArchiveEdit(formik.errors) === 'description' && formik?.errors?.title
                      : validateMode === 'description' && formik?.errors?.description
                  }
                  error={
                    validateMode === 'all'
                      ? getDisplayErrorFieldArchiveEdit(formik.errors) === 'description'
                      : validateMode === 'description' && !!formik?.errors?.description
                  }
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
            </div>
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
                  onChange={(e) => {
                    formik.handleChange(e)
                    setValidateMode('category')
                  }}
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

          {isFromSchedule && (
            <Box pb={2}>
              <Box className={classes.label}>{i18n.t('common:archive_detail_screen.notify_date_time')}</Box>
              <Box className={classes.dateTime} pt={1} pl={1}>
                {CommonHelper.formatDateTimeJP(videoArchivedDetail?.stream_notify_time)}
              </Box>
            </Box>
          )}

          {!isFromSchedule && (
            <Box pb={2}>
              <Box className={classes.label}>{i18n.t('common:archive_detail_screen.delivery_date_time')}</Box>
              <Box className={classes.dateTime} pt={1} pl={1}>
                {CommonHelper.formatDateTimeJP(videoArchivedDetail?.live_stream_start_time)}
              </Box>
            </Box>
          )}

          {/* <Box pb={2}>
            <Box className={classes.label}>{i18n.t('common:archive_detail_screen.ticket_amount')}</Box>
            <Box className={classes.dateTime} pt={1} pl={1} height="28px">
              {videoArchivedDetail && videoArchivedDetail?.ticket_price
                ? `${FormatHelper.currencyFormat(videoArchivedDetail?.ticket_price.toString())} ${i18n.t('common:common.eXe_points')}`
                : ''}
            </Box>
          </Box> */}

          {/* V3: ticket */}
          <Box className={classes.label}>{i18n.t('common:streaming_setting_screen.ticket_use')}</Box>
          <Box pb={2} pt={2}>
            <ESBoxftDashColumn colorLine="#767676" isSelectedGift>
              <Box className={classes.newTextftDash}>
                <Box className={classes.dateTime} pt={1} pb={3 / 4} height="34px">
                  {videoArchivedDetail && videoArchivedDetail?.ticket_price
                    ? i18n
                        .t('common:delivery_reservation_tab.ticket_use')
                        .replace('%d', FormatHelper.currencyFormat(videoArchivedDetail?.ticket_price.toString()))
                    : i18n.t('common:delivery_reservation_tab.ticket_not_use')}
                </Box>
                {isFromSchedule && (
                  <Box className={` ${classes.pdLabelDate}`}>
                    <Box className={classes.label}>{i18n.t('common:delivery_reservation_tab.ticket_sales_start_datetime')}</Box>
                    {videoArchivedDetail?.sell_ticket_start_time && (
                      <Box className={classes.dateTime} pt={1}>
                        {CommonHelper.formatDateTimeJP(videoArchivedDetail?.sell_ticket_start_time)}
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            </ESBoxftDashColumn>
          </Box>

          {/* V3: gift */}
          <ESLabel label={i18n.t('common:streaming_setting_screen.title_gift')} />
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
                    {`${i18n.t('common:streaming_setting_screen.individual_gift_ranking_display')}??? ${
                      formik?.values?.ranking_flag
                        ? i18n.t('common:streaming_setting_screen.ranking_flag.on')
                        : i18n.t('common:streaming_setting_screen.ranking_flag.off')
                    }`}
                  </Typography>
                </Box>
              </Box>
            </ESBoxftDashColumn>
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

          <Box onClick={handleReportClick} className={classes.boxFeature}>
            <Box flexDirection="row" display="flex" marginBottom={1}>
              <Box className={classes.wrapIcon}>
                <img src={'/images/icons/report.svg'} className={classes.imageIcon} />
              </Box>
              <Box className={classes.textIcon} pl={1}>
                {i18n.t('common:archive_detail_screen.report_data')}
              </Box>
            </Box>
          </Box>

          <Box flexDirection="row" display="flex" marginBottom={1} onClick={handleDownloadVideo}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className={classes.downloadWrap}
              style={{
                opacity: videoArchivedDetail?.convert_status === 'COMPLETE' ? 1 : 0.3,
                cursor: videoArchivedDetail?.convert_status === 'COMPLETE' ? 'pointer' : 'unset',
              }}
              // download
              // href={videoArchivedDetail?.convert_status === 'COMPLETE' && linkDownload}
            >
              <Box className={classes.wrapIcon}>
                <img src={'/images/icons/download.svg'} className={classes.imageIcon} />
              </Box>
              <Box className={classes.textIcon} pl={1}>
                {i18n.t('common:archive_detail_screen.download_data')}
              </Box>
            </a>
          </Box>
          <Box flexDirection="row" display="flex">
            <Box display="flex" alignItems="flex-end" pb={6} onClick={handleOpenDeleteModal} className={classes.deleteWrap}>
              <Box className={classes.wrapIcon}>
                <img src={'/images/icons/trash.svg'} className={classes.imageIcon} />
              </Box>
              <Box className={classes.textIcon} pl={1}>
                {i18n.t('common:archive_detail_screen.delete_data')}
              </Box>
            </Box>
          </Box>

          {isFirstStep() ? (
            <Box className={classes.wrapBtn}>
              <Grid item xs={12}>
                <Box maxWidth={280} className={classes.buttonContainer}>
                  <ButtonPrimary type="submit" round fullWidth onClick={onValidateForm}>
                    {i18n.t('common:archive_detail_screen.update')}
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
              </Box>
            </Grid>
          )}
        </form>
        <VideoDeleteConfirmModal
          open={deleteModalVisible}
          handleClose={handleCloseDeleteModal}
          handleDeleteVideo={onDelete}
          isLoading={deleteLoading}
          deleteError={deleteErrorMsg}
        />
      </Box>
      <ESLoader open={!meta_archive_detail.loaded && meta_archive_detail.pending} />
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
  downloadWrap: {
    display: 'flex',
    alignItems: 'flex-end',
    cursor: 'pointer',
  },
  deleteWrap: {
    cursor: 'pointer',
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
  pdLabelDate: {
    paddingTop: 10,
    paddingBottom: 11,
  },
  labelNameObject: {
    fontWeight: 'normal',
    fontSize: 14,
    color: '#FFFFFF50',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  textTitleReup: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white_opacity[70],
    marginBottom: 20,
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
    pdLabelDate: {
      paddingTop: 16,
      paddingBottom: 8,
    },
    labelNameObject: {
      marginLeft: 0,
      paddingTop: 8,
    },
    textTitleReup: {
      marginBottom: 15,
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
  boxFeature: {
    flexDirection: 'row',
    display: 'flex',
    cursor: 'pointer',
  },
}))
