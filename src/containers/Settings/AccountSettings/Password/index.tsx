import { useTranslation } from 'react-i18next'
import { Box, makeStyles, Theme, IconButton, Icon, Typography } from '@material-ui/core'
import ESInput from '@components/Input'
import ESStickyFooter from '@components/StickyFooter'
import { useRouter } from 'next/router'
import { Colors } from '@theme/colors'
import { ESRoutes } from '@constants/route.constants'

const AccountSettingsPasswordContainer: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <Box className={classes.header}>
        <IconButton className={classes.iconButton} disableRipple onClick={() => router.back()}>
          <Icon className={`fa fa-arrow-left ${classes.icon}`} />
        </IconButton>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('account_settings.change_email_address')}
        </Typography>
      </Box>
      <Box mt={12} ml={5}>
        <ESInput
          id="password"
          autoFocus
          placeholder={t('common.password')}
          labelPrimary={t('common.password')}
          fullWidth
          // value={values.email}
          // onChange={handleChange}
          // helperText={touched.email && errors.email}
          // error={touched.email && !!errors.email}
        />
      </Box>
      <ESStickyFooter
        title={t('common.next')}
        disabled={false}
        onClick={() => {
          router.push(ESRoutes.USER_ACCOUNT_SETTINGS_CHANGE_EMAIL)
        }}
      />
    </>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  header: {
    paddingTop: theme.spacing(12),
  },
  icon: {
    fontSize: 12,
    color: theme.palette.text.primary,
  },
  iconButton: {
    backgroundColor: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  headerTitle: {
    color: Colors.white,
    display: 'inline-block',
  },
}))

export default AccountSettingsPasswordContainer
