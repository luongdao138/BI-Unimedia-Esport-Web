import { createContext, MouseEvent, ReactNode, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import Avatar from '../Avatar'
import { Typography } from '@material-ui/core'

interface BracketContainerProps {
  children?: ReactNode
  activeRound?: number
}

const BracketContext = createContext(0)

const Container: React.FC<BracketContainerProps> = ({ children, activeRound }) => {
  const classes = useStyles()
  return (
    <BracketContext.Provider value={activeRound}>
      <div className={classes.bracket}>{children}</div>
    </BracketContext.Provider>
  )
}
Container.defaultProps = {
  activeRound: 0,
}

interface BracketRoundProps {
  children?: ReactNode
  roundNo: number
}
const Round: React.FC<BracketRoundProps> = ({ children, roundNo }) => {
  const classes = useStyles()
  const activeRound = useContext(BracketContext)
  const className = `${classes.round} ${roundNo <= activeRound && classes.active} ${roundNo === activeRound && classes.lastActive}`
  return <div className={className}>{children}</div>
}

type Participant = {
  label: string
  avatar: string | null
  score: number | null
}

interface MatchProps {
  editable: boolean
  headerText?: string
  winner: 'home' | 'guest' | null
  participant1: Participant | null
  participant2: Participant | null
  onClick?: (e: MouseEvent) => void
}

const Match: React.FC<MatchProps> = ({ headerText, participant1, participant2, editable, winner, ...rest }) => {
  const classes = useStyles()
  return (
    <div className={classes.match}>
      <div className={`${classes.matchContent} ${editable && classes.editable}`} {...rest}>
        <div className={classes.matchHeader}>{headerText}</div>
        <div className={classes.participantWrapper}>
          <div className={classes.participant}>
            {participant1 ? (
              <>
                <Avatar className={classes.avatar} alt={participant1.label} src={participant1.avatar} />
                <Typography className={classes.label} noWrap={true}>
                  {participant1.label}
                </Typography>
              </>
            ) : (
              <>
                <Avatar className={classes.avatar} alt={null} />
                <Typography className={classes.noLabel}>設定してください</Typography>
              </>
            )}
          </div>
          <div className={classes.score}>-</div>
          {winner !== null && winner === 'guest' && <div className={classes.backdrop} />}
        </div>
        <div className={classes.participantWrapper}>
          <div className={classes.participant}>
            {participant2 ? (
              <>
                <Avatar className={classes.avatar} alt={participant2.label} src={participant2.avatar} />
                <Typography className={classes.label} noWrap={true}>
                  {participant2.label}
                </Typography>
              </>
            ) : (
              <>
                <Avatar className={classes.avatar} alt={null} />
                <Typography className={classes.noLabel}>設定してください</Typography>
              </>
            )}
          </div>
          <div className={classes.score}>-</div>
          {winner !== null && winner === 'home' && <div className={classes.backdrop} />}
        </div>
      </div>
    </div>
  )
}

Match.defaultProps = {
  editable: false,
}

export default { Container, Round, Match }

const useStyles = makeStyles((theme) => ({
  bracket: {
    display: 'flex',
  },
  round: {
    display: 'flex',
    // flexGrow: 1,
    flexDirection: 'column',
    opacity: 0.4,
    '&:first-child $match': {
      marginLeft: 8,
    },
    '&:first-child $match::before': {
      display: 'none',
    },
    '&:first-child $matchContent::before': {
      display: 'none',
    },
    '&:last-child $match::after': {
      display: 'none',
    },
    '&$active $editable': {
      cursor: 'pointer',
    },
  },
  editable: {},
  active: {
    opacity: 1,
    '& $matchContent': {
      left: 0,
      transition: '0.2s left',
    },
    '& $matchContent:hover': {
      left: 4,
    },
  },
  lastActive: {
    '& $match:nth-child(odd)::after': {
      opacity: 0.4,
    },
    '& $match:nth-child(even)::after': {
      opacity: 0.4,
    },
  },

  match: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0px 40px',
    padding: '24px 0',
    flexGrow: 1,
    position: 'relative',
    '&::before': {
      content: "''",
      display: 'block',
      height: 2,
      borderLeft: '1px solid #4c4c4c',
      position: 'absolute',
      left: -39,
      top: '50%',
      marginTop: -1,
      marginLeft: -2,
    },
    '&:nth-child(odd)::after': {
      content: "''",
      display: 'block',
      border: '1px solid transparent',
      borderTopColor: '#4c4c4c',
      borderRightColor: '#4c4c4c',
      height: '50%',
      position: 'absolute',
      right: -40,
      width: 41,
      top: '50%',
    },
    '&:nth-child(even)::after': {
      content: "''",
      display: 'block',
      border: '1px solid transparent',
      borderBottomColor: '#4c4c4c',
      borderRightColor: '#4c4c4c',
      height: '50%',
      position: 'absolute',
      right: -40,
      width: 41,
      bottom: '50%',
    },
    '&:nth-child(odd) $matchContent': {
      marginTop: -17,
    },
    '&:nth-child(even) $matchContent': {
      marginTop: -19,
    },
    '& $matchContent': {
      marginTop: -19,
      '& $backdrop': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#00000070',
        top: 0,
        left: 0,
        borderRadius: 3,
      },
    },
  },
  backdrop: {},

  matchContent: {
    position: 'relative',
    backgroundColor: Colors.black_opacity['30'],
    borderRadius: theme.spacing(0.5),
    border: '1px solid #4c4c4c',
    width: 232,
    '&::before': {
      content: "''",
      display: 'block',
      width: 41,
      borderBottom: '1px solid #4c4c4c',
      marginLeft: -1,
      position: 'absolute',
      top: '60%',
      left: -40,
    },
  },
  matchHeader: {
    paddingLeft: theme.spacing(1.5),
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    height: 18,
    backgroundColor: Colors.black,
    width: '100%',
    overflow: 'hidden',
    lineHeight: 1.7,
  },
  participantWrapper: {
    display: 'flex',
    height: 42,
    paddingLeft: 12,
    paddingRight: 32,
    paddingTop: 8,
    paddingBottom: 8,
    position: 'relative',
    borderTop: '1px solid #4c4c4c',

    color: '#FFFFFF',
  },
  participant: {
    display: 'flex',
    alignItems: 'center',
  },
  score: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    color: '#FFFFFF70',
    backgroundColor: '#000000',
    right: 8,
    bottom: 4,
    minWidth: 20,
    height: 34,
    fontSize: 20,
    paddingLeft: 4,
    paddingRight: 4,
  },
  avatar: {
    height: 26,
    width: 26,
    marginRight: 12,
    fontSize: 16,
  },
  label: {
    width: 150,
    textAlign: 'start',
  },
  noLabel: {
    color: '#FFFFFF30',
  },
}))
