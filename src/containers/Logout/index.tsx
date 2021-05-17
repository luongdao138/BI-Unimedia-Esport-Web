import { Colors } from '@theme/colors'
import { makeStyles, Theme, Box, Typography } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { useTranslation } from 'react-i18next'
import ButtonPrimary from '@components/ButtonPrimary'
import useLogout from './useLogout'
import ESLoader from '@components/FullScreenLoader'

type Props = {
  handleClose: () => void
}

const LogoutContainer: React.FC<Props> = ({ handleClose }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { handleLogout, meta } = useLogout(handleClose)

  return (
    <Box pt={7.5} pb={9} className={classes.topContainer}>
      <Box py={2}>
        <IconButton className={classes.iconButtonBg} onClick={handleClose}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
      </Box>
      <Box px={5} pt={12} display="flex" flexDirection="column" alignItems="center" textAlign="center" className={classes.container}>
        <Typography className={classes.title}>{t('common:logout_screen.title')}</Typography>
        <Box pt={4}>
          <Typography className={classes.desc}>{t('common:logout_screen.desc')}</Typography>
        </Box>

        <Box
          pt={148 / 8}
          width="100%"
          justifyContent="space-evenly"
          display="flex"
          alignItems="center"
          flexDirection="column"
          className={classes.buttonContainer}
        >
          <Box width={220} pb={2} className={classes.button}>
            <ButtonPrimary fullWidth gradient={false} onClick={handleClose}>
              {t('common:logout_screen.cancel')}
            </ButtonPrimary>
          </Box>
          <Box width={220} pb={2} className={classes.button}>
            <ButtonPrimary fullWidth onClick={handleLogout}>
              {t('common:logout_screen.ok')}
            </ButtonPrimary>
          </Box>
        </Box>
      </Box>
      {meta.pending && <ESLoader open={meta.pending} />}
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
  title: {
    fontSize: 24,
    color: Colors.white,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 18,
    color: Colors.white,
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
    buttonContainer: {
      flexDirection: 'column-reverse',
    },
    title: {
      fontSize: 20,
    },
    desc: {
      fontSize: 14,
    },
    button: {
      width: 280,
    },
  },
}))

export default LogoutContainer
