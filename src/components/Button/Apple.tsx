import { Button, ButtonProps } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import Script from 'react-load-script'
import { LoginSocialParams } from '@services/auth.service'

const useStyles = makeStyles((theme) => ({
  contained: {
    minWidth: 280,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    background: '#212121',
    height: 50,
    boxShadow: 'none',
    color: Colors.white,
    fontWeight: 'bold',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    borderColor: 'rgba(255,255,255,.3)',
    '&:hover': {
      boxShadow: 'none',
      background: '#1b1b1b',
    },
  },
  leftIcon: {
    position: 'absolute',
    left: theme.spacing(3),
  },
  title: {
    justifyContent: 'left',
    marginLeft: theme.spacing(5),
    textTransform: 'capitalize',
  },
  disabled: {
    backgroundColor: '#212121 !important',
    color: '#FFF !important',
  },
}))

const ESButtonApple: React.FC<ButtonProps> = ({ classes: _classes, ...rest }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ...props } = rest

  return (
    <Button
      classes={{
        contained: classes.contained,
        startIcon: classes.leftIcon,
        label: classes.title,
        disabled: classes.disabled,
      }}
      color="primary"
      {...props}
      startIcon={<Icon className="fab fa-apple" />}
    >
      {t('common:button.apple')}
    </Button>
  )
}
ESButtonApple.defaultProps = {
  variant: 'contained',
}

type AppleButtonProps = { onSuccess?: (param: LoginSocialParams) => void } & ButtonProps

declare global {
  interface Window {
    AppleID: {
      auth: {
        init: ({
          clientId,
          scope,
          redirectURI,
          usePopup,
        }: {
          clientId: string
          scope: string
          redirectURI: string
          usePopup: boolean
        }) => void
        signIn: () => Promise<{
          authorization: {
            id_token: string
          }
        }>
      }
    }
  }
}

const AppleButton: React.FC<AppleButtonProps> = ({ onSuccess, ...rest }) => {
  const handleLoadScript = () => {
    window.AppleID.auth.init({
      clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
      scope: 'name email',
      redirectURI: process.env.NEXT_PUBLIC_APPLE_CALLBACK,
      usePopup: true,
    })
  }
  const handleLogin = async () => {
    try {
      const { authorization } = await window.AppleID.auth.signIn()
      !!onSuccess && onSuccess({ social_channel: 'apple', access_token: authorization.id_token })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <ESButtonApple onClick={handleLogin} {...rest} />
      <Script
        url="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        onError={console.error}
        onLoad={handleLoadScript}
      />
    </>
  )
}

export default AppleButton
