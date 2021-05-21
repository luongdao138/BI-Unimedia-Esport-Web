import { Box } from '@material-ui/core'
import HeaderWithButton from '@components/HeaderWithButton'
import { useTranslation } from 'react-i18next'
import SettingsItem from './SettingsItem'

const AccountSettingsContainer: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <HeaderWithButton title={t('account_settings.title')} />
      <Box>
        <SettingsItem title={'会員種別'} value={'一般会員'} disabled />
        <SettingsItem title={'ユーザーID'} value={'@exelab_staff'} disabled />
        <SettingsItem title={'メールアドレス'} value={'sample@gmail.com'} url="/account_settings" />
        <SettingsItem title={'パスワード'} value={'password123'} invisible url="/account_settings" />
      </Box>
    </>
  )
}

export default AccountSettingsContainer
