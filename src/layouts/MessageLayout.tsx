import React, { useState, useContext, useEffect } from 'react'
import { Header } from '@layouts/Header'
import { ESDrawer } from '@layouts/Drawer'
import SideMenu from '@containers/SideMenu'
import { ESRoutes } from '@constants/route.constants'
import { Box } from '@material-ui/core'
import ChatRoomList from '@containers/ChatRoomList'
import { IconButton, Icon, makeStyles, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import Button from '@components/Button'
import { useRouter } from 'next/router'
import { RouteContext } from 'pages/_app'
import { use100vh } from 'react-div-100vh'

interface LayoutProps {
  defaultListState?: boolean
  create?: boolean
}

const MessageLayout: React.FC<LayoutProps> = ({ children, defaultListState, create }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [showList, setShowList] = useState<boolean>(defaultListState)
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation(['common'])
  const { previousRoute } = useContext(RouteContext)
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const height = use100vh()

  const toggleDrawer = (open: boolean) => {
    setOpen(open)
  }

  const toggleRoom = (open: boolean) => {
    setShowList(open)
  }

  const backHandler = (_e: React.MouseEvent) => {
    if (previousRoute) {
      router.push(previousRoute)
    } else {
      router.push(ESRoutes.HOME)
    }
  }
  const navigateRoomCreate = () => {
    if (router.pathname == ESRoutes.MESSAGE_ROOM_CREATE) {
      setShowList(false)
    } else {
      router.push(ESRoutes.MESSAGE_ROOM_CREATE)
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ESRoutes.LOGIN)
    }
  }, [])

  useEffect(() => {
    if (router && router.query && router.query.active) {
      setShowList(true)
    }
  }, [router])

  return (
    <div className="main-wrapper">
      <Header open={open} toggleDrawer={toggleDrawer} />
      <aside className="aside-left mui-fixed">
        <SideMenu />
      </aside>
      <main role="main" className={'chat-main'} style={{ height: `${height}px` }}>
        <div className={`chat-wrapper ${showList ? 'show-list' : ''}`}>
          <Box className="chat-header">
            <Box className="header-first-column">
              <IconButton className={classes.iconButton} disableRipple onClick={backHandler}>
                <Icon className={`fa fa-arrow-left ${classes.icon}`} />
              </IconButton>
              <Typography variant="body1" className={classes.headerTitle}>
                {t('common:chat.title')}
              </Typography>
            </Box>
            <Box className={`header-second-column ${create ? classes.createTrue : null}`}>
              <Box className="mobile-arrow-room">
                <IconButton className={classes.iconButton} disableRipple onClick={() => toggleRoom(true)}>
                  <Icon className={`fa fa-arrow-left ${classes.icon}`} />
                </IconButton>
              </Box>
              <Button
                size="small"
                variant="outlined"
                className={`room-create-button ${classes.create}`}
                round
                startIcon={<Icon style={{ fontSize: 10, color: Colors.white }} className={`fa fa-plus`} />}
                onClick={() => navigateRoomCreate()}
              >
                {t('common:chat.create_new')}
              </Button>
            </Box>
          </Box>
          <Box className="chat-flex">
            <Box className="room-list-column">
              <ChatRoomList listCliked={() => toggleRoom(false)} />
            </Box>
            <Box className="room-column">{children}</Box>
          </Box>
        </div>
      </main>
      <ESDrawer toggleDrawer={toggleDrawer} open={open} />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 12,
    color: theme.palette.text.primary,
  },
  iconButton: {
    backgroundColor: theme.palette.text.secondary,
    marginRight: 14,
  },
  headerTitle: {
    color: Colors.white,
    display: 'inline-block',
  },
  create: {
    marginLeft: 'auto',
  },
  createTrue: {},
  [theme.breakpoints.down('sm')]: {
    createTrue: {
      borderBottom: '0 none',
    },
  },
}))

MessageLayout.defaultProps = {
  defaultListState: false,
  create: false,
}

export default MessageLayout
