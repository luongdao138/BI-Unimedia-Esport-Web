import { useState } from 'react'
import { Box, List, ListItem as MuiListItem, ListItemIcon, ListItemText, Typography, ButtonBase } from '@material-ui/core'
import Link from 'next/link'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import Icon from '@material-ui/core/Icon'
import ProfileAvatar from '@components/ProfileAvatar'
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
    position: 'relative',
    height: '100%',
    paddingBottom: 112,
    paddingTop: 203,
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  name: {
    paddingBottom: 5,
    paddingTop: 10,
    color: theme.palette.text.primary,
    margin: '0 auto',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 80,
  },
  usercode: {
    color: theme.palette.text.secondary,
    margin: '0 auto',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 80,
  },
  clickable: {
    cursor: 'pointer',
  },
  logout: {
    position: 'absolute',
    bottom: 70,
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

const SideMenu: React.FC = () => {
  const [modal, setModal] = useState(false)
  const [content, setContent] = useState('')
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const { selectors } = userProfileStore
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const userProfile = useAppSelector(selectors.getUserProfile)
  const isSelected = (routeName: string): boolean => {
    return router.pathname && router.pathname.startsWith(routeName)
  }

  const handleModal = (contentType: string) => {
    setModal(true)
    setContent(contentType)
  }

  return (
    <>
      <Box className={classes.menu}>
        <Box className={classes.clickable} onClick={() => isAuthenticated && router.push(ESRoutes.PROFILE, undefined, { shallow: true })}>
          <Box className={classes.userInfo}>
            <ProfileAvatar
              size={80}
              src={userProfile?.attributes?.avatar_url ? userProfile.attributes.avatar_url : '/images/avatar_o.png'}
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
            {/* <ListItem className={classes.list} button disableRipple>
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
            <Box className={classes.buttonWrap}>
              <Typography variant="caption" className={classes.appDesc}>
                {t('common:home.download_app_version')}
              </Typography>
              <ButtonBase href="https://apps.apple.com/us/app/exelab/id1525346211" target="_blank">
                <img className={classes.google_app_stores} src="/images/appstore.png" />
              </ButtonBase>
              <ButtonBase href="https://play.google.com/store/apps/details?id=jp.co.ntt.esportspf.exelab" target="_blank">
                <img className={classes.google_app_stores} src="/images/googleplay.png" />
              </ButtonBase>
            </Box>
          </List>
        </Box>

        {isAuthenticated && (
          <Box className={classes.logout}>
            <ListItem className={classes.list} button disableRipple onClick={() => handleModal('logout')}>
              <ListItemIcon className={classes.icon}>
                <Icon fontSize="small" className="fa fa-sign-out-alt" />
              </ListItemIcon>
              <ListItemText className={classes.listText} primary={t('common:logout')} />
            </ListItem>
          </Box>
        )}
      </Box>

      <ESModal open={modal} handleClose={() => setModal(false)}>
        <BlankLayout>
          {content === 'qr' ? <QrContainer handleClose={() => setModal(false)} /> : <LogoutContainer handleClose={() => setModal(false)} />}
        </BlankLayout>
      </ESModal>
    </>
  )
}
export default SideMenu
