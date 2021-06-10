import { useEffect } from 'react'
import { Typography, Box, Grid, makeStyles, Theme, Link, Icon } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import { useTranslation } from 'react-i18next'
import TournamentCardRecruiting from '@components/TournamentCard'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useTournamentData from './useTournamentData'
import ESLoader from '@components/FullScreenLoader'

export const BottomContent: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const { recruitingTournaments, getRecruitingTournaments, meta } = useTournamentData()
  useEffect(() => {
    getRecruitingTournaments()
  }, [])

  return (
    <Box className={classes.bottomContent}>
      <Box className={classes.innerWrap}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h2" className={classes.bottomTitle} align="center">
              {t('common:top.recruiting_tournament')}
            </Typography>
          </Grid>
          {recruitingTournaments.length > 0 ? (
            <Box className={classes.bottomInnerContent}>
              <Grid container spacing={0}>
                {recruitingTournaments.map((tournament, i) => (
                  <Grid key={i} item xs={6} sm={6} md={4} xl={4}>
                    <TournamentCardRecruiting tournament={tournament} />
                  </Grid>
                ))}
              </Grid>
              <Box slot="container-end" display="flex" justifyContent="flex-end">
                <Link href={ESRoutes.ARENA} className={classes.moreLink}>
                  <Typography>
                    {t('common:common.see_more')}
                    <Icon classes={{ root: classes.moreIcon }} className="fas fa-chevron-right" fontSize="small" />
                  </Typography>
                </Link>
              </Box>
            </Box>
          ) : (
            meta.loaded && (
              <Box width="100%" className={classes.noRecruitingTournamentText}>
                <Typography align="center">{t('common:top.no_recruiting_tournament')}</Typography>
              </Box>
            )
          )}
          {meta.pending && <ESLoader open={meta.pending} />}
          <Grid item xs={12} className={classes.button}>
            <ButtonPrimary round onClick={() => router.push(ESRoutes.ARENA)}>
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
  noRecruitingTournamentText: {
    marginBottom: 317,
  },
  [theme.breakpoints.down('sm')]: {
    bottomContent: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(6),
    },
    noRecruitingTournamentText: {
      marginBottom: 97,
    },
  },
}))
