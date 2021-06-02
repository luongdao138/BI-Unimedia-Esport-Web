import React from 'react'
import { Box, makeStyles, DialogContent, Typography, Theme } from '@material-ui/core'
import ESDialog from '@components/Dialog'
import ESInput from '@components/Input'
import ButtonPrimary from '@components/ButtonPrimary'
import { Colors } from '@theme/colors'

export interface RoomNameEditorProps {
  roomId: string | string[]
  open: boolean
  hide: () => void
}

const RoomNameEditor: React.FC<RoomNameEditorProps> = ({ roomId, open, hide }) => {
  roomId
  const classes = useStyles()
  const renderFooter = () => {
    return <Box className={classes.stickyFooter}></Box>
  }

  return (
    <Box className={classes.container}>
      <ESDialog
        open={open}
        title="メッセージ名の変更"
        handleClose={() => hide()}
        bkColor="rgba(0,0,0,0.8)"
        alignTop
        fixedFooter={renderFooter()}
      >
        <DialogContent>
          <Box mt={8}>
            <Typography className={classes.nameInfoMsg}>変更したメッセージ名は、全員のメッセージで変更になります。</Typography>
          </Box>
          <Box mt={6}>
            <ESInput placeholder="メッセージ名を入力" fullWidth />
          </Box>
          <Box maxWidth={280} className={classes.buttonBottom}>
            <ButtonPrimary type="submit" round fullWidth>
              変更する
            </ButtonPrimary>
          </Box>
        </DialogContent>
      </ESDialog>
    </Box>
  )
}

RoomNameEditor.defaultProps = {}

const useStyles = makeStyles((theme: Theme) => ({
  container: {},
  nameInfoMsg: {
    textAlign: 'center',
  },
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    background: Colors.black,
    borderTop: `1px solid`,
    borderTopColor: Colors.text['300'],
    height: 162,
  },
  buttonBottom: {
    transform: 'translate(-50%, 0px)',
    position: 'fixed',
    left: '50%',
    bottom: theme.spacing(11),
    width: theme.spacing(35),
    minWidth: theme.spacing(18),
  },
  [theme.breakpoints.down('md')]: {
    stickyFooter: {
      height: theme.spacing(14.5),
    },
    buttonBottom: {
      bottom: theme.spacing(5.2),
      width: theme.spacing(24),
    },
  },
}))

export default RoomNameEditor
