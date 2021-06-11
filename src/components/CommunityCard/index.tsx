import { Typography, Box, withStyles, Icon } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import ESAvatar from '@components/Avatar'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'
import { Colors } from '@theme/colors'
// import { useTranslation } from 'react-i18next'

interface Props {
  community: CommunityAttributes | null
}

type CommunityAttributes = {
  attributes: {
    community_cover: string | null
    id: number | string
    is_official: number | string
    member_count: number | string
    member_role: string
    name: string
  }
}

const StyledAvatarGroup = withStyles({
  avatar: {
    width: 20,
    height: 20,
    fontSize: 12,
    color: Colors.white,
  },
})(AvatarGroup)

//TODO later
const TournamentCard: React.FC<Props> = ({ community }) => {
  // const { t } = useTranslation(['common'])

  // if (community === null) return null

  return (
    <ESCard>
      <ESCardMedia
        cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
        image={community !== null ? community.attributes.community_cover : 'https://picsum.photos/id/112/240/120'}
      ></ESCardMedia>
      <ESCardContent>
        <Typography variant="h2">{community !== null ? community.attributes.name : 'コミュニティ名がはい...'}</Typography>
        <Typography variant="caption" gutterBottom>
          主催者 わたなべ
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <StyledAvatarGroup max={3}>
            <ESAvatar alt="Avatar" />
            <ESAvatar alt="Bvatar" />
            <ESAvatar alt="Cvatar" />
            <ESAvatar alt="Cvatar" />
          </StyledAvatarGroup>
        </Box>
      </ESCardContent>
    </ESCard>
  )
}

export default TournamentCard
