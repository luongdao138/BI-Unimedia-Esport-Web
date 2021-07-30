/* eslint-disable @typescript-eslint/ban-types */
import { ESRoutes } from '@constants/route.constants'
import { getHasEmail, getIsAuthenticated, getIsRegistered } from '@store/auth/selectors'
import { useAppSelector } from '@store/hooks'
import { useRouter } from 'next/router'
import React, { ComponentType, useState, useEffect } from 'react'
import useReturnHref from './hooks/useReturnHref'

export function withNoAuth<T extends object>(Component: ComponentType<T>): React.FC {
  const AppWithAuth: React.FC<T> = (props) => {
    const { navigateScreen } = useReturnHref()
    const isAuth = useAppSelector(getIsAuthenticated)
    const isRegistered = useAppSelector(getIsRegistered)
    const hasEmail = useAppSelector(getHasEmail)
    const router = useRouter()
    const [render, setRender] = useState(false)
    useEffect(() => {
      if (isRegistered) {
        navigateScreen(ESRoutes.HOME)
      } else if (isAuth) {
        if (router.pathname === ESRoutes.REGISTER_PROFILE) {
          setRender(true)
        }
        navigateScreen(ESRoutes.REGISTER_PROFILE)
      } else {
        switch (router.pathname) {
          case ESRoutes.REGISTER:
          case ESRoutes.REGISTER_BY_EMAIL:
          case ESRoutes.FORGOT_PASSWORD:
            setRender(true)
            break
          case ESRoutes.FORGOT_PASSWORD_RESET:
          case ESRoutes.REGISTER_CONFIRM:
          case ESRoutes.FORGOT_PASSWORD_CONFIRM: {
            if (hasEmail) {
              setRender(true)
            } else {
              navigateScreen(ESRoutes.LOGIN)
            }
            break
          }
          // case ESRoutes.REGISTER_PROFILE: {
          //   if (isAuth && !isRegistered) {
          //     setRender(true)
          //   } else {
          //     router.push(ESRoutes.LOGIN)
          //   }
          //   break
          // }

          default:
            navigateScreen(ESRoutes.HOME)
            break
        }
      }
    }, [isAuth])

    if (!render) {
      return <></>
    }
    return <Component {...props} />
  }

  return AppWithAuth
}

export default withNoAuth
