/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Typography, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
// import { useTranslation } from 'react-i18next'
import IndividualEntryModal from './IndividualEntryModal'
import CloseRecruitmentModal from './CloseRecruitmentModal'
import TeamEntryModal from './TeamEntryModal'
import SubActionButtons from './SubActionButtons'
import { ROLE, TOURNAMENT_STATUS } from '@constants/tournament.constants'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { Colors } from '@theme/colors'
import { TournamentDetail } from '@services/tournament.service'
import { UserProfile } from '@services/user.service'
import ESLink from '@components/Link'

interface Props {
  tournament: TournamentDetail
  userProfile: UserProfile
}

const ActionComponent: React.FC<Props> = (props) => {
  const { children, tournament, userProfile } = props
  const classes = useStyles()
  // const { t } = useTranslation(['common'])

  const isTeam = tournament.attributes.participant_type > 1
  const status = tournament.attributes.status
  const myRole = tournament.attributes.my_role
  const isModerator = myRole === ROLE.ADMIN || myRole === ROLE.CO_ORGANIZER
  const isRecruiting = status === TOURNAMENT_STATUS.RECRUITING
  const isRecruitmentClosed = status === TOURNAMENT_STATUS.RECRUITMENT_CLOSED || status === TOURNAMENT_STATUS.READY_TO_START
  const isInProgress = status === TOURNAMENT_STATUS.IN_PROGRESS

  const buildArenaPeriodValue = () => {
    const entryStartDate = TournamentHelper.formatDate(tournament.attributes.acceptance_start_date)
    const entryEndDate = TournamentHelper.formatDate(tournament.attributes.acceptance_end_date)

    const arenaStatus = isRecruiting ? 'エントリー期間' : isRecruitmentClosed || isInProgress ? '開催期間' : ''

    return `${arenaStatus}  ${entryStartDate} - ${entryEndDate}`
  }

  return (
    <Box>
      <Box className={classes.container}>
        <Box className={classes.header}>
          <Typography variant="body1">{buildArenaPeriodValue()}</Typography>
        </Box>
        {children}
        <SubActionButtons tournament={tournament} />
      </Box>

      {isRecruitmentClosed && isModerator && (
        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          <Typography color="primary">{`大会開始前に対戦表を確定してください`}</Typography>
          <Box color={Colors.grey[300]} maxWidth={400} textAlign="center" mt={2}>
            <Typography variant="body2">
              {`締め切りまであと`}
              <ESLink onClick={() => {}}>{'対戦表'}</ESLink>
              {`が確定していない場合はエントリーが無効となるのでご注意ください`}
            </Typography>
          </Box>
        </Box>
      )}

      {!isRecruitmentClosed && (
        <>
          {isModerator && isRecruiting && <CloseRecruitmentModal tournament={tournament} handleClose={() => {}} />}
          {!isModerator && isTeam && <TeamEntryModal tournament={tournament} userProfile={userProfile} handleClose={() => {}} />}
          {!isModerator && !isTeam && <IndividualEntryModal tournament={tournament} userProfile={userProfile} handleClose={() => {}} />}
        </>
      )}
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
