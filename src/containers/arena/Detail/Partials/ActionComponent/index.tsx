/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Typography, makeStyles, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import IndividualEntryModal from './IndividualEntryModal'
import CloseRecruitmentModal from './CloseRecruitmentModal'
import TeamEntryModal from './TeamEntryModal'
import SubActionButtons from './SubActionButtons'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { Colors } from '@theme/colors'
import { TournamentDetail } from '@services/arena.service'
import { UserProfile } from '@services/user.service'
import ESLink from '@components/Link'
import ButtonPrimary from '@components/ButtonPrimary'
import SummaryModal from '@containers/arena/Detail/Partials/SummaryModal'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'
import LoginRequired from '@containers/LoginRequired'
import TeamEntryEditModal from './TeamEntryEditModal'
import UnjoinModal from './UnjoinModal'

interface Props {
  tournament: TournamentDetail
  userProfile: UserProfile
}

const ActionComponent: React.FC<Props> = (props) => {
  const { children, tournament, userProfile } = props
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const [entryModalOpen, setEntryModalOpen] = useState(false)

  const { toMatches, isModerator, isTeam, isInProgress, isRecruiting, isCompleted, isRecruitmentClosed, isAdminJoined } = useArenaHelper(
    tournament
  )

  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false)

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
  const hideEntryModal = () => {
    setEntryModalOpen(false)
  }
  const renderTeamEntry = () => {
    return (
      <Box>
        <LoginRequired>
          <Box className={classes.actionButton}>
            {(tournament.attributes.is_entered && tournament.attributes.my_role) === 'interested' ? (
              <Box>
                <TeamEntryEditModal tournament={tournament} userProfile={userProfile} />
                <UnjoinModal tournament={tournament} />
              </Box>
            ) : null}
            {tournament.attributes.my_role === null && (
              <ButtonPrimary round fullWidth onClick={() => setEntryModalOpen(true)}>
                {t('common:tournament.join')}
              </ButtonPrimary>
            )}
          </Box>
        </LoginRequired>
      </Box>
    )
  }

  const renderAdminTeamEntry = () => {
    return (
      <>
        <Box className={classes.buttonHolder}>
          <Box minWidth={260} className={classes.buttonLeft}>
            <CloseRecruitmentModal tournament={tournament} handleClose={() => {}} />
          </Box>
          <Box minWidth={256} className={classes.buttonRight}>
            {isTeam ? (
              <Box className={classes.actionButton}>
                {isAdminJoined() ? (
                  <Box>
                    <TeamEntryEditModal tournament={tournament} userProfile={userProfile} />
                  </Box>
                ) : (
                  <ButtonPrimary round fullWidth onClick={() => setEntryModalOpen(true)}>
                    {t('common:tournament.join')}
                  </ButtonPrimary>
                )}
              </Box>
            ) : (
              <IndividualEntryModal tournament={tournament} userProfile={userProfile} handleClose={() => {}} hideUnjoin={isAdminJoined()} />
            )}
          </Box>
        </Box>
        {isAdminJoined() ? <UnjoinModal tournament={tournament} /> : null}
      </>
    )
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
              <ESLink onClick={toMatches}>{t('common:tournament.brackets')}</ESLink>
              {t('common:tournament.confirm_brackets_desc_tail')}
            </Typography>
          </Box>
        </Box>
      )}

      {isRecruiting && (
        <>
          {isModerator ? (
            <Box>
              {renderAdminTeamEntry()}
              <Box className={classes.description}>
                <Typography variant="body2">{t('common:tournament.close_recruitment.description')}</Typography>
              </Box>
            </Box>
          ) : null}
          {entryModalOpen ? <TeamEntryModal tournament={tournament} userProfile={userProfile} handleClose={hideEntryModal} /> : null}
          {!isModerator && isTeam && renderTeamEntry()}
          {!isModerator && !isTeam && <IndividualEntryModal tournament={tournament} userProfile={userProfile} handleClose={() => {}} />}
        </>
      )}

      {isModerator && isCompleted && (
        <Box className={classes.actionButton}>
          <ButtonPrimary round fullWidth onClick={() => setShowSummaryModal(true)}>
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
  description: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  buttonHolder: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonLeft: {
    marginRight: theme.spacing(1),
  },
  buttonRight: {
    marginLeft: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    buttonHolder: {
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
    },
    buttonLeft: {
      marginRight: 0,
    },
    buttonRight: {
      marginLeft: 0,
    },
  },
}))

export default ActionComponent
