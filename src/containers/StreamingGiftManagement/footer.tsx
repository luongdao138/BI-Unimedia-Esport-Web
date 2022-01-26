import { Box, makeStyles, Theme } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * TODO: Raise bottom margin of side menu
 */
interface Props {
  onConfirm?: () => void
  onCancel?: () => void
  confirmDisable?: boolean
  success?: boolean
}

const Footer: React.FC<Props> = ({ onConfirm, onCancel, success }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  return (
    <>
      {!success ? (
        <Box className={classes.container}>
          <ButtonPrimary size="small" className={classes.actionBtnClose} gradient={false} onClick={onCancel}>
            {t('common:streaming_gift_management.cancel')}
          </ButtonPrimary>
          <ButtonPrimary gradient size="small" className={classes.actionBtnClose} onClick={onConfirm}>
            {t('common:streaming_gift_management.apply')}
          </ButtonPrimary>
        </Box>
      ) : (
        <Box className={classes.container}>
          <ButtonPrimary gradient size="small" className={classes.buttonSuccess} onClick={onCancel}>
            {t('common:streaming_gift_management.txt_footer_button_success')}
          </ButtonPrimary>
        </Box>
      )}
    </>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    height: '162px',
    backgroundColor: '#000000',
    width: '100%',
    paddingTop: '24px',
    zIndex: 10,
  },
  actionBtnConfirm: {
    width: '100%',
    margin: '0 8px',
    padding: '15px 38px',
    [theme.breakpoints.down('sm')]: {
      order: 0,
    },
  },
  actionBtnClose: {
    width: '100%',
    margin: '0 8px',
    padding: '15px 38px',
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  buttonSuccess: {
    width: '100%',
    margin: '0 8px',
    padding: '15px 38px',
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
}))
export default Footer
