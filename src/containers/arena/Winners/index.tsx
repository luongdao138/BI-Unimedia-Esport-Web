import useArenaWinners from './useArenaWinners'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { Colors } from '@theme/colors'
import Avatar from '@components/Avatar'
import { Typography, IconButton, Box, Divider } from '@material-ui/core'
import ArenaAvatar from './ArenaAvatar'
import { useEffect, useState, useRef } from 'react'
import ESButton from '@components/Button'
import { useTranslation } from 'react-i18next'
import Linkify from 'react-linkify'
import { ParticipantsResponse, PlacementItem } from '@services/arena.service'
import TeamEntryEditModal from '@containers/arena/Detail/Partials/ActionComponent/TeamEntryEditModal'
import InidividualEntryEditModal from '@containers/arena/Detail/Partials/ActionComponent/InidividualEntryEditModal'
import ResultListItem from './ResultListItem'
import ResultList from './ResultList'

const ArenaWinners: React.FC = () => {
  const { t } = useTranslation(['common'])
  const {
    arenaWinners,
    arena,
    handleBack,
    toDetail,
    isTeam,
    hasWinnersData,
    userProfile,
    isBattleRoyale,
    arenaBRWinners,
    winner,
    winnersMeta,
    brWinnersMeta,
    resetMeta,
  } = useArenaWinners()
  const classes = useStyles()
  const [showSummary, setShowSummary] = useState(false)
  const [, setUpdate] = useState(false)
  const winnerListRef = useRef(null)
  const backButtonRef = useRef(null)
  const [selectedItem, setSelectedItem] = useState<{ id: number; highlight: boolean } | null>(null)

  useEffect(() => {
    window.onscroll = () => {
      const winnerListTopOffset = getClientRect(winnerListRef).top
      const backButtonBottomOffset = getClientRect(backButtonRef).bottom
      setUpdate(winnerListTopOffset < 620 || backButtonBottomOffset > 60)
    }

    return () => resetMeta()
  }, [])

  const getClientRect = (ref) => {
    if (ref && ref.current) {
      return ref.current.getBoundingClientRect()
    }
    return { top: 0, bottom: 0 }
  }

  const selectTournamentParticipant = (item: PlacementItem) => {
    const id = isTeam ? item.team_id : item.id
    setSelectedItem({ id, highlight: item.highlight })
  }

  const selectBRParticipant = (item: ParticipantsResponse) => {
    const id = Number(item.attributes.team?.data.id || item.id)
    setSelectedItem({ id, highlight: item.highlight })
  }
  return (
    <div className={classes.root}>
      <div ref={backButtonRef} className={classes.backButtonWrapper}>
        <IconButton className={classes.backButton} onClick={handleBack}>
          <ArrowBack />
        </IconButton>
      </div>
      <div className={classes.coverWrapper}>
        <img src={'/images/arena_cover.png'} className={classes.cover} />
      </div>
      <div className={classes.topWrapper}>
        <Box color={Colors.white} textAlign="center" mb={3}>
          <Typography variant="h3" className={classes.title}>
            {arena?.attributes?.title || ''}
          </Typography>
        </Box>
        <Divider />
        <Box position="relative">
          <div className={`${classes.winnerAvatarWrapper} ${!winner && classes.winnerFull}`} onClick={() => setShowSummary(!showSummary)}>
            {winner ? <ArenaAvatar src={winner.avatar} name={winner.name} user_code={winner.user_code} win leaf nameWhite /> : null}
            {!winner && (winnersMeta.loaded || brWinnersMeta.loaded) ? (
              <Typography variant="h3">{t('common:arena.result_not_decided')}</Typography>
            ) : null}
          </div>
        </Box>
      </div>
      <div className={classes.summary}>
        {arena?.attributes?.summary_image && (
          <div className={classes.summarImageWrapper}>{<img src={arena.attributes.summary_image} />}</div>
        )}
        <Linkify
          componentDecorator={(decoratedHref, decoratedText, key) => (
            <a target="_blank" rel="noopener noreferrer" href={decoratedHref} key={key} className={classes.link}>
              {decoratedText}
            </a>
          )}
        >
          <Typography className={classes.multiline}>{arena?.attributes?.summary || ''}</Typography>
        </Linkify>
      </div>
      <Box textAlign="center" pb={4} className={classes.detailButton}>
        <ESButton className={classes.bottomButton} variant="outlined" round size="large" onClick={toDetail}>
          {t('common:tournament.tournament_detail')}
        </ESButton>
      </Box>
      <div ref={winnerListRef} className={classes.listContainer}>
        {hasWinnersData && !isBattleRoyale ? (
          <ResultList rule={arena?.attributes.rule}>
            {Object.keys(arenaWinners).map((key) =>
              (arenaWinners[key] || []).map((p, idx) => (
                <ResultListItem
                  key={idx}
                  position={p.position}
                  avatar={<Avatar src={p.avatar} alt={p.name} />}
                  onClickAvatar={() => selectTournamentParticipant(p)}
                  name={p.name}
                  nameSecondary={p.user ? `@${p.user.user_code}` : ''}
                  score={p.position}
                />
              ))
            )}
          </ResultList>
        ) : null}
        {isBattleRoyale && winner ? (
          <ResultList rule={arena?.attributes.rule}>
            {arenaBRWinners.map((p, idx) => (
              <ResultListItem
                key={idx}
                position={p.attributes.position}
                avatar={<Avatar src={p.attributes.avatar_url} alt={p.attributes.name} />}
                onClickAvatar={() => selectBRParticipant(p)}
                name={p.attributes.team ? p.attributes.team.data.attributes.name : p.attributes.name}
                nameSecondary={p.attributes.user ? `@${p.attributes.user.user_code}` : ''}
                score={p.attributes.attack_score}
              />
            ))}
          </ResultList>
        ) : null}
      </div>
      {!selectedItem ? null : isTeam ? (
        <TeamEntryEditModal
          tournament={arena}
          userProfile={userProfile}
          previewMode
          open={true}
          initialTeamId={String(selectedItem.id)}
          onClose={() => setSelectedItem(null)}
          myTeam={selectedItem.highlight}
          toDetail={toDetail}
        />
      ) : (
        <InidividualEntryEditModal
          tournament={arena}
          previewMode
          open={true}
          initialParticipantId={String(selectedItem.id)}
          onClose={() => setSelectedItem(null)}
          me={selectedItem.highlight}
          toDetail={toDetail}
        />
      )}
    </div>
  )
}

