import axios from 'axios'
import { Button, ButtonProps } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import { LoginSocialParams } from '@services/auth.service'

const useStyles = makeStyles((theme) => ({
  contained: {
    minWidth: 280,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    background: '#1D9BF0',
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
      background: '#1785d0',
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
    backgroundColor: '#1D9BF0 !important',
    color: '#FFF !important',
  },
}))

const ESButtonTwitter: React.FC<ButtonProps> = ({ classes: _classes, ...rest }) => {
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
      startIcon={<Icon className="fab fa-twitter" />}
    >
      {t('common:button.twitter')}
    </Button>
  )
}

ESButtonTwitter.defaultProps = {
  variant: 'contained',
}

type TwitterButtonProps = { onSuccess?: (param: LoginSocialParams) => void } & ButtonProps

const TwitterButton: React.FC<TwitterButtonProps> = ({ onSuccess, ...rest }) => {
  const handleAuthorize = async () => {
    const popup = openPopup()
    try {
      const { data } = await axios.get<{
        oauth_token: string
      }>('/api/twitter/oauth_token')
      popup.location.replace(`https://api.twitter.com/oauth/authorize?oauth_token=${data.oauth_token}`)
      polling(popup)
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  const openPopup = () => {
    const w = 600
    const h = 600
    const left = screen.width / 2 - w / 2
    const top = screen.height / 2 - h / 2

    return window.open(
      '',
      '',
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
        w +
        ', height=' +
        h +
        ', top=' +
        top +
        ', left=' +
        left
    )
  }

  const polling = (popup) => {
    const polling = setInterval(async () => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(polling)
        console.error(new Error('Popup has been closed by user'))
      }

      const closeDialog = () => {
        clearInterval(polling)
        popup.close()
      }
      try {
        if (!popup.location.hostname.includes('api.twitter.com')) {
          if (popup.location.search) {
            closeDialog()
            const { data } = await axios.post<{
              access_token: string
              access_token_secret: string
            }>('/api/twitter/token', { data: popup.location.search })
            !!onSuccess && onSuccess({ social_channel: 'twitter', ...data })
          }
        }
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }, 500)
  }

  return <ESButtonTwitter onClick={handleAuthorize} {...rest} />
}
export default TwitterButton
