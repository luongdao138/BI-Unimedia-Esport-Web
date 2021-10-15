import React from 'react'
import { TournamentDetail } from '@services/arena.service'
import { Typography, Box, makeStyles } from '@material-ui/core'
import LinkButton from '@components/LinkButton'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import useEntry from '../ActionComponent/useEntry'
import LoginRequired from '@containers/LoginRequired'
import { useConfirm } from '@components/Confirm'

interface UnjoinModalProps {
  tournament: TournamentDetail
  showButton: boolean
}

const UnjoinModal: React.FC<UnjoinModalProps> = ({ tournament, showButton }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { leave } = useEntry()
  const confirm = useConfirm()
  const handleLeave = () => {
    confirm({
      title: t('common:tournament.unjoin_dialog.dialog_title'),
      content: <Typography className={classes.description}>{t('common:tournament.unjoin_dialog.dialog_description')}</Typography>,
      cancellationText: t('common:common.cancel'),
      confirmationText: t('common:tournament.unjoin_dialog.decline'),
    }).then(() => leave(tournament.attributes.hash_key))
  }

  return (
    <Box textAlign="center" mb={2}>
      {showButton ? (
        <LoginRequired>
          <LinkButton onClick={handleLeave}>{t('common:tournament.decline_entry')}</LinkButton>
        </LoginRequired>
      ) : null}
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  description: {
    textAlign: 'center',
    fontSize: 18,
    color: Colors.white,
  },
}))

export default UnjoinModal
