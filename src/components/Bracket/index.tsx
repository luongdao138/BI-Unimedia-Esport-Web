import { createContext, MouseEvent, ReactNode, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import Avatar from '../Avatar'
import { Typography } from '@material-ui/core'
import { MatchItemType } from '@services/arena.service'
import i18n from '@locales/i18n'

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
  winner: MatchItemType | null
  participant1: Participant | null
  participant2: Participant | null
  score1?: number | null
  score2?: number | null
  highlightLabel?: MatchItemType
  onClick?: (e: MouseEvent) => void
  emptyLabel?: string
}

const Match: React.FC<MatchProps> = ({
  headerText,
  participant1,
  participant2,
  score1,
  score2,
  editable,
  winner,
  highlightLabel,
  emptyLabel,
  ...rest
}) => {
  const classes = useStyles()
  return (
    <div className={classes.match}>
      <div className={`${classes.matchContent} ${editable && classes.editable}`} {...rest}>
        <div className={classes.matchHeader}>{headerText}</div>
        <div className={classes.participantWrapper}>
          <div className={classes.participant}>
            {participant1 ? (
              <>
                <Avatar
                  className={`${classes.avatar} ${winner === 'home' ? classes.avatarWinner : ''}`}
                  alt={participant1.label}
                  src={participant1.avatar}
                />
                <Typography className={`${classes.label} ${highlightLabel === 'home' ? classes.labelHighlight : ''}`} noWrap={true}>
                  {participant1.label}
                </Typography>
              </>
            ) : (
              <>
                <Avatar className={classes.avatar} alt={null} />
                <Typography className={classes.noLabel}>{emptyLabel ? emptyLabel : i18n.t('common:common.not_sure')}</Typography>
              </>
            )}
          </div>
          <div className={`${classes.score} ${winner === 'home' ? classes.scoreWinner : ''}`}>
            {score1 == null || score1 == undefined ? '0' : score1}
          </div>
          {winner !== null && winner === 'guest' && <div className={classes.backdrop} />}
        </div>
        <div className={classes.participantDivider} />
        <div className={classes.participantWrapper}>
          <div className={classes.participant}>
            {participant2 ? (
              <>
                <Avatar
                  className={`${classes.avatar} ${winner === 'guest' ? classes.avatarWinner : ''}`}
                  alt={participant2.label}
                  src={participant2.avatar}
                />
                <Typography className={`${classes.label} ${highlightLabel === 'guest' ? classes.labelHighlight : ''}`} noWrap={true}>
                  {participant2.label}
                </Typography>
              </>
            ) : (
              <>
                <Avatar className={classes.avatar} alt={null} />
                <Typography className={classes.noLabel}>{emptyLabel ? emptyLabel : i18n.t('common:common.not_sure')}</Typography>
              </>
            )}
          </div>
          <div className={`${classes.score} ${winner === 'guest' ? classes.scoreWinner : ''}`}>
            {score2 == null || score2 == undefined ? '0' : score2}
          </div>
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
    '& $round:not(first-child)>h3': {
      paddingLeft: 48,
    },
    '& $round:first-child>h3': {
      paddingLeft: 8,
    },
    '& $round h3': {
      position: 'absolute',
      height: 40,
      top: 0,
      left: 0,
    },
  },
  round: {
    display: 'flex',
    // flexGrow: 1,
    flexDirection: 'column',
    paddingTop: 48,
    position: 'relative',
    '& $match': {
      opacity: 0.4,
    },
    '&:first-child $match': {
      marginLeft: 0,
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
    '& $match': {
      opacity: 1,
    },
    '& $matchContent$editable': {
      left: 0,
      transition: '0.2s left',
    },
    '& $matchContent$editable:hover': {
      left: 4,
      transition: '0.2s left',
    },
    '& $matchContent$editable::before': {
      left: -40,
      width: 41,
      transition: '0.2s left, 0.2s width',
    },
    '& $matchContent$editable:hover::before': {
      left: -44,
      width: 44,
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
      height: 4,
      borderLeft: '1px solid #4c4c4c',
      position: 'absolute',
      left: -39,
      top: '50%',
      marginTop: -1,
      marginLeft: -2,
    },
    '&:nth-child(even)::after': {
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
    '&:nth-child(odd)::after': {
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
    '& $matchContent': {
      '& $backdrop': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#00000070',
        top: 0,
        left: 0,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
      },
    },
  },
  backdrop: {},

  matchContent: {
    position: 'relative',
    backgroundColor: Colors.black_opacity['30'],
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    border: '1px solid #4c4c4c',
    // borderTop: 'none',
    width: 232,
    '&::before': {
      content: "''",
      display: 'block',
      width: 41,
      borderBottom: '1px solid #4c4c4c',
      marginLeft: -1,
      position: 'absolute',
      top: '50%',
      left: -40,
    },
  },
  matchHeader: {
    position: 'absolute',
    top: -19,
    left: -1,
    paddingLeft: theme.spacing(1.5),
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderTop: '1px solid #4c4c4c',
    borderLeft: '1px solid #4c4c4c',
    borderRight: '1px solid #4c4c4c',
    height: 18,
    backgroundColor: Colors.black,
    width: 232,
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
    // borderTop: '1px solid #4c4c4c',
    color: '#FFFFFF',
  },
  participantDivider: { height: 1, background: '#4c4c4c' },
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
  scoreWinner: {
    color: Colors.yellow,
  },
  avatar: {
    height: 26,
    width: 26,
    marginRight: 12,
    fontSize: '16px !important',
  },
  avatarWinner: {
    border: `2px solid ${Colors.yellow}`,
  },
  label: {
    width: 150,
    textAlign: 'start',
  },
  labelHighlight: {
    color: Colors.yellow,
  },
  noLabel: {
    color: '#FFFFFF30',
  },
}))
