import React, { useState, useEffect } from 'react'
import { Box, makeStyles, DialogContent, Typography, Theme, useTheme } from '@material-ui/core'
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
import { useRect } from '@utils/hooks/useRect'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export interface RoomNameEditorProps {
  roomName: string
  roomId: string | string[]
  open: boolean
  hide: () => void
}

const contentRef = React.createRef<HTMLDivElement>()

const RoomNameEditor: React.FC<RoomNameEditorProps> = ({ roomName, roomId, open, hide }) => {
  roomId
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const { checkNgWord } = useCheckNgWord()
  const [newName, setNewName] = useState('')
  const [bottomGap, setBottomGap] = useState<number>(0)
  const contentRect = useRect(contentRef)
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    setBottomGap(contentRect?.height)
  }, [contentRect?.height])

  const height = matches ? bottomGap + 100 : bottomGap + 68

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
    <div className={classes.stickyFooter} ref={contentRef}>
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
        <DialogContent className={classes.dialogContentWrap} style={{ height: `calc(100vh - ${height}px)` }}>
          <Box className={classes.contentInner}>
            <Box className={classes.contentHolder}>
              <Typography className={classes.nameInfoMsg}>変更したメッセージ名は、全員のメッセージで変更になります</Typography>
              <Box className={classes.input}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                  }}
                >
                  <ESInput placeholder={i18n.t('common:chat.room_name_placeholder')} value={newName} fullWidth onChange={handleChange} />
                </form>
              </Box>
            </Box>
          </Box>
          {renderFooter()}
        </DialogContent>
      </ESDialog>
    </Box>
  )
}

RoomNameEditor.defaultProps = {}

const useStyles = makeStyles((theme: Theme) => ({
  dialogContentWrap: {
    padding: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  input: {
    width: '100%',
    marginTop: 60,
  },
  contentHolder: {
    paddingTop: 60,
  },
  contentInner: {
    overflow: 'auto',
    overflowX: 'hidden',
    height: '100%',
    paddingBottom: 30,
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      background: 'rgba(0,0,0,0.5)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222',
      borderRadius: 6,
    },
  },
  container: {
    alignSelf: 'flex-start',
  },
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
    dialogContentWrap: {
      padding: '0 16px',
    },
    stickyFooter: {
      height: 'auto',
    },
    buttonBottom: {
      margin: 'auto',
      width: theme.spacing(35),
      minWidth: theme.spacing(18),
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5),
    },
    contentHolder: {
      paddingTop: 10,
    },
    input: {
      marginTop: 20,
    },
  },
}))

export default RoomNameEditor
