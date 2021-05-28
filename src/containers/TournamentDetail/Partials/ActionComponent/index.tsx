/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Typography, makeStyles, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
import ButtonPrimary from '@components/ButtonPrimary'
import SummaryModal from '@containers/TournamentDetail/Partials/SummaryModal'

interface Props {
  tournament: TournamentDetail
  userProfile: UserProfile
}

const ActionComponent: React.FC<Props> = (props) => {
  const { children, tournament, userProfile } = props
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false)
  const isTeam = tournament.attributes.participant_type > 1
  const status = tournament.attributes.status
  const myRole = tournament.attributes.my_role
  const isModerator = myRole === ROLE.ADMIN || myRole === ROLE.CO_ORGANIZER
  const isRecruiting = status === TOURNAMENT_STATUS.RECRUITING
  const isRecruitmentClosed = status === TOURNAMENT_STATUS.RECRUITMENT_CLOSED || status === TOURNAMENT_STATUS.READY_TO_START
  const isInProgress = status === TOURNAMENT_STATUS.IN_PROGRESS
  const isCompleted = status === TOURNAMENT_STATUS.COMPLETED

  const buildArenaPeriodValue = () => {
    const entryStartDate = TournamentHelper.formatDate(tournament.attributes.acceptance_start_date)
    const entryEndDate = TournamentHelper.formatDate(tournament.attributes.acceptance_end_date)

    const arenaStatus = isRecruiting
      ? t('common:tournament.entry_period')
      : isRecruitmentClosed || isInProgress || isCompleted
      ? t('common:tournament.holding_period')
      : ''

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
          <Typography color="primary">{t('common:tournament.confirm_brackets')}</Typography>
          <Box color={Colors.grey[300]} maxWidth={400} textAlign="center" mt={2}>
            <Typography variant="body2">
              {t('common:tournament.until_deadline')}
              <ESLink onClick={() => {}}>{t('common:tournament.brackets')}</ESLink>
              {t('common:tournament.confirm_brackets_desc_tail')}
            </Typography>
          </Box>
        </Box>
      )}

      {isRecruiting && (
        <>
          {isModerator && <CloseRecruitmentModal tournament={tournament} handleClose={() => {}} />}
          {!isModerator && isTeam && <TeamEntryModal tournament={tournament} userProfile={userProfile} handleClose={() => {}} />}
          {!isModerator && !isTeam && <IndividualEntryModal tournament={tournament} userProfile={userProfile} handleClose={() => {}} />}
        </>
      )}

      {isModerator && isCompleted && (
        <Box className={classes.actionButton}>
          <ButtonPrimary round fullWidth onClick={() => {}}>
            {t('common:tournament.summary')}
          </ButtonPrimary>
          <SummaryModal open={showSummaryModal} tournament={tournament} handleClose={() => setShowSummaryModal(false)} />
        </Box>
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
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: Colors.grey[300],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  actionButton: {
    marginTop: theme.spacing(3),
    width: '100%',
    margin: '0 auto',
    maxWidth: theme.spacing(35),
  },
}))

export default ActionComponent
