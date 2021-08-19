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
import { validationLDistributorScheme } from '@containers/arena/UpsertForm/FormLiveSettingsModel/ValidationLiveSettingsScheme'
import { FormLiveType } from '@containers/arena/UpsertForm/FormLiveSettingsModel/FormLiveSettingsType'
import { LiveStreamSettingHelper } from '@utils/helpers/LiveStreamSettingHelper'
import { GetChannelResponse, SetChannelParams } from '@services/liveStream.service'
import useLiveSetting from '../useLiveSetting'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { FIELD_TITLES } from '../field_titles.constants'
import { showDialog } from '@store/common/actions'
import { NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import { useAppDispatch } from '@store/hooks'
import ESLoader from '@components/FullScreenLoader'

interface StepsProps {
  step: number
  onNext: (step: number) => void
  channel: GetChannelResponse
}

const Steps: React.FC<StepsProps> = ({ step, onNext, channel }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const [social, setSocial] = useState(null)
  const [hasError, setError] = useState(false)
  const initialValues = getInitialDistributorValues(channel.data ? channel.data : null)
  const formik = useFormik<FormLiveType>({
    initialValues: initialValues,
    validationSchema: validationLDistributorScheme(),
    enableReinitialize: true,
    onSubmit: () => {
      //TODO: smt
    },
  })
  const { setChannelConfirm, isPending, getChannelLive } = useLiveSetting()
  const { checkNgWordFields, checkNgWordByField } = useCheckNgWord()
  const [status, setStatus] = useState<boolean>(false)

  useEffect(() => {
    getChannelInfo()
  }, [])

  useEffect(() => {
    const isRequiredFieldsValid = LiveStreamSettingHelper.checkRequiredFields(3, formik.errors)
    setError(!isRequiredFieldsValid)
  }, [formik.errors.stepSettingThree])

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

  const getChannelInfo = () => {
    getChannelLive().then((res) => {
      checkStatusRecord(res.payload)
      formik.validateForm()
    })
  }

  const checkStatusRecord = (data) => {
    if (!data?.data?.created_at) {
      setStatus(false)
    } else {
      setStatus(true)
    }
  }

  const onClickNext = () => {
    const { stepSettingThree } = formik.values

    const fieldIdentifier = checkNgWordFields({
      name: stepSettingThree.name,
      description: stepSettingThree.description,
    })
    const ngFields = checkNgWordByField({
      [FIELD_TITLES.stepSettingThree.name]: stepSettingThree.name,
      [FIELD_TITLES.stepSettingTwo.description]: stepSettingThree.description,
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

  const onConfirm = () => {
    const { stepSettingThree } = formik.values
    const data: SetChannelParams = {
      ...stepSettingThree,
      name: stepSettingThree.name,
      description: stepSettingThree.description,
      twitter_link: social.twitter_link,
      instagram_link: social.instagram_link,
      discord_link: social.discord_link,
    }
    setChannelConfirm(data, () => {
      onNext(step + 1)
    })
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
              {isFirstStep() ? (
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
              ) : (
                <ESInput
                  labelPrimary={i18n.t('common:streaming_setting_screen.label_overview')}
                  multiline
                  value={formik.values.stepSettingThree.description}
                  disabled={true}
                  fullWidth
                  required
                  size={'big'}
                />
              )}
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
                isFirstStep={isFirstStep()}
              />
            </Box>
          </Box>
          {isFirstStep() ? (
            <Grid item xs={12} md={9}>
              <Box maxWidth={280} className={classes.buttonContainer}>
                <ButtonPrimary type="submit" round fullWidth onClick={onClickNext} disabled={hasError}>
                  {status ? i18n.t('common:streaming_setting_screen.update') : i18n.t('common:streaming_setting_screen.check_submit')}
                </ButtonPrimary>
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
                  <ButtonPrimary round fullWidth onClick={onConfirm}>
                    {i18n.t('common:streaming_setting_screen.save_channel_live_info')}
                  </ButtonPrimary>
                </Box>
              </Box>
            </Grid>
          )}
        </form>
      </Box>
      <ESLoader open={isPending} />
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
    // marginTop: 30,
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
