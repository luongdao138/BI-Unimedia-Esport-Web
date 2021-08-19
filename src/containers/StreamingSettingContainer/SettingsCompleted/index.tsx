import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, DialogContent } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

import ButtonPrimary from '@components/ButtonPrimary'
import ESDialog from '@components/Dialog'
type Props = {
  title?: string
  titleNotification?: string
  messageNotification?: string
  onClose: () => void
  onComplete: () => void
  titleButton?: string
}

const SettingsCompleted: React.FC<Props> = ({ title, titleNotification, messageNotification, onClose, onComplete, titleButton }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()

  return (
    <Box>
      <ESDialog
        open={true}
        title={title || t('common:streaming_setting_screen.title')}
        handleClose={onClose}
        bkColor="#2D2D2D"
        alignTop
        className="streaming_setting_dialog"
      >
        <DialogContent>
          <Box pt={7} pb={18} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h2" className={classes.headerStep3}>
              {titleNotification || t('common:streaming_setting_screen.complete_delivery_settings')}
            </Typography>
            <Typography variant="subtitle1" className={classes.contentStep3}>
              {messageNotification || t('common:streaming_setting_screen.step3_delivery_settings_content')}
            </Typography>
            <Box className={classes.redirectButton}>
              <ButtonPrimary fullWidth round onClick={onComplete}>
                {titleButton || t('common:streaming_setting_screen.step3_close_btn')}
              </ButtonPrimary>
            </Box>
          </Box>
        </DialogContent>
      </ESDialog>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  box: {
    paddingLeft: 0,
  },
  headerStep3: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
    paddingBottom: '30px',
  },
  contentStep3: {
    fontSize: '18px',
    color: '#fff',
    fontWeight: 'normal',
    paddingBottom: '144px',
    textAlign: 'center',
  },
  redirectButton: {
    width: '220px',
  },
}))

export default SettingsCompleted
