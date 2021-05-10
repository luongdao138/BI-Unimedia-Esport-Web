import { makeStyles, Theme, Typography, Box, Grid, SvgIcon, ButtonBase, Link, Icon } from '@material-ui/core'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'
import { RecruitingTournament } from './elements/Tournaments'
import { useTranslation } from 'react-i18next'

const TopContainer: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  return (
    <>
      <div className="parallax">
        <div className="parallax-inner" />
        <Box className={classes.innerWrap}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box className={classes.parallaxContent}>
                <Typography variant="h2">{'”ゲーム”が広がる。仲間ができる。'}</Typography>
                <img className={classes.logo} src="/images/lp_exelab_logo.svg" />
                <ButtonPrimary
                  round
                  onClick={() => {
                    return null
                  }}
                >
                  {'exeLABをはじめる'}
                </ButtonPrimary>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Box className={classes.topContent}>
        <Box className={classes.innerWrap}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box className={classes.topContentWrap}>
                <Box className={classes.leftContent}>
                  <Box display="flex" alignItems="flex-end">
                    <SvgIcon className={classes.icon} viewBox="0 0 206 43.301">
                      <g id="アートワーク_29-2" data-name="アートワーク 29" transform="translate(0)">
                        <path
                          id="Path_6617"
                          data-name="Path 6617"
                          d="M66.556,0,55.837,15.333,45.047,0H36.671L51.649,21.3,36.6,42.8h8.376L55.837,27.329,66.627,42.8H75L59.954,21.3,74.932,0Z"
                          transform="translate(-10.619)"
                          fill="#fff"
                        />
                        <path
                          id="Path_6618"
                          data-name="Path 6618"
                          d="M105.689,16.476h7.1v8.66h-7.1ZM119.105,10.3H99.3V45.864h19.805V39.688H105.689V31.241h13.487V10.3Z"
                          transform="translate(-28.811 -2.988)"
                          fill="#fff"
                        />
                        <path
                          id="Path_6619"
                          data-name="Path 6619"
                          d="M6.389,16.476h7.1v8.66h-7.1ZM19.8,10.3H0V45.864H19.8V39.688H6.389V31.241H19.876V10.3Z"
                          transform="translate(0 -2.988)"
                          fill="#fff"
                        />
                        <path
                          id="Path_6620"
                          data-name="Path 6620"
                          d="M204.569,7.67h14.339V18.388H204.569ZM197.4.5V43.446h7.169V25.558h14.339V43.446h7.17V.5Z"
                          transform="translate(-57.275 -0.145)"
                          fill="#fff"
                        />
                        <path
                          id="Path_6621"
                          data-name="Path 6621"
                          d="M257,25.558h14.339V36.277H257ZM257,7.67h10.719V18.388H257ZM249.9.5V43.446h28.607V18.388h-3.549V.5Z"
                          transform="translate(-72.507 -0.145)"
                          fill="#fff"
                        />
                        <path
                          id="Path_6622"
                          data-name="Path 6622"
                          d="M145,.5V43.446h28.678v-7.17H152.17V.5Z"
                          transform="translate(-42.071 -0.145)"
                          fill="#fff"
                        />
                      </g>
                    </SvgIcon>
                    <Typography variant="h2" className={classes.iconText}>
                      {'は'}
                    </Typography>
                  </Box>
                  <Typography variant="h2" className={classes.topTitle}>
                    {'すべてのゲーマーとそのファンのための コミュニケーションサービスです。'}
                  </Typography>
                  <Typography className={classes.topDescription}>
                    {`カジュアルに仲間を募集する、コミュニティに参加する、大会で腕試しなど、自身のスタイルに合わせた使い方が可能です。
今後も拡張されていく様々な機能を通して、ゲーマー同士やファンとの交流を広げていきます。`}
                  </Typography>
                  <Typography className={classes.topDescriptionBottom}>{'アプリ版のダウンロードはこちら'}</Typography>
                  <Box display="flex">
                    <ButtonBase>
                      <img className={classes.google_app_stores} src="/images/appstore.png" />
                    </ButtonBase>
                    <Box marginRight={2} />
                    <ButtonBase>
                      <img className={classes.google_app_stores} src="/images/googleplay.png" />
                    </ButtonBase>
                  </Box>
                </Box>
                <Box className={classes.rightContent}>
                  <img className={classes.rightImage} src="/images/lp_laptop.png" />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box className={classes.bottomContent}>
        <Box className={classes.innerWrap}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h2" className={classes.bottomTitle} align="center">
                {'募集中の大会'}
              </Typography>
            </Grid>
            <Box className={classes.bottomInnerContent}>
              <RecruitingTournament />
              <RecruitingTournament />
              <RecruitingTournament />
              <RecruitingTournament />
              <RecruitingTournament />
              <RecruitingTournament />
              <RecruitingTournament />
              <RecruitingTournament />
              <RecruitingTournament />
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
                  return null
                }}
              >
                {'exeLABをはじめる'}
              </ButtonPrimary>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  innerWrap: {
    maxWidth: 1080,
    margin: '0 auto',
    width: '100%',
  },
  parallaxContent: {
    marginTop: 212,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    zIndex: 1,
  },
  logo: {
    marginTop: theme.spacing(6.5),
    marginBottom: theme.spacing(10),
  },
  topContent: {
    borderTop: '1px solid',
    borderTopColor: Colors.white_opacity[30],
    borderBottom: '1px solid',
    borderBottomColor: Colors.white_opacity[30],
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(20),
    background: Colors.black_opacity[70],
    backdropFilter: 'blur(1px)',
    marginBottom: 0,
    marginTop: -310,
    '&::after': {
      margin: '0 auto',
      background: "url('/images/lp_pattern.png') center bottom repeat-x transparent",
      width: '100%',
      zIndex: -1,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      content: '""',
      height: '100%',
      display: 'block',
    },
  },
  topContentWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  leftContent: {},
  rightContent: {},
  icon: {
    width: 206,
    height: 43,
    marginRight: 13,
    marginBottom: theme.spacing(1),
  },
  iconText: {
    fontSize: 30,
  },
  topTitle: {
    fontSize: 30,
    marginBottom: theme.spacing(3),
  },
  topDescription: {
    whiteSpace: 'pre-line',
    marginBottom: theme.spacing(7),
  },
  topDescriptionBottom: {
    marginBottom: theme.spacing(2),
  },
  google_app_stores: {
    width: 135,
    height: 40,
  },
  rightImage: {
    width: 479,
    height: 365,
  },
  bottomContent: {
    marginTop: 163,
  },
  bottomTitle: {
    fontSize: 30,
    marginBottom: theme.spacing(6),
  },
  bottomInnerContent: {
    marginBottom: 100,
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: '33%',
      flexGrow: 1,
    },
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
    marginBottom: theme.spacing(11),
  },
}))

export default TopContainer
