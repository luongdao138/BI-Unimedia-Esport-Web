/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Typography, Icon, Button, OutlinedInput, IconButton, useTheme, useMediaQuery, ButtonBase } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'
import React, { useState, useEffect, useRef } from 'react'
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
import usePurchaseTicketSuperChat from '../usePurchaseTicket'
import ChatTextMessage from '@containers/VideoLiveStreamContainer/ChatContainer/ChatTextMessage'
import PremiumChatDialog from '@containers/VideoLiveStreamContainer/ChatContainer/PremiumChatDialog'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import DonateMessage from './DonateMessage'
import Avatar from '@components/Avatar/'

type ChatContainerProps = {
  onPressDonate?: (donatedPoint: number, purchaseComment: string) => void
  onCloseChatPanel?: () => void
  userHasViewingTicket?: boolean
  key_video_id?: string
  myPoint?: any
  handleKeyboardVisibleState: any
  donateConfirmModalIsShown: () => boolean
  openPurchasePointModal?: () => void
}

export const purchasePoints = {
  p_100: {
    id: 'p_100',
    value: 100,
    backgroundColor: '#2680EB',
    borderColor: '#2680EB',
    flex: 65.5,
    maxLengthInput: 50,
    displayTime: 0,
  },
  p_300: {
    id: 'p_300',
    value: 300,
    backgroundColor: '#01B7FB',
    borderColor: '#01B7FB',
    flex: 86,
    maxLengthInput: 50,
    displayTime: 0,
  },
  p_500: {
    id: 'p_500',
    value: 500,
    backgroundColor: '#0FB732',
    borderColor: '#0FB732',
    flex: 94,
    maxLengthInput: 150,
    displayTime: 120,
  },
  p_1000: {
    id: 'p_1000',
    value: 1000,
    backgroundColor: '#EBD600',
    borderColor: '#EBD600',
    flex: 94,
    maxLengthInput: 200,
    displayTime: 300,
  },
  p_3000: {
    id: 'p_3000',
    value: 3000,
    backgroundColor: '#FF6A1C',
    borderColor: '#FF6A1C',
    flex: 98,
    maxLengthInput: 225,
    displayTime: 600,
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
    displayTime: 1800,
  },
  p_10000: {
    id: 'p_10000',
    value: 10000,
    backgroundColor: '#C91315',
    borderColor: '#C91315',
    flex: 151,
    maxLengthInput: 270,
    displayTime: 3600,
  },
}
type MessageValidationType = {
  message: string
}

