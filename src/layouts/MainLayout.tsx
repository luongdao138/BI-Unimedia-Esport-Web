import React, { useState } from 'react'
import { Header } from '@layouts/Header'
import { Footer } from '@layouts/Footer'
import { ESDrawer } from '@layouts/Drawer'
import SideMenu from '@containers/SideMenu'
import ChatSideBar from '@containers/ChatSideBar'

interface MainLayoutProps {
  patternBg?: boolean
  footer?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, patternBg, footer }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [expand, setExpand] = useState<boolean>(false)

  const toggleDrawer = (open: boolean) => {
    setOpen(open)
  }

  const toggleChatBar = (state: boolean) => {
    setExpand(state)
  }

  return (
    <div className="main-wrapper">
      <Header open={open} toggleDrawer={toggleDrawer} />
      <aside className="aside-left mui-fixed">
        <SideMenu />
      </aside>
      <main role="main" className={patternBg ? 'main' : 'no-pattern'}>
        <div className="content-wrapper">
          {children}
          {footer ? <Footer /> : ''}
        </div>
        <aside className="aside-right">
          <ChatSideBar expand={expand} toggleChatBar={toggleChatBar} />
          <div className="back-drop"></div>
        </aside>
      </main>
      <ESDrawer toggleDrawer={toggleDrawer} open={open} />
    </div>
  )
}

MainLayout.defaultProps = {
  patternBg: true,
  footer: true,
}

export default MainLayout
