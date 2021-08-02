import { Typography, Box, makeStyles, Icon, Chip } from '@material-ui/core'
import ESChip from '@components/Chip'
import ESAvatar from '@components/Avatar'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { Colors } from '@theme/colors'
import { TournamentListItem } from '@services/arena.service'
import { useTranslation } from 'react-i18next'
import { TOURNAMENT_STATUS as TS, TOURNAMENT_RULE as TR } from '@constants/common.constants'
import i18n from '@locales/i18n'

interface Props {
  tournament: TournamentListItem
}

const LobbyCard: React.FC<Props> = ({ tournament }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()

  const attr = tournament.attributes
  const winner = tournament.attributes.winner
  const cover = attr.cover ? attr.cover : '/images/default_card.png'
  // const organizer = attr.organizer_name ? attr.organizer_name : ''
  const startDate = new Date(attr.start_date).toISOString().slice(0, 10).replace(/-/g, '/')

  const getMediaScreen = () => {
    const p_type =
      attr.participant_type === 1 ? i18n.t('common:tournament:type_single') : `${attr.participant_type}on${attr.participant_type}`
    return (
      <>
        <Box
          className={classes.mediaOverlay}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          // alignItems="flex-end"
          padding={1}
        >
          <Box alignSelf="flex-end">
            <ESAvatar size={36} src={attr.organizer_avatar} alt={attr.organizer_name} />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="space-around">
            <Chip
              className={classes.chipPrimary}
              size="small"
              label={
                <Box color={Colors.white} justifySelf="flex-start">
                  <Typography variant="overline">
                    {attr.rule === TR.BATTLE_ROYAL
                      ? t('common:arena.participate_status.participating')
                      : t('common:arena.participate_status.loss')}
                  </Typography>
                </Box>
              }
            />
            <Chip
              className={classes.chipSecondary}
              size="small"
              label={
                <Box color={Colors.black} justifyContent="flex-">
                  <Typography variant="overline">{p_type}</Typography>
                </Box>
              }
            />
          </Box>
        </Box>
        {winner && attr.status === TS.COMPLETED && (
          <Box
            zIndex={2}
            className={`${classes.mediaOverlay} ${classes.blurOverlay}`}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <img className={classes.firstIcon} src="/images/first_icon.png" />
            <ESAvatar
              onClick={() => {
                winner?.user_code ? router.push(`${ESRoutes.PROFILE}/${winner.user_code}`) : null
              }}
              className={classes.marginV}
              alt={winner?.name}
              src={winner?.profile_image ? winner.profile_image : attr.is_single ? null : '/images/avatar.png'}
            />
            <Box className={classes.captionTitle}>
              <Typography noWrap variant="overline">
                {winner?.name}
              </Typography>
            </Box>
          </Box>
        )}
      </>
    )
  }

  const getTitle = () => {
    return (
      <Box color={Colors.white} className={classes.titleContainer}>
        <Typography className={classes.title}>{attr.title}</Typography>
      </Box>
    )
  }
  const getInfoRow = (value: string) => {
    return <Typography className={classes.organizer}>{value}</Typography>
  }
  const getChippedRow = (chipLabel: string, value: string | number, extra?: string | number, topGutter?: number) => {
    return (
      <Box display="flex" flexDirection="row" mt={topGutter ? topGutter : 1} alignItems="center">
        <ESChip
          className={classes.chip}
          size="small"
          label={
            <Box color={Colors.white}>
              <Typography variant="overline">{chipLabel}</Typography>
            </Box>
          }
        />
        <Box ml={1} color={Colors.white}>
          <Typography variant="caption">{value}</Typography>
        </Box>
        {extra ? <Typography variant="caption">{extra}</Typography> : null}
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

  const pCount = () => {
    const count = attr.is_freezed ? attr.participant_count : Number(attr.participant_count) + Number(attr.interested_count)
    return isNaN(count) || !count ? 0 : count
  }

  return (
    <ESCard classes={{ root: classes.cardHover }} onClick={() => router.push(`${ESRoutes.LOBBY}/${attr.hash_key}`)}>
      <ESCardMedia
        cornerIcon={
          <Icon className={/* attr.rule === TR.BATTLE_ROYAL ? */ 'fas fa-university' /*  : 'fas fa-trophy' */} fontSize="small" />
        }
        image={cover}
      >
        {getMediaScreen()}
      </ESCardMedia>
      <ESCardContent>
        {getTitle()}
        {getInfoRow(attr.game_of_title)}
        {/* {getInfoRow(`${t('common:tournament.organizer')} ${organizer}`)} */}
        {getChippedRow(t('common:tournament_create.start_date'), startDate)}
        {getChippedRow(t('common:tournament_create.entry_period'), startDate, ' まで')}
        {getChippedRow(t('common:tournament.entry_number'), pCount(), `/${attr.max_participants}`, 0.5)}
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
  organizer: {
    fontSize: 10,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  chip: {
    height: 15,
    backgroundColor: Colors.white_opacity[20],
  },
  avatarContainer: {
    height: 20,
    marginTop: theme.spacing(2),
  },
  chipPrimary: {
    height: 20,
    marginBottom: 5,
    backgroundColor: Colors.black_opacity[90],
    borderRadius: 10,
  },
  chipSecondary: {
    height: 20,
    marginBottom: 5,
    backgroundColor: Colors.white_opacity[90],
    borderRadius: 10,
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
}))

export default LobbyCard
