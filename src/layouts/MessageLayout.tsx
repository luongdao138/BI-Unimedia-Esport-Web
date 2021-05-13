import React, { useState } from 'react'
import { Header } from '@layouts/Header'
import { ESDrawer } from '@layouts/Drawer'
import SideMenu from '@containers/SideMenu'
import { Box } from '@material-ui/core'

const MessageLayout: React.FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)

  const toggleDrawer = (open: boolean) => {
    setOpen(open)
  }

  return (
    <div className="main-wrapper">
      <Header open={open} toggleDrawer={toggleDrawer} />
      <aside className="aside-left mui-fixed">
        <SideMenu />
      </aside>
      <main role="main" className={'chat-main main'}>
        <div className="chat-wrapper">
          <Box className="chat-flex">
            <Box className="room-list-column">RoomListSimilar to Sidebar</Box>
            <Box className="room-column">{children}</Box>
          </Box>
        </div>
      </main>
      <ESDrawer toggleDrawer={toggleDrawer} open={open} />
    </div>
  )
}

MessageLayout.defaultProps = {
  patternBg: true,
}

export default MessageLayout
