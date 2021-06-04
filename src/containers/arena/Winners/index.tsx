import useArenaWinners from './useArenaWinners'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { Colors } from '@theme/colors'
import Avatar from '@components/Avatar'
import { Typography, IconButton } from '@material-ui/core'
import ArenaAvatar from './ArenaAvatar'
import { useEffect, useState, useRef } from 'react'

const ArenaWinners: React.FC = () => {
  const { arenaWinners, arena, handleBack } = useArenaWinners()
  const classes = useStyles()
  const [showSummary, setShowSummary] = useState(false)
  const [, setUpdate] = useState(false)
  const winnerListRef = useRef(null)
  const backButtonRef = useRef(null)

  useEffect(() => {
    window.onscroll = () => {
      const winnerListTopOffset = winnerListRef.current.getBoundingClientRect().top
      const backButtonBottomOffset = backButtonRef.current.getBoundingClientRect().bottom
      setUpdate(winnerListTopOffset < 620 || backButtonBottomOffset > 60)
    }
  }, [])

  return (
    <div className={classes.root}>
      <div ref={backButtonRef} className={classes.backButtonWrapper}>
        <IconButton className={classes.backButton} onClick={handleBack}>
          <ArrowBack />
        </IconButton>
      </div>
      <div className={classes.coverWrapper}>
        {arena?.attributes?.cover_image && <img src={arena?.attributes?.cover_image} className={classes.cover} />}
      </div>
      <div className={classes.winnerAvatarWrapper} onClick={() => setShowSummary(!showSummary)}>
        {arenaWinners['1'] && !!arenaWinners['1'].length && (
          <ArenaAvatar
            src={arenaWinners['1'][0].avatar}
            name={arenaWinners['1'][0].name}
            user_code={arenaWinners['1'][0].user?.user_code}
            win
            leaf
            nameWhite
          />
        )}
      </div>
      <div className={`${classes.summary} ${showSummary && classes.showSummary}`}>
        <div className={classes.summarImageWrapper}>{arena?.attributes?.summary_image && <img src={arena.attributes.summary_image} />}</div>
        <Typography>{arena?.attributes?.summary || ''}</Typography>
      </div>
      <div ref={winnerListRef} className={classes.listContainer}>
        {Object.keys(arenaWinners).map((key) =>
          (arenaWinners[key] || []).map((p, idx) => (
            <div className={classes.listItem} key={idx}>
              <div className={classes.placementWrapper}>
                <p
                  className={`${classes.text} ${p.position === 1 && classes.first} ${p.position === 2 && classes.second} ${
                    p.position === 3 && classes.third
                  }`}
                >
                  {p.position}
                  {p.position === 1 && <span>st</span>}
                  {p.position === 2 && <span>nd</span>}
                  {p.position === 3 && <span>rd</span>}
                </p>
              </div>
              <Avatar src={p.avatar} />
              <div className={classes.nameWrapper}>
                <Typography variant="h3" component="p">
                  {p.name}
                </Typography>
                {p.user && (
                  <Typography variant="body2" className={classes.user_code}>
                    {`@${p.user.user_code}`}
                  </Typography>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ArenaWinners

const useStyles = makeStyles((theme) => ({
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
    position: 'absolute',
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
    zIndex: 1,
  },
  coverWrapper: {
    position: 'sticky',
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
    position: 'absolute',
    top: 240,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
  },
  summary: {
    position: 'relative',
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(0),
    overflow: 'visible',
    opacity: 0,
    height: 0,
    visibility: 'hidden',
    willChange: 'all',
    transition: 'all 0.225s ease-out',
  },
  showSummary: {
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
    borderRadius: theme.spacing(0.5),
    border: `1px solid ${Colors.white_opacity['30']}`,
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    background: Colors.black_opacity['70'],
    position: 'relative',
  },
  listItem: {
    height: 66,
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: Colors.white_opacity['10'],
    },
  },
  nameWrapper: {
    color: Colors.white,
    paddingLeft: theme.spacing(2),
  },
  user_code: {
    color: Colors.white_opacity['70'],
  },
  text: {
    fontSize: 30,
    fontFamily: 'Futura Lt BT',
    fontWeight: 300,
    fontStyle: 'normal',
    textAlign: 'center',
    '& span': {
      fontSize: '0.5em',
    },
    '&$first': {
      fontFamily: 'Futura Hv BT',
      fontWeight: 'normal',
      fontSize: 36,
      fontStyle: 'italic',
      background: 'linear-gradient(55deg, rgba(247,247,53,1) 0%, rgba(195,247,53,1) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      WebkitTextStroke: '1px #FFFF65',
      '& span': {
        marginLeft: -4,
      },
    },
    '&$second': {
      fontFamily: 'Futura Hv BT',
      fontWeight: 'normal',
      fontSize: 36,
      fontStyle: 'italic',
      background: 'linear-gradient(55deg, rgba(198,198,198,1) 0%, rgba(109,157,234,1) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      WebkitTextStroke: '1px #C3D0E3',
    },
    '&$third': {
      fontFamily: 'Futura Hv BT',
      fontWeight: 'normal',
      fontSize: 36,
      fontStyle: 'italic',
      background: 'linear-gradient(55deg, rgba(255,182,65,1) 0%, rgba(227,111,60,1) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      WebkitTextStroke: '1px #FFC962',
    },
  },
  first: {},
  second: {},
  third: {},
  placementImage: {
    height: 40,
  },
  placementWrapper: {
    width: 55,
    marginRight: theme.spacing(1),
  },
}))
