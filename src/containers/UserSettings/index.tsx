import { useEffect, useState } from 'react'
import { Grid, Typography, Box, Container, Theme, makeStyles, withStyles } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import Stepper from '@components/Stepper'
import Step from '@components/Step'
import StepButton from '@components/StepButton'
import TagSelect from '@components/TagSelect'
import ESButton from '@components/Button'
import ESToast from '@components/Toast'
import ESLoader from '@components/FullScreenLoader'
import BasicInfo from '@components/BasicInfo'
import useUpdateProfile from './useUpdateProfile'
import useGetPrefectures from './useGetPrefectures'
import useSettings from './useSettings'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'
import useGetProfile from '@utils/hooks/useGetProfile'
import TabPanel from '@components/TabPanel'

import GameSelector from '@components/GameSelector'
import { GameTitle } from '@services/game.service'
import Review from './Review'

const FINAL_STEP = 4

const UserSettingsContainer: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation(['common'])
  const { userProfile, getUserProfileMeta } = useGetProfile()
  const { prefectures, getPrefectures } = useGetPrefectures()
  const { features, getFeatures } = useSettings()
  const { profileUpdate, profileUpdateMeta, resetProfileUpdateMeta } = useUpdateProfile()
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState(null)
  const [isReview, setReview] = useState(false)
  const stepsTitles = [t('common:profile.basic_info'), t('common:profile.tag'), t('common:profile.favorite_game.title')]

  useEffect(() => {
    if (userProfile) {
      const profileData = userProfile.data.attributes
      setProfile({ ...profileData, area_id: profileData.area ? profileData.area.id : -1 })
    }
  }, [userProfile])

  useEffect(() => {
    getFeatures()
    getPrefectures({})
  }, [])

  const onFeatureSelect = (selectedFeatures) => {
    setProfile((prevState) => {
      return { ...prevState, features: selectedFeatures }
    })
  }
  const onGameChange = (games: GameTitle['attributes'][]) => {
    setProfile({ ...profile, game_titles: games })
  }

  const onBasicInfoChanged = (data) => {
    setProfile((prevState) => {
      return { ...prevState, ...data }
    })
  }

  const navigate = () => router.push('/home')

  const handleButtonClick = () => {
    if (step !== FINAL_STEP - 1) setStep(step + 1)

    const data = _.pick(profile, ['sex', 'show_sex', 'birth_date', 'show_birth_date', 'area_id', 'show_area'])

    let newParams: {
      sex: any
      show_sex: boolean
      birth_date: any
      show_birth_date: boolean
      area_id?: any
      show_area: boolean
    } = { ...data }

    if (newParams.area_id === -1) {
      newParams = _.omit(newParams, 'area_id')
    }

    profileUpdate({
      ...newParams,
      features: _.map(profile.features, (feature) => feature.id),
      game_titles: _.map(profile.game_titles, (g) => g.id),
    })
  }

  useEffect(() => {
    if (profileUpdateMeta.loaded && step === FINAL_STEP - 1) setReview(true)
    if (profileUpdateMeta.loaded && isReview) navigate()
  }, [profileUpdateMeta])

  const handleSkip = () => navigate()

  const handleFix = (_step) => {
    setReview(false)
    setStep(_step)
  }

  return profile && getUserProfileMeta.loaded ? (
    <>
      <Box className={classes.container}>
        <Box pt={2} pb={2} alignItems="center" display="flex">
          <Grid container direction="row" justify="space-between" style={{ alignItems: 'center' }}>
            <ResponsiveTypo variant="h2">{t('common:welcome')}</ResponsiveTypo>
            {!isReview && <ESButton onClick={handleSkip}>{t('common:skip')}</ESButton>}
          </Grid>
        </Box>

        {isReview ? (
          <Review profile={profile} onFixClicked={handleFix} />
        ) : (
          <Grid container direction="column" className={classes.contents}>
            <Box className={classes.stepperHolder}>
              <Stepper activeStep={step} style={{ padding: 0 }}>
                {stepsTitles.map((label, idx) => (
                  <Step key={idx}>
                    <StepButton onClick={() => setStep(idx)}>{label}</StepButton>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <Box mt={4} />
            <TabPanel value={step} index={0}>
              <BasicInfo profile={profile} prefectures={prefectures} onDataChange={onBasicInfoChanged} />
            </TabPanel>
            <TabPanel value={step} index={1}>
              <TagSelect features={features} selectedFeatures={profile.features} onSelectChange={onFeatureSelect} />
            </TabPanel>
            <TabPanel value={step} index={2}>
              <GameSelector values={profile.game_titles} onChange={onGameChange} />
            </TabPanel>
          </Grid>
        )}

        <Box mt={36} />

        <Box className={classes.stickyFooter}>
          <Container maxWidth="md" className={classes.container} style={{ marginTop: 0 }}>
            <Box className={classes.nextBtnHolder}>
              <Box className={classes.nextBtn}>
                <ButtonPrimary color="primary" fullWidth onClick={handleButtonClick}>
                  {step === FINAL_STEP - 1 ? t('common:done') : t('common:next')}
                </ButtonPrimary>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
      {!!profileUpdateMeta.error && (
        <ESToast open={!!profileUpdateMeta.error} message={t('common:error.user_settings_failed')} resetMeta={resetProfileUpdateMeta} />
      )}
    </>
  ) : (
    <ESLoader open={getUserProfileMeta.pending} />
  )
}

const ResponsiveTypo = withStyles({
  root: {
    fontSize: 30,
  },
})(Typography)

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(60 / 8),
  },
  contents: {
    minHeight: 500,
    marginTop: theme.spacing(8),
  },
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    background: Colors.black,
    borderTop: `1px solid #ffffff30`,
  },
  stepperHolder: {
    paddingRight: theme.spacing(12),
    paddingLeft: theme.spacing(12),
  },
  bottomButton: {
    paddingRight: theme.spacing(22),
    paddingLeft: theme.spacing(22),
  },
  nextBtnHolder: {
    display: 'flex',
    marginBottom: theme.spacing(11),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
  nextBtn: { minWidth: 280 },
  chipSpacing: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      marginTop: 0,
    },
    stepperHolder: {
      paddingRight: 0,
      paddingLeft: 0,
    },
    nextBtnHolder: {
      marginBottom: theme.spacing(5.2),
    },
    blankSpace: {
      height: theme.spacing(15),
    },
  },
  ['@media (max-width: 330px)']: {
    nextBtn: {
      minWidth: theme.spacing(27.5),
    },
  },
  captionActive: {
    fontSize: theme.typography.body1.fontSize,
    color: Colors.white,
  },
  captionInactive: {
    fontSize: theme.typography.body1.fontSize,
  },
}))

export default UserSettingsContainer
