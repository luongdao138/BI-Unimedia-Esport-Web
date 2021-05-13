import { Box, List, ListItem as MuiListItem, ListItemIcon, ListItemText, Typography, Button } from '@material-ui/core'
import Link from 'next/link'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import Icon from '@material-ui/core/Icon'
import ProfileAvatar from '@components/ProfileAvatar'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@store/hooks'
import userProfileStore from '@store/userProfile'
import { ESRoutes } from '@constants/route.constants'
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
      borderRight: `2px solid ${Colors.primary}`,
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
  const { selectors } = userProfileStore
  const userProfile = useAppSelector(selectors.getUserProfile)
  const isSelected = (routeName: string): boolean => {
    return router.pathname === routeName
  }
  return (
    <>
      <Box className={classes.menu}>
        <Button onClick={() => router.push(ESRoutes.PROFILE)}>
          <Box className={classes.userInfo}>
            <ProfileAvatar size={80} src={userProfile ? userProfile.attributes.avatar_url : '/images/avatar.png'} />
            <Box width="100%" textAlign="center">
              <Typography variant="h2" className={classes.name}>
                {userProfile ? userProfile.attributes.nickname : ''}
              </Typography>
              <Typography variant="body2" className={classes.usercode}>
                @{userProfile ? userProfile.attributes.user_code : ''}
              </Typography>
            </Box>
          </Box>
        </Button>

        <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
          <Link href={ESRoutes.HOME}>
            <ListItem className={classes.list} button disableRipple selected={isSelected(ESRoutes.HOME)}>
              <ListItemIcon className={classes.icon}>
                <Icon fontSize="small" className="fa fa-home" />
              </ListItemIcon>
              <ListItemText className={classes.listText} primary={t('common:home.home')} />
            </ListItem>
          </Link>
          <Link href={ESRoutes.TOURNAMENTS}>
            <ListItem className={classes.list} button disableRipple selected={isSelected(ESRoutes.TOURNAMENTS)}>
              <ListItemIcon className={classes.icon}>
                <Icon fontSize="small" className="fa fa-trophy" />
              </ListItemIcon>
              <ListItemText className={classes.listText} primary={t('common:home.tournament')} />
            </ListItem>
          </Link>
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
          <Link href={ESRoutes.SETTINGS}>
            <ListItem className={classes.list} button disableRipple selected={isSelected(ESRoutes.SETTINGS)}>
              <ListItemIcon className={classes.icon}>
                <Icon fontSize="small" className="fa fa-cog" />
              </ListItemIcon>
              <ListItemText className={classes.listText} primary={t('common:home.settings')} />
            </ListItem>
          </Link>
        </List>
      </Box>
    </>
  )
}
export default SideMenu
