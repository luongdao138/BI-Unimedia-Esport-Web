import React, { ReactNode, useState } from 'react'
import { Header } from '@layouts/Header'
import { Footer } from '@layouts/Footer'
import { ESDrawer } from '@layouts/Drawer'
import useProfileValid from '@utils/hooks/useProfileValid'

interface PlainLayoutProps {
  children: ReactNode
  noFooter: boolean
}

const PlainLayout: React.FC<PlainLayoutProps> = ({ children, noFooter }) => {
  const [open, setOpen] = useState<boolean>(false)
  useProfileValid()

  const toggleDrawer = (open: boolean) => {
    setOpen(open)
  }

  return (
    <div>
      <Header open={open} toggleDrawer={toggleDrawer} />
      <div className="plain-main">{children}</div>
      {!noFooter && <Footer dark />}
      <ESDrawer toggleDrawer={toggleDrawer} open={open} />
    </div>
  )
}

PlainLayout.defaultProps = {
  noFooter: false,
}

export default PlainLayout
