import { Typography, Box, withStyles, makeStyles, Icon, Chip } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import ESChip from '@components/Chip'
import ESAvatar from '@components/Avatar'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'

interface Props {
  tournament: any
}

const StyledAvatarGroup = withStyles({
  avatar: {
    width: 20,
    height: 20,
    fontSize: 12,
    color: Colors.white,
  },
})(AvatarGroup)

const TYPES = {
  LIST: 'tournaments_list',
  HISTORY: 'tournaments_list_for_participants',
}
// const STATUS = {
//   COMPLETED: 'completed',
//   STARTED: 'started',
// }

const TournamentCard: React.FC<Props> = ({ tournament }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()

  const data = tournament.type === TYPES.HISTORY ? tournament.attributes.tournament : tournament.attributes
  const attr = tournament.attributes
  const cover = attr.cover ? attr.cover : '/images/avatar.png'
  const organizer = attr.organizer?.nickname ? attr.organizer.nickname : ''
  const startDate = new Date(data.start_date).toISOString().slice(0, 10).replace(/-/g, '/')

  const getOverlayScreen = () => {
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
          <ESAvatar size={36} src={attr.organizer_avatar} alt={attr.organizer.nickname} />
          <Chip
            className={classes.chipPrimary}
            size="small"
            label={
              <Box color={Colors.white}>
                <Typography variant="caption">トーナメント</Typography>
              </Box>
            }
          />
        </Box>
        {tournament.type === TYPES.HISTORY && (
          <Box
            zIndex={2}
            className={`${classes.mediaOverlay} ${classes.blurOverlay}`}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <img className={classes.firstIcon} src="/images/first_icon.png" />
            <ESAvatar className={classes.marginV} alt="Avatar" src="/images/avatar.png" />
            <Typography variant="caption">トーナメント</Typography>
            {/* <Box paddingRight={1} display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" height={72.98}> */}
            {/* </Box> */}
          </Box>
        )}
      </>
    )
  }

  const getTitle = () => {
    return (
      <Box color={Colors.white}>
        <Typography>{data.title}</Typography>
      </Box>
    )
  }
  const getInfoRow = (value: string) => {
    return <Typography className={classes.organizer}>{value}</Typography>
  }
  const getChippedRow = (chipLabel: string, value: string, extra?: string) => {
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
    if (attr.participants && attr.participants.length > 0) {
      return (
        <Box display="flex" justifyContent="flex-end">
          <StyledAvatarGroup max={4}>
            {attr.participants.map((participant, i) => (
              <ESAvatar key={`participants${i}`} src={participant.profile_image} alt={participant.nickname} />
            ))}
          </StyledAvatarGroup>
        </Box>
      )
    }
  }

  return (
    <ESCard>
      <ESCardMedia cornerIcon={<Icon className="fas fa-trophy" fontSize="small" />} image={cover}>
        {getOverlayScreen()}
      </ESCardMedia>
      <ESCardContent>
        {getTitle()}
        {getInfoRow(attr.game_title)}
        {getInfoRow(`${t('common:tournament.organizer')} ${organizer}`)}
        {getChippedRow(t('common:tournament.card_date'), startDate)}
        {getChippedRow(t('common:tournament.entry'), attr.participant_count, `/${data.max_participants}`)}
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
