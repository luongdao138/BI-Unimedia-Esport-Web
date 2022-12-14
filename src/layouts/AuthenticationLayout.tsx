import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { useAppSelector } from '@store/hooks'
import { getHasEmail, getIsAuthenticated, getProfileDone, getIsRegistered } from '@store/auth/selectors'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useReturnHref from '@utils/hooks/useReturnHref'

const AuthenticationLayout: React.FC = ({ children }) => {
  const classes = useStyles()
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const isProfileDone = useAppSelector(getProfileDone)
  const isRegistered = useAppSelector(getIsRegistered)
  const hasEmail = useAppSelector(getHasEmail)
  const { pathname } = useRouter()
  const { navigateScreen } = useReturnHref()
  useEffect(() => {
    if (isAuthenticated && isProfileDone) navigateScreen(ESRoutes.HOME)
    else if (!hasEmail && pathname === ESRoutes.FORGOT_PASSWORD_RESET) navigateScreen(ESRoutes.FORGOT_PASSWORD)
    else if (isAuthenticated && !isRegistered) navigateScreen(ESRoutes.REGISTER_PROFILE)
  }, [isAuthenticated])

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
