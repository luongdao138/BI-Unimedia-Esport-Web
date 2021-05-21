import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ArrowBack } from '@material-ui/icons'
import { AppBar, Container, Box, IconButton, Theme, Toolbar, Typography } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import Bracket from '@components/Bracket'
import ESLoader from '@components/FullScreenLoader'
import SelectParticipantModal from '../TournamentDetail/Partials/SelectParticipantModal'
import useTournamentMatches from './useTournamentMatches'
import useTournamentDetail from '../TournamentDetail/useTournamentDetail'
import RandomizeDialog from './Partials/RandomizeDialog'
import { useTranslation } from 'react-i18next'
import ESToast from '@components/Toast'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'

const ArenaMatches: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { matches, setParticipant, fetchMatches, setMeta, roundTitles, meta: matchesMeta } = useTournamentMatches()
  const { tournament, meta } = useTournamentDetail()
  const [selectedMatch, setSelectedMatch] = useState()
  const [adsf, asdfasdf] = useState(false)
  const [adsf1, asdfasdf1] = useState(false)
  const [data, setData] = useState<any>()

  useEffect(() => {
    if (tournament) {
      setData(TournamentHelper.getDetailData(tournament))
    }
  }, [tournament])

  const onMatchClick = (match) => {
    if (match && match.round_no == 0 && !tournament.attributes.is_freezed) setSelectedMatch(match)
  }

  const actionButtons = () => {
    if (!data) return
    if (!data.memberSelectable) return
    const freezable = TournamentHelper.checkParticipantsSelected(matches, data.interested_count, data.max_participants)
    return (
      <Box className={classes.stickyFooter}>
        <Box className={classes.nextBtnHolder}>
          <Box maxWidth={280} className={classes.buttonContainer}>
            {freezable ? (
              <ButtonPrimary type="submit" round fullWidth onClick={() => asdfasdf(true)}>
                {t('common:arena.freeze_button')}
              </ButtonPrimary>
            ) : (
              <RandomizeDialog onAction={() => alert('selectedMatch')} />
            )}
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <div className={classes.root}>
      {matches && tournament && data && (
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

                    {round.map((match, mid) => {
                      const data = tournament.attributes
                      const isTeam = data.participant_type > 1
                      return (
                        <Bracket.Match
                          onClick={() => onMatchClick(match)}
                          key={mid}
                          headerText={`${rid + 1}-${mid + 1}`}
                          editable
                          winner={match.winner}
                          participant1={
                            match.home_user
                              ? {
                                  avatar: match.home_avatar,
                                  label: isTeam ? match.home_user.team_name : match.home_user.name,
                                  score: match.score_home,
                                }
                              : null
                          }
                          participant2={
                            match.guest_user
                              ? {
                                  avatar: match.guest_avatar,
                                  label: isTeam ? match.guest_user.team_name : match.guest_user.name,
                                  score: match.score_guest,
                                }
                              : null
                          }
                        />
                      )
                    })}
                  </Bracket.Round>
                ))}
              </Bracket.Container>
              <SelectParticipantModal
                meta={setMeta}
                tournament={tournament}
                selectedMatch={selectedMatch}
                handleSetParticipant={(params) => setParticipant({ ...params, hash_key: tournament.attributes.hash_key })}
                handleClose={(refresh) => {
                  if (refresh) fetchMatches()
                  setSelectedMatch(undefined)
                }}
              />
              {data.memberSelectable && <Box className={classes.blankSpace}></Box>}
            </Container>
          </div>
          {actionButtons()}
        </>
      )}
      <ESLoader open={meta.pending || matchesMeta.pending} />
      {adsf && (
        <ESToast
          open={adsf}
          message={t('common:arena.randomize_success')} //resetMeta={resetMeta}
          onClose={() => asdfasdf(false)}
        />
      )}
      {adsf1 && (
        <ESToast
          open={adsf1}
          message={t('common:arena.freeze_success')} //resetMeta={resetMeta}
          onClose={() => asdfasdf1(false)}
        />
      )}
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
  blankSpace: {
    height: 169,
  },
  [theme.breakpoints.down('sm')]: {
    blankSpace: {
      height: theme.spacing(15),
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
