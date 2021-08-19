/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Typography, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import CloseRecruitmentModal from './CloseRecruitmentModal'
import SubActionButtons from './SubActionButtons'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { Colors } from '@theme/colors'
import { LobbyDetail } from '@services/lobby.service'
import { UserProfile } from '@services/user.service'
import ButtonPrimary from '@components/ButtonPrimary'
import useLobbyHelper from '@containers/lobby/hooks/useLobbyHelper'
import LoginRequired from '@containers/LoginRequired'
import UnjoinModal from './UnjoinModal'

interface Props {
  lobby: LobbyDetail
  userProfile: UserProfile
}

const ActionComponent: React.FC<Props> = (props) => {
  const { children, lobby } = props
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  const { isModerator, isRecruiting, isReady, isCancelled, isNotHeld, isEntered } = useLobbyHelper(lobby)

  const buildLobbyPeriodValue = () => {
    if (isReady || isRecruiting) {
      const entryStartDate = TournamentHelper.formatDate(lobby.attributes.entry_start_datetime)
      const entryEndDate = TournamentHelper.formatDate(lobby.attributes.entry_end_datetime)
      return `${entryStartDate} - ${entryEndDate}`
    } else {
      return `${TournamentHelper.formatDate(lobby.attributes.start_datetime)}`
    }
  }
  const buildLobbyTitle = () => {
    const arenaStatus = isReady || isRecruiting ? t('common:tournament.entry_period') : t('common:recruitment.date_time')

    return `${arenaStatus}`
  }

  const handleEntry = () => {}

  const renderAdminEntry = () => {
    if ((isRecruiting || isReady) && isModerator) {
      return (
        <Box className={classes.buttonHolder}>
          <Box minWidth={260} className={classes.buttonLeft}>
            <CloseRecruitmentModal isRecruiting={isRecruiting} tournament={lobby} handleClose={() => {}} />
          </Box>
        </Box>
      )
    }

    return null
  }

  const renderEntry = () => {
    if ((isRecruiting || isReady) && !isModerator && !isEntered) {
      return (
        <Box className={classes.actionButton}>
          <LoginRequired>
            <ButtonPrimary disabled={isReady} round fullWidth onClick={handleEntry}>
              {t('common:tournament.join')}
            </ButtonPrimary>
          </LoginRequired>
        </Box>
      )
    }

    return null
  }

  const renderEntryDecline = () => {
    if (isRecruiting && isEntered) {
      // isAdminJoined?
      return <UnjoinModal tournament={lobby} />
    }

    return null
  }

  const renderEntryCloseWarning = () => {
    if (isRecruiting && isModerator) {
      return (
        <Box pb={2} className={classes.description}>
          <Typography variant="body2">{t('common:tournament.close_recruitment.description')}</Typography>
        </Box>
      )
    }

    return null
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
        {!isReady && !isCancelled && !isNotHeld && <SubActionButtons lobby={lobby} />}
      </Box>

      {renderAdminEntry()}
      {renderEntry()}
      {renderEntryDecline()}
      {renderEntryCloseWarning()}

      {/* {isRecruiting ? (
        <>
        </>
      ) : (
        !TournamentHelper.isStatusPassed(lobby.attributes.status, TOURNAMENT_STATUS.COMPLETED) || (!isReady && renderEntry())
      )} */}

      {/* {isReady && <>{isModerator ? renderAdminEntry() : renderEntry()}</>} */}
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
