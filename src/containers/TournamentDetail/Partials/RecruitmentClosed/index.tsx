import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import { TournamentDetail } from '@services/tournament.service'
import { UserProfile } from '@services/user.service'
import { Colors } from '@theme/colors'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { useTranslation } from 'react-i18next'
import ActionComponent from '../ActionComponent'

interface Props {
  tournament: TournamentDetail
  userProfile: UserProfile
}

const RecruitmentClosed: React.FC<Props> = (props) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { tournament } = props

  return (
    <ActionComponent {...props}>
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
      </Box>
    </ActionComponent>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  highlightedNumber: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  entryMembersInfoText: {
    fontSize: '1rem',
    fontWeight: 'normal',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}))

export default RecruitmentClosed
