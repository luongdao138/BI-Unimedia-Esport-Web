import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import Icon from '@material-ui/core/Icon'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import SearchArea from '@containers/SearchArea'
import { searchOptions } from '@constants/common.constants'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getIsAuthenticated } from '@store/auth/selectors'
import { useAppSelector, useAppDispatch } from '@store/hooks'
import ESButton from '@components/Button'
import { ESRoutes } from '@constants/route.constants'
import useReturnHref from '@utils/hooks/useReturnHref'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import LoginContainer from '@containers/Login'
import IntroContainer from '@containers/Login/Intro'
import ForgotContainer from '@containers/ForgotPassword'
import ForgotConfirmContainer from '@containers/ForgotConfirm'
import ResetPasswordContainer from '@containers/ResetPassword'
import RegisterContainer from '@containers/Register'
import RegisterByEmailContainer from '@containers/RegisterByEmail'
import ConfirmContainer from '@containers/Confirm'
import RegisterProfileContainer from '@containers/RegisterProfile'
import UserSettingsContainer from '@containers/UserSettings'
import { useContextualRouting } from 'next-use-contextual-routing'
import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import NotificationBadgeListContainer from '@containers/Notifications/notificationBadgeList'
import { getNotificationBadge } from '@store/notification/actions'
import { getNotificationBadge as selector } from '@store/notification/selectors'

const useStyles = makeStyles((theme) => ({
  dropDownMenu: {
    position: 'relative',
    '&:hover $dropDownContent': {
      width: 'auto',
      display: 'block',
      visiblity: 'visible',
      opocity: 1,
      transition: 'all 0.5s ease',
      height: 'auto',
    },
  },
  dropDownContent: {
    width: 0,
    overflow: 'hidden',
    visiblity: 'hidden',
    opocity: 0,
    position: 'absolute',
    background: 'black',
    right: 0,
    height: 0,
    willChange: 'all',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  grow: { flexGrow: 1 },
  appBar: {
    background: '#000',
    borderBottom: 'solid 1px #70707070',
  },
  toolbar: {
    minHeight: 60,
    justifyContent: 'space-between',
    paddingLeft: 0,
    paddingRight: 0,
  },
  badge: {
    fontSize: 4,
  },
  icon: {
    fontSize: 22,
  },
  search: {},
  toolArea: {},
  button: {
    padding: 10,
  },
  [theme.breakpoints.down('md')]: {
    icon: {
      fontSize: 18,
    },
  },
  [theme.breakpoints.down('xs')]: {
    icon: {
      fontSize: 16,
    },
    button: {
      padding: 8,
    },
  },
}))

interface returnItem {
  value: string
  type: number
}

interface headerProps {
  toggleDrawer: (open: boolean) => void
  open: boolean
}

export const Header: React.FC<headerProps> = ({ toggleDrawer, open }) => {
  const router = useRouter()
  const classes = useStyles()
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const { handleReturn } = useReturnHref()
  const { makeContextualHref } = useContextualRouting()
  const dispatch = useAppDispatch()
  const badge = useAppSelector(selector)

  const onSearch = (_data: returnItem) => {
    //ignore @typescript-eslint/no-empty-function
    router.push({
      pathname: '/search',
      search: `?type=${_data.type}&keyword=${_data.value}`,
    })
  }

  const openModal = () => router.push(makeContextualHref({ pathName: ESRoutes.WELCOME }), ESRoutes.WELCOME, { shallow: true })

  const renderContent = () => {
    switch (router.query.pathName) {
      case ESRoutes.LOGIN:
        return <LoginContainer />
      case ESRoutes.WELCOME:
        return <IntroContainer />
      case ESRoutes.FORGOT_PASSWORD:
        return <ForgotContainer />
      case ESRoutes.FORGOT_PASSWORD_CONFIRM:
        return <ForgotConfirmContainer />
      case ESRoutes.FORGOT_PASSWORD_RESET:
        return <ResetPasswordContainer />
      case ESRoutes.REGISTER:
        return <RegisterContainer />
      case ESRoutes.REGISTER_BY_EMAIL:
        return <RegisterByEmailContainer />
      case ESRoutes.REGISTER_CONFIRM:
        return <ConfirmContainer />
      case ESRoutes.REGISTER_PROFILE:
        return <RegisterProfileContainer />
      case ESRoutes.USER_SETTINGS:
        return <UserSettingsContainer />
      default:
        break
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getNotificationBadge())
    }
  }, [isAuthenticated])

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar} position="fixed">
        <Container maxWidth="lg" className="header-container">
          <Toolbar className={classes.toolbar}>
            <div
              onClick={() => toggleDrawer(!open)}
              className={`hamburger hamburger--slider js-hamburger mobile-toggle ${open ? 'is-active' : ''}`}
              id="toggle"
            >
              <div className="hamburger-box">
                <div className="hamburger-inner"></div>
              </div>
            </div>
            <Link href="/">
              <img style={{ cursor: 'pointer' }} src="/images/logo.svg" />
            </Link>
            <div className={classes.search + ' search-area'}>
              <SearchArea selectData={searchOptions} onSearch={onSearch} />
            </div>
            <div className={classes.toolArea}>
              {isAuthenticated ? (
                <>
                  <IconButton className={`visible-mobile ${classes.button}`} disableRipple color="inherit">
                    <Icon className={`fa fa-search ${classes.icon}`} />
                  </IconButton>
                  <Box className={classes.dropDownMenu}>
                    <IconButton className={classes.button} disableRipple color="inherit">
                      <Badge badgeContent={badge?.badge} color="primary" className={classes.badge}>
                        <Icon className={`fa fa-bell ${classes.icon}`} />
                      </Badge>
                    </IconButton>
                    <Box className={classes.dropDownContent}>
                      <NotificationBadgeListContainer />
                    </Box>
                  </Box>
                  <IconButton className={`visible-mobile ${classes.button}`} disableRipple color="inherit">
                    <Badge badgeContent={17} color="primary" className={classes.badge}>
                      <Icon className={`fa fa-inbox ${classes.icon}`} />
                    </Badge>
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton className={`visible-mobile ${classes.button}`} disableRipple color="inherit">
                    <Icon className={`fa fa-search ${classes.icon}`} />
                  </IconButton>
                  <ESButton variant="contained" color="primary" onClick={openModal}>
                    ログイン
                  </ESButton>
                </>
              )}
            </div>
            <ESModal open={!!router.query.pathName} handleClose={handleReturn}>
              <BlankLayout>{renderContent()}</BlankLayout>
            </ESModal>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}
