/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Typography, Icon, Button, IconButton, useTheme, useMediaQuery, ButtonBase, ClickAwayListener } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
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
import { getUsersByUuid, getMessagesByVideoId } from 'src/graphql/queries'
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
import { v4 as uuidv4 } from 'uuid'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'
// import { DELAY_SECONDS } from '@constants/common.constants'

export type ChatContainerProps = {
  onPressDonate?: (donatedPoint: number, purchaseComment: string) => void
  onCloseChatPanel?: () => void
  userHasViewingTicket?: boolean | number
  key_video_id?: string
  myPoint?: any
  handleKeyboardVisibleState: any
  donateConfirmModalIsShown: () => boolean
  openPurchasePointModal?: (point: any) => void
  videoType?: number
  freeToWatch?: boolean | number
  ref: any
  chatWidth: any
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

const ChatContainer: React.FC<ChatContainerProps> = forwardRef(
  (
    {
      onPressDonate,
      userHasViewingTicket,
      key_video_id,
      myPoint,
      handleKeyboardVisibleState,
      donateConfirmModalIsShown,
      openPurchasePointModal,
      videoType,
      freeToWatch,
      chatWidth,
    },
    ref
  ) => {
    const [purchaseDialogVisible, setPurchaseDialogVisible] = useState<boolean>(false)
    const [messActiveUser, setMessActiveUser] = useState<any>(null)
    const [successGetListMess, setSuccessGetListMess] = useState(false)
    const [successGetListDonateMess, setSuccessGetListDonateMess] = useState(false)
    const [successFlagGetAddUSer, setSuccessFlagGetAddUSer] = useState(false)
    const [messagesDonate, setMessagesDonate] = useState([])
    const [displaySeeMore, setDisplaySeeMore] = useState(false)
    const [displayDialogMess, setDisplayDialogMess] = useState(false)
    const [firstRender, setFirstRender] = useState(false)
    const [allMess, setAllMess] = useState([])
    const [scrollBehavior, setScrollBehavior] = useState('smooth')
    const isVideoFreeToWatch = freeToWatch === 0 ? true : false

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

    const initialFruits: APIt.Message[] = []
    const [stateMessages, setStateMessages] = useState(initialFruits)
    const [chatUser, setChatUser] = useState<any>({})
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down(769))
    const { checkNgWord } = useCheckNgWord()
    const [savedMess, setSavedMess] = useState([])
    const [savedDonateMess, setSavedDonateMess] = useState([])
    const [isChatInBottom, setIsChatInBottom] = useState(false)
    const [isSeeking, setIsSeeking] = useState(false)

    const { width: pageWidth } = useWindowDimensions(0)
    const isDesktopDown1280 = pageWidth > 768 && pageWidth <= 1280
    const { userResult, streamingSecond, playedSecond, liveStreamInfo } = useDetailVideo()
    // const { streamingSecond, playedSecond, isViewingStream, liveStreamInfo } = useDetailVideo()
    // const userResult = {streamer: 1}
    const { dataPurchaseTicketSuperChat } = usePurchaseTicketSuperChat()
    // const dispatch = useAppDispatch()

    // const isEnabledChat =
    //   videoType === STATUS_VIDEO.LIVE_STREAM &&
    //   !liveStreamInfo.is_end_live &&
    //   (+streamingSecond >= 0 || streamingSecond === Infinity) &&
    //   successGetListMess &&
    //   successGetListDonateMess
    const isEnabledChat = true

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
      },
    })
    const classes = useStyles({ chatValidationError: !!errors.message })

    const resetStates = () => {
      setStateMessages([])
    }

    useImperativeHandle(ref, () => {
      return {
        resetStates: resetStates,
      }
    })

    const isStreaming = (() => {
      return true
      // if (videoType === STATUS_VIDEO.LIVE_STREAM) {
      //   if (streamingSecond === Infinity) {
      //     return true
      //   }
      //   if (playedSecond >= streamingSecond) {
      //     return true
      //   }
      // }
      // return false
    })()

    const messContainer = document.getElementById('chatBoard')
    if (messContainer) {
      messContainer.onscroll = function () {
        if (messContainer.scrollTop + messContainer.offsetHeight >= messContainer.scrollHeight) {
          setDisplaySeeMore(false)
        }
      }
    }

    const handleCreateUserDB = async () => {
      const result = await API.graphql(
        graphqlOperation(createUser, {
          input: {
            uuid: userProfile?.attributes?.uuid,
            avatar: userProfile?.attributes?.avatar_url,
            user_name: userProfile?.attributes?.nickname,
          },
        })
      )
      setChatUser(result.data.createUser)
      setSuccessFlagGetAddUSer(true)
    }

    const isPremiumChat = (message: any, is_check_time = true, compare_second?: any) => {
      let compareSecond = compare_second
      if (!compareSecond) {
        compareSecond = playedSecond
      }
      const conditionWithoutTime = +message.point > 300 && message.is_premium === true && !message.delete_flag
      if (!is_check_time) {
        return conditionWithoutTime
      }
      return +message.display_avatar_time > +compareSecond && conditionWithoutTime
    }

    const refOnCreateMess = useRef(null)
    const onCreateMess = (createdMessage) => {
      if (createdMessage.video_id === key_video_id && videoType === STATUS_VIDEO.LIVE_STREAM) {
        const foundIndex = findMessUpdated(savedMess, createdMessage, 'local_id')
        // only add new message if no found message in local
        if (foundIndex === -1) {
          // if (playedSecond >= streamingSecond || liveStreamInfo.is_pausing_live) {
          if (isStreaming) {
            // render new messages with savedMess
            const isMessageInBottom = checkMessIsInBottom()
            setStateMessages([...savedMess, createdMessage])
            if (isMessageInBottom) {
              scrollToCurrentMess()
            }

            // render new users donate
            if (isPremiumChat(createdMessage, false)) {
              let newMessDonate = [...savedDonateMess]
              // newMessDonate = newMessDonate.filter((item) => +item.display_avatar_time > +streamingSecond)
              newMessDonate = newMessDonate.filter((item) => +item.display_avatar_time > +playedSecond)
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
    }
    refOnCreateMess.current = onCreateMess

    const findMessUpdated = (oldMess, updatedMess, property = 'id') => {
      return oldMess.findIndex((item) => {
        return item[property] === updatedMess[property]
      })
    }

    const refOnUpdateMess = useRef(null)
    const onUpdateMess = (updatedMess) => {
      if (updatedMess.video_id === key_video_id) {
        updateOldMessData(updatedMess, {})
      }
    }
    refOnUpdateMess.current = onUpdateMess

    const subscribeCreateMessAction = () => {
      let createMessSubscription = API.graphql(graphqlOperation(onCreateMessage))
      createMessSubscription = createMessSubscription.subscribe({
        next: (sub: GraphQLResult<APIt.OnCreateMessageSubscription>) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          const subMessage = sub?.value
          const createdMessage = subMessage.data.onCreateMessage
          refOnCreateMess.current(createdMessage)
        },
        error: (error) => console.warn(error),
      })
      return createMessSubscription
    }

    const subscribeUpdateMessAction = () => {
      let updateMessSubscription = API.graphql(graphqlOperation(onUpdateMessage))
      updateMessSubscription = updateMessSubscription.subscribe({
        next: (sub: GraphQLResult<APIt.OnUpdateMessageSubscription>) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          const subMessage = sub?.value
          const updatedMess = subMessage.data.onUpdateMessage
          refOnUpdateMess.current(updatedMess)
        },
        error: (error) => console.warn(error),
      })
      return updateMessSubscription
    }

    useEffect(() => {
      const createMessSubscription = successGetListMess ? subscribeCreateMessAction() : null
      const updateMessSubscription = successGetListMess ? subscribeUpdateMessAction() : null
      return () => {
        if (createMessSubscription) {
          createMessSubscription.unsubscribe()
        }
        if (updateMessSubscription) {
          updateMessSubscription.unsubscribe()
        }
      }
    }, [successGetListMess])

    const filterByStreaming = () => {
      if (successGetListMess && successGetListDonateMess) {
        // fix bug streaming second is not true when access url first time
        const realStreamingSecond = playedSecond
        // check archive video => no use that case
        if (!firstRender && +realStreamingSecond > 0) {
          setFirstRender(true)
          const newMess = savedMess.filter((item) => +item.video_time <= +realStreamingSecond)
          const isMessageInBottom = checkMessIsInBottom()
          // render new messages with savedMess
          setStateMessages([...newMess])

          if (isMessageInBottom) {
            setScrollBehavior('smooth')
            setIsChatInBottom(true)
          }

          const newMessagesDonate = savedDonateMess.filter(
            (item) => +item.display_avatar_time > +realStreamingSecond && +item.video_time <= +realStreamingSecond
          )
          setMessagesDonate(newMessagesDonate)
        } else {
          // only check displaying of user donate icon
          const newMessagesDonate = messagesDonate.filter(
            (item) => +item.display_avatar_time > +realStreamingSecond && +item.video_time <= +realStreamingSecond
          )
          setMessagesDonate(newMessagesDonate)
        }
      }
    }

    useEffect(() => {
      // hide dialog message if message donate is no longer show
      if (messActiveUser && !messagesDonate.find((item) => item.id === messActiveUser.id)) {
        setMessActiveUser(null)
      }
    }, [messagesDonate])

    const filterMessByPlayedSecond = (new_played_second, behaviorOfScroll) => {
      const oldMessCount = stateMessages.length
      let newMess = [...savedMess]
      newMess = newMess.filter((item) => +item.video_time <= +new_played_second)
      let isCheckSeeMore = false
      if (oldMessCount < newMess.length) {
        isCheckSeeMore = true
      }
      const isMessageInBottom = isCheckSeeMore ? checkMessIsInBottom() : false
      if (isMessageInBottom) {
        setScrollBehavior(behaviorOfScroll)
        setIsChatInBottom(true)
      }
      // render messages by time of local
      setStateMessages([...newMess])
      let newMessDonate = [...savedDonateMess]
      newMessDonate = newMessDonate.filter(
        (item) => +item.display_avatar_time > +new_played_second && +item.video_time <= +new_played_second
      )
      // render user donate icon by time of local
      setMessagesDonate(newMessDonate)
    }

    useEffect(() => {
      console.log('2-played->streaming->range', playedSecond, streamingSecond, streamingSecond - playedSecond)
      if (isStreaming) {
        filterByStreaming()
      } else {
        // filter mess when user no seeking or pausing live video
        if (!isSeeking && !liveStreamInfo.is_pausing_live) {
          filterMessByPlayedSecond(playedSecond, 'instant')
        }
      }
      if (isSeeking) {
        setIsSeeking(false)
      }
    }, [playedSecond])

    useEffect(() => {
      if (isChatInBottom) {
        scrollToCurrentMess(scrollBehavior)
        setIsChatInBottom(false)
      }
    }, [isChatInBottom])

    useEffect(() => {
      filterMessByPlayedSecond(liveStreamInfo.seeked_second, 'smooth')
      if (!isSeeking) {
        setIsSeeking(true)
      }
    }, [liveStreamInfo.seek_count])

    const refTransformListMess = useRef(null)
    const handleTransformListMess = () => {
      const transformMess = [...allMess]

      const transformMessAsc = sortMessages(transformMess)
      // const transformMess = messagesResults.data.listMessages.items.filter((item) => item.video_id === key_video_id)
      // comment if no get in initial
      if (streamingSecond === Infinity && videoType === STATUS_VIDEO.LIVE_STREAM) {
        setStateMessages(transformMessAsc)
      }
      // save mess for use in local
      setSavedMess([...transformMessAsc])
      setSuccessGetListMess(true)

      const transformDonateMess = transformMess.filter((item) => item.is_premium && +item.point > 300)
      const transformDonateMessAsc = sortMessages(transformDonateMess)
      // comment if no get in initial
      // setMessagesDonate([...transformDonateMessAsc])
      // save mess for use in local
      setSavedDonateMess([...transformDonateMessAsc])
      setSuccessGetListDonateMess(true)
    }
    refTransformListMess.current = handleTransformListMess

    const getMessages = async (nextToken = null) => {
      try {
        const listQV: APIt.GetMessagesByVideoIdQueryVariables = {
          video_id: key_video_id,
          limit: 2000,
          nextToken,
        }
        const messagesResults: any = await API.graphql(graphqlOperation(getMessagesByVideoId, listQV))
        const messagesInfo = messagesResults.data.getMessagesByVideoId
        const newMess = messagesInfo.items.filter((item) => item.parent && item.video_id === key_video_id)
        // get addition messages if has more messages using nextToken to get paginated mess
        if (messagesInfo.nextToken) {
          setAllMess((messages) => [...messages, ...newMess])
          getMessages(messagesInfo.nextToken)
        } else {
          setAllMess((messages) => [...messages, ...newMess])
          refTransformListMess.current()
        }
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
        const listQV: APIt.GetUsersByUuidQueryVariables = {
          uuid,
          limit: 2000,
        }
        const usersResult: any = await API.graphql(graphqlOperation(getUsersByUuid, listQV))
        const usersData = usersResult.data.getUsersByUuid.items
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

    const resetMessages = () => {
      setAllMess([])
      setStateMessages([])
      setSavedMess([])
      setMessagesDonate([])
      setSavedDonateMess([])
      setMessActiveUser(null)
    }

    useEffect(() => {
      if (key_video_id) {
        resetMessages()
        getMessages()
      }
    }, [key_video_id])

    useEffect(() => {
      if (dataPurchaseTicketSuperChat?.code === 200) {
        setPurchaseDialogVisible(false)
      }
    }, [dataPurchaseTicketSuperChat])

    const refUpdateMessLocal = useRef(null)
    const handleUpdateMessLocal = (result, local_message, error = false) => {
      if (error) {
        updateOldMessData(local_message, { mess_status: STATUS_SEND_MESS.ERROR_DELETE }, 'local_id')
      } else {
        const updatedMessage = result?.data?.updateMessage
        if (updatedMessage) {
          updateOldMessData(updatedMessage, {})
        }
      }
    }
    refUpdateMessLocal.current = handleUpdateMessLocal

    const refUpdateMessBeforeCallApi = useRef(null)
    const handleUpdateMessBeforeCallApi = (updatedMessage, newPropsObj) => {
      if (updatedMessage) {
        updateOldMessData(updatedMessage, { ...newPropsObj })
      }
    }
    refUpdateMessBeforeCallApi.current = handleUpdateMessBeforeCallApi

    async function deleteMsg(message: any) {
      const input = {
        id: message.id,
        delete_flag: true,
      }
      refUpdateMessBeforeCallApi.current(message, {
        ...message,
        delete_flag: true,
        mess_status: STATUS_SEND_MESS.PENDING,
      })
      try {
        const result = await API.graphql(graphqlOperation(updateMessage, { input }))
        refUpdateMessLocal.current(result, { ...message, delete_flag: true })
      } catch (errors) {
        if (errors && errors.errors.length !== 0) {
          refUpdateMessLocal.current([], { ...message, delete_flag: true }, true)
        }
      }
    }

    const reDeleteMess = async (message: any) => {
      const input = {
        id: message.id,
        delete_flag: true,
      }
      let newMess = { ...message, delete_flag: true }
      delete newMess.mess_status
      refUpdateMessBeforeCallApi.current(newMess, { delete_flag: true, mess_status: STATUS_SEND_MESS.PENDING })

      try {
        const result = await API.graphql(graphqlOperation(updateMessage, { input }))
        refUpdateMessLocal.current(result, newMess)
      } catch (errors) {
        if (errors && errors.errors.length !== 0) refUpdateMessLocal.current([], newMess, true)
      }
    }

    const sortMessages = (messages, isSortAsc = true) => {
      const new_mess = [...messages]
      const sortFactor = isSortAsc ? 1 : -1
      return new_mess.sort((a: any, b: any) => sortFactor * (+a.video_time - +b.video_time || a.created_time.localeCompare(b.created_time)))
    }

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
      if (foundIndex !== -1) {
        const newStateMess = [...stateMessages]
        newStateMess[foundIndex] = { ...updatedMessWithNewProp }
        setStateMessages(newStateMess)
      }
      foundIndex = findMessUpdated(savedMess, updatedMessage, compareProp)
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
    const handleCreateMessLocal = (result, local_message, error = false) => {
      if (error) {
        updateOldMessData(local_message, { mess_status: STATUS_SEND_MESS.ERROR_SEND }, 'local_id')
      } else {
        const createdMessage = result?.data?.createMessage
        if (createdMessage) {
          updateOldMessData(createdMessage, { mess_status: STATUS_SEND_MESS.LOADED }, 'local_id')
        }
      }
    }
    refCreateMessLocal.current = handleCreateMessLocal

    const resendMess = async (message: any) => {
      if (isStreaming) {
        const videoTime = playedSecond
        let newMess = { ...message, video_time: videoTime.toString() }
        if (message.point) {
          newMess = { ...newMess, display_avatar_time: videoTime + purchasePoints[`p_${message.point}`].displayTime }
        }
        delete newMess.mess_status
        refUpdateMessBeforeCallApi.current(newMess, { mess_status: STATUS_SEND_MESS.PENDING })

        try {
          const result = await API.graphql(graphqlOperation(createMessage, { input: newMess }))
          refCreateMessLocal.current(result, newMess)
        } catch (errors) {
          if (errors && errors.errors.length !== 0) refCreateMessLocal.current([], newMess, true)
        }
      }
    }

    const createMess = async (message: string, point = 0): Promise<void> => {
      if (successFlagGetAddUSer && Object.keys(chatUser).length > 0 && message && isEnabledChat && isStreaming) {
        const videoTime = playedSecond
        let input: MessInput = {
          // id is auto populated by AWS Amplify
          owner: chatUser.user_name,
          text: sanitizeMess(message),
          uuid: chatUser.uuid,
          video_id: key_video_id,
          video_time: videoTime.toString(),
          // point: 500,//optional : show when Post is use pOint
          is_premium: false,
          userId: chatUser.id,
          delete_flag: false,
          local_id: uuidv4(),
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
          }
        }

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

        const is_premium_local_message = isPremiumChat(local_message, false)
        // save mess for local
        setSavedMess((messages) => [...messages, local_message])
        // save donated messages for local (not check display time)
        if (is_premium_local_message) {
          setSavedDonateMess((messages) => [...messages, local_message])
        }

        // save message to local
        if (isStreaming) {
          const isMessageInBottom = checkMessIsInBottom()
          // render new messages with savedMess
          if (!point) {
            // reset input chat
            values.message = ''
          }
          setStateMessages([...savedMess, local_message])

          if (isMessageInBottom) {
            if (point) {
              setScrollBehavior('instant')
              setIsChatInBottom(true)
            } else {
              scrollToCurrentMess()
            }
          }

          // render new users donate
          if (is_premium_local_message) {
            let newMessDonate = [...savedDonateMess]
            newMessDonate = newMessDonate.filter((item) => +item.display_avatar_time > +playedSecond)
            // render user donate icon by time of local
            setMessagesDonate([...newMessDonate, local_message])
          }
        }

        try {
          const result = await API.graphql(graphqlOperation(createMessage, { input }))
          refCreateMessLocal.current(result, local_message)
        } catch (errors) {
          if (errors && errors.errors.length !== 0) refCreateMessLocal.current([], local_message, true)
          console.error(errors)
        }
      }
    }

    const checkMessIsInBottom = () => {
      // if scrollbar is not in container bottom
      // height of scroll to top + max height < height of container
      if (messContainer) {
        if (messContainer.scrollTop + messContainer.offsetHeight < messContainer.scrollHeight) {
          setDisplaySeeMore(true)
          return false
        } else {
          // if scrollbar is in container bottom and not scrollbar (as max height is smaller than height of container)
          setDisplaySeeMore(false)
          return true
        }
      }
    }

    const scrollToCurrentMess = (behavior = '') => {
      if (!behavior) {
        if (isEnabledChat && isStreaming) {
          behavior = 'instant'
        }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      messContainer.scrollTo({ top: messContainer.scrollHeight, behavior: behavior })
    }

    const handleSubmitChatContent = () => {
      handleSubmit()
    }

    const handlePressEnter = (event: any) => {
      if (event.key === 'Enter') {
        handleSubmitChatContent()
      }
    }
    const getChatInputHeight = () => {
      if(errors?.message) {
        return isDesktopDown1280 ? '99px' : '132.5px'
      } else {
        return isDesktopDown1280 ? '77px' : '116.5px'
      }
    }

    const chatInputComponent = () => (
      <Box
        className={`${classes.chatInputMobileContainer}`}
        style={{ bottom: isMobile ? '0px' : ('-' + getChatInputHeight()) }}
      >
        {purchaseDialogVisible && isMobile && purchaseInfoDialog()}
        {isEnabledChat &&
          (isStreaming ? (
            <Box className={classes.chatInputContainer}>
              {purchaseDialogVisible && !isMobile && purchaseInfoDialog()}
              <LoginRequired>
                <IconButton onClick={purchaseIconClick} id="btnOpenPremiumChatDialog" className={classes.iconPurchase}>
                  <img id="btnOpenPremiumChatDialogImage" src="/images/ic_purchase.svg" />
                </IconButton>
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
                />
                <LoginRequired>
                  <Button onClick={handleSubmitChatContent} className={classes.iconButtonBg}>
                    <Icon className={`fa fa-paper-plane ${classes.sendIcon}`} fontSize="small" />
                  </Button>
                </LoginRequired>
              </Box>
            </Box>
          ) : (
            <></>
          ))}
      </Box>
    )

    const closeDialogActiveUser = () => {
      // prevent close modal when click user icon first time
      if (messActiveUser && !displayDialogMess) {
        setMessActiveUser(null)
      }
      setDisplayDialogMess(false)
    }

    const getMarginTopOfComponents = (componentType = 'chatBoard') => {
      let marginTop = 0
      let transformedMess = stateMessages
      let transformedDonateMess = messagesDonate
      // filter only message is not deleted if user is not streamer
      if (!userResult?.streamer) {
        transformedMess = transformedMess.filter((item) => !item.delete_flag)
        transformedDonateMess = transformedDonateMess.filter((item) => !item.delete_flag)
      }
      if (componentType === 'chatBoard') {
        // no margin top when has not donate message
        if (transformedDonateMess.length === 0) {
          return 0
        }
        // only margin top when has donate message
        // render margin top higher with donate message is first item
        if (transformedMess.length !== 0 && transformedMess[0].is_premium) {
          marginTop = isDesktopDown1280 ? 8 : 16
        } else {
          marginTop = isDesktopDown1280 ? 5 : 12
        }
      }
      if (componentType === 'userIcon') {
        // margin top 16 when has donate message
        if (transformedDonateMess.length !== 0) {
          return isDesktopDown1280 ? 8 : 16
        }
        // render margin top higher with donate message is first item
        if (transformedMess.length !== 0 && transformedMess[0].is_premium) {
          marginTop = isDesktopDown1280 ? 8 : 16
        } else {
          marginTop = isDesktopDown1280 ? 5 : 12
        }
      }
      return marginTop
    }

    const chatBoardComponent = () => (
      <Box className={`${classes.chatBoardContainer}`}>
        <ButtonBase
          onClick={() => scrollToCurrentMess('smooth')}
          className={`${classes.btn_show_more} ${displaySeeMore ? classes.displaySeeMore : ''}`}
        >
          {i18n.t('common:live_stream_screen.show_more_mess')}
        </ButtonBase>
        <ClickAwayListener onClickAway={() => closeDialogActiveUser()}>
          <Box className={`${classes.dialogMess} ${messActiveUser ? classes.dialogMessShow : ''}`}>
            {messActiveUser && (
              <DonateMessage
                videoType={videoType}
                message={messActiveUser}
                deleteMess={deleteMsg}
                getMessageWithoutNgWords={getMessageWithoutNgWords}
                is_streamer={0}
                resendMess={resendMess}
                reDeleteMess={reDeleteMess}
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
        <Box
          className={classes.chatBoard}
          id="chatBoard"
          style={{
            marginTop: getMarginTopOfComponents('chatBoard'),
            height: isMobile ? '253px' : chatHeight,
          }}
        >
          {stateMessages.map((msg: any, i: number) => {
            // only display message is not deleted or display all mess if user is streamer
            return !msg.delete_flag || userResult.streamer ? (
              msg.is_premium ? (
                <DonateMessage
                  key={i}
                  message={msg}
                  videoType={videoType}
                  deleteMess={deleteMsg}
                  getMessageWithoutNgWords={getMessageWithoutNgWords}
                  is_streamer={userResult?.streamer}
                  resendMess={resendMess}
                  reDeleteMess={reDeleteMess}
                />
              ) : (
                <ChatTextMessage
                  key={i}
                  message={msg}
                  videoType={videoType}
                  getMessageWithoutNgWords={getMessageWithoutNgWords}
                  deleteMess={deleteMsg}
                  is_streamer={userResult?.streamer}
                  resendMess={resendMess}
                  reDeleteMess={reDeleteMess}
                />
              )
            ) : null
          })}
        </Box>
        {isMobile ? chatComponentMobile() : chatInputComponent()}
      </Box>
    )

    const chatComponentMobile = () => {
      return purchaseDialogVisible ? purchaseInfoDialog() : chatInputComponent()
    }

    const chatNotAvailableMessage = () => {
      if (videoType === STATUS_VIDEO.SCHEDULE && (isVideoFreeToWatch || userHasViewingTicket)) {
        return i18n.t('common:live_stream_screen.chat_will_available_on_time')
      }
      return i18n.t('common:live_stream_screen.chat_purchase_ticket_note')
    }

    const userDoesNotHaveViewingTicketView = () => (
      <Box className={classes.chatPurchaseTicketBox}>
        <Typography className={classes.chatPurchaseTicketNote}>{chatNotAvailableMessage()}</Typography>
      </Box>
    )

    const chatContentPaddingBottom = () => {
      if (purchaseDialogVisible) {
        return 325
      } else if (!isEnabledChat) {
        return 16
      }
      return 0
    }

    const chatContent = () => (
      <Box className={classes.chatContent} style={isMobile ? { paddingBottom: chatContentPaddingBottom() } : {}}>
        {/* <Button onClick={scrollToCurrentMess}>Scroll to chat mess</Button> */}
        <Box className={classes.userWatchingList} style={{ marginTop: getMarginTopOfComponents('userIcon') }}>
          {messagesDonate
            .slice()
            .reverse()
            .map((item, index) =>
              !item.delete_flag ? (
                <Box
                  key={index}
                  className={classes.userWatchingItem}
                  style={{
                    backgroundColor: purchasePoints[`p_${item.point}`].backgroundColor,
                    opacity: !messActiveUser ? 1 : item.id === messActiveUser.id ? 1 : 0.5,
                  }}
                  onClick={() => {
                    // close modal user icon if click icon of user is showed
                    if (messActiveUser && (messActiveUser.id === item.id || messActiveUser.local_id === item.local_id)) {
                      setMessActiveUser(null)
                      setDisplayDialogMess(false)
                    } else {
                      setDisplayDialogMess(true)
                      setMessActiveUser(item)
                    }
                  }}
                >
                  <ESAvatar src={item?.parent?.avatar} size={isDesktopDown1280 ? 26 : 32} alt={item.parent.user_name} />
                </Box>
              ) : (
                ''
              )
            )}
        </Box>
        {chatBoardComponent()}
        {isEnabledChat && !isStreaming ? (
          <Box className={classes.chatInputContainer}>
            <ButtonBase onClick={() => scrollToCurrentMess('smooth')} className={`${classes.btn_scroll_mess}`}>
              {i18n.t('common:streaming_setting_screen.scroll_to_new_mess')}
            </ButtonBase>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    )

    const displayChatContent = () => {
      return videoType !== STATUS_VIDEO.SCHEDULE && (isVideoFreeToWatch || userHasViewingTicket)
    }

    const chatBoxPaddingBottom = () => {
      if (!isEnabledChat) {
        return '16px'
      }
      if (!isStreaming) {
        return '0px'
      }
      return getChatInputHeight()
    }

    const chatHeight = (() => {
      // 35 is chat header,
      let newChatHeight = (chatWidth * 250) / 153 - 35
      if (messagesDonate.filter((item) => !item.delete_flag).length !== 0) {
        // 56 is height of message donate
        newChatHeight = newChatHeight - (isDesktopDown1280 ? 34 : 56) - getMarginTopOfComponents('chatBoard')
      } else {
        // 16 is margin top of message donate when it is empty
        newChatHeight = newChatHeight - getMarginTopOfComponents('userIcon')
      }
      // height of chat when display chat content
      if (displayChatContent()) {
        // 116.5 is input chat when video is streaming
        newChatHeight = newChatHeight - (isDesktopDown1280 ? 77 : 116.5)
      }
      return Math.round((newChatHeight + Number.EPSILON) * 100) / 100
    })()

    return (
      <Box
        className={classes.container}
        style={
          !displayChatContent()
            ? { height: chatHeight }
            : {
                paddingBottom: chatBoxPaddingBottom(),
              }
        }
      >
        {!isMobile && (
          <Box className={classes.chatHeader}>
            <Typography className={classes.headerTitle}>{i18n.t('common:live_stream_screen.chat_header')}</Typography>
          </Box>
        )}
        {displayChatContent() ? chatContent() : userDoesNotHaveViewingTicketView()}
      </Box>
    )
  }
)

export default ChatContainer
