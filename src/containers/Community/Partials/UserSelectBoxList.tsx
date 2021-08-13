import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ESAvatar from '@components/Avatar'
import ESSelect from '@components/Select'
import i18n from '@locales/i18n'

type UserSelectBoxListProps = {
  username: string
  mail: string
  avatar?: string
}

const OPTIONS = [
  { label: '承認', value: 'approve' },
  { label: '拒否', value: 'reject' },
  { label: '保留', value: 'hold' },
]

const UserSelectBoxList: React.FC<UserSelectBoxListProps> = ({ username, mail, avatar }) => {
  const classes = useStyles()

  return (
    <>
      <Box className={classes.container} mb={3}>
        <Box className={classes.userContainer}>
          <ESAvatar className={classes.avatar} alt={username} src={avatar !== '' ? avatar : username ? '' : '/images/avatar.png'} />
          <Box className={classes.userInfoBox} ml={1}>
            <Typography className={classes.username}>{username}</Typography>
            <Typography className={classes.mail}>{mail}</Typography>
          </Box>
        </Box>

        <Box className={classes.selectBoxContainer}>
          <ESSelect className={classes.selectWidth} size="small">
            <option disabled value={-1}>
              {i18n.t('common:community.general_user')}
            </option>
            {OPTIONS.map((o, index) => (
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
  },
  userInfoBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  avatar: {
    zIndex: 30,
    width: 50,
    height: 50,
  },
  username: {
    fontWeight: 'bold',
    color: 'white',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  mail: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  selectWidth: {
    width: 130,
  },
}))

export default UserSelectBoxList
