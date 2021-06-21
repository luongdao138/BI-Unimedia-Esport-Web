import React from 'react'
import { useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { useContextualRouting } from 'next-use-contextual-routing'

const LoginRequired: React.FC = ({ children }) => {
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()
  const isAuthenticated = useAppSelector(getIsAuthenticated)

  const handleAuthenticated = (onClick?: () => void) => {
    if (!isAuthenticated) {
      router.push(makeContextualHref({ pathName: ESRoutes.WELCOME }), ESRoutes.WELCOME, { shallow: true })
    } else {
      if (onClick) onClick()
    }
  }

  const handleLink = (href: string) => {
    if (!isAuthenticated) {
      return makeContextualHref({ pathName: ESRoutes.WELCOME })
    }

    return href
  }

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.props.href) {
            return React.cloneElement(child, {
              href: handleLink(child.props.href),
              as: isAuthenticated ? child.props.href : ESRoutes.WELCOME,
            })
          }

          return React.cloneElement(child, { onClick: () => handleAuthenticated(child.props.onClick) })
        }
        return child
      })}
    </>
  )
}

export default LoginRequired
