import { useEffect, useRef, useState } from 'react'
import { makeStyles, Box } from '@material-ui/core'
import MessageInputArea from '@components/Chat/MessageInputArea'
import { socketActions } from '@store/socket/actions'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import ImageUploader from './ImageUploader'
import { currentUserId } from '@store/auth/selectors'
import {
  messages,
  membersSuggest,
  availableMembers,
  lastKey as key,
  paginating as paging,
  hasError as hasErrorSelector,
} from '@store/socket/selectors'
import { CHAT_ACTION_TYPE, CHAT_MESSAGE_TYPE } from '@constants/socket.constants'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import moment from 'moment'
import Loader from '@components/Loader'
import { ACTIONS } from '@components/Chat/constants'
import MessageList from '@components/Chat/MessageList'
import RoomHeader from '@components/Chat/RoomHeader'
import { MessageType, ParentItem } from '@components/Chat/types/chat.types'
import ESReport from '@containers/Report'
import { REPORT_TYPE } from '@constants/common.constants'
import { ESReportProps } from '@containers/Report'
import MessageModal from '@components/Chat/MessageModal'
import { Colors } from '@theme/colors'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { showDialog } from '@store/common/actions'
import { NG_WORD_DIALOG_CONFIG, NG_WORD_AREA } from '@constants/common.constants'
import i18n from '@locales/i18n'
import useCopyToClipboard from '@utils/hooks/useCopyToClipboard'
import { NextRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'

interface ChatRoomContainerProps {
  roomId: string | string[]
  router: NextRouter
}

export interface UploadStateType {
  id: string | null
  uploading: boolean
}

export interface MessageModalStateProps {
  open: boolean
  replyMessage: null | ParentItem | string | MessageType
}

const ChatRoomContainer: React.FC<ChatRoomContainerProps> = ({ roomId, router }) => {
  const [uploadMeta, setMeta] = useState<UploadStateType>({ id: null, uploading: false })
  const [reply, setReply] = useState<MessageType | null>(null)
  const [reporting, setReporting] = useState<boolean>(false)
  const [reportData, setReportData] = useState<ESReportProps>(null)
  const [modalReply, setModalReply] = useState<MessageModalStateProps>({ open: false, replyMessage: null })
  const { copy } = useCopyToClipboard(true, i18n.t('common:chat.chat_copied'))
  const classes = useStyles()

  const checkNgWord = useCheckNgWord()

  const dispatch = useAppDispatch()

  const ref = useRef<{ handleUpload: () => void }>(null)
  const inputRef = useRef<{ clearInput: () => void }>(null)

  const userId = useAppSelector(currentUserId)
  const data = useAppSelector(messages)
  const usersWithAll = useAppSelector(membersSuggest)
  const usersAvailable = useAppSelector(availableMembers)
  const lastKey = useAppSelector(key)
  const paginating = useAppSelector(paging)
  const hasError = useAppSelector(hasErrorSelector)

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

  useEffect(() => {
    if (roomId) {
      setReply(null)
    }
  }, [roomId])

  const handlePress = (text: string) => {
    if (_.isEmpty(checkNgWord(text))) {
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
      if (inputRef.current) inputRef.current.clearInput()
    } else {
      dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: NG_WORD_AREA.chat_section }))
    }
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

  const onDelete = (currentMessage: MessageType) => {
    if (currentMessage && currentMessage.sortKey) {
      const params = {
        sortKey: currentMessage.sortKey,
        roomId: currentMessage.chatRoomId,
        userId: userId,
        action: CHAT_ACTION_TYPE.DELETE_MESSAGE,
      }
      dispatch(socketActions.socketSend(params))
    }
  }
  const onReport = (reportData: ESReportProps) => {
    setReportData(reportData)
    setReporting(true)
  }

  const closeMessageModal = () => {
    setModalReply({ ...modalReply, open: false })
  }
  const handleReplyDetail = (replyMessage: null | ParentItem | string | MessageType) => {
    setModalReply({ ...modalReply, replyMessage: replyMessage, open: true })
  }

  const onCopy = (currentMessage: MessageType) => {
    const text = _.get(currentMessage, 'msg', '')
    copy(text)
  }

  const renderErroMesage = () => {
    if (hasError && _.isEmpty(data)) {
      return (
        <Box display="flex" flex={1} justifyContent="center" alignItems="center" height={'100%'}>
          {i18n.t('common:chat.room_not_found')}
        </Box>
      )
    }
    return null
  }

  const onNavigateToProfile = (code: string) => {
    router.push(`${ESRoutes.PROFILE}/${code}`)
  }

  return (
    <Box className={classes.room}>
      <Box className={classes.header} px={3} py={2}>
        <RoomHeader roomId={roomId} />
      </Box>
      <Box className={classes.list}>
        {renderLoader()}
        {renderErroMesage()}
        {!hasError && !_.isEmpty(data) && _.isArray(data) && (
          <MessageList
            reply={onReply}
            report={onReport}
            copy={onCopy}
            currentUser={userId}
            paginating={paginating}
            delete={onDelete}
            onFetchMore={onFetchMore}
            onReplyClick={handleReplyDetail}
            users={usersWithAll}
            navigateToProfile={onNavigateToProfile}
            messages={data}
          />
        )}
      </Box>
      {userId && !hasError && data ? (
        <Box className={classes.input}>
          <MessageInputArea
            ref={inputRef}
            reply={reply}
            currentUser={userId}
            onCancelReply={() => setReply(null)}
            onPressSend={handlePress}
            users={usersAvailable}
            onPressActionButton={handlePressActionButton}
          />
        </Box>
      ) : null}
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
          members={usersWithAll}
          handleClose={() => setReporting(false)}
        />
      ) : null}
      <MessageModal
        open={modalReply.open}
        hide={closeMessageModal}
        replyMessage={modalReply.replyMessage}
        members={usersWithAll}
        color={Colors.text[200]}
        bgColor={'transparent'}
      />
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
