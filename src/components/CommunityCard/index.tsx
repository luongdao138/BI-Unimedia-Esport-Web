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
import { CommunityResponse } from '@services/community.service'
import React from 'react'
import _ from 'lodash'

interface Props {
  community: CommunityResponse
}

const CommunityCard: React.FC<Props> = ({ community }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const attr = community.attributes

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
        <Typography className={classes.title}>{attr.name}</Typography>
        {!!attr.is_official && (
          <span className={classes.officialBadge}>
            <Icon className="fa fa-check" fontSize="small" />
          </span>
        )}
      </Box>
    )
  }
  const getDescription = (value: string) => {
    return <Typography className={classes.description}>{value}</Typography>
  }
  const getTags = (tags: { feature: string }[]) => {
    return (
      <Box display="flex" mt={1} maxHeight={19} height={19}>
        <Typography className={classes.tagWrap}>
          {_.map(tags, (tag, i) => {
            return (
              <ESChip
                key={i}
                className={classes.tagChip}
                isGameList={true}
                label={
                  <Box color={Colors.white}>
                    <Typography variant="overline">{tag.feature}</Typography>
                  </Box>
                }
              />
            )
          })}
        </Typography>
      </Box>
    )
  }
  const getParticipants = () => {
    const participants = attr.members_avatar
    return (
      <Box display="flex" justifyContent="flex-end" alignItems="center" className={classes.avatarContainer}>
        {participants && participants.length > 0
          ? attr.members_avatar
              .slice(0, 3)
              .map((participant, i) => (
                <ESAvatar
                  size={20}
                  key={`participants${i}`}
                  style={{ zIndex: participants.length - i }}
                  className={classes.pAvatar}
                  src={participant.profile_image}
                  alt={String(participant.nickname)}
                />
              ))
          : null}
      </Box>
    )
  }
  return (
    <ESCard classes={{ root: classes.cardHover }} onClick={() => router.push(`${ESRoutes.COMMUNITY}/${attr.hash_key}`)}>
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
        {getDescription(attr.description)}
        {getTags(attr.features)}
        {getParticipants()}
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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
  },
  titleContainer: {
    height: 42,
  },
  description: {
    fontSize: 10,
    height: 30,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
  },
  tagChip: {
    height: 15,
    backgroundColor: Colors.white_opacity[20],
    marginBottom: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.25),
    paddingRight: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.5),
    paddingTop: theme.spacing(0.125),
    borderRadius: 2,
    '& .MuiChip-label': {
      padding: 0,
    },
  },
  tagWrap: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    height: 19,
  },
  avatarContainer: {
    height: 20,
    marginLeft: theme.spacing(1),
    marginTop: 22,
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
}))

export default React.memo(CommunityCard)
