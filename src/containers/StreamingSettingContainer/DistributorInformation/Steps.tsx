import React, { useEffect, useState } from 'react'
import { Box, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { useFormik } from 'formik'
import useGetProfile from '@utils/hooks/useGetProfile'
import _ from 'lodash'
import ESInput from '@components/Input'
import i18n from '@locales/i18n'
import ESFastInput from '@components/FastInput'
import SnsInfoStream from '@components/SnsInfoStream'
import ButtonPrimary from '@components/ButtonPrimary'
import { Colors } from '@theme/colors'
import ESButton from '@components/Button'
import { getInitialLiveSettingValues } from '@containers/arena/UpsertForm/FormLiveSettingsModel/InitialLiveSettingsValues'
import { validationLiveSettingsScheme } from '@containers/arena/UpsertForm/FormLiveSettingsModel/ValidationLiveSettingsScheme'
import { FormLiveType } from '@containers/arena/UpsertForm/FormLiveSettingsModel/FormLiveSettingsType'
import { LiveStreamSettingHelper } from '@utils/helpers/LiveStreamSettingHelper'

interface StepsProps {
  step: number
  onNext: (step: number) => void
}

const Steps: React.FC<StepsProps> = ({ step, onNext }) => {
  const classes = useStyles()
  const [profile, setProfile] = useState([])
  const [hasError, setError] = useState(false)
  const { userProfile } = useGetProfile()
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
    const isRequiredFieldsValid = LiveStreamSettingHelper.checkRequiredFields(3, formik.errors)
    setError(!isRequiredFieldsValid)
  }, [formik.errors])

  useEffect(() => {
    if (userProfile) {
      setProfile([])
    }
  }, [userProfile])
  const handleError = (errors) => {
    setError(!_.isEmpty(errors))
  }
  const onBasicInfoChanged = (data): void => {
    setProfile((prevState) => {
      return { ...prevState, ...data }
    })
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
    <Box py={4} className={classes.container}>
      <Box className={classes.formContainer}>
        <form onSubmit={formik.handleSubmit}>
          <Box pb={2} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              <ESInput
                id="channel_name"
                name="stepSettingThree.channel_name"
                required={true}
                placeholder={i18n.t('common:streaming_setting_screen.placeholder_channel_name')}
                labelPrimary={i18n.t('common:streaming_setting_screen.label_channel_name')}
                fullWidth
                value={isFirstStep() ? formik.values.stepSettingThree.channel_name : 'テキストテキストテキストテキストここの文字数制限'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik?.touched?.stepSettingThree?.channel_name && formik?.errors?.stepSettingThree?.channel_name}
                error={formik?.touched?.stepSettingThree?.channel_name && !!formik?.errors?.stepSettingThree?.channel_name}
                size="big"
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
              />
            </Box>
          </Box>
          <Box pb={2} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              <ESFastInput
                id="overview"
                name="stepSettingThree.overview"
                multiline
                rows={12}
                required={true}
                placeholder={i18n.t('common:streaming_setting_screen.placeholder_overview')}
                labelPrimary={i18n.t('common:streaming_setting_screen.label_overview')}
                fullWidth
                value={
                  isFirstStep()
                    ? formik.values.stepSettingThree.overview
                    : '番組概要テキストテキストテキストテキストテキストテキストテキストテキスト\n' +
                      'テキストテキストテキストテキストテキストテキストテキストテキストテキス\n' +
                      'トテキストテキストテキストテキストテキストテキストテキストテキストテキ\n' +
                      'ストテキストテキストテ\n' +
                      'https://sample.jp テキストテキスト'
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik?.touched?.stepSettingThree?.overview && formik?.errors?.stepSettingThree?.overview}
                error={formik?.touched?.stepSettingThree?.overview && !!formik?.errors?.stepSettingThree?.overview}
                size="big"
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
              />
            </Box>
          </Box>
          <Box pb={4} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              <Typography variant="h3" gutterBottom className={classes.label}>
                {i18n.t('common:user_profile.sns')}
              </Typography>
              <SnsInfoStream
                showPreview={isFirstStep() ? false : true}
                profile={profile}
                onDataChange={onBasicInfoChanged}
                handleError={handleError}
              />
            </Box>
          </Box>
          {isFirstStep() ? (
            <Grid item xs={12}>
              <Box maxWidth={280} className={classes.buttonContainer}>
                <ButtonPrimary type="submit" round fullWidth onClick={onClickNext} disabled={hasError}>
                  {i18n.t('common:streaming_setting_screen.check_submit')}
                </ButtonPrimary>
                {/* {hasError &&
                  <Box pt={1} display="flex" flexDirection="column" color={Colors.secondary} style={{ alignItems: 'center' }}>
                    <Typography variant="body2">{showMessage}</Typography>
                  </Box>} */}
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Box className={classes.actionButtonContainer}>
                <Box className={classes.actionButton}>
                  <ESButton className={classes.cancelBtn} variant="outlined" round fullWidth size="large">
                    {i18n.t('common:common.cancel')}
                  </ESButton>
                </Box>
                <Box className={classes.actionButton}>
                  <ButtonPrimary round fullWidth onClick={onClickNext}>
                    {i18n.t('common:streaming_setting_screen.save_channel_live_info')}
                  </ButtonPrimary>
                </Box>
              </Box>
            </Grid>
          )}
        </form>
      </Box>
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
  forbiddenMessageContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  box: {
    paddingLeft: 0,
  },
  container: {
    display: "flex", 
    justifyContent: "center"
  },
  formContainer: {
    maxWidth: "617px",
  },
  label: {
    paddingRight: theme.spacing(6),
  },
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
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
  captionNote: {
    fontSize: 12,
  },
  actionButtonContainer: {
    '& .MuiButtonBase-root.button-primary': {
      padding: 0,
    },
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
    width: "75%", 
  },
  wrap_input: {
    paddingLeft: 0,
  },
  [theme.breakpoints.down(768)]: {
    container: {
      padding: '34px 24px 32px 24px'
    },
    wrap_input: {
      position: 'relative',
      width: "100%", 
      flexWrap: "wrap-reverse", 
      justifyContent: "flex-end"
    },
    firstItem: {
      width: "100%", 
    },
    lastItem: {
      position: "absolute", 
      top: "-2px"
    }
  },
}))
