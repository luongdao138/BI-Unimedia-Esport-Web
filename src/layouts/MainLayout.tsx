import React, { useState } from 'react'
import { Header } from '@layouts/Header'
import { Footer } from '@layouts/Footer'
import { ESDrawer } from '@layouts/Drawer'
import ESToast from '@components/Toast'
import { useTranslation } from 'react-i18next'
import SideMenu from '@containers/SideMenu'
import ChatSideBar from '@containers/ChatSideBar'
import useProfileValid from '@utils/hooks/useProfileValid'
import useMainLayoutMeta from '@utils/hooks/useMainLayoutMeta'

interface MainLayoutProps {
  patternBg?: boolean
  footer?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, patternBg, footer }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [expand, setExpand] = useState<boolean>(false)
  const { t } = useTranslation('common')
  useProfileValid()
  const { metaChangePassword, changePasswordMeta, metaChangeEmailConfirm, changeEmailConfirmMeta } = useMainLayoutMeta()

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
      <main role="main" className={patternBg ? 'main' : 'main no-pattern'}>
        <div className="content-wrapper">
          <div className="content">{children}</div>
          {footer ? <Footer /> : ''}
        </div>
        <aside className="aside-right">
          <ChatSideBar expand={expand} toggleChatBar={toggleChatBar} />
        </aside>
      </main>
      <ESDrawer toggleDrawer={toggleDrawer} open={open} />
      {metaChangePassword.loaded && (
        <ESToast open={metaChangePassword.loaded} message={t('account_settings.change_password_success')} resetMeta={changePasswordMeta} />
      )}
      {metaChangeEmailConfirm.loaded && (
        <ESToast
          open={metaChangeEmailConfirm.loaded}
          message={t('account_settings.change_email_success')}
          resetMeta={changeEmailConfirmMeta}
        />
      )}
    </div>
  )
}

MainLayout.defaultProps = {
  patternBg: true,
  footer: true,
}

export default MainLayout
