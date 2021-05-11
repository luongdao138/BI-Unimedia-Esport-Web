import { useEffect, useMemo, useRef, useState } from 'react'
import { Grid, Typography, Box, Container, Theme, makeStyles, Divider } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import Stepper from '@components/Stepper'
import Step from '@components/Step'
import StepLabel from '@components/StepLabel'
import StepButton from '@components/StepButton'
import TagSelect from '@containers/UserSettings/TagSelect'
import GameSelect from '@containers/UserSettings/GameSelect'
import ESChip from '@components/Chip'
import ESButton from '@components/Button'
import BasicInfo from './BasicInfo'
import useUpdateProfile from './useUpdateProfile'
import useGetPrefectures from './useGetPrefectures'
import useSettings from './useSettings'
import _ from 'lodash'
import { GameTitlesResponse } from '@services/settings.service'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'

const FINAL_STEP = 2
const BASIC_INFO_INIT_STATE = {
  sex: null,
  show_sex: false,
  birth_date: null,
  show_birth_date: false,
  area_id: null,
  show_area: false,
}
let prevStep = null

const UserSettingsContainer: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation(['common'])
  const basicInfoRef = useRef(null)
  const { profileUpdate, profileUpdateMeta } = useUpdateProfile()
  const { prefectures, getPrefectures } = useGetPrefectures()
  const { features, gameTitles, getFeatures, getGameTitles } = useSettings()
  const [step, setStep] = useState(0)
  const [basicInfoData, setBasicInfoData] = useState(BASIC_INFO_INIT_STATE)
  const [selectedFeatures, setSelectedFeatures] = useState([] as string[])
  const [selectedGameTitles, setSelectedGameTitles] = useState([] as GameTitlesResponse)
  const [unselectedGameTitles, setUnselectedGameTitles] = useState([] as GameTitlesResponse)
  const [userSettingsValues, setUserSettingsValues] = useState(null)
  const stepsTitles = [t('common:profile.basic_info'), t('common:profile.tag'), t('common:profile.favorite_game.title')]

  useEffect(() => {
    getFeatures()
    getGameTitles()
    getPrefectures({})
  }, [])

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('profileUpdateMeta', profileUpdateMeta)
  }, [profileUpdateMeta])

  useEffect(() => {
    setUnselectedGameTitles([...gameTitles])
  }, [gameTitles])

  const onFeatureSelect = (id: string) => {
    const newFeatures = [...selectedFeatures]
    if (selectedFeatures.find((activeId) => activeId === id)) {
      _.remove(newFeatures, (activeId) => activeId === id)
    } else {
      newFeatures.push(id)
    }
    setSelectedFeatures(newFeatures)
  }

  const onGameTitleClick = (game: GameTitlesResponse[0]) => {
    const newUnselected = [...unselectedGameTitles]
    const newSelected = [...selectedGameTitles]
    if (newUnselected.find((unselectedId) => unselectedId.id === game.id)) {
      _.remove(newUnselected, (unselectedId) => unselectedId.id === game.id)
      newSelected.push(game)
    }
    setUnselectedGameTitles(newUnselected)
    setSelectedGameTitles(newSelected)
  }

  const onGameSelectionRemove = (game: GameTitlesResponse[0]) => {
    const newUnselected = [...unselectedGameTitles]
    const newSelected = [...selectedGameTitles]
    if (newSelected.find((selected) => selected.id === game.id)) {
      _.remove(newSelected, (selected) => selected.id === game.id)
      newUnselected.push(game)
    }
    setUnselectedGameTitles(newUnselected)
    setSelectedGameTitles(newSelected)
  }

  const onBasicInfoChanged = (data) => {
    setBasicInfoData(data)

    setUserSettingsValues({
      sex: data.sex ? parseInt(data.sex) : null,
      show_sex: data.show_sex,
      birth_date: data.birth_date ? data.birth_date : null,
      show_birth_date: data.show_birth_date,
      area_id: data.area_id ? parseInt(data.area_id) : null,
      show_area: data.show_area,
      game_titles: selectedGameTitles.map((gameTitle) => parseInt(gameTitle.id)),
      features: selectedFeatures.map((feature) => parseInt(feature)),
    })
  }

  function getStepViews() {
    switch (step) {
      case 0:
        return <BasicInfo ref={basicInfoRef} profile={basicInfoData} prefectures={prefectures} onDataChange={onBasicInfoChanged} />
      case 1:
        return <TagSelect features={features} selectedFeatures={selectedFeatures} onSelect={onFeatureSelect} />
      case 2:
        return <GameSelect gameTitles={unselectedGameTitles} onGameSelect={onGameTitleClick} />
    }
  }

  const memoizedData = useMemo(() => {
    if (userSettingsValues) {
      return userSettingsValues
    }
  }, [userSettingsValues])

  useEffect(() => {
    if (memoizedData) profileUpdate(memoizedData)
  }, [memoizedData])

  const handleConfirm = () => {
    router.push('/welcome')
  }

  const handleButtonClick = () => {
    if (basicInfoRef && basicInfoRef.current) {
      basicInfoRef.current.saveBasicInfo()
    }

    if (step == FINAL_STEP) handleConfirm()
    else setStep(step + 1)
  }

  useEffect(() => {
    if (prevStep) {
      setUserSettingsValues({
        sex: basicInfoData.sex ? parseInt(basicInfoData.sex) : null,
        show_sex: basicInfoData.show_sex,
        birth_date: basicInfoData.birth_date ? basicInfoData.birth_date : null,
        show_birth_date: basicInfoData.show_birth_date,
        area_id: basicInfoData.area_id ? parseInt(basicInfoData.area_id) : null,
        show_area: basicInfoData.show_area,
        game_titles: selectedGameTitles.map((gameTitle) => parseInt(gameTitle.id)),
        features: selectedFeatures.map((feature) => parseInt(feature)),
      })
    }
    prevStep = step
  }, [step])

  const handleSkip = () => {
    router.push('/welcome')
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Box pt={2} pb={2} alignItems="center" display="flex">
        <Grid container direction="row" justify="space-between" style={{ alignItems: 'center' }}>
          <Typography variant="h2" style={{ fontSize: 30 }}>
            {t('common:welcome')}
          </Typography>
          <ESButton onClick={handleSkip}>{t('common:skip')}</ESButton>
        </Grid>
      </Box>
      <Grid container direction="column" className={classes.contents}>
        <Box className={classes.stepperHolder}>
          <Stepper activeStep={step} style={{ padding: 0 }}>
            {stepsTitles.map((label, idx) => (
              <Step key={idx}>
                <StepButton onClick={() => setStep(idx)}>
                  <StepLabel>{label}</StepLabel>
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
        {getStepViews()}
        <Box className={classes.blankSpace}></Box>
      </Grid>
      <Box className={classes.stickyFooter}>
        {step === 2 ? (
          <>
            <Container maxWidth="md" className={classes.container} style={{ marginTop: 0 }}>
              <Box pl={2.5} pt={2}>
                {selectedGameTitles.map((game) => (
                  <ESChip
                    key={game.id}
                    label={game.attributes.display_name}
                    onDelete={() => onGameSelectionRemove(game)}
                    className={classes.chipSpacing}
                  />
                ))}
              </Box>
            </Container>
            <Divider />
          </>
        ) : null}

        <Container maxWidth="md" className={classes.container} style={{ marginTop: 0 }}>
          <Box className={classes.nextBtnHolder}>
            <Box className={classes.nextBtn}>
              <ButtonPrimary color="primary" fullWidth onClick={handleButtonClick}>
                {step == FINAL_STEP ? t('common:done') : t('common:next')}
              </ButtonPrimary>
            </Box>
          </Box>
        </Container>
      </Box>
    </Container>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(60 / 8),
  },
  contents: {
    marginTop: theme.spacing(8),
  },
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    background: Colors.black,
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
  blankSpace: {
    height: 300,
  },
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
}))

export default UserSettingsContainer
