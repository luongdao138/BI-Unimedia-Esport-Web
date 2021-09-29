import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { Colors } from '@theme/colors'

import { TournamentDetail } from '@services/arena.service'
import { UserProfile } from '@services/user.service'
import BRHeaderContent from '../BRHeaderContent'
import ButtonPrimary from '@components/ButtonPrimary'
import ESButton from '@components/Button'
import RemainingDate from '../ActionComponent/RemainingDate'
import EntryCount from '../ActionComponent/EntryCount'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'
import LoginRequired from '@containers/LoginRequired'
import CloseRecruitmentModal from './CloseRecruitmentModal'

import InidividualEntryEditModal from '../ActionComponent/InidividualEntryEditModal'
import IndividualEntryModal from '../ActionComponent/IndividualEntryModal'
import TeamEntryEditModal from '../ActionComponent/TeamEntryEditModal'
import TeamEntryModal from '../ActionComponent/TeamEntryModal'
import ActionLabelButton from '../ActionComponent/ActionLabelButton'
import UnjoinModal from './UnjoinModal'

interface BRStatusRecruitingProps {
  arena: TournamentDetail
  userProfile: UserProfile
}
const BRStatusRecruiting: React.FC<BRStatusRecruitingProps> = ({ arena, userProfile }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const dateInterval = `${TournamentHelper.formatDate(arena.attributes.acceptance_start_date)} ～ ${TournamentHelper.formatDate(
    arena.attributes.acceptance_end_date
  )}`
  const { toParticipants, toGroupChat, isTeam, isModerator, isInterested, isTeamLeader } = useArenaHelper(arena)
  const entryMembersCount = arena.attributes.interested_count + arena.attributes.participant_count

  const [open, setOpen] = useState(false)
  const handleOpenEntryModal = () => {
    setOpen(true)
  }
  const handleCloseEntryModal = () => {
    setOpen(false)
  }

  return (
    <BRHeaderContent
      header={
        <Typography className={classes.header}>
          {t('tournament.entry_period')}
          <span> {dateInterval}</span>
        </Typography>
      }
      content={
        <Box display="flex" flexDirection="column" alignItems="center">
          <RemainingDate tournament={arena} />
          <EntryCount totalCount={arena.attributes.max_participants} count={entryMembersCount} isTeam={isTeam} />
          <Box className={classes.buttonGroup} mt={3}>
            <ESButton onClick={toParticipants} variant="outlined" fullWidth style={{ maxWidth: 160 }}>
              {t('tournament.entry_members')}
            </ESButton>
            {isModerator || isInterested ? (
              <ActionLabelButton
                actionLabel={t('arena.temporary')}
                variant="outlined"
                fullWidth
                onClick={toGroupChat}
                disabled={false}
                style={{ width: 160 }}
              >
                {t('tournament.group_chat')}
              </ActionLabelButton>
            ) : null}
          </Box>
        </Box>
      }
      footer={
        <div className={classes.footerContainer}>
          <Box className={classes.buttonGroup} mb={3}>
            {isModerator ? (
              <Box minWidth={260} className={classes.button}>
                <CloseRecruitmentModal isRecruiting={true} tournament={arena} handleClose={noop} />
              </Box>
            ) : null}
            <Box minWidth={256} className={classes.button}>
              <LoginRequired>
                <ButtonPrimary disabled={false} round fullWidth onClick={handleOpenEntryModal}>
                  {isTeamLeader ? t('tournament.check_entry') : t('tournament.join')}
                </ButtonPrimary>
              </LoginRequired>
            </Box>
          </Box>
          {isTeamLeader ? <UnjoinModal tournament={arena} /> : null}
          {isModerator ? <Typography variant="body2">{t('tournament.close_recruitment.description')}</Typography> : null}

          {/* Modals */}

          {isTeam ? (
            isTeamLeader ? (
              <TeamEntryEditModal tournament={arena} userProfile={userProfile} myTeam open={open} onClose={handleCloseEntryModal} />
            ) : open ? (
              <TeamEntryModal tournament={arena} userProfile={userProfile} open={open} onClose={handleCloseEntryModal} />
            ) : null
          ) : isInterested ? (
            <InidividualEntryEditModal tournament={arena} me open={open} onClose={handleCloseEntryModal} />
          ) : (
            <IndividualEntryModal tournament={arena} userProfile={userProfile} open={open} onClose={handleCloseEntryModal} />
          )}
        </div>
      }
    />
  )
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

const useStyles = makeStyles((theme) => ({
  header: {
    color: Colors.white_opacity['70'],
    '& span': {
      fontWeight: 700,
      paddingLeft: theme.spacing(1),
    },
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    '& >*': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 160,
    },
    '& >*:first-child': {
      marginLeft: 0,
    },
    '& >*:last-child': {
      marginRight: 0,
    },
  },
  button: {
    marginRight: 8,
    marginLeft: 8,
  },
  [theme.breakpoints.down('sm')]: {
    header: {
      '& span': {
        display: 'block',
      },
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      '& >*': {
        marginLeft: 0,
        marginRight: 0,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    },
    button: {
      marginRight: 0,
      marginLeft: 0,
      marginBottom: theme.spacing(1),
    },
    buttonRight: {
      marginLeft: 0,
    },
  },
}))

export default BRStatusRecruiting
