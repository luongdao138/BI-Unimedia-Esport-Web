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

interface StepsProps {
  onNext: (step: number) => void
}
type ContentParams = {
  channelName: string
  description: string
}
const Steps: React.FC<StepsProps> = ({ onNext }) => {
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
    onNext(2)
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
              value={values.channelName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.channelName && errors.channelName}
              error={(touched.channelName && !!errors.channelName) || hasError}
              size="big"
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
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.description && errors.description}
              error={touched.description && !!errors.description}
              size="big"
            />
          </Grid>
        </Box>
        <Box pb={4} className={classes.box}>
          <Grid item xs={9}>
            <Typography variant="h3" gutterBottom className={classes.label}>
              {i18n.t('common:user_profile.sns')}
            </Typography>
            <SnsInfoStream showPreview={false} profile={profile} onDataChange={onBasicInfoChanged} handleError={handleError} />
          </Grid>
        </Box>
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

export default Steps

const useStyles = makeStyles((theme: Theme) => ({
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
}))
