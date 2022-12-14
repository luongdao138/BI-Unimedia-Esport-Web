import React, { useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { makeStyles, Box, Typography, Theme } from '@material-ui/core'
import Loader from '@components/Loader'
import ImageUploader from '../ChatRoomContainer/ImageUploader'
import MessageInputArea from '@components/Chat/MessageInputArea'
import { ESRoutes } from '@constants/route.constants'
import { createMetaSelector } from '@store/metadata/selectors'
import { getFriendList, resetAddUsers } from '@store/chat/actions'
import { friendList } from '@store/chat/selectors'
import { currentUserId } from '@store/auth/selectors'
import { members } from '@store/socket/selectors'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import ESSelectInput, { SelectInputItem } from '@components/SelectInput'
import chatStore from '@store/chat'
import { v4 as uuidv4 } from 'uuid'
import { socketActions } from '@store/socket/actions'
import ESChip from '@components/Chip'
import { ACTIONS } from '@components/Chat/constants'
import { CHAT_ACTION_TYPE, CHAT_MESSAGE_TYPE } from '@constants/socket.constants'
import * as socket from '@store/socket/selectors'
import { useRouter } from 'next/router'
import { getDirectRoom } from '@services/chat.service'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { showDialog } from '@store/common/actions'
import { NG_WORD_DIALOG_CONFIG, NG_WORD_AREA } from '@constants/common.constants'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'

const { actions } = chatStore

const _getFriendsMeta = createMetaSelector(actions.getFriendList)

export interface ChatRoomCreateContainerProps {
  dm?: boolean
  singleUser?: any
}

interface UploadStateType {
  uploading: boolean
}

const ChatRoomCreateContainer: React.FC<ChatRoomCreateContainerProps> = (props) => {
  const { dm, singleUser } = props
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const friends = useAppSelector(friendList)
  const getFriendsMeta = useAppSelector(_getFriendsMeta)
  const userId = useAppSelector(currentUserId)
  const users = useAppSelector(members)
  const actionPending = useAppSelector(socket.actionPending)
  const newRoomId = useAppSelector(socket.newRoomId)
  const [selectedUsers, setSelectedUsers] = useState([] as number[])
  const [roomId, setRoomId] = useState(null as null | string)
  const [uploadMeta, setMeta] = useState<UploadStateType>({ uploading: false })
  const { checkNgWord } = useCheckNgWord()

  const ref = useRef<{ handleUpload: () => void }>(null)
  const inputRef = useRef<{ clearInput: () => void }>(null)

  useEffect(() => {
    setRoomId(uuidv4())

    return () => {
      dispatch(resetAddUsers())
    }
  }, [])

  useEffect(() => {
    if (singleUser) {
      setSelectedUsers([singleUser.id])
    }
  }, [singleUser])

  useEffect(() => {
    if (_.isString(newRoomId)) {
      dispatch(socketActions.clearNewRoomId())
      navigateRoom(newRoomId)
    }
  }, [newRoomId])

  const isDirect = () => {
    return selectedUsers.length === 1
  }

  const createRoomByImg = (url) => {
    dispatch(
      socketActions.createChatRoom({
        action: CHAT_ACTION_TYPE.CREATE_ROOM,
        userIds: selectedUsers,
        firstMsg: url,
        type: CHAT_MESSAGE_TYPE.IMAGE,
        roomId: roomId,
      })
    )
    setMeta({ uploading: false })
  }

  const createRoomByText = (text) => {
    dispatch(
      socketActions.createChatRoom({
        action: CHAT_ACTION_TYPE.CREATE_ROOM,
        userIds: selectedUsers,
        firstMsg: text.trim(),
        type: CHAT_MESSAGE_TYPE.TEXT,
      })
    )
  }

  const handlePress = (text: string) => {
    if (_.isEmpty(checkNgWord(text))) {
      if (isDirect()) {
        getDirectRoom(selectedUsers[0]).then((result) => {
          if (result.content) {
            const currentTimestamp = moment().valueOf()
            const clientId = uuidv4()
            const payload = {
              action: CHAT_ACTION_TYPE.SEND_MESSAGE,
              roomId: result.content.chatRoomId,
              createdAt: currentTimestamp,
              userId: userId,
              msg: text.trim(),
              clientId: clientId,
              type: CHAT_MESSAGE_TYPE.TEXT,
            }
            dispatch(socketActions.sendMessage(payload))
            dispatch(socketActions.clearNewRoomId())
            navigateRoom(result.content.chatRoomId)
          } else {
            createRoomByText(text)
          }
        })
        if (inputRef.current) inputRef.current.clearInput()
      } else {
        createRoomByText(text)
        if (inputRef.current) inputRef.current.clearInput()
      }
    } else {
      dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: NG_WORD_AREA.chat_section }))
    }
  }

  const handlePressActionButton = (type: number) => {
    if (type === ACTIONS.IMAGE_UPLOAD)
      if (ref.current && !uploadMeta.uploading) {
        setMeta({ uploading: false })
        ref.current.handleUpload()
      }
  }

  const imageErrorHandler = (error: any) => {
    // eslint-disable-next-line no-console
    console.log(error)
    setMeta({ uploading: false })
  }

  const imageEventHandler = (url: string, isPending: boolean) => {
    const currentTimestamp = moment().valueOf()
    currentTimestamp
    if (isPending) {
      setMeta({ uploading: true })
    } else {
      if (isDirect()) {
        getDirectRoom(selectedUsers[0])
          .then((result) => {
            if (result.content) {
              const currentTimestamp = moment().valueOf()
              const clientId = uuidv4()
              const payload = {
                action: CHAT_ACTION_TYPE.SEND_MESSAGE,
                roomId: result.content.chatRoomId,
                createdAt: currentTimestamp,
                userId: userId,
                msg: url,
                clientId: clientId,
                type: CHAT_MESSAGE_TYPE.IMAGE,
              }
              dispatch(socketActions.sendMessage(payload))
              dispatch(socketActions.clearNewRoomId())
              setMeta({ uploading: false })
              navigateRoom(result.content.chatRoomId)
            } else {
              createRoomByImg(url)
            }
          })
          .catch((_e) => {
            setMeta({ uploading: false })
          })
      } else {
        createRoomByImg(url)
      }
    }
  }

  const navigateRoom = (id: string) => {
    router.push(`${ESRoutes.MESSAGE}${id}`, undefined, { shallow: true })
  }

  const handleOnUserSelected = (selected: (string | SelectInputItem)[]) => {
    const ids = selected.map((item) => (_.isString(item) ? 0 : item.id)) as number[]
    setSelectedUsers(ids)
  }

  const handleSearchInput = (text: string) => {
    dispatch(getFriendList({ type: 'group', keyword: text }))
  }

  const renderLoader = () => {
    if (actionPending || uploadMeta.uploading) {
      return (
        <Box className={classes.loaderBox}>
          <Loader />
        </Box>
      )
    }
    return null
  }
  const renderHolder = () => {
    if (!actionPending || !uploadMeta.uploading) {
      return (
        <Box display="flex" flex={1} justifyContent="center" alignItems="center" height={'100%'}>
          <Typography component="p" className={classes.placeholder} variant="body2">
            {i18n.t('common:chat.select_destination')}
          </Typography>
        </Box>
      )
    }
    return null
  }

  return (
    <Box className={classes.room}>
      <Box className={classes.memberSelectContainer}>
        <Box className={classes.titleBox}>
          <Typography variant="h2" className={classes.title}>
            {i18n.t('common:chat.destination')}
          </Typography>
        </Box>
        <Box className={classes.inputArea}>
          {dm ? (
            <Box>
              <ESChip size="small" label={singleUser.nickname} />
            </Box>
          ) : (
            <ESSelectInput
              items={
                _.isArray(friends) && !_.isEmpty(friends)
                  ? friends.map((friend) => ({
                      id: parseInt(friend.id),
                      nickName: friend.attributes && friend.attributes.nickname ? friend.attributes.nickname : '',
                      avatar: friend.attributes.avatar,
                      userCode: _.get(friend, 'attributes.user_code', ''),
                    }))
                  : []
              }
              onItemsSelected={handleOnUserSelected}
              onSearchInput={handleSearchInput}
              loading={getFriendsMeta.pending}
            />
          )}
        </Box>
      </Box>
      <Box className={classes.list}>
        <Box className={`${classes.content} scroll-bar`}>
          {renderLoader()}
          {renderHolder()}
        </Box>
      </Box>
      <Box className={classes.input}>
        <MessageInputArea
          ref={inputRef}
          onPressSend={handlePress}
          users={users}
          onPressActionButton={handlePressActionButton}
          disabled={actionPending || uploadMeta.uploading || selectedUsers.length === 0}
        />
      </Box>

      <ImageUploader
        ref={ref}
        roomId={roomId}
        onResponse={imageEventHandler}
        onImageSelected={imageEventHandler}
        onError={imageErrorHandler}
      />
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  dropZone: {
    display: 'none',
  },
  inputArea: {
    pointerEvents: 'auto',
  },
  title: { fontSize: 17 },
  titleBox: {
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  memberSelectContainer: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    borderBottom: '1px solid #212121',
    alignItems: 'flex-start',
    columnGap: 14,
    padding: '8px 12px',
  },
  placeholder: {
    whiteSpace: 'pre-line',
    textAlign: 'center',
    color: Colors.white_opacity[30],
  },
  [theme.breakpoints.down('sm')]: {
    memberSelectContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      paddingLeft: 60,
      pointerEvents: 'none',
      right: 0,
      zIndex: 1000,
    },
  },
  [theme.breakpoints.down('xs')]: {
    placeholder: {
      fontSize: 10,
    },
  },
}))

export default ChatRoomCreateContainer
