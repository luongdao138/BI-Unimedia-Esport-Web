import { Typography, Box, makeStyles, Icon, Chip } from '@material-ui/core'
import ESChip from '@components/Chip'
import ESAvatar from '@components/Avatar'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { Colors } from '@theme/colors'
import { LobbyResponse } from '@services/lobby.service'
import i18n from '@locales/i18n'
import { LOBBY_STATUS } from '@constants/lobby.constants'
import { DateHelper } from '@utils/helpers/DateHelper'

interface Props {
  lobby: LobbyResponse
}

const statusText = [
  i18n.t('common:lobby.tabs.ready'),
  i18n.t('common:lobby.tabs.recruiting'),
  i18n.t('common:lobby.tabs.entry_closed'),
  i18n.t('common:lobby.tabs.in_progress'),
  i18n.t('common:lobby.tabs.ended'),
]

const entryStatusText = [
  i18n.t('common:lobby.status.entered'),
  i18n.t('common:lobby.status.participated'),
  i18n.t('common:lobby.status.not_participated'),
]

const LobbyCard: React.FC<Props> = ({ lobby }) => {
  const classes = useStyles()
  const router = useRouter()

  const {
    status,
    cover,
    start_datetime,
    entry_end_datetime,
    hash_key,
    participant_count,
    max_participants,
    participants,
    organizer_avatar,
    organizer_name,
    title,
    game_title,
    entry_status,
  } = lobby.attributes // TODO use lodash get instead
  const startDate = DateHelper.formatDate(start_datetime)
  const entryEndDate = DateHelper.formatDate(entry_end_datetime)
  const value = status === LOBBY_STATUS.CANCELLED || status === LOBBY_STATUS.DELETED ? LOBBY_STATUS.ENDED : status

  const getMediaScreen = () => {
    return (
      <>
        <Box className={classes.mediaOverlay} display="flex" flexDirection="row" justifyContent="space-between" padding={1}>
          <Box alignSelf="flex-end">
            <ESAvatar size={36} src={organizer_avatar} alt={organizer_name} />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="space-between">
            {entry_status !== null ? (
              <Chip
                className={classes.chipPrimary}
                size="small"
                variant="outlined"
                label={
                  <Box color={Colors.grey[300]} justifySelf="flex-start">
                    <Typography variant="overline" className={classes.label}>
                      {entryStatusText[entry_status]}
                    </Typography>
                  </Box>
                }
              />
            ) : (
              <Box />
            )}
            <Chip
              className={classes.chipSecondary}
              size="small"
              variant="outlined"
              label={
                <Box color={Colors.grey[350]} justifyContent="flex-">
                  <Typography variant="overline" className={classes.label}>
                    {statusText[value]}
                  </Typography>
                </Box>
              }
            />
          </Box>
        </Box>
      </>
    )
  }

  const getTitle = () => {
    return (
      <Box color={Colors.white} className={classes.titleContainer}>
        <Typography className={classes.title}>{title}</Typography>
      </Box>
    )
  }
  const getInfoRow = (value: string) => {
    return <Typography className={classes.organizer}>{value}</Typography>
  }
  const getChippedRow = (chipLabel: string, value: string | number, extra?: string | number) => {
    return (
      <Box display="flex" flexDirection="row" mt={0.5} alignItems="center" color={Colors.white}>
        <ESChip
          className={classes.chip}
          size="small"
          label={
            <Box className={classes.chippedRowText}>
              <Typography variant="overline">{chipLabel}</Typography>
            </Box>
          }
        />
        <Box ml={1} color={Colors.white}>
          <Typography variant="caption" className={classes.chippedValue}>
            {`${value}`}
          </Typography>
        </Box>
        {extra ? (
          <Typography variant="caption" className={classes.chippedExtra}>
            &nbsp;{extra}
          </Typography>
        ) : null}
      </Box>
    )
  }
  const getParticipants = () => {
    return (
      <Box display="flex" justifyContent="flex-end" alignItems="center" className={classes.avatarContainer}>
        {participants && participants.length > 0
          ? participants
              .slice(0, 3)
              .map((participant, i) => (
                <ESAvatar
                  size={20}
                  key={`participants${i}`}
                  style={{ zIndex: participants.length - i }}
                  className={classes.pAvatar}
                  src={participant?.profile_image}
                  alt={participant?.nickname}
                />
              ))
          : null}
      </Box>
    )
  }

  return (
    <ESCard classes={{ root: classes.cardHover }} onClick={() => router.push(`${ESRoutes.LOBBY}/${hash_key}`)}>
      <ESCardMedia
        cornerIcon={<Icon className={'fas fa-university'} fontSize="small" />}
        image={cover ? cover : '/images/default_card.png'}
      >
        {getMediaScreen()}
      </ESCardMedia>
      <ESCardContent>
        {getTitle()}
        {getInfoRow(game_title)}
        {getInfoRow(`${i18n.t('common:lobby.card.organizer')} ${organizer_name}`)}
        {getChippedRow(i18n.t('common:lobby.card.start_date'), startDate)}
        {getChippedRow(i18n.t('common:lobby.card.entry_period'), entryEndDate, 'まで')}
        {getChippedRow(i18n.t('common:lobby.card.entries'), participant_count, `/${max_participants}`)}
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
    height: 45,
  },
  organizer: {
    fontSize: 10,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    minHeight: 15,
  },
  chip: {
    height: 15,
    backgroundColor: Colors.white_opacity[20],
    borderRadius: 2,
  },
  avatarContainer: {
    height: 20,
    marginTop: theme.spacing(2),
  },
  chipPrimary: {
    width: 64,
    height: 17,
    backgroundColor: Colors.black_opacity[70],
    borderRadius: 4,
    border: `0.2px solid ${Colors.grey[300]}`,
  },
  chipSecondary: {
    width: 64,
    height: 17,
    backgroundColor: Colors.white_opacity[87],
    borderRadius: 4,
    borderColor: Colors.grey[350],
    borderWidth: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 8,
  },
  chippedRowText: {
    fontSize: 10,
    marginTop: 2,
    color: Colors.white,
  },
  mediaOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blurOverlay: {
    backgroundColor: Colors.black_opacity[80],
  },
  firstIcon: {
    marginTop: 21,
    height: 17.26,
  },
  marginV: {
    marginTop: 8,
  },
  pAvatar: {
    marginLeft: -8,
  },
  chippedValue: {
    fontSize: 12,
  },
  chippedExtra: {
    fontSize: 12,
    wordBreak: 'keep-all',
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
  captionTitle: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    maxWidth: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    firstIcon: {
      marginTop: 10,
      height: 10,
    },
    marginV: {
      height: 30,
      width: 30,
    },
  },
  [theme.breakpoints.up('lg')]: {
    chippedValue: {
      fontSize: 10,
    },
    chippedExtra: {
      fontSize: 10,
    },
  },
}))

export default LobbyCard
