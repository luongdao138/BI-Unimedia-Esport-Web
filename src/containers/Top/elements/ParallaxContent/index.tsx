import { Typography, Box, Grid, makeStyles, Theme } from '@material-ui/core'
import { useRouter } from 'next/router'
import ButtonPrimary from '@components/ButtonPrimary'
import { useTranslation } from 'react-i18next'
import { ESRoutes } from '@constants/route.constants'
export const ParallaxContent: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const router = useRouter()

  return (
    <>
      <div className="parallax">
        <div className="parallax-inner" />
      </div>
      <Box className={classes.innerWrap}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box className={classes.parallaxContent}>
              <Typography variant="h2" className={classes.parallaxTitle}>
                {t('common:top.title')}
              </Typography>
              <img className={classes.logo} src="/images/lp_exelab_logo.svg" />
              <ButtonPrimary
                round
                onClick={() => {
                  router.push(ESRoutes.ARENA)
                }}
              >
                {t('common:top.start_exelab')}
              </ButtonPrimary>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  innerWrap: {
    maxWidth: 1080,
    padding: theme.spacing(3),
    margin: '0 auto',
    width: '100%',
    height: 740,
  },
  parallaxContent: {
    marginTop: 212,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    position: 'relative',
    marginBottom: theme.spacing(10),
  },
  logo: {
    marginTop: theme.spacing(6.5),
    marginBottom: theme.spacing(10),
  },
  [theme.breakpoints.down('sm')]: {
    parallaxTitle: {
      fontSize: 14,
    },
    logo: {
      width: 134,
      height: 'auto',
    },
  },
}))