export default ArenaWinners

const useStyles = makeStyles((theme) => ({
  multiline: {
    whiteSpace: 'pre-wrap',
  },
  link: {
    color: Colors.white,
    textDecoration: 'underline',
  },
  root: {
    position: 'relative',
    paddingBottom: theme.spacing(3),
  },
  backButton: {
    backgroundColor: '#4D4D4D',
    padding: 7,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
  backButtonWrapper: {
    position: 'fixed',
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
    zIndex: 3,
  },
  detailButton: {
    position: 'sticky',
    zIndex: 1,
  },
  coverWrapper: {
    position: 'sticky',
    zIndex: 0,
    top: 60,
    height: 560,
    marginBottom: -100,
    '&:before': {
      content: "''",
      position: 'absolute',
      background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 70%, rgba(33,33,33,1) 100%)',
      bottom: 0,
      height: 560,
      width: '100%',
    },
  },
  cover: {
    width: '100%',
    height: 560,
    objectFit: 'cover',
  },
  winnerAvatarWrapper: {
    textAlign: 'center',
    position: 'absolute',
    top: 155,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
  },
  winnerFull: {
    width: '100%',
  },
  topWrapper: {
    position: 'absolute',
    width: '100%',
    top: 80,
  },
  title: {
    wordBreak: 'break-word',
  },
  summary: {
    position: 'sticky',
    zIndex: 1,
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    overflow: 'visible',
    willChange: 'all',
    transition: 'all 0.225s ease-out',
    opacity: 1,
    height: 'auto',
    marginBottom: theme.spacing(4),
    visibility: 'visible',
  },
  summarImageWrapper: {
    position: 'relative',
    borderRadius: 8,
    paddingTop: '28%',
    overflow: 'hidden',
    zIndex: 2,
    '& img': {
      zIndex: 1,
      position: 'absolute',
      objectFit: 'cover',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
    },
  },
  listContainer: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  placementImage: {
    height: 40,
  },
  placementWrapper: {
    width: 55,
    marginRight: theme.spacing(1),
  },
  bottomButton: {
    borderRadius: 4,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),
    alignSelf: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    listContainer: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  },
}))
