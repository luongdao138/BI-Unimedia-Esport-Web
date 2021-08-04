import { Box, makeStyles, Theme } from '@material-ui/core'
import { LobbyDetail } from '@services/lobby.service'
import { UserProfile } from '@services/user.service'
import ActionComponent from '../ActionComponent'
import RemainingDate from '../ActionComponent/RemainingDate'

interface RecruitmentClosedProps {
  lobby: LobbyDetail
  userProfile: UserProfile
}

const RecruitmentClosed: React.FC<RecruitmentClosedProps> = (props) => {
  const classes = useStyles()
  const { lobby } = props

  return (
    <ActionComponent {...props}>
      <Box className={classes.body}>
        <RemainingDate tournament={lobby} />
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

export default RecruitmentClosed
