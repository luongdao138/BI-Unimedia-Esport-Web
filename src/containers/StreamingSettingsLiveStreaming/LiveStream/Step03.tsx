import { Box, makeStyles, Typography, DialogContent } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import ButtonPrimary from '@components/ButtonPrimary'
import ESDialog from '@components/Dialog'

const Step03: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  return (
    <Box>
      <ESDialog
        open={true}
        title={t('common:streaming_settings_live_streaming_screen.title')}
        handleClose={() => {
          router.push(ESRoutes.DELIVERY_MANAGEMENT)
        }}
        bkColor="#2D2D2D"
        alignTop
        className="streaming_setting_dialog"
      >
        <DialogContent>
          <Box pt={7} pb={18} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h2" className={classes.headerStep3}>
              {t('common:streaming_settings_live_streaming_screen.complete_delivery_settings')}
            </Typography>
            <Typography variant="subtitle1" className={classes.contentStep3}>
              {t('common:streaming_settings_live_streaming_screen.step3_delivery_settings_content')}
            </Typography>
            <Box className={classes.redirectButton}>
              <ButtonPrimary fullWidth round onClick={() => router.push(ESRoutes.DELIVERY_MANAGEMENT)}>
                {t('common:streaming_settings_live_streaming_screen.step3_close_btn')}
              </ButtonPrimary>
            </Box>
          </Box>
        </DialogContent>
      </ESDialog>
    </Box>
  )
}

export default Step03
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
  },
  redirectButton: {
    width: '220px',
  },
}))
