import { Box } from '@material-ui/core'
import ESCheckbox from '@components/Checkbox'
import i18n from '@locales/i18n'
import { memo, useEffect, useState } from 'react'

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
      <ESCheckbox disableRipple checked={checkbox.terms} onChange={handleChange} label={i18n.t('common:register.terms')} name="terms" />
      <ESCheckbox
        disableRipple
        checked={checkbox.privacy}
        onChange={handleChange}
        label={i18n.t('common:register.privacy')}
        name="privacy"
      />
    </Box>
  )
}

export default memo(LoginAgreementBox)
