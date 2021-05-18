import React from 'react'
import { TournamentDetail } from '@services/tournament.service'

interface RecruitingActionProps {
  tournament: TournamentDetail
}
const RecruitingAction: React.FC<RecruitingActionProps> = ({ tournament: _tournament }) => <div>RecruitingAction</div>

export default RecruitingAction
