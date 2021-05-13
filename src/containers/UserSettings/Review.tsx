import { Box, Container, Theme, makeStyles, Typography } from '@material-ui/core'
import { GENDER } from '@constants/common.constants'
import { useTranslation } from 'react-i18next'
import ESChip from '@components/Chip'
import ESLink from '@components/Link'
import Step from '@components/Step'
import Stepper from '@components/Stepper'
import StepButton from '@components/StepButton'

export type BasicInfoParams = {
  selectedPrefecture: string
  selectedGender: string
}

interface ReviewProps {
  profile: any
  onFixClicked: (step) => void
}

const STEP1 = 0
const STEP2 = 1
const STEP3 = 2

const Review: React.FC<ReviewProps> = ({ profile, onFixClicked }) => {
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

  const gender = genders.find((g) => g.value === profile.sex)

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

  const basicInfoTypo = (title, value, isShow) => (
    <Box mt={1} mb={1}>
      <Typography variant="h2">{`${title}：${value}（ ${isShow ? t('common:profile.show') : t('common:profile.dont_show')}）`}</Typography>
    </Box>
  )

  return (
    <Container maxWidth="md">
      <Box mt={10} mb={4} display="flex" justifyContent="center">
        <Typography variant="h2">{t('common:confirmation_review')}</Typography>
      </Box>

      <Stepper activeStep={STEP1}>
        <Step>
          <StepButton onClick={() => onFixClicked(STEP1)}>{t('common:profile.basic_info')}</StepButton>
        </Step>
      </Stepper>

      <Box mt={4}>
        {basicInfoTypo(t('common:profile.location'), profile ? profile.area.area : '', profile.show_area)}
        {basicInfoTypo(t('common:profile.gender'), gender ? gender.label : '', profile.show_sex)}
        {basicInfoTypo(t('common:profile.birth_date'), formatDate(profile.birth_date), profile.show_birth_date)}
      </Box>
      <ESLink onClick={() => onFixClicked(STEP1)}>{t('common:fix')}</ESLink>

      <Box mt={4} />
      <Stepper activeStep={STEP2}>
        <></>
        <Step>
          <StepButton onClick={() => onFixClicked(STEP1)}>{t('common:profile.tag')}</StepButton>
        </Step>
      </Stepper>

      <Box mt={4}>
        {profile.features.length > 0 ? (
          profile.features.map((feature) => <ESChip key={feature.id} className={classes.chipSpacing} label={feature.feature} />)
        ) : (
          <Typography>{t('common:profile.no_tag_selected')}</Typography>
        )}
      </Box>
      <ESLink onClick={() => onFixClicked(STEP2)}>{t('common:fix')}</ESLink>

      <Box mt={4} />
      <Stepper activeStep={STEP3}>
        <></>
        <></>
        <Step>
          <StepButton onClick={() => onFixClicked(STEP1)}>{t('common:profile.favorite_game.title')}</StepButton>
        </Step>
      </Stepper>

      <Box mt={4}>
        {profile.game_titles.length > 0 ? (
          profile.game_titles.map((title) => <ESChip key={title.id} className={classes.chipSpacing} label={title.display_name} />)
        ) : (
          <Typography>{t('common:profile.no_game_selected')}</Typography>
        )}
      </Box>
      <ESLink onClick={() => onFixClicked(STEP3)}>{t('common:fix')}</ESLink>
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
