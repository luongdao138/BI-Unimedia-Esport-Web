/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Typography, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
// import { useTranslation } from 'react-i18next'
import IndividualEntryModal from './IndividualEntryModal'
import CloseRecruitmentModal from './CloseRecruitmentModal'
import TeamEntryModal from './TeamEntryModal'
import SubActionButtons from './SubActionButtons'
import { ROLE, STATUS } from '@constants/tournament.constants'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { Colors } from '@theme/colors'
import { TournamentDetail } from '@services/tournament.service'
import { UserProfile } from '@services/user.service'

interface Props {
  tournament: TournamentDetail
  userProfile: UserProfile
}

const ActionComponent: React.FC<Props> = (props) => {
  const { children, tournament, userProfile } = props
  const classes = useStyles()
  // const { t } = useTranslation(['common'])

  const isTeam = tournament.attributes.participant_type > 1
  const myRole = tournament.attributes.my_role
  const isModerator = myRole === ROLE.ADMIN || myRole === ROLE.CO_ORGANIZER

  const buildEntryPeriodValue = () => {
    const entryStartDate = TournamentHelper.formatDate(tournament.attributes.acceptance_start_date)
    const entryEndDate = TournamentHelper.formatDate(tournament.attributes.acceptance_end_date)
    return `エントリー期間 ${entryStartDate} - ${entryEndDate}`
  }

  return (
    <Box>
      <Box className={classes.container}>
        <Box className={classes.header}>
          <Typography variant="body1">{buildEntryPeriodValue()}</Typography>
        </Box>
        {children}
        <SubActionButtons tournament={tournament} />
      </Box>

      {isModerator && status === STATUS.RECRUITING && <CloseRecruitmentModal tournament={tournament} handleClose={() => {}} />}
      {!isModerator && isTeam && <TeamEntryModal tournament={tournament} userProfile={userProfile} handleClose={() => {}} />}
      {!isModerator && !isTeam && <IndividualEntryModal tournament={tournament} userProfile={userProfile} handleClose={() => {}} />}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: '#FFFFFF0F',
    borderRadius: 4,
    padding: 6,
  },
  header: {
    backgroundColor: theme.palette.common.black,
    borderRadius: 4,
    height: 36,
    color: Colors.grey[300],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default ActionComponent
