import { OutlinedInputProps } from '@material-ui/core'
import { ParticipantsResponse, TournamentRule } from '@services/arena.service'
import BRTimeInput from '@containers/arena/battle_royale/Partials/BRTimeInput'
import BRScoreInput from '@containers/arena/battle_royale/Partials/BRScoreInput'
import BRPlacementInput from '@containers/arena/battle_royale/Partials/BRPlacementInput'
import { ErrorType } from './BRInput'

const BRScore: React.FC<
  OutlinedInputProps & {
    type: TournamentRule
    onAttackError: (error: ErrorType) => void
    onChange: ({ target: { value: string } }) => void
    value: number | ''
    participantCount?: number | null
    participants: ParticipantsResponse[]
  }
> = ({ type, participantCount, onAttackError, participants, ...props }) => {
  if (type === 'battle_royale') {
    return <BRPlacementInput onAttackError={onAttackError} participantCount={participantCount} {...props} />
  } else if (type === 'time_attack') {
    return <BRTimeInput onAttackError={onAttackError} participants={participants} {...props} />
  } else if (type === 'score_attack') {
    return <BRScoreInput onAttackError={onAttackError} {...props} />
  } else {
    return null
  }
}

export default BRScore
