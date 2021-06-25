import { AppBar, Typography, Toolbar, Box, IconButton, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import ESMenuItem from '@components/Menu/MenuItem'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'

export const Header: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h2">{t('common:home.home')}</Typography>
          <Box className={classes.dropDownMenu}>
            <IconButton className={classes.iconButtonBg}>
              <Icon className="fa fa-ellipsis-v" fontSize="small" />
            </IconButton>
            <Box className={`${classes.dropDownContent} MuiPaper-elevation8 MuiPaper-rounded`}>
              <ESMenuItem onClick={() => router.push(ESRoutes.HOME_ORDER)}>{t('common:home.change_order')}</ESMenuItem>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  grow: { flexGrow: 1 },
  appBar: {
    background: '#000',
  },
  toolbar: {
    minHeight: 58,
    justifyContent: 'space-between',
  },
  badge: {
    fontSize: 4,
  },
  icon: {
    fontSize: 30,
  },
  iconButtonBg: {
    alignItems: 'center',
  },
  dropDownMenu: {
    position: 'relative',
    display: 'inline-block',
    '&:hover $dropDownContent': {
      width: 'auto',
      visiblity: 'visible',
      opocity: 1,
      transition: 'all 0.5s ease',
      height: 'auto',
      display: 'block',
    },
  },
  dropDownContent: {
    width: 0,
    overflow: 'hidden',
    visiblity: 'hidden',
    opocity: 0,
    position: 'absolute',
    background: 'white',
    right: 0,
    height: 0,
    willChange: 'all',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}))
