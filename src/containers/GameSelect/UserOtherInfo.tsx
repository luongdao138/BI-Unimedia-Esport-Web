import { useState } from 'react'
import { Grid, Box, Container, Theme, makeStyles } from '@material-ui/core'
import ESSelect from '@components/Select'
import ESCheckbox from '@components/Checkbox'
import { useFormik } from 'formik'

export type UserOtherInfoParams = {
  email: string
  password: string
  registration_id?: string
  selectedValue: string
}

// TODO use global type instead
type User = {
  prefecture: string
  gender: string
  birthDate: number
}

interface UserOtherInfoProps {
  user: User // TODO use global type instead
}

const UserOtherInfo: React.FC<UserOtherInfoProps> = ({ user }) => {
  const classes = useStyles()
  //   const { t } = useTranslation(['common'])
  //   const router = useRouter()
  //   const { loginByEmail, meta, resetMeta } = useLoginByEmail()
  const { handleChange, values, handleSubmit } = useFormik<UserOtherInfoParams>({
    initialValues: {
      email: '',
      password: '',
      registration_id: undefined,
      selectedValue: '',
    },
    // validationSchema,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: (values) => {
      //   loginByEmail(values)
      //   console.log('values', values)
      user.prefecture = '1'
      user.gender = '1'
      user.birthDate = 1
    },
  })

  //   console.log('user', user)

  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
  })

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const items = [
    {
      value: 1,
      label: '1990',
    },
    {
      value: 2,
      label: '2000',
    },
  ]

  const prefectureView = (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ESSelect id="selectedValue" value={values.selectedValue} onChange={handleChange} fullWidth>
            <option value="">都道府県</option>
            {items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </ESSelect>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <ESCheckbox checked={state.checkedA} onChange={handleChange1} label="都道府県を公開する" name="checkedA" />
    </Box>
  )

  const genderView = (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ESSelect id="selectedValue" value={values.selectedValue} onChange={handleChange} fullWidth>
            <option value="">性別</option>
            {items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </ESSelect>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <ESCheckbox checked={state.checkedB} onChange={handleChange1} label="性別を公開する" name="checkedB" />
    </Box>
  )
  const birthDateView = (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs>
          <ESSelect id="selectedValue" value={values.selectedValue} onChange={handleChange} fullWidth>
            <option value="">年</option>
            {items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </ESSelect>
        </Grid>
        <Grid item xs>
          <ESSelect id="selectedValue" value={values.selectedValue} onChange={handleChange} fullWidth>
            <option value="">月</option>
            {items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </ESSelect>
        </Grid>
        <Grid item xs>
          <ESSelect id="selectedValue" value={values.selectedValue} onChange={handleChange} fullWidth>
            <option value="">日</option>
            {items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </ESSelect>
        </Grid>
      </Grid>
      <ESCheckbox checked={state.checkedC} onChange={handleChange1} label="生年月日を公開する" name="checkedC" />
    </Box>
  )
  //   const { handleChange, values } = useFormik({
  //     initialValues: {
  //       selectedValue: '',
  //     },
  //     onSubmit: (values) => {
  //       values
  //       value
  //     },
  //   })

  return (
    <Container maxWidth="xs" className={classes.container}>
      <form onSubmit={handleSubmit}>
        {prefectureView}
        {genderView}
        {birthDateView}

        {/* <Box pt={6} pb={4} className={classes.buttonContainer} textAlign="center">
          <ESButton
            type="submit"
            variant="contained"
            color="primary"
            round
            gradient
            size="large"
            minWidth={280}
            className={classes.submitBtn}
          >
            {t('common:login.submit')}
          </ESButton>
        </Box> */}
      </form>
    </Container>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(60 / 8),
  },
  iconMargin: {
    marginLeft: theme.spacing(1 / 2),
  },
  buttonContainer: {},
  submitBtn: {},
  ['@media (max-width: 414px)']: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
  },
}))

export default UserOtherInfo
