// import { useEffect, useMemo, useState } from 'react'
import { Box, Container, Theme, makeStyles, Typography } from '@material-ui/core'
// import { useFormik } from 'formik'
import { GENDER } from '@constants/common.constants'
import { useTranslation } from 'react-i18next'
// import ESSelect from '@components/Select'
// import ESCheckbox from '@components/Checkbox'
// import ESDatePicker from '@components/DatePicker'
// import { formatDate } from '@components/DatePicker/date-dropdown-helper'
import { UserFeaturesResponse, GameTitlesResponse } from '@services/settings.service'
import ESChip from '@components/Chip'
import _ from 'lodash'

import Step from '@components/Step'
// import StepButton from '@components/StepButton'
import Stepper from '@components/Stepper'
import StepLabel from '@components/StepLabel'

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

interface ReviewProps {
  profile: BasicInfo
  prefectures: any
  features: UserFeaturesResponse
  gameTitles: GameTitlesResponse
}

const Review: React.FC<ReviewProps> = ({ profile, prefectures, features, gameTitles }) => {
  const classes = useStyles()
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

  const gender = genders.find((g) => g.value === parseInt(profile.sex))

  const prefecture = _.find(prefectures.data, (p) => p.id === profile.area_id)
  // console.log('prefecture', prefecture.attributes.area)

  const formatDate = (date) => {
    let formattedDate = ''
    if (date) {
      const dateObj = new Date(date)
      const month = dateObj.getUTCMonth() + 1 //months from 1-12
      const day = dateObj.getUTCDate()
      const year = dateObj.getUTCFullYear()
      formattedDate = year + t('common:date.year') + month + t('common:date.month') + day + t('common:date.day')
    }
    return formattedDate
  }

  const selectedTags = _.filter(features, (f) => [3].includes(parseInt(f.id)))
  const selectedGameTitles = _.filter(gameTitles, (f) => [3].includes(parseInt(f.id)))

  return (
    <Container maxWidth="md" className={classes.container}>
      <Stepper activeStep={0} style={{ padding: 0 }}>
        <Step>
          <StepLabel>{'在地'}</StepLabel>
        </Step>
      </Stepper>

      <Box>
        <Typography>
          {'所在地：' + (prefecture ? prefecture.attributes.area : '') + '（' + (profile.show_area ? '公開する' : '公開しない') + '）'}
        </Typography>
        <Typography>{'性別：' + (gender ? gender.label : '') + '（' + (profile.show_sex ? '公開する' : '公開しない') + '）'}</Typography>
        <Typography>
          {'生年月日：' + formatDate(profile.birth_date) + '（' + (profile.show_birth_date ? '公開する' : '公開しない') + '）'}
        </Typography>
      </Box>
      <Box>
        {selectedTags.length > 0 ? (
          selectedTags.map((chip) => <ESChip key={chip.id} className={classes.chipSpacing} label={chip.attributes.feature} />)
        ) : (
          <Typography>{'No tag selected'}</Typography>
        )}
      </Box>
      <Box>
        {selectedTags.length > 0 ? (
          selectedGameTitles.map((title) => <ESChip key={title.id} className={classes.chipSpacing} label={title.attributes.display_name} />)
        ) : (
          <Typography>{'No tag selected'}</Typography>
        )}
      </Box>
    </Container>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(60 / 8),
  },
  chipSpacing: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

export default Review
