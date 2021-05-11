import React from 'react'
//import { Header } from '@layouts/Header'
import { Footer } from '@layouts/Footer'

const PlainLayout: React.FC = ({ children }) => {
  return (
    <div>
      {/* <Header /> */}
      <div className="plain-main">{children}</div>
      <Footer dark />
    </div>
  )
}

PlainLayout.defaultProps = {}

export default PlainLayout
