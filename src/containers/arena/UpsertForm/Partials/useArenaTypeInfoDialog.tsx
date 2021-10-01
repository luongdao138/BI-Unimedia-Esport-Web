import React from 'react'
import { useConfirm } from '@components/Confirm'
import { useTranslation } from 'react-i18next'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'

function TypeInfoDialogContent() {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  return (
    <>
      <Typography variant="h2" className={classes.content}>
        {t('common:tournament_create.publishing_settings_info')}
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

export const useArenaTypeInfoDialog = (): (() => Promise<void>) => {
  const confirm = useConfirm()
  const { t } = useTranslation(['common'])
  return (): Promise<void> => {
    return confirm({
      title: t('common:tournament_create.publishing_settings'),
      content: <TypeInfoDialogContent />,
      confirmationText: t('common:tournament_create.close'),
    })
  }
}
