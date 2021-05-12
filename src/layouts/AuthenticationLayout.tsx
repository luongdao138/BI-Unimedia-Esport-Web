import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { useAppSelector } from '@store/hooks'
import { getHasEmail, getIsAuthenticated } from '@store/auth/selectors'
import { useRouter } from 'next/router'

const AuthenticationLayout: React.FC = ({ children }) => {
  const classes = useStyles()
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const hasEmail = useAppSelector(getHasEmail)
  const router = useRouter()
  const { pathname } = useRouter()

  useEffect(() => {
    if (isAuthenticated) router.push('/home')
    else if (!hasEmail && pathname === '/register/confirm') router.push('/register/by-email')
    else if (!hasEmail && (pathname === '/forgot-password/confirm' || pathname === '/forgot-password/reset'))
      router.push('/forgot-password')
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
