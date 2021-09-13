/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Typography, Icon, Button, OutlinedInput, IconButton, useTheme, useMediaQuery } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'
import React, { useState, useEffect } from 'react'
import sanitizeHtml from 'sanitize-html'
import i18n from '@locales/i18n'
import useStyles from './styles'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import _, { size } from 'lodash'
// import { showDialog } from '@store/common/actions'
// import { NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import { useAppSelector } from '@store/hooks'
// import { useAppDispatch, useAppSelector } from '@store/hooks'
import userProfileStore from '@store/userProfile'
import { UserProfile } from '@services/user.service'
import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'
import { listMessages, listUsers } from 'src/graphql/queries'
import { createMessage, createUser, updateMessage } from 'src/graphql/mutations'
// import { createMessage, deleteMessage } from "src/graphql/mutations";
import { onCreateMessage, onUpdateMessage } from 'src/graphql/subscriptions'
import * as APIt from 'src/types/graphqlAPI'
import useDetailVideo from '../useDetailVideo'
// import usePurchaseTicketSuperChat from '../usePurchaseTicket'
import ChatTextMessage from '@containers/VideoLiveStreamContainer/ChatContainer/ChatTextMessage'
import PremiumChatDialog from '@containers/VideoLiveStreamContainer/ChatContainer/PremiumChatDialog'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import DonateMessage from './DonateMessage'

type ChatContainerProps = {
  onPressDonate?: (donatedPoint: number, purchaseComment: string) => void
  onCloseChatPanel?: () => void
  userHasViewingTicket?: boolean
  key_video_id?: string
  myPoint?: any
  handleKeyboardVisibleState: any
}

export const purchasePoints = {
  p_100: {
    id: 'p_100',
    value: 100,
    backgroundColor: '#2680EB',
    borderColor: '#2680EB',
    flex: 65.5,
    maxLengthInput: 50,
    displayTime: 0
  },
  p_300: {
    id: 'p_300',
    value: 300,
    backgroundColor: '#01B7FB',
    borderColor: '#01B7FB',
    flex: 86,
    maxLengthInput: 50,
    displayTime: 0
  },
  p_500: {
    id: 'p_500',
    value: 500,
    backgroundColor: '#0FB732',
    borderColor: '#0FB732',
    flex: 94,
    maxLengthInput: 150,
    displayTime: 120
  },
  p_1000: {
    id: 'p_1000',
    value: 1000,
    backgroundColor: '#EBD600',
    borderColor: '#EBD600',
    flex: 94,
    maxLengthInput: 200,
    displayTime: 300
  },
  p_3000: {
    id: 'p_3000',
    value: 3000,
    backgroundColor: '#FF6A1C',
    borderColor: '#FF6A1C',
    flex: 98,
    maxLengthInput: 225,
    displayTime: 600
  },
  // p_2500: {
  //   id: 'p_2500',
  //   value: 5000,
  //   backgroundColor: '#9147F9',
  //   borderColor: '#9147F9',
  //   width: 90,
  // },
  p_5000: {
    id: 'p_5000',
    value: 5000,
    backgroundColor: '#9147F9',
    borderColor: '#9147F9',
    flex: 112,
    maxLengthInput: 250,
    displayTime: 1800
  },
  p_10000: {
    id: 'p_10000',
    value: 10000,
    backgroundColor: '#C91315',
    borderColor: '#C91315',
    flex: 151,
    maxLengthInput: 270,
    displayTime: 3600
  },
}

type MessageValidationType = {
  message: string
}

export const sanitizeMess = (content: string) :string =>
  sanitizeHtml(content, {
    allowedTags: [],
    allowedAttributes: {},
  })

