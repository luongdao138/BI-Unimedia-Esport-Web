import { useEffect } from 'react'
import { Grid, Box, Container, makeStyles, Typography, Theme } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import ESSelect from '@components/Select'
import ESInput from '@components/Input'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { useStore } from 'react-redux'

export type NameInfoParams = {
  nickname: string
  nickname2: string
  bio: string
}

interface NameInfoProps {
  profile: any
  nicknameData: any
  onDataChange: (data: any) => void
  handleError: (error) => void
}

const NameInfo: React.FC<NameInfoProps> = ({ profile, nicknameData, onDataChange, handleError }) => {
  const classes = useStyles()
  const store = useStore()
  const { t } = useTranslation(['common'])

  const { nickname, nickname2, bio } = profile

  const validationSchema = Yup.object().shape({
    bio: Yup.string()
      .max(250, t('common:common.too_long'))
      .min(2, t('common:common.at_least'))
      .test('bio', t('common:common.contains_ngword'), function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
    nickname: Yup.string()
      .required(t('common:common.required'))
      .max(50, t('common:common.too_long'))
      .min(2, t('common:common.at_least'))
      .test('nickname', t('common:common.contains_ngword'), function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
  })

  const { handleChange, values, errors } = useFormik<NameInfoParams>({
    initialValues: {
      nickname: nickname ? nickname : '',
      nickname2: nickname2 ? nickname2 : '',
      bio: bio ? bio : '',
    },
    validationSchema,
    onSubmit: (_) => null,
  })

  useEffect(() => {
    onDataChange({
      nickname: values.nickname,
      nickname2: values.nickname2,
      bio: values.bio.trim(),
    })
  }, [values])

  useEffect(() => {
    handleError(errors)
  }, [errors])

  const nickname2View = (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ESSelect id="nickname2" value={values.nickname2} onChange={handleChange} fullWidth>
            <option value="">{t('common:user_profile.set_two_names')}</option>
            {nicknameData &&
              nicknameData.map((item) => (
                <option key={item.nickname} value={item.nickname}>
                  {item.nickname}
                </option>
              ))}
          </ESSelect>
        </Grid>
      </Grid>
    </Box>
  )

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
        {nickname2View}
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
