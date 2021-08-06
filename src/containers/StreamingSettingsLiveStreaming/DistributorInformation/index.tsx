import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ESInput from '@components/Input'
import i18n from '@locales/i18n'
import { useFormik } from 'formik'
import ESFastInput from '@components/FastInput'
import _ from 'lodash'
import useGetProfile from '@utils/hooks/useGetProfile'
import SnsInfoStream from '@components/SnsInfoStream'

type DistributorInformationContainerParams = {
  channelName: string
  description: string
}

const DistributorInformationContainer: React.FC = () => {
  const classes = useStyles()
  const [profile, setProfile] = useState([])
  const [hasError, setError] = useState(false)
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik<DistributorInformationContainerParams>({
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
  return (
    <Box>
      <Box pb={9} py={4} px={19}>
        <form onSubmit={handleSubmit}>
          <Box px={10} className={classes.box}>
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
          </Box>
          <Box paddingBottom={4} />
          <Box px={10} className={classes.box}>
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
          </Box>
          <Box px={10} className={classes.box}>
            <Typography variant="h3" gutterBottom className={classes.label}>
              {i18n.t('common:user_profile.sns')}
            </Typography>
            <SnsInfoStream profile={profile} onDataChange={onBasicInfoChanged} handleError={handleError} />
          </Box>
        </form>
      </Box>
    </Box>
  )
}
export default DistributorInformationContainer

const useStyles = makeStyles((theme: Theme) => ({
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
  label: {
    marginTop: theme.spacing(3),
    paddingRight: theme.spacing(6),
  },
}))
