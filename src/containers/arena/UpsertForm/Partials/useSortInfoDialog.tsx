import React from 'react'
import { useConfirm } from '@components/Confirm'
import { useTranslation } from 'react-i18next'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'

function SortInfoDialogContent() {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  return (
    <>
      <Typography variant="h2" className={classes.content}>
        {t('common:tournament_create.sort_info_content')}
      </Typography>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    fontSize: 12,
    color: Colors.white_opacity[70],
    marginBottom: theme.spacing(2),
    whiteSpace: 'pre',
  },
}))

export const UseSortInfoDialog = (): (() => Promise<void>) => {
  const confirm = useConfirm()
  const { t } = useTranslation(['common'])
  return (): Promise<void> => {
    return confirm({
      title: t('common:tournament_create.sort_info_title'),
      content: <SortInfoDialogContent />,
      confirmationText: t('common:tournament_create.close'),
    })
  }
}
