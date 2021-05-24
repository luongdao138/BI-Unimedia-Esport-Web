import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@components/Avatar'
import { Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'

interface ArenaAvatarProps {
  src: null | string
  leaf?: boolean
  name: string
  user_code?: string
  nameClass?: string
  nameWhite?: boolean
  win?: boolean
}

const ArenaAvatar: React.FC<ArenaAvatarProps> = ({ src, leaf, name, user_code, nameWhite, win }) => {
  const classes = useStyles({ leaf, win })
  return (
    <div className={classes.root}>
      {win && leaf && (
        <Typography className={classes.winText}>
          1<span>st</span>
        </Typography>
      )}
      {win && !leaf && <Typography className={classes.winText}>WIN</Typography>}
      <div className={`${classes.avatarWrapper} ${win && classes.win}`}>
        <Avatar src={src} size={120} />
      </div>
      <div className={classes.nameWrapper}>
        <Typography className={`${classes.name} ${nameWhite && classes.nameWhite}`}>{name}</Typography>
        {user_code && <Typography>{user_code}</Typography>}
      </div>
    </div>
  )
}

ArenaAvatar.defaultProps = {
  leaf: false,
  nameWhite: false,
  win: false,
}

export default ArenaAvatar

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatarWrapper: (props: { win?: boolean; leaf?: boolean }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    background: props.win && 'url(/images/winnerAvatar.svg)',
    backgroundRepeat: 'no-repeat',
  }),
  win: (props: { win?: boolean; leaf?: boolean }) => ({
    '&:after': {
      content: "''",
      position: 'absolute',
      background: 'url(/images/leaf.svg)',
      backgroundRepeat: 'no-repeat',
      height: 95,
      width: 220,
      top: 45,
      left: -47,
      display: props.leaf ? 'block' : 'none',
    },
  }),
  nameWrapper: {
    textAlign: 'center',
    paddingTop: theme.spacing(1),
  },
  name: {
    fontSize: 16,
    fontWeight: 500,
    color: Colors.grey['300'],
  },
  nameWhite: {
    color: Colors.white,
  },
  winText: {
    position: 'absolute',
    fontFamily: 'Futura Hv BT',
    fontWeight: 'normal',
    fontSize: 40,
    fontStyle: 'italic',
    background: 'linear-gradient(55deg, rgba(247,247,53,1) 0%, rgba(195,247,53,1) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    WebkitTextStroke: '1px #FFFF65',
    top: -36,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '& span': {
      fontSize: 22,
      marginLeft: -4,
    },
  },
}))
