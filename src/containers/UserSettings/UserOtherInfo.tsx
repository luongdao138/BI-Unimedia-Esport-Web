import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { Grid, Box, Container, Theme, makeStyles } from '@material-ui/core'
import ESSelect from '@components/Select'
import ESCheckbox from '@components/Checkbox'
import ESButton from '@components/Button'
import { useFormik } from 'formik'
import { GENDER } from '@constants/common.constants'
import useGetPrefectures from './useGetPrefectures'
import { DropdownDate } from './date-dropdown.component'
import { useTranslation } from 'react-i18next'
import { formatDate } from './date-dropdown-helper'

export type UserOtherInfoParams = {
  selectedPrefecture: string
  selectedGender: string
}

interface UserOtherInfoProps {
  user: any // TODO use global type instead
  ref: any
  onDataChange: (data: any) => void
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

const UserOtherInfo: React.FC<UserOtherInfoProps> = forwardRef(({ onDataChange }, ref) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  //   const router = useRouter()

  const { prefectures, getPrefectures } = useGetPrefectures()
  const [date, setDate] = useState({ date: null, selectedDate: '2020-03-03' })

  useImperativeHandle(ref, () => ({
    saveUserOtherInfo() {
      handleSubmit()
    },
  }))

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

  const { handleChange, values, handleSubmit } = useFormik<UserOtherInfoParams>({
    initialValues: {
      selectedPrefecture: '',
      selectedGender: '',
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: (values) => {
      onDataChange({
        sex: values.selectedGender ? parseInt(values.selectedGender) : null,
        show_sex: checkboxStates.isShowGender,
        birth_date: date.selectedDate ? date.selectedDate : null,
        show_birth_date: checkboxStates.isShowBirthdate,
        area_id: values.selectedPrefecture ? parseInt(values.selectedPrefecture) : null,
        show_area: checkboxStates.isShowPrefecture,
      })
    },
  })

  const [checkboxStates, setCheckboxStates] = useState({
    isShowPrefecture: false,
    isShowGender: false,
    isShowBirthdate: false,
  })

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxStates({ ...checkboxStates, [event.target.name]: event.target.checked })
  }

  const prefectureView = (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ESSelect id="selectedPrefecture" value={values.selectedPrefecture} onChange={handleChange} fullWidth>
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
      <ESCheckbox
        checked={checkboxStates.isShowPrefecture}
        onChange={handleCheckboxChange}
        label="都道府県を公開する"
        name="isShowPrefecture"
      />
    </Box>
  )

  const genderView = (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ESSelect id="selectedGender" value={values.selectedGender} onChange={handleChange} fullWidth>
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
      <ESCheckbox checked={checkboxStates.isShowGender} onChange={handleCheckboxChange} label="性別を公開する" name="isShowGender" />
    </Box>
  )

  const birthDateView = (
    <Box>
      <Grid container spacing={2}></Grid>
      <DropdownDate
        selectedDate={
          // optional
          date.selectedDate // 'yyyy-mm-dd' format only
        }
        onDateChange={(date) => {
          // console.log('date', date)
          setDate({ date: date, selectedDate: formatDate(date) })
        }}
        defaultValues={{ year: '年', month: '月', day: '日' }}
        options={{ yearReverse: true }}
      />
      <ESCheckbox
        checked={checkboxStates.isShowBirthdate}
        onChange={handleCheckboxChange}
        label="生年月日を公開する"
        name="isShowBirthdate"
      />
    </Box>
  )

  return (
    <Container maxWidth="xs" className={classes.container}>
      <form>
        {prefectureView}
        {genderView}
        {birthDateView}

        <Box pt={6} pb={4} className={classes.buttonContainer} textAlign="center">
          <ESButton
            variant="contained"
            color="primary"
            round
            gradient
            size="large"
            minWidth={280}
            className={classes.submitBtn}
            onClick={() => handleSubmit()}
          >
            {t('common:login.submit')}
          </ESButton>
        </Box>
      </form>
    </Container>
  )
})

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
