import { Typography, Box, makeStyles, Icon, Chip } from '@material-ui/core'
import ESChip from '@components/Chip'
import ESAvatar from '@components/Avatar'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'
import ESAvatarGroup from '@components/Avatar/AvatarGroup'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { Colors } from '@theme/colors'
import { TournamentListItem } from '@services/tournament.service'
import { useTranslation } from 'react-i18next'
import { TOURNAMENT_STATUS as TS } from '@constants/common.constants'
// import i18n from '@locales/i18n'

interface Props {
  tournament: TournamentListItem
}

// const StyledAvatarGroup = withStyles({
//   avatar: {
//     width: 20,
//     height: 20,
//     fontSize: 12,
//     color: Colors.white,
//   },
// })(AvatarGroup)

// const TYPES = {
//   LIST: 'tournaments_list',
//   HISTORY: 'tournaments_list_for_participants',
// }
// const STATUS = {
//   COMPLETED: 'completed',
//   STARTED: 'started',
// }

const TournamentCard: React.FC<Props> = ({ tournament }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()

  // const data = tournament.type === TYPES.HISTORY ? tournament.attributes.tournament : tournament.attributes
  const attr = tournament.attributes
  const winner = tournament.attributes.winner
  const cover = attr.cover ? attr.cover : '/images/avatar.png'
  const organizer = attr.organizer_name ? attr.organizer_name : ''
  const startDate = new Date(attr.start_date).toISOString().slice(0, 10).replace(/-/g, '/')
  // console.log('index.tsx 45 ', winner)

  const getMediaScreen = () => {
    return (
      <>
        <Box
          className={classes.mediaOverlay}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
          padding={1}
        >
          <ESAvatar size={36} src={attr.organizer_avatar} alt={attr.organizer_name} />
          <Box display="flex" flexDirection="column">
            <Chip
              className={classes.chipPrimary}
              size="small"
              label={
                <Box color={Colors.white} justifyContent="flex-">
                  <Typography variant="caption">
                    aaa
                    {/* {attr.rule === TR.SINGLE
                      ? i18n.t('common:tournament:rule_single')
                      : attr.rule === TR.DOUBLE
                      ? i18n.t('common:tournament:rule_double')
                      : i18n.t('common:tournament:rule_battle')} */}
                  </Typography>
                </Box>
              }
            />
          </Box>
        </Box>
        {(attr.status === TS.CANCELLED || attr.status === TS.COMPLETED) && (
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
              alt="Avatar"
              src={winner?.profile_image ? winner.profile_image : '/images/avatar.png'}
            />
            <Typography variant="caption">{winner?.name}</Typography>
          </Box>
        )}
      </>
    )
  }

  const getTitle = () => {
    return (
      <Box color={Colors.white}>
        <Typography>{attr.title}</Typography>
      </Box>
    )
  }
  const getInfoRow = (value: string) => {
    return <Typography className={classes.organizer}>{value}</Typography>
  }
  const getChippedRow = (chipLabel: string, value: string | number, extra?: string | number) => {
    return (
      <Box display="flex" flexDirection="row" mt={1} alignItems="center">
        <ESChip
          className={classes.chip}
          size="small"
          label={
            <Box color={Colors.white}>
              <Typography variant="caption">{chipLabel}</Typography>
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
    return (
      <Box display="flex" justifyContent="flex-end" alignItems="center" className={classes.avatarContainer}>
        {attr.participants && attr.participants.length > 0 ? (
          <ESAvatarGroup max={4}>
            {attr.participants.map((participant, i) => (
              <ESAvatar key={`participants${i}`} src={participant.profile_image} alt={participant.nickname} />
            ))}
          </ESAvatarGroup>
        ) : null}
      </Box>
    )
  }

  return (
    <ESCard>
      <ESCardMedia cornerIcon={<Icon className="fas fa-trophy" fontSize="small" />} image={cover}>
        {getMediaScreen()}
      </ESCardMedia>
      <ESCardContent>
        {getTitle()}
        {getInfoRow(attr.game_of_title)}
        {getInfoRow(`${t('common:tournament.organizer')} ${organizer}`)}
        {getChippedRow(t('common:tournament.card_date'), startDate)}
        {getChippedRow(t('common:tournament.entry'), attr.participant_count, `/${attr.max_participants}`)}
        {getParticipants()}
      </ESCardContent>
    </ESCard>
  )
}

export default TournamentCard

const useStyles = makeStyles(() => ({
  card: {
    width: 240,
  },
  organizer: {
    fontSize: 10,
  },
  chip: {
    height: 15,
    backgroundColor: Colors.grey[400],
  },
  avatarContainer: {
    height: 25,
  },
  chipPrimary: {
    height: 20,
    backgroundColor: Colors.primary,
  },
  mediaOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  blurOverlay: {
    backgroundColor: Colors.black_opacity[70],
  },
  firstIcon: {
    width: 19.56,
    height: 15.4,
  },
  marginV: {
    marginTop: 5,
    marginBottom: 3,
  },
}))
