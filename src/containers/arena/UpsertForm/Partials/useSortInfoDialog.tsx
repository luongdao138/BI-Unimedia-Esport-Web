import React from 'react'
import { useConfirm } from '@components/Confirm'
import { useTranslation } from 'react-i18next'
import { Box } from '@material-ui/core'
import { Colors } from '@theme/colors'

function SortInfoDialogContent() {
  const { t } = useTranslation('common')
  return (
    <Box color={Colors.white_opacity['70']}>
      <Box display="flex" mb={2}>
        <Box minWidth={72}>{t('tournament_create.sort_info_modal.row1col1')}</Box>
        <Box>{t('tournament_create.sort_info_modal.row1col2')}</Box>
      </Box>
      <Box display="flex">
        <Box minWidth={72}>{t('tournament_create.sort_info_modal.row1col1')}</Box>
        <Box>{t('tournament_create.sort_info_modal.row1col2')}</Box>
      </Box>
    </Box>
  )
}

export const UseSortInfoDialog = () => {
  const confirm = useConfirm()
  const { t } = useTranslation(['common'])
  return () => {
    return confirm({
      title: t('common:tournament_create.sort_info_title'),
      content: <SortInfoDialogContent />,
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
