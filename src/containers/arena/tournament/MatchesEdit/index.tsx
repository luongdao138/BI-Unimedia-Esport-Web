import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ArrowBack } from '@material-ui/icons'
import { AppBar, Container, IconButton, Toolbar, Typography, Box, Icon } from '@material-ui/core'
import Bracket from '@components/Bracket'
import ESLoader from '@components/FullScreenLoader'
import ESStickyFooter from '@components/StickyFooter'
import SelectParticipantModal from '../../Detail/Partials/SelectParticipantModal'
import useTournamentMatches from './useTournamentMatches'
import useTournamentDetail from '@containers/arena/hooks/useTournamentDetail'
import RandomizeDialog from './Partials/RandomizeDialog'
import FreezeDialog from './Partials/FreezeDialog'
import { useTranslation } from 'react-i18next'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import _ from 'lodash'
import useModeratorActions from '@containers/arena/hooks/useModeratorActions'
import ButtonPrimary from '@components/ButtonPrimary'
import ButtonPrimaryOutlined from '@components/ButtonPrimaryOutlined'

const ArenaMatches: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { matches, third_place_match, fetchMatches, roundTitles, meta: matchesMeta, handleBack } = useTournamentMatches()
  const { tournament, meta } = useTournamentDetail()
  const { freeze, randomize, setParticipant, randomizeMeta, freezeMeta, setParticipantMeta } = useModeratorActions()
  const [selectedMatch, setSelectedMatch] = useState()
  const [showRandomize, setShowRandomize] = useState(false)
  const [showFreeze, setShowFreeze] = useState(false)
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
        show={data.memberSelectable}
        noScroll
        content={
          <Box className={classes.actionButtonContainer}>
            <Box className={classes.actionButton}>
              <ButtonPrimaryOutlined
                onClick={() => setShowRandomize(true)}
                leadingIcon={<Icon className="fas fa-random" fontSize="small" />}
              >
                {t('common:arena.randomize_button')}
              </ButtonPrimaryOutlined>
            </Box>
            <Box className={classes.actionButton}>
              <ButtonPrimary type="submit" round fullWidth disabled={!freezable} onClick={() => setShowFreeze(true)}>
                {t('common:arena.freeze_button')}
              </ButtonPrimary>
            </Box>
          </Box>
        }
      >
        <AppBar className={classes.appbar}>
          <Container maxWidth="lg">
            <Toolbar className={classes.toolbar}>
              <IconButton className={classes.backButton} onClick={handleBack}>
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
              <Bracket.Round key="3rd" roundNo={0}>
                {getMatch('1-1', third_place_match[0])}
              </Bracket.Round>
            </Bracket.Container>
          )}
          <SelectParticipantModal
            meta={setParticipantMeta}
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

        <FreezeDialog
          open={showFreeze}
          onClose={() => setShowFreeze(false)}
          onAction={() => {
            setShowFreeze(false)
            freeze(tournament.attributes.hash_key)
          }}
        />
      </ESStickyFooter>
    )
  }

  return (
    <div className={classes.root}>
      {matches && matchesMeta.loaded && data && body()}
      <ESLoader open={meta.pending || matchesMeta.pending || randomizeMeta.pending || freezeMeta.pending} />
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
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButton: {
    width: theme.spacing(35),
    margin: 8,
  },
  [theme.breakpoints.down('sm')]: {
    actionButtonContainer: {
      flexDirection: 'column',
    },
  },
}))
