import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import Icon from '@material-ui/core/Icon'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import SearchArea from '@containers/SearchArea'
import SearchModal from '@containers/SearchArea/SearchModal'
import { searchOptions } from '@constants/common.constants'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getIsAuthenticated } from '@store/auth/selectors'
import { useAppSelector, useAppDispatch } from '@store/hooks'
import ESButton from '@components/Button'
import { ESRoutes } from '@constants/route.constants'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import { useContextualRouting } from 'next-use-contextual-routing'
import LoginContainer from '@containers/Login'
import IntroContainer from '@containers/Login/Intro'
import ForgotContainer from '@containers/ForgotPassword'
import ResetPasswordContainer from '@containers/ResetPassword'
import RegisterContainer from '@containers/Register'
import RegisterByEmailContainer from '@containers/RegisterByEmail'
import ConfirmContainer from '@containers/Confirm'
import RegisterProfileContainer from '@containers/RegisterProfile'
import UserSettingsContainer from '@containers/UserSettings'
import ArenaCreateContainer from '@containers/arena/UpsertForm'
import AccountSettingsPasswordContainer from '@containers/Settings/Account/Password'
import AccountSettingsChangeEmailContainer from '@containers/Settings/Account/ChangeEmail'
import AccountSettingsConfirmContainer from '@containers/Settings/Account/Confirm'
import AccountSettingsChangePasswordContainer from '@containers/Settings/Account/ChangePassword'
import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import NotificationBadgeListContainer from '@containers/Notifications/notificationBadgeList'
import * as notificationActions from '@store/notification/actions'
import * as notificationSelector from '@store/notification/selectors'
import useSearch from '@containers/Search/useSearch'
import useReturnHref from '@utils/hooks/useReturnHref'
import { unseenCount } from '@store/socket/selectors'

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
  const dispatch = useAppDispatch()
  const badge = useAppSelector(notificationSelector.getNotificationBadge)
  const { setSearch } = useSearch()
  const { navigateScreen } = useReturnHref()
  const { makeContextualHref } = useContextualRouting()
  const chatCount = useAppSelector(unseenCount)

  const onSearch = (_data: returnItem) => {
    setSearch({ type: _data.type, keyword: _data.value })
    router.push(ESRoutes.SEARCH)
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
        return <ConfirmContainer />
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
      case ESRoutes.ARENA_CREATE:
        return <ArenaCreateContainer />
      case ESRoutes.USER_ACCOUNT_SETTINGS_PASSWORD:
        return <AccountSettingsPasswordContainer />
      case ESRoutes.USER_ACCOUNT_SETTINGS_CHANGE_EMAIL:
        return <AccountSettingsChangeEmailContainer />
      case ESRoutes.USER_ACCOUNT_SETTINGS_EMAIL_CONFIRM:
        return <AccountSettingsConfirmContainer />
      case ESRoutes.USER_ACCOUNT_SETTINGS_CHANGE_PASSWORD:
        return <AccountSettingsChangePasswordContainer />
      default:
        return <></>
    }
  }
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(notificationActions.getNotificationBadge())
    }
  }, [isAuthenticated])

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar} position="fixed">
        <Container maxWidth="xl" className="header-container">
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
            <Link href={isAuthenticated ? '/home' : '/'}>
              <img style={{ cursor: 'pointer' }} src="/images/logo.svg" />
            </Link>
            <div className={classes.search + ' search-area'}>
              <SearchArea selectData={searchOptions} onSearch={onSearch} />
            </div>
            <SearchModal show={show} handleClose={() => setShow(false)} selectData={searchOptions} onSearch={onSearch}></SearchModal>
            <div className={classes.toolArea}>
              {isAuthenticated ? (
                <>
                  <IconButton onClick={() => setShow(!show)} className={`visible-mobile ${classes.button}`} disableRipple color="inherit">
                    <Icon className={`fa fa-search ${classes.icon}`} />
                  </IconButton>
                  <Box className={`${classes.dropDownMenu}`}>
                    <IconButton
                      onClick={() => navigateScreen(ESRoutes.NOTIFICATIONS)}
                      className={classes.button}
                      disableRipple
                      color="inherit"
                    >
                      <Badge badgeContent={badge?.badge} color="primary" className={classes.badge}>
                        <Icon className={`fa fa-bell ${classes.icon}`} />
                      </Badge>
                    </IconButton>
                    <Box className={classes.dropDownContent}>
                      <NotificationBadgeListContainer />
                    </Box>
                  </Box>

                  <IconButton
                    onClick={() => router.push(ESRoutes.MESSAGE)}
                    className={`visible-mobile ${classes.button}`}
                    disableRipple
                    color="inherit"
                  >
                    <Badge badgeContent={chatCount} color="primary" className={classes.badge}>
                      <Icon className={`fa fa-inbox ${classes.icon}`} />
                    </Badge>
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton onClick={() => setShow(!show)} className={`visible-mobile ${classes.button}`} disableRipple color="inherit">
                    <Icon className={`fa fa-search ${classes.icon}`} />
                  </IconButton>
                  <ESButton variant="contained" color="primary" onClick={openModal}>
                    ログイン
                  </ESButton>
                </>
              )}
            </div>
            <ESModal open={!!router.query.pathName} handleClose={handleReturn} disableScrollLock={false}>
              <BlankLayout>{renderContent()}</BlankLayout>
            </ESModal>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
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
  toolArea: {
    display: 'flex',
    width: 140,
  },
  button: {
    padding: 10,
  },
  [theme.breakpoints.down('md')]: {
    icon: {
      fontSize: 18,
    },
    toolArea: {
      width: 'auto',
    },
    dropDownMenu: {
    '&:hover $dropDownContent': {
      maxWidth: 315,
    },
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
