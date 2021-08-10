import { Box, Theme, makeStyles } from '@material-ui/core'
import ESCheckbox from '@components/Checkbox'
import i18n from '@locales/i18n'
import { memo, useEffect, useState } from 'react'
import { ESRoutes } from '@constants/route.constants'

interface RegisterAgreementBoxProps {
  onAgreementChange: (value) => void
}

const RegisterAgreementBox: React.FC<RegisterAgreementBoxProps> = ({ onAgreementChange }) => {
  const [checkbox, setCheckbox] = useState({ terms: false, privacy: false })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckbox({ ...checkbox, [event.target.name]: event.target.checked })
  }

  const classes = useStyles()

  useEffect(() => onAgreementChange(checkbox.terms && checkbox.privacy), [checkbox])

  return (
    <Box pt={22 / 8} flexDirection="column" display="flex" width={210} margin="0 auto">
      <ESCheckbox
        disableRipple
        checked={checkbox.terms}
        onChange={handleChange}
        label={
          <>
            <a href={ESRoutes.TERMS} className={classes.link} target="_blank" rel="noopener noreferrer">
              {i18n.t('common:register.link1')}
            </a>
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
            <a href={ESRoutes.PRIVACY} className={classes.link} target="_blank" rel="noopener noreferrer">
              {i18n.t('common:register.link2')}
            </a>
            {i18n.t('common:register.privacy').substr(i18n.t('common:register.privacy').length - 5)}
          </>
        }
        name="privacy"
      />
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    textDecoration: 'underline',
  },
}))

export default memo(RegisterAgreementBox)
