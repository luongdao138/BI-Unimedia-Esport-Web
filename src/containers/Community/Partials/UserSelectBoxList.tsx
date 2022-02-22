import { Box, Typography, ButtonBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ESAvatar from '@components/Avatar'
import ESSelect from '@components/Select'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'
import { CommunityMember } from '@services/community.service'
import { MEMBER_ROLE } from '@constants/community.constants'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { CommonHelper } from '@utils/helpers/CommonHelper'

type UserSelectBoxListProps = {
  member: CommunityMember
  isApplying?: boolean
  setValue?: (isApplying: boolean, id: number, value: number) => void
}

type SelectionOptionType = {
  label: string
  value: string | number
}

const APPLYING_OPTIONS: SelectionOptionType[] = [
  { label: i18n.t('common:community.member_list.approve'), value: MEMBER_ROLE.MEMBER },
  { label: i18n.t('common:community.member_list.cancel'), value: MEMBER_ROLE.NOT_MEMBER },
  { label: i18n.t('common:community.member_list.hold'), value: MEMBER_ROLE.ON_HOLD },
]

const PARTICIPATING_OPTIONS: SelectionOptionType[] = [
  { label: i18n.t('common:community.member_list.user'), value: MEMBER_ROLE.MEMBER },
  { label: i18n.t('common:community.member_list.co_organizer'), value: MEMBER_ROLE.CO_ORGANIZER },
  { label: i18n.t('common:community.member_list.kick'), value: MEMBER_ROLE.LEAVE },
]

const UserSelectBoxList: React.FC<UserSelectBoxListProps> = ({ member, setValue, isApplying = false }) => {
  const router = useRouter()
  const classes = useStyles()
  const data = member.attributes
  const [role, setRole] = useState<number>(member.attributes.member_role)

  useEffect(() => {
    setRole(member.attributes.member_role)
  }, [member.attributes.member_role])

  const handleSelectOption = (e: any) => {
    setRole(e.target.value)
    setValue(isApplying, data.id, e.target.value)
  }

  const toProfile = () => {
    CommonHelper.checkUserCode(data.user_code, () => {
      router.push(`${ESRoutes.PROFILE}/${data.user_code}`)
    })
  }

  return (
    <>
      <Box className={classes.container} mb={3}>
        <Box className={classes.userContainer}>
          <ButtonBase
            onClick={toProfile}
            style={{ cursor: CommonHelper.handleAccountSystem(data.user_code) ? 'default' : 'point' }}
            disabled={CommonHelper.handleAccountSystem(data.user_code)}
          >
            <ESAvatar
              className={classes.avatar}
              alt={data.nickname}
              src={data.profile !== '' ? data.profile : data.nickname ? '' : '/images/avatar.png'}
            />
          </ButtonBase>
          <Box className={classes.userInfoBox} ml={1}>
            <Box display="flex" alignItems="center" height="50%">
              <Typography className={classes.username}>{data.nickname}</Typography>
            </Box>
            <Box display="flex" alignItems="center" height="50%">
              <Typography className={classes.mail}>{'@' + data.user_code}</Typography>
            </Box>
          </Box>
        </Box>

        <Box className={classes.selectBoxContainer}>
          <ESSelect
            className={classes.selectWidth}
            size="small"
            value={(isApplying && role == MEMBER_ROLE.REQUESTED && -1) || role}
            onChange={handleSelectOption}
          >
            {isApplying && (
              <option disabled value={-1}>
                {i18n.t('common:community.applying')}
              </option>
            )}
            {(isApplying ? APPLYING_OPTIONS : PARTICIPATING_OPTIONS).map((o, index) => (
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
