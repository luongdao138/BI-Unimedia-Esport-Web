import { useEffect } from 'react'
import { Grid, Box, Container, makeStyles, Typography, Theme } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import ESInput from '@components/Input'

export type NameInfoParams = {
  nickname: string
  bio: string
}

interface NameInfoProps {
  profile: any
  onDataChange: (data: any) => void
  handleError: (error) => void
}

const NameInfo: React.FC<NameInfoProps> = ({ profile, onDataChange, handleError }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  const { nickname, bio } = profile

  const validationSchema = Yup.object().shape({
    bio: Yup.string().max(250, t('common:common.too_long')).min(2, t('common:common.at_least')),
    nickname: Yup.string()
      .required(t('common:common.input_required'))
      .max(50, t('common:common.too_long'))
      .min(2, t('common:common.at_least')),
  })

  const { handleChange, values, errors } = useFormik<NameInfoParams>({
    initialValues: {
      nickname: nickname ? nickname : '',
      bio: bio ? bio : '',
    },
    validationSchema,
    onSubmit: (_) => null,
  })

  useEffect(() => {
    onDataChange({
      nickname: values.nickname,
      bio: values.bio.trim(),
    })
  }, [values])

  useEffect(() => {
    handleError(errors)
  }, [errors])

  const nicknameView = (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ESInput
            id="nickname"
            fullWidth
            value={values.nickname}
            onChange={handleChange}
            helperText={errors.nickname}
            error={!!errors.nickname}
          />
        </Grid>
      </Grid>
    </Box>
  )

  const bioView = (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom className={classes.label}>
            {t('common:user_profile.self_introduction')}
          </Typography>
          <ESInput
            id="bio"
            fullWidth
            multiline
            rows={4}
            value={values.bio}
            onChange={handleChange}
            helperText={errors.bio}
            error={!!errors.bio}
          />
        </Grid>
      </Grid>
    </Box>
  )

  return (
    <Container maxWidth="md" className={classes.container}>
      <form>
        {nicknameView}
        {bioView}
      </form>
    </Container>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: 0,
  },
  label: {
    marginTop: theme.spacing(3),
  },
}))

export default NameInfo
