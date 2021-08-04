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
import { LobbyDetail } from '@services/lobby.service'
import { UserProfile } from '@services/user.service'
import ESLink from '@components/Link'
import ButtonPrimary from '@components/ButtonPrimary'
import SummaryModal from '@containers/lobby/Detail/Partials/SummaryModal'
import useLobbyHelper from '@containers/lobby/hooks/useLobbyHelper'
import LoginRequired from '@containers/LoginRequired'
import TeamEntryEditModal from './TeamEntryEditModal'
import UnjoinModal from './UnjoinModal'
import InidividualEntryEditModal from './InidividualEntryEditModal'
import { TOURNAMENT_STATUS } from '@constants/tournament.constants'

interface Props {
  lobby: LobbyDetail
  userProfile: UserProfile
}

const ActionComponent: React.FC<Props> = (props) => {
  const { children, lobby, userProfile } = props
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  const {
    toMatches,
    isModerator,
    isTeam,
    isRecruiting,
    isReady,
    isCompleted,
    isCancelled,
    isRecruitmentClosed,
    isNotHeld,
    isAdminJoined,
    isTeamLeader,
    isEntered,
  } = useLobbyHelper(lobby)

  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false)
  const [soloEntryEditShow, setSoloEntryEditShow] = useState<boolean>(false)
  const [soloEntryShow, setSoloEntryShow] = useState<boolean>(false)
  const [teamEntryShow, setTeamEntryShow] = useState<boolean>(false)
  const [teamEntryEditShow, setTeamEntryEditShow] = useState<boolean>(false)

  const buildLobbyPeriodValue = () => {
    const beforeEntry = isReady || isRecruiting
    const targetStartDate = beforeEntry ? lobby.attributes.acceptance_start_date : lobby.attributes.start_date
    const targetEndDate = beforeEntry ? lobby.attributes.acceptance_end_date : lobby.attributes.end_date
    const entryStartDate = TournamentHelper.formatDate(targetStartDate)
    const entryEndDate = TournamentHelper.formatDate(targetEndDate)

    return `${entryStartDate} - ${entryEndDate}`
  }
  const buildLobbyTitle = () => {
    const arenaStatus = isReady || isRecruiting ? t('common:tournament.entry_period') : t('common:tournament.holding_period')

    return `${arenaStatus}`
  }

  const entryButton = () => {
    return (
      <Box className={classes.actionButton}>
        <LoginRequired>
          <ButtonPrimary disabled={isReady} round fullWidth onClick={() => (isTeam ? setTeamEntryShow(true) : setSoloEntryShow(true))}>
            {t('common:tournament.join')}
          </ButtonPrimary>
        </LoginRequired>
      </Box>
    )
  }

  const entryEditButton = () => {
    return (
      <Box className={classes.actionButton}>
        <LoginRequired>
          <ButtonPrimary round fullWidth onClick={() => (isTeam ? setTeamEntryEditShow(true) : setSoloEntryEditShow(true))}>
            {t('common:tournament.check_entry')}
          </ButtonPrimary>
        </LoginRequired>
      </Box>
    )
  }

  const renderAdminEntry = () => {
    return (
      <Box className={classes.buttonHolder}>
        <Box minWidth={260} className={classes.buttonLeft}>
          <CloseRecruitmentModal isRecruiting={isRecruiting} tournament={lobby} handleClose={() => {}} />
        </Box>
      </Box>
    )
  }

  const renderEntry = () => {
    if ((isEntered && isTeamLeader) || isAdminJoined) {
      return entryEditButton()
    } else if (isRecruiting || isReady) {
      return entryButton()
    }
  }

  return (
    <Box>
      <Box className={classes.container}>
        <Box className={classes.header}>
          <Box display="flex" className={classes.headerDesc}>
            <Typography variant="body1" className={classes.headerTitle}>
              {buildLobbyTitle()}
            </Typography>
            <Typography variant="body1">{buildLobbyPeriodValue()}</Typography>
          </Box>
        </Box>
        {children}
        {!isReady && !isCancelled && !isNotHeld && <SubActionButtons tournament={lobby} />}
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

      {isRecruiting ? (
        <>
          {isModerator ? renderAdminEntry() : renderEntry()}
          {isAdminJoined || (isEntered && isTeamLeader) ? <UnjoinModal tournament={lobby} /> : null}
          {isModerator && isRecruiting && (
            <Box pb={2} className={classes.description}>
              <Typography variant="body2">{t('common:tournament.close_recruitment.description')}</Typography>
            </Box>
          )}
        </>
      ) : (
        !TournamentHelper.isStatusPassed(lobby.attributes.status, TOURNAMENT_STATUS.COMPLETED) || (!isReady && renderEntry())
      )}

      {isReady && <>{isModerator ? renderAdminEntry() : renderEntry()}</>}

      {isModerator && isCompleted && !isNotHeld && (
        <Box className={classes.actionButton}>
          <ButtonPrimary round fullWidth onClick={() => setShowSummaryModal(true)}>
            {t('common:tournament.summary')}
          </ButtonPrimary>
          <SummaryModal open={showSummaryModal} tournament={lobby} handleClose={() => setShowSummaryModal(false)} />
        </Box>
      )}

      {/* modals */}
      {teamEntryShow && (
        <TeamEntryModal tournament={lobby} userProfile={userProfile} open={teamEntryShow} onClose={() => setTeamEntryShow(false)} />
      )}
      <TeamEntryEditModal
        tournament={lobby}
        userProfile={userProfile}
        myTeam
        open={teamEntryEditShow}
        onClose={() => setTeamEntryEditShow(false)}
      />
      <InidividualEntryEditModal tournament={lobby} me open={soloEntryEditShow} onClose={() => setSoloEntryEditShow(false)} />
      <IndividualEntryModal tournament={lobby} userProfile={userProfile} open={soloEntryShow} onClose={() => setSoloEntryShow(false)} />
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
  headerTitle: {
    paddingRight: theme.spacing(1),
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
    headerDesc: {
      flexDirection: 'column',
    },
    headerTitle: {
      paddingRight: 0,
    },
  },
}))

export default ActionComponent
