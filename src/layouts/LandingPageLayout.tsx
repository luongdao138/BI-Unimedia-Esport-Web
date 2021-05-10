import React from 'react'
import { Header } from '@layouts/Header'

const LandingPageLayout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="lp-main">{children}</div>
    </div>
  )
}

LandingPageLayout.defaultProps = {}

export default LandingPageLayout
