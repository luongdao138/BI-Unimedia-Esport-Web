import { useEffect, useState } from 'react'
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
import SideFooter from '@containers/SideMenu/SideFooter'
import AppDialog from '@containers/SideMenu/AppDialog'
import usePointsManage from '@containers/PointManage/usePointsManage'

interface StreamSideMenuProps {
  minimizeLayout?: boolean
  isStreamer: boolean
  isExpandEffect?: boolean
}

const StreamSideMenu: React.FC<StreamSideMenuProps> = ({ minimizeLayout, isStreamer, isExpandEffect }) => {
  const [modal, setModal] = useState(false)
  const [appModal, setAppModal] = useState(false)
  const [content, setContent] = useState('')
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const { selectors } = userProfileStore
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const userProfile = useAppSelector(selectors.getUserProfile)
  const { getMyPointData, myPointsData } = usePointsManage()
  const totalMyPoints = myPointsData?.total_point
  const theme = useTheme()
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))
  // const isSelected = (routeName: string): boolean => {
  //   return router.pathname && router.pathname.startsWith(routeName)
  // }

  useEffect(() => {
    if (isAuthenticated && !myPointsData) {
      getMyPointData({ page: 1, limit: 10 })
    }
  }, [myPointsData])

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

  const handleAppModal = (value: boolean) => {
    setAppModal(value)
  }

  return (
    <>
      <Box
        className={
          classes.menu + (isExpandEffect ? ' ' + classes.expandEffectMenu : '') + getAddClass(classes.noMinimizeMenu, classes.minimizeMenu)
        }
      >
        {minimizeLayout ? (
          <Box>
            {/* <img src="/images/stream_log.svg" className={classes.logo} /> */}
            <ESAvatar
              className={classes.logo}
              alt={userProfile?.attributes?.nickname}
              src={userProfile ? userProfile?.attributes?.avatar_url : '/images/avatar.png'}
            />
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
          </>
        )}
        <Box className={classes.menuWrap + getAddClass(classes.noMinimizeMenuWrap, classes.minimizeMenuWrap)}>
          {!minimizeLayout && isAuthenticated && (
            <Box className={classes.wrap_point}>
              <Box className={classes.text_point}>{t('common:common.eXe_points')}</Box>
              <Box className={classes.point}>{totalMyPoints ?? 0}</Box>
              <Box className={classes.link_point}>
                {/* redirect to point management */}
                <Link href={ESRoutes.USER_POINT_MANAGEMENT}>
                  <a>{t('common:common.eXe_point_management')}</a>
                </Link>
              </Box>
            </Box>
          )}
          <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
            {/* Videos Top Tab */}
            <Link
              href={{
                pathname: ESRoutes.VIDEO_TOP,
                query: { default_tab: 0 },
              }}
              passHref
              as={ESRoutes.VIDEO_TOP}
            >
              <ListItem className={classes.list + getAddClass(classes.noMinimizeList, classes.minimizeList)} button disableRipple>
                <ListItemIcon className={classes.icon}>
                  <Icon fontSize="small" className="fab fa-youtube" />
                </ListItemIcon>
                {/* link to top video page and videos top tab(お気に入り) is selected*/}
                {!minimizeLayout && <ListItemText className={classes.listText} primary={t('common:home.stream_menu_video_top')} />}
              </ListItem>
            </Link>
            {/* Favorite Tab */}
            <Link
              href={{
                pathname: ESRoutes.VIDEO_TOP,
                query: { default_tab: 4 },
              }}
              passHref
              as={ESRoutes.VIDEO_TOP}
            >
              <ListItem className={classes.list + getAddClass(classes.noMinimizeList, classes.minimizeList)} button disableRipple>
                <ListItemIcon className={classes.icon}>
                  <Icon fontSize="small" className="fa fa-heart" />
                </ListItemIcon>
                {/* link to top video page and tab favorite(お気に入り) is selected*/}
                {!minimizeLayout && <ListItemText className={classes.listText} primary={t('common:home.top_video')} />}
              </ListItem>
            </Link>
            {/*{isStreamer && (*/}
            {/*  <Link*/}
            {/*    href={{*/}
            {/*      pathname: ESRoutes.VIDEO_STREAMING_SETTING,*/}
            {/*      query: { default_tab: 1 },*/}
            {/*    }}*/}
            {/*    passHref*/}
            {/*    as={ESRoutes.VIDEO_STREAMING_SETTING}*/}
            {/*  >*/}
            {/*    <ListItem className={classes.list + getAddClass(classes.noMinimizeList, classes.minimizeList)} button disableRipple>*/}
            {/*      <ListItemIcon className={classes.icon}>*/}
            {/*        <img src="/images/icons/icon_film.svg" className={`icon_svg ${classes.img_svg}`} />*/}
            {/*      </ListItemIcon>*/}
            {/*      /!* link to Delivery settings and tab Delivery reservation (配信予約) *!/*/}
            {/*      {!minimizeLayout && <ListItemText className={classes.listText} primary={t('common:home.reservation_video')} />}*/}
            {/*    </ListItem>*/}
            {/*  </Link>*/}
            {/*)}*/}
            {/*{!minimizeLayout && <Box paddingBottom={1} />}*/}
            {isStreamer && (
              <Link href={ESRoutes.VIDEO_STREAMING_MANAGEMENT} passHref>
                <ListItem className={classes.list + getAddClass(classes.noMinimizeList, classes.minimizeList)} button disableRipple>
                  <ListItemIcon className={classes.icon}>
                    <Icon fontSize="small" className="fa fa-users" />
                  </ListItemIcon>
                  {/* link to stream management */}
                  {!minimizeLayout && <ListItemText className={classes.listText} primary={t('common:home.delivery_management')} />}
                </ListItem>
              </Link>
            )}
            {!isStreamer && isAuthenticated && (
              <a
                target="_blank"
                href="https://docs.google.com/forms/d/1Jjj0HnsmysqystYIwQTqmHmjO1h3ol7lipAkBDZJzuY/viewform?edit_requested=true"
                rel="noopener noreferrer"
                className={classes.linkTag}
              >
                <ListItem className={classes.list + getAddClass(classes.noMinimizeList, classes.minimizeList)} button disableRipple>
                  <ListItemIcon className={classes.icon}>
                    <Icon fontSize="small" className="fa fa-paper-plane" />
                  </ListItemIcon>
                  {/* confirm link to */}
                  {!minimizeLayout && (
                    <ListItemText
                      className={classes.listText + ' ' + classes.listTextWide}
                      primary={t('common:home.video_distribution_application')}
                    />
                  )}
                </ListItem>
              </a>
            )}
            <Link href={ESRoutes.SETTINGS} passHref>
              <ListItem className={classes.list + getAddClass(classes.noMinimizeList, classes.minimizeList)} button disableRipple>
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
                  className={classes.list + getAddClass(classes.noMinimizeList + ' ' + classes.listTextHome, classes.minimizeList)}
                  button
                  disableRipple
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
              className={classes.list + getAddClass(classes.noMinimizeList, classes.minimizeList)}
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
          {!downSm && !minimizeLayout && (
            <Box className={classes.wrap_footer}>
              <SideFooter handleAppModal={handleAppModal} />
            </Box>
          )}
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
  img_svg: {},
  root: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  listText: {
    fontSize: 16,
    color: theme.palette.text.primary,
    maxWidth: '82px',
  },
  listTextWide: {
    maxWidth: 'none',
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
    '&:hover $img_svg': {
      filter: 'invert(45%) sepia(49%) saturate(3416%) hue-rotate(313deg) brightness(100%) contrast(104%)',
    },
    '$list span': {
      fontWeight: 500,
    },
  },
  minimizeList: {
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
  noMinimizeList: {
    paddingLeft: '25px',
    marginBottom: '10px',
    marginTop: '10px',
    alignItems: 'baseline',
    '& .MuiListItemIcon-root': {
      minWidth: '20px',
      textAlign: 'center',
      marginRight: '10px',
      justifyContent: 'center',
    },
  },
  menu: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    background: '#000000',
    position: 'relative',
    paddingBottom: 66,
    paddingTop: 203,
  },
  noMinimizeMenu: {
    alignItems: 'flex-end',
    flexDirection: 'column',
    paddingBottom: '66px',
  },
  expandEffectMenu: {
    background: 'none',
  },
  minimizeMenu: {
    background: Colors.black_card,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 72,
    // width: 50,
  },
  icon: {},
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
    right: 0,
    maxWidth: 180,
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
  noMinimizeMenuWrap: {
    width: '180px',
  },
  menuWrap: {
    overflowY: 'auto',
    height: '100%',
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
      backgroundColor: '#222222',
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
  wrap_footer: {
    paddingLeft: 17,
  },
  linkTag: {
    textDecoration: 'none',
  },
}))

const ListItem = withStyles({
  root: {
    '& .MuiListItemIcon-root': {
      color: '#B6B6B6',
      '& .MuiIcon-root': {
        width: 'auto',
      },
    },
    '&$selected': {
      backgroundColor: 'transparent',
      color: Colors.primary,
      borderRight: `2px solid ${Colors.primary}`,
      '& .MuiListItemIcon-root': {
        color: Colors.primary,
        '& .icon_svg': {
          filter: 'invert(45%) sepia(49%) saturate(3416%) hue-rotate(313deg) brightness(100%) contrast(104%)',
        },
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
  isExpandEffect: false,
}

export default StreamSideMenu
