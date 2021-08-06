import { useState } from 'react'
import { Box, List, ListItem as MuiListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import Link from 'next/link'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import Icon from '@material-ui/core/Icon'
import { useRouter } from 'next/router'
import { useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import { ESRoutes } from '@constants/route.constants'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import QrContainer from '@containers/Qr'
import LogoutContainer from '@containers/Logout'
import LoginRequired from '@containers/LoginRequired'
import userProfileStore from '@store/userProfile'
import ESAvatar from '@components/Avatar'
import { useTranslation } from 'react-i18next'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import SideFooter from './SideFooter'
interface StreamSideMenuProps {
  minimizeLayout?: boolean
  isStreamer: boolean
}

const StreamSideMenu: React.FC<StreamSideMenuProps> = ({ minimizeLayout, isStreamer }) => {
  const [modal, setModal] = useState(false)
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

  const getAddClass = (addClass: string, otherClass?: string) => {
    if (!minimizeLayout) {
      return ' ' + addClass
    } else {
      return otherClass ? ' ' + otherClass : ''
    }
  }

  return (
    <>
      <Box
        className={
          classes.menu + getAddClass(classes.noMinimizeMenu, classes.minimizeMenu) + (isStreamer ? ' ' + classes.streamerMenu : '')
        }
      >
        <Box className={classes.menuWrap + getAddClass(classes.streamerMenuWrap, classes.minimizeMenuWrap)}>
          {minimizeLayout ? (
            <Box>
              <img src="/images/stream_log.svg" className={classes.logo} />
            </Box>
          ) : (
            <>
              <Box
                className={classes.clickable}
                onClick={() => isAuthenticated && router.push(ESRoutes.PROFILE, undefined, { shallow: true })}
              >
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
              <Box className={classes.wrap_point}>
                <Box className={classes.text_point}>eXeポイント</Box>
                <Box className={classes.point}>999999</Box>
                <Box className={classes.link_point}>
                  {/* redirect to point management */}
                  <Link href={ESRoutes.TERMS}>
                    <a>eXeポイント管理</a>
                  </Link>
                </Box>
              </Box>
            </>
          )}

          <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
            <Link href={ESRoutes.SETTINGS} passHref>
              <ListItem
                className={classes.list + getAddClass(classes.streamer_list, classes.not_streamer_list)}
                button
                disableRipple
                selected={isSelected(ESRoutes.SETTINGS)}
              >
                <ListItemIcon className={classes.icon}>
                  <Icon fontSize="small" className="fa fa-heart" />
                </ListItemIcon>
                {/* link to top video page and tab favorite(お気に入り) is selected*/}
                {!minimizeLayout && <ListItemText className={classes.listText} primary={t('common:home.top_video')} />}
              </ListItem>
            </Link>
            {isStreamer && (
              <Link href={ESRoutes.DELIVERY_MANAGEMENT} passHref>
                <ListItem
                  className={classes.list + getAddClass(classes.streamer_list, classes.not_streamer_list)}
                  button
                  disableRipple
                  selected={isSelected(ESRoutes.DELIVERY_MANAGEMENT)}
                >
                  <ListItemIcon className={classes.icon}>
                    <Icon fontSize="small" className="fa fa-video-slash" />
                  </ListItemIcon>
                  {/* link to Delivery settings and tab Delivery reservation (配信予約) */}
                  {!minimizeLayout && <ListItemText className={classes.listText} primary={t('common:home.reservation_video')} />}
                </ListItem>
              </Link>
            )}
            <Link href={ESRoutes.SETTINGS} passHref>
              <ListItem
                className={classes.list + getAddClass(classes.streamer_list, classes.not_streamer_list)}
                button
                disableRipple
                selected={isSelected(ESRoutes.SETTINGS)}
              >
                <ListItemIcon className={classes.icon}>
                  <Icon fontSize="small" className="fa fa-hourglass" />
                </ListItemIcon>
                {/* is confirm link to */}
                {!minimizeLayout && <ListItemText className={classes.listText} primary={t('common:home.viewing_history')} />}
              </ListItem>
            </Link>
            {!minimizeLayout && <Box paddingBottom={1} />}
            {isStreamer && (
              <Link href={ESRoutes.SETTINGS} passHref>
                <ListItem
                  className={classes.list + getAddClass(classes.streamer_list, classes.not_streamer_list)}
                  button
                  disableRipple
                  selected={isSelected(ESRoutes.SETTINGS)}
                >
                  <ListItemIcon className={classes.icon}>
                    <Icon fontSize="small" className="fa fa-users" />
                  </ListItemIcon>
                  {/* link to stream management */}
                  {!minimizeLayout && <ListItemText className={classes.listText} primary={t('common:home.delivery_management')} />}
                </ListItem>
              </Link>
            )}
            {!isStreamer && (
              <Link href={ESRoutes.SETTINGS} passHref>
                <ListItem
                  className={classes.list + getAddClass(classes.streamer_list, classes.not_streamer_list)}
                  button
                  disableRipple
                  selected={isSelected(ESRoutes.SETTINGS)}
                >
                  <ListItemIcon className={classes.icon}>
                    <Icon fontSize="small" className="fa fa-paper-plane" />
                  </ListItemIcon>
                  {/* confirm link to */}
                  {!minimizeLayout && (
                    <ListItemText className={classes.listText} primary={t('common:home.video_distribution_application')} />
                  )}
                </ListItem>
              </Link>
            )}
            <Link href={ESRoutes.SETTINGS} passHref>
              <ListItem
                className={classes.list + getAddClass(classes.streamer_list, classes.not_streamer_list)}
                button
                disableRipple
                selected={isSelected(ESRoutes.SETTINGS)}
              >
                <ListItemIcon className={classes.icon}>
                  <Icon fontSize="small" className="fa fa-cog" />
                </ListItemIcon>
                {!minimizeLayout && <ListItemText className={classes.listText} primary={t('common:home.settings')} />}
              </ListItem>
            </Link>
            {!minimizeLayout && <Box paddingBottom={1} />}
            <LoginRequired>
              <Link href={ESRoutes.HOME} passHref>
                <ListItem
                  className={classes.list + getAddClass(classes.streamer_list + ' ' + classes.listTextHome, classes.not_streamer_list)}
                  button
                  disableRipple
                  selected={isSelected(ESRoutes.HOME)}
                >
                  <ListItemIcon className={classes.icon}>
                    <Icon fontSize="small" className="fa fa-headset" />
                  </ListItemIcon>
                  {!minimizeLayout && <ListItemText className={classes.listText} primary={t('common:home.eXeLAB_link')} />}
                </ListItem>
              </Link>
            </LoginRequired>
          </List>
          {isAuthenticated && (
            <ListItem
              className={classes.list + getAddClass(classes.streamer_list, classes.not_streamer_list)}
              button
              disableRipple
              onClick={() => handleModal('logout')}
            >
              <ListItemIcon className={classes.icon}>
                <Icon fontSize="small" className="fa fa-sign-out-alt" />
              </ListItemIcon>
              {!minimizeLayout && <ListItemText className={classes.listText} primary={t('common:logout')} />}
            </ListItem>
          )}
          {!downSm && !minimizeLayout && <SideFooter />}
        </Box>
      </Box>

      <ESModal open={modal} handleClose={() => setModal(false)}>
        <BlankLayout>
          {content === 'qr' ? <QrContainer handleClose={() => setModal(false)} /> : <LogoutContainer handleClose={() => setModal(false)} />}
        </BlankLayout>
      </ESModal>
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
    maxWidth: '82px',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 40,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 30,
    marginTop: 30,
    borderRight: '2px solid transparent',
    transition: 'all 0.1s ease-out',
    '&:first-child': {
      marginTop: 0,
    },
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
  not_streamer_list: {
    paddingTop: '0px',
    marginBottom: 20,
    marginTop: 20,
    '& .MuiListItemIcon-root': {
      minWidth: 'unset',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      textAlign: 'center',
    },
  },
  streamer_list: {
    paddingLeft: '25px',
    marginBottom: '10px',
    marginTop: '10px',
    alignItems: 'baseline',
    '& .MuiListItemIcon-root': {
      minWidth: '15px',
      textAlign: 'center',
      paddingRight: '10px',
    },
  },
  menu: {
    width: '100%',
    paddingTop: 72,
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  noMinimizeMenu: {
    justifyContent: 'flex-end',
  },
  streamerMenu: {
    [theme.breakpoints.up('lg')]: {
      background: Colors.black_card,
    },
  },
  minimizeMenu: {
    background: Colors.black_card,
  },
  icon: {},
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '25px',
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
    maxWidth: 80,
  },
  usercode: {
    color: theme.palette.text.secondary,
    margin: '0 auto',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: 80,
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
  streamerMenuWrap: {
    width: '180px',
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
  wrap_point: {
    borderTop: `1px solid ${Colors.white_opacity[30]}`,
    borderBottom: `1px solid ${Colors.white_opacity[30]}`,
    padding: '15px 0 15px 25px',
    marginBottom: '17px',
  },
  text_point: {
    fontSize: '12px',
    color: Colors.white_opacity[70],
  },
  point: {
    fontSize: '20px',
    color: Colors.primary,
    padding: '10px 0px',
  },
  link_point: {
    fontSize: '9px',
    '& a': {
      color: Colors.white_opacity[70],
    },
  },
  minimizeMenuWrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  listTextHome: {
    borderTop: `1px solid ${Colors.white_opacity[30]}`,
    borderBottom: `1px solid ${Colors.white_opacity[30]}`,
    paddingTop: '10px',
    paddingBottom: '10px',
    marginBottom: '0px',
  },
}))

const ListItem = withStyles({
  root: {
    '& .MuiListItemIcon-root': {
      color: '#B6B6B6',
    },
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

StreamSideMenu.defaultProps = {
  minimizeLayout: false,
}

export default StreamSideMenu
