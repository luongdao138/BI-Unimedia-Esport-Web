import React from 'react'
import { TournamentDetail } from '@services/tournament.service'

interface RecruitingActionProps {
  tournament: TournamentDetail
}
const RecruitingAction: React.FC<RecruitingActionProps> = ({ tournament: _tournament }) => <div>{JSON.stringify(_tournament)}</div>

export default RecruitingAction
