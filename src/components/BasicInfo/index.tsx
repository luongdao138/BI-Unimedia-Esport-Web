import { useEffect, useMemo, useState } from 'react'
import { Grid, Box } from '@material-ui/core'
import { useFormik } from 'formik'
import { GENDER } from '@constants/common.constants'
import { useTranslation } from 'react-i18next'
import ESSelect from '@components/Select'
import ESCheckbox from '@components/Checkbox'
import ESDatePicker from '@components/DatePicker'
import { formatDate } from '@components/DatePicker/date-dropdown-helper'

export type BasicInfoParams = {
  selectedPrefecture: string
  selectedGender: string
}

interface BasicInfoProps {
  profile: any
  prefectures: any
  onDataChange: (data: any) => void
}

const BasicInfo: React.FC<BasicInfoProps> = ({ profile, prefectures, onDataChange }) => {
  const { t } = useTranslation(['common'])
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

  const [date, setDate] = useState({ date: null, selectedDate: birth_date ? birth_date : null })

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
      birth_date: date.selectedDate ? date.selectedDate : null,
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
        onDateChange={(date) => {
          if (date === null) {
            setDate({ date: null, selectedDate: null })
          } else {
            setDate({ date: date, selectedDate: formatDate(date) })
          }
        }}
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
