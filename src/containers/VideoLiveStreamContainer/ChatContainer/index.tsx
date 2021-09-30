/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Typography, Icon, Button, IconButton, useTheme, useMediaQuery, ButtonBase, ClickAwayListener } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'
import React, { useState, useEffect, useRef } from 'react'
import sanitizeHtml from 'sanitize-html'
import i18n from '@locales/i18n'
import useStyles from './styles'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import _ from 'lodash'
import { useAppSelector } from '@store/hooks'
// import { useAppDispatch, useAppSelector } from '@store/hooks'
import userProfileStore from '@store/userProfile'
import { UserProfile } from '@services/user.service'
import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'
import { listUsers, getMessagesByVideoId } from 'src/graphql/queries'
import { createMessage, createUser, updateMessage, updateUser } from 'src/graphql/mutations'
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
import ESAvatar from '@components/Avatar'
import ESInput from '@components/Input'
import { STATUS_VIDEO } from '@services/videoTop.services'
import LoginRequired from '@containers/LoginRequired'
import moment from 'moment'
import { STATUS_SEND_MESS } from '@constants/common.constants'

type ChatContainerProps = {
  onPressDonate?: (donatedPoint: number, purchaseComment: string) => void
  onCloseChatPanel?: () => void
  userHasViewingTicket?: boolean | number
  key_video_id?: string
  myPoint?: any
  handleKeyboardVisibleState: any
  donateConfirmModalIsShown: () => boolean
  openPurchasePointModal?: (point: any) => void
  videoType?: number
  freeToWatch?: boolean
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
  videoType,
  freeToWatch,
}) => {
  // const { t } = useTranslation('common')
  // const [messageText, setMessageText] = useState<string>('')
  const [purchaseDialogVisible, setPurchaseDialogVisible] = useState<boolean>(false)
  const [messActiveUser, setMessActiveUser] = useState<any>(null)
  const [successGetListMess, setSuccessGetListMess] = useState(false)
  const [successGetListDonateMess, setSuccessGetListDonateMess] = useState(false)
  const [successFlagGetAddUSer, setSuccessFlagGetAddUSer] = useState(false)
  const [messagesDonate, setMessagesDonate] = useState([])
  const [displaySeeMore, setDisplaySeeMore] = useState(false)
  const [displayDialogMess, setDisplayDialogMess] = useState(false)
  const [firstRender, setFirstRender] = useState(false)
  // const [isMessInBottom, setIsMessInBottom] = useState(false)

  console.log('video type chat container: ', videoType)

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
  console.log('🚀 ~ stateMessages --- 22222', stateMessages)
  const [chatUser, setChatUser] = useState<any>({})
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(769))
  const { checkNgWord } = useCheckNgWord()
  const [savedMess, setSavedMess] = useState([])
  console.log('🚀 ~ savedMess', savedMess)
  const [savedDonateMess, setSavedDonateMess] = useState([])
  const [isChatInBottom, setIsChatInBottom] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)

  const { userResult, streamingSecond, playedSecond, isViewingStream, liveStreamInfo } = useDetailVideo()
  // const { streamingSecond, playedSecond, isViewingStream, liveStreamInfo } = useDetailVideo()
  // const userResult = {streamer: 1}
  const { dataPurchaseTicketSuperChat } = usePurchaseTicketSuperChat()
  // const dispatch = useAppDispatch()

  const isEnabledChat =
    videoType === STATUS_VIDEO.LIVE_STREAM &&
    !liveStreamInfo.is_end_live &&
    +streamingSecond >= 0 &&
    successGetListMess &&
    successGetListDonateMess
  // const isEnabledChat = true

  const validationSchema = Yup.object().shape({
    message: Yup.string()
      .required(i18n.t('common:live_stream_screen.chat_input_text_validate_msg_empty'))
      .max(50, i18n.t('common:live_stream_screen.chat_input_text_validate_msg_50_char_exceed'))
      .trim(),
  })

  const { handleChange, values, handleSubmit, errors, touched } = useFormik<MessageValidationType>({
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

    const result = await API.graphql(
      graphqlOperation(createUser, {
        input: {
          // id:userProfile?.id,
          uuid: userProfile?.attributes?.uuid,
          avatar: userProfile?.attributes?.avatar_url,
          user_name: userProfile?.attributes?.nickname,
        },
      })
    )
    console.log('abc-111111', result)
    setChatUser(result.data.createUser)
    setSuccessFlagGetAddUSer(true)
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
    const conditionWithoutTime = +message.point > 300 && message.is_premium === true && !message.delete_flag
    if (!is_check_time) {
      return conditionWithoutTime
    }
    return +message.display_avatar_time > +compareSecond && conditionWithoutTime
  }

  const refOnCreateMess = useRef(null)
  const onCreateMess = (createdMessage) => {
    console.log('🚀 ~ onCreateMess ~ createdMessage----0909', createdMessage)
    const foundIndex = findMessUpdated(savedMess, createdMessage, 'local_id')
    console.log('🚀 ~ subscribeAction ~ foundIndex', foundIndex)
    // only add new message if no found message in local
    if (foundIndex === -1) {
      console.log('🚀 ~ subscribeAction ~ 1234', savedMess)
      if (playedSecond >= streamingSecond || liveStreamInfo.is_pausing_live) {
        // render new messages with savedMess
        const isMessageInBottom = checkMessIsInBottom()
        // console.log("🚀 ~ 11111")
        setStateMessages([...savedMess, createdMessage])
        // console.log("🚀 ~ 33333")
        if (isMessageInBottom) {
          scrollToCurrentMess()
        }

        // render new users donate
        if (isPremiumChat(createdMessage, false)) {
          let newMessDonate = [...savedDonateMess]
          newMessDonate = newMessDonate.filter((item) => +item.display_avatar_time >= +streamingSecond)
          // render user donate icon by time of local
          setMessagesDonate([...newMessDonate, createdMessage])
        }
      }
      // save mess for local
      setSavedMess((messages) => [...messages, createdMessage])
      // save donated messages for local (not check display time)
      if (isPremiumChat(createdMessage, false)) {
        setSavedDonateMess((messages) => [...messages, createdMessage])
      }
    }
  }
  refOnCreateMess.current = onCreateMess

  const findMessUpdated = (oldMess, updatedMess, property = 'id') => {
    return oldMess.findIndex((item) => {
      return item[property] === updatedMess[property]
    })
  }

  const refOnUpdateMess = useRef(null)
  const onUpdateMess = (updatedMess) => {
    updateOldMessData(updatedMess, {})
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
          // getMessages()
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
    console.log('🚀 ~ useEffect ~ playedSecond ---> streamingSecond', playedSecond, streamingSecond)
    if (playedSecond >= streamingSecond || liveStreamInfo.is_pausing_live) {
      // check archive video => no use that case
      if (!firstRender && +streamingSecond > 0) {
        setFirstRender(true)
        const newMess = savedMess.filter((item) => +item.video_time <= +streamingSecond)
        console.log('🚀 ~ 222 ~ newMess', newMess)
        const isMessageInBottom = checkMessIsInBottom()
        // render new messages with savedMess
        console.log('🚀 ~ 11111')
        setStateMessages([...newMess])

        console.log('🚀 ~ 33333')
        if (isMessageInBottom) {
          // if(point){
          setIsChatInBottom(true)
          // } else {
          // scrollToCurrentMess()
          // }
        }

        console.log('🚀 ~ createMess ~ stateMessages', stateMessages)
        const newMessagesDonate = savedDonateMess.filter(
          (item) => +item.display_avatar_time >= +streamingSecond && +item.video_time <= +streamingSecond
        )
        setMessagesDonate(newMessagesDonate)
      } else {
        // only check displaying of user donate icon
        const newMessagesDonate = messagesDonate.filter(
          (item) => +item.display_avatar_time >= +streamingSecond && +item.video_time <= +streamingSecond
        )
        // console.log("🚀 ~ useEffect ~ display_avatar_time", display_avatar_time)
        setMessagesDonate(newMessagesDonate)
      }
    }
  }, [streamingSecond])

  useEffect(() => {
    // hide dialog message if message donate is no longer show
    if (messActiveUser && !messagesDonate.find((item) => item.id === messActiveUser.id)) {
      setMessActiveUser(null)
    }
  }, [messagesDonate])

  const filterMessByPlayedSecond = (new_played_second) => {
    const oldMessCount = stateMessages.length
    let newMess = [...savedMess]
    newMess = newMess.filter((item) => +item.video_time <= +new_played_second)
    let isCheckSeeMore = false
    if (oldMessCount < newMess.length) {
      isCheckSeeMore = true
    }
    const isMessageInBottom = isCheckSeeMore ? checkMessIsInBottom() : false
    if (isMessageInBottom) {
      setIsChatInBottom(true)
    }
    // render messages by time of local
    setStateMessages([...newMess])
    if (isMessageInBottom) {
      // scrollToCurrentMess()
    }
    let newMessDonate = [...savedDonateMess]
    newMessDonate = newMessDonate.filter(
      (item) => +item.display_avatar_time >= +new_played_second && +item.video_time <= +new_played_second
    )
    // render user donate icon by time of local
    setMessagesDonate(newMessDonate)
    // scrollToCurrentMess()
  }

  useEffect(() => {
    console.log('🚀 ~ 2222 --- playedSecond ---> streamingSecond', playedSecond, streamingSecond)
    // filter mess when user no seeking or pausing live video
    if (playedSecond < streamingSecond && !isSeeking && !liveStreamInfo.is_pausing_live) {
      filterMessByPlayedSecond(playedSecond)
    }
    if (isSeeking) {
      setIsSeeking(false)
    }
  }, [playedSecond])

  useEffect(() => {
    console.log('🚀 isChatInBottom', isChatInBottom)
    if (isChatInBottom) {
      scrollToCurrentMess()
      setIsChatInBottom(false)
    }
  }, [isChatInBottom])

  useEffect(() => {
    filterMessByPlayedSecond(liveStreamInfo.seeked_second)
    if (!isSeeking) {
      setIsSeeking(true)
    }
  }, [liveStreamInfo.seek_count])

  useEffect(() => {
    // getUsersDonate()
  }, [])

  // const filterMessagesDonate = (messages: any, compare_second?: any) => {
  //   const foundMessages = messages.filter((item) => {
  //     return isPremiumChat(item, true, compare_second)
  //   })
  //   return foundMessages
  // }

  const getMessages = async () => {
    try {
      const listQV: APIt.GetMessagesByVideoIdQueryVariables = {
        video_id: key_video_id,
        // filter: {
        //   video_id: { eq: key_video_id },
        //   // delete_flag: { ne: true },
        // },
        limit: 2000,
      }
      const messagesResults: any = await API.graphql(graphqlOperation(getMessagesByVideoId, listQV))
      // const messagesResults: any = await API.graphql(graphqlOperation(listMessagesNew, listQV))
      console.log('getMessages Results; ', messagesResults)
      const transformMess = messagesResults.data.getMessagesByVideoId.items.filter((item) => item.parent)

      const transformMessAsc = sortMessages(transformMess)
      // const transformMess = messagesResults.data.listMessages.items.filter((item) => item.video_id === key_video_id)
      console.log('🚀 ~ getMessages ~ transformMessAsc', transformMessAsc)
      // console.log("🚀 ~ ------111 ~ playedSecond", playedSecond)
      // console.log("🚀 ~ ------222 ~ streamingSecond", streamingSecond)
      // comment if no get in initial
      // setStateMessages(transformMessAsc)
      // save mess for use in local
      setSavedMess([...transformMessAsc])
      setSuccessGetListMess(true)

      const transformDonateMess = transformMess.filter((item) => item.is_premium && +item.point > 300)
      const transformDonateMessAsc = sortMessages(transformDonateMess, false)
      console.log('🚀 ~ getMessages ~ transformDonateMessAsc', transformDonateMessAsc)
      // comment if no get in initial
      // setMessagesDonate(filterMessagesDonate(transformMess, streamingSecond))
      // save mess for use in local
      setSavedDonateMess([...transformDonateMessAsc])
      setSuccessGetListDonateMess(true)
      subscribeAction()
    } catch (error) {
      console.error(error)
    }
  }

  const updateUserData = async (nickname: string, avatar_url: string, userId: string) => {
    const result = await API.graphql(
      graphqlOperation(updateUser, {
        input: {
          id: userId,
          avatar: avatar_url,
          user_name: nickname,
        },
      })
    )
    setChatUser(result.data.updateUser)
    setSuccessFlagGetAddUSer(true)
  }

  const checkUserExist = async () => {
    try {
      const { uuid } = userProfile.attributes
      const listQV: APIt.ListUsersQueryVariables = {
        filter: {
          uuid: { eq: uuid },
        },
      }
      const usersResult: any = await API.graphql(graphqlOperation(listUsers, listQV))
      const usersData = usersResult.data.listUsers.items
      // create new user if no exist
      if (usersData.length === 0) {
        handleCreateUserDB()
      } else {
        const foundUser = usersData.find((item) => item.uuid === uuid)
        const { nickname, avatar_url } = userProfile.attributes
        // update user info if info is changed
        if (foundUser.user_name !== nickname || foundUser.avatar !== avatar_url) {
          updateUserData(nickname, avatar_url, foundUser.id)
        } else {
          // get and set user exist
          setChatUser(usersData.find((item) => item.uuid === uuid))
          setSuccessFlagGetAddUSer(true)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (userProfile) {
      checkUserExist()
    }
  }, [userProfile])

  useEffect(() => {
    if (key_video_id) {
      getMessages()
    }
  }, [key_video_id])

  useEffect(() => {
    if (dataPurchaseTicketSuperChat?.code === 200) {
      setPurchaseDialogVisible(false)
    }
  }, [dataPurchaseTicketSuperChat])

  const refUpdateMessLocal = useRef(null)
  const handleUpdateMessLocal = (result, local_message) => {
    console.log('🚀 ~ handleUpdateMessLocal ~ local_message', local_message)
    const updatedMessage = result?.data?.updateMessage
    console.log('🚀 ~ handleUpdateMessLocal ~ createdMessage', updatedMessage)
    console.log('🚀 ~ handleUpdateMessLocal ~ 1234', stateMessages)
    if (updatedMessage) {
      updateOldMessData(updatedMessage, {})
    }
  }
  refUpdateMessLocal.current = handleUpdateMessLocal

  const refUpdateMessBeforeCallApi = useRef(null)
  const handleUpdateMessBeforeCallApi = (updatedMessage, local_message) => {
    console.log('🚀 ~ handleUpdateMessBeforeCallApi ~ local_message', local_message)
    console.log('🚀 ~ handleUpdateMessBeforeCallApi ~ createdMessage', updatedMessage)
    console.log('🚀 ~ handleUpdateMessBeforeCallApi ~ 1234', stateMessages)
    if (updatedMessage) {
      updateOldMessData(updatedMessage, { delete_flag: true })
    }
  }
  refUpdateMessBeforeCallApi.current = handleUpdateMessBeforeCallApi

  async function deleteMsg(message: any) {
    console.log('🚀 ~ deleteMsg ~ message', message)
    const input = {
      id: message.id,
      delete_flag: true,
    }
    console.log('start delete-111111')
    refUpdateMessBeforeCallApi.current(message, '123')
    const result = await API.graphql(graphqlOperation(updateMessage, { input: input }))
    console.log('deleteMsg-111111', result)
    refUpdateMessLocal.current(result, message)
  }

  const sortMessages = (messages, isSortAsc = true) => {
    const new_mess = [...messages]
    const sortFactor = isSortAsc ? 1 : -1
    return new_mess.sort((a: any, b: any) => sortFactor * (+a.video_time - +b.video_time || a.created_time.localeCompare(b.created_time)))
  }

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
      isEnabledChat={isEnabledChat}
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

  type MessInput = {
    id?: string
    owner?: string
    text?: string
    uuid?: string | null
    video_id?: string
    delete_flag?: boolean | null
    video_time?: string
    display_avatar_time?: string | null
    point?: string | null
    use_point_id?: string | null
    is_premium?: boolean | null
    userId?: string
    local_id?: string | null
    created_time?: string | null
    parent?: {
      avatar?: string
      user_name?: string
    }
  }

  const updateOldMessData = (updatedMessage, objWithNewProps, compareProp = 'id') => {
    const updatedMessWithNewProp = { ...updatedMessage, ...objWithNewProps }
    let foundIndex = findMessUpdated(stateMessages, updatedMessage, compareProp)
    console.log('🚀 ~ createMess ~ createdMessage', updatedMessage)
    console.log('🚀 ~ createMess ~ stateMessages', stateMessages)
    console.log('🚀 ~ createMess ~ foundIndex', foundIndex)
    if (foundIndex !== -1) {
      const newStateMess = [...stateMessages]
      newStateMess[foundIndex] = { ...updatedMessWithNewProp }
      setStateMessages(newStateMess)
    }
    foundIndex = findMessUpdated(savedMess, updatedMessage, compareProp)
    console.log('🚀 ~ updateOldMessData ~ foundIndex savedMess', foundIndex)
    if (foundIndex !== -1) {
      const newSavedMess = [...savedMess]
      newSavedMess[foundIndex] = { ...updatedMessWithNewProp }
      setSavedMess(newSavedMess)
    }
    foundIndex = findMessUpdated(messagesDonate, updatedMessage, compareProp)
    if (foundIndex !== -1) {
      const newDonateMess = [...messagesDonate]
      newDonateMess[foundIndex] = { ...updatedMessWithNewProp }
      setMessagesDonate(newDonateMess)
    }
    foundIndex = findMessUpdated(savedDonateMess, updatedMessage, compareProp)
    if (foundIndex !== -1) {
      const newSavedDonateMess = [...savedDonateMess]
      newSavedDonateMess[foundIndex] = { ...updatedMessWithNewProp }
      setSavedDonateMess(newSavedDonateMess)
    }
  }

  const refCreateMessLocal = useRef(null)
  const handleCreateMessLocal = (result, local_message) => {
    console.log('🚀 ~ handleCreateMessLocal ~ local_message', local_message)
    const createdMessage = result?.data?.createMessage
    console.log('🚀 ~ handleCreateMessLocal ~ createdMessage', createdMessage)
    console.log('🚀 ~ handleCreateMessLocal ~ 1234', stateMessages)
    if (createdMessage) {
      updateOldMessData(createdMessage, { mess_status: STATUS_SEND_MESS.LOADED }, 'local_id')
    }
  }
  refCreateMessLocal.current = handleCreateMessLocal

  const createMess = async (message: string, point = 0): Promise<void> => {
    if (successFlagGetAddUSer && Object.keys(chatUser).length > 0 && message && isEnabledChat) {
      const videoTime = streamingSecond
      let input: MessInput = {
        // id is auto populated by AWS Amplify
        owner: chatUser.user_name,
        text: sanitizeMess(message),
        uuid: chatUser.uuid,
        video_id: key_video_id,
        video_time: videoTime + '',
        // point: 500,//optional : show when Post is use pOint
        is_premium: false,
        userId: chatUser.id,
        delete_flag: false,
        local_id: Math.random().toString(20).substr(2, 10) + '_' + moment().format('HHmmss'),
        created_time: moment().toISOString(),
      }
      if (point) {
        input = {
          ...input,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          point: point.toString(),
          is_premium: true,
          display_avatar_time: videoTime + purchasePoints[`p_${point}`].displayTime,
          // display_avatar_time: videoTime + 20,
        }
      }
      console.log('input', input)

      let local_message = {
        ...input,
        mess_status: STATUS_SEND_MESS.PENDING,
      }
      if (point) {
        const { nickname, avatar_url } = userProfile.attributes
        local_message = {
          ...local_message,
          parent: { avatar: avatar_url, user_name: nickname },
        }
      }
      console.log('🚀 ~ createMess ~ local_message', local_message)

      const is_premium_local_message = isPremiumChat(local_message, false)
      // save mess for local
      setSavedMess((messages) => [...messages, local_message])
      // save donated messages for local (not check display time)
      if (is_premium_local_message) {
        setSavedDonateMess((messages) => [...messages, local_message])
      }

      // save message to local
      if (playedSecond >= streamingSecond || liveStreamInfo.is_pausing_live) {
        const isMessageInBottom = checkMessIsInBottom()
        // render new messages with savedMess
        console.log('🚀 ~ 11111')
        setStateMessages([...savedMess, local_message])
        console.log('🚀 ~ createMess ~ stateMessages', stateMessages)

        // console.log("🚀 ~ 33333")
        if (isMessageInBottom) {
          if (point) {
            setIsChatInBottom(true)
          } else {
            scrollToCurrentMess()
          }
        }

        // render new users donate
        if (is_premium_local_message) {
          let newMessDonate = [...savedDonateMess]
          newMessDonate = newMessDonate.filter((item) => +item.display_avatar_time >= +streamingSecond)
          // render user donate icon by time of local
          setMessagesDonate([...newMessDonate, local_message])
        }
      }

      const result = await API.graphql(graphqlOperation(createMessage, { input }))
      console.log('createMessage-111111', result)
      refCreateMessLocal.current(result, local_message)
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const checkMessIsInBottom = () => {
    const mess_container = document.getElementById('chatBoard')
    // mess_container.scrollTo({ top: mess_container.scrollHeight, behavior: 'smooth'});
    // // if scrollbar is not in container bottom
    // // height of scroll to top + max height < height of container
    // if(!isMessInBottom){
    if (mess_container) {
      console.log('🚀 ~ 111 ~ scrollHeight', mess_container.scrollHeight)
      console.log('🚀 ~ 111 ~ offsetHeight', mess_container.offsetHeight)
      console.log('🚀 ~ 1111 ~ scrollTop', mess_container.scrollTop)
      console.log('🚀 ~ 1111 ~ Mess Is InBottom: ', !(mess_container.scrollTop + mess_container.offsetHeight < mess_container.scrollHeight))
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
    const mess_container = document.getElementById('chatBoard')
    console.log('🚀 ~ 222222 ~ scrollHeight', mess_container.scrollHeight)
    console.log('🚀 ~ 222222 ~ offsetHeight', mess_container.offsetHeight)
    console.log('🚀 ~ 222222 ~ scrollTop', mess_container.scrollTop)
    mess_container.scrollTo({ top: mess_container.scrollHeight, behavior: 'smooth' })
  }

  const handleSubmitChatContent = () => {
    handleSubmit()
  }

  const handlePressEnter = (event: any) => {
    if (event.key === 'Enter') {
      handleSubmitChatContent()
    }
  }

  const chatInputComponent = () => (
    <Box className={classes.chatInputMobileContainer}>
      {purchaseDialogVisible && isMobile && purchaseInfoDialog()}
      <Box className={classes.chatInputContainer}>
        {purchaseDialogVisible && !isMobile && purchaseInfoDialog()}
        <LoginRequired>
          {/* <div onClick={purchaseIconClick}> */}
          <IconButton onClick={isEnabledChat ? purchaseIconClick : null} id="btnOpenPremiumChatDialog" className={classes.iconPurchase}>
            <img id="btnOpenPremiumChatDialogImage" src="/images/ic_purchase.svg" />
          </IconButton>
          {/* </div> */}
        </LoginRequired>
        <Box className={classes.chatBox}>
          <ESInput
            id={'message'}
            name="message"
            onChange={handleChange}
            placeholder={i18n.t('common:live_stream_screen.message_placeholder')}
            value={values.message}
            classes={{ root: classes.input, input: classes.chatTextInput }}
            margin="dense"
            onFocus={handleChatInputOnFocus}
            onBlur={handleChatInputOnBlur}
            helperText={touched.message && errors?.message}
            error={touched.message && !!errors?.message}
            onKeyPress={handlePressEnter}
            disabled={!isEnabledChat}
          />
          <LoginRequired>
            {/* <div onClick={handleSubmitChatContent}> */}
            <Button onClick={handleSubmitChatContent} className={classes.iconButtonBg} disabled={!isEnabledChat}>
              <Icon className={`fa fa-paper-plane ${classes.sendIcon}`} fontSize="small" />
            </Button>
            {/* </div> */}
          </LoginRequired>
        </Box>
        {/* {errors.message && <Typography className={classes.chatInputErrorText}>{errors.message}</Typography>} */}
      </Box>
    </Box>
  )

  const closeDialogActiveUser = () => {
    if (messActiveUser && !displayDialogMess) {
      setMessActiveUser(null)
    }
    setDisplayDialogMess(false)
  }

  const chatBoardComponent = () => (
    <Box className={`${classes.chatBoardContainer}`}>
      <ButtonBase
        onClick={() => scrollToCurrentMess()}
        className={`${classes.btn_show_more} ${displaySeeMore ? classes.displaySeeMore : ''}`}
      >
        {i18n.t('common:live_stream_screen.show_more_mess')}
      </ButtonBase>
      <ClickAwayListener onClickAway={() => closeDialogActiveUser()}>
        <Box className={`${classes.dialogMess} ${messActiveUser ? classes.dialogMessShow : ''}`}>
          {messActiveUser && (
            <DonateMessage
              message={messActiveUser}
              deleteMess={deleteMsg}
              getMessageWithoutNgWords={getMessageWithoutNgWords}
              is_streamer={0}
            />
          )}
          <Box
            className={`${classes.messContentOuter}`}
            onClick={() => {
              setMessActiveUser(null)
            }}
          ></Box>
        </Box>
      </ClickAwayListener>
      <Box className={classes.chatBoard} id="chatBoard">
        {stateMessages
          // sort messages oldest to newest client-side
          // .sort((a: any, b: any) => +a.video_time - +b.video_time || a.createdAt.localeCompare(b.createdAt))
          .map((msg: any, i: number) => {
            // only display message is not deleted or display all mess if user is streamer
            return !msg.delete_flag || userResult.streamer ? (
              msg.is_premium ? (
                <DonateMessage
                  // key={msg?.id || i}
                  key={i}
                  message={msg}
                  deleteMess={deleteMsg}
                  getMessageWithoutNgWords={getMessageWithoutNgWords}
                  is_streamer={userResult?.streamer}
                />
              ) : (
                <ChatTextMessage
                  // key={msg?.id || i}
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
      {isMobile ? chatComponentMobile() : chatInputComponent()}
    </Box>
  )

  const chatComponentMobile = () => {
    return purchaseDialogVisible ? purchaseInfoDialog() : chatInputComponent()
  }

  // const getUserWatchingList = () =>
  //   Array(20)
  //     .fill('')
  //     .map((_, i) => ({
  //       id: i,
  //       user_avatar: '/images/dataVideoFake/fake_avatar.png',
  //     }))

  const chatNotAvailableMessage = () => {
    if (videoType === STATUS_VIDEO.SCHEDULE && (freeToWatch || userHasViewingTicket)) {
      return i18n.t('common:live_stream_screen.chat_will_available_on_time')
    }
    return i18n.t('common:live_stream_screen.chat_purchase_ticket_note')
  }

  const userDoesNotHaveViewingTicketView = () => (
    <Box className={classes.chatPurchaseTicketBox}>
      <Typography className={classes.chatPurchaseTicketNote}>{chatNotAvailableMessage()}</Typography>
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
      {/* <Button onClick={scrollToCurrentMess}>Scroll to chat mess</Button> */}
      <Box className={classes.userWatchingList}>
        {messagesDonate
          // .sort((a: any, b: any) => -(+a.video_time - +b.video_time || a.createdAt.localeCompare(b.createdAt)))
          .map((item) =>
            !item.delete_flag ? (
              <Box
                key={item.id}
                className={classes.userWatchingItem}
                style={{
                  backgroundColor: purchasePoints[`p_${item.point}`].backgroundColor,
                  opacity: !messActiveUser ? 1 : item.id === messActiveUser.id ? 1 : 0.5,
                }}
                onClick={() => {
                  setDisplayDialogMess(true)
                  setMessActiveUser(item)
                }}
              >
                <ESAvatar src={item?.parent?.avatar} size={32} alt={item.parent.user_name} />
              </Box>
            ) : (
              ''
            )
          )}
      </Box>
      {chatBoardComponent()}
    </Box>
  )

  const displayChatContent = () => {
    return videoType !== STATUS_VIDEO.SCHEDULE && (freeToWatch || userHasViewingTicket)
  }

  return (
    <Box className={classes.container}>
      {!isMobile && (
        <Box className={classes.chatHeader}>
          <Typography className={classes.headerTitle}>{i18n.t('common:live_stream_screen.chat_header')}</Typography>
        </Box>
      )}
      {displayChatContent() ? chatContent() : userDoesNotHaveViewingTicketView()}
    </Box>
  )
}

export default ChatContainer
