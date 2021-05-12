import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { useAppSelector } from '@store/hooks'
import { getHasEmail, getIsAuthenticated } from '@store/auth/selectors'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'

const AuthenticationLayout: React.FC = ({ children }) => {
  const classes = useStyles()
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const hasEmail = useAppSelector(getHasEmail)
  const router = useRouter()
  const { pathname } = useRouter()

  useEffect(() => {
    if (isAuthenticated) router.push(ESRoutes.HOME)
    else if (!hasEmail && pathname === ESRoutes.REGISTER_CONFIRM) router.push(ESRoutes.REGISTER_BY_EMAIL)
    else if (!hasEmail && (pathname === ESRoutes.FORGOT_PASSWORD_CONFIRM || pathname === ESRoutes.FORGOT_PASSWORD_RESET))
      router.push(ESRoutes.FORGOT_PASSWORD)
  }, [])

  return (
    <Container maxWidth={false} className={classes.root}>
      {children}
    </Container>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 622,
  },
}))

export default AuthenticationLayout
