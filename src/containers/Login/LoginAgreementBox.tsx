import { Box, Link } from '@material-ui/core'
import ESCheckbox from '@components/Checkbox'
import i18n from '@locales/i18n'
import { memo, useEffect, useState } from 'react'
import { ESRoutes } from '@constants/route.constants'

interface LoginAgreementBoxProps {
  onAgreementChange: (value) => void
}

const LoginAgreementBox: React.FC<LoginAgreementBoxProps> = ({ onAgreementChange }) => {
  const [checkbox, setCheckbox] = useState({ terms: false, privacy: false })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckbox({ ...checkbox, [event.target.name]: event.target.checked })
  }

  useEffect(() => onAgreementChange(checkbox.terms && checkbox.privacy), [checkbox])

  return (
    <Box pt={22 / 8} flexDirection="column" display="flex" width={210} margin="0 auto">
      <ESCheckbox
        disableRipple
        checked={checkbox.terms}
        onChange={handleChange}
        label={
          <>
            <Link href={ESRoutes.TERMS}>{i18n.t('common:register.link1')}</Link>
            {i18n.t('common:register.terms').substr(i18n.t('common:register.terms').length - 5)}
          </>
        }
        name="terms"
      />
      <ESCheckbox
        disableRipple
        checked={checkbox.privacy}
        onChange={handleChange}
        label={
          <>
            <Link href={ESRoutes.PRIVACY}>{i18n.t('common:register.link2')}</Link>
            {i18n.t('common:register.privacy').substr(i18n.t('common:register.privacy').length - 5)}
          </>
        }
        name="privacy"
      />
    </Box>
  )
}

export default memo(LoginAgreementBox)
