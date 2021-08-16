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
import useLiveSetting from '../useLiveSetting'
import { baseViewingURL, TYPE_SETTING } from '@services/liveStream.service'
import useReturnHref from '@utils/hooks/useReturnHref'
import { FIELD_TITLES } from '../field_titles.constants'
import { showDialog } from '@store/common/actions'
import { NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import ESLoader from '@components/FullScreenLoader'
import useGetProfile from '@utils/hooks/useGetProfile'

interface StepsProps {
  step: number
  onNext: (step: number) => void
}

const Steps: React.FC<StepsProps> = ({ step, onNext }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])
  const { liveSettingInformation, getLiveSettingTab, meta } = useLiveSetting()
  const liveInfo = liveSettingInformation.data
  const { userProfile } = useGetProfile()
  const [showStreamURL, setShowStreamURL] = useState(false)
  const [showStreamKey, setShowStreamKey] = useState(false)
  const [hasError, setError] = useState(false)
  const initialValues = getInitialLiveSettingValues(liveInfo)
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

  useEffect(() => {
    getLiveSetting()
  }, [])

  useEffect(() => {
    const isRequiredFieldsValid = LiveStreamSettingHelper.checkRequiredFields(1, formik.errors)
    setError(!isRequiredFieldsValid)
  }, [formik.errors.stepSettingOne])

  const getLiveSetting = () => {
    getLiveSettingTab({ type: TYPE_SETTING.LIVE }).then(() => {
      formik.validateForm()
    })
  }

  const handleUpload = useCallback(() => {
    // uploadArenaCoverImage(file, blob, 1, true, (imageUrl) => {
    //   formik.setFieldValue('stepSettingOne.thumbnail', imageUrl)
    // })
  }, [])

  const handleCopy = () => {
    if (formik.values.stepSettingOne.linkUrl) {
      window.navigator.clipboard.writeText(formik.values.stepSettingOne.linkUrl.toString())
    }
    dispatch(commonActions.addToast(t('common:arena.copy_toast')))
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
      onNext(step + 1)
    }
  }
  const onClickPrev = () => {
    onNext(step - 1)
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
                onClick={handleCopy}
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
                <CoverUploaderStream
                  src={formik.values.stepSettingOne.thumbnail}
                  onChange={handleUpload}
                  isUploading={false}
                  disabled={!isFirstStep()}
                  size="big"
                  onOpenStateChange={handleCoverDailogStateChange}
                />
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
                value={formik.values.stepSettingOne.title}
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
                  {LIVE_CATEGORIES.map((rule, index) => (
                    <option key={index} value={rule.label}>
                      {rule.label}
                    </option>
                  ))}
                </ESSelect>
              ) : (
                <ESInput
                  id="title"
                  name="title"
                  value={formik.values.stepSettingOne.category}
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
          {!paid_delivery_flag && (
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
                  />
                </Box>
              ) : (
                <ESLabel label={i18n.t('common:streaming_setting_screen.ticket_use')} />
              )}
              {/* TODO: Apply component enter point eXeポイント */}
              <Box pb={2} className={classes.box}>
                <Box className={classes.firstItem}>
                  <ESInput
                    id="ticket_price"
                    name="stepSettingOne.ticket_price"
                    required={true}
                    placeholder={'0'}
                    fullWidth
                    value={
                      isFirstStep()
                        ? formik.values.stepSettingOne.ticket_price === 0 || !formik.values.stepSettingOne.use_ticket
                          ? ''
                          : formik.values.stepSettingOne.ticket_price
                        : formik.values.stepSettingOne.use_ticket
                        ? `利用する（${formik.values.stepSettingOne.ticket_price} exeポイント）`
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
                </Box>
              </Box>
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
              />
            </Box>
          ) : (
            <Box pt={2}>
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
          <Box pb={2} pt={2} className={classes.box} flexDirection="row" display="flex" alignItems="flex-end">
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
                type={showStreamURL || formik.values.stepSettingOne.stream_url ? 'text' : 'password'}
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
                value={
                  !formik.values.stepSettingOne.stream_url
                    ? formik.values.stepSettingOne.stream_url
                    : t('common:streaming_setting_screen.issued_stream')
                }
                readOnly={true}
                size="big"
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
              />
            </Box>
            {isFirstStep() && (
              <Box flexDirection="row" display="flex" className={`${classes.lastItem}`}>
                <Box py={1} display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
                  <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
                  <Typography className={classes.textLink}>{t('common:streaming_setting_screen.copy_url')}</Typography>
                </Box>
                <Box py={1} display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
                  <Typography className={classes.textLink}>{t('common:streaming_setting_screen.reissue')}</Typography>
                </Box>
              </Box>
            )}
          </Box>
          {/* stream key */}
          <Box className={classes.box} flexDirection="row" display="flex" alignItems="flex-end">
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
                type={showStreamKey || formik.values.stepSettingOne.stream_key ? 'text' : 'password'}
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
                value={
                  !formik.values.stepSettingOne.stream_key
                    ? formik.values.stepSettingOne.stream_key
                    : t('common:streaming_setting_screen.issued_stream')
                }
                readOnly={true}
                size="big"
                disabled={!isFirstStep()}
                // className={isFirstStep()?getAddClassByStep(classes.input_text):classes.input_pl}
                className={getAddClassByStep(classes.input_text)}
              />
            </Box>
            {isFirstStep() && (
              <Box flexDirection="row" display="flex" className={`${classes.lastItem}`}>
                <Box py={1} display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
                  <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
                  <Typography className={classes.textLink}>{t('common:streaming_setting_screen.copy_url')}</Typography>
                </Box>
                <Box py={1} display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
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
                {/* {hasError &&
                  <Box pt={1} display="flex" flexDirection="column" color={Colors.secondary} style={{ alignItems: 'center' }}>
                    <Typography variant="body2">{'未入力の項目があります。'}</Typography>
                  </Box>} */}
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
                  <ButtonPrimary round fullWidth onClick={onClickNext}>
                    {t('common:streaming_setting_screen.start_live_stream')}
                  </ButtonPrimary>
                </Box>
              </Box>
            </Grid>
          )}
        </form>
      </Box>
      <ESLoader open={meta.pending} />
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
      },
    },
    '& .MuiInputBase-input.Mui-disabled': {
      padding: 0,
      // paddingBottom: theme.spacing(1),
    },
  },
  urlCopy: {
    marginLeft: 12,
    cursor: 'pointer',
    color: '#EB5686',
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
    width: '75%',
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
      top: '-2px',
    },
  },
}))
