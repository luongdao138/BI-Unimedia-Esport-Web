import { Box, Grid, Icon, IconButton, InputAdornment, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import ESInput from '@components/Input'
import i18n from '@locales/i18n'
import ESSelect from '@components/Select'
import { RULES } from '@constants/stream_setting.constants'
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
import { getInitialLiveSettingValues } from '@containers/arena/UpsertForm/FormLiveSettingsModel/InitialLiveSettingsValues'
import { validationLiveSettingsScheme } from '@containers/arena/UpsertForm/FormLiveSettingsModel/ValidationLiveSettingsScheme'
import { LiveStreamSettingHelper } from '@utils/helpers/LiveStreamSettingHelper'
import useLiveSetting from '../LiveStream/useLiveSetting'
import useGetProfile from '@utils/hooks/useGetProfile'
import { baseViewingURL, TYPE_SETTING } from '@services/liveStream.service'

interface StepsProps {
  step: number
  onNext: (step: number) => void
}

const Steps: React.FC<StepsProps> = ({ step, onNext }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])
  const { liveSettingInformation, getLiveSettingTab } = useLiveSetting()
  const { userProfile } = useGetProfile()
  const liveInfo = liveSettingInformation.data
  const user_id = parseInt(userProfile?.id)
  const [showStreamURL, setShowStreamURL] = useState(false)
  const [showStreamKey, setShowStreamKey] = useState(false)
  const [hasError, setError] = useState(false)
  const initialValues = getInitialLiveSettingValues(!liveInfo ? liveInfo : null)
  const formik = useFormik<FormLiveType>({
    initialValues: initialValues,
    validationSchema: validationLiveSettingsScheme(),
    enableReinitialize: true,
    onSubmit: () => {
      //TODO: smt
    },
  })

  useEffect(() => {
    formik.validateForm()
    getLiveSetting()
  }, [])

  const getLiveSetting = () => {
    getLiveSettingTab({ type: TYPE_SETTING.SCHEDULE, user_id: user_id })
  }
  useEffect(() => {
    const isRequiredFieldsValid = LiveStreamSettingHelper.checkRequiredFields(2, formik.errors)
    setError(!isRequiredFieldsValid)
  }, [formik.errors])

  const handleUpload = useCallback(() => {
    // uploadArenaCoverImage(file, blob, 1, true, (imageUrl) => {
    //   formik.setFieldValue('stepOne.cover_image_url', imageUrl)
    // })
  }, [])
  const handleCopy = () => {
    if (formik.values.stepSettingTwo.viewing_url) {
      window.navigator.clipboard.writeText(formik.values.stepSettingTwo.viewing_url.toString())
    }
    dispatch(commonActions.addToast(t('common:arena.copy_toast')))
  }

  const onClickNext = () => {
    onNext(step + 1)
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

  return (
    <Box pb={9} py={4} className={classes.formContainer} maxWidth="md">
      <form onSubmit={formik.handleSubmit}>
        <Box pb={2} display="flex" flexDirection="row" alignItems="flex-end">
          <Grid item xs={9}>
            <ESInput
              id="viewing_url"
              name="stepSettingTwo.viewing_url"
              value={
                formik.values.stepSettingTwo.viewing_url
                  ? `${baseViewingURL}${formik.values.stepSettingTwo.viewing_url}`
                  : formik.values.stepSettingTwo.viewing_url
              }
              placeholder={
                !formik.values.stepSettingTwo.viewing_url && i18n.t('common:streaming_settings_live_streaming_screen.placeholder_input_url')
              }
              labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_input_url')}
              fullWidth
              rows={8}
              readOnly={true}
              size="big"
              disabled={!isFirstStep()}
              className={getAddClassByStep(classes.input_text)}
            />
          </Grid>
          {isFirstStep() && (
            <Box py={1} display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
              <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
              <Typography>{t('common:streaming_settings_live_streaming_screen.copy_url')}</Typography>
            </Box>
          )}
        </Box>
        <Box pb={2} className={classes.box}>
          <Grid item xs={9}>
            <ESLabel label={i18n.t('common:streaming_settings_live_streaming_screen.thumbnail')} />
            <Box pt={1} className={classes.box}>
              <CoverUploaderStream
                src={formik.values.stepSettingTwo.re_thumbnail}
                onChange={handleUpload}
                isUploading={false}
                disabled={!isFirstStep()}
                size="big"
                // onOpenStateChange={handleCoverDailogStateChange}
              />
            </Box>
          </Grid>
        </Box>
        <Box pb={2} className={classes.box}>
          <Grid item xs={9}>
            <ESInput
              id="re_title"
              name="stepSettingTwo.re_title"
              required={true}
              placeholder={i18n.t('common:streaming_settings_live_streaming_screen.placeholder_input_title')}
              labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_input_title')}
              fullWidth
              value={isFirstStep() ? formik.values.stepSettingTwo.re_title : 'テキストテキストテキストテキストここの文字数制限あるの'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik?.touched?.stepSettingTwo?.re_title && formik?.errors?.stepSettingTwo?.re_title}
              error={formik?.touched?.stepSettingTwo?.re_title && !!formik?.errors?.stepSettingTwo?.re_title}
              size="big"
              disabled={!isFirstStep()}
              className={getAddClassByStep(classes.input_text)}
            />
          </Grid>
        </Box>
        <Box pb={1} className={classes.box}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <ESFastInput
                id="re_description"
                name="stepSettingTwo.re_description"
                multiline
                rows={8}
                placeholder={i18n.t('common:streaming_settings_live_streaming_screen.placeholder_input_description')}
                labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_input_description')}
                fullWidth
                value={
                  isFirstStep()
                    ? formik.values.stepSettingTwo.re_description
                    : '番組概要テキストテキストテキストテキストテキストテキストテキストテキスト\n' +
                      'テキストテキストテキストテキストテキストテキストテキストテキストテキス\n' +
                      'トテキストテキストテキストテキストテキストテキストテキストテキストテキ\n' +
                      'ストテキストテキストテ\n' +
                      'https://sample.jp テキストテキスト'
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik?.touched?.stepSettingTwo?.re_description && formik?.errors?.stepSettingTwo?.re_description}
                error={formik?.touched?.stepSettingTwo?.re_description && !!formik?.errors?.stepSettingTwo?.re_description}
                size="big"
                required
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
              />
            </Grid>
          </Grid>
        </Box>
        <Box pb={2} className={classes.box}>
          <Grid item xs={9}>
            {isFirstStep() ? (
              <ESSelect
                fullWidth
                name="stepSettingTwo.re_category"
                value={formik.values.stepSettingTwo.re_category}
                onChange={formik.handleChange}
                label={i18n.t('common:delivery_reservation_tab.category')}
                required={true}
                size="big"
                disabled={false}
              >
                {RULES.map((rule, index) => (
                  <option key={index} value={rule.value}>
                    {rule.label}
                  </option>
                ))}
              </ESSelect>
            ) : (
              <ESInput
                id="title"
                name="title"
                value={'ゲーム：Apex Legends'}
                fullWidth
                labelPrimary={i18n.t('common:delivery_reservation_tab.category')}
                required
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
                size="big"
              />
            )}
          </Grid>
        </Box>
        <Box pb={2} className={classes.box}>
          <Grid item xs={9}>
            <ESLabel label={i18n.t('common:delivery_reservation_tab.notification_datetime')} required />
            {isFirstStep() ? (
              <ESInputDatePicker
                name="stepSettingTwo.date_time_notification_delivery"
                placeholder={i18n.t('common:delivery_reservation_tab.notification_datetime')}
                fullWidth
                value={formik.values.stepSettingTwo.date_time_notification_delivery}
                onChange={(date) => formik.setFieldValue('stepSettingTwo.date_time_notification_delivery', date.toString())}
                onBlur={formik.handleBlur}
                helperText={
                  (formik?.touched?.stepSettingTwo?.date_time_notification_delivery &&
                    formik?.errors?.stepSettingTwo?.date_time_notification_delivery) ||
                  formik?.errors?.stepSettingTwo?.notify_live_start_date ||
                  formik?.errors?.stepSettingTwo?.notify_live_end_date
                }
                error={
                  formik?.touched?.stepSettingTwo?.date_time_notification_delivery &&
                  !!formik?.errors?.stepSettingTwo?.date_time_notification_delivery
                }
                disabled={false}
              />
            ) : (
              <>
                <Box>2021年6月20日 10:00</Box>
              </>
            )}
          </Grid>
        </Box>
        <Box pb={2} className={classes.box}>
          <Grid item xs={9}>
            <ESLabel label={i18n.t('common:delivery_reservation_tab.scheduled_delivery_start_datetime')} required />
            {isFirstStep() ? (
              <ESInputDatePicker
                name="stepSettingTwo.date_time_schedule_delivery_start"
                placeholder={i18n.t('common:delivery_reservation_tab.scheduled_delivery_start_datetime')}
                fullWidth
                value={formik.values.stepSettingTwo.date_time_schedule_delivery_start}
                onChange={(date) => formik.setFieldValue('stepSettingTwo.date_time_schedule_delivery_start', date.toString())}
                onBlur={formik.handleBlur}
                helperText={
                  (formik?.touched?.stepSettingTwo?.date_time_schedule_delivery_start &&
                    formik?.errors?.stepSettingTwo?.date_time_schedule_delivery_start) ||
                  formik?.errors?.stepSettingTwo?.schedule_live_date
                }
                error={
                  formik?.touched?.stepSettingTwo?.date_time_schedule_delivery_start &&
                  !!formik?.errors?.stepSettingTwo?.date_time_schedule_delivery_start
                }
                disabled={false}
              />
            ) : (
              <>
                <Box>2021年7月1日 15:45</Box>
              </>
            )}
          </Grid>
        </Box>
        <Box pb={2} className={classes.box}>
          <Grid item xs={9}>
            <ESLabel label={i18n.t('common:delivery_reservation_tab.scheduled_end_datetime')} required />
            {isFirstStep() ? (
              <ESInputDatePicker
                name="stepSettingTwo.date_time_schedule_end"
                placeholder={i18n.t('common:delivery_reservation_tab.scheduled_end_datetime')}
                fullWidth
                value={formik.values.stepSettingTwo.date_time_schedule_end}
                onChange={(date) => formik.setFieldValue('stepSettingTwo.date_time_schedule_end', date.toString())}
                onBlur={formik.handleBlur}
                helperText={
                  (formik?.touched?.stepSettingTwo?.date_time_schedule_end && formik?.errors?.stepSettingTwo?.date_time_schedule_end) ||
                  formik?.errors?.stepSettingTwo?.schedule_live_date
                }
                error={formik?.touched?.stepSettingTwo?.date_time_schedule_end && !!formik?.errors?.stepSettingTwo?.date_time_schedule_end}
                disabled={false}
              />
            ) : (
              <>
                <Box>2021年7月1日 18:45</Box>
              </>
            )}
          </Grid>
        </Box>
        {isFirstStep() ? (
          <Box pb={3 / 8}>
            <ESCheckboxBig
              checked={formik.values.stepSettingTwo.re_use_ticket}
              onChange={() => formik.setFieldValue('stepSettingTwo.re_use_ticket', !formik.values.stepSettingTwo.re_use_ticket)}
              label={t('common:streaming_settings_live_streaming_screen.ticket_use')}
              name="isTicketUse"
            />
          </Box>
        ) : (
          <ESLabel label={i18n.t('common:streaming_settings_live_streaming_screen.ticket_use')} />
        )}
        {/* TODO: Apply component enter point eXeポイント */}
        <Box pb={2} className={classes.box}>
          <Grid item xs={9}>
            <ESInput
              id="re_ticket_price"
              name="stepSettingTwo.re_ticket_price"
              required={true}
              placeholder={'1,500'}
              fullWidth
              value={formik.values.stepSettingTwo.re_ticket_price}
              onChange={formik.handleChange}
              onBlur={formik.values.stepSettingTwo.re_use_ticket && formik.handleBlur}
              helperText={formik?.touched?.stepSettingTwo?.re_ticket_price && formik?.errors?.stepSettingTwo?.re_ticket_price}
              error={formik?.touched?.stepSettingTwo?.re_ticket_price && !!formik?.errors?.stepSettingTwo?.re_ticket_price}
              size="big"
              disabled={!isFirstStep()}
              className={getAddClassByStep(classes.input_text)}
              readOnly={!formik.values.stepSettingTwo.re_use_ticket}
            />
          </Grid>
        </Box>
        <Box pb={2} className={classes.box}>
          <Grid item xs={9}>
            <ESLabel
              label={i18n.t('common:delivery_reservation_tab.ticket_sales_start_datetime')}
              required={formik.values.stepSettingTwo.re_use_ticket}
            />
            {isFirstStep() ? (
              <ESInputDatePicker
                name="stepSettingTwo.date_time_ticket_sale_start"
                placeholder={i18n.t('common:delivery_reservation_tab.ticket_sales_start_datetime')}
                fullWidth
                value={
                  formik.values.stepSettingTwo.re_use_ticket
                    ? new Date().toString()
                    : formik.values.stepSettingTwo.date_time_ticket_sale_start
                }
                onChange={(date) => formik.setFieldValue('stepSettingTwo.date_time_ticket_sale_start', date.toString())}
                onBlur={formik.handleBlur}
                helperText={
                  formik?.touched?.stepSettingTwo?.date_time_ticket_sale_start &&
                  formik?.errors?.stepSettingTwo?.date_time_ticket_sale_start
                }
                error={
                  formik?.touched?.stepSettingTwo?.date_time_ticket_sale_start &&
                  !!formik?.errors?.stepSettingTwo?.date_time_ticket_sale_start
                }
                readOnly={!formik.values.stepSettingTwo.re_use_ticket}
              />
            ) : (
              <>
                <Box>2021年6月20日 10:00</Box>
              </>
            )}
          </Grid>
        </Box>
        {isFirstStep() ? (
          <Box>
            <ESCheckboxBig
              checked={formik.values.stepSettingTwo.re_share_sns_flag}
              onChange={() => formik.setFieldValue('stepSettingTwo.re_share_sns_flag', !formik.values.stepSettingTwo.re_share_sns_flag)}
              label={t('common:streaming_settings_live_streaming_screen.share_SNS')}
              name="isShareSNS"
            />
          </Box>
        ) : (
          <ESInput
            id="title"
            name="title"
            value={'共有しない'}
            fullWidth
            labelPrimary={t('common:streaming_settings_live_streaming_screen.share_SNS')}
            disabled={true}
            size="big"
            className={getAddClassByStep(classes.input_text)}
          />
        )}
        {/* stream URL */}
        <Box pb={2} pt={2} className={classes.box} flexDirection="row" display="flex" alignItems="flex-end">
          <Grid item xs={9}>
            <ESInput
              id="re_stream_url"
              name="stepSettingTwo.re_stream_url"
              labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.stream_url')}
              placeholder={
                !formik.values.stepSettingTwo.re_stream_url && i18n.t('common:streaming_settings_live_streaming_screen.stream_mask')
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
              value={formik.values.stepSettingTwo.re_stream_url}
              readOnly={true}
              size="big"
              disabled={!isFirstStep()}
              className={getAddClassByStep(classes.input_text)}
            />
          </Grid>
          {isFirstStep() && (
            <Box flexDirection="row" display="flex">
              <Box py={1} display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
                <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
                <Typography>{t('common:streaming_settings_live_streaming_screen.copy_url')}</Typography>
              </Box>
              <Box py={1} display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
                <Typography>{t('common:streaming_settings_live_streaming_screen.reissue')}</Typography>
              </Box>
            </Box>
          )}
        </Box>
        {/* stream key */}
        <Box className={classes.box} flexDirection="row" display="flex" alignItems="flex-end">
          <Grid item xs={9}>
            <ESInput
              id="re_stream_key"
              name="stepSettingTwo.re_stream_key"
              labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.stream_key')}
              placeholder={
                !formik.values.stepSettingTwo.re_stream_key && i18n.t('common:streaming_settings_live_streaming_screen.stream_mask')
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
              value={formik.values.stepSettingTwo.re_stream_key}
              readOnly={true}
              size="big"
              disabled={!isFirstStep()}
              className={getAddClassByStep(classes.input_text)}
            />
          </Grid>
          {isFirstStep() && (
            <Box flexDirection="row" display="flex">
              <Box py={1} display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
                <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
                <Typography>{t('common:streaming_settings_live_streaming_screen.copy_url')}</Typography>
              </Box>
              <Box py={1} display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
                <Typography>{t('common:streaming_settings_live_streaming_screen.reissue')}</Typography>
              </Box>
            </Box>
          )}
        </Box>
        {isFirstStep() ? (
          <Box pb={3 / 8} pt={2}>
            <ESCheckboxBig
              checked={formik.values.stepSettingTwo.re_publish_flag}
              onChange={() => formik.setFieldValue('stepSettingTwo.re_publish_flag', !formik.values.stepSettingTwo.re_publish_flag)}
              label={t('common:streaming_settings_live_streaming_screen.publish_delivery')}
              name="isReissue"
            />
          </Box>
        ) : (
          <ESInput
            id="title"
            name="title"
            value={'公開する'}
            fullWidth
            labelPrimary={t('common:streaming_settings_live_streaming_screen.publish_delivery')}
            disabled={true}
            size="big"
            className={getAddClassByStep(classes.input_text)}
          />
        )}
        <Typography className={classes.captionNote}>
          {i18n.t('common:streaming_settings_live_streaming_screen.note_for_publish_delivery_pt')}
        </Typography>
        <Typography className={classes.captionNote}>
          {i18n.t('common:streaming_settings_live_streaming_screen.note_for_publish_delivery_pb')}
        </Typography>
        <Box paddingBottom={3} />
        {isFirstStep() ? (
          <Grid item xs={9}>
            <Box maxWidth={280} className={classes.buttonContainer}>
              <ButtonPrimary type="submit" round fullWidth onClick={onClickNext} disabled={hasError}>
                {i18n.t('common:streaming_settings_live_streaming_screen.check_submit')}
              </ButtonPrimary>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={6} sm={8} md={8} lg={6}>
            <Box className={classes.actionButtonContainer}>
              <Box className={classes.actionButton}>
                <ESButton className={classes.cancelBtn} variant="outlined" round fullWidth size="large">
                  {t('common:common.cancel')}
                </ESButton>
              </Box>
              <Box className={classes.actionButton}>
                <ButtonPrimary round fullWidth onClick={onClickNext}>
                  {t('common:delivery_reservation_tab.delivery_data_save')}
                </ButtonPrimary>
              </Box>
            </Box>
          </Grid>
        )}
      </form>
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
      padding: 0,
      // paddingBottom: theme.spacing(1),
    },
  },
  urlCopy: {
    marginLeft: 11,
    cursor: 'pointer',
    color: '#EB5686',
    textDecoration: 'underline',
  },
  link: {
    marginRight: 5,
    fontSize: 14,
    paddingTop: 3,
  },
  box: {
    paddingLeft: 0,
  },
  [theme.breakpoints.up('md')]: {
    formContainer: {
      marginLeft: theme.spacing(7),
      marginRight: theme.spacing(7),
    },
  },
  inputContainer: {
    position: 'relative',
    paddingRigth: 7,
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
}))
