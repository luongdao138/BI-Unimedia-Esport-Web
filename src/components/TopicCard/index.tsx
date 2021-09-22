import { Typography, Box, makeStyles, Icon } from '@material-ui/core'
// import ESAvatar from '@components/Avatar'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'
import { Colors } from '@theme/colors'
// import { useTranslation } from 'react-i18next'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import { CommonHelper } from '@utils/helpers/CommonHelper'
// import _ from 'lodash'
import React from 'react'

interface Props {
  topic: any
}

const TopicCard: React.FC<Props> = ({ topic }) => {
  // const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const attr = topic.attributes
  const time = CommonHelper.staticSmartTime(attr.created_at)

  const getMediaScreen = () => {
    return (
      <>
        <Box className={classes.mediaOverlay} display="flex" flexDirection="row" justifyContent="flex-end" p={1}>
          <Box display="flex" flexDirection="column" alignItems="flex-end" />
        </Box>
      </>
    )
  }

  const getTitle = () => {
    return (
      <Box color={Colors.white} className={classes.titleContainer} display="flex">
        <Typography className={classes.title}>{attr.title}</Typography>
      </Box>
    )
  }

  const getDescription = (value: string) => {
    return (
      <Box className={classes.contentWrap}>
        <Typography variant="caption" className={classes.description}>
          {value}
        </Typography>
        <Typography className={classes.commentCount}>投稿数 00件</Typography>
      </Box>
    )
  }
  // const getParticipants = () => {
  //   const participants = attr.members_avatar
  //   return (
  //     <Box display="flex" justifyContent="flex-end" alignItems="center" className={classes.avatarContainer}>
  //       {participants && participants.length > 0
  //         ? attr.members_avatar
  //             .slice(0, 3)
  //             .map((participant, i) => (
  //               <ESAvatar
  //                 size={20}
  //                 key={`participants${i}`}
  //                 style={{ zIndex: participants.length - i }}
  //                 className={classes.pAvatar}
  //                 src={participant.profile_image}
  //                 alt={String(participant.nickname)}
  //               />
  //             ))
  //         : null}
  //     </Box>
  //   )
  // }
  return (
    <ESCard
      classes={{ root: classes.cardHover }}
      onClick={() => router.push(`${ESRoutes.TOPIC.replace(/:id/gi, attr.community_hash)}/${attr.hash_key}`)}
    >
      <Box>
        <ESCardMedia cornerIcon={<Icon className="fas fa-users" fontSize="small" />} image={attr.cover_image_url} triangleColor={null}>
          {getMediaScreen()}
        </ESCardMedia>
      </Box>
      <ESCardContent>
        {getTitle()}
        {getDescription(attr.content)}
        <Typography className={classes.bottom}>{time}</Typography>
        {/* {getParticipants()} */}
      </ESCardContent>
    </ESCard>
  )
}

const useStyles = makeStyles((theme) => ({
  cardHover: {
    cursor: 'pointer',
    height: '100%',
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
  },
  commentCount: {
    color: Colors.white_opacity[30],
    fontSize: 10,
  },
}))

export default React.memo(TopicCard)
