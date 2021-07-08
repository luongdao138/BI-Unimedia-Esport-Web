import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Typography, Icon, Box, useMediaQuery, useTheme } from '@material-ui/core'
import Bracket from '@components/Bracket'
import ESLoader from '@components/FullScreenLoader'
import ScoreModal from '@containers/arena/Detail/Partials/ScoreModal'
import SummaryModal from '@containers/arena/Detail/Partials/SummaryModal'
import ESStickyFooter from '@components/StickyFooter'
import useTournamentMatches from './useTournamentMatches'
import useTournamentDetail from '../../hooks/useTournamentDetail'
import useGetProfile from '@utils/hooks/useGetProfile'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { TOURNAMENT_STATUS, ROLE } from '@constants/tournament.constants'
import { TournamentMatchItem } from '@services/arena.service'
import { Colors } from '@theme/colors'

const ArenaMatches: React.FC = () => {
  const _theme = useTheme()
  const isMobile = useMediaQuery(_theme.breakpoints.down('sm'))
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const {
    matches,
    third_place_match,
    fetchMatches,
    roundTitles,
    meta: matchesMeta,
    setScore,
    scoreMeta,
    handleBack,
  } = useTournamentMatches()
  const { tournament, meta } = useTournamentDetail()
  const { userProfile } = useGetProfile()
  const [scoreMatch, setScoreMatch] = useState()
  const [showSummaryModal, setShowSummaryModal] = useState(false)

  const onMatchClick = (match) => {
    if (!match) return
    else setScoreMatch(match)
  }

  const scoreDialog = () => {
    if (!scoreMatch || !tournament) return

    const data = tournament.attributes
    const isTeam = data.participant_type > 1
    const teamIds = _.map(data.my_info, (team: any) => team.team_id)
    const targetIds = isTeam ? teamIds : [Number(userProfile?.id)]
    return (
      <ScoreModal
        targetIds={targetIds}
        meta={scoreMeta}
        tournament={tournament}
        selectedMatch={scoreMatch}
        handleSetScore={(params) => setScore({ ...params, hash_key: tournament.attributes.hash_key })}
        handleClose={(refresh) => {
          if (refresh) fetchMatches()
          setScoreMatch(undefined)
        }}
      />
    )
  }

  const showSummary = () => {
    const data = tournament.attributes
    const isAdmin = data.my_role === ROLE.ADMIN || data.my_role === ROLE.CO_ORGANIZER
    const isCompleted = data.status === TOURNAMENT_STATUS.COMPLETED
    return isAdmin && isCompleted
  }

  const getMatch = (headerText: string, _match: TournamentMatchItem) => {
    const data = tournament.attributes
    const isTeam = data.participant_type > 1
    const clickable = !!_match.home_user || !!_match.guest_user

    return (
      <Bracket.Match
        onClick={() => clickable && onMatchClick(_match)}
        key={_match.id}
        headerText={headerText}
        editable={clickable}
        winner={_match.winner}
        highlightLabel={_match.highlight}
        participant1={
          _match.home_user
            ? {
                avatar: _match.home_avatar,
                label: isTeam ? _match.home_user.team_name : _match.home_user.name,
                score: _match.score_home,
              }
            : null
        }
        participant2={
          _match.guest_user
            ? {
                avatar: _match.guest_avatar,
                label: isTeam ? _match.guest_user.team_name : _match.guest_user.name,
                score: _match.score_guest,
              }
            : null
        }
        score1={_match.score_home}
        score2={_match.score_guest}
      />
    )
  }

  return (
    <div className={classes.root}>
      {matches && tournament && (
        <ESStickyFooter
          disabled={false}
          title={t('common:arena.freeze_button')}
          onClick={() => setShowSummaryModal(true)}
          show={showSummary()}
          noScroll
        >
          <Box className={classes.backContainer}>
            <IconButton onClick={handleBack} className={classes.iconButtonBg2}>
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
            {!isMobile && (
              <Typography variant="h2" className={classes.wrapOne}>
                {tournament.attributes.title}
              </Typography>
            )}
          </Box>
          <div className={classes.content}>
            <Bracket.Container activeRound={10}>
              {matches.map((round, rid) => (
                <Bracket.Round key={rid} roundNo={rid}>
                  <Typography variant="h3">{roundTitles.matches[rid]}</Typography>
                  {round.map((match, mid) => getMatch(`${rid + 1}-${mid + 1}`, match))}
                </Bracket.Round>
              ))}
            </Bracket.Container>
            {!_.isEmpty(third_place_match) && (
              <Bracket.Container activeRound={0}>
                <Bracket.Round key={'3rd'} roundNo={0}>
                  {getMatch('1-1', third_place_match[0])}
                </Bracket.Round>
              </Bracket.Container>
            )}
            {scoreDialog()}
          </div>
          <SummaryModal open={showSummaryModal} tournament={tournament} handleClose={() => setShowSummaryModal(false)} />
        </ESStickyFooter>
      )}
      <ESLoader open={meta.pending || matchesMeta.pending} />
    </div>
  )
}

export default ArenaMatches

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#212121',
    paddingTop: 60,
    background: 'url("/images/pattern.png") center 60px repeat-x #212121 fixed',
    width: '100vw',
    overflow: 'auto',
  },
  content: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(6),
  },
  backButton: {
    backgroundColor: Colors.grey[200],
    '&:focus': {
      backgroundColor: Colors.grey[200],
    },
    marginRight: 20,
    marginTop: 5,
  },
  backContainer: {
    position: 'fixed',
    top: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: theme.spacing(3),
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.black,
    opacity: 0.7,
    zIndex: 100,
    borderBottom: '1px solid #FFFFFF30',
  },
  iconButtonBg2: {
    backgroundColor: Colors.grey[200],
    '&:focus': {
      backgroundColor: Colors.grey[200],
    },
    marginRight: 20,
  },
  wrapOne: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  [theme.breakpoints.down('sm')]: {
    backContainer: {
      position: 'absolute',
      backgroundColor: 'transparent',
      borderBottom: 'none',
    },
  },
}))
