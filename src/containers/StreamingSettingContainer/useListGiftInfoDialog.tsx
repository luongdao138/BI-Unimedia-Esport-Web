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
        {t('streaming_setting_screen.dialog_info_gift_list.description')}
      </Box>
      <Box>{t('streaming_setting_screen.dialog_info_gift_list.content.row1')}</Box>
      <Box>{t('streaming_setting_screen.dialog_info_gift_list.content.row2')}</Box>
      <Box>{t('streaming_setting_screen.dialog_info_gift_list.content.row3')}</Box>
      <Box>{t('streaming_setting_screen.dialog_info_gift_list.content.row4')}</Box>
    </Box>
  )
}
function RankingInfoDialogContent() {
  const { t } = useTranslation('common')
  return (
    <Box color={Colors.white_opacity['70']}>
      {/* <Box textAlign="center" pb={2}>
        {t('streaming_setting_screen.dialog_info_gift_list.description')}
      </Box> */}
      <Box>{t('streaming_setting_screen.dialog_info_ranking.content.row1')}</Box>
      <Box>{t('streaming_setting_screen.dialog_info_ranking.content.row2')}</Box>
    </Box>
  )
}

export const useListGiftInfoDialog = (): (() => Promise<void>) => {
  const confirm = useConfirm()
  const { t } = useTranslation(['common'])
  return (): Promise<void> => {
    return confirm({
      title: t('common:streaming_setting_screen.dialog_info_gift_list.title'),
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

export const useRankingInfoDialog = (): (() => Promise<void>) => {
  const confirm = useConfirm()
  const { t } = useTranslation(['common'])
  return (): Promise<void> => {
    return confirm({
      title: t('common:streaming_setting_screen.dialog_info_ranking.title'),
      content: <RankingInfoDialogContent />,
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
