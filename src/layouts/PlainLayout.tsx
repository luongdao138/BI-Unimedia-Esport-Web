import React, { ReactNode, useState, useEffect } from 'react'
import { Header } from '@layouts/Header'
import { Footer } from '@layouts/Footer'
import { ESDrawer } from '@layouts/Drawer'
import * as selectors from '@store/common/selectors'
import NotFoundView from '@components/NotFoundView'
import { setNotFound } from '@store/common/actions/index'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useRouter } from 'next/router'
import useProfileValid from '@utils/hooks/useProfileValid'

interface PlainLayoutProps {
  children: ReactNode
  noFooter?: boolean
  patternBg?: boolean
}

const PlainLayout: React.FC<PlainLayoutProps> = ({ children, noFooter, patternBg }) => {
  const [open, setOpen] = useState<boolean>(false)
  useProfileValid()

  const dispatch = useAppDispatch()
  const notFound = useAppSelector(selectors.getNotFound)
  const router = useRouter()

  useEffect(() => {
    dispatch(setNotFound({ notFound: null }))
  }, [router.pathname])

  const toggleDrawer = (open: boolean) => {
    setOpen(open)
  }

  const showContent = notFound === null
  return (
    <div>
      <Header open={open} toggleDrawer={toggleDrawer} />
      {showContent ? null : <NotFoundView notFoundType={notFound} topSpace />}
      <div className={patternBg ? 'plain-main' : 'plain-main no-pattern'}>
        <div className="content-wrapper">
          <div style={showContent ? undefined : { display: 'none' }}>{children}</div>
        </div>
      </div>
      {!noFooter && <Footer dark />}
      <ESDrawer toggleDrawer={toggleDrawer} open={open} />
    </div>
  )
}

PlainLayout.defaultProps = {
  noFooter: false,
  patternBg: false,
}

export default PlainLayout
