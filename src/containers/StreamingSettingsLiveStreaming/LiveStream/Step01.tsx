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

type ContentParams = {
  linkUrl: string
  title: string
  description: string
  cover_image_url: string
  listData: Array<string>
  streamURL?: string
  streamKey?: string
}
interface Step01Props {
  onNext: (step: number) => void
}

const Step01: React.FC<Step01Props> = ({ onNext }) => {
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
    onNext(2)
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
            />
          </Grid>
          <Box py={1} display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
            <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
            <Typography>{t('common:streaming_settings_live_streaming_screen.copy_url')}</Typography>
          </Box>
        </Box>
        <Box paddingBottom={4} />
        <Box pb={4} className={classes.box}>
          <Grid item xs={9}>
            <CoverUploaderStream
              src={values.cover_image_url}
              onChange={handleUpload}
              isUploading={false}
              disabled={false}
              size="big"
              // onOpenStateChange={handleCoverDailogStateChange}
            />
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
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.title && errors.title}
              error={touched.title && !!errors.title}
              size="big"
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
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.description && errors.description}
                error={touched.description && !!errors.description}
                size="big"
              />
            </Grid>
          </Grid>
        </Box>
        <Box paddingBottom={3} />
        <Box pb={4} className={classes.box}>
          <Grid item xs={9}>
            <ESSelect
              fullWidth
              name="stepTwo.rule"
              value={values.listData}
              onChange={handleChange}
              label={i18n.t('common:tournament_create.holding_format')}
              required={true}
              size="big"
              disabled={false}
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
          </Grid>
        </Box>
        <Box pb={3 / 8}>
          <ESCheckboxBig
            checked={checkboxStates.isTicketUse}
            onChange={handleCheckboxChange}
            label={t('common:streaming_settings_live_streaming_screen.ticket_use')}
            name="isTicketUse"
          />
        </Box>
        {/* TODO: Apply component enter point eXeポイント */}
        <Box className={classes.box}>
          <Grid item xs={9}>
            <ESInput
              id="title"
              required={true}
              placeholder={'0'}
              fullWidth
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.title && errors.title}
              error={touched.title && !!errors.title}
              size="big"
            />
          </Grid>
        </Box>
        <Box paddingBottom={1} />
        <Box>
          <ESCheckboxBig
            checked={checkboxStates.isShareSNS}
            onChange={handleCheckboxChange}
            label={t('common:streaming_settings_live_streaming_screen.share_SNS')}
            name="isShareSNS"
          />
        </Box>
        {/* stream URL */}
        <Box pb={4} py={3} className={classes.box} flexDirection="row" display="flex" alignItems="flex-end">
          <Grid item xs={9}>
            <ESInput
              id="streamURL"
              labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.stream_url')}
              placeholder={!values.streamURL && i18n.t('common:streaming_settings_live_streaming_screen.stream_mask')}
              type={showStreamURL ? 'text' : 'password'}
              endAdornment={
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
              }
              fullWidth
              value={values.streamURL}
              readOnly={true}
              size="big"
            />
          </Grid>
          <Box flexDirection="row" display="flex">
            <Box py={1} display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
              <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
              <Typography>{t('common:streaming_settings_live_streaming_screen.copy_url')}</Typography>
            </Box>
            <Box py={1} display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
              <Typography>{t('common:streaming_settings_live_streaming_screen.reissue')}</Typography>
            </Box>
          </Box>
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
              }
              fullWidth
              value={values.streamKey}
              readOnly={true}
              size="big"
            />
          </Grid>
          <Box flexDirection="row" display="flex">
            <Box py={1} display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
              <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
              <Typography>{t('common:streaming_settings_live_streaming_screen.copy_url')}</Typography>
            </Box>
            <Box py={1} display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
              <Typography>{t('common:streaming_settings_live_streaming_screen.reissue')}</Typography>
            </Box>
          </Box>
        </Box>
        <Box pb={3 / 8} pt={2}>
          <ESCheckboxBig
            checked={checkboxStates.isReissue}
            onChange={handleCheckboxChange}
            label={t('common:streaming_settings_live_streaming_screen.publish_delivery')}
            name="isReissue"
          />
        </Box>
        <Typography className={classes.captionNote}>
          {i18n.t('common:streaming_settings_live_streaming_screen.note_for_publish_delivery_pt')}
        </Typography>
        <Typography className={classes.captionNote}>
          {i18n.t('common:streaming_settings_live_streaming_screen.note_for_publish_delivery_pb')}
        </Typography>
        <Box paddingBottom={3} />
        <Grid item xs={9}>
          <Box maxWidth={280} className={classes.buttonContainer}>
            <ButtonPrimary type="submit" round fullWidth onClick={onClickNext}>
              {i18n.t('common:streaming_settings_live_streaming_screen.check_submit')}
            </ButtonPrimary>
          </Box>
        </Grid>
      </form>
    </Box>
  )
}

export default Step01
const useStyles = makeStyles((theme: Theme) => ({
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
}))
