import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@components/Avatar'
import { Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'

interface ArenaAvatarProps {
  src: null | string
  leaf?: boolean
  name?: string
  user_code?: string
  nameClass?: string
  nameWhite?: boolean
  win?: boolean
  size?: 'small' | 'medium' | 'large'
  alt_name?: string
}

const ArenaAvatar: React.FC<ArenaAvatarProps> = ({ src, leaf, name, user_code, nameWhite, win, size, alt_name }) => {
  const classes = useStyles({ leaf, win, size })
  const { t } = useTranslation(['common'])
  const _size = size === 'large' ? 120 : size === 'small' ? 80 : 100

  return (
    <div className={classes.root}>
      {win && leaf && (
        <Typography className={classes.winText}>
          1<span>st</span>
        </Typography>
      )}
      {win && !leaf && <Typography className={classes.winText}>{t('common:arena.win')}</Typography>}
      <div className={`${classes.avatarWrapper} ${win && classes.win} ${win && classes.winSvg}`}>
        <Avatar src={src} size={_size} alt={alt_name ? alt_name : name} />
      </div>
      {(name || user_code) && (
        <div className={classes.nameWrapper}>
          {name && (
            <Typography className={`${classes.name} ${nameWhite && classes.nameWhite}`} noWrap>
              {name}
            </Typography>
          )}
          {user_code && <Typography noWrap>{user_code}</Typography>}
        </div>
      )}
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
  winSvg: {
    '&:after': {
      background: 'url(/images/leaf.svg)',
    },
  },
  nameWrapper: {
    position: 'absolute',
    textAlign: 'center',
    left: '50%',
    paddingTop: theme.spacing(1),
    transform: 'translate(-50%,0%)',
    bottom: 0,
    width: 'max-content',
    maxWidth: theme.spacing(30),
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
    letterSpacing: '0.0075rem',
    top: -36,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '& span': {
      fontSize: '0.8em',
      marginLeft: -4,
    },
  },
}))
