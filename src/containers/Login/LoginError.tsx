import { Box, makeStyles, Typography } from '@material-ui/core'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'

const LoginError: React.FC = () => {
  const classes = useStyles()

  return (
    <Box pb={8}>
      <Box pb={20 / 8} textAlign="center">
        <Typography color="secondary">{i18n.t('common:login.error.title')}</Typography>
      </Box>
      <Box pb={1}>
        <Typography className={classes.detail}>{i18n.t('common:login.error.detail')}</Typography>
      </Box>
      <Typography className={classes.hint} variant="caption">
        {i18n.t('common:login.error.hint')}
      </Typography>
    </Box>
  )
}

const useStyles = makeStyles({
  detail: {
    whiteSpace: 'pre-line',
    color: Colors.white_opacity[70],
  },
  hint: {
    color: Colors.white_opacity[30],
  },
})

export default LoginError
