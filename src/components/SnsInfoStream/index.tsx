import React from 'react'
import { useEffect } from 'react'
import { Grid, makeStyles, Box } from '@material-ui/core'
import { useFormik } from 'formik'
import ESButtonTwitterCircle from '@components/Button/TwitterCircle'
import ESButtonInstagramCircle from '@components/Button/InstagramCircle'
import ESButtonDiscordCircle from '@components/Button/DiscordCircle'
import i18n from '@locales/i18n'
import ESInput from '@components/Input'
import { Colors } from '@theme/colors'
import { FormLiveType } from '@containers/arena/UpsertForm/FormLiveSettingsModel/FormLiveSettingsType'
import { getInitialDistributorValues } from '@containers/arena/UpsertForm/FormLiveSettingsModel/InitialLiveSettingsValues'
import { validationLDistributorScheme } from '@containers/arena/UpsertForm/FormLiveSettingsModel/ValidationLiveSettingsScheme'

export type SnsInfoParams = {
  instagram_link: string
  twitter_link: string
  discord_link: string
}

interface SnsInfoStreamProps {
  social: any
  onDataChange: (data: any) => void
  handleError: (error) => void
  showPreview?: boolean
}

const SnsInfoStream: React.FC<SnsInfoStreamProps> = ({ social, onDataChange, handleError, showPreview = false }) => {
  const classes = useStyles()

  const initialValues = getInitialDistributorValues(social)

  const { handleChange, values, errors } = useFormik<FormLiveType>({
    initialValues: initialValues,
    validationSchema: validationLDistributorScheme(),
    enableReinitialize: true,
    onSubmit: (_) => null,
  })

  useEffect(() => {
    onDataChange({
      instagram_link: values.stepSettingThree.instagram_link?.trim(),
      twitter_link: values.stepSettingThree.twitter_link?.trim(),
      discord_link: values.stepSettingThree.discord_link?.trim(),
    })
  }, [values])

  useEffect(() => {
    handleError(errors)
  }, [errors])

  const getAddClassByShowPreview = (addClass: string, otherClass?: string) => {
    if (showPreview === true) {
      return ' ' + addClass
    } else {
      return otherClass ? ' ' + otherClass : ''
    }
  }

  return (
    <Box className={classes.container}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
              <ESButtonDiscordCircle onlyIcon={true} className={classes.icon} />
              <ESInput
                id="discord_link"
                name="stepSettingThree.discord_link"
                fullWidth
                value={values.stepSettingThree.discord_link}
                onChange={handleChange}
                helperText={errors?.stepSettingThree?.discord_link}
                placeholder={i18n.t('common:streaming_setting_screen.discord_placeholder')}
                error={!!errors?.stepSettingThree?.discord_link}
                disabled={showPreview}
                className={getAddClassByShowPreview(classes.input_text)}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
              <ESButtonTwitterCircle onlyIcon={true} className={classes.icon} />
              <ESInput
                id="twitter_link"
                name="stepSettingThree.twitter_link"
                fullWidth
                value={values.stepSettingThree.twitter_link}
                onChange={handleChange}
                helperText={errors?.stepSettingThree?.twitter_link}
                error={!!errors?.stepSettingThree?.twitter_link}
                placeholder={i18n.t('common:streaming_setting_screen.twitter_placeholder')}
                disabled={showPreview}
                className={getAddClassByShowPreview(classes.input_text)}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
              <ESButtonInstagramCircle onlyIcon={true} className={classes.icon} />
              <ESInput
                id="instagram_link"
                name="stepSettingThree.instagram_link"
                fullWidth
                value={values.stepSettingThree.instagram_link}
                onChange={handleChange}
                helperText={errors?.stepSettingThree?.instagram_link}
                error={!!errors?.stepSettingThree?.instagram_link}
                placeholder={i18n.t('common:streaming_setting_screen.instagram_placeholder')}
                disabled={showPreview}
                className={getAddClassByShowPreview(classes.input_text)}
              />
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
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
    marginTop: 0,
  },
  icon: {
    marginRight: 8,
  },
  root: {
    backgroundColor: Colors.black,
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
}))

export default SnsInfoStream
