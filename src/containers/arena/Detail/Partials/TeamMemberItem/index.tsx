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
}

const Accordion = withStyles({
  root: {
    backgroundColor: 'transparent',
  },
})(MuiAccordion)

const TeamMemberItem: React.FC<Props> = ({ team }) => {
  const data = team.attributes.team.data.attributes
  const members = data.members

  const userData = (member) => {
    return { id: member.user_id, attributes: { ...member, avatar: member.image_url } }
  }
  return (
    <Grid item xs={12}>
      <Accordion square>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box display="flex" overflow="hidden">
            <ButtonBase>
              <ESAvatar alt={data.name} src={data.team_avatar} />
            </ButtonBase>
            <Box color={Colors.white} overflow="hidden" textOverflow="ellipsis" ml={2} display="flex" alignItems="center">
              <Typography variant="h3" noWrap>
                {data.name}
              </Typography>
            </Box>
          </Box>
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
