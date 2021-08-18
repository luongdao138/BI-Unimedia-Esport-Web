import React from 'react'
import { LobbyDetail } from '@services/lobby.service'
import { Box, Typography, makeStyles, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ActionComponent from '../ActionComponent'
import { UserProfile } from '@services/user.service'
import RemainingDate from '@containers/lobby/Detail/Partials/ActionComponent/RemainingDate'

interface RecruitingProps {
  lobby: LobbyDetail
  userProfile: UserProfile
}

const Ready: React.FC<RecruitingProps> = (props) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { lobby } = props
  // const isTeam = lobby.attributes.participant_type > 1
  // const unit = isTeam ? t('common:common.team') : t('common:common.man')
  // const entryMembersCount = lobby.attributes.interested_count + lobby.attributes.participant_count

  return (
    <ActionComponent {...props}>
      <Box className={classes.body}>
        <RemainingDate tournament={lobby} />

        <Box display="flex" flexDirection="row" color={Colors.grey[300]} alignItems="baseline">
          <Typography className={classes.entryMembersInfoText}>{t('common:tournament.number_of_entries')}</Typography>
          <Box mr={2} />
          <Typography className={classes.highlightedNumber}>{'entryMembersCount'}</Typography>
          <Typography>{`${'unit'} /`}&nbsp;</Typography>
          <Typography className={classes.highlightedNumber}>{lobby.attributes.max_participants}</Typography>
          <Typography>{'unit'}</Typography>
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

export default Ready
