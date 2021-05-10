import React from 'react'
import { Header } from '@layouts/Header'
import { Footer } from '@layouts/Footer'
import SideMenu from '@containers/SideMenu'

interface MainLayoutProps {
  patternBg?: boolean
  footer?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, patternBg, footer }) => {
  return (
    <div>
      <Header />
      <div className={patternBg ? 'main' : 'no-pattern'}>
        <aside className="aside-left">
          <SideMenu />
        </aside>
        <div className="content-wrapper">
          <div>
            {children}
            {footer ? <Footer /> : ''}
          </div>
        </div>
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
  footer: true,
}

export default MainLayout
