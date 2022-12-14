import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/live/colors'
import Box from '@material-ui/core/Box'
import SendIcon from '@material-ui/icons/Send'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import _ from 'lodash'
import moment from 'moment'
import WarningIcon from '@material-ui/icons/Warning'
import CloseIcon from '@material-ui/icons/Close'

interface detailProps {
  send: (msg: string) => void
  protection: boolean
  typing?: () => void
}

const useStyles = makeStyles((theme) => ({
  input: {
    borderRadius: 24,
    position: 'relative',
    backgroundColor: theme.palette.grey[700],
    border: 'none',
    overflow: 'hidden',
    width: '100%',
    resize: 'none',
    margin: 0,
    flex: 1,
    fontSize: 12,
    padding: 8,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    overflowY: 'hidden',
  },
  warning: {
    position: 'absolute',
    top: -52,
    height: 52,
    left: 0,
    width: '100%',
    right: 0,
    background: 'rgba(33, 33, 33, 1)',
    padding: 8,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    fontSize: 11,
    paddingRight: 30,
    overflow: 'hidden',
  },
  warningText: {
    fontSize: 9.7,
    color: theme.palette.grey[400],
    display: 'block',
    width: '100%',
  },
  closeIcon: {
    cursor: 'pointer',
    padding: 5,
    position: 'absolute',
    right: 3,
    top: 3,
  },
  warningTitle: {
    display: 'block',
    width: '100%',
    fontSize: 11,
    paddingBottom: 3,
  },
  textarea: {
    overflow: 'hidden',
  },
  liveChatInputWrapper: {
    width: '100%',
    padding: '8px',
    position: 'relative',
    flexGrow: 0,
    display: 'flex',
    '& textarea': { overflow: 'hidden' },
  },
}))

const LiveChatInput: React.FC<detailProps> = (props) => {
  const [message, setMessage] = useState('')
  const [next, updateNextTime] = useState<any>(0)
  const [prevMsg, updatePrevMsg] = useState<any>('')
  const [warning, warningStatus] = useState<boolean>(false)

  const { send, protection } = props
  const classes = useStyles()

  const handleSubmitSpam = (event) => {
    event.preventDefault()
    const now = moment().unix()
    // console.log(now)
    if (!_.isEmpty(message) && message.replace(/\s/g, '').length) {
      // console.log(now - next)
      if (prevMsg == message && now - next < 10) {
        warningStatus(true)
      } else {
        send(message)
        setMessage('')
        updateNextTime(now + 1)
        updatePrevMsg(message)
        warningStatus(false)
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!_.isEmpty(message) && message.replace(/\s/g, '').length) {
      send(message)
      setMessage('')
    }
  }

  const handleType = (event: any) => {
    setMessage(event.target.value)
    props.typing ? props.typing() : undefined
  }

  const handleKeyPress = (e) => {
    if (e.key == 'Enter' && !e.shiftKey) {
      e.preventDefault()
      protection ? handleSubmitSpam(e) : handleSubmit(e)
    }
  }

  return (
    <div className={classes.liveChatInputWrapper}>
      <form onSubmit={protection ? handleSubmitSpam : handleSubmit} style={{ width: '100%' }}>
        <Box display="flex" flexDirection="row" alignItems="center">
          {warning ? (
            <Box display="block" className={classes.warning}>
              <Box className={classes.warningTitle}>
                <WarningIcon
                  style={{
                    fontSize: 16,
                    color: '#ffca61',
                    position: 'relative',
                    top: 3,
                    marginRight: 5,
                  }}
                />
                Message Not Sent
              </Box>
              <Box className={classes.warningText}>?????????????????????????????????, ??????10?????????????????????????????????????????????????????????</Box>
              <Box className={classes.closeIcon} onClick={() => warningStatus(false)}>
                <CloseIcon style={{ fontSize: 14 }} />
              </Box>
            </Box>
          ) : null}

          <InputBase
            multiline={true}
            className={classes.input}
            aria-label="empty textarea"
            placeholder="??????????????????"
            value={message}
            onInput={(e: any) => handleType(e)}
            onKeyPress={(e: any) => handleKeyPress(e)}
            rowsMax={2}
            inputProps={{ maxLength: 256, style: { fontSize: 12 } }}
          />
          <IconButton
            type="submit"
            style={{
              height: 30,
              width: 30,
              marginInline: 5,
            }}
          >
            <SendIcon style={{ fontSize: 22, color: Colors.grey[400] }} />
          </IconButton>
        </Box>
      </form>
    </div>
  )
}

LiveChatInput.defaultProps = {
  protection: false,
}

export default LiveChatInput
