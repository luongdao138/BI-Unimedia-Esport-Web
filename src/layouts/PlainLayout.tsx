import React, { ReactNode, useState, useEffect } from 'react'
import { Header } from '@layouts/Header'
import { Footer } from '@layouts/Footer'
import { ESDrawer } from '@layouts/Drawer'
import * as selectors from '@store/common/selectors'
import { setNotFound } from '@store/common/actions/index'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useRouter } from 'next/router'
import useProfileValid from '@utils/hooks/useProfileValid'
import { ESRoutes } from '@constants/route.constants'

interface PlainLayoutProps {
  children: ReactNode
  noFooter?: boolean
  patternBg?: boolean
}

const PlainLayout: React.FC<PlainLayoutProps> = ({ children, noFooter, patternBg }) => {
  const [open, setOpen] = useState<boolean>(false)
  const { isValidProfile, isAuth } = useProfileValid()

  const dispatch = useAppDispatch()
  const notFound = useAppSelector(selectors.getNotFound)
  const router = useRouter()

  useEffect(() => {
    dispatch(setNotFound({ notFound: null }))
  }, [router.pathname])

  useEffect(() => {
    if (notFound !== null && router.query.hash_key) {
      router.push(ESRoutes.ARENA_DETAIL.replace(/:id/gi, `${router.query.hash_key}`))
    }
  }, [notFound, router.query.hash_key])

  const toggleDrawer = (open: boolean) => {
    setOpen(open)
  }
  if (!isValidProfile && isAuth) return null
  return (
    <div>
      <Header open={open} toggleDrawer={toggleDrawer} />
      <div className={patternBg ? 'plain-main' : 'plain-main no-pattern'}>
        <div className="content-wrapper">
          <div>{children}</div>
        </div>
      </div>
      {!noFooter && <Footer />}
      <ESDrawer toggleDrawer={toggleDrawer} open={open} />
    </div>
  )
}

PlainLayout.defaultProps = {
  noFooter: false,
  patternBg: false,
}

export default PlainLayout
