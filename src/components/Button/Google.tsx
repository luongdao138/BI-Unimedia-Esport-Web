import { Button, ButtonProps } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'

const useStyles = makeStyles((theme) => ({
  contained: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    background: Colors.white,
    height: 50,
    boxShadow: 'none',
    color: '#4D4D4D',
    fontWeight: 'bold',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    borderColor: 'rgba(255,255,255,.3)',
    '&:hover': {
      boxShadow: 'none',
      opacity: 0.95,
      background: Colors.white,
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
    backgroundColor: '#314773 !important',
    color: '#FFF !important',
  },
}))

const ESButtonGoogle: React.FC<ButtonProps> = ({ classes: _classes, className: _className, ...rest }) => {
  const classes = useStyles(rest)
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
      startIcon={<Icon className="fab fa-google" />}
    >
      {t('common:button.google')}
    </Button>
  )
}

ESButtonGoogle.defaultProps = {}
export default ESButtonGoogle
