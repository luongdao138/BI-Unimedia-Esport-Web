import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import SettingsRowItem from '@components/SettingsRowItem'
import { Box, Icon, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  loaderCenter: {
    textAlign: 'center',
  },
  icon: {
    fontSize: 12,
    color: theme.palette.text.primary,
  },
  iconButton: {
    backgroundColor: theme.palette.text.secondary,
    marginRight: 14,
  },
  headerTitle: {
    color: Colors.white,
    display: 'inline-block',
  },
  create: {
    marginLeft: 'auto',
  },
  wrap: {
    height: 'calc(100vh - 60px)',
    overflow: 'auto',
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      width: 0,
      height: 0,
    },
  },
  header: {
    padding: 16,
    width: '100%',
    position: 'sticky',
    background: Colors.black,
    zIndex: 10,
    left: 0,
    top: 0,
    right: 0,
    height: 60,
    borderBottom: '1px solid #212121',
  },
}))

const UserSecuritySettingsPage: PageWithLayoutType = () => {
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation(['common'])
  return (
    <div>
      <Box className={classes.header}>
        <IconButton className={classes.iconButton} disableRipple onClick={() => router.back()}>
          <Icon className={`fa fa-arrow-left ${classes.icon}`} />
        </IconButton>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('common:notification.title')}
        </Typography>
      </Box>
      <Box>
        <SettingsRowItem title="大会履歴" />
        <SettingsRowItem title="アクティビティ" />
        <SettingsRowItem title="プロフィール" />
        <SettingsRowItem title="プロフィール" />
        <SettingsRowItem title="プロフィール" />
        <SettingsRowItem title="プロフィール" />
        <SettingsRowItem title="プロフィール" />
        <SettingsRowItem title="プロフィール" />
        <SettingsRowItem title="プロフィール" />
        <SettingsRowItem title="プロフィール" />
        <SettingsRowItem title="プロフィール" />
        <SettingsRowItem title="プロフィール" />
        <SettingsRowItem title="プロフィール" />
      </Box>
    </div>
  )
}

UserSecuritySettingsPage.Layout = MainLayout

export default UserSecuritySettingsPage
