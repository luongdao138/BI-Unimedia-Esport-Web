import { Box, Grid, Icon, IconButton, InputAdornment, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import ESInput from '@components/Input'
import i18n from '@locales/i18n'
import ESSelect from '@components/Select'
import { LIVE_CATEGORIES } from '@constants/tournament.constants'
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
interface StepsProps {
  step: number
  onNext: (step: number) => void
}

const Steps: React.FC<StepsProps> = ({ step, onNext }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])
  const [checkboxStates, setCheckboxStates] = useState({
    isTicketUse: false,
    isShareSNS: false,
    isReissue: true,
  })
  const [showStreamURL, setShowStreamURL] = useState(false)
  const [showStreamKey, setShowStreamKey] = useState(false)
  const [hasError, setError] = useState(false)
  const initialValues = getInitialLiveSettingValues()
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
  }, [])

  useEffect(() => {
    const isRequiredFieldsValid = LiveStreamSettingHelper.checkRequiredFields(formik.errors)
    setError(!isRequiredFieldsValid)
  }, [formik.errors])

  const handleUpload = useCallback(() => {
    // uploadArenaCoverImage(file, blob, 1, true, (imageUrl) => {
    //   formik.setFieldValue('stepOne.cover_image_url', imageUrl)
    // })
  }, [])

  const handleCopy = () => {
    if (formik.values.stepSettingOne.linkUrl) {
      window.navigator.clipboard.writeText(formik.values.stepSettingOne.linkUrl.toString())
    }
    dispatch(commonActions.addToast(t('common:arena.copy_toast')))
  }
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxStates({ ...checkboxStates, [event.target.name]: event.target.checked })
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
        <Box display="flex" flexDirection="row" alignItems="flex-end">
          <Grid item xs={9}>
            <ESInput
              id="linkUrl"
              name="stepSettingOne.linkUrl"
              value={formik.values.stepSettingOne.linkUrl}
              placeholder={
                !formik.values.stepSettingOne.linkUrl && i18n.t('common:streaming_settings_live_streaming_screen.placeholder_input_url')
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
        <Box paddingBottom={2} />
        <Box pb={2} className={classes.box}>
          <Grid item xs={9}>
            <ESLabel label={i18n.t('common:streaming_settings_live_streaming_screen.thumbnail')} />
            <Box pt={1} className={classes.box}>
              <CoverUploaderStream
                src={formik.values.stepSettingOne.thumbnail}
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
              id="title"
              name="stepSettingOne.title"
              required={true}
              placeholder={i18n.t('common:streaming_settings_live_streaming_screen.placeholder_input_title')}
              labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_input_title')}
              fullWidth
              value={isFirstStep() ? formik.values.stepSettingOne.title : 'テキストテキストテキストテキストここの文字数制限あるの'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik?.touched?.stepSettingOne?.title && formik?.errors.stepSettingOne?.title}
              error={formik?.touched?.stepSettingOne?.title && !!formik?.errors.stepSettingOne?.title}
              size="big"
              disabled={!isFirstStep()}
              className={getAddClassByStep(classes.input_text)}
            />
          </Grid>
        </Box>
        <Box pb={2} className={classes.box}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <ESFastInput
                id="description"
                name="stepSettingOne.description"
                multiline
                rows={8}
                required={true}
                placeholder={i18n.t('common:streaming_settings_live_streaming_screen.placeholder_input_description')}
                labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_input_description')}
                fullWidth
                value={
                  isFirstStep()
                    ? formik.values.stepSettingOne.description
                    : '番組概要テキストテキストテキストテキストテキストテキストテキストテキスト\n' +
                      'テキストテキストテキストテキストテキストテキストテキストテキストテキス\n' +
                      'トテキストテキストテキストテキストテキストテキストテキストテキストテキ\n' +
                      'ストテキストテキストテ\n' +
                      'https://sample.jp テキストテキスト'
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik?.touched?.stepSettingOne?.description && formik?.errors?.stepSettingOne?.description}
                error={formik?.touched?.stepSettingOne?.description && !!formik?.errors?.stepSettingOne?.description}
                size="big"
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
                id="category"
                name="stepSettingOne.category"
                value={isFirstStep() ? formik.values.stepSettingOne.category : 'ゲーム：Apex Legends'}
                onChange={formik.handleChange}
                label={i18n.t('common:streaming_settings_live_streaming_screen.category')}
                required={true}
                size="big"
              >
                <option disabled value={-1}>
                  {i18n.t('common:please_select')}
                </option>
                {LIVE_CATEGORIES.map((rule, index) => (
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
                labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.category')}
                required
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
                size="big"
              />
            )}
          </Grid>
        </Box>
        {isFirstStep() ? (
          <Box pb={1}>
            <ESCheckboxBig
              checked={formik.values.stepSettingOne.use_ticket}
              onChange={() => {
                formik.setFieldValue('stepSettingOne.use_ticket', !formik.values.stepSettingOne.use_ticket)
              }}
              label={t('common:streaming_settings_live_streaming_screen.ticket_use')}
              name="use_ticket"
            />
          </Box>
        ) : (
          <ESLabel label={i18n.t('common:streaming_settings_live_streaming_screen.ticket_use')} />
        )}
        {/* TODO: Apply component enter point eXeポイント */}
        <Box pb={1} className={classes.box}>
          <Grid item xs={9}>
            <ESInput
              id="ticket_price"
              name="stepSettingOne.ticket_price"
              required={true}
              placeholder={'0'}
              fullWidth
              value={
                isFirstStep()
                  ? formik.values.stepSettingOne.ticket_price === 0
                    ? ''
                    : formik.values.stepSettingOne.ticket_price
                  : '利用しない'
              }
              onChange={formik.handleChange}
              onBlur={formik.values.stepSettingOne.use_ticket && formik.handleBlur}
              helperText={formik?.touched?.stepSettingOne?.ticket_price && formik?.errors?.stepSettingOne?.ticket_price}
              error={formik?.touched?.stepSettingOne?.ticket_price && !!formik?.errors?.stepSettingOne?.ticket_price}
              size="big"
              disabled={!isFirstStep()}
              className={getAddClassByStep(classes.input_text)}
              readOnly={!formik.values.stepSettingOne.use_ticket}
            />
          </Grid>
        </Box>
        {isFirstStep() ? (
          <Box>
            <ESCheckboxBig
              checked={formik.values.stepSettingOne.share_sns_flag}
              onChange={() => {
                formik.setFieldValue('stepSettingOne.share_sns_flag', !formik.values.stepSettingOne.share_sns_flag)
              }}
              label={t('common:streaming_settings_live_streaming_screen.share_SNS')}
              name="share_sns_flag"
            />
          </Box>
        ) : (
          <ESInput
            id="title"
            name="title"
            value={'共有する'}
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
              id="stream_url"
              name="stepSettingOne.stream_url"
              labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.stream_url')}
              placeholder={
                !formik.values.stepSettingOne.stream_url && i18n.t('common:streaming_settings_live_streaming_screen.stream_mask')
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
              id="stream_key"
              name="stepSettingOne.stream_key"
              labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.stream_key')}
              placeholder={
                !formik.values.stepSettingOne.stream_key && i18n.t('common:streaming_settings_live_streaming_screen.stream_mask')
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
              checked={checkboxStates.isReissue}
              onChange={handleCheckboxChange}
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
              {/* {hasError &&
                <Box pt={1} display="flex" flexDirection="column" color={Colors.secondary} style={{ alignItems: 'center' }}>
                  <Typography variant="body2">{'未入力の項目があります。'}</Typography>
                </Box>} */}
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
                  {t('common:streaming_settings_live_streaming_screen.start_live_stream')}
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
