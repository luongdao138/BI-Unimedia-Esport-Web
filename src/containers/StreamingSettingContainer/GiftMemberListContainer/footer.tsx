import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import useGiftTarget from '@containers/StreamingGiftManagement/useGiftTarget'

/**
 * TODO: Raise bottom margin of side menu
 */
interface Props {
  onConfirm?: () => void
  onCancel?: () => void
  confirmDisable?: boolean
}

const Footer: React.FC<Props> = ({ onConfirm = () => null, onCancel = () => null }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { newGiftGroupGiftMasterList } = useGiftTarget()
  const getNumberItemSelected = () => {
    return newGiftGroupGiftMasterList.length
  }

  return (
    <Box className={classes.container}>
      <Typography className={classes.confirmMessage}>
        {`${getNumberItemSelected()}${t('streaming_setting_screen.member_list.confirm_message')}`}
      </Typography>
      <Box className={classes.buttonContainer}>
        <ButtonPrimary size="small" className={classes.actionBtnClose} gradient={false} onClick={onCancel}>
          {t('streaming_setting_screen.member_list.cancel')}
        </ButtonPrimary>
        <ButtonPrimary
          gradient
          size="small"
          className={classes.actionBtnClose}
          onClick={onConfirm}
          disabled={getNumberItemSelected() === 0}
        >
          {t('streaming_setting_screen.member_list.confirm')}
        </ButtonPrimary>
      </Box>
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
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
    marginTop: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '220px !important',
    margin: '0 8px',
    padding: '15px 38px',
    [theme.breakpoints.down('sm')]: {
      margin: '8px 0px',
    },
  },
  confirmMessage: {
    color: Colors.white,
    fontSize: '14px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  [theme.breakpoints.down('sm')]: {
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    container: {
      paddingTop: '0px',
    },
  },
}))
export default Footer
