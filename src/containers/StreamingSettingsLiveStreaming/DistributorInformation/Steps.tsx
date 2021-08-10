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

interface StepsProps {
  step: number,
  onNext: (step: number) => void
}
type ContentParams = {
  channelName: string
  description: string
}

const Steps: React.FC<StepsProps> = ({ step, onNext }) => {
  const classes = useStyles()
  const [profile, setProfile] = useState([])
  const [hasError, setError] = useState(false)
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik<ContentParams>({
    initialValues: { channelName: '', description: '' },
    onSubmit: () => {
      // onSubmitClicked(values)
    },
  })
  const { userProfile } = useGetProfile()
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
        <Box pb={2} className={classes.box}>
          <Grid item xs={9}>
            <ESInput
              id="channelName"
              required={true}
              placeholder={i18n.t('common:streaming_settings_live_streaming_screen.placeholder_channel_name')}
              labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_channel_name')}
              fullWidth
              value={isFirstStep() ? values.channelName : 'テキストテキストテキストテキストここの文字数制限'}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.channelName && errors.channelName}
              error={(touched.channelName && !!errors.channelName) || hasError}
              size="big"
              disabled={!isFirstStep()}
              className={getAddClassByStep(classes.input_text)}
            />
          </Grid>
        </Box>
        <Box pb={2} className={classes.box}>
          <Grid item xs={9}>
            <ESFastInput
              id="description"
              multiline
              rows={12}
              required={true}
              placeholder={i18n.t('common:streaming_settings_live_streaming_screen.placeholder_overview')}
              labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_overview')}
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
        </Box>
        <Box pb={4} className={classes.box}>
          <Grid item xs={9}>
            <Typography variant="h3" gutterBottom className={classes.label}>
              {i18n.t('common:user_profile.sns')}
            </Typography>
            <SnsInfoStream showPreview={isFirstStep() ? false : true} profile={profile} onDataChange={onBasicInfoChanged} handleError={handleError} />
          </Grid>
        </Box>
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
                    {i18n.t('common:common.cancel')}
                  </ESButton>
                </Box>
                <Box className={classes.actionButton}>
                  <ButtonPrimary round fullWidth onClick={onClickNext}>
                    {i18n.t('common:streaming_settings_live_streaming_screen.save_channel_live_info')}
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
  container: {
    // justifyContent: 'center',
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
  [theme.breakpoints.up('md')]: {
    formContainer: {
      marginLeft: theme.spacing(7),
      marginRight: theme.spacing(7),
    },
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
