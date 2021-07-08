import { Typography, makeStyles, Icon } from '@material-ui/core'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'
import { Colors } from '@theme/colors'

interface Props {
  event: any
}

const EventCard: React.FC<Props> = ({ event }) => {
  const classes = useStyles()
  const attr = event.attributes

  return (
    <ESCard>
      <ESCardMedia cornerIcon={<Icon className="fas fa-users" fontSize="small" />} image={attr.avatar}></ESCardMedia>
      <ESCardContent>
        <Typography className={classes.title}>{attr.title}</Typography>
        <Typography variant="caption" className={classes.subtitle} gutterBottom>
          {attr.description}
        </Typography>
      </ESCardContent>
    </ESCard>
  )
}

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 'bold',
    color: Colors.white,
  },
  subtitle: {
    fontSize: 10,
    color: Colors.white_opacity[70],
  },
}))

export default EventCard
