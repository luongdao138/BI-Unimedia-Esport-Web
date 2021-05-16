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
import { useAppSelector } from '@store/hooks'
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
import { useState } from 'react'
import { Typography, Popover } from '@material-ui/core'
import NotificationContainer from '@containers/Notifications'

const useStyles = makeStyles((theme) => ({
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
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const openNotif = Boolean(anchorEl)

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
                  <Typography
                    aria-owns={openNotif ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    Hover with a Popover.
                  </Typography>
                  <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                      paper: classes.paper,
                    }}
                    open={openNotif}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <NotificationContainer />
                  </Popover>
                  <IconButton className={`visible-mobile ${classes.button}`} disableRipple color="inherit">
                    <Icon className={`fa fa-search ${classes.icon}`} />
                  </IconButton>
                  <IconButton className={classes.button} disableRipple color="inherit">
                    <Badge badgeContent={17} color="primary" className={classes.badge}>
                      <Icon className={`fa fa-bell ${classes.icon}`} />
                    </Badge>
                  </IconButton>
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
