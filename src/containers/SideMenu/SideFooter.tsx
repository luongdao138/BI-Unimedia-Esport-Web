import { Link, ListItemText, Theme, Box, ButtonBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { ESRoutes } from '@constants/route.constants'
import { Colors } from '@theme/colors'
import Icon from '@material-ui/core/Icon'

const SideFooter: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()

  return (
    <div>
      <div className={classes.root}>
        <Link href={'https://twitter.com/exelab_official'} underline={'none'} target="_blank">
          <div className={classes.iconText}>
            <Icon className="fab fa-twitter" fontSize="small" />
            <ListItemText className={classes.label}>{t('common:top.footer_twitter_official')}</ListItemText>
          </div>
        </Link>
        <Link href={ESRoutes.TERMS} underline={'none'}>
          <ListItemText className={classes.listText}>{t('common:home.terms_of_use')}</ListItemText>
        </Link>
        <Link href={ESRoutes.COMMERCIAL} underline={'none'}>
          <ListItemText className={classes.listText}>{t('common:home.notation_commercial')}</ListItemText>
        </Link>
        <Link href={ESRoutes.PRIVACY} underline={'none'}>
          <ListItemText className={classes.listText}>{t('common:home.handling_of_personal_information')}</ListItemText>
        </Link>
        <Link href="https://support.exelab.jp/hc/ja" underline={'none'} target="_blank">
          <ListItemText className={classes.listText}>{t('common:home.help_center')}</ListItemText>
        </Link>
        <Link href={ESRoutes.INQUIRY_SETTINGS} underline={'none'}>
          <ListItemText className={classes.listText}>{t('common:home.contact_us')}</ListItemText>
        </Link>
      </div>
      <Link href="https://ntte-sports.co.jp/" underline={'none'} target="_blank">
        <div className={classes.list}>
          <ListItemText className={classes.label2}>
            {t('common:home.copyright_symbol')}
            {moment().year()}
            {t('common:home.copyright_text')}
          </ListItemText>
        </div>
      </Link>
      <Box className={classes.buttonWrap}>
        <ButtonBase href="https://apps.apple.com/us/app/exelab/id1525346211" target="_blank">
          <img className={classes.google_app_stores} src="/images/appstore.png" />
        </ButtonBase>
        <ButtonBase href="https://play.google.com/store/apps/details?id=jp.co.ntt.esportspf.exelab" target="_blank">
          <img className={classes.google_app_stores} src="/images/googleplay.png" />
        </ButtonBase>
      </Box>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  innerWrap: {
    display: 'flex',
    justifyContent: 'center',
  },
  root: {
    paddingTop: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
  list: {
    paddingTop: 0,
    '&:hover': {
      background: 'none',
    },
    paddingBottom: theme.spacing(2),
  },
  iconText: {
    color: Colors.white_opacity[30],
    paddingBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  listText: {
    color: Colors.white_opacity[30],
    '& > span': {
      fontSize: 12,
    },
    lineHeight: 1,
    marginTop: 0,
    marginBottom: 0,
  },
  label: {
    color: Colors.white_opacity[30],
    '& > span': {
      fontSize: 12,
    },
    padding: 0,
  },
  label2: {
    color: Colors.white_opacity[30],
    '& > span': {
      fontSize: 12,
    },
  },
  buttonWrap: {
    paddingTop: theme.spacing(2),
  },
  appDesc: {
    display: 'block',
    paddingBottom: theme.spacing(1),
  },
  google_app_stores: {
    height: 50,
    maxWidth: '100%',
    paddingBottom: theme.spacing(1),
  },
}))

export default SideFooter
