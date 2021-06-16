import { makeStyles, Typography, Box, Theme } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ButtonPrimary from '@components/ButtonPrimary'
import { ESRoutes } from '@constants/route.constants'
import useReturnHref from '@utils/hooks/useReturnHref'

const IntroContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { handleReturn, navigateScreen } = useReturnHref()

  return (
    <Box pt={7.5} className={classes.topContainer}>
      <Box py={2} display="flex" flexDirection="row" alignItems="center">
        <IconButton className={classes.iconButtonBg} onClick={handleReturn}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
      </Box>

      <Box pt={60 / 8} display="flex" justifyContent="center">
        <img src="/images/lp_exelab_logo.svg" width="166" height="212" />
      </Box>

      <Box pt={8} pb={9} textAlign="center">
        <Typography className={classes.middleText}>{t('common:login.intro_hint1')}</Typography>
        <Typography className={classes.middleText}>{t('common:login.intro_hint2')}</Typography>
      </Box>

      <Box maxWidth={280} className={classes.buttonContainer}>
        <ButtonPrimary type="submit" round fullWidth onClick={() => navigateScreen(ESRoutes.LOGIN)}>
          {t('common:login.submit')}
        </ButtonPrimary>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
  },
  middleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  [theme.breakpoints.down('sm')]: {
    middleText: {
      fontSize: 16,
    },
    topContainer: {
      paddingTop: 0,
    },
  },
}))

export default IntroContainer
