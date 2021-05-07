import React from 'react'
import { Header } from '@layout/Header'
import SideMenu from '@containers/SideMenu'

interface MainLayoutProps {
  patternBg: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, patternBg }) => {
  return (
    <div>
      <Header />
      <div className={patternBg ? 'main' : 'no-pattern'}>
        <aside className="aside-left">
          <SideMenu />
        </aside>
        <div className="content-wrapper">{children}</div>
        <aside className="aside-right">
          <div>right</div>
          <div className="back-drop"></div>
        </aside>
      </div>
    </div>
  )
}

MainLayout.defaultProps = {
  patternBg: true,
}

export default MainLayout