export const sanitizeMess = (content: string): string =>
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
  donateConfirmModalIsShown,
  openPurchasePointModal,
}) => {
  // const { t } = useTranslation('common')
  // const [messageText, setMessageText] = useState<string>('')
  const [purchaseDialogVisible, setPurchaseDialogVisible] = useState<boolean>(false)
  const [messActiveUser, setMessActiveUser] = useState<string | number>('')
  const [allUsers, setAllUsers] = useState([])
  const [successFlagGetListUSer, setSuccessFlagGetListUSer] = useState(false)
  const [successFlagGetAddUSer, setSuccessFlagGetAddUSer] = useState(false)
  const [messagesDonate, setMessagesDonate] = useState([])
  const [displaySeeMore, setDisplaySeeMore] = useState(false)
  // const [isMessInBottom, setIsMessInBottom] = useState(false)

  const getChatData = () =>
    Array(30)
      .fill('')
      .map((_, i) => ({
        id: i,
        user: 'Account Name',
        content: 'チャットのコメントははここに表示されます。チャットのコメントははここに表示されます。',
      }))

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const [chartDataFake, setChartDataFake] = useState(getChatData())

  const { selectors } = userProfileStore

  const userProfile = useAppSelector<UserProfile>(selectors.getUserProfile)
  // const userProfile={
  //   attributes: {
  //     uuid: "2fdb07560f07e403659fa3ebcdc1ab20"
  //   }
  // }

  // console.log('userProfile', JSON.stringify(userProfile));
  const initialFruits: APIt.Message[] = []
  const [stateMessages, setStateMessages] = useState(initialFruits)
  // console.log('🚀 ~ stateMessages', stateMessages)
  const [chatUser, setChatUser] = useState<any>([])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(769))
  const { checkNgWord } = useCheckNgWord()
  const [savedMess, setSavedMess] = useState([])
  // console.log('🚀 ~ savedMess', savedMess)
  const [savedDonateMess, setSavedDonateMess] = useState([])

  const { userResult, streamingSecond, playedSecond, isViewingStream } = useDetailVideo()
  // const userResult = {streamer: 0}
  const { dataPurchaseTicketSuperChat } = usePurchaseTicketSuperChat()
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

  const isPremiumChat = (message: any, is_check_time = true, compare_second?: any) => {
    let compareSecond = compare_second
    if (!compareSecond) {
      if (isViewingStream) {
        compareSecond = streamingSecond
      } else {
        compareSecond = playedSecond
      }
    }
    console.log('🚀 ~ isPremiumChat ~ compareSecond', compareSecond)
    const conditionWithoutTime = +message.point > 300 && message.is_premium === true && !message.delete_flag
    if (!is_check_time) {
      return conditionWithoutTime
    }
    return +message.display_avatar_time > +compareSecond && conditionWithoutTime
  }

  const refOnCreateMess = useRef(null)
  const onCreateMess = (createdMessage) => {
    console.log('🚀 ~ subscribeAction ~ 1234', savedMess)
    if (!createdMessage.delete_flag) {
      // if (isViewingStream) {
        // render new messages with savedMess
        const isMessageInBottom = checkMessIsInBottom()
        // console.log("🚀 ~ onCreateMess ~ abc", abc)
        setStateMessages([...savedMess, createdMessage])
        if(isMessageInBottom) {
          scrollToCurrentMess()
        } 

        // render new users donate
        if (isPremiumChat(createdMessage, false)) {
          setMessagesDonate([...savedDonateMess, createdMessage])
        }
      // }
      // save mess for local
      setSavedMess((messages) => [...messages, createdMessage])
      // save donated messages for local (not check display time)
      if (isPremiumChat(createdMessage, false)) {
        setSavedDonateMess((messages) => [...messages, createdMessage])
      }
    }
  }
  refOnCreateMess.current = onCreateMess

  const findMessUpdated = (oldMess, updatedMess) => {
    return oldMess.findIndex((item) => {
      return item.id === updatedMess.id
    })
  }

  const refOnUpdateMess = useRef(null)
  const onUpdateMess = (updatedMess) => {
    let foundIndex = findMessUpdated(stateMessages, updatedMess)
    if (foundIndex !== -1) {
      const newStateMess = [...stateMessages]
      newStateMess[foundIndex] = updatedMess
      setStateMessages(newStateMess)
    }

    foundIndex = findMessUpdated(messagesDonate, updatedMess)
    if (foundIndex !== -1) {
      const newDonateMess = [...messagesDonate]
      newDonateMess[foundIndex] = updatedMess
      setMessagesDonate(newDonateMess)
    }

    foundIndex = findMessUpdated(savedMess, updatedMess)
    if (foundIndex !== -1) {
      const newSavedMess = [...savedMess]
      newSavedMess[foundIndex] = updatedMess
      setSavedMess(newSavedMess)
    }

    foundIndex = findMessUpdated(savedDonateMess, updatedMess)
    if (foundIndex !== -1) {
      const newSavedDonateMess = [...savedDonateMess]
      newSavedDonateMess[foundIndex] = updatedMess
      setSavedDonateMess(newSavedDonateMess)
    }
  }
  refOnUpdateMess.current = onUpdateMess

  const subscribeAction = () => {
    const pubSubClient = API.graphql(graphqlOperation(onCreateMessage))
    pubSubClient.subscribe({
      next: (sub: GraphQLResult<APIt.OnCreateMessageSubscription>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const subMessage = sub?.value
        if (subMessage.data.onCreateMessage.video_id === key_video_id) {
          const createdMessage = subMessage.data.onCreateMessage
          // checkMessIsInBottom()
          refOnCreateMess.current(createdMessage)
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
          refOnUpdateMess.current(updatedMess)
        }
      },
      error: (error) => console.warn(error),
    })
  }

  useEffect(() => {
    // console.log("🚀 ~ useEffect ~ streamingSecond", streamingSecond)
    if (isViewingStream) {
      // only check displaying of user donate icon
      const newMessagesDonate = messagesDonate.filter((item) => +item.display_avatar_time <= +streamingSecond)
      setMessagesDonate(newMessagesDonate)
    }
  }, [streamingSecond])

  // useEffect(() => {
  //   if (!isViewingStream) {
  //     const newMess = [...savedMess]
  //     // const isMessageInBottom = checkMessIsInBottom()
  //     // render messages by time of local
  //     setStateMessages(newMess.filter((item) => +item.video_time <= +playedSecond))
  //     // if(isMessageInBottom) {
  //     //   scrollToCurrentMess()
  //     // } 
  //     const newMessDonate = [...savedDonateMess]
  //     // render user donate icon by time of local
  //     setMessagesDonate(newMessDonate.filter((item) => +item.display_avatar_time <= +playedSecond))
  //     // scrollToCurrentMess()
  //   }
  // }, [playedSecond])

  useEffect(() => {
    getListUser()
    // getUsersDonate()
    // setInterval(() => {
    //   // handleSubmitChatContent()
    //   checkMessIsInBottom()
    //   setChartDataFake(chartDataFake => [...chartDataFake, {
    //     id: chartDataFake.length + 2,
    //     user: 'Account Name ' + (chartDataFake.length + 2),
    //     content: 'チャットのコメントははここに表示されます。チャットのコメントははここに表示されます。',
    //   }])
    // }, 2000)
  }, [])

  const filterMessagesDonate = (messages: any, compare_second ?: any) => {
    const foundMessages = messages.filter(item => {
      return isPremiumChat(item, true, compare_second)
    });
    return foundMessages
  }

  const getUsersDonate = async () => {
    try {
      // point + streaming time
      const listQV: APIt.ListMessagesQueryVariables = {
        filter: {
          // video_id: { eq: "2f1141b031696738c1eb72cc450afadb"},
          video_id: { eq: key_video_id },
          is_premium: { eq: true },
          delete_flag: { ne: true },
        },
      }
      const messagesResults: any = await API.graphql(graphqlOperation(listMessages, listQV))
      console.log('getUsersDonate Results; ', messagesResults)
      console.log('streamingSecond', streamingSecond)
      const transformMess = messagesResults.data.listMessages.items.filter((item) => item.parent && +item.point > 300)
      // comment if no get in initial
      setMessagesDonate(filterMessagesDonate(transformMess, streamingSecond))
      // save mess for use in local
      setSavedDonateMess(transformMess)
    } catch (error) {
      console.error(error)
    }
  }

  const getMessages = async () => {
    try {
      const listQV: APIt.ListMessagesQueryVariables = {
        filter: {
          video_id: { eq: key_video_id },
          delete_flag: { ne: true },
        },
      }
      const messagesResults: any = await API.graphql(graphqlOperation(listMessages, listQV))
      console.log('getMessages Results; ', messagesResults)
      const transformMess = messagesResults.data.listMessages.items.filter((item) => item.parent)
      // comment if no get in initial
      setStateMessages(transformMess)
      // save mess for use in local
      setSavedMess(transformMess)
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
      // console.log(
      //   'checkedAllUsers; ',
      //   JSON.stringify(checkedAllUsers),
      //   '\nuserProfile; ',
      //   JSON.stringify(userProfile),
      //   'userProfile.uuid ',
      //   userProfile?.attributes?.uuid
      // )

      const currentUser = checkedAllUsers.find((user) => user.uuid === userProfile?.attributes?.uuid)
      if (currentUser) {
        // console.log('Tồn tại currentUser ', currentUser)
        setChatUser(currentUser)
        setSuccessFlagGetAddUSer(true)
      } else {
        // console.log('tồn tại checkedAllUsers nhưng  userProfile chưa có trong listUser của DynamoDB nên cần tạo mới', userProfile)
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
      getUsersDonate()
    }
  }, [key_video_id])

  useEffect(() => {
    if (dataPurchaseTicketSuperChat?.code === 200) {
      setPurchaseDialogVisible(false)
    }
  }, [dataPurchaseTicketSuperChat])

  async function deleteMsg(idDelete: string) {
    const input = {
      id: idDelete,
      delete_flag: true,
    }
    const deleteAt: any = await API.graphql(graphqlOperation(updateMessage, { input: input }))
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
      onClickOutside={donateConfirmModalIsShown() ? null : handlePremiumChatBoxClickOutside}
      onPressDonate={onPressDonate}
      myPoint={myPoint}
      openPurchasePointModal={openPurchasePointModal}
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
        video_time: videoTime + '',
        // point: 500,//optional : show when Post is use pOint
        is_premium: false,
        userId: chatUser.id,
      }
      if (point) {
        input = {
          ...input,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          point: point.toString(),
          is_premium: true,
          display_avatar_time: videoTime + purchasePoints[`p_${point}`].displayTime,
        }
      }
      console.log('input', input)

      await API.graphql(graphqlOperation(createMessage, { input }))
    }
  }

  // useEffect(() => { 
  //   console.log('🚀 ~ 0000', isMessInBottom)
  //   if (isMessInBottom) {
  //     scrollToCurrentMess()
  //   }
    
  // }, [isMessInBottom])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const checkMessIsInBottom = () => {
    const mess_container = document.getElementById('chatBoard')
    // mess_container.scrollTo({ top: mess_container.scrollHeight, behavior: 'smooth'});
    // // if scrollbar is not in container bottom
    // // height of scroll to top + max height < height of container
    // if(!isMessInBottom){
    console.log('🚀 ~ 111 ~ scrollHeight', mess_container.scrollHeight)
    console.log('🚀 ~ 111 ~ offsetHeight', mess_container.offsetHeight)
    console.log('🚀 ~ 1111 ~ scrollTop', mess_container.scrollTop)
    console.log('🚀 ~ Mess Is InBottom: ', !(mess_container.scrollTop + mess_container.offsetHeight < mess_container.scrollHeight))
    if (mess_container.scrollTop + mess_container.offsetHeight < mess_container.scrollHeight) {
      // setIsMessInBottom(false)
      setDisplaySeeMore(true)
      return false
    } else {
      // if scrollbar is in container bottom and not scrollbar (as max height is smaller than height of container)
      // setIsMessInBottom(true)
      setDisplaySeeMore(false)
      // if (mess_container.offsetHeight < mess_container.scrollHeight) {
      //   setIsMessInBottom(true)
      //   setDisplaySeeMore(false)
      // }
      return true
    }
    // }
  }

  // console.log("🚀 ~ scrollToCurrentMess ~ offsetTop", current_mess.offsetTop)
  // mess_container.scrollTop = mess_container.scrollHeight
  // current_mess.scrollIntoView()

  // let scrollDiv = current_mess.offsetTop;

  // mess_container.scrollTo({ top: current_mess.offsetTop - (142 - 21), behavior: 'smooth'});
  // mess_container.scrollTo({ top: current_mess.offsetTop - (414 - 42), behavior: 'smooth'});

  // if scrollbar is not in container bottom
  // height of scroll to top + max height < height of container
  // if(mess_container.scrollTop + mess_container.offsetHeight < mess_container.scrollHeight) {
  //   console.log("🚀 ~1111", mess_container.scrollTop + mess_container.offsetHeight)
  //   setDisplaySeeMore(true)
  // } else {
  //   // if scrollbar is in container bottom and not scrollbar (as max height is smaller than height of container)
  //   if(mess_container.offsetHeight < mess_container.scrollHeight) {
  //     console.log("🚀 ~2222", mess_container.scrollTop + mess_container.offsetHeight)
  //     console.log("🚀 ~3", mess_container.scrollHeight)
  //     mess_container.scrollTo({ top: mess_container.scrollHeight, behavior: 'smooth'});
  //     setDisplaySeeMore(false)
  //   }
  // }
  const scrollToCurrentMess = () => {
    // const current_mess = document.getElementById('chat_20')
    // console.log("🚀 ~ scrollToCurrentMess ~ current_mess", current_mess)
    // const mess_container = current_mess.parentNode as Element
    const mess_container = document.getElementById('chatBoard')
    // const mess_container = current_mess.parentNode as Element
    console.log('🚀 ~ 222222 ~ scrollHeight', mess_container.scrollHeight)
    console.log('🚀 ~ 222222 ~ offsetHeight', mess_container.offsetHeight)
    console.log('🚀 ~ 222222 ~ scrollTop', mess_container.scrollTop)

    // console.log('🚀 ~ 222222 ~ isMessInBottom', isMessInBottom)

    mess_container.scrollTo({ top: mess_container.scrollHeight, behavior: 'smooth' })
    // if(isMessInBottom) {
    //   mess_container.scrollTo({ top: mess_container.scrollHeight, behavior: 'smooth'});
    //   setDisplaySeeMore(false)
    //   setIsMessInBottom(false)
    // } else {
    //   setDisplaySeeMore(true)
    //   // setIsMessInBottom(false)
    // }
    // mess_container.scrollTop = current_mess.offsetTop - (414 - 42);
  }

  const handleSubmitChatContent = async () => {
    // checkMessIsInBottom()
    // setChartDataFake([...chartDataFake, {
    //   id: chartDataFake.length + 2,
    //   user: 'Account Name ' + (chartDataFake.length + 2),
    //   content: 'チャットのコメントははここに表示されます。チャットのコメントははここに表示されます。',
    // }])

    handleSubmit()

    // setTimeout(() => {

    // scrollToCurrentMess()
    // }, 1000);

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

    // // Submit chat message
  }

  const chatInputComponent = () => (
    <Box className={classes.chatInputMobileContainer}>
      {purchaseDialogVisible && isMobile && purchaseInfoDialog()}
      <Box className={classes.chatInputContainer}>
        {purchaseDialogVisible && !isMobile && purchaseInfoDialog()}
        <IconButton id="btnOpenPremiumChatDialog" onClick={purchaseIconClick} className={classes.iconPurchase}>
          <img id="btnOpenPremiumChatDialogImage" src="/images/ic_purchase.svg" />
        </IconButton>
        <Box className={classes.chatBox}>
          <OutlinedInput
            id={'message'}
            multiline
            rows={1}
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
      <ButtonBase onClick={() => ''} className={`${classes.btn_show_more} ${displaySeeMore ? classes.displaySeeMore : ''}`}>
        {i18n.t('common:live_stream_screen.show_more_mess')}
      </ButtonBase>

      {/* <ESButton
        onClick={() => {
          return ''
        }}
        className={classes.btn_show_more}
        variant="outlined"
        round
        fullWidth
        size="large"
      >
        {i18n.t('common:live_stream_screen.show_more_mess')}
      </ESButton> */}
      <Box className={`${classes.dialogMess} ${messActiveUser ? classes.dialogMessShow : ''}`}>
        {/* <DonateMessage message={msg}/> */}
        <Box
          className={`${classes.messContentOuter}`}
          onClick={() => {
            setMessActiveUser('')
          }}
        ></Box>
      </Box>
      <Box className={classes.chatBoard} id="chatBoard">
        {stateMessages
          // sort messages oldest to newest client-side
          .sort((a: any, b: any) => a.createdAt.localeCompare(b.createdAt))
          .map((msg: any, i) => {
            // only display message is not deleted or display all mess if user is streamer
            return !msg.delete_flag || userResult.streamer ? (
              msg.is_premium ? (
                <DonateMessage
                  message={msg}
                  deleteMess={deleteMsg}
                  getMessageWithoutNgWords={getMessageWithoutNgWords}
                  is_streamer={userResult?.streamer}
                />
              ) : (
                <ChatTextMessage
                  key={i}
                  message={msg}
                  getMessageWithoutNgWords={getMessageWithoutNgWords}
                  deleteMess={deleteMsg}
                  is_streamer={userResult?.streamer}
                />
              )
            ) : (
              ''
            )
          })}
        {/* {chartDataFake.map((message, index) => {
          const { user, content, id } = message
          return (
            <Typography key={id} id={`chat_${id}`}>
              <span className={classes.chatMessageUser}>{`${user}: `}</span>
              {index + ' ' + content}
            </Typography>
          )
        })}   */}
      </Box>
      {chatInputComponent()}
    </Box>
  )
  // const getUserWatchingList = () =>
  //   Array(20)
  //     .fill('')
  //     .map((_, i) => ({
  //       id: i,
  //       user_avatar: '/images/dataVideoFake/fake_avatar.png',
  //     }))

  const userDoesNotHaveViewingTicketView = () => (
    <Box className={classes.chatPurchaseTicketBox}>
      <Typography className={classes.chatPurchaseTicketNote}>{i18n.t('common:live_stream_screen.chat_purchase_ticket_note')}</Typography>
    </Box>
  )

  const mess_container = document.getElementById('chatBoard')
  if (mess_container) {
    mess_container.onscroll = function () {
      if (mess_container.scrollTop + mess_container.offsetHeight >= mess_container.scrollHeight) {
        // console.log("🚀 ~ 000", mess_container)
        setDisplaySeeMore(false)
        // you're at the bottom of the page
      }
    }
  }

  const chatContent = () => (
    <Box className={classes.chatContent}>
      <Button onClick={scrollToCurrentMess}>Scroll to chat mess</Button>
      <Box className={classes.userWatchingList}>
        {messagesDonate
          .sort((a: any, b: any) => b.createdAt.localeCompare(a.createdAt))
          .map((item) => (
            <Box
              key={item.id}
              className={classes.userWatchingItem}
              style={{ backgroundColor: purchasePoints[`p_${item.point}`].backgroundColor }}
              onClick={() => {
                if (messActiveUser || messActiveUser === 0) {
                  setMessActiveUser('')
                } else {
                  setMessActiveUser(item.id)
                }
              }}
            >
              <Avatar src={item?.parent?.avatar ? item.parent.avatar : '/images/avatar.png'} size={32} alt={item.parent.user_name} />
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
