import { Typography, Box, makeStyles, Icon, Chip } from '@material-ui/core'
import ESChip from '@components/Chip'
import ESAvatar from '@components/Avatar'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'

interface Props {
  community: CommunityAttributes | null
}

type CommunityAttributes = {
  attributes:
    | {
        title: string
        cover: string | null
        hash_key: number | string
        is_official: boolean
        member_count: number | string
        tags: {
          name: string
        }[]
        description: string
        participants: {
          nickname: string
          profile_image: any | null
        }
      }[]
    | any
}

const CommunityCard: React.FC<Props> = ({ community }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()

  const attr = community.attributes
  const cover = attr.cover ? attr.cover : '/images/default_card.png'

  const getMediaScreen = () => {
    return (
      <>
        <Box className={classes.mediaOverlay} display="flex" flexDirection="row" justifyContent="flex-end" p={1}>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            {attr.is_official && (
              <Chip
                className={classes.chipPrimary}
                size="small"
                label={
                  <Box color={Colors.white} justifySelf="flex-start">
                    <Typography variant="overline">{t('common:community.official')}</Typography>
                  </Box>
                }
              />
            )}
          </Box>
        </Box>
      </>
    )
  }

  const getTitle = () => {
    return (
      <Box color={Colors.white} className={classes.titleContainer} display="flex">
        <Typography className={classes.title}>{attr.title}</Typography>
        {attr.is_official && <Icon className={`fas fa-check-circle ${classes.checkIcon}`} fontSize="default" />}
      </Box>
    )
  }
  const getDescription = (value: string) => {
    return <Typography className={classes.description}>{value}</Typography>
  }
  const getTags = (tags: { name: string }[]) => {
    return (
      <Box display="flex" flexDirection="row" mt={1} alignItems="center" flexWrap="wrap" pr={47 / 8}>
        {tags.map((tag, i) => (
          <ESChip
            key={i}
            className={classes.tagChip}
            size="small"
            label={
              <Box color={Colors.white}>
                <Typography variant="overline">{tag.name}</Typography>
              </Box>
            }
          />
        ))}
      </Box>
    )
  }
  const getParticipants = () => {
    const participants = attr.participants
    return (
      <Box display="flex" justifyContent="flex-end" alignItems="center" className={classes.avatarContainer}>
        {participants && participants.length > 0
          ? attr.participants
              .slice(0, 3)
              .map((participant, i) => (
                <ESAvatar
                  size={20}
                  key={`participants${i}`}
                  style={{ zIndex: participants.length - i }}
                  className={classes.pAvatar}
                  src={participant.profile_image}
                  alt={participant.nickname}
                />
              ))
          : null}
      </Box>
    )
  }
  return (
    <ESCard classes={{ root: classes.cardHover }} onClick={() => router.push(`${ESRoutes.COMMUNITY}/${attr.hash_key}`)}>
      <ESCardMedia
        cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
        image={cover}
        triangleColor={attr.is_official ? 'rgba(255, 71, 134, 0.7)' : null}
      >
        {getMediaScreen()}
      </ESCardMedia>
      <ESCardContent>
        {getTitle()}
        {getDescription(attr.description)}
        {getTags(attr.tags)}
        {getParticipants()}
      </ESCardContent>
    </ESCard>
  )
}

const useStyles = makeStyles((theme) => ({
  cardHover: {
    cursor: 'pointer',
  },
  titleContainer: {
    height: 42,
  },
  description: {
    fontSize: 10,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    minHeight: 30,
  },
  tagChip: {
    height: 15,
    backgroundColor: Colors.white_opacity[20],
    marginBottom: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  avatarContainer: {
    height: 20,
    marginLeft: theme.spacing(1),
  },
  chipPrimary: {
    height: 20,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  mediaOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  checkIcon: {
    color: Colors.primary,
  },
  pAvatar: {
    marginLeft: theme.spacing(-1),
  },
  title: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    minHeight: 42,
  },
}))

export default CommunityCard
