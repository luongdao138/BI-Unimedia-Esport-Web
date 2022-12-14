import { useEffect } from 'react'
import { Grid, Container, makeStyles, Box, InputAdornment, Typography } from '@material-ui/core'
import { useFormik } from 'formik'
import Yup from '@utils/Yup'
import ESButtonFacebookCircle from '@components/Button/FacebookCircle'
import ESButtonTwitchCircle from '@components/Button/TwitchCircle'
import ESButtonTwitterCircle from '@components/Button/TwitterCircle'
import ESButtonInstagramCircle from '@components/Button/InstagramCircle'
import ESButtonDiscordCircle from '@components/Button/DiscordCircle'
import i18n from '@locales/i18n'
import ESInput from '@components/Input'
import CharacterLimited from '@components/CharacterLimited'

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
  const { instagram_link, facebook_link, twitter_link, twitch_link, discord_link } = profile

  const validationSchema = Yup.object().shape({
    instagram_link: Yup.string().max(250),
    discord_link: Yup.string().max(250),
    facebook_link: Yup.string().max(250),
    twitter_link: Yup.string().max(250),
    twitch_link: Yup.string().max(250),
  })

  const { handleChange, values, errors } = useFormik<SnsInfoParams>({
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
              <ESButtonFacebookCircle onlyIcon={true} className={classes.icon} />
              <ESInput
                id="facebook_link"
                fullWidth
                value={values.facebook_link}
                onChange={handleChange}
                helperText={errors.facebook_link}
                error={!!errors.facebook_link}
                placeholder={'******'}
                startAdornment={
                  <InputAdornment position="start">
                    <Typography>https://www.facebook.com/</Typography>
                  </InputAdornment>
                }
                endAdornment={<CharacterLimited value={values.facebook_link} limit={250} />}
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
                placeholder={'******'}
                startAdornment={
                  <InputAdornment position="start">
                    <Typography>https://twitter.com/</Typography>
                  </InputAdornment>
                }
                endAdornment={<CharacterLimited value={values.twitter_link} limit={250} />}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <ESButtonTwitchCircle onlyIcon={true} className={classes.icon} />
              <ESInput
                id="twitch_link"
                fullWidth
                value={values.twitch_link}
                onChange={handleChange}
                helperText={errors.twitch_link}
                error={!!errors.twitch_link}
                placeholder={'******'}
                startAdornment={
                  <InputAdornment position="start">
                    <Typography>https://www.twitch.tv/</Typography>
                  </InputAdornment>
                }
                endAdornment={<CharacterLimited value={values.twitch_link} limit={250} />}
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
                placeholder={'******'}
                startAdornment={
                  <InputAdornment position="start">
                    <Typography>https://www.instagram.com/</Typography>
                  </InputAdornment>
                }
                endAdornment={<CharacterLimited value={values.instagram_link} limit={250} />}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <ESButtonDiscordCircle onlyIcon={true} className={classes.icon} />
              <ESInput
                id="discord_link"
                fullWidth
                value={values.discord_link}
                onChange={handleChange}
                helperText={errors.discord_link}
                placeholder={i18n.t('common:profile.discord_placeholder')}
                error={!!errors.discord_link}
                endAdornment={<CharacterLimited value={values.discord_link} limit={250} />}
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
