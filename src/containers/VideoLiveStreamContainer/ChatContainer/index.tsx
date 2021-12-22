/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Typography, Icon, IconButton, useTheme, useMediaQuery, ButtonBase, ClickAwayListener } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import sanitizeHtml from 'sanitize-html'
import i18n from '@locales/i18n'
import useStyles from './styles'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import _, { debounce } from 'lodash'
import { useAppSelector } from '@store/hooks'
// import { useAppDispatch, useAppSelector } from '@store/hooks'
import userProfileStore from '@store/userProfile'
import { UserProfile } from '@services/user.service'
import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'
// import { createMessage, deleteMessage } from "src/graphql/mutations";
const {
  getUsersByUuid,
  getMessagesByVideoId,
  getMessagesByVideoIdWithSort,
} = require(`src/graphql.${process.env.NEXT_PUBLIC_AWS_ENV}/queries`)
const { onCreateMessage, onUpdateMessage } = require(`src/graphql.${process.env.NEXT_PUBLIC_AWS_ENV}/subscriptions`)
const { createMessage, createUser, updateMessage, updateUser } = require(`src/graphql.${process.env.NEXT_PUBLIC_AWS_ENV}/mutations`)
import * as APIt from 'src/types/graphqlAPI'
import useDetailVideo from '../useDetailVideo'
import usePurchaseTicketSuperChat from '../usePurchaseTicket'
import ChatTextMessage from '@containers/VideoLiveStreamContainer/ChatContainer/ChatTextMessage'
import PremiumChatDialog from '@containers/VideoLiveStreamContainer/ChatContainer/PremiumChatDialog'
// import * as Yup from 'yup'
// import { useFormik } from 'formik'
import DonateMessage from './DonateMessage'
import ESAvatar from '@components/Avatar'
// import ESInput from '@components/Input'
import { STATUS_VIDEO } from '@services/videoTop.services'
import LoginRequired from '@containers/LoginRequired'
import moment from 'moment'
import {
  INTERVAL_AUTO_GET_MESS,
  LIMIT_FETCH_NEXT,
  LIMIT_MAX_MESS_PREV_REWIND,
  LIMIT_MESS,
  LIMIT_MIN_MESS_PREV_REWIND,
  SECOND_AUTO_GET_MESS_BEFORE,
  STATUS_SEND_MESS,
} from '@constants/common.constants'
import { v4 as uuidv4 } from 'uuid'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'
// import { DELAY_SECONDS } from '@constants/common.constants'
// import InfiniteScroll from 'react-infinite-scroll-component'
// import { WindowScroller, List, AutoSizer } from 'react-virtualized'
import { List, CellMeasurer, AutoSizer, CellMeasurerCache } from 'react-virtualized'
// import InfiniteLoaderExample from './source/InfiniteLoader/InfiniteLoader.example'
import Loader from '@components/Loader'
import { useRect } from '@utils/hooks/useRect'
import ChatInput from './ChatInput'
import { CommonHelper } from '@utils/helpers/CommonHelper'

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

