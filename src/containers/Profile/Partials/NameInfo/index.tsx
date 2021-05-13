import { useEffect } from 'react'
import { Grid, Box, Container, makeStyles } from '@material-ui/core'
import { useFormik } from 'formik'
// import { useTranslation } from 'react-i18next'
import ESSelect from '@components/Select'
import ESInput from '@components/Input'

export type NameInfoParams = {
  nickname: string
  nickname2: string
  bio: string
}

interface NameInfoProps {
  profile: any
  nicknameData: any
  onDataChange: (data: any) => void
}

const NameInfo: React.FC<NameInfoProps> = ({ profile, nicknameData, onDataChange }) => {
  const classes = useStyles()
  // const { t } = useTranslation(['common'])

  const { nickname, nickname2, bio } = profile

  const { handleChange, values, touched, errors } = useFormik<NameInfoParams>({
    initialValues: {
      nickname: nickname ? nickname : '',
      nickname2: nickname2 ? nickname2 : '',
      bio: bio ? bio : '',
    },
    onSubmit: (_) => null,
  })

  useEffect(() => {
    onDataChange({
      nickname: values.nickname,
      nickname2: values.nickname2,
      bio: values.bio,
    })
  }, [values])

  const nickname2View = (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ESSelect id="nickname2" value={values.nickname2} onChange={handleChange} fullWidth>
            <option value="">
              {
                '二つ名を設定するt'
                //('common:user_profile.set_two_names')
              }
            </option>
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
            autoFocus
            fullWidth
            value={values.nickname}
            onChange={handleChange}
            helperText={touched.nickname && errors.nickname}
            error={touched.nickname && !!errors.nickname}
          />
        </Grid>
      </Grid>
    </Box>
  )

  const bioView = (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ESInput
            id="bio"
            autoFocus
            labelPrimary="自己紹介"
            fullWidth
            multiline
            rows={4}
            value={values.bio}
            onChange={handleChange}
            helperText={touched.bio && errors.bio}
            error={touched.bio && !!errors.bio}
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

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 0, //theme.spacing(60 / 8),
  },
}))

export default NameInfo
