import { memo, useState, useEffect } from 'react'
import { Typography, Box, makeStyles, Icon, Chip } from '@material-ui/core'
import ESChip from '@components/Chip'
import ESAvatar from '@components/Avatar'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { Colors } from '@theme/colors'
import { ParticipantType, TournamentListItem, TournamentFilterOption } from '@services/arena.service'
import { useTranslation } from 'react-i18next'
import { TOURNAMENT_STATUS as TS, TOURNAMENT_RULE as TR } from '@constants/common.constants'
import i18n from '@locales/i18n'
import _ from 'lodash'

export interface TournamentListFiltered extends TournamentListItem {
  total?: number
  participantsLimited?: ParticipantType[]
  startDate?: string
}

interface Props {
  tournament: TournamentListFiltered
  selectedFilter: string
}

const TournamentHomeCard: React.FC<Props> = ({ tournament, selectedFilter }) => {
  const [filterName, setFilterName] = useState<string>('')
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()

  useEffect(() => {
    switch (selectedFilter) {
      case TournamentFilterOption.all:
        setFilterName(t('common:arenaSearchFilters.all'))
        break
      case TournamentFilterOption.beforeStart:
        setFilterName(t('common:arenaSearchFilters.beforeStart'))
        break
      case TournamentFilterOption.completed:
        setFilterName(t('common:arenaSearchFilters.completed'))
        break
      case TournamentFilterOption.inProgress:
        setFilterName(t('common:arenaSearchFilters.inProgress'))
        break
      case TournamentFilterOption.ready:
        setFilterName(t('common:arenaSearchFilters.ready'))
        break
      case TournamentFilterOption.recruiting:
        setFilterName(t('common:arenaSearchFilters.recruiting'))
        break
      default:
        break
    }
  }, [])

  const attr = tournament.attributes
  const participant = tournament.attributes.participant ? tournament.attributes.participant : tournament.attributes.winner
  const cover = attr.cover ? attr.cover : '/images/default_card.png'
  const organizer = attr.organizer_name ? attr.organizer_name : ''
  const startDate = tournament.startDate

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
          alignItems="flex-end"
          padding={1}
        >
          <ESAvatar size={36} src={attr.organizer_avatar} alt={attr.organizer_name} />
          {selectedFilter === TournamentFilterOption.joined || selectedFilter === TournamentFilterOption.organized ? null : (
            <Chip
              className={classes.chipSecondary}
              size="small"
              variant="outlined"
              label={
                <Box color={Colors.grey[300]} justifyContent="flex-start" className={classes.label}>
                  <Typography variant="overline">{filterName}</Typography>
                </Box>
              }
            />
          )}

          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Chip
              className={classes.chipPrimary}
              size="small"
              label={
                <Box color={Colors.white} justifyContent="flex-">
                  <Typography variant="overline">
                    {attr.rule === TR.BATTLE_ROYAL ? i18n.t('common:tournament:rule_battle') : i18n.t('common:tournament:rule_tournament')}
                  </Typography>
                </Box>
              }
            />
            <Chip
              className={classes.chipPrimary}
              size="small"
              label={
                <Box color={Colors.white}>
                  <Typography variant="overline">{p_type}</Typography>
                </Box>
              }
            />
          </Box>
        </Box>
        {participant?.position && attr.status === TS.COMPLETED && (
          <Box
            zIndex={2}
            className={`${classes.mediaOverlay} ${classes.blurOverlay}`}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <span
              className={`${classes.text} ${participant.position === 1 && classes.first} ${participant.position === 2 && classes.second} ${
                participant.position === 3 && classes.third
              }`}
            >
              {participant.position}
              {participant.position === 1 && <span>st</span>}
              {participant.position === 2 && <span>nd</span>}
              {participant.position === 3 && <span>rd</span>}
            </span>
            <ESAvatar
              onClick={() => {
                participant?.user_code ? router.push(`${ESRoutes.PROFILE}/${participant.user_code}`) : null
              }}
              className={classes.marginV}
              alt={participant?.name}
              src={participant?.profile_image}
            />
            <Box className={classes.captionTitle}>
              <Typography noWrap variant="overline">
                {participant?.name}
              </Typography>
            </Box>
          </Box>
        )}
      </>
    )
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
        {!_.isEmpty(tournament.participantsLimited) &&
          tournament.participantsLimited.map((participant, i) => (
            <ESAvatar
              size={20}
              key={`participants${i}`}
              style={{ zIndex: participants.length - i }}
              className={classes.pAvatar}
              src={participant.profile_image}
              alt={participant.nickname}
            />
          ))}
      </Box>
    )
  }

  return (
    <ESCard classes={{ root: classes.cardHover }} onClick={() => router.push(`${ESRoutes.ARENA}/${attr.hash_key}`)}>
      <ESCardMedia cornerIcon={<Icon className="fas fa-trophy" fontSize="small" />} image={cover}>
        {getMediaScreen()}
      </ESCardMedia>
      <ESCardContent>
        <Box color={Colors.white} className={classes.titleContainer}>
          <Typography className={classes.title}>{attr.title}</Typography>
        </Box>
        <Typography className={classes.organizer}>{attr.game_of_title}</Typography>
        <Typography className={classes.organizer}>{`${t('common:tournament.organizer')} ${organizer}`}</Typography>
        {getChippedRow(t('common:tournament.card_date'), startDate)}
        {getChippedRow(t('common:tournament.entry'), tournament.total, `/${attr.max_participants}`, 0.5)}
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
    width: 64,
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 5,
    height: 17,
    backgroundColor: Colors.black_opacity[90],
    borderRadius: 4,
    border: `0.2px solid ${Colors.grey[300]}`,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 8,
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
    width: 40,
    height: 40,
  },
  pAvatar: {
    marginLeft: -8,
  },

  text: {
    fontSize: 20,
    fontFamily: 'Futura Lt BT',
    fontWeight: 300,
    fontStyle: 'normal',
    textAlign: 'center',
    '& span': {
      fontSize: '0.5em',
    },
    '&$first': {
      fontFamily: 'Futura Hv BT',
      fontWeight: 'normal',
      fontSize: 20,
      fontStyle: 'italic',
      background: 'linear-gradient(55deg, rgba(247,247,53,1) 0%, rgba(195,247,53,1) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      WebkitTextStroke: '1px #FFFF65',
      '& span': {
        marginLeft: -4,
      },
    },
    '&$second': {
      fontFamily: 'Futura Hv BT',
      fontWeight: 'normal',
      fontSize: 20,
      fontStyle: 'italic',
      background: 'linear-gradient(55deg, rgba(198,198,198,1) 0%, rgba(109,157,234,1) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      WebkitTextStroke: '1px #C3D0E3',
    },
    '&$third': {
      fontFamily: 'Futura Hv BT',
      fontWeight: 'normal',
      fontSize: 20,
      fontStyle: 'italic',
      background: 'linear-gradient(55deg, rgba(255,182,65,1) 0%, rgba(227,111,60,1) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      WebkitTextStroke: '1px #FFC962',
    },
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
  first: {},
  second: {},
  third: {},
  [theme.breakpoints.down('sm')]: {
    firstIcon: {
      marginTop: 10,
      height: 10,
    },
  },
}))

export default memo(TournamentHomeCard)
