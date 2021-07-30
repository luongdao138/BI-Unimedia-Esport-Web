/* eslint-disable @typescript-eslint/ban-types */
import { ESRoutes } from '@constants/route.constants'
import { getHasEmail, getIsAuthenticated } from '@store/auth/selectors'
import { useAppSelector } from '@store/hooks'
import { useRouter } from 'next/router'
import React, { ComponentType, useState, useEffect } from 'react'

export function withNoAuth<T extends object>(Component: ComponentType<T>, fallback?: string): React.FC {
  const AppWithAuth: React.FC<T> = (props) => {
    const isAuth = useAppSelector(getIsAuthenticated)
    const hasEmail = useAppSelector(getHasEmail)
    const router = useRouter()
    const [render, setRender] = useState(false)

    useEffect(() => {
      if (isAuth) {
        router.push(ESRoutes.HOME)
      } else if (!hasEmail && fallback) {
        router.push(fallback)
      } else {
        setRender(true)
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
