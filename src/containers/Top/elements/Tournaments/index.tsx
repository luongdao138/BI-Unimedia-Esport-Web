import { Typography, Icon } from '@material-ui/core'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'

export const RecruitingTournament: React.FC = () => {
  return (
    <ESCard>
      <ESCardMedia
        cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
        image="https://picsum.photos/id/412/240/120"
      ></ESCardMedia>
      <ESCardContent>
        <Typography>募集名が入ります。1 募集名が入ります。1募集名が入ります。1募集名が入ります。</Typography>
      </ESCardContent>
    </ESCard>
  )
}
