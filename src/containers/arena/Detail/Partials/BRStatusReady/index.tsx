import { useTranslation } from 'react-i18next'
import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { TournamentDetail } from '@services/arena.service'
import BRHeaderContent from '../BRHeaderContent'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'
import ESButton from '@components/Button'
import RemainingDate from '../ActionComponent/RemainingDate'
import EntryCount from '../ActionComponent/EntryCount'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'

interface BRStatusReadyProps {
  arena: TournamentDetail
}
const BRStatusReady: React.FC<BRStatusReadyProps> = ({ arena }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const dateInterval = `${TournamentHelper.formatDate(arena.attributes.acceptance_start_date)} ～ ${TournamentHelper.formatDate(
    arena.attributes.acceptance_end_date
  )}`
  const { toParticipants, isTeam } = useArenaHelper(arena)
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
          <EntryCount totalCount={arena.attributes.max_participants} count={0} isTeam={isTeam} />
          <ESButton onClick={toParticipants} variant="outlined" fullWidth style={{ maxWidth: 160, marginTop: 24 }}>
            {t('tournament.entry_members')}
          </ESButton>
        </Box>
      }
      footer={
        <Box display="flex" justifyContent="center">
          <Box width={280}>
            <ButtonPrimary disabled fullWidth>
              {t('tournament.before_entry')}
            </ButtonPrimary>
          </Box>
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
