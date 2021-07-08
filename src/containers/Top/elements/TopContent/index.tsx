import { Typography, Box, Grid, makeStyles, Theme, ButtonBase, SvgIcon } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'

export const TopContent: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  return (
    <Box className={classes.topContent}>
      <Box className={classes.innerWrap}>
        <Grid container spacing={3}>
          <Grid item lg={7} md={7} sm={12} xs={12}>
            <Box className={classes.leftContent}>
              <Box display="flex" alignItems="flex-end">
                <SvgIcon className={classes.icon} viewBox="0 0 206 43.301">
                  <g data-name="" transform="translate(0)">
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
                  {t('common:top.is')}
                </Typography>
              </Box>
              <Typography variant="h2" className={classes.topTitle}>
                {t('common:top.top_title')}
              </Typography>
              <Typography className={classes.topDescription}>{t('common:top.top_description')}</Typography>
              <Typography className={classes.topDescriptionBottom}>{t('common:top.download_app_version')}</Typography>
              <Box className={classes.buttonWrap}>
                <ButtonBase href="https://apps.apple.com/jp/app/exelab/id1525346211" target="_blank">
                  <img className={classes.google_app_stores} src="/images/appstore.png" />
                </ButtonBase>
                <Box className={classes.buttonSeperator} />
                <ButtonBase href="https://play.google.com/store/apps/details?id=jp.co.ntt.esportspf.exelab" target="_blank">
                  <img className={classes.google_app_stores} src="/images/googleplay.png" />
                </ButtonBase>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <Box className={classes.rightContent}>
              <img className={classes.rightImage} src="/images/lp_laptop.png" />
            </Box>
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
  leftContent: {
    maxWidth: 566,
  },
  rightContent: {},
  topContent: {
    borderTop: '1px solid',
    borderTopColor: Colors.white_opacity[15],
    borderBottom: '1px solid',
    borderBottomColor: Colors.white_opacity[15],
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(20),
    background: Colors.black_opacity[70],
    backdropFilter: 'blur(1px)',
    marginBottom: 0,
    position: 'relative',
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
    whiteSpace: 'pre-line',
    marginBottom: theme.spacing(3),
  },
  topDescription: {
    whiteSpace: 'pre-line',
    marginBottom: theme.spacing(7),
  },
  topDescriptionBottom: {
    marginBottom: theme.spacing(2),
  },
  buttonWrap: {
    display: 'flex',
  },
  google_app_stores: {
    width: 135,
    height: 40,
  },
  buttonSeperator: {
    marginRight: theme.spacing(2),
  },
  rightImage: {
    width: '100%',
    height: 'auto',
  },
  [theme.breakpoints.down('sm')]: {
    leftContent: {
      marginBottom: theme.spacing(6),
    },
    icon: {
      width: 142,
      height: 30,
    },
    iconText: {
      fontSize: 18,
      marginBottom: 5,
    },
    topTitle: {
      fontSize: 18,
    },
    buttonWrap: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    buttonSeperator: {
      marginBottom: theme.spacing(2),
    },
    topContent: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(10),
    },
  },
}))
