import { useState } from 'react'
import { Box, List, ListItem as MuiListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import Link from 'next/link'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import Icon from '@material-ui/core/Icon'
import ESAvatar from '@components/Avatar'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@store/hooks'
import userProfileStore from '@store/userProfile'
import { getIsAuthenticated } from '@store/auth/selectors'
import { ESRoutes } from '@constants/route.constants'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import QrContainer from '@containers/Qr'
import LogoutContainer from '@containers/Logout'
import LoginRequired from '@containers/LoginRequired'
import SideFooter from './SideFooter'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import AppDialog from './AppDialog'

const SideMenu: React.FC = () => {
  const [modal, setModal] = useState(false)
  const [appModal, setAppModal] = useState(false)
  const [content, setContent] = useState('')
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const { selectors } = userProfileStore
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const userProfile = useAppSelector(selectors.getUserProfile)
  const theme = useTheme()
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))
  const isSelected = (routeName: string): boolean => {
    return router.pathname && router.pathname.startsWith(routeName)
  }

  const handleModal = (contentType: string) => {
    setModal(true)
    setContent(contentType)
  }

  const handleAppModal = (value: boolean) => {
    setAppModal(value)
  }

  return (
    <>
      <Box className={classes.menu}>
        <Box className={classes.clickable} onClick={() => isAuthenticated && router.push(ESRoutes.PROFILE, undefined, { shallow: true })}>
          <Box className={classes.userInfo}>
            <ESAvatar
              className={classes.avatar}
              alt={userProfile?.attributes?.nickname}
              src={userProfile ? userProfile?.attributes?.avatar_url : '/images/avatar.png'}
            />
            {isAuthenticated && (
              <Box width="100%" textAlign="center">
                <Typography variant="h2" className={classes.name}>
                  {userProfile ? userProfile.attributes.nickname : ''}
                </Typography>
                <Typography variant="body2" className={classes.usercode}>
                  @{userProfile ? userProfile.attributes.user_code : ''}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box className={`${classes.menuWrap}`}>
          <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
            <LoginRequired>
              <Link href={ESRoutes.HOME} passHref>
                <ListItem className={classes.list} button disableRipple selected={isSelected(ESRoutes.HOME)}>
                  <ListItemIcon className={classes.icon}>
                    <Icon fontSize="small" className="fa fa-home" />
                  </ListItemIcon>
                  <ListItemText className={classes.listText} primary={t('common:home.home')} />
                </ListItem>
              </Link>
            </LoginRequired>
            <Link href={ESRoutes.ARENA} passHref>
              <ListItem className={classes.list} button disableRipple selected={isSelected(ESRoutes.ARENA)}>
                <ListItemIcon className={classes.icon}>
                  <Icon fontSize="small" className="fa fa-trophy" />
                </ListItemIcon>
                <ListItemText className={classes.listText} primary={t('common:home.tournament')} />
              </ListItem>
            </Link>
            <Link href={ESRoutes.LOBBY} passHref>
              <ListItem className={classes.list} button disableRipple>
                <ListItemIcon className={classes.icon}>
                  <Icon fontSize="small" className="fa fa-university" />
                </ListItemIcon>
                <ListItemText className={classes.listText} primary={t('common:home.lobby')} />
              </ListItem>
            </Link>
            {/*<ListItem className={classes.list} button disableRipple>
            <ListItemIcon className={classes.icon}>
              <Icon fontSize="small" className="fa fa-users" />
            </ListItemIcon>
            <ListItemText className={classes.listText} primary={t('common:home.community')} />
          </ListItem> */}
            <Box paddingBottom={4} />
            {/* <ListItem className={classes.list} button disableRipple>
            <ListItemIcon className={classes.icon}>
              <Icon fontSize="small" className="fa fa-play-circle" />
            </ListItemIcon>
            <ListItemText className={classes.listText} primary={t('common:home.video')} />
          </ListItem> */}
            <Link href={ESRoutes.SETTINGS} passHref>
              <ListItem className={classes.list} button disableRipple selected={isSelected(ESRoutes.SETTINGS)}>
                <ListItemIcon className={classes.icon}>
                  <Icon fontSize="small" className="fa fa-cog" />
                </ListItemIcon>
                <ListItemText className={classes.listText} primary={t('common:home.settings')} />
              </ListItem>
            </Link>
            {isAuthenticated && (
              <>
                <Box paddingBottom={4} />
                <ListItem className={classes.list} button disableRipple onClick={() => handleModal('qr')}>
                  <ListItemIcon className={classes.icon}>
                    <Icon fontSize="small" className="fa fa-qrcode" />
                  </ListItemIcon>
                  <ListItemText className={classes.listText} primary={t('common:qr')} />
                </ListItem>
              </>
            )}
          </List>
          {isAuthenticated && (
            <ListItem className={classes.list} button disableRipple onClick={() => handleModal('logout')}>
              <ListItemIcon className={classes.icon}>
                <Icon fontSize="small" className="fa fa-sign-out-alt" />
              </ListItemIcon>
              <ListItemText className={classes.listText} primary={t('common:logout')} />
            </ListItem>
          )}
          {!downSm && <SideFooter handleAppModal={handleAppModal} />}
        </Box>
      </Box>

      <ESModal open={modal} handleClose={() => setModal(false)}>
        <BlankLayout>
          {content === 'qr' ? <QrContainer handleClose={() => setModal(false)} /> : <LogoutContainer handleClose={() => setModal(false)} />}
        </BlankLayout>
      </ESModal>
      <AppDialog open={appModal} handleClose={() => setAppModal(false)} />
    </>
  )
}

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
    maxWidth: 165,
    width: '100%',
    position: 'relative',
    height: '100%',
    paddingBottom: 66,
    paddingTop: 203,
  },
  icon: {
    minWidth: 30,
  },
  userInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    width: '100%',
    display: 'flex',
    paddingTop: 40,
    flexDirection: 'column',
    paddingBottom: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  avatar: {
    zIndex: 30,
    width: 80,
    height: 80,
  },
  name: {
    paddingBottom: 5,
    paddingTop: 10,
    color: theme.palette.text.primary,
    margin: '0 auto',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    fontSize: 14,
  },
  usercode: {
    color: theme.palette.text.secondary,
    margin: '0 auto',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: 130,
  },
  clickable: {
    cursor: 'pointer',
  },
  buttonWrap: {
    paddingTop: theme.spacing(2),
  },
  appDesc: {
    display: 'block',
    paddingBottom: theme.spacing(1),
  },
  google_app_stores: {
    width: 135,
    maxWidth: '100%',
    paddingBottom: theme.spacing(1),
  },
  menuWrap: {
    height: '100%',
    overflowY: 'auto',
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
      visibility: 'visible',
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      opacity: 1,
      visibility: 'visible',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222',
      borderRadius: 6,
      opacity: 1,
      visibility: 'visible',
    },
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

export default SideMenu
