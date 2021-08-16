import React, { useState, useEffect } from 'react'
import { Header } from '@layouts/Header'
import { Footer } from '@layouts/Footer'
import { StreamDrawer } from '@layouts/StreamDrawer'
import StreamSideMenu from '@containers/StreamSideMenu'
import useProfileValid from '@utils/hooks/useProfileValid'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useLogout from '@containers/Logout/useLogout'
import * as selectors from '@store/common/selectors'
import { setNotFound } from '@store/common/actions/index'
import { Box } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import useGetProfile from '@utils/hooks/useGetProfile'

interface StreamLayoutProps {
  patternBg?: boolean
  footer?: boolean
  loginRequired?: boolean
  minimizeLayout?: boolean
}

const StreamLayout: React.FC<StreamLayoutProps> = ({ children, patternBg, footer, loginRequired, minimizeLayout }) => {
  const [open, setOpen] = useState<boolean>(false)
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const dispatch = useAppDispatch()
  const notFound = useAppSelector(selectors.getNotFound)
  useProfileValid()
  const router = useRouter()
  useLogout()
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))

  const { userProfile } = useGetProfile()
  const isStreamer = userProfile?.attributes?.delivery_flag || false

  const toggleDrawer = (open: boolean) => {
    setOpen(open)
  }

  useEffect(() => {
    if (loginRequired && !isAuthenticated) {
      router.push(ESRoutes.TOP)
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

  if (loginRequired && !isAuthenticated) return null

  const renderContent = () => {
    return loginRequired ? isAuthenticated && children : children
  }

  return (
    <div className={`main_wrapper ${minimizeLayout ? 'minimize_main_wrapper' : ''}`}>
      <Header open={open} toggleDrawer={toggleDrawer} />
      {!minimizeLayout ? (
        <>
          <aside className="no_minimize_aside_left no_minimize_fixed_menu">
            <StreamSideMenu minimizeLayout={minimizeLayout} isStreamer={isStreamer} />
          </aside>
          <main role="no_minimize_main" className={patternBg ? 'no_minimize_main' : 'no_minimize_main no-pattern'}>
            <div className="no_minimize_content_wrapper">
              <div className="no_minimize_content">{renderContent()}</div>
              {footer ? <Footer /> : ''}
            </div>
            <aside className="no_minimize_aside_right"></aside>
          </main>
        </>
      ) : (
        <>
          <aside className="minimize_aside_left">
            <Box onMouseOver={() => toggleDrawer(true)}>
              <StreamSideMenu minimizeLayout={minimizeLayout} isStreamer={isStreamer} />
            </Box>
          </aside>
          <main role="minimize_main" className="minimize_main">
            <div className="minimize_content_wrapper">
              <div className="minimize_content">{renderContent()}</div>
              {footer ? <Footer /> : ''}
            </div>
          </main>
        </>
      )}

      <StreamDrawer toggleDrawer={toggleDrawer} open={open} isStreamer={isStreamer} downMd={downMd} />
    </div>
  )
}

StreamLayout.defaultProps = {
  patternBg: true,
  footer: true,
  loginRequired: true,
  minimizeLayout: false,
}

export default StreamLayout
