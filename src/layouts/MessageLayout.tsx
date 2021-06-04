import React, { useState, useContext } from 'react'
import { Header } from '@layouts/Header'
import { ESDrawer } from '@layouts/Drawer'
import SideMenu from '@containers/SideMenu'
import { ESRoutes } from '@constants/route.constants'
import { Box } from '@material-ui/core'
import ChatRoomList from '@containers/ChatRoomList'
import { IconButton, Icon, makeStyles, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import Button from '@components/Button'
import { useRouter } from 'next/router'
import { RouteContext } from 'pages/_app'

const MessageLayout: React.FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [showList, setShowList] = useState<boolean>(false)
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation(['common'])
  const { previousRoute } = useContext(RouteContext)

  const toggleDrawer = (open: boolean) => {
    setOpen(open)
  }

  const toggleRoom = (open: boolean) => {
    setShowList(open)
  }

  const backHandler = (e: React.MouseEvent) => {
    e.preventDefault
    router.push(previousRoute)
  }
  const navigateRoomCreate = () => {
    router.push(ESRoutes.MESSAGE_ROOM_CREATE, undefined, { shallow: true })
  }

  return (
    <div className="main-wrapper">
      <Header open={open} toggleDrawer={toggleDrawer} />
      <aside className="aside-left mui-fixed">
        <SideMenu />
      </aside>
      <main role="main" className={'chat-main main'}>
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
            <Box className="header-second-column">
              <Box className="mobile-arrow-room">
                <IconButton className={classes.iconButton} disableRipple onClick={() => toggleRoom(true)}>
                  <Icon className={`fa fa-arrow-left ${classes.icon}`} />
                </IconButton>
                <Typography variant="body1" className={classes.headerTitle}>
                  {t('common:chat.back_list')}
                </Typography>
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
}))

MessageLayout.defaultProps = {
  patternBg: true,
}

export default MessageLayout
