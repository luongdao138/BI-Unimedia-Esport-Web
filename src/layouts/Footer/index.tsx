import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { Link, List, ListItem, ListItemText, Theme, Box, Typography, ButtonBase } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { ESRoutes } from '@constants/route.constants'
import Icon from '@material-ui/core/Icon'
import { useRouter } from 'next/router'

export const Footer: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation(['common'])
  const theme = useTheme()
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div className={classes.footer} style={{ display: router.pathname === ESRoutes.TOP || downSm ? 'block' : 'none' }}>
      <Box className={classes.footerInner}>
        <Box className={classes.leftSection}>
          <List component="nav" aria-labelledby="footer-list" disablePadding className={classes.root}>
            <Link href={ESRoutes.TERMS} underline={'none'}>
              <ListItem className={classes.listBorder} button disableRipple>
                <ListItemText className={classes.listText}>{t('common:home.terms_of_use')}</ListItemText>
              </ListItem>
            </Link>
            <Link href={ESRoutes.PRIVACY} underline={'none'}>
              <ListItem className={classes.listBorder} button disableRipple>
                <ListItemText className={classes.listText}>{t('common:home.handling_of_personal_information')}</ListItemText>
              </ListItem>
            </Link>
            <Link href={ESRoutes.COMMERCIAL} underline={'none'}>
              <ListItem className={classes.listBorder} button disableRipple>
                <ListItemText className={classes.listText}>{t('common:home.notation_commercial')}</ListItemText>
              </ListItem>
            </Link>
            <Link href={ESRoutes.INQUIRY_SETTINGS} underline={'none'}>
              <ListItem className={classes.listBorder} button disableRipple>
                <ListItemText className={classes.listText}>{t('common:home.contact_us')}</ListItemText>
              </ListItem>
            </Link>
            <Link href="https://support.exelab.jp/hc/ja" underline={'none'} target="_blank">
              <ListItem className={classes.list} button disableRipple>
                <ListItemText className={classes.listText}>{t('common:home.help_center')}</ListItemText>
              </ListItem>
            </Link>
            {downSm && (
              <Link href={'https://twitter.com/exelab_official'} underline={'none'} target="_blank">
                <ListItem className={classes.iconText} button disableRipple>
                  <Icon className="fab fa-twitter" fontSize="small" />
                  <ListItemText className={classes.listText}>{t('common:top.footer_twitter_official')}</ListItemText>
                </ListItem>
              </Link>
            )}
          </List>
        </Box>
        <Box className={classes.rightSection}>
          {!downSm && (
            <Link href={'https://twitter.com/exelab_official'} underline={'none'} target="_blank">
              <ListItem className={classes.iconText} button disableRipple>
                <Icon className="fab fa-twitter" fontSize="small" />
                <ListItemText className={classes.listText}>{t('common:top.footer_twitter_official')}</ListItemText>
              </ListItem>
            </Link>
          )}
          <Typography variant="caption" className={classes.apptitle}>
            {t('common:top.footer_download_app')}
          </Typography>
          <Box className={classes.appWrap}>
            <ButtonBase href="https://apps.apple.com/us/app/exelab/id1525346211" target="_blank">
              <img className={classes.app_store} src="/images/appstore.png" />
            </ButtonBase>
            <ButtonBase href="https://play.google.com/store/apps/details?id=jp.co.ntt.esportspf.exelab" target="_blank">
              <img className={classes.google} src="/images/googleplay.png" />
            </ButtonBase>
          </Box>
        </Box>
      </Box>
      <div>
        <Link href="https://ntte-sports.co.jp/" underline={'none'} target="_blank" className={classes.copyrightWrap}>
          <ListItem className={classes.copyrightInner} button disableRipple>
            <ListItemText className={classes.copyright}>
              {t('common:home.copyright_symbol')}
              {moment().year()}
              {t('common:home.copyright_text')}
            </ListItemText>
          </ListItem>
        </Link>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    borderTop: `1px solid  ${Colors.grey[400]}`,
    textAlign: 'center',
    backgroundColor: Colors.grey[100],
  },
  innerWrap: {
    display: 'flex',
    justifyContent: 'center',
  },
  footerInner: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
    marginTop: theme.spacing(3),
    display: 'flex',
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingBottom: 0,
  },
  copyrightWrap: {
    backgroundColor: '#0D0D0D',
    display: 'block',
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
  copyrightInner: {
    '&:hover': {
      background: '#0D0D0D',
    },
  },
  list: {
    padding: 0,
    '&:hover': {
      background: 'none',
    },
    paddingBottom: theme.spacing(2),
  },
  leftSection: {},
  rightSection: {
    marginLeft: theme.spacing(10),
  },
  listBorder: {
    padding: 0,
    color: Colors.white_opacity[70],
    marginBottom: theme.spacing(1),
    '&:hover': {
      background: 'none',
    },
  },
  apptitle: {
    display: 'flex',
    color: Colors.white_opacity[30],
    paddingBottom: theme.spacing(1),
  },
  iconText: {
    padding: 0,
    color: Colors.white_opacity[70],
    marginBottom: 28,
    '&:hover': {
      background: 'none',
    },
  },
  google: {
    height: theme.spacing(5),
    maxWidth: '100%',
  },
  app_store: {
    maxWidth: '100%',
    height: theme.spacing(5),
    paddingRight: theme.spacing(2),
  },
  listText: {
    color: theme.palette.text.primary,
    margin: 0,
    '& > span': {
      fontSize: 12,
    },
  },
  appWrap: {
    display: 'flex',
    marginBottom: theme.spacing(3),
  },
  copyright: {
    color: theme.palette.text.primary,
    margin: 0,
    textAlign: 'center',
    '& > span': {
      fontSize: 12,
    },
  },
  [theme.breakpoints.down('sm')]: {
    footerInner: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    iconText: {
      marginBottom: theme.spacing(2),
    },
    rightSection: {
      marginLeft: theme.spacing(0),
    },
  },
}))
