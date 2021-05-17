import { Typography, Box, withStyles, makeStyles, Icon, Theme } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import ESAvatar from '@components/Avatar'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'
import { Colors } from '@theme/colors'
import useSmartTime from '@utils/hooks/useSmartTime'

interface Props {
  topic: any
}

const StyledAvatarGroup = withStyles({
  avatar: {
    width: 20,
    height: 20,
    fontSize: 12,
    color: Colors.white,
  },
})(AvatarGroup)

const TopicCard: React.FC<Props> = ({ topic }) => {
  const classes = useStyles()
  const attr = topic.attributes
  const time = useSmartTime(attr.created_at)

  return (
    <ESCard>
      <ESCardMedia
        cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
        image={attr.avatar && attr.avatar.assets_url}
      ></ESCardMedia>
      <ESCardContent>
        <Typography className={classes.title}>{attr.title}</Typography>
        {attr.content && (
          <Box className={classes.contentWrap}>
            <Typography variant="caption" className={classes.subtitle} gutterBottom>
              {attr.content}
            </Typography>
          </Box>
        )}
        <Typography className={classes.bottom}>{time}</Typography>
        <Box display="flex" justifyContent="flex-end">
          <StyledAvatarGroup max={4}>
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

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 'bold',
    color: Colors.white,
  },
  contentWrap: {
    padding: 12,
    background: Colors.black,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.white_opacity[15],
    marginTop: theme.spacing(1),
  },
  subtitle: {
    color: Colors.white,
  },
  bottom: {
    fontSize: 10,
    color: Colors.white_opacity[30],
    marginTop: theme.spacing(0.5),
  },
}))

export default TopicCard
