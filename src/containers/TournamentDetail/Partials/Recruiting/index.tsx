import React from 'react'
import { TournamentDetail } from '@services/tournament.service'
import { Box, Typography, makeStyles, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ActionComponent from '../ActionComponent'
import { UserProfile } from '@services/user.service'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'

interface RecruitingProps {
  tournament: TournamentDetail
  userProfile: UserProfile
}

const Recruiting: React.FC<RecruitingProps> = (props) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { tournament } = props
  const isTeam = tournament.attributes.participant_type > 1
  const unit = isTeam ? t('common:common.team') : t('common:common.man')
  const entryMembersCount = tournament.attributes.interested_count + tournament.attributes.participant_count

  return (
    <ActionComponent {...props}>
      <Box className={classes.body}>
        <Box display="flex" flexDirection="row" color={Colors.grey[300]} alignItems="baseline">
          <Typography>{t('common:tournament.until_deadline')}</Typography>
          <Typography className={classes.highlightedNumber}>
            {`${TournamentHelper.getRemainingDate(tournament.attributes.acceptance_end_date)}`}
          </Typography>
          <Typography>{t('common:common.day')}</Typography>
        </Box>

        <Box display="flex" flexDirection="row" color={Colors.grey[300]} alignItems="baseline">
          <Typography className={classes.entryMembersInfoText}>{t('common:tournament.number_of_entries')}</Typography>
          <Box mr={2} />
          <Typography className={classes.highlightedNumber}>{entryMembersCount}</Typography>
          <Typography>{`${unit} /`}&nbsp;</Typography>
          <Typography className={classes.highlightedNumber}>{tournament.attributes.max_participants}</Typography>
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
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}))

export default Recruiting
