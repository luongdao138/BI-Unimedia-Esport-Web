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

interface StreamLayoutProps {
  patternBg?: boolean
  footer?: boolean
  loginRequired?: boolean
  isStreamer?: boolean
}

const StreamLayout: React.FC<StreamLayoutProps> = ({ children, patternBg, footer, loginRequired, isStreamer }) => {
  const [open, setOpen] = useState<boolean>(false)
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const dispatch = useAppDispatch()
  const notFound = useAppSelector(selectors.getNotFound)
  useProfileValid()
  const router = useRouter()
  useLogout()
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))

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
    <div className="main_wrapper">
      <Header open={open} toggleDrawer={toggleDrawer} />
      {isStreamer ? (
        <>
          <aside className="streamer_aside_left stream_fixed_menu">
            <StreamSideMenu minimizeLayout={false} isStreamer={true} />
          </aside>
          <main role="streamer_main" className={patternBg ? 'streamer_main' : 'streamer_main no-pattern'}>
            <div className="streamer_content_wrapper">
              <div className="streamer_content">{renderContent()}</div>
              {footer ? <Footer /> : ''}
            </div>
            <aside className="streamer_aside_right"></aside>
          </main>
        </>
      ) : (
        <>
          <aside className="not_streamer_aside_left">
            <Box onMouseOver={() => toggleDrawer(true)}>
              <StreamSideMenu minimizeLayout={true} isStreamer={false} />
            </Box>
          </aside>
          <main role="not_streamer_main" className="not_streamer_main">
            <div className="not_streamer_content_wrapper">
              <div className="not_streamer_content">{renderContent()}</div>
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
  loginRequired: false,
  isStreamer: true,
}

export default StreamLayout
