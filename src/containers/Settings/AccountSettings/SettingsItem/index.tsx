import ButtonPrimary from '@components/ButtonPrimary'
import { makeStyles, Theme, Box, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { SNS } from '@constants/common.constants'

export interface SettingsItemProps {
  title?: string
  disabled?: boolean
  value: string
  invisible?: boolean
  route?: string
  onChangeEmail?: () => void
  onChangePassword?: () => void
  password?: boolean
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  disabled,
  value,
  invisible,
  route,
  onChangeEmail,
  onChangePassword,
  password,
}) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  return (
    <Box margin={2} display="flex" justifyContent="space-between">
      <Box className={classes.settingItemWrap}>
        <Box overflow="hidden" textOverflow="ellipsis" ml={0} display="flex" flexDirection="column" justifyContent="center">
          <Typography className={classes.title} noWrap>
            {title}
          </Typography>
        </Box>
        <Typography className={disabled ? classes.disabled : classes.value}>{invisible ? '*************' : value}</Typography>
        {route &&
          (password ? (
            <Box className={classes.buttonWrap}>
              <ButtonPrimary
                round
                gradient={false}
                size="small"
                disabled={route === SNS ? true : false}
                onClick={onChangeEmail}
                className={classes.button}
              >
                {t('common.change')}
              </ButtonPrimary>
            </Box>
          ) : (
            <Box className={classes.buttonWrap}>
              <ButtonPrimary
                round
                gradient={false}
                size="small"
                disabled={route === SNS ? true : false}
                onClick={onChangePassword}
                className={classes.button}
              >
                {t('common.change')}
              </ButtonPrimary>
            </Box>
          ))}
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  settingItemWrap: {
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(2),
    paddingRight: theme.spacing(5),
    position: 'relative',
    background: Colors.black_opacity[80],
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    '&:hover': {
      boxShadow: 'none',
      background: '#1a1a1a',
    },
  },
  title: {
    color: Colors.white_opacity['70'],
    fontWeight: 'bold',
    width: 110,
  },
  value: {
    color: Colors.white_opacity['70'],
  },
  disabled: {
    color: Colors.white_opacity['30'],
  },
  buttonWrap: {
    position: 'absolute',
    right: theme.spacing(2),
    marginLeft: theme.spacing(2),
    top: '50%',
    transform: 'translateY(-50%)',
  },
  button: {
    '&.MuiButtonBase-root.button-primary': {
      padding: 11,
      height: 36,
    },
  },
}))

export default SettingsItem
