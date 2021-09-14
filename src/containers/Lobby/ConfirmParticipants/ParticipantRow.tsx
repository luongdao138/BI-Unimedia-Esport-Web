import { Typography, Box, ButtonBase, Theme } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import i18n from '@locales/i18n'
import { makeStyles } from '@material-ui/core/styles'
import ESSwitchIOS from '@components/Switch'
import { ConfirmParticipantItem } from '@services/lobby.service'
import _ from 'lodash'

interface Props {
  data: ConfirmParticipantItem
  toProfile?: (userCode: string) => void
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ParticipantRow: React.FC<Props> = ({ data, toProfile, handleChange }) => {
  const classes = useStyles()

  const userCode = _.defaultTo(data.attributes.user_code, '')
  const nickName = _.defaultTo(data.attributes.nickname, '')
  const avatar = _.defaultTo(data.attributes.avatar_url, null)
  const checked = _.defaultTo(data.checked, false)

  return (
    <Box className={classes.container} pr={2}>
      <Box display="flex" overflow="hidden">
        <ButtonBase onClick={() => toProfile && toProfile(userCode)}>
          <ESAvatar alt={nickName} src={avatar} />
        </ButtonBase>
        <Box overflow="hidden" textOverflow="ellipsis" ml={2} display="flex" flexDirection="column" justifyContent="center">
          <Box color={Colors.white}>
            <Typography variant="h3" noWrap>
              {nickName}
            </Typography>
          </Box>
          <Typography variant="caption" noWrap>
            {i18n.t('common:common.at')}
            {userCode}
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
    paddingLeft: theme.spacing(2),
  },
  button: {
    top: '50%',
    transform: 'translateY(-50%)',
  },
}))

export default ParticipantRow
