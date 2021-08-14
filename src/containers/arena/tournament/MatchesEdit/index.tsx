import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Typography, Icon, Box, useMediaQuery, useTheme } from '@material-ui/core'
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
import { Colors } from '@theme/colors'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'
import useGetProfile from '@utils/hooks/useGetProfile'
import ScoreModal from '@containers/arena/Detail/Partials/ScoreModal'

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
    handleBack,
    setScore,
    scoreMeta,
  } = useTournamentMatches()
  const { tournament, meta } = useTournamentDetail()
  const { freeze, randomize, setParticipant, randomizeMeta, freezeMeta, setParticipantMeta } = useModeratorActions()
  const { isModerator } = useArenaHelper(tournament)
  const [selectedMatch, setSelectedMatch] = useState()
  const [showRandomize, setShowRandomize] = useState(false)
  const [showFreeze, setShowFreeze] = useState(false)
  const [data, setData] = useState<any>()
  const [scoreMatch, setScoreMatch] = useState()
  const { userProfile } = useGetProfile()

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
    if (match && match.round_no == 0 && isModerator) {
      if (tournament.attributes.is_freezed) {
        setScoreMatch(match)
      } else {
        setSelectedMatch(match)
      }
    }
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

  const getMatch = (headerText, _match, round) => {
    const data = tournament.attributes
    const isTeam = data.participant_type > 1

    return (
      <Bracket.Match
        onClick={() => onMatchClick(_match)}
        key={_match.id}
        headerText={headerText}
        editable
        emptyLabel={round === 0 ? t('common:common.please_set') : undefined}
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

  const lastRound = matches.length

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
        classes={{ nextBtnHolder: classes.buttonHolder }}
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
          <Bracket.Container activeRound={0}>
            {matches.map((round, rid) => (
              <Bracket.Round key={rid} roundNo={rid}>
                <Typography variant="h3">{roundTitles.matches[rid]}</Typography>
                {round.map((match, mid) => getMatch(`${rid + 1}-${mid + 1}`, match, rid))}
                {!_.isEmpty(third_place_match) && lastRound === rid + 1 && (
                  <div className={classes.thirdPlaceContainer}>
                    <Bracket.Container activeRound={-1}>
                      <Bracket.Round key={'3rd'} roundNo={0}>
                        <Typography variant="h3">3位決定戦</Typography>
                        {getMatch(`${rid + 1}-2`, third_place_match[0], null)}
                      </Bracket.Round>
                    </Bracket.Container>
                  </div>
                )}
              </Bracket.Round>
            ))}
          </Bracket.Container>
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

          {scoreDialog()}
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
  content: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(16),
  },
  thirdPlaceContainer: {
    position: 'absolute',
    left: 40,
    top: 'calc(50% + 96px)',
    '& h3': {
      top: '12px !important',
    },
  },
  backButton: {
    backgroundColor: Colors.grey[200],
    '&:focus': {
      backgroundColor: Colors.grey[200],
    },
    marginRight: 20,
    marginTop: 5,
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
    actionButtonContainer: {
      flexDirection: 'column',
    },
    backContainer: {
      position: 'absolute',
      backgroundColor: 'transparent',
      borderBottom: 'none',
    },
  },
  buttonHolder: {
    marginBottom: theme.spacing(3),
  },
}))
