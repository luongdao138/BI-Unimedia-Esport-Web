import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import MuiListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import Icon from '@material-ui/core/Icon'
import ProfileAvatar from '@components/ProfileAvatar'
import { Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  listText: {
    fontSize: 16,
    color: theme.palette.text.primary,
  },
  list: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 5,
    marginTop: 5,
    borderRight: '2px solid transparent',
    transition: 'all 0.1s ease-out',
    '&:hover': {
      background: 'transparent',
    },
    '&:hover $listText': {
      color: Colors.primary,
    },
    '&:hover $icon': {
      color: Colors.primary,
    },
    '$list span': {
      fontWeight: 500,
    },
  },
  menu: {
    maxWidth: 160,
    width: '100%',
  },
  icon: {
    minWidth: 30,
  },
  userInfo: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    paddingTop: 40,
    flexDirection: 'column',
    paddingBottom: 30,
  },
  name: {
    paddingBottom: 5,
    paddingTop: 10,
    color: theme.palette.text.primary,
  },
  usercode: {
    color: theme.palette.text.secondary,
  },
}))

const ListItem = withStyles({
  root: {
    '&$selected': {
      backgroundColor: 'transparent',
      color: Colors.primary,
      '& .MuiListItemIcon-root': {
        color: Colors.primary,
      },
      '& .MuiListItemText-root': {
        color: Colors.primary,
      },
    },
    '&$selected:hover': {
      backgroundColor: 'transparent',
      color: Colors.primary,
      '& .MuiListItemIcon-root': {
        color: Colors.primary,
      },
      '& .MuiListItemText-root': {
        color: Colors.primary,
      },
    },
  },
  selected: {},
})(MuiListItem)

const SideMenu: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const isSelected = (routeName: string): boolean => {
    return router.pathname === routeName
  }
  return (
    <>
      <Box className={classes.menu}>
        <Box className={classes.userInfo}>
          <ProfileAvatar size={80} src="/images/avatar.png" />
          <Box width="100%" textAlign="center">
            <Typography variant="h2" className={classes.name}>
              {t('common:home.exelab')}
            </Typography>
            <Typography variant="body2" className={classes.usercode}>
              {t('common:home.exelab_staff')}
            </Typography>
          </Box>
        </Box>

        <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
          <ListItem className={classes.list} button disableRipple selected={isSelected('/home')} onClick={() => router.push('/home')}>
            <ListItemIcon className={classes.icon}>
              <Icon fontSize="small" className="fa fa-home" />
            </ListItemIcon>
            <ListItemText className={classes.listText} primary={t('common:home.home')} />
          </ListItem>
          <ListItem
            className={classes.list}
            button
            disableRipple
            selected={isSelected('/tournaments')}
            onClick={() => router.push('/tournaments')}
          >
            <ListItemIcon className={classes.icon}>
              <Icon fontSize="small" className="fa fa-trophy" />
            </ListItemIcon>
            <ListItemText className={classes.listText} primary={t('common:home.tournament')} />
          </ListItem>
          <ListItem className={classes.list} button disableRipple>
            <ListItemIcon className={classes.icon}>
              <Icon fontSize="small" className="fa fa-university" />
            </ListItemIcon>
            <ListItemText className={classes.listText} primary={t('common:home.lobby')} />
          </ListItem>
          <ListItem className={classes.list} button disableRipple>
            <ListItemIcon className={classes.icon}>
              <Icon fontSize="small" className="fa fa-users" />
            </ListItemIcon>
            <ListItemText className={classes.listText} primary={t('common:home.community')} />
          </ListItem>
          <Box paddingBottom={4} />
          <ListItem className={classes.list} button disableRipple>
            <ListItemIcon className={classes.icon}>
              <Icon fontSize="small" className="fa fa-play-circle" />
            </ListItemIcon>
            <ListItemText className={classes.listText} primary={t('common:home.video')} />
          </ListItem>
          <ListItem
            className={classes.list}
            button
            disableRipple
            selected={isSelected('/settings')}
            onClick={() => router.push('/settings')}
          >
            <ListItemIcon className={classes.icon}>
              <Icon fontSize="small" className="fa fa-cog" />
            </ListItemIcon>
            <ListItemText className={classes.listText} primary={t('common:home.settings')} />
          </ListItem>
        </List>
      </Box>
    </>
  )
}
export default SideMenu
