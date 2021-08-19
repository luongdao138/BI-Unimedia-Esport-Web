import React from 'react'
import { LobbyDetail } from '@services/lobby.service'
import { Box, makeStyles, Theme } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import { Colors } from '@theme/colors'
import { UserProfile } from '@services/user.service'
import RemainingDate from '../ActionComponent/RemainingDate'

interface Props {
  lobby: LobbyDetail
  userProfile?: UserProfile
}

const SubStatusInfo: React.FC<Props> = (props) => {
  const classes = useStyles()
  // const { t } = useTranslation(['common'])
  const { lobby } = props

  return (
    <Box className={classes.body}>
      <RemainingDate lobby={lobby} />
    </Box>
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

export default SubStatusInfo
