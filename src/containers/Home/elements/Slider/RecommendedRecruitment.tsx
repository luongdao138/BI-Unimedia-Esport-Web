import { Typography, Icon } from '@material-ui/core'
import ESSlider from '@components/Slider'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'

interface Props {
  data: Array<recruitmentProps>
}

type recruitmentProps = {
  type: string
  attributes: recruitmentAttributesProps
}

type recruitmentAttributesProps = {
  title: string
  message: string
  recruitment_cover: string | null
  max_participants: number
  start_datetime: string | null
  participants_count: number
  entry_count: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const RecommendedRecruitment: React.FC<Props> = ({ data }) => {
  return (
    <ESSlider
      title="おすすめの募集"
      navigation
      moreLink="#"
      width={256}
      items={[
        <ESCard key="1">
          <ESCardMedia
            cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
            image="https://picsum.photos/id/412/240/120"
          ></ESCardMedia>
          <ESCardContent>
            <Typography>募集名が入ります。1 募集名が入ります。1募集名が入ります。1募集名が入ります。</Typography>
          </ESCardContent>
        </ESCard>,
        <ESCard key="2">
          <ESCardMedia
            cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
            image="https://picsum.photos/id/403/240/120"
          ></ESCardMedia>
          <ESCardContent>
            <Typography>募集名が入ります。2募集名が入ります。2募集名が入ります。2募集名が入ります。2</Typography>
          </ESCardContent>
        </ESCard>,
        <ESCard key="3">
          <ESCardMedia
            cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
            image="https://picsum.photos/id/402/240/120"
          ></ESCardMedia>
          <ESCardContent>
            <Typography>募集名が入ります。2募集名が入ります。2募集名が入ります。2募集名が入ります。2</Typography>
          </ESCardContent>
        </ESCard>,
        <ESCard key="4">
          <ESCardMedia
            cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
            image="https://picsum.photos/id/401/240/120"
          ></ESCardMedia>
          <ESCardContent>
            <Typography>募集名が入ります。2募集名が入ります。2募集名が入ります。2募集名が入ります。2</Typography>
          </ESCardContent>
        </ESCard>,
        <ESCard key="5">
          <ESCardMedia
            cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
            image="https://picsum.photos/id/400/240/120"
          ></ESCardMedia>
          <ESCardContent>
            <Typography>募集名が入ります。2募集名が入ります。2募集名が入ります。2募集名が入ります。25</Typography>
          </ESCardContent>
        </ESCard>,
        <ESCard key="6">
          <ESCardMedia
            cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
            image="https://picsum.photos/id/399/240/120"
          ></ESCardMedia>
          <ESCardContent>
            <Typography>募集名が入ります。2募集名が入ります。2募集名が入ります。2募集名が入ります。26</Typography>
          </ESCardContent>
        </ESCard>,
        <ESCard key="7">
          <ESCardMedia
            cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
            image="https://picsum.photos/id/398/240/120"
          ></ESCardMedia>
          <ESCardContent>
            <Typography>募集名が入ります。2募集名が入ります。2募集名が入ります。2募集名が入ります。27</Typography>
          </ESCardContent>
        </ESCard>,
        <ESCard key="8">
          <ESCardMedia
            cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
            image="https://picsum.photos/id/397/240/120"
          ></ESCardMedia>
          <ESCardContent>
            <Typography>募集名が入ります。2募集名が入ります。2募集名が入ります。2募集名が入ります。28</Typography>
          </ESCardContent>
        </ESCard>,
      ]}
    />
  )
}
