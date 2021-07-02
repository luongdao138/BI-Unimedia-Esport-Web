import React, { useState, useEffect } from 'react'
import { Box, makeStyles, DialogContent, Typography, Theme } from '@material-ui/core'
import ESDialog from '@components/Dialog'
import ESInput from '@components/Input'
import ButtonPrimary from '@components/ButtonPrimary'
import { Colors } from '@theme/colors'
import { useAppDispatch } from '@store/hooks'
import { CHAT_ACTION_TYPE } from '@constants/socket.constants'
import { socketActions } from '@store/socket/actions'
import _ from 'lodash'
import i18n from '@locales/i18n'
import { showDialog } from '@store/common/actions'
import { NG_WORD_DIALOG_CONFIG, NG_WORD_AREA } from '@constants/common.constants'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { addToast } from '@store/common/actions'

export interface RoomNameEditorProps {
  roomName: string
  roomId: string | string[]
  open: boolean
  hide: () => void
}

const RoomNameEditor: React.FC<RoomNameEditorProps> = ({ roomName, roomId, open, hide }) => {
  roomId
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { checkNgWord } = useCheckNgWord()
  const [newName, setNewName] = useState('')

  useEffect(() => {
    if (_.isString(roomName)) {
      setNewName(roomName)
    }
  }, [roomName])

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const onSubmit = () => {
    const name = newName.trim()
    if (_.isEmpty(checkNgWord(name))) {
      dispatch(
        socketActions.socketSend({
          action: CHAT_ACTION_TYPE.CHANGE_ROOM_NAME,
          roomId: roomId,
          name: newName.trim(),
        })
      )
      setTimeout(function () {
        dispatch(addToast(i18n.t('common:chat.toast.room_name_changed')))
      }, 1000)
      hide()
    } else {
      dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: NG_WORD_AREA.room_name_title }))
    }
  }

  const isButtonDisabled = () => {
    if (newName === '') return true
    if (newName === roomName) return true
    return false
  }

  const renderFooter = () => (
    <div className={classes.stickyFooter}>
      <Box maxWidth={280} className={classes.buttonBottom}>
        <ButtonPrimary type="submit" disabled={isButtonDisabled()} round fullWidth onClick={onSubmit}>
          {i18n.t('common:chat.add_submit')}
        </ButtonPrimary>
      </Box>
    </div>
  )

  return (
    <Box className={classes.container}>
      <ESDialog
        open={open}
        title={i18n.t('common:chat.room_options.change_room_name')}
        handleClose={() => hide()}
        bkColor="rgba(0,0,0,0.8)"
        alignTop
        fixedFooter={renderFooter()}
        className={`scroll-bar`}
      >
        <DialogContent>
          <Box mt={8}>
            <Typography className={classes.nameInfoMsg}>変更したメッセージ名は、全員のメッセージで変更になります。</Typography>
          </Box>
          <Box mt={6}>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                onSubmit()
              }}
            >
              <ESInput placeholder={i18n.t('common:chat.room_name_placeholder')} value={newName} fullWidth onChange={handleChange} />
            </form>
          </Box>
          {renderFooter()}
        </DialogContent>
      </ESDialog>
    </Box>
  )
}

RoomNameEditor.defaultProps = {}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    alignSelf: 'flex-start',
  },
  nameInfoMsg: {
    textAlign: 'center',
  },
  alignTop: {
    '& .MuiDialog-container ': {
      alignItems: 'flex-start',
    },
  },
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    background: Colors.black,
    borderTop: `1px solid`,
    borderTopColor: Colors.text['300'],
    height: 'auto',
  },

  buttonBottom: {
    margin: 'auto',
    width: theme.spacing(35),
    minWidth: theme.spacing(18),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
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
