import { ButtonBase, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

interface ResultListItemProps {
  position: number
  avatar: JSX.Element
  onClickAvatar: () => void
  name: string
  nameSecondary?: string | undefined
}

export default function ResultListItem({ position, avatar, onClickAvatar, name, nameSecondary }: ResultListItemProps) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.placementWrapper}>
          <p
            className={`${classes.text} ${position === 1 && classes.first} ${position === 2 && classes.second} ${
              position === 3 && classes.third
            }`}
          >
            {position}
            {position === 1 && <span>st</span>}
            {position === 2 && <span>nd</span>}
            {position === 3 && <span>rd</span>}
          </p>
        </div>
        <ButtonBase className={classes.itemAvatar} onClick={onClickAvatar}>
          {avatar}
        </ButtonBase>
        <div className={classes.nameWrapper}>
          <Typography className={classes.breakWord} variant="h3" component="p">
            {name}
          </Typography>
          {nameSecondary && (
            <Typography variant="body2" className={`${classes.user_code} ${classes.breakWord}`}>
              {nameSecondary}
            </Typography>
          )}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  content: {
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
  placementWrapper: {
    width: 55,
    marginRight: theme.spacing(1),
  },
  itemAvatar: {
    width: 40,
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
  nameWrapper: {
    color: Colors.white,
    paddingLeft: theme.spacing(2),
    flex: 1,
  },
  breakWord: {
    wordBreak: 'break-word',
  },
  user_code: {
    color: Colors.white_opacity['70'],
  },
}))
