import { Typography, Box, Grid, makeStyles, Theme, Link, Icon } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import { useTranslation } from 'react-i18next'
import { RecruitingTournament } from './../Tournaments'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'

export const BottomContent: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const router = useRouter()

  return (
    <Box className={classes.bottomContent}>
      <Box className={classes.innerWrap}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h2" className={classes.bottomTitle} align="center">
              {t('common:top.recruiting_tournament')}
            </Typography>
          </Grid>
          <Box className={classes.bottomInnerContent}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={6} md={4} xl={4}>
                <RecruitingTournament />
              </Grid>
              <Grid item xs={12} sm={6} md={4} xl={4}>
                <RecruitingTournament />
              </Grid>
              <Grid item xs={12} sm={6} md={4} xl={4}>
                <RecruitingTournament />
              </Grid>
              <Grid item xs={12} sm={6} md={4} xl={4}>
                <RecruitingTournament />
              </Grid>
              <Grid item xs={12} sm={6} md={4} xl={4}>
                <RecruitingTournament />
              </Grid>
              <Grid item xs={12} sm={6} md={4} xl={4}>
                <RecruitingTournament />
              </Grid>
              <Grid item xs={12} sm={6} md={4} xl={4}>
                <RecruitingTournament />
              </Grid>
              <Grid item xs={12} sm={6} md={4} xl={4}>
                <RecruitingTournament />
              </Grid>
              <Grid item xs={12} sm={6} md={4} xl={4}>
                <RecruitingTournament />
              </Grid>
            </Grid>
            <Box slot="container-end" display="flex" justifyContent="flex-end">
              <Link href={'#'} className={classes.moreLink}>
                <Typography>
                  {t('common:common.see_more')}
                  <Icon classes={{ root: classes.moreIcon }} className="fas fa-chevron-right" fontSize="small" />
                </Typography>
              </Link>
            </Box>
          </Box>
          <Grid item xs={12} className={classes.button}>
            <ButtonPrimary
              round
              onClick={() => {
                router.push('/home')
              }}
            >
              {t('common:top.start_exelab')}
            </ButtonPrimary>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  innerWrap: {
    maxWidth: 1080,
    padding: theme.spacing(3),
    margin: '0 auto',
    width: '100%',
  },
  bottomContent: {
    paddingTop: theme.spacing(20),
    background: Colors.grey[10],
    position: 'relative',
    paddingBottom: theme.spacing(11),
  },
  bottomTitle: {
    fontSize: 30,
    marginBottom: theme.spacing(6),
  },
  bottomInnerContent: {
    marginBottom: 100,
    margin: '0 auto',
    maxWidth: 755,
  },
  moreLink: {
    marginTop: theme.spacing(1),
    color: Colors.white_opacity[70],
  },
  moreIcon: {
    marginLeft: theme.spacing(0.5),
  },
  button: {
    textAlign: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    bottomContent: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(6),
    },
  },
}))
