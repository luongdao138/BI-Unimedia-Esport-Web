import { useState, useEffect, ChangeEvent } from 'react'
import BRInput, { ErrorType } from './BRInput'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import { OutlinedInputProps } from '@material-ui/core'

const validateError = ({ value }: PlacementProps, max: number): ErrorType => {
  const error: ErrorType = {}
  if (value) {
    if (Number(value) > max) {
      error['placement_max_exceeds'] = true
    }
    if (!(_.isNumber(Number(value)) && !isNaN(Number(value)))) {
      error['only_digit'] = true
    }
  }

  return error
}
interface PlacementProps {
  value: string | number
}

const BRPlacementInput: React.FC<
  OutlinedInputProps & {
    value: number | ''
    onAttackError?: (error: ErrorType) => void
    onChange: ({ target: { value: string } }) => void
    participantCount?: number | null
  }
> = ({ value, participantCount, onAttackError, onChange, ...props }) => {
  const [placement, setPlacement] = useState<PlacementProps>({ value })
  const [error, setError] = useState<ErrorType>({})
  const classes = useStyles()

  useEffect(() => {
    setError(validateError(placement, participantCount))
    onChange({ target: { value: String(placement.value) } })
  }, [placement])

  useEffect(() => {
    onAttackError(error)
  }, [error])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlacement((prevState) => ({
      ...prevState,
      value: event.target.value,
    }))
  }
  const hasError = Object.keys(error).length

  return (
    <div className={classes.placementInputWrap}>
      <BRInput
        value={placement.value}
        inputProps={{ maxLength: String(participantCount).length }}
        style={{ color: hasError ? Colors.secondary : Colors.white_opacity[70] }}
        onChange={handleChange}
        placeholder={i18n.t('common:arena.not_entered')}
        {...props}
      />
      <Box className={classes.rankTextHolder}>
        <Typography className={classes.sign}>{i18n.t('common:arena.rank')}</Typography>
      </Box>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  placementInputWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  rankTextHolder: {
    paddingRight: 12,
    paddingLeft: 12,
  },
  sign: {
    fontWeight: 'bold',
  },
}))

export default BRPlacementInput
