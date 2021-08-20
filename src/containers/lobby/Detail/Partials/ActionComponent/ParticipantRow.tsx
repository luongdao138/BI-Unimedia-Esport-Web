import { Typography, Box, ButtonBase, Theme } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import i18n from '@locales/i18n'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import ESSwitchIOS from '@components/Switch'

interface Props {
  user: any
  checked: boolean
  handleClose?: () => void
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ParticipantRow: React.FC<Props> = ({ user, handleClose, checked, handleChange }) => {
  const classes = useStyles()
  const router = useRouter()

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
      <Box flexShrink={0}>
        <Box textAlign="center">
          <ESSwitchIOS handleChange={handleChange} checked={checked} />
        </Box>
      </Box>
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

export default ParticipantRow
