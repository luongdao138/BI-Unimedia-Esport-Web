import React from 'react'
import { useEffect } from 'react'
import { Grid, makeStyles, Box } from '@material-ui/core'
import { useFormik } from 'formik'
import Yup from '@utils/Yup'
import ESButtonTwitterCircle from '@components/Button/TwitterCircle'
import ESButtonInstagramCircle from '@components/Button/InstagramCircle'
import ESButtonDiscordCircle from '@components/Button/DiscordCircle'
import i18n from '@locales/i18n'
import ESInput from '@components/Input'

export type SnsInfoParams = {
  instagram_link: string
  twitter_link: string
  discord_link: string
}

interface SnsInfoStreamProps {
  profile: any
  onDataChange: (data: any) => void
  handleError: (error) => void
}

const SnsInfoStream: React.FC<SnsInfoStreamProps> = ({ profile, onDataChange, handleError }) => {
  const classes = useStyles()
  const { instagram_link, twitter_link, discord_link } = profile

  const validationSchema = Yup.object().shape({
    discord_link: Yup.string().max(250),
    twitter_link: Yup.string().max(250),
    instagram_link: Yup.string().max(250),
  })

  const { handleChange, values, errors } = useFormik<SnsInfoParams>({
    initialValues: {
      discord_link: discord_link ? discord_link : '',
      twitter_link: twitter_link ? twitter_link : '',
      instagram_link: instagram_link ? instagram_link : '',
    },
    validationSchema,
    onSubmit: (_) => null,
  })

  useEffect(() => {
    onDataChange({
      instagram_link: values.instagram_link.trim(),
      twitter_link: values.twitter_link.trim(),
      discord_link: values.discord_link.trim(),
    })
  }, [values])

  useEffect(() => {
    handleError(errors)
  }, [errors])

  return (
    <Box className={classes.container}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <ESButtonDiscordCircle onlyIcon={true} className={classes.icon} />
              <ESInput
                id="discord_link"
                fullWidth
                value={values.discord_link}
                onChange={handleChange}
                helperText={errors.discord_link}
                placeholder={i18n.t('common:streaming_settings_live_streaming_screen.discord_placeholder')}
                error={!!errors.discord_link}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <ESButtonTwitterCircle onlyIcon={true} className={classes.icon} />
              <ESInput
                id="twitter_link"
                fullWidth
                value={values.twitter_link}
                onChange={handleChange}
                helperText={errors.twitter_link}
                error={!!errors.twitter_link}
                placeholder={i18n.t('common:streaming_settings_live_streaming_screen.twitter_placeholder')}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <ESButtonInstagramCircle onlyIcon={true} className={classes.icon} />
              <ESInput
                id="instagram_link"
                fullWidth
                value={values.instagram_link}
                onChange={handleChange}
                helperText={errors.instagram_link}
                error={!!errors.instagram_link}
                placeholder={i18n.t('common:streaming_settings_live_streaming_screen.instagram_placeholder')}
              />
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 0,
  },
  icon: {
    marginRight: 8,
  },
}))

export default SnsInfoStream
