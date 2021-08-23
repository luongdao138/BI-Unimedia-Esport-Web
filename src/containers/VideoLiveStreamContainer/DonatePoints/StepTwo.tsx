import { Box, makeStyles } from '@material-ui/core'
import React from 'react'
// import { useTranslation } from 'react-i18next'
// import { Colors } from '@theme/colors'
import StepTwoMissingPoints from './StepTwoMissingPoint'
import StepTwoNewPoint from './StepTwoNewPoint'

interface StepTwoProps {
  type: string
  step: number
  missingPoints?: number
  deleteCard: (card: string) => void
  onNext: (step: number) => void
  cards: Array<any>
  setTypeStepTwo: (value: string) => void
}

const StepTwo: React.FC<StepTwoProps> = ({ type, step, cards, deleteCard, onNext, missingPoints, setTypeStepTwo }) => {
  const classes = useStyles()
  // const { t } = useTranslation('common')
  const onClickStepTwoNewPoint = () => {
    setTypeStepTwo('missing_point')
  }
  return (
    <Box className={classes.rootContainer}>
      {type === 'missing_point' ? (
        <StepTwoMissingPoints step={step} cards={cards} deleteCard={deleteCard} missingPoints={missingPoints} onNext={onNext} />
      ) : (
        <StepTwoNewPoint setTypeStepTwo={onClickStepTwoNewPoint} />
      )}
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  rootContainer: {},
}))
export default StepTwo
