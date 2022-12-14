import axios from 'axios'
import { Button, ButtonProps } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  contained: {
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
    borderColor: Colors.white_opacity[30],
    '&:hover': {
      boxShadow: 'none',
      background: '#1D9BF0',
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
    opacity: 0.3,
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
      <div className="esbutton-hover" />
      {t('common:button.twitter')}
    </Button>
  )
}

ESButtonTwitter.defaultProps = {
  variant: 'contained',
}

type TwitterButtonProps = { twitterButtonType: 'login' | 'register'; redirectTo: string | string[] } & ButtonProps

const TwitterButton: React.FC<TwitterButtonProps> = ({ twitterButtonType, redirectTo, ...rest }) => {
  const router = useRouter()
  const handleAuthorize = async () => {
    try {
      const { data } = await axios.get<{
        oauth_token: string
      }>(`/api/twitter/oauth_token?type=${twitterButtonType}&redirect=${redirectTo}`)
      router.push(`https://api.twitter.com/oauth/authorize?oauth_token=${data.oauth_token}`)
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  return <ESButtonTwitter onClick={handleAuthorize} {...rest} />
}
export default TwitterButton
