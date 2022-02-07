import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
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
  errorMessage?: string
}

const Footer: React.FC<Props> = ({ onConfirm, onCancel, success, errorMessage }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  return (
    <>
      {!success ? (
        <Box className={classes.container}>
          {errorMessage && <Typography className={classes.errorMessage}>{errorMessage}</Typography>}
          <Box className={classes.buttonContainer}>
            <ButtonPrimary size="small" className={classes.actionBtnClose} gradient={false} onClick={onCancel}>
              {t('common:streaming_gift_management.cancel')}
            </ButtonPrimary>
            <ButtonPrimary gradient size="small" className={classes.actionBtnConfirm} onClick={onConfirm}>
              {t('common:streaming_gift_management.apply')}
            </ButtonPrimary>
          </Box>
        </Box>
      ) : (
        <Box className={classes.container}>
          {/*<ButtonPrimary gradient size="small" className={classes.buttonSuccess} onClick={onCancel}>*/}
          {/*  {t('common:streaming_gift_management.txt_footer_button_success')}*/}
          {/*</ButtonPrimary>*/}
        </Box>
      )}
    </>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  errorMessage: {
    fontSize: '16px',
    color: '#F7F735',
    textAlign: 'center',
    marginBottom: '16px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    height: '162px',
    backgroundColor: '#000000',
    width: '100%',
    paddingTop: '24px',
    zIndex: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: '100%',
      paddingLeft: '67px',
      paddingRight: '67px',
    },
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
      marginTop: '16px',
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
