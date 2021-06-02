import { useEffect, useRef, useState } from 'react'
import { makeStyles, Box } from '@material-ui/core'
import MessageInputArea from '@components/Chat/MessageInputArea'
import { socketActions } from '@store/socket/actions'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import ImageUploader from './ImageUploader'
import { currentUserId } from '@store/auth/selectors'
import { messages, members, lastKey as key, paginating as paging } from '@store/socket/selectors'
import { CHAT_ACTION_TYPE, CHAT_MESSAGE_TYPE } from '@constants/socket.constants'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import moment from 'moment'
import Loader from '@components/Loader'
import { ACTIONS } from '@components/Chat/constants'
import MessageList from '@components/Chat/MessageList'
import RoomHeader from '@components/Chat/RoomHeader/index'
import { MessageType } from '@components/Chat/types/chat.types'
import ESReport from '@containers/Report'
import { REPORT_TYPE } from '@constants/common.constants'
import { ESReportProps } from '@containers/Report'

interface ChatRoomContainerProps {
  roomId: string | string[]
}

export interface UploadStateType {
  id: string | null
  uploading: boolean
}

const ChatRoomContainer: React.FC<ChatRoomContainerProps> = ({ roomId }) => {
  const [uploadMeta, setMeta] = useState<UploadStateType>({ id: null, uploading: false })
  const [reply, setReply] = useState<MessageType | null>(null)
  const [reporting, setReporting] = useState<boolean>(false)
  const [reportData, setReportData] = useState<ESReportProps>(null)
  const classes = useStyles()

  const dispatch = useAppDispatch()

  const ref = useRef<{ handleUpload: () => void }>(null)

  const userId = useAppSelector(currentUserId)
  const data = useAppSelector(messages)
  const users = useAppSelector(members)
  const lastKey = useAppSelector(key)
  const paginating = useAppSelector(paging)

  useEffect(() => {
    if (userId && roomId) {
      const payload = {
        action: CHAT_ACTION_TYPE.GET_ROOM_MESSAGES,
        roomId: roomId,
        userId: userId,
        lastKey: null,
      }
      dispatch(socketActions.initRoomLoad(payload))
    }
  }, [userId, roomId])

  const handlePress = (text: string) => {
    const currentTimestamp = moment().valueOf()
    const clientId = uuidv4()
    const payload = {
      action: CHAT_ACTION_TYPE.SEND_MESSAGE,
      roomId: roomId,
      createdAt: currentTimestamp,
      userId: userId,
      msg: text,
      clientId: clientId,
      type: CHAT_MESSAGE_TYPE.TEXT,
    }
    if (reply === null) {
      dispatch(socketActions.sendMessage(payload))
    } else {
      const replyData = {
        parentId: reply.sortKey,
        parentMsg: {
          msg: reply.msg,
          chatRoomId: roomId,
          sortKey: reply.sortKey,
          userId: reply.userId,
          groupType: 10,
          createdAt: '',
          clientId: reply.clientId,
          type: reply.type,
        },
      }
      dispatch(socketActions.sendMessage(_.omit(_.assign(payload, replyData))))
    }
    setReply(null)
  }
  const handlePressActionButton = (type: number) => {
    if (type === ACTIONS.IMAGE_UPLOAD)
      if (ref.current && !uploadMeta.uploading) {
        const uploaderClientId = uuidv4()
        setMeta({ id: uploaderClientId, uploading: false })
        ref.current.handleUpload()
      }
  }

  const renderLoader = () => {
    if (data === undefined) {
      return (
        <Box className={classes.loaderBox}>
          <Loader />
        </Box>
      )
    }
    return null
  }

  const fetchMore = () => {
    if (lastKey != null) {
      const payload = {
        action: CHAT_ACTION_TYPE.GET_ROOM_MESSAGES,
        roomId: roomId,
        userId: userId,
        lastKey: lastKey,
      }
      dispatch(socketActions.fetchMore(payload))
    }
  }

  const onFetchMore = () => {
    if (paginating === false) {
      fetchMore()
    }
  }

  const imageEventHandler = (url: string, isPending: boolean) => {
    const currentTimestamp = moment().valueOf()
    const payload = {
      action: CHAT_ACTION_TYPE.SEND_MESSAGE,
      roomId: roomId,
      createdAt: currentTimestamp,
      userId: userId,
      msg: url,
      clientId: uploadMeta.id,
      type: CHAT_MESSAGE_TYPE.IMAGE,
    }
    if (isPending) {
      setMeta({ ...uploadMeta, uploading: true })
      dispatch(socketActions.messagePending(payload))
    } else {
      dispatch(socketActions.socketSend(payload))
      setMeta({ id: null, uploading: false })
    }
  }

  const imageErrorHandler = (error: any) => {
    // eslint-disable-next-line no-console
    console.log(error)
    setMeta({ ...uploadMeta, uploading: false })
  }

  const onReply = (currentMessage: MessageType) => {
    setReply(currentMessage)
  }
  const onReport = (reportData: ESReportProps) => {
    setReportData(reportData)
    setReporting(true)
  }

  return (
    <Box className={classes.room}>
      <Box className={classes.header} px={3} py={2}>
        <RoomHeader roomId={roomId} />
      </Box>
      <Box className={classes.list}>
        {renderLoader()}
        {!_.isEmpty(data) && _.isArray(data) && (
          <MessageList
            reply={onReply}
            report={onReport}
            currentUser={userId}
            paginating={paginating}
            onFetchMore={onFetchMore}
            users={users}
            messages={data}
          />
        )}
      </Box>
      <Box className={classes.input}>
        {userId ? (
          <MessageInputArea
            reply={reply}
            currentUser={userId}
            onCancelReply={() => setReply(null)}
            onPressSend={handlePress}
            users={users}
            onPressActionButton={handlePressActionButton}
          />
        ) : null}
      </Box>
      <ImageUploader
        ref={ref}
        roomId={roomId}
        onResponse={imageEventHandler}
        onImageSelected={imageEventHandler}
        onError={imageErrorHandler}
      />
      {reportData ? (
        <ESReport
          msg_body={reportData.msg_body}
          reportType={REPORT_TYPE.CHAT}
          target_id={Number(reportData.target_id)}
          data={reportData.data}
          open={reporting}
          members={users}
          handleClose={() => setReporting(false)}
        />
      ) : null}
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  header: {
    borderBottom: '1px solid #212121',
    height: 68,
  },
  dropZone: {
    display: 'none',
  },
  loaderBox: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    margin: '0 auto',
    '& svg': {
      width: '100%',
    },
  },
  content: {
    flexDirection: 'column-reverse',
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    overflowY: 'auto',
    padding: 20,
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
      visibility: 'visible',
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      opacity: 1,
      visibility: 'visible',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222',
      borderRadius: 6,
      opacity: 1,
      visibility: 'visible',
    },
  },
  room: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: '#000',
  },
  list: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    minHeight: '1.25em',
    position: 'relative',
  },
  input: {
    padding: 9,
    position: 'relative',
    flexGrow: 1,
    width: '100%',
    maxWidth: '100%',
    background: '#101010',
  },
}))

export default ChatRoomContainer
