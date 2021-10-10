// import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { Colors } from '@theme/colors'

import { TournamentDetail } from '@services/arena.service'
import BRHeaderContent from '../BRHeaderContent'
import ESButton from '@components/Button'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'
// import { UserProfile } from '@services/user.service'
// import ButtonPrimary from '@components/ButtonPrimary'
// import LoginRequired from '@containers/LoginRequired'

// import InidividualEntryEditModal from '../ActionComponent/InidividualEntryEditModal'
// import TeamEntryEditModal from '../ActionComponent/TeamEntryEditModal'
import ActionLabelButton from '../ActionComponent/ActionLabelButton'
import { ButtonGroup } from '../BRHeaderContent'

interface BRStatusRecruitingProps {
  arena: TournamentDetail
  // userProfile: UserProfile
}
const BRStatusRecruiting: React.FC<BRStatusRecruitingProps> = ({ arena }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const dateInterval = `${TournamentHelper.formatDate(arena.attributes.start_date)} ～ ${TournamentHelper.formatDate(
    arena.attributes.end_date
  )}`
  const { toParticipants, toGroupChat, isModerator, isTeamLeader, toMatches, isFreezed, isParticipant } = useArenaHelper(arena)

  const statusName = {
    admin: t('arena.participate_status.ongoing'),
    co_organizer: t('arena.participate_status.ongoing'),
    interested: t('arena.participate_status.loss'),
    participant: t('arena.participate_status.participating'),
  }

  // const [open, setOpen] = useState(false)
  // const handleOpenEntryModal = () => {
  //   setOpen(true)
  // }
  // const handleCloseEntryModal = () => {
  //   setOpen(false)
  // }

  return (
    <BRHeaderContent
      header={
        <Typography className={classes.header}>
          {t('tournament.holding_period')}
          <span> {dateInterval}</span>
        </Typography>
      }
      content={
        <Box display="flex" flexDirection="column" alignItems="center">
          {arena.attributes.is_freezed ? (
            <Typography variant="h5" gutterBottom>
              {statusName[arena.attributes.my_role] || t('arena.participate_status.no_entry')}
            </Typography>
          ) : null}
          <ButtonGroup>
            {isFreezed ? (
              <>
                <ESButton onClick={toParticipants} variant="outlined" fullWidth>
                  {t('tournament.participants')}
                </ESButton>
                <ActionLabelButton
                  variant="outlined"
                  fullWidth
                  onClick={toGroupChat}
                  disabled={!((isTeamLeader && isParticipant) || isModerator)}
                  style={{ width: 160 }}
                >
                  {t('tournament.group_chat')}
                </ActionLabelButton>
                {isModerator || (isTeamLeader && isParticipant) ? (
                  <ActionLabelButton
                    variant="outlined"
                    fullWidth
                    onClick={toMatches}
                    disabled={!(isModerator || isTeamLeader)}
                    style={{ width: 160 }}
                  >
                    {t('arena.input_result')}
                  </ActionLabelButton>
                ) : null}
              </>
            ) : (
              <>
                <ESButton onClick={toParticipants} variant="outlined" fullWidth>
                  {t('tournament.entry_members')}
                </ESButton>
                {isModerator ? (
                  <ESButton variant="outlined" fullWidth onClick={toMatches}>
                    {t('tournament.select_br_participants')}
                  </ESButton>
                ) : null}
                <ActionLabelButton
                  actionLabel={t('arena.temporary')}
                  variant="outlined"
                  fullWidth
                  onClick={toGroupChat}
                  disabled={!((isTeamLeader && isParticipant) || isModerator)}
                  style={{ width: 160 }}
                >
                  {t('tournament.group_chat')}
                </ActionLabelButton>
              </>
            )}
            {/* <ESButton onClick={toParticipants} variant="outlined" fullWidth style={{ maxWidth: 160 }}>
              {isFreezed ? t('tournament.participants') : t('tournament.entry_members')}
            </ESButton>
            {isModerator && !isFreezed ? (
              <ESButton variant="outlined" fullWidth onClick={toMatches}>
                {t('tournament.select_br_participants')}
              </ESButton>
            ) : null}
            {isFreezed ? (
              <ActionLabelButton
                variant="outlined"
                fullWidth
                onClick={toGroupChat}
                disabled={!((isTeamLeader && isParticipant) || isModerator)}
                style={{ width: 160 }}
              >
                {t('tournament.group_chat')}
              </ActionLabelButton>
            ) : (
              <ActionLabelButton
                actionLabel={t('arena.temporary')}
                variant="outlined"
                fullWidth
                onClick={toGroupChat}
                disabled={!(isModerator || isTeamLeader)}
                style={{ width: 160 }}
              >
                {t('tournament.group_chat')}
              </ActionLabelButton>
            )}
            {isFreezed && (isModerator || (isTeamLeader && isParticipant)) ? (
              <ActionLabelButton
                variant="outlined"
                fullWidth
                onClick={toMatches}
                disabled={!(isModerator || isTeamLeader)}
                style={{ width: 160 }}
              >
                {t('arena.input_result')}
              </ActionLabelButton>
            ) : null} */}
          </ButtonGroup>
        </Box>
      }
      footer={
        <div className={classes.footerContainer}>
          {/* <ButtonGroup mb={3}>
            {isTeamLeader ? (
              <Box minWidth={256} className={classes.button}>
                <LoginRequired>
                  <ButtonPrimary disabled={false} round fullWidth onClick={handleOpenEntryModal}>
                    {t('tournament.check_entry')}
                  </ButtonPrimary>
                </LoginRequired>
              </Box>
            ) : null}
          </ButtonGroup> */}
          {/* {isModerator && !arena.attributes.is_freezed ? <Typography variant="body2">{t('tournament.confirm_brackets')}</Typography> : null} */}

          {/* Modals */}

          {/* {isTeamLeader ? (
            isTeam ? (
              <TeamEntryEditModal tournament={arena} userProfile={userProfile} myTeam open={open} onClose={handleCloseEntryModal} />
            ) : (
              <InidividualEntryEditModal tournament={arena} me open={open} onClose={handleCloseEntryModal} />
            )
          ) : null} */}
        </div>
      }
    />
  )
}

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

  [theme.breakpoints.down('sm')]: {
    header: {
      '& span': {
        display: 'block',
      },
    },
  },
}))

export default BRStatusRecruiting
