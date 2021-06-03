import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ArrowBack } from '@material-ui/icons'
import { AppBar, Container, IconButton, Toolbar, Typography } from '@material-ui/core'
import Bracket from '@components/Bracket'
import ESLoader from '@components/FullScreenLoader'
import ESStickyFooter from '@components/StickyFooter'
import SelectParticipantModal from '../TournamentDetail/Partials/SelectParticipantModal'
import useTournamentMatches from './useTournamentMatches'
import useTournamentDetail from '../TournamentDetail/useTournamentDetail'
import RandomizeDialog from './Partials/RandomizeDialog'
import { useTranslation } from 'react-i18next'
import ESToast from '@components/Toast'
import { useRouter } from 'next/router'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import _ from 'lodash'

const ArenaMatches: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const {
    matches,
    third_place_match,
    setParticipant,
    freeze,
    randomize,
    fetchMatches,
    roundTitles,
    meta: matchesMeta,
    setMeta,
    randomizeMeta,
    resetRandomizeMeta,
    freezeMeta,
    resetFreezeMeta,
  } = useTournamentMatches()
  const { tournament, meta } = useTournamentDetail()
  const [selectedMatch, setSelectedMatch] = useState()
  const [showRandomize, setShowRandomize] = useState(false)
  const [data, setData] = useState<any>()

  useEffect(() => {
    if (tournament) {
      setData(TournamentHelper.getDetailData(tournament))
    }
  }, [tournament])

  useEffect(() => {
    if (randomizeMeta.loaded) {
      fetchMatches()
    }
  }, [randomizeMeta.loaded])

  const onMatchClick = (match) => {
    if (match && match.round_no == 0 && !tournament.attributes.is_freezed) setSelectedMatch(match)
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

  const body = () => {
    const freezable = TournamentHelper.checkParticipantsSelected(matches, data.interested_count, data.max_participants)

    return (
      <ESStickyFooter
        disabled={false}
        title={freezable ? t('common:arena.freeze_button') : t('common:arena.randomize_button')}
        onClick={freezable ? () => freeze(tournament.attributes.hash_key) : () => setShowRandomize(true)}
        show={data.memberSelectable}
        noScroll
      >
        <AppBar className={classes.appbar}>
          <Container maxWidth="lg">
            <Toolbar className={classes.toolbar}>
              <IconButton className={classes.backButton} onClick={() => router.back()}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h2">{tournament.attributes.title}</Typography>
            </Toolbar>
          </Container>
        </AppBar>
        <div className={classes.content}>
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
        </div>
        <RandomizeDialog
          open={showRandomize}
          onClose={() => setShowRandomize(false)}
          onAction={() => {
            setShowRandomize(false)
            randomize(tournament.attributes.hash_key)
          }}
        />
      </ESStickyFooter>
    )
  }

  return (
    <div className={classes.root}>
      {matches && matchesMeta.loaded && data && body()}
      <ESLoader open={meta.pending || matchesMeta.pending || randomizeMeta.pending || freezeMeta.pending} />

      {/* success */}
      {randomizeMeta.loaded && (
        <ESToast open={randomizeMeta.loaded} message={t('common:arena.randomize_success')} resetMeta={resetRandomizeMeta} />
      )}
      {freezeMeta.loaded && <ESToast open={freezeMeta.loaded} message={t('common:arena.freeze_success')} resetMeta={resetFreezeMeta} />}

      {/* error */}
      {!!randomizeMeta.error && <ESToast open={!!randomizeMeta.error} message={t('common:error.failed')} resetMeta={resetRandomizeMeta} />}
      {!!freezeMeta.error && <ESToast open={!!freezeMeta.error} message={t('common:error.failed')} resetMeta={resetFreezeMeta} />}
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
    padding: theme.spacing(3),
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
