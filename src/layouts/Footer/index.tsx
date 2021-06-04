import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { Link, List, ListItem, ListItemText, Theme, Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { ESRoutes } from '@constants/route.constants'

interface FooterProps {
  dark?: boolean
}

export const Footer: React.FC<FooterProps> = ({ dark }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <div className={dark ? classes.footerDark : classes.footer}>
      <List component="nav" aria-labelledby="footer-list" disablePadding className={classes.root}>
        <Link href={ESRoutes.TERMS} underline={'none'}>
          <ListItem className={downMd ? classes.list : classes.listBorder} button disableRipple>
            <ListItemText className={classes.listText}>{t('common:home.terms_of_use')}</ListItemText>
          </ListItem>
        </Link>
        <Link href={ESRoutes.PRIVACY} underline={'none'}>
          <ListItem className={downMd ? classes.list : classes.listBorder} button disableRipple>
            <ListItemText className={classes.listText}>{t('common:home.handling_of_personal_information')}</ListItemText>
          </ListItem>
        </Link>
        <Link href={ESRoutes.COMMERCIAL} underline={'none'}>
          <ListItem className={downMd ? classes.listLast : classes.listBorder} button disableRipple>
            <ListItemText className={classes.listText}>{t('common:home.notation_commercial')}</ListItemText>
          </ListItem>
        </Link>
        {downMd ? (
          <Box className={classes.innerWrap}>
            <Link href="#" underline={'none'} target="_blank">
              <ListItem className={classes.listBorder} button disableRipple>
                <ListItemText className={classes.listText}>{t('common:home.contact_us')}</ListItemText>
              </ListItem>
            </Link>
            <Link href="https://support.exelab.jp/hc/ja" underline={'none'} target="_blank">
              <ListItem className={classes.list} button disableRipple>
                <ListItemText className={classes.listText}>{t('common:home.help_center')}</ListItemText>
              </ListItem>
            </Link>
          </Box>
        ) : (
          <>
            <Link href="#" underline={'none'} target="_blank">
              <ListItem className={classes.listBorder} button disableRipple>
                <ListItemText className={classes.listText}>{t('common:home.contact_us')}</ListItemText>
              </ListItem>
            </Link>
            <Link href="https://support.exelab.jp/hc/ja" underline={'none'} target="_blank">
              <ListItem className={classes.listBorder} button disableRipple>
                <ListItemText className={classes.listText}>{t('common:home.help_center')}</ListItemText>
              </ListItem>
            </Link>
          </>
        )}
      </List>
      <div>
        <Link href="https://ntte-sports.co.jp/" underline={'none'} target="_blank">
          <ListItem className={classes.list} button disableRipple>
            <ListItemText className={classes.listText}>
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
    width: '100%',
    padding: theme.spacing(3),
    paddingTop: theme.spacing(4),
    paddingBottom: 0,
    borderTop: `1px solid  ${Colors.text[300]}`,
    textAlign: 'center',
  },
  innerWrap: {
    display: 'flex',
    justifyContent: 'center',
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    flexWrap: 'wrap',
    '&>a:last-child > div': {
      borderRight: 'none',
    },
  },
  list: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingTop: 0,
    '&:hover': {
      background: 'none',
    },
    paddingBottom: theme.spacing(2),
  },
  listLast: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingTop: 0,
    '&:hover': {
      background: 'none',
    },
    paddingBottom: theme.spacing(5),
  },
  listBorder: {
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: theme.spacing(1),
    '&:hover': {
      background: 'none',
    },
    borderRight: `1px solid  ${Colors.text[300]}`,
  },
  listText: {
    color: theme.palette.text.primary,
    margin: 0,
    textAlign: 'center',
    '& > span': {
      fontSize: 12,
    },
  },
  footerDark: {
    width: '100%',
    padding: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: 87,
    borderTop: `1px solid  ${Colors.text[300]}`,
    textAlign: 'center',
    background: '#060606',
    position: 'relative',
  },
  [theme.breakpoints.down('md')]: {
    root: {
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 0,
    },
    list: {
      paddingBottom: theme.spacing(1),
    },
    listBorder: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
    footer: {
      paddingBottom: theme.spacing(1),
    },
    footerDark: {
      paddingBottom: theme.spacing(1),
    },
  },
}))

Footer.defaultProps = {
  dark: false,
}
