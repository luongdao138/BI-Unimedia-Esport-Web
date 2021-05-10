import { forwardRef, useImperativeHandle, useMemo, useState } from 'react'
import { Grid, Box, Container, Theme, makeStyles } from '@material-ui/core'
import ESSelect from '@components/Select'
import ESCheckbox from '@components/Checkbox'
import { useFormik } from 'formik'
import { GENDER } from '@constants/common.constants'
import { DropdownDate } from './date-dropdown.component'
// import { useTranslation } from 'react-i18next'
import { formatDate } from './date-dropdown-helper'

export type BasicInfoParams = {
  selectedPrefecture: string
  selectedGender: string
}

type BasicInfo = {
  sex: string
  show_sex: boolean
  birth_date: string
  show_birth_date: boolean
  area_id: string
  show_area: boolean
}

interface BasicInfoProps {
  profile: BasicInfo
  prefectures: any
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

const BasicInfo: React.FC<BasicInfoProps> = forwardRef(({ profile, prefectures, onDataChange }, ref) => {
  const classes = useStyles()
  // const { t } = useTranslation(['common'])

  const [date, setDate] = useState({ date: null, selectedDate: profile.birth_date ? profile.birth_date : null })

  useImperativeHandle(ref, () => ({
    saveBasicInfo() {
      handleSubmit()
    },
  }))

  const memoizedPrefectures = useMemo(() => {
    if (prefectures && prefectures.data) {
      return prefectures.data.map((prefecture) => ({
        label: prefecture.attributes.area,
        value: prefecture.id,
      }))
    }
  }, [prefectures])

  const { handleChange, values, handleSubmit } = useFormik<BasicInfoParams>({
    initialValues: {
      selectedPrefecture: profile.area_id ? profile.area_id : '',
      selectedGender: profile.sex ? profile.sex : '',
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: (values) => {
      onDataChange({
        sex: values.selectedGender,
        show_sex: checkboxStates.isShowGender,
        birth_date: date.selectedDate ? date.selectedDate : null,
        show_birth_date: checkboxStates.isShowBirthdate,
        area_id: values.selectedPrefecture,
        show_area: checkboxStates.isShowPrefecture,
      })
    },
  })

  const [checkboxStates, setCheckboxStates] = useState({
    isShowPrefecture: profile.show_area,
    isShowGender: profile.show_sex,
    isShowBirthdate: profile.show_birth_date,
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

export default BasicInfo
