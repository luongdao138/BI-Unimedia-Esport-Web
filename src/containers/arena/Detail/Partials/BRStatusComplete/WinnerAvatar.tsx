import { Box, BoxProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArenaAvatar, { ArenaAvatarProps } from '@containers/arena/Winners/ArenaAvatar'

const WinnerAvatar: React.FC<ArenaAvatarProps & BoxProps> = ({ src, user_code, name, ...rest }) => {
  const classes = useStyles()
  return (
    <Box className={classes.body} {...rest}>
      <div className={classes.winnerAvatarWrapper}>
        <ArenaAvatar src={src} name={name} user_code={user_code} win leaf nameWhite size="small" />
      </div>
    </Box>
  )
}

export default WinnerAvatar

const useStyles = makeStyles((theme) => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  winnerAvatarWrapper: {
    marginTop: theme.spacing(8),
    transform: 'translate(-0%, -0%)',
  },
}))
