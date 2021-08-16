import React, { useEffect } from 'react'
import { LobbyDetail } from '@services/lobby.service'
import { Box, Dialog, makeStyles, Typography, withStyles } from '@material-ui/core'
import MuiDialogContent from '@material-ui/core/DialogContent'
import { useTranslation } from 'react-i18next'
import { UserProfile } from '@services/user.service'
import useEntry from './useEntry'
import ESLoader from '@components/FullScreenLoader'
// import { useAppDispatch } from '@store/hooks'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'

interface IndividualEntryModalProps {
  tournament: LobbyDetail
  userProfile: UserProfile
  onClose: () => void
  open: boolean
}

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'block',
    background: 'linear-gradient(180deg, rgba(16,16,16,1) 0%, rgba(52,52,52,1) 100%)',
    width: '100%',
    '&:first-child': {
      padding: theme.spacing(3),
    },
  },
}))(MuiDialogContent)

const IndividualEntryModal: React.FC<IndividualEntryModalProps> = ({ tournament, /* userProfile, */ onClose, open }) => {
  const { t } = useTranslation(['common'])
  const { join, joinMeta, resetJoinMeta } = useEntry()

  useEffect(() => {
    if (joinMeta.loaded) {
      handleClose()
    }
  }, [joinMeta.loaded])

  const handleSubmit = () => {
    join({ hash_key: tournament.attributes.hash_key, data: { name: '' } })
  }

  const handleClose = () => {
    resetJoinMeta()
    onClose()
  }

  const classes = useStyles()

  return (
    <Box>
      <Dialog
        disableBackdropClick
        // disableScrollLock
        maxWidth={'md'}
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        onEntered={() => {
          document.body.style.position = 'fixed'
          document.body.style.width = '100%'
          document.body.style.height = '100%'
        }}
        onExited={() => {
          document.body.style.position = 'unset'
          document.body.style.width = 'unset'
          document.body.style.height = 'unset'
        }}
      >
        <DialogContent>
          <Box className={classes.container}>
            <Typography className={classes.dialogTitle} gutterBottom>
              {t('common:recruitment.join_dialog.dialog_title')}
            </Typography>
          </Box>
          <Box className={classes.actionBox}>
            <ButtonPrimary size="small" className={classes.actionBtnClose} gradient={false} onClick={handleClose}>
              {t('common:common.cancel')}
            </ButtonPrimary>
            <ButtonPrimary size="small" className={classes.actionBtnConfirm} onClick={handleSubmit}>
              {t('common:tournament.entry')}
            </ButtonPrimary>
          </Box>
        </DialogContent>
      </Dialog>

      {joinMeta.pending && <ESLoader open={joinMeta.pending} />}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'block',
  },
  dialogTitle: {
    color: Colors.white,
    textAlign: 'center',
    paddingTop: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  actionBox: {
    marginTop: 73,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  actionBtnClose: {
    width: '100%',
    margin: 16,
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  actionBtnConfirm: {
    width: '100%',
    margin: 16,
    [theme.breakpoints.down('sm')]: {
      order: 0,
    },
  },
}))

export default IndividualEntryModal
