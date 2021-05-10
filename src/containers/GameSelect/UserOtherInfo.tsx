import { useEffect, useMemo, useState } from 'react'
import { Grid, Box, Container, Theme, makeStyles } from '@material-ui/core'
import ESSelect from '@components/Select'
import ESCheckbox from '@components/Checkbox'
import { useFormik } from 'formik'
import { GENDER } from '@constants/common.constants'
import useGetPrefectures from './useGetPrefectures'
import { DropdownDate } from './date-dropdown.component'

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

const genders = [
  {
    value: GENDER.MALE,
    label: '男性',
  },
  {
    value: GENDER.FEMALE,
    label: '女性',
  },
  {
    value: GENDER.OTHER,
    label: 'その他',
  },
]

// const formatDate = (date) => {
//   // formats a JS date to 'yyyy-mm-dd'
//   var d = new Date(date),
//     month = '' + (d.getMonth() + 1),
//     day = '' + d.getDate(),
//     year = d.getFullYear()

//   if (month.length < 2) month = '0' + month
//   if (day.length < 2) day = '0' + day

//   return [year, month, day].join('-')
// }

const UserOtherInfo: React.FC<UserOtherInfoProps> = ({ user }) => {
  const classes = useStyles()
  //   const { t } = useTranslation(['common'])
  //   const router = useRouter()

  const { prefectures, getPrefectures } = useGetPrefectures()
  const [dateNew, setDateNew] = useState({ date: null, selectedDate: '2020-03-03' })

  useEffect(() => {
    getPrefectures({})
  }, [])

  const memoizedPrefectures = useMemo(() => {
    if (prefectures && prefectures.data) {
      return prefectures.data.map((prefecture) => ({
        label: prefecture.attributes.area,
        value: prefecture.id,
      }))
    }
  }, [prefectures])

  const formatDate = (date) => {
    // formats a JS date to 'yyyy-mm-dd'
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

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

  const prefectureView = (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ESSelect id="selectedValue" value={values.selectedValue} onChange={handleChange} fullWidth>
            <option value="">都道府県</option>
            {memoizedPrefectures &&
              memoizedPrefectures.map((item) => (
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
            {genders.map((item) => (
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
      <Grid container spacing={2}></Grid>
      <DropdownDate
        selectedDate={
          // optional
          dateNew.selectedDate // 'yyyy-mm-dd' format only
        }
        onDateChange={(date) => {
          // console.log('date', date)
          setDateNew({ date: date, selectedDate: formatDate(date) })
        }}
        defaultValues={{ year: '年', month: '月', day: '日' }}
        options={{ yearReverse: true }}
      />
      <ESCheckbox checked={state.checkedC} onChange={handleChange1} label="生年月日を公開する" name="checkedC" />
    </Box>
  )

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
