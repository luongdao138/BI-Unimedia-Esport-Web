import { useState, useEffect, ChangeEvent } from 'react'
import BRInput from './BRInput'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import { OutlinedInputProps } from '@material-ui/core'

const validateNumber = (value: string | number, participantCount: number): boolean => {
  let res = false
  if ((_.isNumber(Number(value)) && !isNaN(Number(value)) && Number(value) <= participantCount) || _.isEmpty(value)) {
    res = true
  }

  return res
}

interface placementProps {
  value: string | number
}

const BRPlacementInput: React.FC<
  OutlinedInputProps & {
    value: number | null
    onAttackError: (error: boolean) => void
    onChange: ({ target: { value: string } }) => void
    participantCount?: number | null
  }
> = ({ value, participantCount, onChange, onAttackError, ...props }) => {
  const [placement, setPlacement] = useState<placementProps>({ value: value })
  const [error, setError] = useState<boolean>(false)
  const classes = useStyles()

  useEffect(() => {
    if (!validateNumber(placement.value, participantCount)) {
      setError(true)
    } else {
      setError(false)
    }

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

  return (
    <div className={classes.placementInputWrap}>
      <BRInput
        value={placement.value}
        inputProps={{ maxLength: String(participantCount).length }}
        style={{ color: validateNumber(placement.value, participantCount) ? Colors.white_opacity[70] : Colors.secondary }}
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
