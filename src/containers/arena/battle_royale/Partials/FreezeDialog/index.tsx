import React from 'react'
import { useConfirm } from '@components/Confirm'
import { useTranslation } from 'react-i18next'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'

function FreezeDialogContent({ isTeam }) {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  return (
    <>
      <Typography variant="h2" className={classes.subtitle}>
        {t('common:arena.battles.freeze_confirmation_dialog.subtitle', { isTeam })}
      </Typography>
      <Typography variant="caption" gutterBottom className={classes.desc}>
        {t('common:arena.battles.freeze_confirmation_dialog.description', { isTeam })}
      </Typography>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  subtitle: {
    fontSize: 18,
    color: Colors.white,
    marginBottom: theme.spacing(2),
  },
  desc: {
    whiteSpace: 'pre-line',
  },
  [theme.breakpoints.down('sm')]: {
    subtitle: {
      fontSize: 14,
    },
  },
}))

export const useFreezeDialog = (isTeam: boolean): (() => Promise<void>) => {
  const confirm = useConfirm()
  const { t } = useTranslation(['common'])
  return (): Promise<void> => {
    return confirm({
      title: t('common:arena.battles.freeze_confirmation_dialog.title', { isTeam }),
      content: <FreezeDialogContent isTeam={isTeam} />,
      additionalText: t('common:arena.battles.freeze_confirmation_dialog.additionalText'),
      confirmationText: t('common:arena.battles.freeze_confirmation_dialog.confirmationText'),
      cancellationText: t('common:arena.battles.freeze_confirmation_dialog.cancellationText'),
    })
  }
}
