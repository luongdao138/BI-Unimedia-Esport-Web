import { useEffect } from 'react'
import { Grid, Container, makeStyles, Box } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ESButtonFacebookCircle from '@components/Button/FacebookCircle'
import ESButtonTwitterCircle from '@components/Button/TwitchCircle'
import ESButtonTwitchCircle from '@components/Button/TwitterCircle'
import ESButtonInstagramCircle from '@components/Button/InstagramCircle'
import ESButtonDiscordCircle from '@components/Button/DiscordCircle'
import { useTranslation } from 'react-i18next'
import ESInput from '@components/Input'

export type SnsInfoParams = {
  instagram_link: string
  facebook_link: string
  twitter_link: string
  twitch_link: string
  discord_link: string
}

interface SnsInfoProps {
  profile: any
  onDataChange: (data: any) => void
  handleError: (error) => void
}

const SnsInfo: React.FC<SnsInfoProps> = ({ profile, onDataChange, handleError }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { instagram_link, facebook_link, twitter_link, twitch_link, discord_link } = profile

  const validationSchema = Yup.object().shape({
    instagram_link: Yup.string().max(250, t('common:common.too_long')),
    discord_link: Yup.string().max(250, t('common:common.too_long')),
    facebook_link: Yup.string().max(250, t('common:common.too_long')),
    twitter_link: Yup.string().max(250, t('common:common.too_long')),
    twitch_link: Yup.string().max(250, t('common:common.too_long')),
  })

  const { handleChange, values, touched, errors } = useFormik<SnsInfoParams>({
    initialValues: {
      instagram_link: instagram_link ? instagram_link : '',
      facebook_link: facebook_link ? facebook_link : '',
      twitter_link: twitter_link ? twitter_link : '',
      twitch_link: twitch_link ? twitch_link : '',
      discord_link: discord_link ? discord_link : '',
    },
    validationSchema,
    onSubmit: (_) => null,
  })

  useEffect(() => {
    onDataChange({
      instagram_link: values.instagram_link.trim(),
      facebook_link: values.facebook_link.trim(),
      twitter_link: values.twitter_link.trim(),
      twitch_link: values.twitch_link.trim(),
      discord_link: values.discord_link.trim(),
    })
  }, [values])

  useEffect(() => {
    handleError(errors)
  }, [errors])

  return (
    <Container maxWidth="md" className={classes.container}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <ESButtonFacebookCircle disabled={true} className={classes.icon} />
              <ESInput
                id="facebook_link"
                autoFocus
                fullWidth
                value={values.facebook_link}
                onChange={handleChange}
                helperText={touched.facebook_link && errors.facebook_link}
                error={touched.facebook_link && !!errors.facebook_link}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <ESButtonTwitterCircle disabled={true} className={classes.icon} />
              <ESInput
                id="twitter_link"
                autoFocus
                fullWidth
                value={values.twitter_link}
                onChange={handleChange}
                helperText={touched.twitter_link && errors.twitter_link}
                error={touched.twitter_link && !!errors.twitter_link}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <ESButtonTwitchCircle disabled={true} className={classes.icon} />
              <ESInput
                id="twitch_link"
                autoFocus
                fullWidth
                value={values.twitch_link}
                onChange={handleChange}
                helperText={touched.twitch_link && errors.twitch_link}
                error={touched.twitch_link && !!errors.twitch_link}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <ESButtonInstagramCircle disabled={true} className={classes.icon} />
              <ESInput
                id="instagram_link"
                autoFocus
                fullWidth
                value={values.instagram_link}
                onChange={handleChange}
                helperText={touched.instagram_link && errors.instagram_link}
                error={touched.instagram_link && !!errors.instagram_link}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <ESButtonDiscordCircle disabled={true} className={classes.icon} />
              <ESInput
                id="discord_link"
                autoFocus
                fullWidth
                value={values.discord_link}
                onChange={handleChange}
                helperText={touched.discord_link && errors.discord_link}
                error={touched.discord_link && !!errors.discord_link}
              />
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
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

export default SnsInfo
