import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ArrowBack } from '@material-ui/icons'
import { AppBar, Container, Box, IconButton, Toolbar, Typography, Theme } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import Bracket from '@components/Bracket'
import ESLoader from '@components/FullScreenLoader'
import ScoreModal from '@containers/TournamentDetail/Partials/ScoreModal'
import SummaryModal from '@containers/TournamentDetail/Partials/SummaryModal'
import useTournamentMatches from './useTournamentMatches'
import useTournamentDetail from '../TournamentDetail/useTournamentDetail'
import useGetProfile from '@utils/hooks/useGetProfile'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

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

  const actionButtons = () => {
    // if (!data || !matches || !matchesMeta.loaded) return
    // if (!data.memberSelectable) return
    // const freezable = TournamentHelper.checkParticipantsSelected(matches, data.interested_count, data.max_participants)
    return (
      <Box className={classes.stickyFooter}>
        <Box className={classes.nextBtnHolder}>
          <Box maxWidth={280} className={classes.buttonContainer}>
            <ButtonPrimary type="submit" round fullWidth onClick={() => setShowSummaryModal(true)}>
              {t('common:arena.freeze_button')}
            </ButtonPrimary>
          </Box>
        </Box>
        <SummaryModal open={showSummaryModal} tournament={tournament} handleClose={() => setShowSummaryModal(false)} />
      </Box>
    )
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
        <>
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
          {actionButtons()}
        </>
      )}
      <ESLoader open={meta.pending || matchesMeta.pending} />
    </div>
  )
}

export default ArenaMatches

const useStyles = makeStyles((theme: Theme) => ({
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
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  nextBtnHolder: {
    display: 'flex',
    marginBottom: theme.spacing(11),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
  },
}))
