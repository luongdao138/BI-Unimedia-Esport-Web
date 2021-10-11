import { useTranslation } from 'react-i18next'
import { Typography, Box, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { TournamentDetail } from '@services/arena.service'
import BRHeaderContent from '../BRHeaderContent'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { Colors } from '@theme/colors'
import ESButton from '@components/Button'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'
import ButtonPrimaryOutlined from '@components/ButtonPrimaryOutlined'
import RemainingDate from '../ActionComponent/RemainingDate'
import EntryCount from '../ActionComponent/EntryCount'
import ActionLabelButton from '../ActionComponent/ActionLabelButton'

import { ButtonGroup } from '../BRHeaderContent'

interface BRStatusReadyProps {
  arena: TournamentDetail
}
const BRStatusReady: React.FC<BRStatusReadyProps> = ({ arena }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const dateInterval = `${TournamentHelper.formatDate(arena.attributes.acceptance_start_date)} ～ ${TournamentHelper.formatDate(
    arena.attributes.acceptance_end_date
  )}`
  const { toParticipants, isTeam, toGroupChat, isModerator } = useArenaHelper(arena)
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
          <EntryCount totalCount={arena.attributes.max_participants} count={arena.attributes.interested_count} isTeam={isTeam} />

          <ButtonGroup mt={3}>
            <ESButton onClick={toParticipants} variant="outlined" fullWidth>
              {t('tournament.entry_members')}
            </ESButton>
            {isModerator ? (
              <ActionLabelButton actionLabel={t('arena.temporary')} variant="outlined" fullWidth onClick={toGroupChat} disabled={false}>
                {t('tournament.group_chat')}
              </ActionLabelButton>
            ) : null}
          </ButtonGroup>
        </Box>
      }
      footer={
        <Box textAlign="center">
          {isModerator ? (
            <ButtonGroup size="large" mb={3}>
              <div>
                <ButtonPrimaryOutlined disabled leadingIcon={<Icon className="fas fa-user-slash" fontSize="small" />}>
                  {t('tournament.close_recruitment.button_text')}
                </ButtonPrimaryOutlined>
              </div>
            </ButtonGroup>
          ) : null}
          {isModerator ? <Typography variant="body2">{t('tournament.close_recruitment.description')}</Typography> : null}
        </Box>
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
  [theme.breakpoints.down('sm')]: {
    header: {
      '& span': {
        display: 'block',
      },
    },
  },
}))

export default BRStatusReady
