import React from 'react'
import { LobbyDetail } from '@services/lobby.service'
import { Box, makeStyles, Theme } from '@material-ui/core'
import ActionComponent from '../ActionComponent'
import { UserProfile } from '@services/user.service'
import RemainingDate from '@containers/lobby/Detail/Partials/ActionComponent/RemainingDate'
import EntryMembersCount from '@components/EntryMembersCount'
import _ from 'lodash'

interface RecruitingProps {
  lobby: LobbyDetail
  userProfile: UserProfile
}

const Recruiting: React.FC<RecruitingProps> = (props) => {
  const classes = useStyles()
  const { lobby } = props
  const entryMembersCount = _.defaultTo(lobby.attributes.entry_count, 0) + _.defaultTo(lobby.attributes.participant_count, 0)
  const maxMembersCount = _.defaultTo(lobby.attributes.max_participants, 0)

  return (
    <ActionComponent {...props}>
      <Box className={classes.body}>
        <RemainingDate lobby={lobby} />

        <EntryMembersCount entryCount={entryMembersCount} maxCount={maxMembersCount} />
      </Box>
    </ActionComponent>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}))

export default Recruiting
