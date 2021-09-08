import { Grid, Typography, Box, ButtonBase } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import UserListItem from '@components/UserItem'
import { Colors } from '@theme/colors'
import { CommonResponse } from '@services/user.service'
import { makeStyles, Theme } from '@material-ui/core/styles'
import useGetProfile from '@utils/hooks/useGetProfile'
import { useTranslation } from 'react-i18next'

interface Props {
  team: CommonResponse
  handleClick?: () => void
  rightItem?: JSX.Element
  yellowTitle?: boolean
  hideFollow?: boolean
  memberClick?: () => void
  onFollowStateChange?: ({ userId, state }: { userId: number; state: number }) => void
}

const TeamMemberItemExpanded: React.FC<Props> = ({
  team,
  handleClick,
  rightItem,
  yellowTitle,
  hideFollow,
  memberClick,
  onFollowStateChange,
}) => {
  const data = team.attributes.team.data.attributes
  const members = data.members
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  const { userProfile } = useGetProfile()

  const userData = (member) => {
    return { id: member.user_id, attributes: { ...member, nickname: member.name, avatar: member.image_url } }
  }

  const isYellowTitle = yellowTitle === true

  return (
    <Grid item xs={12}>
      <Box className={classes.listItem}>
        <Box className={classes.moreButton}>
          <Box className={classes.listItemHolder}>
            <Grid item xs={12}>
              <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Box display="flex" overflow="hidden">
                  <ButtonBase>
                    <ESAvatar alt={data.name} src={data.team_avatar} onClick={handleClick} />
                  </ButtonBase>
                  <Box
                    style={{ cursor: 'pointer' }}
                    color={Colors.white}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    ml={2}
                    display="flex"
                    alignItems="center"
                    onClick={handleClick}
                  >
                    <Typography variant="h3" noWrap style={isYellowTitle ? { color: Colors.yellow } : undefined}>
                      {data.name}
                    </Typography>
                  </Box>
                  <Box color={Colors.white} flexShrink={0} ml={3} mr={1} display="flex" alignItems="center">
                    <Typography noWrap variant="h3">
                      {t('common:common.team')}
                    </Typography>
                  </Box>
                </Box>
                <Box flexShrink={0} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                  {rightItem && rightItem}
                </Box>
              </Box>
            </Grid>
          </Box>
          <Box ml={7} display="flex" flex={1} flexDirection="column">
            {members.map((member, i, _) => (
              <UserListItem
                data={userData(member)}
                key={i}
                isFollowed={hideFollow === true ? undefined : Boolean(member.is_followed)}
                isBlocked={Boolean(member.is_blocked)}
                nicknameYellow={isYellowTitle && `${userProfile?.id}` === `${member.user_id}`}
                handleClick={memberClick}
                changeFollowState={(s) => onFollowStateChange({ userId: member.user_id, state: s })}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}

const useStyles = makeStyles((_theme: Theme) => ({
  listItem: {
    position: 'relative',
  },
  blankSpace: {
    width: '100%',
    height: 50,
  },
  moreButton: {
    width: '100%',
  },
  listItemHolder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
}))

export default TeamMemberItemExpanded
