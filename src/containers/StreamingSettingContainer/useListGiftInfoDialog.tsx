import React from 'react'
import { useConfirm } from '@components/Confirm'
import { useTranslation } from 'react-i18next'
import { Box } from '@material-ui/core'
import { Colors } from '@theme/colors'

function ListGiftInfoDialogContent() {
  const { t } = useTranslation('common')
  return (
    <Box color={Colors.white_opacity['70']}>
      <Box textAlign="center" pb={2}>
        {t('streaming_setting_screen.title_gift')}
      </Box>
      <Box display="flex" pb={2}>
        <Box minWidth={64}>{t('tournament_create.public_setting_modal.row1col1')}</Box>
        <Box>{t('tournament_create.public_setting_modal.row1col2')}</Box>
      </Box>
      <Box display="flex">
        <Box minWidth={64}>{t('tournament_create.public_setting_modal.row2col1')}</Box>
        <Box>{t('tournament_create.public_setting_modal.row2col2')}</Box>
      </Box>
    </Box>
  )
}

export const useListGiftInfoDialog = (): (() => Promise<void>) => {
  const confirm = useConfirm()
  const { t } = useTranslation(['common'])
  return (): Promise<void> => {
    return confirm({
      title: t('common:streaming_setting_screen.title_gift'),
      content: <ListGiftInfoDialogContent />,
      confirmationText: t('common:tournament_create.close'),
      cancellationButtonProps: {
        style: {
          display: 'none',
        },
      },
      confirmationButtonProps: {
        style: {
          maxWidth: 160,
          margin: '0 auto',
        },
      },
    })
  }
}
