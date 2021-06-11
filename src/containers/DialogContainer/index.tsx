import { Typography, withStyles, makeStyles, Box } from '@material-ui/core'
import React from 'react'
import ButtonPrimary from '@components/ButtonPrimary'
import Button from '@components/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogContent from '@material-ui/core/DialogContent'
import * as selectors from '@store/common/selectors'
import * as actions from '@store/common/actions'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import _ from 'lodash'
import { Colors } from '@theme/colors'
import { ActionButtons } from '@store/common/actions/types'
import i18n from '@locales/i18n'

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

const ConfirmContainer: React.FC = () => {
  const handleClose = () => {
    removeDialog()
  }
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const dialog = useAppSelector(selectors.getDialog)
  const removeDialog = () => dispatch(actions.removeDialog())
  const title = _.get(dialog, 'title', i18n.t('common:dialog.default_title'))
  const buttons = _.get(dialog, 'actions', [])

  const handleAction = (type: string) => {
    dispatch(actions.actionDialog(type))
    handleClose()
  }

  const renderButton = (a: ActionButtons, index: number) => {
    if (a.type === 'primary') {
      return (
        <ButtonPrimary size={'small'} key={index} onClick={() => handleAction(a.action)}>
          {a.name}
        </ButtonPrimary>
      )
    } else {
      return (
        <Button size="medium" className={classes.secondButton} round={true} key={index} onClick={() => handleAction(a.action)}>
          {a.name}
        </Button>
      )
    }
  }

  return (
    <>
      {dialog ? (
        <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={dialog ? true : false}>
          <DialogContent>
            <Box className={classes.container}>
              <Typography className={classes.title} variant="h2">
                {title}
              </Typography>
              {dialog.message ? (
                <Typography className={classes.message} gutterBottom>
                  {dialog.message}
                </Typography>
              ) : null}
              {dialog.actionMsg ? (
                <Typography className={classes.actionMessage} gutterBottom>
                  {dialog.actionMsg}
                </Typography>
              ) : null}
            </Box>
            <Box className={classes.actionBox}>{_.isArray(buttons) && buttons.map((a, index) => renderButton(a, index))}</Box>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    display: 'block',
  },
  title: {
    color: Colors.white,
    textAlign: 'center',
    paddingBottom: 10,
  },
  message: {
    color: Colors.text[200],
    textAlign: 'center',
  },
  actionMessage: {
    color: Colors.secondary,
    textAlign: 'center',
  },
  secondButton: {
    borderRadius: 25,
    height: 38,
    paddingLeft: 20,
    paddingRight: 20,
  },
  actionBox: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}))

export default ConfirmContainer
