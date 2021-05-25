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
  size?: 'small' | 'large'
}

const ArenaAvatar: React.FC<ArenaAvatarProps> = ({ src, leaf, name, user_code, nameWhite, win, size }) => {
  const classes = useStyles({ leaf, win, size })
  return (
    <div className={classes.root}>
      {win && leaf && (
        <Typography className={classes.winText}>
          1<span>st</span>
        </Typography>
      )}
      {win && !leaf && <Typography className={classes.winText}>WIN</Typography>}
      <div className={`${classes.avatarWrapper} ${win && classes.win}`}>
        <Avatar src={src} size={size === 'large' ? 120 : 80} alt={name} />
      </div>
      <div className={classes.nameWrapper}>
        <Typography className={`${classes.name} ${nameWhite && classes.nameWhite}`}>{'aosjdoasjdoajsdojad'}</Typography>
        {user_code && <Typography>{user_code}</Typography>}
      </div>
    </div>
  )
}

ArenaAvatar.defaultProps = {
  leaf: false,
  nameWhite: false,
  win: false,
  size: 'large',
}

export default ArenaAvatar

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 56,
  },
  avatarWrapper: (props: { win?: boolean; leaf?: boolean; size?: string }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: props.size === 'large' ? 6 : 4,
    background: props.win && (props.size === 'large' ? 'url(/images/winnerAvatar.svg)' : 'url(/images/winnerAvatarSmall.svg)'),
    backgroundRepeat: 'no-repeat',
  }),
  win: (props: { win?: boolean; leaf?: boolean; size?: string }) => {
    const size = { w: 162, h: 72 }
    const largeSize = { w: size.w * 1.5, h: size.h * 1.5 }

    return {
      '&:after': {
        content: "''",
        position: 'absolute',
        background: 'url(/images/leaf.svg)',
        backgroundRepeat: 'no-repeat',
        height: props.size === 'large' ? largeSize.h : size.h,
        width: props.size === 'large' ? largeSize.w : size.w,
        top: props.size === 'large' ? 40 : 28,
        display: props.leaf ? 'block' : 'none',
        backgroundSize: props.size === 'large' ? `${largeSize.w}px ${largeSize.h}px` : `${size.w}px ${size.h}px`,
        left: '50%',
        transform: 'translate(-50%,0%)',
      },
    }
  },
  nameWrapper: {
    position: 'absolute',
    textAlign: 'center',
    left: '50%',
    paddingTop: theme.spacing(1),
    transform: 'translate(-50%,0%)',
    bottom: 0,
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
      fontSize: '0.8em',
      marginLeft: -4,
    },
  },
}))
