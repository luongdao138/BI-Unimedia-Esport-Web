import React from 'react'
import { Header } from '@layouts/Header'

const PlainLayout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="plain-main">{children}</div>
    </div>
  )
}

PlainLayout.defaultProps = {}

export default PlainLayout