export enum GET_MESS_TYPE {
  AUTO = 1,
  FETCH_PREV = 2,
  FETCH_NEXT = 3,
  FETCH_NORMAL = 4,
  FETCH_ARCHIVE_INITIAL = 5,
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
// type MessageValidationType = {
//   message: string
// }

export const sanitizeMess = (content: string): string =>
  sanitizeHtml(content, {
    allowedTags: [],
    allowedAttributes: {},
  })

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 25,
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
    },
    ref
  ) => {
    const [errorMess, setErrorMess] = useState<string>('')
    const [isResetMess, setIsResetMess] = useState<boolean>(false)
    // console.log('🚀 ~ isResetMess', isResetMess)
    const [isBottom, setBottom] = useState<boolean>(true)
    // console.log('🚀 ~ isBottom--000', isBottom)
    const [scrolling, setScrolling] = useState<number>(0)
    const messagesEndRef = useRef<any>(null)
    const [purchaseDialogVisible, setPurchaseDialogVisible] = useState<boolean>(false)
    const [messActiveUser, setMessActiveUser] = useState<any>(null)
    const [successGetListMess, setSuccessGetListMess] = useState(false)
    const [successGetListDonateMess, setSuccessGetListDonateMess] = useState(false)
    const [successFlagGetAddUSer, setSuccessFlagGetAddUSer] = useState(false)
    const [messagesDonate, setMessagesDonate] = useState([])
    // console.log('🚀 ~ messagesDonate', messagesDonate)
    // const [displaySeeMore, setDisplaySeeMore] = useState(false)
    // console.log('🚀 ~ displaySeeMore', displaySeeMore)
    const [displayDialogMess, setDisplayDialogMess] = useState(false)
    const [firstRender, setFirstRender] = useState(false)
    const [prevRewindMess, setPrevRewindMess] = useState({})
    const [scrollBehavior, setScrollBehavior] = useState('smooth')
    const isVideoFreeToWatch = freeToWatch === 0 ? true : false
    // const [nextToken, setNextToken] = useState(null)
    const [prevToken, setPrevToken] = useState(null)
    // console.log('🚀 ~ prevToken', prevToken)
    const [isGettingMess, setIsGettingMess] = useState(false)
    const [isGettingPrevRewindMess, setIsGettingPrevRewindMess] = useState(false)
    const [isGettingRewindMess, setIsGettingRewindMess] = useState(false)
    const [cacheMess, setCacheMess] = useState([])
    // console.log('🚀 ~ cacheMess', cacheMess)
    const [rewindMess, setRewindMess] = useState<any>({})
    // console.log('🚀 ~ rewindMess---000', rewindMess)
    const [autoGetMess, setAutoGetMess] = useState<any>([])
    const [archiveInitMess, setArchiveInitMess] = useState([])
    const [cacheDonateMess, setCacheDonateMess] = useState([])
    // console.log('🚀 ~ cacheDonateMess', cacheDonateMess)
    // console.log('🚀 ~ cacheMess', cacheMess)
    const [prevTime, setPrevTime] = useState(0)
    // console.log('🚀 ~ prevTime', prevTime)
    const [nextTime, setNextTime] = useState(0)
    // console.log('🚀 ~ nextTime', nextTime)
    const [isTokenBroken, setIsTokenBroken] = useState(false)
    const [videoTimeIsRewinding, setVideoTimeIsRewinding] = useState(0)
    // console.log('🚀 ~ videoTimeIsRewinding', videoTimeIsRewinding)

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

    const [stateMessages, setStateMessages] = useState([])
    // console.log('🚀 ~ stateMessages---000', stateMessages)

    const [chatUser, setChatUser] = useState<any>({})
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down(769))
    const { checkNgWord } = useCheckNgWord()
    // const [savedMess, setSavedMess] = useState([])
    // const [savedDonateMess, setSavedDonateMess] = useState([])
    const [isChatInBottom, setIsChatInBottom] = useState(false)
    const [isSeeking, setIsSeeking] = useState(false)
    const contentRef = React.createRef<HTMLDivElement>()
    const contentRect = useRect(contentRef)

    const { width: pageWidth } = useWindowDimensions(0)
    const isDesktopDown1280 = pageWidth > 768 && pageWidth <= 1280
    const { userResult, streamingSecond, playedSecond, liveStreamInfo } = useDetailVideo()
    // const { streamingSecond, playedSecond, isViewingStream, liveStreamInfo } = useDetailVideo()
    // const userResult = {streamer: 1}
    const { dataPurchaseTicketSuperChat } = usePurchaseTicketSuperChat()
    // const dispatch = useAppDispatch()

    const isEnabledChat =
      videoType === STATUS_VIDEO.LIVE_STREAM &&
      !liveStreamInfo.is_end_live &&
      (+streamingSecond >= 0 || streamingSecond === Infinity) &&
      successGetListMess &&
      successGetListDonateMess
    // const isEnabledChat = true

    const classes = useStyles()

    const resetStates = () => {
      setStateMessages([])
    }

    useImperativeHandle(ref, () => {
      return {
        resetStates: resetStates,
      }
    })

    useEffect(() => {
      cache.clearAll()
    }, [contentRect?.width])

    const debouncedHandleLoadMore = debounce(() => {
      fetchPrevMess && fetchPrevMess()
    }, 300)

    useEffect(() => {
      if (scrolling > 1) {
        // console.log('🚀 ~ useEffect ~ scrolling', scrolling)
        // only scroll to load more mess if rewinded or is live stream and has prevToken (has mess in prev page)
        if (!isGettingPrevRewindMess && !isGettingRewindMess && (isTokenBroken || (isStreaming && prevToken))) {
          debouncedHandleLoadMore()
        }
      }
    }, [scrolling])

    const refFetchPrevMessWhenRewind = useRef(null)
    const handleFetchPrevMessWhenRewind = (messagesInfo, video_time) => {
      const transformMessAsc = sortMessages(messagesInfo.items)
      setPrevRewindMess({ [video_time]: [...transformMessAsc] })

      // save token to call api in next time
      setPrevToken(messagesInfo.nextToken)
      // console.log('🚀 ~ handleFetchPrevMessWhenRewind ~ messagesInfo', messagesInfo)
      // prevent scroll when has no messages
      if (!messagesInfo.nextToken) setIsTokenBroken(false)
      fetchNextMess(GET_MESS_TYPE.FETCH_NEXT, video_time)
    }
    refFetchPrevMessWhenRewind.current = handleFetchPrevMessWhenRewind

    // fetch messages prev when rewind to video time
    const fetchPrevMessWhenRewind = (video_time, sortOrder = APIt.ModelSortDirection.DESC) => {
      try {
        setIsGettingPrevRewindMess(true)
        let listQV: APIt.GetMessagesByVideoIdWithSortQueryVariables = {
          video_id: key_video_id,
          video_time: { le: video_time - 1 },
          sortDirection: sortOrder,
          limit: CommonHelper.randomIntegerInRange(LIMIT_MIN_MESS_PREV_REWIND, LIMIT_MAX_MESS_PREV_REWIND),
          nextToken: null,
        }
        API.graphql(graphqlOperation(getMessagesByVideoIdWithSort, listQV)).then((messagesResults) => {
          const messagesInfo = messagesResults.data.getMessagesByVideoIdWithSort
          refFetchPrevMessWhenRewind.current(messagesInfo, video_time)
          setIsGettingPrevRewindMess(false)
        })
      } catch (error) {
        setIsGettingMess(false)
        console.error(error)
      }
    }

    const refTransformListMess = useRef(null)
    const handleTransformListMess = (messagesInfo) => {
      const transformMess = [...messagesInfo.items]
      const transformMessAsc = sortMessages(transformMess)
      if (streamingSecond === Infinity && videoType === STATUS_VIDEO.LIVE_STREAM) {
        setStateMessages([...transformMessAsc])
      }
      // save mess for use in local
      setCacheMess([...transformMessAsc])
      setSuccessGetListMess(true)

      const transformDonateMessAsc = transformMessAsc.filter(
        (item) => +item.display_avatar_time >= playedSecond && item.is_premium && +item.point > 300
      )
      // const transformDonateMessAsc = transformDonateMess
      // const transformDonateMessAsc = sortMessages(transformDonateMess)
      // comment if no get in initial
      // setMessagesDonate([...transformDonateMessAsc])
      // save mess for use in local
      setCacheDonateMess([...transformDonateMessAsc])
      setPrevToken(messagesInfo.nextToken)
      // console.log('🚀 ~ handleFetchPrevMess ~ messagesInfo.nextToken--111', messagesInfo.nextToken)

      setSuccessGetListDonateMess(true)
    }
    refTransformListMess.current = handleTransformListMess

    const refFetchMessInitialArchive = useRef(null)
    const handleFetchMessInitialArchive = (video_time) => {
      // console.log('🚀 ~ handleFetchMessInitialArchive ~ video_time', video_time)
      // only get mess when no rewind
      if (!isTokenBroken) {
        const transformMess = [...archiveInitMess]
        // const transformMessAsc = transformMess
        const transformMessAsc = sortMessages(transformMess)

        // save mess for use in local
        setCacheMess([...transformMessAsc])

        const transformDonateMessAsc = transformMessAsc.filter(
          (item) => +item.display_avatar_time >= playedSecond && item.is_premium && +item.point > 300
        )
        // comment if no get in initial
        // save mess for use in local
        setCacheDonateMess([...transformDonateMessAsc])
        // set next time for auto get mess
        setNextTime(video_time + INTERVAL_AUTO_GET_MESS)
      }
      setArchiveInitMess([])
      setSuccessGetListMess(true)
      setSuccessGetListDonateMess(true)
    }
    refFetchMessInitialArchive.current = handleFetchMessInitialArchive

    const refFetchPrevMess = useRef(null)
    const handleFetchPrevMess = (messagesInfo) => {
      const transformMessAsc = sortMessages(messagesInfo.items)
      // console.log('🚀 ~ handleFetchPrevMess ~ transformMessAsc', transformMessAsc)
      // console.log('🚀 ~ handleFetchPrevMess ~ length', transformMessAsc.length)
      // console.log('🚀 ~ isBottom--1111', isBottom)
      // console.log('🚀 ~ handleFetchPrevMess ~ isMessageInBottom', isMessageInBottom)
      setStateMessages((messages) => [...transformMessAsc, ...messages])
      setTimeout(() => {
        _scrollToBottom(transformMessAsc.length)
        if (isBottom) {
          setBottom(true)
        }
      }, 10)
      setCacheMess((messages) => [...transformMessAsc, ...messages])

      const transformDonateMessAsc = transformMessAsc.filter(
        (item) => +item.display_avatar_time >= playedSecond && item.is_premium && +item.point > 300
      )
      // const transformDonateMessAsc = transformDonateMess
      // const transformDonateMessAsc = sortMessages(transformDonateMess)
      setMessagesDonate((messages) => [...transformDonateMessAsc, ...messages])
      setCacheDonateMess((messages) => [...transformDonateMessAsc, ...messages])

      // save token to call api in next time
      setPrevToken(messagesInfo.nextToken)
      // prevent scroll when has no messages
      if (!messagesInfo.nextToken) setIsTokenBroken(false)
      // console.log('🚀 ~ handleFetchPrevMess ~ messagesInfo.nextToken--000', messagesInfo.nextToken)
    }

    refFetchPrevMess.current = handleFetchPrevMess

    const fetchMessInitialStreaming = (sortOrder = APIt.ModelSortDirection.DESC) => {
      try {
        setIsGettingMess(true)
        // console.log('🚀 ~ loadMoreMess ~ fetchPrevMess--0000', getType)
        // console.log('🚀 ~ fetchPrevMess ~ video_time---000', video_time)
        // occur this case when is streaming and fetch mess initial
        let nextToken = null
        let listQV: APIt.GetMessagesByVideoIdQueryVariables = {
          video_id: key_video_id,
          sortDirection: sortOrder,
          limit: LIMIT_MESS,
          nextToken,
          // filter: {
          //   video_time: {
          //     le: 328,
          //     ge: 324,
          //   },
          // },
        }
        // console.log('🚀 ~ fetchPrevMess ~ listQV---000', listQV)
        // console.log('🚀 ~ abc ~ 222')
        API.graphql(graphqlOperation(getMessagesByVideoId, listQV)).then((messagesResults) => {
          const messagesInfo = messagesResults.data.getMessagesByVideoId
          // if (getType === GET_MESS_TYPE.FETCH_NORMAL) {
          refTransformListMess.current(messagesInfo)
          // }
          setIsGettingMess(false)
        })
      } catch (error) {
        setIsGettingMess(false)
        console.error(error)
      }
    }

    // fetch messages prev when scroll to top when archived or when live stream
    const fetchPrevMess = (sortOrder = APIt.ModelSortDirection.DESC) => {
      try {
        setIsGettingMess(true)
        // console.log('🚀 ~ fetchPrevMess ~ isTokenBroken--000', isTokenBroken)
        if (isTokenBroken) {
          let nextToken = prevToken
          // console.log('🚀 ~ fetchPrevMess ~ nextToken', nextToken)
          let listQV: APIt.GetMessagesByVideoIdWithSortQueryVariables = {
            video_id: key_video_id,
            video_time: { le: prevTime },
            sortDirection: sortOrder,
            limit: LIMIT_MESS,
            nextToken,
          }
          // console.log('🚀 ~ getMessagesByVideoIdWithSort ~ 222')
          API.graphql(graphqlOperation(getMessagesByVideoIdWithSort, listQV)).then((messagesResults) => {
            // console.log('🚀 ~ API.graphql ~ messagesResults---000', messagesResults)
            const messagesInfo = messagesResults.data.getMessagesByVideoIdWithSort
            refFetchPrevMess.current(messagesInfo)
            setIsGettingMess(false)
          })
        } else {
          let nextToken = prevToken
          let listQV: APIt.GetMessagesByVideoIdQueryVariables = {
            video_id: key_video_id,
            sortDirection: sortOrder,
            limit: LIMIT_MESS,
            nextToken,
          }
          // console.log('🚀 ~ getMessagesByVideoId ~ 222')
          API.graphql(graphqlOperation(getMessagesByVideoId, listQV)).then((messagesResults) => {
            const messagesInfo = messagesResults.data.getMessagesByVideoId
            refFetchPrevMess.current(messagesInfo)
            setIsGettingMess(false)
          })
        }

        // fetch mess prev after rewind => token is removed (check isTokenBroken)
        // if (
        //   isTokenBroken
        // ) {
        //   listQV = {
        //     ...listQV,
        //     filter: {
        //       video_time: {
        //         le: prevTime,
        //       },
        //     },
        //   }
        // }
      } catch (error) {
        setIsGettingMess(false)
        console.error(error)
      }
    }

    const refFetchMessAuto = useRef(null)
    const handleFetchMessAuto = (video_time) => {
      // only get messages if no rewind
      if (!isGettingRewindMess) {
        // console.log('🚀 ~ handleFetchMessAuto ~ video_time', video_time)
        const transformMessAsc = sortMessages([...autoGetMess])
        // setStateMessages(transformMessAsc.filter((v) => +v.video_time <= +playedSecond))
        setCacheMess((messages) => [...messages, ...transformMessAsc])
        const transformDonateMessAsc = transformMessAsc.filter(
          (item) => +item.display_avatar_time >= playedSecond && item.is_premium && +item.point > 300
        )
        // const transformDonateMessAsc = transformDonateMess
        // const transformDonateMessAsc = sortMessages(transformDonateMess)
        // comment if no get in initial
        // save mess for use in local
        setCacheDonateMess((messages) => [...messages, ...transformDonateMessAsc])
        setNextTime(video_time + INTERVAL_AUTO_GET_MESS)
        setAutoGetMess([])
      }
    }
    refFetchMessAuto.current = handleFetchMessAuto

    const refFetchRewindMess = useRef(null)
    const handleFetchRewindMess = (video_time, nextTime) => {
      // console.log('🚀 ~ handleFetchRewindMess ~ video_time', video_time)
      // console.log('🚀 ~ handleFetchRewindMess ~ videoTimeIsRewinding', videoTimeIsRewinding)
      // only get messages with last rewind
      if (videoTimeIsRewinding === video_time) {
        // console.log('🚀 ~ handleFetchRewindMess ~ nextTime--ok', nextTime)
        const oldPrevRewindMess = prevRewindMess?.[video_time] ? [...prevRewindMess[video_time]] : []
        const newRewindMess = rewindMess?.[video_time] ? [...oldPrevRewindMess, ...rewindMess[video_time]] : [...oldPrevRewindMess]
        // console.log('🚀 ~ handleFetchRewindMess ~ newRewindMess', newRewindMess)
        const transformMessAsc = sortMessages([...newRewindMess])

        setStateMessages(transformMessAsc.filter((v) => +v.video_time <= +playedSecond))
        setCacheMess(transformMessAsc)

        const transformDonateMessAsc = transformMessAsc.filter(
          (item) => +item.display_avatar_time >= playedSecond && item.is_premium && +item.point > 300
        )
        // only get mess has time < played second
        const newTransformMessAsc = transformDonateMessAsc.filter((v) => +v.video_time <= +playedSecond)
        setMessagesDonate([...newTransformMessAsc])
        // save mess for use in local
        setCacheDonateMess([...transformDonateMessAsc])

        setPrevRewindMess({})
        setRewindMess({})
        setIsGettingMess(false)
        setIsGettingRewindMess(false)
        // set prev time to scroll to load more
        setPrevTime(video_time - 1)
        // set next time to auto get mess repeat
        setNextTime(nextTime + 1)
        // set is token broken to allow scroll to load more
        setIsTokenBroken(true)
        // reset prev token to get mess is not error
        // setPrevToken(null)
      }
    }
    refFetchRewindMess.current = handleFetchRewindMess

    // fetch messages next when rewind or mess auto get
    const fetchNextMess = (
      getType = GET_MESS_TYPE.FETCH_NEXT,
      video_time = -1,
      sortOrder = APIt.ModelSortDirection.ASC,
      nextToken = null
    ) => {
      try {
        let limitMess = LIMIT_MESS
        // console.log('🚀 ~ loadMoreMess ~ fetchNextMess--0000', getType)
        // console.log('🚀 ~ fetchPrevMess ~ video_time---000', video_time)
        if (getType === GET_MESS_TYPE.FETCH_NEXT) {
          setIsGettingRewindMess(true)
          setIsGettingMess(true)
          limitMess = LIMIT_FETCH_NEXT
        }
        if (getType === GET_MESS_TYPE.FETCH_ARCHIVE_INITIAL) {
          setIsGettingMess(true)
        }
        if (getType === GET_MESS_TYPE.FETCH_NEXT) {
          setVideoTimeIsRewinding(video_time)
        }

        const nextTime = +video_time + INTERVAL_AUTO_GET_MESS - 1
        // console.log('🚀 ~ fetchPrevMess ~ video_time', video_time)
        // console.log('🚀 ~ nextTime---999', nextTime)
        let listQV: APIt.GetMessagesByVideoIdWithSortQueryVariables = {
          video_id: key_video_id,
          video_time: {
            between: [video_time, nextTime],
          },
          // video_time: {
          //   ge: video_time,
          //   le: nextTime
          // },
          sortDirection: sortOrder,
          limit: limitMess,
          nextToken,
          // filter: {
          //   video_time: {
          //     ge: 900,
          //     // le: nextTime,
          //   },
          // },
        }

        // if (video_time !== -1) {
        //   listQV = {
        //     ...listQV,
        //     filter: {
        //       video_time: {
        //         ge: video_time,
        //         le: nextTime,
        //       },
        //     },
        //   }
        // }
        // console.log('🚀 ~ abc ~ 222')
        API.graphql(graphqlOperation(getMessagesByVideoIdWithSort, listQV)).then((messagesResults) => {
          const messagesInfo = messagesResults.data.getMessagesByVideoIdWithSort
          // && !_.isEmpty(messagesInfo.items)
          if (getType === GET_MESS_TYPE.FETCH_NEXT) {
            const newMess = [...messagesInfo.items]
            if (messagesInfo.nextToken) {
              // console.log('🚀 ~ API.graphql ~ FETCH_NEXT---999', messagesInfo.items)
              // save info of messages with video time
              setRewindMess((items) => {
                return { ...items, [video_time]: items?.[video_time] ? [...items[video_time], ...newMess] : [...newMess] }
              })
              // setRewindMess((items) => {...items, video_time: [......messagesInfo.items]})
              // setRewindMess((messages) => [...messages, ...messagesInfo.items])
              fetchNextMess(getType, video_time, sortOrder, messagesInfo.nextToken)
            } else {
              // console.log('🚀 ~ API.graphql ~ FETCH_NEXT---000', messagesInfo.items)
              // save info of messages with video time
              setRewindMess((items) => {
                return { ...items, [video_time]: items?.[video_time] ? [...items[video_time], ...newMess] : [...newMess] }
              })
              refFetchRewindMess.current(video_time, nextTime)
              setIsGettingMess(false)
            }
          } else if (getType === GET_MESS_TYPE.AUTO) {
            if (messagesInfo.nextToken) {
              setAutoGetMess((messages) => [...messages, ...messagesInfo.items])
              fetchNextMess(getType, video_time, sortOrder, messagesInfo.nextToken)
            } else {
              setAutoGetMess((messages) => [...messages, ...messagesInfo.items])
              refFetchMessAuto.current(video_time)
            }
          } else if (getType === GET_MESS_TYPE.FETCH_ARCHIVE_INITIAL) {
            // console.log('🚀 ~ API.graphql ~ messagesInfo.nextToken', messagesInfo.nextToken)
            if (messagesInfo.nextToken) {
              setArchiveInitMess((messages) => [...messages, ...messagesInfo.items])
              fetchNextMess(getType, video_time, sortOrder, messagesInfo.nextToken)
            } else {
              setArchiveInitMess((messages) => [...messages, ...messagesInfo.items])
              refFetchMessInitialArchive.current(video_time)
              setIsGettingMess(false)
            }
          }
        })
      } catch (error) {
        setIsGettingRewindMess(false)
        setIsGettingMess(false)
        console.error(error)
      }
    }
    // console.log('🚀 ~ isStreaming ~ playedSecond', playedSecond)
    // console.log('🚀 ~ isStreaming ~ streamingSecond', streamingSecond)
    const isStreaming = (() => {
      // console.log('🚀 ~ isStreaming ~ videoType', videoType, playedSecond, streamingSecond)
      // console.log('🚀 ~ isStreaming ~ playedSecond >= streamingSecond', playedSecond >= streamingSecond)
      // return true
      if (videoType === STATUS_VIDEO.LIVE_STREAM) {
        return true
        // if (streamingSecond === Infinity) {
        //   return true
        // }
        // if (playedSecond >= streamingSecond) {
        //   return true
        // }
      }
      return false
    })()

    const renderLoader = () => {
      if (isGettingMess === true || isGettingPrevRewindMess === true) {
        return (
          <Box className={classes.loaderBox}>
            <Loader />
          </Box>
        )
      }
      return null
    }

    const messContainer = document.getElementById('list_mess')
    // const messContainer = document.getElementById('messList')
    if (messContainer) {
      messContainer.onwheel = function (event) {
        // console.log('🚀 ~ test--000', messContainer.scrollTop)
        // console.log('🚀 ~ messContainer.offsetHeight', messContainer.offsetHeight)
        // console.log('🚀 ~ messContainer.scrollHeight', messContainer.scrollHeight)
        // if (messContainer.scrollTop === 0) {
        //   console.log('🚀 ~ messContainer.scrollTop ----1111', messContainer.scrollTop)
        //   _loadMoreRows({ startIndex: 1, stopIndex: 2 })
        // }
        // if (messContainer.scrollTop + messContainer.offsetHeight >= messContainer.scrollHeight) {
        //   // if (messContainer.scrollTop === 0) {
        //   setDisplaySeeMore(false)
        // }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (event.wheelDeltaY > 0 && messContainer.offsetHeight === messContainer.scrollHeight) {
          // console.log('🚀 ~ test--1111', messContainer)
          debouncedHandleLoadMore()
        }
      }
    }

    // const chatContentMainContainer = document.getElementById('chatContentMain')
    // if (chatContentMainContainer) {
    //   chatContentMainContainer.onwheel = function (event) {
    //     // event.preventDefault()
    //     if (event.wheelDeltaY > 0) {
    //       //scroll len tren thi wheelDeltaY luon >0
    //       //scroll xuong duoi thi wheelDeltaY luon <0
    //     }
    //     // khi bắt dc event của Wheel thì fetch thêm data
    //     console.log('event.wheelDeltaY', event.wheelDeltaY, 'event.deltaY', event.deltaY)

    //     console.log('🚀 ~ messagesEndRef.scrollTop', messContainer.scrollTop)
    //     console.log('🚀 ~ messContainer.offsetHeight', messContainer.offsetHeight)
    //     console.log('🚀 ~ messContainer.scrollHeight', messContainer.scrollHeight)
    //     if (event.wheelDeltaY > 0 && messContainer.offsetHeight === messContainer.scrollHeight) {
    //       console.log('🚀 ~ messContainer--000', messContainer)
    //       handleLoadMore()
    //     }
    //     // khi bắt dc event của Wheel thì fetch thêm data
    //     console.log('255 wheel đang chạy!')
    //   }
    // }

    // const messListContainer = document.getElementById('list_mess')
    // if (messListContainer) {
    //   messListContainer.onscroll = function () {
    //     // if (messContainer.scrollTop + messContainer.offsetHeight >= messContainer.scrollHeight) {
    //     //   // if (messContainer.scrollTop === 0) {
    //     //   setDisplaySeeMore(false)
    //     // }
    //   }
    // }

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
      if (createdMessage?.video_id === key_video_id && videoType === STATUS_VIDEO.LIVE_STREAM) {
        const foundIndex = findMessUpdated(cacheMess, createdMessage, 'local_id')
        // only add new message if no found message in local
        if (foundIndex === -1) {
          // if (playedSecond >= streamingSecond || liveStreamInfo.is_pausing_live) {
          if (isStreaming) {
            // render new messages with savedMess
            const isMessageInBottom = checkMessIsInBottom()
            setStateMessages([...cacheMess, createdMessage])
            if (isMessageInBottom) {
              scrollToCurrentMess()
            }

            // render new users donate
            if (isPremiumChat(createdMessage, false)) {
              let newMessDonate = [...cacheDonateMess]
              // newMessDonate = newMessDonate.filter((item) => +item.display_avatar_time > +streamingSecond)
              newMessDonate = newMessDonate.filter((item) => +item.display_avatar_time > +playedSecond)
              // render user donate icon by time of local
              setMessagesDonate([...newMessDonate, createdMessage])
            }
          }
          // save mess for local
          setCacheMess((messages) => [...messages, createdMessage])
          // save donated messages for local (not check display time)
          if (isPremiumChat(createdMessage, false)) {
            setCacheDonateMess((messages) => [...messages, createdMessage])
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
      if (updatedMess?.video_id === key_video_id) {
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
          const newMess = cacheMess.filter((item) => +item.video_time <= +realStreamingSecond)
          const isMessageInBottom = checkMessIsInBottom()
          // render new messages with savedMess
          setStateMessages([...newMess])

          if (isMessageInBottom) {
            setScrollBehavior('smooth')
            setIsChatInBottom(true)
          }

          const newMessagesDonate = cacheDonateMess.filter((item) => +item.display_avatar_time > +realStreamingSecond)
          setMessagesDonate(newMessagesDonate)
        } else {
          // only check displaying of user donate icon
          const newMessagesDonate = cacheDonateMess.filter((item) => +item.display_avatar_time > +realStreamingSecond)
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

    const filterMessByPlayedSecond = (new_played_second) => {
      // console.log('🚀 ~ filterMessByPlayedSecond ~ behaviorOfScroll', behaviorOfScroll)
      // const oldMessCount = stateMessages.length
      // console.log('🚀 ~ filterMessByPlayedSecond ~ oldMessCount', oldMessCount)
      let newMess = [...cacheMess]
      newMess = newMess.filter((item) => +item.video_time <= +new_played_second)
      // let isCheckSeeMore = false
      // if (oldMessCount < newMess.length) {
      //   isCheckSeeMore = true
      // }
      // const isMessageInBottom = isCheckSeeMore ? checkMessIsInBottom() : false
      // if (isMessageInBottom) {
      //   setScrollBehavior(behaviorOfScroll)
      //   setIsChatInBottom(true)
      // }
      // render messages by time of local
      if (!_.isEqual(stateMessages, newMess)) {
        setStateMessages([...newMess])
      }

      let newMessDonate = [...cacheDonateMess]
      newMessDonate = newMessDonate.filter(
        (item) => +item.display_avatar_time > +new_played_second && +item.video_time <= +new_played_second
      )
      // render user donate icon by time of local
      setMessagesDonate(newMessDonate)
    }

    useEffect(() => {
      // auto get mess when no rewind video
      if (!isGettingRewindMess && !isStreaming) {
        // check is streaming addition
        // if isStreaming
        if (!isStreaming && playedSecond === nextTime - SECOND_AUTO_GET_MESS_BEFORE) {
          // console.log('🚀 ~ useEffect ~ fetchNextMess-auto', fetchNextMess)
          fetchNextMess(GET_MESS_TYPE.AUTO, nextTime)
        }
      }
      // console.log('2-played->streaming->range', playedSecond, streamingSecond, streamingSecond - playedSecond)
      if (isStreaming) {
        filterByStreaming()
      } else {
        //  filter mess when user no seeking or pausing live video
        if (!isSeeking && !liveStreamInfo.is_pausing_live) {
          filterMessByPlayedSecond(playedSecond)
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
      if (liveStreamInfo.seek_count && !isStreaming) {
        setBottom(true)
        // console.log('🚀 ~ useEffect ~ setBottom--000', isBottom)
        resetMessagesWhenRewind()
        // console.log('🚀 ~ useEffect ~ liveStreamInfo.seeked_second', liveStreamInfo.seeked_second)
        // filterMessByPlayedSecond(liveStreamInfo.seeked_second, 'smooth')
        fetchPrevMessWhenRewind(liveStreamInfo.seeked_second)
        // fetchNextMess(GET_MESS_TYPE.FETCH_NEXT, liveStreamInfo.seeked_second)
        if (!isSeeking) {
          setIsSeeking(true)
        }
      }
    }, [liveStreamInfo.seek_count])

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
      // setAllMess([])
      setStateMessages([])
      // setSavedMess([])
      setMessagesDonate([])
      // setSavedDonateMess([])
      setCacheMess([])
      setCacheDonateMess([])
      setRewindMess({})
      setPrevRewindMess({})
      setAutoGetMess([])
      setMessActiveUser(null)
    }

    const resetMessagesWhenRewind = () => {
      setStateMessages([])
      setCacheMess([])
      setCacheDonateMess([])
      setMessActiveUser(null)
    }

    useEffect(() => {
      if (key_video_id) {
        resetMessages()
      }
    }, [key_video_id])

    useEffect(() => {
      // console.log('🚀 ~ useEffect ~ isStreaming--000', isStreaming, videoType)
      if (isStreaming) {
        // console.log('🚀 ~ useEffect ~ isStreaming', isStreaming)
        fetchMessInitialStreaming()
      } else if (!isStreaming && videoType === STATUS_VIDEO.ARCHIVE) {
        fetchNextMess(GET_MESS_TYPE.FETCH_ARCHIVE_INITIAL, 0)
      }
    }, [videoType])

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
        normalMessHasError={errorMess ? true : false}
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
            let regex: RegExp
            regex = new RegExp(item.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g')
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
      video_time?: number
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
      foundIndex = findMessUpdated(cacheMess, updatedMessage, compareProp)
      if (foundIndex !== -1) {
        const newCacheMess = [...cacheMess]
        newCacheMess[foundIndex] = { ...updatedMessWithNewProp }
        setCacheMess(newCacheMess)
      }
      foundIndex = findMessUpdated(messagesDonate, updatedMessage, compareProp)
      if (foundIndex !== -1) {
        const newDonateMess = [...messagesDonate]
        newDonateMess[foundIndex] = { ...updatedMessWithNewProp }
        setMessagesDonate(newDonateMess)
      }
      foundIndex = findMessUpdated(cacheDonateMess, updatedMessage, compareProp)
      if (foundIndex !== -1) {
        const newCacheDonateMess = [...cacheDonateMess]
        newCacheDonateMess[foundIndex] = { ...updatedMessWithNewProp }
        setCacheDonateMess(newCacheDonateMess)
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
        let newMess = { ...message, video_time: videoTime }
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
          video_time: videoTime,
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
        setCacheMess((messages) => [...messages, local_message])
        // setSavedMess((messages) => [...messages, local_message])
        // save donated messages for local (not check display time)
        if (is_premium_local_message) {
          // setSavedDonateMess((messages) => [...messages, local_message])
          setCacheDonateMess((messages) => [...messages, local_message])
        }

        // save message to local
        if (isStreaming) {
          const isMessageInBottom = checkMessIsInBottom()
          // render new messages with savedMess
          if (!point) {
            // reset input chat
            // values.message = ''
            setIsResetMess((value) => !value)
          }
          setStateMessages([...stateMessages, local_message])

          if (isMessageInBottom) {
            if (point) {
              setScrollBehavior('instant')
              setIsChatInBottom(true)
            } else {
              // console.log('🚀 ~ createMess ~ scrollToCurrentMess---000', scrollToCurrentMess)
              scrollToCurrentMess()
            }
          }

          // render new users donate
          if (is_premium_local_message) {
            // TODO
            // let newMessDonate = [...savedDonateMess]
            // newMessDonate = newMessDonate.filter((item) => +item.display_avatar_time > +playedSecond)
            // render user donate icon by time of local
            setMessagesDonate([...messagesDonate, local_message])
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

    const refCreateNewMessLocal = useRef(null)
    const handleCreateNewMessLocal = (mess) => {
      createMess(mess)
    }
    refCreateNewMessLocal.current = handleCreateNewMessLocal
    const sendNormalMess = (mess: string) => {
      refCreateNewMessLocal.current(mess)
    }

    const checkMessIsInBottom = () => {
      // if scrollbar is not in container bottom
      // height of scroll to top + max height < height of container
      if (messContainer) {
        // if (messContainer.scrollTop !== 0) {
        if (messContainer.scrollTop + messContainer.offsetHeight < messContainer.scrollHeight) {
          // setDisplaySeeMore(true)
          return false
        } else {
          // if scrollbar is in container bottom and not scrollbar (as max height is smaller than height of container)
          // setDisplaySeeMore(false)
          return true
        }
      }
    }

    const scrollToCurrentMess = (behavior = '') => {
      // console.log('🚀 ~ scrollToCurrentMess ~ isEnabledChat--000', isEnabledChat)
      if (!behavior) {
        if (isEnabledChat && isStreaming) {
          behavior = 'instant'
        }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      messContainer.scrollTo({ top: messContainer.scrollHeight, behavior: behavior })
      // if (messagesEndRef.current != null && messagesEndRef) {
      //   messagesEndRef.current?.scrollToRow(stateMessages.length - 1)
      //   setTimeout(() => {
      //     messagesEndRef.current?.scrollToRow(stateMessages.length - 1)
      //     // setBottom(true)
      //   }, 100)
      // }
    }

    const chatInputComponent = () => (
      <Box
        className={`${classes.chatInputMobileContainer}`}
        style={{ bottom: isMobile ? '0px' : errorMess ? '-132.5px' : '-116.5px' }}
        // style={{ bottom: isMobile ? '0px' : errors?.message ? '-132.5px' : '-110.5px' }}
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
              <ChatInput
                isResetMess={isResetMess}
                handleChatInputOnFocus={handleChatInputOnFocus}
                handleChatInputOnBlur={handleChatInputOnBlur}
                setErrorMess={setErrorMess}
                sendNormalMess={sendNormalMess}
              ></ChatInput>
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
          marginTop = 16
        } else {
          marginTop = 12
        }
      }
      if (componentType === 'userIcon') {
        // return 16
        // margin top 16 when has donate message
        if (transformedDonateMess.length !== 0) {
          return 16
        }
        // render margin top higher with donate message is first item
        if (transformedMess.length !== 0 && transformedMess[0].is_premium) {
          marginTop = 16
        } else {
          marginTop = 12
        }
      }
      return marginTop
    }
    // console.log('🚀 ~ checkMessIsInBottom ~ isGettingMess', isGettingMess)
    // const rowCount = filteredMessages.length + 1
    // const _rowRenderer = ({ index, key, style }) => {
    //   console.log('🚀 ~ checkMessIsInBottom ~ key', key)
    //   console.log('🚀 ~ Example1 ~ index', index)
    //   console.log('🚀 ~ Example1 ~ index > 0', +index > 0)
    //   console.log('🚀 ~ Example1 ~ stateMessages', stateMessages[index])
    //   // let content
    //   // stateMessages[index] && (
    //   console.log('🚀 ~ checkMessIsInBottom ~ isGettingMess', isGettingMess)
    //   // if (index === 0 && isGettingMess) {
    //   //   return (
    //   //     <div key={key} style={style}>
    //   //       ....Loading
    //   //     </div>
    //   //   )
    //   // } else {
    //   // const newMess = isGettingMess ? stateMessages[index - 1] : stateMessages[index]
    //   const newMess = stateMessages[index]
    //   return (
    //     newMess && (
    //       <div key={key} style={style}>
    //         <ChatTextMessage
    //           key={index}
    //           message={newMess}
    //           videoType={videoType}
    //           getMessageWithoutNgWords={getMessageWithoutNgWords}
    //           deleteMess={deleteMsg}
    //           is_streamer={userResult?.streamer}
    //           resendMess={resendMess}
    //           reDeleteMess={reDeleteMess}
    //         />
    //       </div>
    //     )
    //   )
    //   // }

    //   // return (
    //   //   <ChatTextMessage
    //   //     key={index}
    //   //     message={msg}
    //   //     videoType={videoType}
    //   //     getMessageWithoutNgWords={getMessageWithoutNgWords}
    //   //     deleteMess={deleteMsg}
    //   //     is_streamer={userResult?.streamer}
    //   //     resendMess={resendMess}
    //   //     reDeleteMess={reDeleteMess}
    //   //   />
    //   // )
    // }

    const rowRenderer = ({ index, key, style, parent }) => {
      const msg = stateMessages[index]
      return (
        <CellMeasurer cache={cache} columnIndex={0} columnCount={1} key={key} parent={parent} rowIndex={index}>
          {({ registerChild }) => (
            <div key={key} style={style} ref={registerChild}>
              {!msg.delete_flag || userResult.streamer ? (
                msg.is_premium ? (
                  <DonateMessage
                    key={index}
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
                    key={index}
                    message={msg}
                    videoType={videoType}
                    getMessageWithoutNgWords={getMessageWithoutNgWords}
                    deleteMess={deleteMsg}
                    is_streamer={userResult?.streamer}
                    resendMess={resendMess}
                    reDeleteMess={reDeleteMess}
                  />
                )
              ) : null}
              {/* <ChatTextMessage
                key={index}
                message={msg}
                videoType={videoType}
                getMessageWithoutNgWords={getMessageWithoutNgWords}
                deleteMess={deleteMsg}
                is_streamer={userResult?.streamer}
                resendMess={resendMess}
                reDeleteMess={reDeleteMess}
              /> */}
            </div>
          )}
        </CellMeasurer>
      )
    }

    const _scrollToBottom = (position: number) => {
      //https://github.com/bvaughn/react-virtualized/issues/995
      if (messagesEndRef.current != null && messagesEndRef) {
        messagesEndRef.current?.scrollToRow(position - 1)
        setTimeout(() => {
          messagesEndRef.current?.scrollToRow(position - 1)
          // setBottom(true)
        }, 100)
      }
    }

    const _onScroll = (e) => {
      const scrollPos = e.scrollTop + e.clientHeight
      // console.log('🚀 ~ test--scrollTop', e.scrollTop)
      // console.log('🚀 ~ test--clientHeight', e.clientHeight)
      // console.log('🚀 ~ test--scrollHeight', e.scrollHeight)
      // console.log('🚀 ~ test--333', isGettingRewindMess)
      const height = e.scrollHeight
      const offset = Math.abs(height - scrollPos)
      // console.log('🚀 ~ checkMessIsInBottom ~ offset', offset)
      const bottomThreshold = 150
      // only fetch prev mess when no rewind
      if (!isGettingRewindMess && e.scrollTop <= 0) {
        // console.log('🚀 ~ checkMessIsInBottom ~ e.scrollTop <= 0', e.scrollTop <= 0)
        // handle this later
        setScrolling(scrolling + 1)
      }
      if (offset < bottomThreshold) {
        // console.log('🚀 ~ useEffect ~ setBottom', 222)
        setBottom(true)
      } else if (offset > bottomThreshold) {
        // console.log('🚀 ~ useEffect ~ setBottom', 333)
        if (stateMessages.length) {
          // console.log('🚀 ~ checkMessIsInBottom ~ stateMessages.length', stateMessages.length)
          setBottom(false)
        }
      }
    }

    useEffect(() => {
      // console.log('🚀 ~ setTimeout ~ isBottom--2222', isBottom)
      // console.log('🚀 ~ setTimeout ~ isGettingMess--1111', isGettingMess)

      setTimeout(() => {
        // console.log('🚀 ~ setTimeout ~ isGettingMess--2222', isGettingMess)
        if (isBottom && !isGettingMess) {
          // if (isBottom) {
          _scrollToBottom(stateMessages.length)
          // console.log('🚀 ~ useEffect ~ setBottom', 4444)
          setBottom(true)
        }
      }, 10)
      cache.clearAll()
      // console.log('🚀 ~ useEffect ~ cache---000', cache)
    }, [stateMessages])

    // const _isRowLoaded = ({ index }) => {
    //   console.log('🚀 ~ Example ~ index', index)
    //   console.log('🚀 ~ Example ~ allMess[index]', stateMessages[index])
    //   return index >= 0 // STATUS_LOADING or STATUS_LOADED
    // }

    // const rowCount = stateMessages.length
    // const cache = new CellMeasurerCache({
    //   fixedWidth: true,
    //   defaultHeight: 25,
    // })
    const chatBoardComponent = () => (
      <Box
        id="chatContentMain"
        className={`${classes.chatBoardContainer}`}
        style={{
          marginTop: getMarginTopOfComponents('chatBoard'),
        }}
      >
        {/* <div onClick={() => debouncedHandleLoadMore()} style={{ flexGrow: 0 }}>
          Load more
        </div> */}
        {renderLoader()}
        {/* <ButtonBase
          onClick={() => scrollToCurrentMess('smooth')}
          className={`${classes.btn_show_more} ${displaySeeMore ? classes.displaySeeMore : ''}`}
        >
          {i18n.t('common:live_stream_screen.show_more_mess')}
        </ButtonBase> */}
        <IconButton
          disableRipple
          style={{ display: !isBottom ? 'flex' : 'none' }}
          className={classes.bottomArrow}
          onClick={() => {
            setTimeout(() => {
              _scrollToBottom(stateMessages.length)
              setBottom(true)
            }, 10)
          }}
          aria-label="scroll bottom"
          size="small"
        >
          <Icon className={`${classes.iconAngleDown} fa fa-angle-down`} />
        </IconButton>
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
        <div
          className={classes.chatBoard}
          id="chatBoard"
          ref={contentRef}
          // ref={(ref) => {
          //   setScrollChatRef(ref)
          // }}
          style={
            {
              // flexDirection: 'column-reverse',
              // height: 600,
              // marginTop: getMarginTopOfComponents('chatBoard'),
              // height: isMobile ? '253px' : chatHeight,
            }
          }
        >
          <AutoSizer style={{ flex: 1 }}>
            {({ height, width }) => {
              // console.log('🚀 ~ MessageList ~ height', height)
              return (
                <List
                  ref={messagesEndRef}
                  onScroll={(e) => _onScroll(e)}
                  overscanRowsCount={10}
                  deferredMeasurementCache={cache}
                  rowHeight={cache.rowHeight}
                  // rowHeight={25}
                  rowRenderer={rowRenderer}
                  rowCount={stateMessages.length}
                  className={classes.listContainer}
                  id="list_mess"
                  // style={{
                  //   outline: 0,
                  //   marginRight: 10,
                  // }}
                  height={height}
                  width={width}
                />
              )
            }}
          </AutoSizer>
          {/* <InfiniteLoader thresold={1} isRowLoaded={_isRowLoaded} loadMoreRows={_loadMoreRows} rowCount={rowCount}>
            {({ onRowsRendered, registerChild }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    id="messList"
                    ref={registerChild}
                    // className={classes.List}
                    height={600}
                    onRowsRendered={onRowsRendered}
                    rowCount={rowCount}
                    rowHeight={30}
                    rowRenderer={_rowRenderer}
                    width={width}
                  />
                )}
              </AutoSizer>
            )}
          </InfiniteLoader> */}
          {/* <InfiniteScroll
            scrollableTarget={'chatBoard'}
            dataLength={stateMessages.length}
            next={loadMoreMess}
            hasMore={true}
            loader={<h4>...Loading</h4>}
            scrollThreshold={'1px'}
            inverse={true}
            style={{ display: 'flex', flexDirection: 'column-reverse' }}
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
          </InfiniteScroll> */}
          {/* {stateMessages.slice(0, 10).map((msg: any, i: number) => {
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
          })} */}
        </div>
        {/* {isMobile ? chatComponentMobile() : chatInputComponent()} */}
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

    // const chatContentPaddingBottom = () => {
    //   if (purchaseDialogVisible) {
    //     return 325
    //   } else if (!isEnabledChat) {
    //     return 16
    //   }
    //   return 0
    // }

    const chatContent = () => (
      <>
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
        {isMobile ? chatComponentMobile() : chatInputComponent()}
        {isEnabledChat && !isStreaming ? (
          <Box className={classes.chatInputContainer} style={{ width: '100%', height: 81 }}>
            <ButtonBase onClick={() => scrollToCurrentMess('smooth')} className={`${classes.btn_scroll_mess}`}>
              {i18n.t('common:streaming_setting_screen.scroll_to_new_mess')}
            </ButtonBase>
          </Box>
        ) : (
          <></>
        )}
      </>
    )

    const displayChatContent = () => {
      return videoType !== STATUS_VIDEO.SCHEDULE && (isVideoFreeToWatch || userHasViewingTicket)
    }

    const chatBoxPaddingBottom = () => {
      if (!isEnabledChat || !isStreaming) {
        return '0px'
      }
      return errorMess ? '133px' : '110.5px'
    }

    // const chatHeight = (() => {
    //   // 35 is chat header,
    //   let newChatHeight = (chatWidth * 250) / 153 - 35
    //   if (messagesDonate.filter((item) => !item.delete_flag).length !== 0) {
    //     // 56 is height of message donate
    //     newChatHeight = newChatHeight - (isDesktopDown1280 ? 34 : 56) - getMarginTopOfComponents('chatBoard')
    //   } else {
    //     // 16 is margin top of message donate when it is empty
    //     newChatHeight = newChatHeight - getMarginTopOfComponents('userIcon')
    //   }
    //   // height of chat when display chat content
    //   if (displayChatContent()) {
    //     // 116.5 is input chat when video is streaming
    //     newChatHeight = newChatHeight - (isDesktopDown1280 ? 77 : 116.5)
    //   }
    //   return Math.round((newChatHeight + Number.EPSILON) * 100) / 100
    // })()

    return (
      <Box
        className={classes.container}
        style={
          displayChatContent() && isMobile
            ? {
                paddingBottom: chatBoxPaddingBottom(),
              }
            : {}
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
