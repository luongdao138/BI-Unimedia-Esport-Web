import { useState } from 'react'
import { Grid, Typography, Box, ButtonBase, withStyles, IconButton, Icon } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import MuiAccordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import UserListItem from '@components/UserItem'
import { Colors } from '@theme/colors'
import { CommonResponse } from '@services/user.service'
import { makeStyles, Theme } from '@material-ui/core/styles'
import useGetProfile from '@utils/hooks/useGetProfile'
import _ from 'lodash'

interface Props {
  team: CommonResponse
  handleClick?: () => void
  rightItem?: JSX.Element
  yellowTitle?: boolean
}

const Accordion = withStyles({
  root: {
    backgroundColor: 'transparent',
  },
})(MuiAccordion)

const TeamMemberItem: React.FC<Props> = ({ team, handleClick, rightItem, yellowTitle }) => {
  const data = team.attributes.team.data.attributes
  const members = data.members
  const [expanded, setExpanded] = useState<boolean>(false)
  const classes = useStyles()

  const userData = (member) => {
    return { id: member.user_id, attributes: { ...member, nickname: member.name, avatar: member.image_url } }
  }

  const isYellowTitle = yellowTitle === true

  const { userProfile } = useGetProfile()

  const isMe = (member) => {
    const myId = _.get(userProfile, 'id', -1)
    const memberId = _.get(member, 'user_id', -2)

    return `${myId}` === `${memberId}`
  }

  return (
    <Grid item xs={12}>
      <Box className={classes.listItem}>
        <Accordion expanded={expanded} square>
          <AccordionSummary expandIcon={null}>
            <Box className={classes.blankSpace}></Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box ml={6} display="flex" flex={1} flexDirection="column">
              {members.map((member, i) => (
                <UserListItem
                  data={userData(member)}
                  key={i}
                  isFollowed={Boolean(member.is_followed)}
                  nicknameYellow={isYellowTitle && isMe(member)}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
        <Box className={classes.moreButton} style={expanded ? { marginTop: 8 } : null}>
          <Box className={classes.listItemHolder}>
            <Grid item xs={12}>
              <Box display="flex" overflow="hidden">
                <ButtonBase>
                  <ESAvatar alt={data.name} src={data.team_avatar || team.attributes.avatar_url} onClick={handleClick} />
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
                <Box color={Colors.white} overflow="hidden" textOverflow="ellipsis" ml={3} display="flex" alignItems="center">
                  <Typography variant="h3">チーム</Typography>
                </Box>
              </Box>
              <Box flexShrink={0} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                {rightItem && rightItem}
              </Box>
            </Grid>
            <Box>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                  setExpanded(!expanded)
                }}
              >
                <Icon className={`fa fa-chevron-${expanded ? 'up' : 'down'}`} fontSize="small" />
              </IconButton>
            </Box>
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
    position: 'absolute',
    top: 11,
    left: 0,
    width: '100%',
    transition: 'margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  listItemHolder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: '0px 18px',
  },
}))

export default TeamMemberItem
