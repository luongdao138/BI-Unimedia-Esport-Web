import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useGiftManage from './useGiftTarget'
import { useRect } from '@utils/hooks/useRect'

/**
 * TODO: Raise bottom margin of side menu
 */
interface Props {
  onConfirm?: () => void
  onCancel?: () => void
  errorMessage?: string
  step?: number
}

const Footer: React.FC<Props> = ({ onConfirm, onCancel, errorMessage, step }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { giftTargetData } = useGiftManage()
  const containerRef = useRef<HTMLDivElement>(null)
  const { height } = useRect(containerRef)
  const disableBtnConfirm = step === 2 || giftTargetData.length === 0 ? true : false
  return (
    <>
      {/* ts-ignore */}
      <Box className={classes.container} ref={containerRef}>
        {errorMessage && <Typography className={classes.errorMessage}>{errorMessage}</Typography>}
        <Box className={classes.buttonContainer}>
          {step !== 3 && (
            <>
              <ButtonPrimary size="small" className={classes.actionBtnClose} gradient={false} onClick={onCancel}>
                {t('common:streaming_gift_management.cancel')}
              </ButtonPrimary>
              <ButtonPrimary gradient size="small" className={classes.actionBtnConfirm} onClick={onConfirm} disabled={disableBtnConfirm}>
                {t('common:streaming_gift_management.apply')}
              </ButtonPrimary>
            </>
          )}
          {step === 3 && (
            <ButtonPrimary gradient size="large" className={classes.actionBtnConfirm} onClick={onCancel}>
              {t('common:streaming_gift_management.txt_footer_button_success')}
            </ButtonPrimary>
          )}
        </Box>
      </Box>
      <Box style={{ height }} className={classes.clear}></Box>
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
      gap: 16,
    },
  },
  actionBtnConfirm: {
    // width: '100%',
    margin: '0 8px',
    padding: '15px 38px',
    width: '220px !important',
    [theme.breakpoints.down('sm')]: {
      order: 0,
      width: '100% !important',
    },
  },
  actionBtnClose: {
    // width: '100%',
    margin: '0 8px',
    padding: '15px 38px',
    width: '220px !important',
    [theme.breakpoints.down('sm')]: {
      order: 1,
      width: '100% !important',
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
  clear: {
    [theme.breakpoints.down(720)]: {
      display: 'none',
    },
  },
}))
export default Footer
