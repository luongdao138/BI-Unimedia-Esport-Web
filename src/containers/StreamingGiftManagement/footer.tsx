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
}

const Footer: React.FC<Props> = ({ onConfirm = () => null, onCancel = () => null }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  return (
    <Box className={classes.container}>
      <ButtonPrimary size="small" className={classes.actionBtnClose} gradient={false} onClick={onCancel}>
        {t('common:streaming_gift_management.cancel')}
      </ButtonPrimary>
      <ButtonPrimary gradient size="small" className={classes.actionBtnClose} onClick={onConfirm}>
        {t('common:streaming_gift_management.apply')}
      </ButtonPrimary>
    </Box>
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
}))
export default Footer
