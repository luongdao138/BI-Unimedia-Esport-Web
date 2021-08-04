import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import { LobbyDetail } from '@services/lobby.service'
import { UserProfile } from '@services/user.service'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ActionComponent from '../ActionComponent'
import RemainingDate from '../ActionComponent/RemainingDate'
import { getIsAuthenticated } from '@store/auth/selectors'
import { useAppSelector } from '@store/hooks'

interface RecruitmentClosedProps {
  lobby: LobbyDetail
  userProfile: UserProfile
}

const RecruitmentClosed: React.FC<RecruitmentClosedProps> = (props) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { lobby } = props
  const isTeam = lobby.attributes.participant_type > 1
  const unit = isTeam ? t('common:common.team') : t('common:common.man')
  const entryMembersCount = lobby.attributes.interested_count + lobby.attributes.participant_count
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const isEntered = lobby.attributes.is_entered

  const statusName = {
    admin: isEntered ? t('common:arena.participate_status.participating') : null,
    interested: t('common:arena.participate_status.loss'),
    participant: t('common:arena.participate_status.participating'),
  }

  return (
    <ActionComponent {...props}>
      <Box className={classes.body}>
        {statusName[lobby.attributes.my_role] || isAuthenticated ? (
          <Box display="flex" flexDirection="row">
            <Typography className={classes.roundInfoText}>
              {statusName[lobby.attributes.my_role] || (isAuthenticated && t('common:recruitment.participate_status.no_entry')) || null}
            </Typography>
          </Box>
        ) : (
          <RemainingDate tournament={lobby} />
        )}
        <Box display="flex" flexDirection="row" color={Colors.grey[300]} alignItems="baseline">
          <Typography className={classes.entryMembersInfoText}>{t('common:tournament.number_of_entries')}</Typography>
          <Box mr={2} />
          <Typography className={classes.highlightedNumber}>{entryMembersCount}</Typography>
          <Typography>{`${unit} /`}&nbsp;</Typography>
          <Typography className={classes.highlightedNumber}>{lobby.attributes.max_participants}</Typography>
          <Typography>{unit}</Typography>
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
  roundInfoText: {
    fontSize: '1.5rem',
    color: theme.palette.common.white,
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
