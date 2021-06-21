import React, { useState, useEffect } from 'react'
import { Header } from '@layouts/Header'
import { Footer } from '@layouts/Footer'
import { ESDrawer } from '@layouts/Drawer'
import SideMenu from '@containers/SideMenu'
import ChatSideBar from '@containers/ChatSideBar'
import useProfileValid from '@utils/hooks/useProfileValid'
import { useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useLogout from '@containers/Logout/useLogout'

interface MainLayoutProps {
  patternBg?: boolean
  footer?: boolean
  loginRequired?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, patternBg, footer, loginRequired }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [expand, setExpand] = useState<boolean>(false)
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  useProfileValid()
  const router = useRouter()
  useLogout()

  const toggleDrawer = (open: boolean) => {
    setOpen(open)
  }

  const toggleChatBar = (state: boolean) => {
    setExpand(state)
  }

  useEffect(() => {
    if (loginRequired && !isAuthenticated) {
      router.push(ESRoutes.TOP)
    }
  }, [loginRequired])

  if (loginRequired && !isAuthenticated) return null

  return (
    <div className="main-wrapper">
      <Header open={open} toggleDrawer={toggleDrawer} />
      <aside className="aside-left mui-fixed">
        <SideMenu />
      </aside>
      <main role="main" className={patternBg ? 'main' : 'main no-pattern'}>
        <div className="content-wrapper">
          <div className="content">{loginRequired ? isAuthenticated && children : children}</div>
          {footer ? <Footer /> : ''}
        </div>
        <aside className="aside-right">{loginRequired ? <ChatSideBar expand={expand} toggleChatBar={toggleChatBar} /> : null}</aside>
      </main>
      <ESDrawer toggleDrawer={toggleDrawer} open={open} />
    </div>
  )
}

MainLayout.defaultProps = {
  patternBg: true,
  footer: true,
  loginRequired: false,
}

export default MainLayout
