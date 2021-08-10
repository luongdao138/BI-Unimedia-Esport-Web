import { Box, Grid, Icon, IconButton, InputAdornment, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useFormik } from 'formik'
import ESInput from '@components/Input'
import i18n from '@locales/i18n'
import ESSelect from '@components/Select'
import { RULES } from '@constants/tournament.constants'
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

type ContentParams = {
  linkUrl: string
  title: string
  description: string
  cover_image_url: string
  listData: Array<string>
  streamURL?: string
  streamKey?: string
}
interface StepsProps {
  step: number,
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

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik<ContentParams>({
    initialValues: {
      linkUrl: 'https://cowell-web.exelab.jp/',
      title: '',
      description: '',
      cover_image_url: '',
      listData: [],
      streamURL: 'https://cowell-web.exelab.jp/stream-xxxx',
      streamKey: '',
    },
    onSubmit: () => {
      // onSubmitClicked(values)
    },
  })
  const handleUpload = useCallback(() => {
    // uploadArenaCoverImage(file, blob, 1, true, (imageUrl) => {
    //   formik.setFieldValue('stepOne.cover_image_url', imageUrl)
    // })
  }, [])
  const handleCopy = () => {
    if (values.linkUrl) {
      window.navigator.clipboard.writeText(values.linkUrl.toString())
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
    return step === 1 ? true : false;
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
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="row" alignItems="flex-end">
          <Grid item xs={9}>
            <ESInput
              id="linkUrl"
              value={values.linkUrl}
              onChange={handleChange}
              placeholder={!values.linkUrl && i18n.t('common:streaming_settings_live_streaming_screen.placeholder_input_url')}
              labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_input_url')}
              onBlur={handleBlur}
              fullWidth
              helperText={touched.linkUrl && errors.linkUrl}
              error={touched.linkUrl && !!errors.linkUrl}
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
            )
          }
        </Box>
        <Box paddingBottom={4} />
        <Box pb={4} className={classes.box}>
          <Grid item xs={9}>
            <ESLabel label={i18n.t('common:streaming_settings_live_streaming_screen.thumbnail')} />
            <Box pt={1} className={classes.box}>
              <CoverUploaderStream
                src={values.cover_image_url}
                onChange={handleUpload}
                isUploading={false}
                disabled={!isFirstStep()}
                size="big"
                // onOpenStateChange={handleCoverDailogStateChange}
              />
            </Box>
          </Grid>
        </Box>
        <Box pb={4} className={classes.box}>
          <Grid item xs={9}>
            <ESInput
              id="title"
              required={true}
              placeholder={i18n.t('common:streaming_settings_live_streaming_screen.placeholder_input_title')}
              labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_input_title')}
              fullWidth
              value={isFirstStep() ? values.title : 'テキストテキストテキストテキストここの文字数制限あるの'}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.title && errors.title}
              error={touched.title && !!errors.title}
              size="big"
              disabled={!isFirstStep()}
              className={getAddClassByStep(classes.input_text)}
            />
          </Grid>
        </Box>
        <Box className={classes.box}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <ESFastInput
                id="description"
                multiline
                rows={8}
                placeholder={i18n.t('common:streaming_settings_live_streaming_screen.placeholder_input_description')}
                labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_input_description')}
                fullWidth
                value={isFirstStep() ? values.description : (
                  '番組概要テキストテキストテキストテキストテキストテキストテキストテキスト\n' +
                  'テキストテキストテキストテキストテキストテキストテキストテキストテキス\n' +
                  'トテキストテキストテキストテキストテキストテキストテキストテキストテキ\n' +
                  'ストテキストテキストテ\n' +
                  'https://sample.jp テキストテキスト'

                )}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.description && errors.description}
                error={touched.description && !!errors.description}
                size="big"
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
              />
            </Grid>
          </Grid>
        </Box>
        <Box paddingBottom={3} />
        <Box pb={4} className={classes.box}>
          <Grid item xs={9}>
            {isFirstStep() ? (
                <ESSelect
                  fullWidth
                  name="stepTwo.rule"
                  value={isFirstStep() ? values.listData : 'ゲーム：Apex Legends'}
                  onChange={handleChange}
                  label={i18n.t('common:streaming_settings_live_streaming_screen.category')}
                  required={true}
                  size="big"
                >
                  <option disabled value={-1}>
                    {i18n.t('common:please_select')}
                  </option>
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
                  labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.category')}
                  required
                  disabled={!isFirstStep()}
                  className={getAddClassByStep(classes.input_text)}
                  size="big"
                />
              )
            }
          </Grid>
        </Box>
        {isFirstStep() ? (
            <Box pb={3 / 8}>
              <ESCheckboxBig
                checked={checkboxStates.isTicketUse}
                onChange={handleCheckboxChange}
                label={t('common:streaming_settings_live_streaming_screen.ticket_use')}
                name="isTicketUse"
              />
            </Box>
          ): (
            <ESLabel label={i18n.t('common:streaming_settings_live_streaming_screen.ticket_use')} />
          )
        }
        {/* TODO: Apply component enter point eXeポイント */}
        <Box className={classes.box}>
          <Grid item xs={9}>
            <ESInput
              id="title"
              required={true}
              placeholder={'0'}
              fullWidth
              value={isFirstStep() ? values.title : '利用しない'}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.title && errors.title}
              error={touched.title && !!errors.title}
              size="big"
              disabled={!isFirstStep()}
              className={getAddClassByStep(classes.input_text)}
            />
          </Grid>
        </Box>
        <Box paddingBottom={1} />
        {isFirstStep() ? (
            <Box>
              <ESCheckboxBig
                checked={checkboxStates.isShareSNS}
                onChange={handleCheckboxChange}
                label={t('common:streaming_settings_live_streaming_screen.share_SNS')}
                name="isShareSNS"
              />
            </Box>
          ): (
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
          )
        }
        {/* stream URL */}
        <Box pb={4} py={3} className={classes.box} flexDirection="row" display="flex" alignItems="flex-end">
          <Grid item xs={9}>
            <ESInput
              id="streamURL"
              labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.stream_url')}
              placeholder={!values.streamURL && i18n.t('common:streaming_settings_live_streaming_screen.stream_mask')}
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
                )
                : <></>
                
              }
              fullWidth
              value={values.streamURL}
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
            )
          }
        </Box>
        {/* stream key */}
        <Box className={classes.box} flexDirection="row" display="flex" alignItems="flex-end">
          <Grid item xs={9}>
            <ESInput
              id="streamKey"
              labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.stream_key')}
              placeholder={!values.streamKey && i18n.t('common:streaming_settings_live_streaming_screen.stream_mask')}
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
                  ) : <></>
              }
              fullWidth
              value={values.streamKey}
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
            )
          }
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
          ): (
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
          )
        }
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
                <ButtonPrimary type="submit" round fullWidth onClick={onClickNext}>
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
                    {t('common:streaming_settings_live_streaming_screen.start_live_stream')}
                  </ButtonPrimary>
                </Box>
              </Box>
            </Grid>
          )
        }
        
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
