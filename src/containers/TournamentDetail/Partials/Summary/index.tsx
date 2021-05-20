/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, makeStyles, Typography, Theme } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { TournamentDetail } from '@services/tournament.service'
import { useTranslation } from 'react-i18next'
import ESButton from '@components/Button'
import Participants from '@containers/TournamentDetail/Participants'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { ROLE } from '@constants/tournament.constants'

interface Props {
  tournament: TournamentDetail
  extended?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Summary: React.FC<Props> = ({ tournament }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  // console.log('tournament', tournament)

  const buildEntryPeriodValue = () => {
    const entryStartDate = TournamentHelper.formatDate(tournament.attributes.acceptance_start_date)
    const entryEndDate = TournamentHelper.formatDate(tournament.attributes.acceptance_end_date)
    return `エントリー期間 ${entryStartDate} - ${entryEndDate}`
  }

  const role = tournament.attributes.my_role
  const isModerator = role === ROLE.ADMIN || role === ROLE.CO_ORGANIZER

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography variant="body1">{buildEntryPeriodValue()}</Typography>
      </Box>

      <Box className={classes.body}>
        <Box display="flex" flexDirection="row" color={Colors.grey[300]} alignItems="baseline">
          <Typography>{`締め切りまであと`}</Typography>
          <Typography className={classes.highlightedNumber}>
            {`${TournamentHelper.getRemainingDate(tournament.attributes.acceptance_end_date)}`}
          </Typography>
          <Typography>{`日`}</Typography>
        </Box>

        <Box display="flex" flexDirection="row" color={Colors.grey[300]} alignItems="baseline">
          <Typography className={classes.entryMembersInfoText}>{t('common:tournament.number_of_entries')}</Typography>
          <Box mr={2} />
          <Typography className={classes.highlightedNumber}>{tournament.attributes.participant_count}</Typography>
          <Typography>{`${t('common:common.man')} / `}</Typography>
          <Typography className={classes.highlightedNumber}>{tournament.attributes.max_participants}</Typography>
          <Typography>{t('common:common.man')}</Typography>
        </Box>

        <Box className={classes.actionButtonContainer}>
          {tournament.attributes.is_entered || isModerator ? (
            <>
              <Box className={classes.actionButton}>
                <Participants detail={tournament} />
              </Box>
              <Box className={classes.actionButton}>
                <ESButton variant="outlined" fullWidth onClick={() => {}}>
                  グループチャット
                </ESButton>
              </Box>
            </>
          ) : (
            <Box className={classes.actionButton}>
              <Participants detail={tournament} />
            </Box>
          )}
        </Box>

        <Box className={classes.actionButtonContainer}>
          <Box className={classes.actionButton}>
            <ESButton variant="outlined" fullWidth onClick={() => {}}>
              対戦表
            </ESButton>
          </Box>
        </Box>
      </Box>
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
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  actionButton: {
    width: theme.spacing(20),
    margin: 8,
  },
  highlightedNumber: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  entryMembersInfoText: {
    fontSize: '1rem',
    fontWeight: 'normal',
  },
}))

Summary.defaultProps = {
  extended: false,
}

export default Summary
