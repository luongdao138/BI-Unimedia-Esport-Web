import { useState } from 'react'
import { Grid, Typography, Box, Container, Theme, makeStyles } from '@material-ui/core'
// import ESButton from '@components/Button'
import ButtonPrimary from '@components/ButtonPrimary'
import Stepper from '@components/Stepper'
import Step from '@components/Step'
import StepLabel from '@components/StepLabel'
import StepButton from '@components/StepButton'
import TagSelect from '@containers/GameSelect/TagSelect'
import GameSelect from '@containers/GameSelect/GameSelect'
import UserOtherInfo from './UserOtherInfo'

const FINAL_STEP = 2

const GameSelectContainer: React.FC = () => {
  const classes = useStyles()
  const [step, setStep] = useState(0)
  const [user, setUser] = useState({
    prefecture: null,
    gender: null,
    birthDate: null,
    tags: null,
    favorite_games: null,
  })

  console.log('user', user)

  const updateUserData = (data) => {
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
        return <TagSelect />
      case 2:
        return <GameSelect />
    }
  }

  // TODO handle confirm
  const handleConfirm = () => console.log('CONFIRM')

  const handleButtonClick = () => {
    updateUserData()

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
