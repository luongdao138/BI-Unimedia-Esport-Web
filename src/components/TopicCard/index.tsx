import { Typography, Box, makeStyles, Icon, Chip } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import React from 'react'
import { FollowersTopicResponse } from '@services/community.service'

interface Props {
  topic: FollowersTopicResponse
}

const TopicCard: React.FC<Props> = ({ topic }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const attr = topic.attributes
  const time = CommonHelper.staticSmartTime(attr.topic_created_at)

  const getMediaScreen = () => {
    return (
      <>
        <Box className={classes.mediaOverlay} display="flex" flexDirection="row" justifyContent="flex-end" p={1}>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            {!!attr.is_official && (
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
        <Typography className={classes.title}>{attr.community_title}</Typography>
        {!!attr.is_official && (
          <span className={classes.officialBadge}>
            <Icon className="fa fa-check" fontSize="small" />
          </span>
        )}
      </Box>
    )
  }

  const getDescription = (value: string, commentCount: number) => {
    return (
      <Box className={classes.contentWrap}>
        <Typography variant="caption" className={classes.description}>
          {value}
        </Typography>
        <Typography className={classes.commentCount}>{`投稿数 ${commentCount}件`}</Typography>
      </Box>
    )
  }

  const getParticipant = () => {
    const participant = attr.members_avatar
    return (
      <Box display="flex" justifyContent="flex-end" alignItems="center" className={classes.avatarContainer}>
        {participant ? (
          <ESAvatar size={20} className={classes.pAvatar} src={participant.profile_image} alt={String(participant.nickname)} />
        ) : null}
      </Box>
    )
  }
  return (
    <ESCard
      classes={{ root: classes.cardHover }}
      onClick={() => router.push(`${ESRoutes.TOPIC.replace(/:id/gi, attr.community_hash)}/${attr.topic_hash}`)}
    >
      <Box>
        <ESCardMedia
          cornerIcon={<Icon className="fas fa-users" fontSize="small" />}
          image={attr.cover_image_url}
          triangleColor={attr.is_official ? 'rgba(255, 71, 134, 0.8)' : null}
        >
          {getMediaScreen()}
        </ESCardMedia>
      </Box>
      <ESCardContent>
        {getTitle()}
        {getDescription(attr.topic_title, attr.comment_count)}
        <Typography className={classes.bottom}>{time}</Typography>
        {getParticipant()}
      </ESCardContent>
    </ESCard>
  )
}

const useStyles = makeStyles((theme) => ({
  officialBadge: {
    width: 18,
    height: 18,
    minWidth: 18,
    minHeight: 18,
    backgroundColor: Colors.primary,
    borderRadius: '50%',
    marginLeft: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiIcon-fontSizeSmall': {
      fontSize: '0.7rem',
    },
  },
  cardHover: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  },
  titleContainer: {
    height: 42,
  },
  description: {
    fontSize: 12,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    color: Colors.white,
    minHeight: 19,
  },
  avatarContainer: {
    marginTop: 11,
    height: 20,
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
  contentWrap: {
    padding: 12,
    background: Colors.black,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.white_opacity[15],
    marginTop: theme.spacing(1),
  },
  bottom: {
    fontSize: 10,
    color: Colors.white_opacity[30],
    marginTop: theme.spacing(0.5),
    textAlign: 'end',
    height: 15,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
  },
  commentCount: {
    color: Colors.white_opacity[30],
    fontSize: 10,
  },
}))

export default React.memo(TopicCard)
