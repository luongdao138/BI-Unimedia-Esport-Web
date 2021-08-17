import React, { useEffect, useState } from 'react'
import { Box, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { useFormik } from 'formik'
import _ from 'lodash'
import ESInput from '@components/Input'
import i18n from '@locales/i18n'
import ESFastInput from '@components/FastInput'
import SnsInfoStream from '@components/SnsInfoStream'
import ButtonPrimary from '@components/ButtonPrimary'
import { Colors } from '@theme/colors'
import ESButton from '@components/Button'
import { getInitialDistributorValues } from '@containers/arena/UpsertForm/FormLiveSettingsModel/InitialLiveSettingsValues'
import { validationLiveSettingsScheme } from '@containers/arena/UpsertForm/FormLiveSettingsModel/ValidationLiveSettingsScheme'
import { FormLiveType } from '@containers/arena/UpsertForm/FormLiveSettingsModel/FormLiveSettingsType'
import { LiveStreamSettingHelper } from '@utils/helpers/LiveStreamSettingHelper'
import { GetChannelResponse } from '@services/liveStream.service'

interface StepsProps {
  step: number
  onNext: (step: number) => void
  channel: GetChannelResponse
}

const Steps: React.FC<StepsProps> = ({ step, onNext, channel }) => {
  const classes = useStyles()
  const [social, setSocial] = useState(null)
  const [hasError, setError] = useState(false)
  const initialValues = getInitialDistributorValues(channel.data ? channel.data : null)
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
    setSocial(channel?.data)
  }, [])
  const handleError = (errors) => {
    setError(!_.isEmpty(errors))
  }
  const onBasicInfoChanged = (data): void => {
    setSocial((prevState) => {
      return { ...prevState, ...data }
    })
  }
  const onClickNext = () => {
    onNext(step + 1)
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
  return (
    <Box py={4} className={classes.container}>
      <Box className={classes.formContainer}>
        <form onSubmit={formik.handleSubmit}>
          <Box pb={2} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              <ESInput
                id="name"
                name="stepSettingThree.name"
                required={true}
                placeholder={i18n.t('common:streaming_setting_screen.placeholder_channel_name')}
                labelPrimary={i18n.t('common:streaming_setting_screen.label_channel_name')}
                fullWidth
                value={formik.values.stepSettingThree.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik?.touched?.stepSettingThree?.name && formik?.errors?.stepSettingThree?.name}
                error={formik?.touched?.stepSettingThree?.name && !!formik?.errors?.stepSettingThree?.name}
                size="big"
                disabled={!isFirstStep()}
                className={getAddClassByStep(classes.input_text)}
              />
            </Box>
          </Box>
          <Box paddingBottom={isFirstStep() ? 2 : 3} className={classes.wrap_input}>
            <Box className={classes.firstItem}>
              <ESFastInput
                id="overview"
                name="stepSettingThree.description"
                multiline={isFirstStep()}
                rows={8}
                required={true}
                placeholder={i18n.t('common:streaming_setting_screen.placeholder_overview')}
                labelPrimary={i18n.t('common:streaming_setting_screen.label_overview')}
                fullWidth
                value={formik.values.stepSettingThree.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik?.touched?.stepSettingThree?.description && formik?.errors?.stepSettingThree?.description}
                error={formik?.touched?.stepSettingThree?.description && !!formik?.errors?.stepSettingThree?.description}
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
                social={social}
                onDataChange={onBasicInfoChanged}
                handleError={handleError}
              />
            </Box>
          </Box>
          {isFirstStep() ? (
            <Grid item xs={12} md={9}>
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
                  <ESButton className={classes.cancelBtn} variant="outlined" round fullWidth size="large" onClick={onClickPrev}>
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
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  box: {
    paddingLeft: 0,
  },
  formContainer: {
    maxWidth: '617px',
  },
  label: {
    paddingRight: theme.spacing(6),
  },
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
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
