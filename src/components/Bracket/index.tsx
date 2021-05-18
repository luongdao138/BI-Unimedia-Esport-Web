import { ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

const useStyles = makeStyles((theme) => ({
  bracket: {
    display: 'flex',
  },
  round: {
    display: 'flex',
    // flexGrow: 1,
    flexDirection: 'column',
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
  },
  matchContent: {
    position: 'relative',
    backgroundColor: Colors.black_opacity['30'],
    borderRadius: theme.spacing(0.5),
    border: '1px solid rgb(76,76,76)',
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
    borderBottom: '1px solid rgb(76,76,76)',
    height: 18,
    backgroundColor: Colors.black,
    width: '100%',
    overflow: 'hidden',
  },
}))

const Container: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.bracket}>{children}</div>
}

const Round: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.round}>{children}</div>
}

const Match: React.FC<{ children?: ReactNode; headerText?: string }> = ({ children, headerText }) => {
  const classes = useStyles()
  return (
    <div className={classes.match}>
      <div className={classes.matchContent}>
        <div className={classes.matchHeader}>{headerText}</div>
        {children}
      </div>
    </div>
  )
}

export default { Container, Round, Match }
