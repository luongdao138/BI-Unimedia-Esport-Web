import { useTranslation } from 'react-i18next'
import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { Colors } from '@theme/colors'

import { TournamentDetail } from '@services/arena.service'
import BRHeaderContent from '../BRHeaderContent'
import ESButton from '@components/Button'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'
import ActionLabelButton from '../ActionComponent/ActionLabelButton'
import { ButtonGroup } from '../BRHeaderContent'

interface BRStatusRecruitingProps {
  arena: TournamentDetail
}
const BRStatusRecruiting: React.FC<BRStatusRecruitingProps> = ({ arena }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const dateInterval = `${TournamentHelper.formatDate(arena.attributes.start_date)} ～ ${TournamentHelper.formatDate(
    arena.attributes.end_date
  )}`
  const { toParticipants, toGroupChat, isModerator, isTeamLeader, toMatches, isFreezed, isParticipant, isInterested } = useArenaHelper(
    arena
  )

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
              {isModerator
                ? t('arena.participate_status.ongoing')
                : isParticipant
                ? t('arena.participate_status.participating')
                : isInterested
                ? t('arena.participate_status.loss')
                : t('arena.participate_status.no_entry')}
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
                  disabled={!(isParticipant || isModerator)}
                  style={{ width: 160 }}
                >
                  {t('tournament.group_chat')}
                </ActionLabelButton>
                {isModerator || isParticipant ? (
                  <ActionLabelButton
                    variant="outlined"
                    fullWidth
                    onClick={toMatches}
                    disabled={!(isModerator || isParticipant)}
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
          </ButtonGroup>
        </Box>
      }
      footer={<div />}
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

  [theme.breakpoints.down('sm')]: {
    header: {
      '& span': {
        display: 'block',
      },
    },
  },
}))

export default BRStatusRecruiting
