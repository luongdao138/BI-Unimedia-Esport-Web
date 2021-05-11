import React, { useState } from 'react'
import { Header } from '@layouts/Header'
import { Footer } from '@layouts/Footer'
import { ESDrawer } from '@layouts/Drawer'

const PlainLayout: React.FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)

  const toggleDrawer = (open: boolean) => {
    setOpen(open)
  }

  return (
    <div>
      <Header open={open} toggleDrawer={toggleDrawer} />
      <div className="plain-main">{children}</div>
      <Footer dark />
      <ESDrawer toggleDrawer={toggleDrawer} open={open} />
    </div>
  )
}

PlainLayout.defaultProps = {}

export default PlainLayout
