import React, { useState, useEffect, ReactNode } from 'react'
import { Header } from '@layouts/Header'
import { ESDrawer } from '@layouts/Drawer'
import SideMenu from '@containers/SideMenu'
import ChatSideBar from '@containers/ChatSideBar'
import useProfileValid from '@utils/hooks/useProfileValid'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useLogout from '@containers/Logout/useLogout'
import * as selectors from '@store/common/selectors'
import { setNotFound } from '@store/common/actions/index'
import { use100vh } from 'react-div-100vh'
interface MainLayoutProps {
  patternBg?: boolean
  loginRequired?: boolean
  adsOption?: boolean
  childrenAds?: ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, patternBg, loginRequired, adsOption, childrenAds }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [expand, setExpand] = useState<boolean>(false)
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const dispatch = useAppDispatch()
  const notFound = useAppSelector(selectors.getNotFound)
  const { isValidProfile } = useProfileValid()
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
      router.push(ESRoutes.LOGIN)
    }
  }, [loginRequired])

  useEffect(() => {
    dispatch(setNotFound({ notFound: null }))
  }, [router.pathname])

  useEffect(() => {
    if (notFound !== null && router.query.hash_key) {
      router.push(ESRoutes.ARENA_DETAIL.replace(/:id/gi, `${router.query.hash_key}`))
    }
  }, [notFound, router.query.hash_key])

  const renderContent = () => {
    return loginRequired ? isAuthenticated && children : children
  }
  const height = use100vh()

  return loginRequired && !isValidProfile ? null : (
    <div className="main-wrapper">
      <Header open={open} toggleDrawer={toggleDrawer} />
      <aside className="aside-left">
        <SideMenu />
      </aside>
      <main role="main" className={patternBg ? 'main' : 'main no-pattern'} style={{ minHeight: height }}>
        <div className="content-wrapper" id="content-main">
          <div className={'content'}>{renderContent()}</div>
          {adsOption && childrenAds}
        </div>
        <aside className="aside-right">{isAuthenticated ? <ChatSideBar expand={expand} toggleChatBar={toggleChatBar} /> : null}</aside>
      </main>
      <ESDrawer toggleDrawer={toggleDrawer} open={open} />
    </div>
  )
}

MainLayout.defaultProps = {
  patternBg: true,
  loginRequired: false,
}

export default MainLayout
