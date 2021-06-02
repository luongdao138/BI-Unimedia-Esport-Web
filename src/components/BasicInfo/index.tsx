import { useEffect, useMemo, useState } from 'react'
import { Grid, Box } from '@material-ui/core'
import { useFormik } from 'formik'
import { GENDER } from '@constants/common.constants'
import { useTranslation } from 'react-i18next'
import ESSelect from '@components/Select'
import ESCheckbox from '@components/Checkbox'
import ESDatePicker from '@components/DatePicker'
import moment from 'moment'

export type BasicInfoParams = {
  selectedPrefecture: string
  selectedGender: string
}

interface BasicInfoProps {
  profile: any
  prefectures: any
  onDataChange: (data: any) => void
  handleDateError: (error: boolean) => void
}

const BasicInfo: React.FC<BasicInfoProps> = ({ profile, prefectures, onDataChange, handleDateError }) => {
  const { t } = useTranslation(['common'])
  const [error, setError] = useState(false)
  const genders = [
    {
      value: GENDER.MALE,
      label: t('common:gender.male'),
    },
    {
      value: GENDER.FEMALE,
      label: t('common:gender.female'),
    },
    {
      value: GENDER.OTHER,
      label: t('common:gender.other'),
    },
  ]

  const { area_id, show_area, sex, show_sex, birth_date, show_birth_date } = profile
  let initialDate = {
    year: -1,
    month: -1,
    day: -1,
  }

  if (birth_date) {
    initialDate = {
      year: new Date(birth_date).getFullYear(),
      month: new Date(birth_date).getMonth(),
      day: new Date(birth_date).getDay(),
    }
  }

  const [date, setDate] = useState({ selectedDate: initialDate })

  const memoizedPrefectures = useMemo(() => {
    if (prefectures && prefectures.data) {
      return prefectures.data.map((prefecture) => ({
        label: prefecture.attributes.area,
        value: prefecture.id,
      }))
    }
  }, [prefectures])

  const { handleChange, values } = useFormik<BasicInfoParams>({
    initialValues: {
      selectedPrefecture: area_id ? area_id : '',
      selectedGender: sex ? sex : '',
    },
    onSubmit: (_) => null,
  })

  const [checkboxStates, setCheckboxStates] = useState({
    isShowPrefecture: show_area,
    isShowGender: show_sex,
    isShowBirthdate: show_birth_date,
  })

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxStates({ ...checkboxStates, [event.target.name]: event.target.checked })
  }

  useEffect(() => {
    onDataChange({
      sex: parseInt(values.selectedGender),
      show_sex: checkboxStates.isShowGender,
      birth_date:
        date.selectedDate.year !== -1 && date.selectedDate.month !== -1 && date.selectedDate.day !== -1
          ? moment(new Date(date.selectedDate.year, date.selectedDate.month, date.selectedDate.day)).format('YYYY-MM-DD')
          : null,
      show_birth_date: checkboxStates.isShowBirthdate,
      area_id: parseInt(values.selectedPrefecture),
      show_area: checkboxStates.isShowPrefecture,
    })
  }, [values, date, checkboxStates])

  const prefectureView = (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ESSelect id="selectedPrefecture" value={values.selectedPrefecture} onChange={handleChange} fullWidth>
            <option value="">{t('common:profile.prefectures')}</option>
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
        label={t('common:profile.show_prefectures')}
        name="isShowPrefecture"
      />
    </Box>
  )

  const genderView = (
    <Box marginTop={3}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ESSelect id="selectedGender" value={values.selectedGender} onChange={handleChange} fullWidth>
            <option value="">{t('common:profile.gender')}</option>
            {genders.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </ESSelect>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <ESCheckbox
        checked={checkboxStates.isShowGender}
        onChange={handleCheckboxChange}
        label={t('common:profile.show_gender')}
        name="isShowGender"
      />
    </Box>
  )

  const birthDateView = (
    <Box marginTop={3}>
      <ESDatePicker
        selectedDate={date.selectedDate}
        onDateChange={(date, error) => {
          if (date === null) {
            setDate({ selectedDate: { year: -1, month: -1, day: -1 } })
          } else {
            setDate({ selectedDate: { year: date.year, month: date.month, day: date.day } })
          }
          setError(error)
          handleDateError(error)
        }}
        hasError={error}
        helperText="適切な日付を入力してください。"
      />

      <ESCheckbox
        checked={checkboxStates.isShowBirthdate}
        onChange={handleCheckboxChange}
        label={t('common:profile.show_birthdate')}
        name="isShowBirthdate"
      />
    </Box>
  )

  return (
    <Box maxWidth="md">
      <form>
        {prefectureView}
        {genderView}
        {birthDateView}
      </form>
    </Box>
  )
}

export default BasicInfo
