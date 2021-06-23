import { Colors } from '@theme/colors'
import { makeStyles, Theme, Box, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ButtonPrimary from '@components/ButtonPrimary'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'

const Custom404Container: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()

  return (
    <Box className={classes.wrapper}>
      <Typography align="center" className={classes.text404}>
        {t('common:page404.title')}
      </Typography>
      <Typography align="center" variant="body1" className={classes.description}>
        {t('common:page404.description')}
      </Typography>
      <Box className={classes.btnWrapper}>
        <ButtonPrimary className={classes.btn} round onClick={() => router.push(ESRoutes.HOME)}>
          {t('common:page404.buttonText')}
        </ButtonPrimary>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
  },
  text404: {
    fontSize: 160,
    fontFamily: 'Futura Bold',
    color: Colors.white_opacity[30],
    paddingTop: 215,
    lineHeight: '160px',
    paddingBottom: theme.spacing(2),
  },
  description: {
    color: Colors.white_opacity[30],
  },
  btnWrapper: {
    textAlign: 'center',
    paddingTop: theme.spacing(10),
    paddingBottom: 218,
    width: 220,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  btn: {
    minWidth: '100%',
    maxWidth: '100%',
  },
  [theme.breakpoints.down('md')]: {
    text404: {
      fontSize: 130,
      paddingTop: 120,
      lineHeight: '130px',
    },
    btnWrapper: {
      paddingBottom: 186,
    },
  },
}))

export default Custom404Container
