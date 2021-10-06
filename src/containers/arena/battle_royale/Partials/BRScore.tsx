import { OutlinedInputProps } from '@material-ui/core'
import { TournamentRule } from '@services/arena.service'
import BRTimeInput from '@containers/arena/battle_royale/Partials/BRTimeInput'
import BRScoreInput from '@containers/arena/battle_royale/Partials/BRScoreInput'
import BRPlacementInput from '@containers/arena/battle_royale/Partials/BRPlacementInput'

const BRScore: React.FC<
  OutlinedInputProps & {
    type: TournamentRule
    onAttackError: (error: boolean) => void
    onChange: ({ target: { value: string } }) => void
    value: number | null
    participantCount?: number | null
  }
> = ({ type, participantCount, value, onAttackError, onChange, ...props }) => {
  if (type === 'battle_royale') {
    return (
      <BRPlacementInput value={value} participantCount={participantCount} onAttackError={onAttackError} onChange={onChange} {...props} />
    )
  } else if (type === 'time_attack') {
    return <BRTimeInput value={value} onAttackError={onAttackError} onChange={onChange} {...props} />
  } else if (type === 'score_attack') {
    return <BRScoreInput value={value} onAttackError={onAttackError} onChange={onChange} {...props} />
  } else {
    return null
  }
}

export default BRScore
