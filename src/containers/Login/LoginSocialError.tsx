import { Box, Typography } from '@material-ui/core'
import i18n from '@locales/i18n'

const LoginSocialError: React.FC = () => {
  return (
    <Box pb={8}>
      <Box pb={20 / 8} textAlign="center">
        <Typography color="secondary">{i18n.t('common:login.error.title2')}</Typography>
      </Box>
    </Box>
  )
}

export default LoginSocialError
