import { useState } from 'react'
import { Grid, Typography, Box, ButtonBase, withStyles } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import MuiAccordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import UserListItem from '@components/UserItem'
import { Colors } from '@theme/colors'
import { CommonResponse } from '@services/user.service'

interface Props {
  team: CommonResponse
  handleClick?: () => void
  rightItem?: JSX.Element
}

const Accordion = withStyles({
  root: {
    backgroundColor: 'transparent',
  },
})(MuiAccordion)

const TeamMemberItem: React.FC<Props> = ({ team, handleClick, rightItem }) => {
  const data = team.attributes.team.data.attributes
  const members = data.members
  const [expanded, setExpanded] = useState<boolean>(false)

  const userData = (member) => {
    return { id: member.user_id, attributes: { ...member, nickname: member.name, avatar: member.image_url } }
  }
  return (
    <Grid item xs={12}>
      <Accordion expanded={expanded} square>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              onClick={(e) => {
                e.stopPropagation()
                setExpanded(!expanded)
              }}
            />
          }
          onClick={() => handleClick && handleClick()}
        >
          <Grid item xs={12}>
            <Box display="flex" overflow="hidden">
              <ButtonBase>
                <ESAvatar alt={data.name} src={data.team_avatar || team.attributes.avatar_url} />
              </ButtonBase>
              <Box color={Colors.white} overflow="hidden" textOverflow="ellipsis" ml={2} display="flex" alignItems="center">
                <Typography variant="h3" noWrap>
                  {data.name}
                </Typography>
              </Box>
            </Box>
            <Box flexShrink={0} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
              <Box color={Colors.white} overflow="hidden" textOverflow="ellipsis" ml={3} display="flex" alignItems="center">
                <Typography variant="h3">{'team'}</Typography>
              </Box>
              {rightItem && rightItem}
            </Box>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Box ml={6} display="flex" flex={1} flexDirection="column">
            {members.map((member, i) => (
              <UserListItem data={userData(member)} key={i} isFollowed={Boolean(member.is_followed)} />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Grid>
  )
}

export default TeamMemberItem
