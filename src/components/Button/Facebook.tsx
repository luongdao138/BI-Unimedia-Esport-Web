import { Button, ButtonProps, SvgIcon } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  contained: {
    minWidth: 280,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    background: '#1877F2',
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
      opacity: 0.95,
      background: '#1877F2',
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

const ESButtonFacebook: React.FC<ButtonProps> = ({ classes: _classes, ...rest }) => {
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
            id="Path_98"
            data-name="Path 98"
            d="M313.837,213.3l.656-4.28h-4.107v-2.777a2.14,2.14,0,0,1,2.413-2.312h1.867v-3.644a22.77,22.77,0,0,0-3.314-.289c-3.382,0-5.593,2.05-5.593,5.761v3.262H302v4.28h3.759V223.65a14.964,14.964,0,0,0,4.627,0V213.3Z"
            transform="translate(-302 -200)"
            fill="#fff"
          />
        </SvgIcon>
      }
    >
      {t('common:button.facebook')}
    </Button>
  )
}

ESButtonFacebook.defaultProps = {}
export default ESButtonFacebook
