import { Box, makeStyles, Theme } from '@material-ui/core'
import { TournamentDetail } from '@services/arena.service'
import { UserProfile } from '@services/user.service'
import ActionComponent from '../ActionComponent'
import RemainingDate from '../ActionComponent/RemainingDate'

interface RecruitmentClosedProps {
  tournament: TournamentDetail
  userProfile: UserProfile
}

const RecruitmentClosed: React.FC<RecruitmentClosedProps> = (props) => {
  const classes = useStyles()
  const { tournament } = props

  return (
    <ActionComponent {...props}>
      <Box className={classes.body}>
        <RemainingDate tournament={tournament} />
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
