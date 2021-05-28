import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ArrowBack } from '@material-ui/icons'
import { AppBar, Container, IconButton, Toolbar, Typography } from '@material-ui/core'
import Bracket from '@components/Bracket'
import ESLoader from '@components/FullScreenLoader'
import ScoreModal from '@containers/TournamentDetail/Partials/ScoreModal'
import SummaryModal from '@containers/TournamentDetail/Partials/SummaryModal'
import ESStickyFooter from '@components/StickyFooter'
import useTournamentMatches from './useTournamentMatches'
import useTournamentDetail from '../TournamentDetail/useTournamentDetail'
import useGetProfile from '@utils/hooks/useGetProfile'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { TOURNAMENT_STATUS, ROLE } from '@constants/tournament.constants'

const ArenaMatches: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { matches, third_place_match, fetchMatches, roundTitles, meta: matchesMeta, setScore, scoreMeta } = useTournamentMatches()
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

  const getMatch = (headerText, _match) => {
    const data = tournament.attributes
    const isTeam = data.participant_type > 1

    return (
      <Bracket.Match
        onClick={() => onMatchClick(_match)}
        key={_match.id}
        headerText={headerText}
        editable
        winner={_match.winner}
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
          <AppBar className={classes.appbar}>
            <Container maxWidth="lg">
              <Toolbar className={classes.toolbar}>
                <IconButton className={classes.backButton}>
                  <ArrowBack />
                </IconButton>
                <Typography variant="h2">{tournament.attributes.title}</Typography>
              </Toolbar>
            </Container>
          </AppBar>
          <div className={classes.content}>
            <Container maxWidth="lg">
              <Bracket.Container activeRound={0}>
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
            </Container>
          </div>
          <SummaryModal open={showSummaryModal} tournament={tournament} handleClose={() => setShowSummaryModal(false)} />
        </ESStickyFooter>
      )}
      <ESLoader open={meta.pending || matchesMeta.pending} />
    </div>
  )
}

export default ArenaMatches

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#212121',
    paddingTop: 60,
    background: 'url("/images/pattern.png") center 60px repeat-x #212121 fixed',
  },
  appbar: {
    top: 60,
    backgroundColor: '#000000',
    borderBottom: '1px solid #FFFFFF30',
    borderTop: '1px solid #FFFFFF30',
  },
  toolbar: {
    paddingLeft: 0,
  },
  content: {
    paddingTop: 108,
  },
  backButton: {
    backgroundColor: '#4D4D4D',
    padding: 7,
    marginRight: 16,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
}))
