import BRInput from './BRInput'
import { OutlinedInputProps, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { TournamentRule } from '@services/arena.service'
import BRTimeInput from '@containers/arena/battle_royale/Partials/BRTimeInput'

const BRScoreInput: React.FC<
  OutlinedInputProps & {
    type: TournamentRule
    onAttackError: (error: boolean) => void
    onChange: ({ target: { value: string } }) => void
    value: number | null
  }
> = ({ type, onAttackError, onChange, ...props }) => {
  const classes = useStyles()

  if (type === 'battle_royale') {
    return (
      <div className={classes.scoreInputWrap}>
        <BRInput {...props} placeholder="未入力" />
        <Box className={classes.rankTextHolder}>
          <Typography className={classes.sign}>位</Typography>
        </Box>
      </div>
    )
  } else if (type === 'time_attack') {
    return <BRTimeInput {...props} value={props.value} onAttackError={onAttackError} onChange={onChange} />
  } else {
    return <BRInput {...props} placeholder="未入力" />
  }
}

const useStyles = makeStyles(() => ({
  scoreInputWrap: {
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

export default BRScoreInput
