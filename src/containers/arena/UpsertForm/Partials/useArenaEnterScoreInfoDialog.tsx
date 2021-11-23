import React from 'react'
import { useConfirm } from '@components/Confirm'
import { useTranslation } from 'react-i18next'
import { Box } from '@material-ui/core'
import { Colors } from '@theme/colors'

function EnterScoreInfoDialogContent() {
  const { t } = useTranslation('common')
  return (
    <Box color={Colors.white_opacity['70']}>
      <Box display="flex" pb={2}>
        <Box minWidth={96}>{t('arena.battles.enter_score_information_dialog.row1col1')}</Box>
        <Box>{t('arena.battles.enter_score_information_dialog.row1col2')}</Box>
      </Box>
      <Box display="flex">
        <Box minWidth={96}>{t('arena.battles.enter_score_information_dialog.row2col1')}</Box>
        <Box>{t('arena.battles.enter_score_information_dialog.row2col2')}</Box>
      </Box>
    </Box>
  )
}

export const useArenaEnterScoreInfoDialog = (): (() => Promise<void>) => {
  const confirm = useConfirm()
  const { t } = useTranslation(['common'])
  return (): Promise<void> => {
    return confirm({
      title: t('common:arena.battles.enter_score_information_dialog.title'),
      content: <EnterScoreInfoDialogContent />,
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
