import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ArrowBack } from '@material-ui/icons'
import { AppBar, Container, IconButton, Toolbar, Typography } from '@material-ui/core'
import Bracket from '@components/Bracket'
import ESLoader from '@components/FullScreenLoader'
import ScoreModal from '@containers/TournamentDetail/Partials/ScoreModal'
import useTournamentMatches from './useTournamentMatches'
import useTournamentDetail from '../TournamentDetail/useTournamentDetail'

const ArenaMatches: React.FC = () => {
  const classes = useStyles()
  const { matches, fetchMatches, roundTitles, meta: matchesMeta, setScore, scoreMeta } = useTournamentMatches()
  const { tournament, meta } = useTournamentDetail()
  const [scoreMatch, setScoreMatch] = useState()

  const onMatchClick = (match) => {
    if (!match) return
    else setScoreMatch(match)
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

                    {round.map((match, mid) => (
                      <Bracket.Match
                        onClick={() => onMatchClick(match)}
                        key={mid}
                        headerText={`${rid + 1}-${mid + 1}`}
                        editable
                        winner={match.winner}
                        participant1={
                          match.home_user ? { avatar: match.home_avatar, label: match.home_user.name, score: match.score_home } : null
                        }
                        participant2={
                          match.guest_user ? { avatar: match.guest_avatar, label: match.guest_user.name, score: match.score_guest } : null
                        }
                      />
                    ))}
                  </Bracket.Round>
                ))}
              </Bracket.Container>
              {scoreMatch && (
                <ScoreModal
                  meta={scoreMeta}
                  tournament={tournament}
                  selectedMatch={scoreMatch}
                  handleSetScore={(params) => setScore({ ...params, hash_key: tournament.attributes.hash_key })}
                  handleClose={(refresh) => {
                    if (refresh) fetchMatches()
                    setScoreMatch(undefined)
                  }}
                />
              )}
            </Container>
          </div>
        </>
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
