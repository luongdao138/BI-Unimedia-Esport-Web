import { useState } from 'react'
import { Grid, Typography, Box, Container, Theme, makeStyles } from '@material-ui/core'
import ESChip from '@components/Chip'
import ESButton from '@components/Button'
import Stepper from '@components/Stepper'
import Step from '@components/Step'
import StepLabel from '@components/StepLabel'
import StepButton from '@components/StepButton'

const GameSelectContainer: React.FC = () => {
  const classes = useStyles()
  const [step, setStep] = useState(2)
  const onChipClick = (id: number) => {
    // eslint-disable-next-line no-console
    console.log(id)
  }
  const chips = [
    {
      id: 1,
      name: '学生',
    },
    {
      id: 2,
      name: '会社員',
    },
    {
      id: 3,
      name: 'パート・アルバイト',
    },
    {
      id: 4,
      name: 'プロゲーマー',
    },
    {
      id: 5,
      name: 'ストリーマー',
    },
    {
      id: 6,
      name: 'シニア',
    },
    {
      id: 7,
      name: 'ゲーム初心者',
    },
    {
      id: 8,
      name: 'エンジョイ勢',
    },
    {
      id: 9,
      name: 'ガチ勢',
    },
    {
      id: 10,
      name: '大会参加したい',
    },
    {
      id: 11,
      name: '大会参加したい',
    },
    {
      id: 12,
      name: '大会参加したい',
    },
    {
      id: 13,
      name: '大会参加したい',
    },
    {
      id: 14,
      name: '大会参加したい',
    },
  ]
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
          <Stepper activeStep={step}>
            {['基本データ', 'タグ', '好きなゲーム'].map((label, idx) => (
              <Step key={idx}>
                <StepButton onClick={() => setStep(idx)}>
                  <StepLabel>{label}</StepLabel>
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box marginTop={5}>
          {chips.map((chip) => (
            <ESChip key={chip.id} className={classes.chipSpacing} label={chip.name} onClick={() => onChipClick(chip.id)} />
          ))}
        </Box>
        <Box className={classes.blankSpace}></Box>
      </Grid>
      <Box className={classes.stickyFooter}>
        <Container maxWidth="md" className={classes.container} style={{ marginTop: 0 }}>
          <Box className={classes.nextBtnHolder}>
            <ESButton variant="contained" color="primary" size="large" className={classes.nextBtn} round gradient>
              次へ
            </ESButton>
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
  chipSpacing: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
