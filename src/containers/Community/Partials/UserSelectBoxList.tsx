import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ESAvatar from '@components/Avatar'
import ESSelect from '@components/Select'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'
import { CommunityMember, CommunityMemberRole } from '@services/community.service'

type UserSelectBoxListProps = {
  member: CommunityMember
  isAutomatic?: boolean
  setValue?: (e: any) => void
}

const APPLYING_OPTIONS = [
  { label: '承認', value: 'approve' },
  { label: '拒否', value: 'reject' },
  { label: '保留', value: 'hold' },
]

const PARTICIPATING_OPTIONS = [
  { label: '一般ユーザー', value: CommunityMemberRole.member },
  { label: '共同管理者', value: CommunityMemberRole.co_organizer },
  { label: 'キックする', value: CommunityMemberRole.leave },
]

const UserSelectBoxList: React.FC<UserSelectBoxListProps> = ({ member, isAutomatic /* , setValue */ }) => {
  const classes = useStyles()
  const data = member.attributes

  const handleSelectOption = () => {
    // setValue(e.target.value)
  }

  return (
    <>
      <Box className={classes.container} mb={3}>
        <Box className={classes.userContainer}>
          <ESAvatar
            className={classes.avatar}
            alt={data.nickname}
            src={data.profile !== '' ? data.profile : data.nickname ? '' : '/images/avatar.png'}
          />
          <Box className={classes.userInfoBox} ml={1}>
            <Box display="flex" alignItems="center" height="50%">
              <Typography className={classes.username}>{data.nickname}</Typography>
            </Box>
            <Box display="flex" alignItems="center" height="50%">
              <Typography className={classes.mail}>{data.user_code}</Typography>
            </Box>
          </Box>
        </Box>

        <Box className={classes.selectBoxContainer}>
          <ESSelect className={classes.selectWidth} size="small" value={data.member_role || -1} onChange={handleSelectOption}>
            {isAutomatic && (
              <option disabled value={-1}>
                {i18n.t('common:community.applying')}
              </option>
            )}
            {(isAutomatic ? APPLYING_OPTIONS : PARTICIPATING_OPTIONS).map((o, index) => (
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
