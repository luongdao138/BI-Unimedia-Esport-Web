import React from 'react'
import { Box, makeStyles, DialogContent } from '@material-ui/core'
import ESDialog from '@components/Dialog'
import { ReplyContent } from '../elements'
import { ReplyContentProps } from '../elements/ReplyContent'

export interface MessageModalProps extends ReplyContentProps {
  open: boolean
  hide: () => void
}

const MessageModal: React.FC<MessageModalProps> = (props) => {
  const classes = useStyles()
  const { members, replyMessage, bgColor, color, open, hide } = props

  return (
    <Box className={classes.container}>
      <ESDialog open={open} title="メンバーを追加" handleClose={() => hide()} bkColor="rgba(0,0,0,0.8)" alignTop>
        <DialogContent>
          <Box className={`${classes.scroll}`}>
            <ReplyContent replyMessage={replyMessage} members={members} bgColor={bgColor} color={color} numberOfLines={null} />
          </Box>
        </DialogContent>
      </ESDialog>
    </Box>
  )
}

MessageModal.defaultProps = {}

const useStyles = makeStyles(() => ({
  container: {},
  scroll: {
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
}))

export default MessageModal
