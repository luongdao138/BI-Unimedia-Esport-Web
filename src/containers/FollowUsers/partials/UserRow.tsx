import { Typography, Box, ButtonBase, Theme } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import ESButton from '@components/Button'
import { FOLLOW_STATES } from '@constants/common.constants'
import { Colors } from '@theme/colors'
import i18n from '@locales/i18n'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import useGetProfile from '@utils/hooks/useGetProfile'
import { makeStyles } from '@material-ui/core/styles'

interface Props {
  user: any
  handleClose?: () => void
  changeFollowState?: (type: number) => void
}

const UserRow: React.FC<Props> = ({ user, handleClose, changeFollowState }) => {
  const classes = useStyles()
  const router = useRouter()
  const { userProfile } = useGetProfile()

  const toProfile = () => {
    if (handleClose) handleClose()
    router.push(`${ESRoutes.PROFILE}/${user.user_code}`)
  }

  return (
    <Box className={classes.container} pr={2}>
      <Box display="flex" overflow="hidden">
        <ButtonBase onClick={toProfile}>
          <ESAvatar alt={user.nickname} src={user.avatar} />
        </ButtonBase>
        <Box overflow="hidden" textOverflow="ellipsis" ml={2} display="flex" flexDirection="column" justifyContent="center">
          <Box color={Colors.white}>
            <Typography variant="h3" noWrap>
              {user.nickname}
            </Typography>
          </Box>
          <Typography variant="caption" noWrap>
            {i18n.t('common:common.at')}
            {user.user_code}
          </Typography>
        </Box>
      </Box>
      {user.is_following !== undefined && userProfile?.attributes.user_code != user.user_code && (
        <Box flexShrink={0}>
          {user.is_following ? (
            <ESButton
              onClick={() => changeFollowState(FOLLOW_STATES.UNFOLLOW)}
              variant="contained"
              color="primary"
              size="medium"
              round
              className={classes.button}
            >
              {i18n.t('common:home.unfollow')}
            </ESButton>
          ) : (
            <ESButton
              onClick={() => changeFollowState(FOLLOW_STATES.FOLLOW)}
              variant="outlined"
              size="medium"
              round
              className={classes.button}
            >
              {i18n.t('common:home.follow')}
            </ESButton>
          )}
        </Box>
      )}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'start',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  button: {
    top: '50%',
    transform: 'translateY(-50%)',
  },
}))

export default UserRow
