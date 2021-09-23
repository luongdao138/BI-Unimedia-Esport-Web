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
import _ from 'lodash'
import { PlacementItem } from '@services/arena.service'
import TeamEntryEditModal from '@containers/arena/Detail/Partials/ActionComponent/TeamEntryEditModal'
import InidividualEntryEditModal from '@containers/arena/Detail/Partials/ActionComponent/InidividualEntryEditModal'
import { ROLE } from '@constants/tournament.constants'
import ResultListItem from './ResultListItem'
import ResultList from './ResultList'

const ArenaWinners: React.FC = () => {
  const { t } = useTranslation(['common'])
  const { arenaWinners, arena, handleBack, toDetail, isTeam, hasWinnersData, userProfile } = useArenaWinners()
  const showWinner = arenaWinners['1'] && !!arenaWinners['1'].length
  const classes = useStyles()
  const [showSummary, setShowSummary] = useState(false)
  const [, setUpdate] = useState(false)
  const winnerListRef = useRef(null)
  const backButtonRef = useRef(null)
  const [selectedItem, setSelectedItem] = useState(null as PlacementItem | null)

  useEffect(() => {
    window.onscroll = () => {
      const winnerListTopOffset = getClientRect(winnerListRef).top
      const backButtonBottomOffset = getClientRect(backButtonRef).bottom
      setUpdate(winnerListTopOffset < 620 || backButtonBottomOffset > 60)
    }
  }, [])

  const getClientRect = (ref) => {
    if (ref && ref.current) {
      return ref.current.getBoundingClientRect()
    }
    return { top: 0, bottom: 0 }
  }

  const toEntryDetail = (placementItem: PlacementItem) => {
    setSelectedItem(placementItem)
  }

  const getTeamId = (participant: PlacementItem) => {
    return _.get(participant, 'team.id')
  }

  const isMyTeam = (participant: PlacementItem) => {
    const myInfo = _.get(arena, 'attributes.my_info', [])
    const interestedInfos = myInfo
      .filter((info) => info.role === ROLE.INTERESTED || info.role === ROLE.PARTICIPANT)
      .map((info) => `${info.team_id}`)
    if (!interestedInfos || !interestedInfos.length) return false
    return interestedInfos.includes(`${getTeamId(participant)}`)
  }

  const isMe = (participant: PlacementItem) => {
    return `${userProfile?.id}` === `${_.get(participant, 'attributes.user.id', '')}`
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
          <div
            className={`${classes.winnerAvatarWrapper} ${!showWinner && classes.winnerFull}`}
            onClick={() => setShowSummary(!showSummary)}
          >
            {showWinner ? (
              <ArenaAvatar
                src={arenaWinners['1'][0].avatar}
                name={arenaWinners['1'][0].name}
                user_code={arenaWinners['1'][0].user?.user_code}
                win
                leaf
                nameWhite
              />
            ) : (
              <Typography variant="h3">{t('common:arena.result_not_decided')}</Typography>
            )}
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
        {hasWinnersData && arena ? (
          <ResultList rule={arena?.attributes.rule}>
            {Object.keys(arenaWinners).map((key) =>
              (arenaWinners[key] || []).map((p, idx) => (
                <ResultListItem
                  key={idx}
                  position={p.position}
                  avatar={<Avatar src={p.avatar} alt={p.name} />}
                  onClickAvatar={() => toEntryDetail(p)}
                  name={p.name}
                  nameSecondary={p.user ? `@${p.user.user_code}` : ''}
                  score={p.position}
                />
              ))
            )}
          </ResultList>
        ) : null}
      </div>
      {!selectedItem ? null : isTeam ? (
        <TeamEntryEditModal
          tournament={arena}
          userProfile={userProfile}
          previewMode
          open={true}
          initialTeamId={`${getTeamId(selectedItem)}`}
          onClose={() => setSelectedItem(null)}
          myTeam={isMyTeam(selectedItem)}
          toDetail={toDetail}
        />
      ) : (
        <InidividualEntryEditModal
          tournament={arena}
          previewMode
          open={true}
          initialParticipantId={`${selectedItem.id}`}
          onClose={() => setSelectedItem(null)}
          me={isMe(selectedItem)}
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
