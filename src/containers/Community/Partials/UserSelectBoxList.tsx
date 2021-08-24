import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ESAvatar from '@components/Avatar'
import ESSelect from '@components/Select'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'

type UserSelectBoxListProps = {
  username: string
  nickname: string
  avatar?: string
  isAutomatic?: boolean
}

const OPTIONS = [
  { label: '承認', value: 'approve' },
  { label: '拒否', value: 'reject' },
  { label: '保留', value: 'hold' },
]

const OPTIONS_NEXT = [
  { label: '一般ユーザー', value: 'user' },
  { label: '共同管理者', value: 'co_organizer' },
  { label: 'キックする', value: 'kick' },
]

const UserSelectBoxList: React.FC<UserSelectBoxListProps> = ({ username, nickname, avatar, isAutomatic }) => {
  const classes = useStyles()

  return (
    <>
      <Box className={classes.container} mb={3}>
        <Box className={classes.userContainer}>
          <ESAvatar className={classes.avatar} alt={username} src={avatar !== '' ? avatar : username ? '' : '/images/avatar.png'} />
          <Box className={classes.userInfoBox} ml={1}>
            <Box display="flex" alignItems="center" height="50%">
              <Typography className={classes.username}>{username}</Typography>
            </Box>
            <Box display="flex" alignItems="center" height="50%">
              <Typography className={classes.mail}>{nickname}</Typography>
            </Box>
          </Box>
        </Box>

        <Box className={classes.selectBoxContainer}>
          <ESSelect className={classes.selectWidth} size="small">
            <option disabled value={-1}>
              {isAutomatic ? i18n.t('common:community.applying') : i18n.t('common:community.general_user')}
            </option>
            {(isAutomatic ? OPTIONS : OPTIONS_NEXT).map((o, index) => (
              <option key={index} value={o.value}>
                {o.label}
              </option>
            ))}
          </ESSelect>
        </Box>
      </Box>
    </>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'calc(100% - 200px)',
  },
  selectBoxContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    width: 130,
    height: '100%',
    justifyContent: 'center',
  },
  userInfoBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  avatar: {
    width: 50,
    height: 50,
  },
  username: {
    fontWeight: 'bold',
    color: Colors.white,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 16,
  },
  mail: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 12,
    color: Colors.white_opacity[70],
  },
  selectWidth: {
    width: 130,
  },
}))

export default UserSelectBoxList
