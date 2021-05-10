import { useEffect, useState } from 'react'
import { Grid, Typography, Box, Container, Theme, makeStyles, Divider } from '@material-ui/core'
// import ESButton from '@components/Button'
import ButtonPrimary from '@components/ButtonPrimary'
import Stepper from '@components/Stepper'
import Step from '@components/Step'
import StepLabel from '@components/StepLabel'
import StepButton from '@components/StepButton'
import TagSelect from '@containers/GameSelect/TagSelect'
import GameSelect from '@containers/GameSelect/GameSelect'
import ESChip from '@components/Chip'
import UserOtherInfo from './UserOtherInfo'
import useUpdateProfile from './useUpdateProfile'
// import useGetPrefectures from './useGetPrefectures'
import { useAppDispatch, useAppSelector } from '@store/hooks'
// import useUpdateProfile from './useUpdateProfile'
import settingsStore from '@store/settings'
import _ from 'lodash'
import { GameTitlesResponse } from '@services/settings.service'

const FINAL_STEP = 2
const { selectors, actions } = settingsStore

const GameSelectContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const features = useAppSelector(selectors.getFeatures)
  const gameTitles = useAppSelector(selectors.getAllGameTitles)
  // eslint-disable-next-line no-console
  console.log(features)
  const getFeatures = () => dispatch(actions.getFeatures())
  const getGameTitles = () => dispatch(actions.getAllGameTitles())

  useEffect(() => {
    getFeatures()
    getGameTitles()
  }, [])
  // TODO: 1) uri.constants.ts dotor endpoint todorhoi bolhoor update hiih
  // 2) profile.service.ts dotor ProfileUpdateResponse -iig todorhoi bolhoor typed bolgoh
  const { profileUpdateMeta } = useUpdateProfile()
  // const { resetGetPrefecturesMeta } = useGetPrefectures()

  const [step, setStep] = useState(0)
  const [user, setUser] = useState({
    prefecture: null,
    gender: null,
    birthDate: null,
    tags: [],
    favorite_games: null,
  })
  const [selectedFeatures, setSelectedFeatures] = useState([] as string[])
  const [selectedGTitles, setSelectedGTitles] = useState([] as GameTitlesResponse)
  const [unselectedGTitles, setUnselectedGTitles] = useState([] as GameTitlesResponse)

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('profileUpdateMeta', profileUpdateMeta)
  }, [profileUpdateMeta])

  useEffect(() => {
    setUnselectedGTitles([...gameTitles])
  }, [gameTitles])

  // useEffect(() => {
  // eslint-disable-next-line no-console
  //   console.log('prefecturesMeta', prefecturesMeta)
  // }, [prefecturesMeta])

  // eslint-disable-next-line no-console
  console.log('user', user)
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
    const newUnselected = [...unselectedGTitles]
    const newSelected = [...selectedGTitles]
    if (newUnselected.find((unselectedId) => unselectedId.id === game.id)) {
      _.remove(newUnselected, (unselectedId) => unselectedId.id === game.id)
      newSelected.push(game)
    }
    setUnselectedGTitles(newUnselected)
    setSelectedGTitles(newSelected)
  }

  const onGameSelectionRemove = (game: GameTitlesResponse[0]) => {
    const newUnselected = [...unselectedGTitles]
    const newSelected = [...selectedGTitles]
    if (newSelected.find((selected) => selected.id === game.id)) {
      _.remove(newSelected, (selected) => selected.id === game.id)
      newUnselected.push(game)
    }
    setUnselectedGTitles(newUnselected)
    setSelectedGTitles(newSelected)
  }
  // console.log('user', user)

  const updateUserData = (_data) => {
    setUser({
      prefecture: '1',
      gender: '1',
      birthDate: '1',
      tags: [],
      favorite_games: [],
    })
  }

  function getStepViews() {
    switch (step) {
      case 0:
        return <UserOtherInfo user={user} />
      case 1:
        return <TagSelect features={features} selectedFeatures={selectedFeatures} onSelect={onFeatureSelect} />
      case 2:
        return <GameSelect gameTitles={unselectedGTitles} onGameSelect={onGameTitleClick} />
    }
  }

  // TODO handle confirm
  // eslint-disable-next-line no-console
  const handleConfirm = () => console.log('CONFIRM')

  const handleButtonClick = () => {
    updateUserData(null)

    if (step == FINAL_STEP) handleConfirm()
    else setStep(step + 1)
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Box pt={2} pb={2} alignItems="center" display="flex">
        <Grid container direction="row" justify="space-between" style={{ alignItems: 'center' }}>
          <Typography variant="h2" style={{ fontSize: 30 }}>
            eXeLABへようこそ
          </Typography>
          <Typography>スキップする</Typography>
        </Grid>
      </Box>
      <Grid container direction="column" className={classes.contents}>
        <Box className={classes.stepperHolder}>
          <Stepper activeStep={step} style={{ padding: 0 }}>
            {['基本データ', 'タグ', '好きなゲーム'].map((label, idx) => (
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
                {selectedGTitles.map((game) => (
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
                {step == FINAL_STEP ? '完了' : '次へ'}
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
    background: 'black',
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
    height: 169,
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
export default GameSelectContainer
