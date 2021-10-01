import React from 'react'
import { Typography, Box, makeStyles, Theme } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import ESButton from '@components/Button'
import { Colors } from '@theme/colors'
import ESPopup from '@components/Popup'
import BlankLayout from '@layouts/BlankLayout'
import { WarningRounded } from '@material-ui/icons'
import LoginRequired from '@containers/LoginRequired'

interface ConfirmDialogProps {
  open: boolean
  title: string
  okButtonTitle: string
  cancelButtonTitle: string
  warningTitle: string
  description?: string
  handleClose: () => void
  handleSubmit: () => void
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  okButtonTitle,
  cancelButtonTitle,
  warningTitle,
  description,
  handleClose,
  handleSubmit,
}) => {
  const classes = useStyles()

  return (
    <ESPopup open={open}>
      <BlankLayout>
        <Box paddingY={2} className={classes.childrenContainer}>
          <Box pb={4} color={Colors.white} alignItems="center">
            <Typography className={classes.title}>{title}</Typography>
          </Box>
          <Box pb={4}>
            <Typography variant="h2" className={classes.desc}>
              {description}
            </Typography>
          </Box>

          <Box className={classes.actionButtonContainer} paddingX={3}>
            <Box className={classes.actionButton}>
              <LoginRequired>
                <ESButton variant="outlined" round fullWidth size="large" onClick={() => handleClose()}>
                  {cancelButtonTitle}
                </ESButton>
              </LoginRequired>
            </Box>
            <Box className={classes.actionButton} onClick={() => handleSubmit()}>
              <LoginRequired>
                <ButtonPrimary round fullWidth>
                  {okButtonTitle}
                </ButtonPrimary>
              </LoginRequired>
            </Box>
          </Box>

          <Box paddingTop={1} className={classes.warningContainer}>
            <WarningRounded fontSize="small" />
            <Typography variant="body2">{warningTitle}</Typography>
          </Box>
        </Box>
      </BlankLayout>
    </ESPopup>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  warningContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: Colors.yellow,
    alignItems: 'center',
  },
  childrenContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    width: theme.spacing(35),
    margin: 8,
  },
  desc: { fontSize: 14, color: Colors.white },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    actionButtonContainer: {
      flexDirection: 'column-reverse',
    },
    title: {
      fontSize: 20,
    },
    desc: {
      fontSize: 14,
    },
  },
}))

export default ConfirmDialog