const ChatContainer: React.FC<ChatContainerProps> = ({
  onPressDonate,
  userHasViewingTicket,
  key_video_id,
  myPoint,
  handleKeyboardVisibleState,
}) => {
  // const { t } = useTranslation('common')
  // const [messageText, setMessageText] = useState<string>('')
  const [purchaseDialogVisible, setPurchaseDialogVisible] = useState<boolean>(false)
  const [messActiveUser, setMessActiveUser] = useState<string | number>('')
  const [allUsers, setAllUsers] = useState([])
  const [successFlagGetListUSer, setSuccessFlagGetListUSer] = useState(false)
  const [successFlagGetAddUSer, setSuccessFlagGetAddUSer] = useState(false)
  const { selectors } = userProfileStore
  const userProfile = useAppSelector<UserProfile>(selectors.getUserProfile)
  // console.log('userProfile', JSON.stringify(userProfile));
  const initialFruits: APIt.Message[] = []
  const [stateMessages, setStateMessages] = useState(initialFruits)
  const [chatUser, setChatUser] = useState<any>([])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { checkNgWord } = useCheckNgWord()

  const { userResult, streamingSecond } = useDetailVideo()
  // const userResult = {streamer: 0}
  // const { dataPurchaseTicketSuperChat } = usePurchaseTicketSuperChat()
  // const dispatch = useAppDispatch()

  const validationSchema = Yup.object().shape({
    message: Yup.string()
      .required(i18n.t('common:live_stream_screen.chat_input_text_validate_msg_empty'))
      .max(50, i18n.t('common:live_stream_screen.chat_input_text_validate_msg_50_char_exceed'))
      .trim(),
  })

  const { handleChange, values, handleSubmit, errors } = useFormik<MessageValidationType>({
    initialValues: {
      message: '',
    },
    validationSchema,
    onSubmit: (values) => {
      createMess(sanitizeMess(values.message))
      values.message = ''
    },
  })
  const classes = useStyles({ chatValidationError: !!errors.message })

  const handleCreateUserDB = async () => {
    console.log(
      `{
      // id:userProfile?.id,
      uuid: userProfile?.attributes?.uuid,
      avatar: userProfile?.attributes?.avatar_url,
      user_name: userProfile?.attributes?.nickname,
    }`,
      JSON.stringify({
        id: userProfile?.id,
        uuid: userProfile?.attributes?.uuid,
        avatar: userProfile?.attributes?.avatar_url,
        user_name: userProfile?.attributes?.nickname,
      })
    )

    const abc = await API.graphql(
      graphqlOperation(createUser, {
        input: {
          // id:userProfile?.id,
          uuid: userProfile?.attributes?.uuid,
          avatar: userProfile?.attributes?.avatar_url,
          user_name: userProfile?.attributes?.nickname,
        },
      })
    )
    console.log('abc', abc)
    setSuccessFlagGetAddUSer(true)
  }

  const getListUser = async () => {
    try {
      const listQV: APIt.ListMessagesQueryVariables = {}
      const userReq: any = await API.graphql(graphqlOperation(listUsers, listQV))
      setAllUsers(userReq.data.listUsers.items)
      if (size(userReq.data.listUsers.items) > 0) {
        setTimeout(() => {
          setSuccessFlagGetListUSer(true)
        }, 500)
      } else {
        setSuccessFlagGetListUSer(true)
      }
      // trick: nếu có data thì sau 500ms mới set cờ successFlagGetListUSer=true; để đảm bảo lúc chạy vào checkUserExist lúc nào data AllsUser cũng đã được set dữ liệu
      console.log('getListUser; ', userReq)
    } catch (error) {
      console.error(error)
    }
  }

  const subscribeAction = () => {
    const pubSubClient = API.graphql(graphqlOperation(onCreateMessage))
    pubSubClient.subscribe({
      next: (sub: GraphQLResult<APIt.OnCreateMessageSubscription>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const subMessage = sub?.value
        if (subMessage.data.onCreateMessage.video_id === key_video_id) {
          setStateMessages((stateMessages) => [...stateMessages, subMessage.data.onCreateMessage])
        }
      },
      error: (error) => console.warn(error),
    })

    const updateMessSubscription = API.graphql(graphqlOperation(onUpdateMessage))
    updateMessSubscription.subscribe({
      next: (sub: GraphQLResult<APIt.OnUpdateMessageSubscription>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const subMessage = sub?.value
        const updatedMess = subMessage.data.onUpdateMessage
        if (updatedMess.video_id === key_video_id) {
          setStateMessages((stateMessages) => {
            const foundIndex = stateMessages.findIndex(item => {
              return item.id === updatedMess.id
            })
            const newStateMess = [...stateMessages]
            if(foundIndex !== -1) {
              newStateMess[foundIndex] = updatedMess
              return [...newStateMess]
            } else {
              return [...stateMessages]
            }
          })
          
        }
      },
      error: (error) => console.warn(error),
    })
  }

  useEffect(() => {
    getListUser()
  }, [])

  const getMessages = async() => {
    try {
      const listQV: APIt.ListMessagesQueryVariables = key_video_id ? { filter: { video_id: { eq: key_video_id } } } : {}
      const messagesResults: any = await API.graphql(graphqlOperation(listMessages, listQV))
      console.log('getMessages Results; ', messagesResults)
      setStateMessages(messagesResults.data.listMessages.items)
      subscribeAction()
    } catch (error) {
      console.error(error)
    }
  }  

  const checkUserExist = (checkedAllUsers: any) => {
    if (!checkedAllUsers) {
      console.log('tạo mới tài khoản vì k tồn tại checkedAllUsers')
      handleCreateUserDB()
    } else {
      console.log(
        'checkedAllUsers; ',
        JSON.stringify(checkedAllUsers),
        '\nuserProfile; ',
        JSON.stringify(userProfile),
        'userProfile.uuid ',
        userProfile?.attributes?.uuid
      )

      const currentUser = checkedAllUsers.find((user) => user.uuid === userProfile?.attributes?.uuid)
      if (currentUser) {
        console.log('Tồn tại currentUser ', currentUser)
        setChatUser(currentUser)
        setSuccessFlagGetAddUSer(true)
      } else {
        console.log('tồn tại checkedAllUsers nhưng  userProfile chưa có trong listUser của DynamoDB nên cần tạo mới', userProfile)
        handleCreateUserDB()
      }
    }
  }

  useEffect(() => {
    if (userProfile && successFlagGetListUSer) {
      checkUserExist(allUsers)
    }
  }, [userProfile, successFlagGetListUSer])

  useEffect(() => {
    if (key_video_id) {
      getMessages()
    }
  }, [key_video_id])

  // useEffect(() => {
  //   if (dataPurchaseTicketSuperChat?.code === 200 && purchaseComment) {
  //     createMess(purchaseComment, purchasePoints[purchaseValueSelected].value)
  //     setPurchaseComment('')
  //   }
  // }, [dataPurchaseTicketSuperChat])

  async function deleteMsg(idDelete: string) {
    const input = {
      id: idDelete,
      delete_flag: true
    };
    const deleteAt: any = await API.graphql(graphqlOperation(updateMessage, {input: input}));
    // console.log(deleteAt);
    if (deleteAt.data) {
      // setStateMessages(stateMessages.filter(({ id }) => id !== idDelete));
    }
  }

  // async function deleteMsg(idDelete: string) {
  //   const input = {
  //     id: idDelete
  //   };
  //   const deleteAt: any = await API.graphql(graphqlOperation(deleteMessage, {input: input}));
  //   console.log(deleteAt);
  //   if (deleteAt.data) {
  //     // setStateMessages(stateMessages.filter(({ id }) => id !== idDelete));
  //   }
  // }

  // const getChatData = () =>
  //   Array(30)
  //     .fill('')
  //     .map((_, i) => ({
  //       id: i,
  //       user: 'Account Name',
  //       content: 'チャットのコメントははここに表示されます。チャットのコメントははここに表示されます。',
  //     }))

  const handleChatInputOnFocus = () => {
    handleKeyboardVisibleState(true)
  }

  const handleChatInputOnBlur = () => {
    handleKeyboardVisibleState(false)
  }

  const handlePremiumChatBoxClickOutside = () => {
    setPurchaseDialogVisible(false)
  }

  const purchaseInfoDialog = () => (
    <PremiumChatDialog 
      createMess={createMess}
      onClickOutside={handlePremiumChatBoxClickOutside} onPressDonate={onPressDonate} myPoint={myPoint} 
    />
  )

  const purchaseIconClick = () => {
    setPurchaseDialogVisible(!purchaseDialogVisible)
  }

  const getMessageWithoutNgWords = (chatMessContent) => {
    const ngWords = checkNgWord(chatMessContent)
    if (ngWords.length !== 0) {
      ngWords.map((item) => {
        if (chatMessContent.includes(item)) {
          const regex = new RegExp(item, 'g')
          chatMessContent = chatMessContent.replace(regex, '*'.repeat(item.length))
        }
      })
    }
    return chatMessContent
  }

  const createMess = async (message: string, point = 0): Promise<void> => {
    if ((successFlagGetAddUSer || chatUser) && message) {
      const videoTime = streamingSecond
      let input = {
        // id is auto populated by AWS Amplify
        owner: chatUser.user_name,
        text: sanitizeMess(message),
        uuid: chatUser.uuid,
        video_id: key_video_id,
        video_time: videoTime,
        // point: 500,//optional : show when Post is use pOint
        is_premium: false,
        userId: chatUser.uuid,
      }
      if (point) {
        input = {
          ...input,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          point: point.toString(),
          is_premium: true,
          display_avatar_time: videoTime + purchasePoints[`p_${point}`].displayTime
        }
      }
      console.log('input', input)

      await API.graphql(graphqlOperation(createMessage, { input }))
    }
  }

  const handleSubmitChatContent = async () => {
    // const content = messageText
    // if (content.length === 0) {
    //   setChatInputValidationError(t('live_stream_screen.chat_input_text_validate_msg_empty'))
    // }
    // if (content.length > 50) {
    //   setChatInputValidationError('live_stream_screen.chat_input_text_validate_msg_50_char_exceed')
    // }
    // // dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: 'aaaaaaaa' }))

    // if (!_.isEmpty(checkNgWord(content))) {
    //   setChatInputValidationError('チャットが未入力です')
    // }
    handleSubmit()
    // // Submit chat message
  }

  const chatInputComponent = () => (
    <Box className={classes.chatInputMobileContainer}>
      {purchaseDialogVisible && isMobile && purchaseInfoDialog()}
      <Box className={classes.chatInputContainer}>
        {purchaseDialogVisible && !isMobile && purchaseInfoDialog()}
        <Box className={classes.chatBox}>
          <IconButton id="btnOpenPremiumChatDialog" onClick={purchaseIconClick} className={classes.iconPurchase}>
            <img id="btnOpenPremiumChatDialogImage" src="/images/ic_purchase.svg" />
          </IconButton>
          <OutlinedInput
            id={'message'}
            multiline
            rows={3}
            autoComplete="nope"
            onChange={handleChange}
            placeholder={i18n.t('common:live_stream_screen.message_placeholder')}
            value={values.message}
            classes={{ root: classes.input, input: classes.chatTextInput }}
            margin="dense"
            onFocus={handleChatInputOnFocus}
            onBlur={handleChatInputOnBlur}
          />
          <Button onClick={handleSubmitChatContent} className={classes.iconButtonBg}>
            <Icon className={`fa fa-paper-plane ${classes.sendIcon}`} fontSize="small" />
          </Button>
        </Box>
        {errors.message && <Typography className={classes.chatInputErrorText}>{errors.message}</Typography>}
      </Box>
    </Box>
  )

  const chatBoardComponent = () => (
    <Box className={`${classes.chatBoardContainer}`}>
      <Box className={`${classes.dialogMess} ${messActiveUser ? classes.dialogMessShow : ''}`}>
        {/* <DonateMessage message={msg}/> */}
        <Box
          className={`${classes.messContentOuter}`}
          onClick={() => {
            setMessActiveUser('')
          }}
        ></Box>
      </Box>
      <Box className={classes.chatBoard}>
        {stateMessages
          // sort messages oldest to newest client-side
          .sort((a: any, b: any) => a.createdAt.localeCompare(b.createdAt))
          .map((msg: any, i) => {
            // only display message is not deleted or display all mess if user is streamer 
            return (!msg.delete_flag || userResult.streamer) ? (msg.is_premium ? (
                <DonateMessage 
                  message={msg} deleteMess={deleteMsg} 
                  getMessageWithoutNgWords={getMessageWithoutNgWords} 
                  is_streamer={userResult?.streamer}
                />
              ) : (
                <ChatTextMessage 
                  key={i} message={msg} getMessageWithoutNgWords={getMessageWithoutNgWords}
                  deleteMess={deleteMsg}
                  is_streamer={userResult?.streamer}
                />
              )
          ) : ''
        })}
      </Box>
      {chatInputComponent()}
    </Box>
  )
  const getUserWatchingList = () =>
    Array(20)
      .fill('')
      .map((_, i) => ({
        id: i,
        user_avatar: '/images/dataVideoFake/fake_avatar.png',
      }))

  const userDoesNotHaveViewingTicketView = () => (
    <Box className={classes.chatPurchaseTicketBox}>
      <Typography className={classes.chatPurchaseTicketNote}>{i18n.t('common:live_stream_screen.chat_purchase_ticket_note')}</Typography>
    </Box>
  )

  const scrollToCurrentMess = () => {
    const current_mess = document.getElementById('chat_23')
    const mess_container = current_mess.parentNode as Element
    mess_container.scrollTop = current_mess.offsetTop
  }

  const chatContent = () => (
    <Box className={classes.chatContent}>
      <Button onClick={scrollToCurrentMess}>Scroll to chat mess</Button>
      <Box className={classes.userWatchingList}>
        {getUserWatchingList().map(({ id, user_avatar }) => (
          <Box
            key={id}
            className={classes.userWatchingItem}
            onClick={() => {
              if (messActiveUser || messActiveUser === 0) {
                setMessActiveUser('')
              } else {
                setMessActiveUser(id)
              }
            }}
          >
            <img src={user_avatar} />
          </Box>
        ))}
      </Box>
      {chatBoardComponent()}
    </Box>
  )

  return (
    <Box className={classes.container}>
      {!isMobile && (
        <Box className={classes.chatHeader}>
          <Typography className={classes.headerTitle}>{'チャット'}</Typography>
        </Box>
      )}
      {userHasViewingTicket ? chatContent() : userDoesNotHaveViewingTicketView()}
      {/*<Box pt={22 / 8} pb={4} maxWidth={280} className={classes.buttonContainer} onClick={onPressDonate}>*/}
      {/*  <ButtonPrimary type="submit" round fullWidth>*/}
      {/*    {'Donate Points'}*/}
      {/*  </ButtonPrimary>*/}
      {/*</Box>*/}
    </Box>
  )
}

export default ChatContainer
