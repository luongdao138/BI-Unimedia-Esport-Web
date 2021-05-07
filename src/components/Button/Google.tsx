import { Button, ButtonProps, SvgIcon } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  contained: {
    minWidth: 280,
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

const ESButtonGoogle: React.FC<ButtonProps> = ({ classes: _classes, ...rest }) => {
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
      startIcon={
        <SvgIcon>
          <path
            id="Shape"
            d="M10.168,2.166A12.169,12.169,0,0,0,9.975,0H0V4.1H5.7a4.872,4.872,0,0,1-2.113,3.2V9.951H7.009a10.329,10.329,0,0,0,3.158-7.784Z"
            transform="translate(10.591 8.665)"
            fill="#4285f4"
          />
          <path
            id="Shape-2"
            data-name="Shape"
            d="M9.465,8.579a10.111,10.111,0,0,0,7.009-2.566L13.051,3.355A6.366,6.366,0,0,1,9.465,4.366,6.312,6.312,0,0,1,3.538,0H0V2.744A10.587,10.587,0,0,0,9.465,8.579Z"
            transform="translate(1.127 12.603)"
            fill="#34a853"
          />
          <path
            id="Shape-3"
            data-name="Shape"
            d="M4.665,6.769a6.261,6.261,0,0,1,0-4.025V0H1.127a10.6,10.6,0,0,0,0,9.513L4.665,6.769Z"
            transform="translate(0 5.835)"
            fill="#fbbc05"
          />
          <path
            id="Shape-4"
            data-name="Shape"
            d="M9.465,4.212A5.721,5.721,0,0,1,13.513,5.8l3.038-3.038A10.179,10.179,0,0,0,9.465,0,10.587,10.587,0,0,0,0,5.835L3.538,8.579A6.312,6.312,0,0,1,9.465,4.212Z"
            transform="translate(1.127)"
            fill="#ea4335"
          />
          <path id="Shape-5" data-name="Shape" d="M0,0H21.182V21.182H0Z" fill="none" />
        </SvgIcon>
      }
    >
      {t('common:button.google')}
    </Button>
  )
}

ESButtonGoogle.defaultProps = {}
export default ESButtonGoogle
