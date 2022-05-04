/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, ButtonBase, ClickAwayListener, Icon, IconButton, Typography, useMediaQuery, useTheme } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'
import i18n from '@locales/i18n'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import _, { debounce } from 'lodash'
import React, { forwardRef, memo, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import sanitizeHtml from 'sanitize-html'
import useStyles from './styles'
// import { useAppDispatch, useAppSelector } from '@store/hooks'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { UserProfile } from '@services/user.service'
import userProfileStore from '@store/userProfile'
import useDetailVideo from '../useDetailVideo'
// import { createMessage, deleteMessage } from "src/graphql/mutations";
const {
  getUsersByUuid,
  getMessagesByVideoId,
  getMessagesByVideoIdWithSort,
  getMessagesByVideoByPremium,
} = require(`src/graphql.${process.env.NEXT_PUBLIC_AWS_ENV}/queries`)
const { onCreateMessage, onUpdateMessage } = require(`src/graphql.${process.env.NEXT_PUBLIC_AWS_ENV}/subscriptions`)
const { createMessage, createUser, updateMessage, updateUser } = require(`src/graphql.${process.env.NEXT_PUBLIC_AWS_ENV}/mutations`)
// import ChatTextMessage from '@containers/VideoLiveStreamContainer/ChatContainer/ChatTextMessage'
// import PremiumChatDialog from '@containers/VideoLiveStreamContainer/ChatContainer/PremiumChatDialog'
// import * as Yup from 'yup'
// import { useFormik } from 'formik'
import ESAvatar from '@components/Avatar'
import DonateMessage from './DonateMessage'
// import ESInput from '@components/Input'
import {
  GIVER_RANK_TYPE,
  INTERVAL_AUTO_GET_MESS,
  LIMIT_FETCH_NEXT,
  LIMIT_MAX_MESS_PREV_REWIND,
  LIMIT_MESS,
  LIMIT_MIN_MESS_PREV_REWIND,
  RECEIVER_RANK_TYPE,
  SECOND_AUTO_GET_MESS_BEFORE,
  STATUS_SEND_MESS,
  SUB_TABS,
  VIDEO_TABS,
} from '@constants/common.constants'
import { RankingsItem, STATUS_VIDEO } from '@services/videoTop.services'
import moment from 'moment'
// import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'
import useGraphqlAPI from 'src/types/useGraphqlAPI'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const APIt: any = useGraphqlAPI()
// import { DELAY_SECONDS } from '@constants/common.constants'
// import InfiniteScroll from 'react-infinite-scroll-component'
// import { WindowScroller, List, AutoSizer } from 'react-virtualized'
// import { CellMeasurer } from 'react-virtualized'
// import InfiniteLoaderExample from './source/InfiniteLoader/InfiniteLoader.example'
// import ChatInputContainer from './ChatInputContainer'
import { CommonHelper } from '@utils/helpers/CommonHelper'
// import ChatTab from './Tabs/ChatTab'
import { Colors } from '@theme/colors'
import { useCheckDisplayChat } from '@utils/hooks/useCheckDisplayChat'
import { useRotateScreen } from '@utils/hooks/useRotateScreen'
import { useRect } from '@utils/useRect'
import { VideoContext } from '../VideoContext'
import { useVideoTabContext } from '../VideoContext/VideTabContext'
import ChatFooter from './components/ChatFooter'
import ChatLoader from './components/ChatLoader'
import ChatMessages from './components/ChatMessages'
import SubTabGroups from './components/SubTabGroups'
import TabsContainer from './components/TabsContainer'
import RankingTab from './Tabs/RankingTab'

export type ChatStyleProps = {
  isLandscape: boolean
}

export type ChatContainerProps = {
  onPressDonate?: (donatedPoint: number, purchaseComment: string, master_id?: string) => void
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
  isResizedScreen: boolean
  errorMsgDonatePoint?: string
  clearMessageDonatePoint: () => void
}

const DEBOUNCE_SECOND = 300

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
    receiverHeaderBgColor: Colors.white_opacity[20],
    headerBgColor: '#A3C6FF',
    backgroundColor: '#476AFF',
    borderColor: '#476AFF',
    flex: 65.5,
    maxLengthInput: 50,
    displayTime: 0,
  },
  p_300: {
    id: 'p_300',
    value: 300,
    receiverHeaderBgColor: Colors.white_opacity[15],
    headerBgColor: '#7F97FF',
    backgroundColor: '#478EFF',
    borderColor: '#478EFF',
    flex: 86,
    maxLengthInput: 50,
    displayTime: 0,
  },
  p_500: {
    id: 'p_500',
    value: 500,
    receiverHeaderBgColor: Colors.white_opacity[20],
    headerBgColor: '#8BEECF',
    backgroundColor: '#17DD9F',
    borderColor: '#17DD9F',
    flex: 94,
    maxLengthInput: 150,
    displayTime: 120,
  },
  p_1000: {
    id: 'p_1000',
    value: 1000,
    receiverHeaderBgColor: Colors.white_opacity[20],
    headerBgColor: '#E5EC91',
    backgroundColor: '#CBD923',
    borderColor: '#CBD923',
    flex: 94,
    maxLengthInput: 200,
    displayTime: 300,
  },
  p_3000: {
    id: 'p_3000',
    value: 3000,
    receiverHeaderBgColor: Colors.white_opacity[15],
    headerBgColor: '#FF9661',
    backgroundColor: '#FF6A1C',
    borderColor: '#FF6A1C',
    flex: 98,
    maxLengthInput: 225,
    displayTime: 600,
  },
  // p_2500: {
  //   id: 'p_2500',
  //   value: 5000,
  //   backgroundColor: '#F86B80',
  //   borderColor: '#F86B80',
  //   width: 90,
  // },
  p_5000: {
    id: 'p_5000',
    value: 5000,
    receiverHeaderBgColor: Colors.white_opacity[30],
    headerBgColor: '#FDD3D9',
    backgroundColor: '#F86B80',
    borderColor: '#F86B80',
    flex: 112,
    maxLengthInput: 250,
    displayTime: 1800,
  },
  p_10000: {
    id: 'p_10000',
    value: 10000,
    receiverHeaderBgColor: Colors.white_opacity[25],
    headerBgColor: '#F64D67',
    backgroundColor: '#F20025',
    borderColor: '#F20025',
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
// const contentRef = React.createRef<HTMLDivElement>()

const ChatContainer: React.FC<ChatContainerProps> = forwardRef(
  (
    {
      onPressDonate,
      userHasViewingTicket,
      key_video_id,
      handleKeyboardVisibleState,
      donateConfirmModalIsShown,
      // myPoint,
      openPurchasePointModal,
      videoType,
      freeToWatch,
      errorMsgDonatePoint,
      clearMessageDonatePoint,
    },
    ref
  ) => {
    const dispatch = useAppDispatch()
    const { isLandscape } = useRotateScreen()
    const { videoRefInfo, giverRankInfo, setGiverRankInfo, receiverRankInfo, setReceiverRankInfo, isMobile: isMobileParent } = useContext(
      VideoContext
    )
    const chatMobileContainerRef = useRef<HTMLDivElement>(null)
    const videoPlayedSecond = useRef(0)
    // console.log('🚀 ~ videoPlayedSecond---000', videoPlayedSecond?.current)
    const videoStreamingSecond = useRef(0)

    // const [tab, setTab] = useState(VIDEO_TABS.CHAT)
    // const [messageTab, setMessageTab] = useState(SUB_TABS.MESS.ALL
    // console.log('🚀 ~ isResetMess', isResetMess)
    const [isBottom, setBottom] = useState<boolean>(true)
    // console.log('🚀 ~ isBottom--000', isBottom)
    const [scrolling, setScrolling] = useState<number>(0)
    const messagesEndRef = useRef<any>(null)
    // const [purchaseDialogVisible, setPurchaseDialogVisible] = useState<boolean>(false)
    const [messActiveUser, setMessActiveUser] = useState<any>(null)
    const [successGetListMess, setSuccessGetListMess] = useState(false)
    const [successGetListDonateMess, setSuccessGetListDonateMess] = useState(false)
    const [successGetListMessTip, setSuccessGetListMessTip] = useState(false)
    const [successFlagGetAddUSer, setSuccessFlagGetAddUSer] = useState(false)
    const [messagesDonate, setMessagesDonate] = useState([])
    // const [isSwitchingTab, setIsSwitchingTab] = useState(false)
    // console.log('🚀 ~ messagesDonate', messagesDonate)
    // const [displaySeeMore, setDisplaySeeMore] = useState(false)
    // console.log('🚀 ~ displaySeeMore', displaySeeMore)
    const [displayDialogMess, setDisplayDialogMess] = useState(false)
    const [firstRender, setFirstRender] = useState(false)
    const [isFirstVisitPage, setIsFirstVisitPage] = useState(true)
    // const [prevRewindMess, setPrevRewindMess] = useState({})
    // console.log('🚀 ~ prevRewindMess', prevRewindMess)
    // const [scrollBehavior, setScrollBehavior] = useState('smooth')
    const isVideoFreeToWatch = freeToWatch === 0 ? true : false
    // const [nextToken, setNextToken] = useState(null)
    // const [prevToken, setPrevToken] = useState(null)
    // console.log('🚀 ~ prevToken', prevToken)
    const [isGettingMess, setIsGettingMess] = useState(false)
    const [isGettingTipMess, setIsGettingTipMess] = useState(false)
    // console.log('🚀 ~ isGettingMess', isGettingMess)
    const [isGettingPrevRewindMess, setIsGettingPrevRewindMess] = useState(false)
    const [isGettingRewindMess, setIsGettingRewindMess] = useState(false)
    // const [cacheMess, setCacheMess] = useState([])
    // save mess tip to cache, when switch tab => get mess in this cache and show
    // const [cacheMessTip, setCacheMessTip] = useState([])
    // console.log('🚀 ~ cacheMessTip', cacheMessTip)
    // console.log('🚀 ~ cacheMess', cacheMess)
    // const [rewindMess, setRewindMess] = useState<any>({})
    // console.log('🚀 ~ rewindMess---000', rewindMess)
    // const [autoGetMess, setAutoGetMess] = useState<any>([])
    // const [archiveInitMess, setArchiveInitMess] = useState([])
    // const [cacheDonateMess, setCacheDonateMess] = useState([])
    // const [cacheDonateMessTip, setCacheDonateMessTip] = useState([])
    // console.log('🚀 ~ cacheDonateMess', cacheDonateMess)
    // console.log('🚀 ~ cacheMess', cacheMess)
    // const [prevTime, setPrevTime] = useState(0)
    // console.log('🚀 ~ prevTime', prevTime)
    // const [nextTime, setNextTime] = useState(0)
    // console.log('🚀 ~ nextTime', nextTime)
    const [isTokenBroken, setIsTokenBroken] = useState(false)
    const [isTokenTipBroken, setIsTokenTipBroken] = useState(false)
    // console.log('🚀 ~ isTokenTipBroken', isTokenTipBroken)
    // console.log('🚀 ~ isTokenBroken', isTokenBroken)
    // const [videoTimeIsRewinding, setVideoTimeIsRewinding] = useState(0)

    const isSwitchingTabRef = useRef(false)
    const isSwitchingSubTabRef = useRef(false)
    const { activeSubTab, activeTab, setActiveTab, setActiveSubTab } = useVideoTabContext()

    const { selectors } = userProfileStore

    const userProfile = useAppSelector<UserProfile>(selectors.getUserProfile)

    // const [initTipMess, setInitTipMess] = useState([])
    const [stateMessages, setStateMessages] = useState([])
    // console.log('🚀 ~ stateMessages---000', stateMessages)

    const cacheMessRef = useRef<any>([])
    const prevRewindMessRef = useRef<any>({})
    const rewindMessRef = useRef<any>({})
    const cacheMessTipRef = useRef<any>([])
    const autoGetMessRef = useRef<any>([])
    const archiveInitMessRef = useRef<any>([])
    const cacheDonateMessRef = useRef<any>([])
    const initTipMessRef = useRef<any>([])
    const scrollBehaviorRef = useRef<string>('smooth')
    const videoTimeIsRewindingRef = useRef<number>(0)
    const prevTimeRef = useRef<number>(0)
    const nextTimeRef = useRef<number>(0)
    const prevTokenRef = useRef<any>(null)
    const switchTabRef = useRef<boolean>(false)
    const seekingRef = useRef<boolean>(false)

    // const isFirstRender = useRef<boolean>(false);
    // const isFirstRender = useRef<boolean>(false);

    const [chatUser, setChatUser] = useState<any>({})
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down(769)) || isLandscape
    // console.log('🚀 ~ isMobile', isMobile)
    const { checkVideoNgWord } = useCheckNgWord()
    // const [savedMess, setSavedMess] = useState([])
    // const [savedDonateMess, setSavedDonateMess] = useState([])
    const [isChatInBottom, setIsChatInBottom] = useState(false)
    // const [isSeeking, setIsSeeking] = useState(false)

    // const contentRect = useRect(contentRef)

    // const { width: pageWidth } = useWindowDimensions(0)
    // const isDesktopDown1280 = pageWidth > 768 && pageWidth <= 1280
    const {
      userResult,
      streamingSecond,
      liveStreamInfo,
      resetChatState,
      detailVideoResult,
      rankingListMeta,
      fetchDonateRanking,
      isFullScreen,
    } = useDetailVideo()
    const { isEnabledGift, isEnabledMessFilter, isDisplayedRankingTab } = useCheckDisplayChat()

    const isTipTab = activeSubTab === SUB_TABS.MESS.TIP

    // const { streamingSecond, playedSecond, isViewingStream, liveStreamInfo } = useDetailVideo()
    // const userResult = {streamer: 1}
    // const dispatch = useAppDispatch()

    const isEnabledChat =
      videoType === STATUS_VIDEO.LIVE_STREAM &&
      !liveStreamInfo.is_end_live &&
      (+streamingSecond >= 0 || streamingSecond === Infinity) &&
      successGetListMess &&
      successGetListDonateMess &&
      successGetListMessTip
    // const isEnabledChat = true
    // console.log('🚀 ~ isEnabledChat', isEnabledChat)
    // console.log('🚀 ~ successGetListMessTip', successGetListMessTip)

    const { height: chatInputHeight } = useRect(chatMobileContainerRef)
    const classes = useStyles({ isLandscape })
    console.log({ chatInputHeight })

    console.log('------------------- Chat component rerender ----------------------')

    const resetStates = () => {
      setStateMessages([])
    }

    useImperativeHandle(ref, () => {
      return {
        resetStates: resetStates,
      }
    })
    // useEffect(() => {
    //   cache.clearAll()
    // }, [contentRect?.width])

    const debouncedHandleLoadMore = useCallback(
      debounce(() => {
        console.log('🚀 ~ handleLoadMore ~ handleLoadMore-4444')
        if (isTipTab) {
          console.log('🚀 ~ handleLoadMore ~ handleLoadMore-333')
          setIsGettingMess(true)
          setTimeout(() => {
            refFetchPrevMessTip.current()
          }, DEBOUNCE_SECOND)
        } else {
          fetchPrevMess && fetchPrevMess()
        }
      }, 300),
      [isTokenBroken, isTipTab, isTokenTipBroken]
    )

    const handleLoadMore = () => {
      console.log('🚀 ~ handleLoadMore ~ handleLoadMore-111')
      console.log('🚀 ~ handleLoadMore ~ isTokenTipBroken', isTokenTipBroken)

      // only scroll to load more mess if rewinded or is live stream and has prevToken (has mess in prev page)
      if (
        !isGettingMess &&
        !isGettingPrevRewindMess &&
        !isGettingRewindMess &&
        // only fetch prev if is tib tab and can get prev tip
        ((isTipTab && isTokenTipBroken) || (!isTipTab && prevTokenRef.current && (isTokenBroken || isStreaming)))
      ) {
        console.log('🚀 ~ handleLoadMore ~ handleLoadMore-222')
        debouncedHandleLoadMore()
      }
    }

    useEffect(() => {
      if (scrolling > 1) {
        handleLoadMore()
      }
    }, [scrolling])

    const refTransformMessTip = useRef(null)
    const handleTransformMessTip = () => {
      const transformMess = [...initTipMessRef.current]
      const transformMessAsc = sortMessages(transformMess)
      // save mess tip forever except switch tab
      // setCacheMessTip([...transformMessAsc])
      cacheMessTipRef.current = [...transformMessAsc]

      // setSuccessGetListMess(true)

      const transformDonateMessAsc = transformMessAsc.filter((item) => item.is_premium && +item.point > 300)
      cacheDonateMessRef.current = [...transformDonateMessAsc]
      // setCacheDonateMess([...transformDonateMessAsc])

      // const transformDonateMessAsc = transformDonateMess
      // const transformDonateMessAsc = sortMessages(transformDonateMess)
      // comment if no get in initial
      // setMessagesDonate([...transformDonateMessAsc])
      // save mess for use in local
      // save mess tip forever except switch tab
      // setCacheDonateMessTip([...transformDonateMessAsc])
      // TODO (remove this line)
      // setMessagesDonate([...transformDonateMessAsc])
      // setPrevToken(messagesInfo.nextToken)
      // console.log('🚀 ~ handleFetchPrevMess ~ messagesInfo.nextToken--111', messagesInfo.nextToken)

      // setSuccessGetListDonateMess(true)
      setSuccessGetListMessTip(true)
      // fetch mess by rewinded time when switch tab
      if (activeSubTab === SUB_TABS.MESS.TIP) {
        // console.log('🚀 ~ handleTransformMessTip ~ activeSubTab', activeSubTab)
        fetchMessTipWhenRewind(videoPlayedSecond.current)
      }
    }
    refTransformMessTip.current = handleTransformMessTip

    const fetchMessTipInitial = (nextToken = null) => {
      try {
        setIsGettingTipMess(true)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let listQV: APIt.GetMessagesByVideoByPremiumQueryVariables = {
          video_id: key_video_id,
          is_premium_number: { eq: 1 },
          limit: 2000,
          nextToken,
        }
        // console.log('🚀 ~ fetchPrevMess ~ listQV---000', listQV)
        // console.log('🚀 ~ abc ~ 222')
        API.graphql(graphqlOperation(getMessagesByVideoByPremium, listQV)).then((messagesResults) => {
          const messagesInfo = messagesResults.data.getMessagesByVideoByPremium
          if (messagesInfo.nextToken) {
            initTipMessRef.current = [...initTipMessRef.current, ...messagesInfo.items]
            // setInitTipMess((messages) => [...messages, ...messagesInfo.items])
            fetchMessTipInitial(messagesInfo.nextToken)
          } else {
            initTipMessRef.current = [...initTipMessRef.current, ...messagesInfo.items]
            // setInitTipMess((messages) => [...messages, ...messagesInfo.items])
            refTransformMessTip.current()
          }

          setIsGettingTipMess(false)
        })
      } catch (error) {
        setIsGettingTipMess(false)
        console.error(error)
      }
    }

    const refFetchPrevMessWhenRewind = useRef(null)
    const handleFetchPrevMessWhenRewind = (messagesInfo, video_time) => {
      if (isSwitchingTabRef.current) {
        return
      }
      const transformMessAsc = sortMessages(messagesInfo.items)
      console.log('🚀 ~ handleFetchPrevMessWhenRewind ~ transformMessAsc', transformMessAsc)
      prevRewindMessRef.current = { [video_time]: [...transformMessAsc] }
      // setPrevRewindMess({ [video_time]: [...transformMessAsc] })

      // save token to call api in next time
      // setPrevToken(messagesInfo.nextToken)
      prevTokenRef.current = messagesInfo.nextToken
      // console.log('🚀 ~ handleFetchPrevMessWhenRewind ~ messagesInfo', messagesInfo)
      // prevent scroll when has no messages
      if (!messagesInfo.nextToken) setIsTokenBroken(false)

      if (!isSwitchingTabRef.current) {
        console.log('🚀 ~ handleFetchPrevMessWhenRewind ~ video_time', video_time)
        fetchNextMess(GET_MESS_TYPE.FETCH_NEXT, video_time)
      }
    }
    refFetchPrevMessWhenRewind.current = handleFetchPrevMessWhenRewind

    // fetch messages prev when rewind to video time
    const fetchPrevMessWhenRewind = (video_time, sortOrder = APIt.ModelSortDirection.DESC) => {
      console.log('🚀 ~ fetchPrevMessWhenRewind ~ video_time', video_time)
      if (isSwitchingTabRef.current || isSwitchingSubTabRef.current) {
        return
      }
      try {
        setIsGettingPrevRewindMess(true)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let listQV: APIt.GetMessagesByVideoIdWithSortQueryVariables = {
          video_id: key_video_id,
          video_time: { le: video_time - 1 },
          sortDirection: sortOrder,
          // limit: LIMIT_MESS_REWIND,
          limit: CommonHelper.randomIntegerInRange(LIMIT_MIN_MESS_PREV_REWIND, LIMIT_MAX_MESS_PREV_REWIND),
          nextToken: null,
        }
        API.graphql(graphqlOperation(getMessagesByVideoIdWithSort, listQV)).then((messagesResults) => {
          if (isSwitchingTabRef.current || isSwitchingSubTabRef.current) {
            return
          }
          const messagesInfo = messagesResults.data.getMessagesByVideoIdWithSort
          refFetchPrevMessWhenRewind.current(messagesInfo, video_time)
          setIsGettingPrevRewindMess(false)
        })
      } catch (error) {
        setIsGettingPrevRewindMess(false)
        console.error(error)
      }
    }

    // const renderMessWhenTipSwitchTab = () => {
    //   const newMess = cacheMess.filter((item) => +item.video_time <= +videoPlayedSecond.current)
    //   console.log('🚀 ~ renderMessWhenTipSwitchTab ~ videoPlayedSecond.current', videoPlayedSecond.current)
    //   console.log('🚀 ~ renderMessWhenTipSwitchTab ~ cacheMess', cacheMess)
    //   console.log('🚀 ~ renderMessWhenTipSwitchTab ~ newMess', newMess)
    //   const isMessageInBottom = checkMessIsInBottom()
    //   // render new messages with savedMess
    //   setStateMessages([...newMess])

    //   if (isMessageInBottom) {
    //     setScrollBehavior('smooth')
    //     setIsChatInBottom(true)
    //   }

    //   const newMessagesDonate = cacheDonateMess.filter((item) => +item.display_avatar_time > +realStreamingSecond)
    //   setMessagesDonate(newMessagesDonate)
    //   setIsSwitchingTab(false)
    // }

    const refTransformListMess = useRef(null)
    const handleTransformListMess = (messagesInfo) => {
      const transformMess = [...messagesInfo.items]
      const transformMessAsc = sortMessages(transformMess)
      console.log('🚀 ~ handleTransformListMess ~ transformMessAsc', transformMessAsc)
      // console.log('🚀 ~ handleTransformListMess ~ setIsSwitchingTab', isSwitchingTab)

      // TODO
      if (streamingSecond === Infinity && videoType === STATUS_VIDEO.LIVE_STREAM && !switchTabRef.current) {
        console.log('🚀 ~ handleTransformListMess ~ streamingSecond', streamingSecond)
        setStateMessages([...transformMessAsc])
      }
      // save mess for use in local
      // setCacheMess([...transformMessAsc])
      cacheMessRef.current = [...transformMessAsc]
      setSuccessGetListMess(true)

      // const transformDonateMessAsc = transformMessAsc.filter(
      //   (item) => +item.display_avatar_time >= videoPlayedSecond.current && item.is_premium && +item.point > 300
      // )
      // const transformDonateMessAsc = transformDonateMess
      // const transformDonateMessAsc = sortMessages(transformDonateMess)
      // comment if no get in initial
      // setMessagesDonate([...transformDonateMessAsc])
      // save mess for use in local
      // comment due to split logic get tip mess to display icon separate with all mess
      // setCacheDonateMess([...transformDonateMessAsc])
      // TODO (remove this line)
      // setMessagesDonate([...transformDonateMessAsc])
      // setPrevToken(messagesInfo.nextToken)
      prevTokenRef.current = messagesInfo.nextToken
      // console.log('🚀 ~ handleFetchPrevMess ~ messagesInfo.nextToken--111', messagesInfo.nextToken)

      setSuccessGetListDonateMess(true)
      if (switchTabRef.current) {
        setBottom(true)
        setIsGettingMess(false)
        // renderMessWhenTipSwitchTab()
        console.log('🚀 ~ renderMessWhenTipSwitchTab ~ videoPlayedSecond.current', videoPlayedSecond.current)
        // const isMessageInBottom = checkMessIsInBottom()
        // render new messages with savedMess
        setStateMessages([...transformMessAsc])

        // if (isMessageInBottom) {
        //   setScrollBehavior('smooth')
        //   setIsChatInBottom(true)
        // }

        // setMessagesDonate([...transformDonateMessAsc])
        // setIsSwitchingTab(false)
        switchTabRef.current = false
      }
      setIsGettingMess(false)
    }
    refTransformListMess.current = handleTransformListMess

    const refFetchMessInitialArchive = useRef(null)
    const handleFetchMessInitialArchive = (video_time) => {
      // console.log('🚀 ~ handleFetchMessInitialArchive ~ video_time', video_time)
      // only get mess when no rewind
      if (!isTokenBroken) {
        const transformMess = [...archiveInitMessRef.current]
        // const transformMessAsc = transformMess
        const transformMessAsc = sortMessages(transformMess)

        // save mess for use in local
        // setCacheMess([...transformMessAsc])
        cacheMessRef.current = [...transformMessAsc]

        // const transformDonateMessAsc = transformMessAsc.filter(
        //   (item) => +item.display_avatar_time >= videoPlayedSecond.current && item.is_premium && +item.point > 300
        // )
        // comment if no get in initial
        // save mess for use in local
        // setCacheDonateMess([...transformDonateMessAsc])
        // set next time for auto get mess
        nextTimeRef.current = video_time + INTERVAL_AUTO_GET_MESS
        // setNextTime(video_time + INTERVAL_AUTO_GET_MESS)
      }
      // setArchiveInitMess([])
      archiveInitMessRef.current = []
      setSuccessGetListMess(true)
      setSuccessGetListDonateMess(true)
    }
    refFetchMessInitialArchive.current = handleFetchMessInitialArchive
    // console.log('🚀 ~ setTimeout ~ cache----222', cache)
    // console.log('🚀 ~ setTimeout ~ cache----3333', cache.columnWidth)

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
        // cache.clearAll()
      }, 10)
      // cache.clearAll()
      cacheMessRef.current = [...transformMessAsc, ...cacheMessRef.current]
      // setCacheMess((messages) => [...transformMessAsc, ...messages])

      // const transformDonateMessAsc = transformMessAsc.filter(
      //   (item) => +item.display_avatar_time >= videoPlayedSecond.current && item.is_premium && +item.point > 300
      // )
      // const transformDonateMessAsc = transformDonateMess
      // const transformDonateMessAsc = sortMessages(transformDonateMess)
      // setMessagesDonate((messages) => [...transformDonateMessAsc, ...messages])
      // setCacheDonateMess((messages) => [...transformDonateMessAsc, ...messages])

      // save token to call api in next time
      // setPrevToken(messagesInfo.nextToken)
      prevTokenRef.current = messagesInfo.nextToken
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
        if (isTokenBroken) {
          let nextToken = prevTokenRef.current
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          let listQV: APIt.GetMessagesByVideoIdWithSortQueryVariables = {
            video_id: key_video_id,
            video_time: { le: prevTimeRef.current },
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
          let nextToken = prevTokenRef.current
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
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
        const transformMessAsc = sortMessages([...autoGetMessRef.current])
        // setStateMessages(transformMessAsc.filter((v) => +v.video_time <= +videoPlayedSecond.current))
        // setCacheMess((messages) => [...messages, ...transformMessAsc])
        cacheMessRef.current = [...cacheMessRef.current, ...transformMessAsc]
        // const transformDonateMessAsc = transformMessAsc.filter(
        //   (item) => +item.display_avatar_time >= videoPlayedSecond.current && item.is_premium && +item.point > 300
        // )
        // const transformDonateMessAsc = transformDonateMess
        // const transformDonateMessAsc = sortMessages(transformDonateMess)
        // comment if no get in initial
        // save mess for use in local
        // setCacheDonateMess((messages) => [...messages, ...transformDonateMessAsc])
        // setNextTime(video_time + INTERVAL_AUTO_GET_MESS)
        nextTimeRef.current = video_time + INTERVAL_AUTO_GET_MESS
        autoGetMessRef.current = []
        // setAutoGetMess([])
      }
    }
    refFetchMessAuto.current = handleFetchMessAuto

    const refFetchRewindMess = useRef(null)
    const handleFetchRewindMess = (video_time, nextTime) => {
      // console.log('🚀 ~ handleFetchRewindMess ~ video_time', video_time)
      // console.log('🚀 ~ handleFetchRewindMess ~ videoTimeIsRewinding', videoTimeIsRewinding)
      // only get messages with last rewind
      if (videoTimeIsRewindingRef.current === video_time) {
        // console.log('🚀 ~ handleFetchRewindMess ~ nextTime--ok', nextTime)
        const oldPrevRewindMess = prevRewindMessRef.current?.[video_time] ? [...prevRewindMessRef.current[video_time]] : []
        const newRewindMess = rewindMessRef.current?.[video_time]
          ? [...oldPrevRewindMess, ...rewindMessRef.current[video_time]]
          : [...oldPrevRewindMess]
        // console.log('🚀 ~ handleFetchRewindMess ~ newRewindMess', newRewindMess)
        const transformMessAsc = sortMessages([...newRewindMess])
        console.log('🚀 ~ handleFetchRewindMess ~ transformMessAsc', transformMessAsc)

        setIsGettingMess(false)
        console.log('🚀 ~ handleFetchRewindMess ~ videoPlayedSecond.current', videoPlayedSecond.current)
        setStateMessages(transformMessAsc.filter((v) => +v.video_time <= +videoPlayedSecond.current))
        // setCacheMess(transformMessAsc)
        cacheMessRef.current = transformMessAsc

        // const transformDonateMessAsc = transformMessAsc.filter(
        //   (item) => +item.display_avatar_time >= videoPlayedSecond.current && item.is_premium && +item.point > 300
        // )
        // only get mess has time < played second
        // const newTransformMessAsc = transformDonateMessAsc.filter((v) => +v.video_time <= +videoPlayedSecond.current)
        // setMessagesDonate([...newTransformMessAsc])
        // save mess for use in local
        // setCacheDonateMess([...transformDonateMessAsc])

        // setPrevRewindMess({})
        prevRewindMessRef.current = {}
        rewindMessRef.current = {}
        // setRewindMess({})

        setIsGettingRewindMess(false)
        // set prev time to scroll to load more
        prevTimeRef.current = video_time - 1
        nextTimeRef.current = nextTime + 1
        // setPrevTime(video_time - 1)
        // set next time to auto get mess repeat
        // setNextTime(nextTime + 1)
        // set is token broken to allow scroll to load more
        setIsTokenBroken(true)
        // reset prev token to get mess is not error
        // setPrevToken(null)

        // set get list mess when fetch prev and rewind when remount chat container
        setSuccessGetListMess(true)
        setSuccessGetListDonateMess(true)
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
      // console.log('🚀 ~ video_time--00', video_time)

      if (isSwitchingTabRef.current) {
        return
      }
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
          videoTimeIsRewindingRef.current = video_time
          // setVideoTimeIsRewinding(video_time)
        }

        const nextTime = +video_time + INTERVAL_AUTO_GET_MESS - 1
        // console.log('🚀 ~ fetchPrevMess ~ video_time', video_time)
        // console.log('🚀 ~ nextTime---999', nextTime)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
        if (isSwitchingTabRef.current) {
          return
        }
        API.graphql(graphqlOperation(getMessagesByVideoIdWithSort, listQV)).then((messagesResults) => {
          if (isSwitchingTabRef.current) {
            return
          }
          const messagesInfo = messagesResults.data.getMessagesByVideoIdWithSort
          // && !_.isEmpty(messagesInfo.items)
          if (getType === GET_MESS_TYPE.FETCH_NEXT) {
            const newMess = [...messagesInfo.items]
            if (messagesInfo.nextToken) {
              // console.log('🚀 ~ API.graphql ~ FETCH_NEXT---999', messagesInfo.items)
              // save info of messages with video time
              // setRewindMess((items) => {
              //   return { ...items, [video_time]: items?.[video_time] ? [...items[video_time], ...newMess] : [...newMess] }
              // })
              rewindMessRef.current = {
                ...rewindMessRef.current,
                [video_time]: rewindMessRef.current?.[video_time] ? [...rewindMessRef.current[video_time], ...newMess] : [...newMess],
              }
              // setRewindMess((items) => {...items, video_time: [......messagesInfo.items]})
              // setRewindMess((messages) => [...messages, ...messagesInfo.items])
              fetchNextMess(getType, video_time, sortOrder, messagesInfo.nextToken)
            } else {
              // console.log('🚀 ~ API.graphql ~ FETCH_NEXT---000', messagesInfo.items)
              // save info of messages with video time
              // setRewindMess((items) => {
              //   return { ...items, [video_time]: items?.[video_time] ? [...items[video_time], ...newMess] : [...newMess] }
              // })
              rewindMessRef.current = {
                ...rewindMessRef.current,
                [video_time]: rewindMessRef.current?.[video_time] ? [...rewindMessRef.current[video_time], ...newMess] : [...newMess],
              }
              refFetchRewindMess.current(video_time, nextTime)
              setIsGettingMess(false)
            }
          } else if (getType === GET_MESS_TYPE.AUTO) {
            if (messagesInfo.nextToken) {
              // setAutoGetMess((messages) => [...messages, ...messagesInfo.items])
              autoGetMessRef.current = [...autoGetMessRef.current, ...messagesInfo.items]
              fetchNextMess(getType, video_time, sortOrder, messagesInfo.nextToken)
            } else {
              // setAutoGetMess((messages) => [...messages, ...messagesInfo.items])
              autoGetMessRef.current = [...autoGetMessRef.current, ...messagesInfo.items]
              refFetchMessAuto.current(video_time)
            }
          } else if (getType === GET_MESS_TYPE.FETCH_ARCHIVE_INITIAL) {
            // console.log('🚀 ~ API.graphql ~ messagesInfo.nextToken', messagesInfo.nextToken)
            if (messagesInfo.nextToken) {
              archiveInitMessRef.current = [...archiveInitMessRef.current, ...messagesInfo.items]
              // setArchiveInitMess((messages) => [...messages, ...messagesInfo.items])
              fetchNextMess(getType, video_time, sortOrder, messagesInfo.nextToken)
            } else {
              archiveInitMessRef.current = [...archiveInitMessRef.current, ...messagesInfo.items]
              // setArchiveInitMess((messages) => [...messages, ...messagesInfo.items])
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
    // console.log('🚀 ~ isStreaming ~ videoPlayedSecond.current', videoPlayedSecond.current)
    // console.log('🚀 ~ isStreaming ~ streamingSecond', streamingSecond)
    // const isStreaming = (() => {
    //   // console.log('🚀 ~ isStreaming ~ videoType', videoType, videoPlayedSecond.current, streamingSecond)
    //   // console.log('🚀 ~ isStreaming ~ videoPlayedSecond.current >= streamingSecond', videoPlayedSecond.current >= streamingSecond)
    //   // return true
    //   if (videoType === STATUS_VIDEO.LIVE_STREAM) {
    //     return true
    //     // if (streamingSecond === Infinity) {
    //     //   return true
    //     // }
    //     // if (videoPlayedSecond.current >= streamingSecond) {
    //     //   return true
    //     // }
    //   }
    //   return false
    // })()
    const isStreaming = videoType === STATUS_VIDEO.LIVE_STREAM
    // const isStreaming = true

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
          handleLoadMore()
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
    // if (messContainer) {
    //   messContainer.onscroll = function () {
    //     console.log('🚀 ~ event-111', event)
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
        compareSecond = videoPlayedSecond.current
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
        const created_at = createdMessage?.createdAt ? moment(createdMessage?.createdAt).utc().format('YYYY-MM-DD HH:mm:ss') : null
        if (createdMessage?.is_premium) {
          const uuid = createdMessage?.uuid
          const total = createdMessage?.point
          const newDataGiver = CommonHelper.getRankInfo(
            [...giverRankInfo],
            [{ uuid, total, user_avatar: createdMessage?.parent?.avatar, user_nickname: createdMessage?.parent?.user_name, created_at }],
            GIVER_RANK_TYPE
          )
          setGiverRankInfo(newDataGiver)
          let newReceiver: RankingsItem = { total, created_at }
          // donate for user gift
          if (createdMessage?.giftMasterId) {
            newReceiver = {
              ...newReceiver,
              master_uuid: createdMessage?.giftMasterId,
              master_name: createdMessage?.receiver?.name,
              master_avatar: createdMessage?.receiver?.image,
            }
          } else {
            // donate for streamer
            newReceiver = {
              ...newReceiver,
              master_uuid: null,
              user_nickname: liveStreamInfo?.streamer?.user_nickname,
              user_avatar: liveStreamInfo?.streamer?.user_avatar,
            }
          }
          const newDataReceiver = CommonHelper.getRankInfo([...receiverRankInfo], [{ ...newReceiver }], RECEIVER_RANK_TYPE)
          setReceiverRankInfo(newDataReceiver)
        }

        const foundIndex = findMessUpdated(cacheMessRef.current, createdMessage, 'local_id')
        // only add new message if no found message in local
        if (foundIndex === -1) {
          // if (videoPlayedSecond.current >= streamingSecond || liveStreamInfo.is_pausing_live) {
          if (isStreaming) {
            // render new messages with savedMess
            const isMessageInBottom = checkMessIsInBottom()
            setStateMessages([...cacheMessRef.current, createdMessage])
            if (isMessageInBottom) {
              scrollToCurrentMess()
            }

            // render new users donate
            if (isPremiumChat(createdMessage, false)) {
              let newMessDonate = [...cacheDonateMessRef.current]
              // newMessDonate = newMessDonate.filter((item) => +item.display_avatar_time > +streamingSecond)
              newMessDonate = filterMessDonateLocal(newMessDonate)
              // newMessDonate.filter((item) => +item.display_avatar_time > +videoPlayedSecond.current)
              // render user donate icon by time of local
              setMessagesDonate([...newMessDonate, createdMessage])
            }
          }
          // save mess for local
          // setCacheMess((messages) => [...messages, createdMessage])
          cacheMessRef.current = [...cacheMessRef.current, createdMessage]
          // save donated messages for local (not check display time)
          if (isPremiumChat(createdMessage, false)) {
            cacheDonateMessRef.current = [...cacheDonateMessRef.current, createdMessage]
            // setCacheDonateMess((messages) => [...messages, createdMessage])
          }
          // save mess tip to cache
          if (createdMessage?.is_premium === true) {
            // setCacheMessTip((messages) => [...messages, createdMessage])
            cacheMessTipRef.current = [...cacheMessTipRef.current, createMessage]
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
      if (successGetListMess && successGetListDonateMess && successGetListMessTip) {
        // fix bug streaming second is not true when access url first time
        const realStreamingSecond = videoPlayedSecond.current
        // check archive video => no use that case
        if (!firstRender && +realStreamingSecond > 0) {
          // console.log('🚀 ~ filterByStreaming ~ firstRender', firstRender)
          setFirstRender(true)
          const newMess = cacheMessRef.current.filter((item) => +item.video_time <= +realStreamingSecond)
          const isMessageInBottom = checkMessIsInBottom()
          // render new messages with savedMess
          setStateMessages([...newMess])

          if (isMessageInBottom) {
            scrollBehaviorRef.current = 'smooth'
            setIsChatInBottom(true)
          }

          const newMessagesDonate = filterMessDonateLocal(cacheDonateMessRef.current, realStreamingSecond)
          // const newMessagesDonate = cacheDonateMess.filter(
          //   (item) => +item.video_time <= +realStreamingSecond && +item.display_avatar_time > +realStreamingSecond
          // )
          setMessagesDonate(newMessagesDonate)
        } else {
          // only check displaying of user donate icon
          const newMessagesDonate = filterMessDonateLocal(cacheDonateMessRef.current, realStreamingSecond)
          // const newMessagesDonate = cacheDonateMess.filter(
          //   (item) => +item.video_time <= +realStreamingSecond && +item.display_avatar_time > +realStreamingSecond
          // )
          if (!_.isEqual(messagesDonate, newMessagesDonate)) {
            setMessagesDonate(newMessagesDonate)
          }
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
      let newMess = [...cacheMessRef.current]
      newMess = newMess.filter((item) => +item.video_time <= +new_played_second)
      console.log('🚀 ~ filterMessByPlayedSecond ~ newMess', newMess)
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

      let newMessDonate = [...cacheDonateMessRef.current]
      newMessDonate = filterMessDonateLocal(newMessDonate, new_played_second)
      // newMessDonate = newMessDonate.filter(
      //   (item) => +item.display_avatar_time > +new_played_second && +item.video_time <= +new_played_second
      // )
      // render user donate icon by time of local
      if (!_.isEqual(messagesDonate, newMessDonate)) {
        setMessagesDonate(newMessDonate)
      }
    }

    useEffect(() => {
      if (isChatInBottom) {
        scrollToCurrentMess(scrollBehaviorRef.current)
        setIsChatInBottom(false)
      }
    }, [isChatInBottom])

    const filterMessDonateLocal = (allMess, currentTime = 0) => {
      const time = currentTime ? currentTime : videoPlayedSecond.current
      return allMess.filter(
        (item) => +item.video_time <= +time && +item.display_avatar_time > +time && item.is_premium && +item.point > 300
      )
    }

    const refFetchPrevMessTip = useRef(null)
    const handleFetchPrevMessTip = () => {
      console.log('🚀 ~ fetchMessTipWhenRewind ~ 111', 111)
      if (stateMessages[0]) {
        let foundMessIndex = _.findIndex(cacheMessTipRef.current, (v: any) => v.local_id === stateMessages[0]?.local_id)
        let found = _.find(cacheMessTipRef.current, (v) => v.local_id === stateMessages[0]?.local_id)
        console.log('🚀 ~ fetchPrevMessTip ~ found', found)
        // const limit = 2
        const limit = LIMIT_MESS
        foundMessIndex = foundMessIndex !== -1 ? foundMessIndex : cacheMessTipRef.current.length
        console.log('🚀 ~ fetchPrevMessTip ~ foundMessIndex', foundMessIndex)
        let startSliceIndex = foundMessIndex - limit
        startSliceIndex = startSliceIndex > 0 ? startSliceIndex : 0
        console.log('🚀 ~ fetchPrevMessTip ~ startSliceIndex', startSliceIndex)

        let newMess: any = _.slice(cacheMessTipRef.current, startSliceIndex, foundMessIndex)
        console.log('🚀 ~ fetchMessTipWhenRewind ~ newMess', newMess)
        const filterMess = [...newMess, ...stateMessages]
        console.log('🚀 ~ fetchMessTipWhenRewind ~ filterMess', filterMess)
        // const transformDonateMessAsc = transformMessAsc.filter(
        //   (item) => +item.display_avatar_time >= videoPlayedSecond.current && item.is_premium && +item.point > 300
        // )

        // setStateMessages(filterMess)
        setStateMessages((messages) => [...newMess, ...messages])
        setTimeout(() => {
          _scrollToBottom(newMess.length)
          if (isBottom) {
            setBottom(true)
          }
        }, 10)

        // setCacheMess([...newMess, ...cacheMess])
        cacheMessRef.current = [...newMess, ...cacheMessRef.current]

        // console.log('🚀 ~ fetchMessTipWhenRewind ~ cacheMessTip[0]', cacheMessTip[0])
        console.log('🚀 ~ fetchMessTipWhenRewind ~ newMess[0]', newMess[0])
        console.log('🚀 ~ fetchMessTipWhenRewind ~ _.first(newMess)', _.first(newMess))
        if ((_.first(newMess) && newMess[0]?.local_id === cacheMessTipRef.current[0]?.local_id) || !_.first(newMess)) {
          setIsTokenTipBroken(false)
        } else {
          // enable feature get prev tip mess
          setIsTokenTipBroken(true)
        }

        // const filterDonateMess = _.filter(
        //   filterMess,
        //   (v) => v.display_avatar_time >= videoPlayedSecond.current && v.is_premium && +v.point > 300
        // )
        // console.log('🚀 ~ fetchMessTipWhenRewind ~ filterDonateMess', filterDonateMess)
        // setMessagesDonate(filterDonateMess)
        // setCacheDonateMess([...newMess, ...cacheDonateMess])

        setIsGettingMess(false)
      }
    }
    refFetchPrevMessTip.current = handleFetchPrevMessTip

    const refFetchMessTipWhenRewind = useRef(null)
    const handleFetchMessTipWhenRewind = (second) => {
      console.log('🚀 ~ fetchMessTipWhenRewind ~ second', second)
      // find position of latest mess to get prev mess
      const foundMessIndex = _.findIndex(cacheMessTipRef.current, (v: any) => v.video_time > +second)
      console.log('🚀 ~ fetchMessTipWhenRewind ~ foundMess', foundMessIndex)
      let newMess = []
      // const limit = 2
      // when live stream get limit to 100 same as tab all mess
      // const limit = isStreaming ? LIMIT_MESS : LIMIT_MESS_REWIND
      const limit = isStreaming ? LIMIT_MESS : CommonHelper.randomIntegerInRange(LIMIT_MIN_MESS_PREV_REWIND, LIMIT_MAX_MESS_PREV_REWIND)
      console.log('🚀 ~ fetchMessTipWhenRewind ~ limit', limit)

      let startSliceIndex = 0
      // slice array from first ele due to all mess has video time larger than current time
      if (foundMessIndex === 0) {
        startSliceIndex = 0
      } else {
        // get start slice index to slice cacheMessTip
        // foundMessIndex is -1 (not found) => get length of cacheMessTip
        startSliceIndex = (foundMessIndex !== -1 ? foundMessIndex : cacheMessTipRef.current.length) - limit
        console.log('🚀 ~ fetchMessTipWhenRewind ~ cacheMessTip.length', cacheMessTipRef.current.length)
      }
      startSliceIndex = startSliceIndex > 0 ? startSliceIndex : 0
      console.log('🚀 ~ fetchMessTipWhenRewind ~ startSliceIndex', startSliceIndex)
      newMess = _.slice(cacheMessTipRef.current, startSliceIndex)
      console.log('🚀 ~ fetchMessTipWhenRewind ~ newMess', newMess)
      const filterMess = _.filter(newMess, (v) => v.video_time <= videoPlayedSecond.current)
      console.log('🚀 ~ fetchMessTipWhenRewind ~ filterMess', filterMess)
      // const transformDonateMessAsc = transformMessAsc.filter(
      //   (item) => +item.display_avatar_time >= videoPlayedSecond.current && item.is_premium && +item.point > 300
      // )

      // console.log('🚀 ~ fetchMessTipWhenRewind ~ cacheMessTip[0]', cacheMessTip[0])
      console.log('🚀 ~ fetchMessTipWhenRewind ~ newMess[0]', newMess[0])
      console.log('🚀 ~ fetchMessTipWhenRewind ~ _.first(newMess)', _.first(newMess))
      if (_.first(newMess) && newMess[0]?.local_id === cacheMessTipRef.current[0]?.local_id) {
        setIsTokenTipBroken(false)
      } else {
        // if first ele of newMess is not first ele of cacheMessTip => has mess before newMess => can get prev tip mess
        // enable feature get prev tip mess
        setIsTokenTipBroken(true)
      }

      // const filterDonateMess = _.filter(
      //   cacheDonateMess,
      //   (v) => v.display_avatar_time >= videoPlayedSecond.current && v.is_premium && +v.point > 300
      // )
      // const filterCacheDonateMess = _.filter(newMess, (v) => v.is_premium && +v.point > 300)
      // console.log('🚀 ~ fetchMessTipWhenRewind ~ filterDonateMess', filterDonateMess)

      setIsGettingMess(false)
      setStateMessages(filterMess)
      cacheMessRef.current = newMess
      // setCacheMess(newMess)
      // setMessagesDonate(filterDonateMess)
      // setCacheDonateMess(filterCacheDonateMess)
    }
    refFetchMessTipWhenRewind.current = handleFetchMessTipWhenRewind

    // fetch some prev mess and all next mess
    const fetchMessTipWhenRewind = (second) => {
      refFetchMessTipWhenRewind.current(second)
    }
    // console.log('🚀 ~ useEffect ~ isSeeking--222', isSeeking)

    useEffect(() => {
      if (liveStreamInfo.seek_count && !isStreaming) {
        videoPlayedSecond.current = liveStreamInfo.seeked_second
        setBottom(true)
        // console.log('🚀 ~ useEffect ~ setBottom--000', isBottom)
        resetMessagesWhenRewind()
        // filter and rerender list icon tip mess
        console.log('🚀 ~ useEffect ~ liveStreamInfo.seeked_second', liveStreamInfo.seeked_second)
        const newMessDonate = filterMessDonateLocal(cacheDonateMessRef.current, liveStreamInfo.seeked_second)
        console.log('🚀 ~ useEffect ~ newMessDonate', newMessDonate)
        setMessagesDonate(newMessDonate)

        // filterMessByPlayedSecond(liveStreamInfo.seeked_second, 'smooth')
        if (isTipTab) {
          console.log('🚀 ~ useEffect ~ isTipTab', isTipTab)
          setIsGettingMess(true)
          setTimeout(() => {
            fetchMessTipWhenRewind(liveStreamInfo.seeked_second)
          }, DEBOUNCE_SECOND)
        } else {
          console.log('🚀 ~ fetchPrevMessWhenRewind--111', 111)
          fetchPrevMessWhenRewind(liveStreamInfo.seeked_second)
        }
        // fetchNextMess(GET_MESS_TYPE.FETCH_NEXT, liveStreamInfo.seeked_second)
        // console.log('🚀 ~ useEffect ~ isSeeking---000', isSeeking)

        if (!seekingRef.current) {
          // console.log('🚀 ~ useEffect ~ isSeeking', isSeeking)
          // setIsSeeking(true)
          seekingRef.current = true
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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

    const refHandleResetTabs = useRef(null)
    const handleResetTabs = () => {
      // only reset active tab on PC
      // reset tabs to default value when view other videos
      if (!isMobileParent) {
        setActiveTab(VIDEO_TABS.CHAT)
        setActiveSubTab(SUB_TABS.MESS.ALL)
      }
    }
    refHandleResetTabs.current = handleResetTabs

    useEffect(
      () => () => {
        dispatch(resetChatState())
        refHandleResetTabs.current()
      },
      ['componentWillUnMount']
    )

    const resetMessages = () => {
      // setAllMess([])
      setStateMessages([])
      // setSavedMess([])
      setMessagesDonate([])
      // setSavedDonateMess([])
      // setCacheMess([])
      cacheMessRef.current = []
      cacheDonateMessRef.current = []
      // setCacheDonateMess([])
      // setRewindMess({})
      rewindMessRef.current = {}
      // setPrevRewindMess({})
      prevRewindMessRef.current = {}
      autoGetMessRef.current = []
      // setAutoGetMess([])
      setMessActiveUser(null)
    }

    const resetMessagesWhenRewind = () => {
      setStateMessages([])
      // setCacheMess([])
      cacheMessRef.current = []
      setMessActiveUser(null)
      // setCacheDonateMess([])
    }

    useEffect(() => {
      if (key_video_id) {
        resetMessages()
        refHandleResetTabs.current()
      }
    }, [key_video_id])

    const filterMessWhenChangeTime = useRef(null)
    const handleFilterMessWhenChangeTime = () => {
      // auto get mess when no rewind video
      if (!isTipTab && !isGettingRewindMess && !isStreaming) {
        // check is streaming addition
        // if isStreaming
        if (!isStreaming && videoPlayedSecond.current === nextTimeRef.current - SECOND_AUTO_GET_MESS_BEFORE) {
          // console.log('🚀 ~ useEffect ~ fetchNextMess-auto', fetchNextMess)
          fetchNextMess(GET_MESS_TYPE.AUTO, nextTimeRef.current)
        }
      }
      // console.log('2-played->streaming->range', videoPlayedSecond.current, streamingSecond, streamingSecond - videoPlayedSecond.current)
      if (isStreaming) {
        filterByStreaming()
      } else {
        // console.log('🚀 ~ filterMessWhenChangeTime ~ isSeeking', isSeeking)
        //  filter mess when user no seeking or pausing live video
        if (!seekingRef.current && !liveStreamInfo.is_pausing_live) {
          // console.log('🚀 ~ filterMessWhenChangeTime ~ isSeeking', isSeeking)
          filterMessByPlayedSecond(videoPlayedSecond.current)
        }
      }
      if (seekingRef.current) {
        seekingRef.current = false
      }
    }
    filterMessWhenChangeTime.current = handleFilterMessWhenChangeTime

    // console.log('🚀 ~  videoPlayedSecond.current--333', videoPlayedSecond.current)

    const handleUpdateVideoTime = useRef(null)
    const onUpdateVideoTime = (videoInfo) => {
      // console.log('🚀 ~ ?. ~ videoInfo---111', videoInfo.currentTime)
      // console.log('🚀 ~ ?. ~ duration---111', videoInfo.duration)
      const newPlayedSecondTime = videoInfo.currentTime
      const durationTime = videoInfo.duration

      // update played second
      if (Math.floor(newPlayedSecondTime) !== videoPlayedSecond.current) {
        // console.log('🚀 ~  videoPlayedSecond.current--000', videoPlayedSecond.current)
        videoPlayedSecond.current = Math.floor(newPlayedSecondTime)
        filterMessWhenChangeTime.current()
      }
      // update streaming second
      if (Math.floor(durationTime) !== videoStreamingSecond.current) {
        videoStreamingSecond.current = Math.floor(durationTime)
      }
    }

    handleUpdateVideoTime.current = onUpdateVideoTime

    const handleUpdateTime = (event) => {
      const videoInfo = event.target
      videoInfo ? handleUpdateVideoTime.current(videoInfo) : ''
    }

    useEffect(() => {
      console.log('🚀 ~ useEffect ~ videoRefInfo---999', videoRefInfo)
      // console.log('🚀 ~ useEffect ~ videoRefInfo---555', videoRefInfo?.current?.currentTime)
      if (videoRefInfo && videoRefInfo?.current) {
        videoRefInfo?.current?.addEventListener('seeking', () => {
          console.log('=================SEEKING--000===================')
          seekingRef.current = true
          // setIsSeeking(true)
        })
        videoRefInfo?.current?.addEventListener('timeupdate', handleUpdateTime)
      }
      return () => {
        if (videoRefInfo && videoRefInfo?.current) {
          videoRefInfo?.current?.removeEventListener('timeupdate', handleUpdateTime)
        }
      }
    }, [videoRefInfo])

    const resetMessWhenSwitchTab = () => {
      setStateMessages([])
      // setCacheMess([])
      cacheMessRef.current = []
      // setMessagesDonate([])
      // setCacheDonateMess([])
    }

    const handleGetMessTip = () => {
      // if get mess initial success => get mess same as when rewind time
      if (successGetListMessTip) {
        setIsGettingMess(true)
        setTimeout(() => {
          console.log('🚀 ~ setTimeout ~ setIsGettingMess', 111)
          fetchMessTipWhenRewind(videoPlayedSecond.current)
        }, DEBOUNCE_SECOND)
      } else {
        // handleGetMessTipInitial()
      }
    }

    const getMessWhenSwitchTab = () => {
      if (!isFirstVisitPage) {
        switch (activeSubTab) {
          case SUB_TABS.MESS.TIP:
            console.log('Switch to sub tab chat mess')
            if (!isSwitchingSubTabRef.current) {
              return
            }
            console.log('Switch to sub tab chat mess fire')

            setBottom(true)
            resetMessWhenSwitchTab()
            handleGetMessTip()
            break

          case SUB_TABS.MESS.ALL:
            console.log('Switch to sub tab chat all')
            setBottom(true)
            resetMessWhenSwitchTab()
            if (isSwitchingSubTabRef.current) {
              return
            }
            console.log('Switch to sub tab chat all fire')
            if (isStreaming) {
              // console.log('🚀 ~ useEffect ~ isStreaming', isStreaming)
              // setIsSwitchingTab(true)
              switchTabRef.current = true
              fetchMessInitialStreaming()
            } else {
              // fetch prev mess rewinded when switch tab
              fetchPrevMessWhenRewind(videoPlayedSecond.current)
            }
            break
          default:
            break
        }
      }
    }

    useEffect(() => {
      console.log('🚀 ~ onCreateMess ~ activeSubTab', activeSubTab)
      console.log('🚀 ~ onCreateMess ~ activeTab', activeTab)
      console.log('🚀 ~ onCreateMess ~ firstRender--000', isFirstVisitPage)
      if (isFirstVisitPage) {
        setIsFirstVisitPage(false)
      }
      isSwitchingSubTabRef.current = activeSubTab === SUB_TABS.MESS.TIP
      // if(!isSwitchingSubTabRef.current) {
      console.log('Switch sub tab')
      getMessWhenSwitchTab()
      // }
    }, [activeSubTab])

    useEffect(() => {
      if (!isFirstVisitPage && activeTab === VIDEO_TABS.CHAT) {
        if (activeSubTab === SUB_TABS.MESS.ALL || activeSubTab === SUB_TABS.MESS.TIP) {
          console.log('Change tab fire chat')
          if (!isMobile) getMessWhenSwitchTab()
        } else {
          console.log('Change tab fire not chat')
          setActiveSubTab(SUB_TABS.MESS.ALL)
        }
      } else {
        isSwitchingSubTabRef.current = false
      }
      // get list ranking if has not get
      if (activeTab === VIDEO_TABS.RANKING && !rankingListMeta.pending && !rankingListMeta.loaded) {
        console.log('Change tab fire ranking')
        fetchDonateRanking({ video_id: detailVideoResult.uuid })
      }
    }, [activeTab])

    useEffect(() => {
      // TODO
      // fetchMessInitialStreaming()
    }, [])

    // get all mess tip initial and render icon tip mess separate with all mess
    const handleGetMessTipInitial = () => {
      // console.log('🚀 ~ handleGetMessTipInitial ~ 111', 11)

      // if has not get mess tip initial yet => get mess tip initial
      // setInitTipMess([])
      initTipMessRef.current = []
      fetchMessTipInitial()
    }
    // console.log('🚀 ~ useEffect ~ videoPlayedSecond.1111', videoPlayedSecond.current)

    useEffect(() => {
      // console.log('🚀 ~ useEffect ~ isStreaming--000', isStreaming, videoType)
      // console.log('🚀 ~ useEffect ~ isStreaming', playedSecond)
      // console.log('🚀 ~ useEffect ~ isResizedScreen', isResizedScreen)
      // TODO
      // reset mess donate when move from live stream to archive
      setMessagesDonate([])
      cacheDonateMessRef.current = []
      // setCacheDonateMess([])

      if (isStreaming) {
        handleGetMessTipInitial()
        // console.log('🚀 ~ useEffect ~ isStreaming', isStreaming)
        if (activeSubTab === SUB_TABS.MESS.ALL) {
          fetchMessInitialStreaming()
        } else if (activeSubTab === SUB_TABS.MESS.TIP) {
          // handleGetMessTip()
        }
      } else if (!isStreaming && videoType === STATUS_VIDEO.ARCHIVE) {
        // console.log('🚀 ~ useEffect ~ videoPlayedSecond.current', videoPlayedSecond.current)
        const currentTime = Math.floor(videoRefInfo?.current?.currentTime || 0)
        // console.log('🚀 ~ useEffect ~ isMobile', isMobile)
        // console.log('🚀 ~ useEffect ~ currentTime', currentTime)
        if (+currentTime > 0) {
          // reassign current time of playing video
          videoPlayedSecond.current = currentTime
        }

        handleGetMessTipInitial()
        if (activeSubTab === SUB_TABS.MESS.ALL) {
          // console.log('🚀 ~ useEffect ~ isResizedScreen', isResizedScreen)
          // fetch prev and rewind mess when playing video and re-mount chat container
          if (+currentTime > 0) {
            fetchPrevMessWhenRewind(currentTime)
          } else {
            fetchNextMess(GET_MESS_TYPE.FETCH_ARCHIVE_INITIAL, currentTime)
          }
        } else if (activeSubTab === SUB_TABS.MESS.TIP) {
          // handleGetMessTip()
        }
      }
      // fetchMessInitialStreaming()
    }, [videoType])

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

    const deleteMsg = useCallback(async (message: any) => {
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
    }, [])

    const reDeleteMess = useCallback(async (message: any) => {
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
    }, [])

    const sortMessages = (messages, isSortAsc = true) => {
      const new_mess = [...messages]
      const sortFactor = isSortAsc ? 1 : -1
      return new_mess.sort((a: any, b: any) => sortFactor * (+a.video_time - +b.video_time || a.created_time.localeCompare(b.created_time)))
    }

    const getMessageWithoutNgWords = (chatMessContent) => {
      const ngWords = checkVideoNgWord(chatMessContent)
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

    const updateOldMessData = (updatedMessage, objWithNewProps, compareProp = 'id') => {
      const updatedMessWithNewProp = { ...updatedMessage, ...objWithNewProps }
      let foundIndex = findMessUpdated(stateMessages, updatedMessage, compareProp)
      if (foundIndex !== -1) {
        const newStateMess = [...stateMessages]
        newStateMess[foundIndex] = { ...updatedMessWithNewProp }
        setStateMessages(newStateMess)
      }
      foundIndex = findMessUpdated(cacheMessRef.current, updatedMessage, compareProp)
      if (foundIndex !== -1) {
        const newCacheMess = [...cacheMessRef.current]
        newCacheMess[foundIndex] = { ...updatedMessWithNewProp }
        cacheMessRef.current = newCacheMess
        // setCacheMess(newCacheMess)
      }
      foundIndex = findMessUpdated(messagesDonate, updatedMessage, compareProp)
      if (foundIndex !== -1) {
        const newDonateMess = [...messagesDonate]
        newDonateMess[foundIndex] = { ...updatedMessWithNewProp }
        setMessagesDonate(newDonateMess)
      }
      foundIndex = findMessUpdated(cacheDonateMessRef.current, updatedMessage, compareProp)
      if (foundIndex !== -1) {
        const newCacheDonateMess = [...cacheDonateMessRef.current]
        newCacheDonateMess[foundIndex] = { ...updatedMessWithNewProp }
        cacheDonateMessRef.current = [newCacheDonateMess]
        // setCacheDonateMess(newCacheDonateMess)
      }
      // update cache message tip
      foundIndex = findMessUpdated(cacheMessTipRef.current, updatedMessage, compareProp)
      if (foundIndex !== -1) {
        const newCacheMessTip = [...cacheMessTipRef.current]
        newCacheMessTip[foundIndex] = { ...updatedMessWithNewProp }
        if (updatedMessage?.is_premium === true) {
          // setCacheMessTip(newCacheMessTip)
          cacheMessTipRef.current = newCacheMessTip
        }
      }
    }

    const refCreateMessLocal = useRef(null)
    const handleCreateMessLocal = (result, local_message, error = false) => {
      // console.log('🚀 ~ handleCreateMessLocal ~ result--000', result)
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

    const resendMess = useCallback(async (message: any) => {
      if (isStreaming) {
        const videoTime = videoPlayedSecond.current
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
    }, [])

    const handleCreateMess = async (local_message: any, input: any, point: any, resetMess: any) => {
      console.log('handleCreateMess', local_message, point)
      const is_premium_local_message = isPremiumChat(local_message, false)
      if (isStreaming) {
        setStateMessages((prev) => [...prev, local_message])
      }

      // save mess for local
      // setCacheMess((messages) => [...messages, local_message])
      cacheMessRef.current = [...cacheMessRef.current, local_message]
      // setSavedMess((messages) => [...messages, local_message])
      // save donated messages for local (not check display time)
      if (is_premium_local_message) {
        // setSavedDonateMess((messages) => [...messages, local_message])
        // setCacheDonateMess((messages) => [...messages, local_message])
        cacheDonateMessRef.current = [...cacheDonateMessRef.current, local_message]
      }
      // only save mess tip when has point
      if (point) {
        // setCacheMessTip((messages) => [...messages, local_message])
        cacheMessTipRef.current = [...cacheMessTipRef.current, local_message]
      }

      // save message to local
      if (isStreaming) {
        const isMessageInBottom = checkMessIsInBottom()
        // render new messages with savedMess
        if (!point) {
          // reset input chat
          // values.message = ''
          resetMess((value) => !value)
        }
        // setStateMessages((prev) => [...prev, local_message])

        if (isMessageInBottom) {
          if (point) {
            scrollBehaviorRef.current = 'instant'
            // setScrollBehavior('instant')
            setIsChatInBottom(true)
          } else {
            // console.log('🚀 ~ createMess ~ scrollToCurrentMess---000', scrollToCurrentMess)
            scrollToCurrentMess()
          }
        }

        // render new users donate
        if (is_premium_local_message) {
          // let newMessDonate = [...savedDonateMess]
          // newMessDonate = newMessDonate.filter((item) => +item.display_avatar_time > +videoPlayedSecond.current)
          // render user donate icon by time of local
          setMessagesDonate((prev) => [...prev, local_message])
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

    const scrollToCurrentMess = (behavior = 'smooth') => {
      // console.log('🚀 ~ scrollToCurrentMess ~ isEnabledChat--000', isEnabledChat)
      if (!behavior) {
        if (isEnabledChat && isStreaming) {
          behavior = 'instant'
        }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      messContainer?.scrollTo({ top: messContainer.scrollHeight, behavior: behavior })
      // if (messagesEndRef.current != null && messagesEndRef) {
      //   messagesEndRef.current?.scrollToRow(stateMessages.length - 1)
      //   setTimeout(() => {
      //     messagesEndRef.current?.scrollToRow(stateMessages.length - 1)
      //     // setBottom(true)
      //   }, 100)
      // }
    }

    const closeDialogActiveUser = () => {
      // prevent close modal when click user icon first time
      if (messActiveUser && !displayDialogMess) {
        setMessActiveUser(null)
      }
      setDisplayDialogMess(false)
    }

    const matchSm = useMediaQuery(theme.breakpoints.down(769))
    // const matchMd = useMediaQuery(theme.breakpoints.down(1025))

    const getMarginBottom = () => (matchSm && isLandscape ? 45 : 0)

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
          // marginTop = 16
          marginTop = 8
        } else {
          // marginTop = 12
          marginTop = 8
        }
      }
      if (componentType === 'userIcon') {
        // return 16
        // margin top 16 when has donate message
        if (isMobile) return 8
        if (transformedDonateMess.length !== 0) {
          return 16
        }
        // render margin top higher with donate message is first item
        if (transformedMess.length !== 0 && transformedMess[0].is_premium) {
          marginTop = 8
        } else {
          marginTop = 8
        }
      }
      return marginTop
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

    const handleScrollToBottom = useCallback(() => {
      if (isBottom && !isGettingMess) {
        // if (isBottom) {
        _scrollToBottom(stateMessages.length)
        // console.log('🚀 ~ useEffect ~ setBottom', 4444)
        setBottom(true)
      }
    }, [isBottom, isGettingMess, stateMessages])

    const chatBoardComponent = () => (
      <Box
        id="chatContentMain"
        className={`${classes.chatBoardContainer}`}
        style={{
          marginTop: getMarginTopOfComponents('chatBoard'),
          marginBottom: getMarginBottom(),
        }}
      >
        <ChatLoader open={isGettingMess || isGettingPrevRewindMess || isGettingTipMess} />
        <IconButton
          disableRipple
          style={{
            display: !isBottom && !isFullScreen ? 'flex' : 'none',
            bottom: isMobile && isStreaming ? (isLandscape ? 66 : 180) : 30,
          }}
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
        <ChatMessages
          chatInputHeight={chatInputHeight}
          messagesEndRef={messagesEndRef}
          stateMessages={stateMessages}
          // _onScroll={_onScroll}
          isGettingRewindMess={isGettingRewindMess}
          setBottom={setBottom}
          setScrolling={setScrolling}
          isStreamer={userResult.streamer}
          isTipTab={isTipTab}
          videoType={videoType}
          deleteMsg={deleteMsg}
          reDeleteMess={reDeleteMess}
          resendMess={resendMess}
          handleScrollToBottom={handleScrollToBottom}
        />
        {/* {isMobile ? chatComponentMobile() : chatInputComponent()} */}
      </Box>
    )

    const chatNotAvailableMessage = () => {
      if (videoType === STATUS_VIDEO.SCHEDULE && (isVideoFreeToWatch || userHasViewingTicket)) {
        return i18n.t('common:live_stream_screen.chat_will_available_on_time')
      }
      return i18n.t('common:live_stream_screen.chat_purchase_ticket_note')
    }

    const userDoesNotHaveViewingTicketView = () => {
      return (
        activeTab === VIDEO_TABS.CHAT && (
          <Box className={classes.chatPurchaseTicketBox}>
            <Typography
              className={classes.chatPurchaseTicketNote}
              style={{ margin: isEnabledMessFilter ? '0 16px 18px 16px' : '18px 16px' }}
            >
              {chatNotAvailableMessage()}
            </Typography>
          </Box>
        )
      )
    }

    const chatContent = () => (
      <>
        {activeTab === VIDEO_TABS.CHAT && (
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
                      <ESAvatar src={item?.parent?.avatar} size={33} alt={item?.parent?.user_name} />
                      <Box className={classes.textPoint}>{item.point}</Box>
                    </Box>
                  ) : (
                    ''
                  )
                )}
            </Box>

            {chatBoardComponent()}
          </>
        )}
        <ChatFooter
          chatContainerRef={chatMobileContainerRef}
          clearMessageDonatePoint={clearMessageDonatePoint}
          donateConfirmModalIsShown={donateConfirmModalIsShown}
          errorMsgDonatePoint={errorMsgDonatePoint}
          handleKeyboardVisibleState={handleKeyboardVisibleState}
          isEnabledChat={isEnabledChat}
          isEnabledGift={isEnabledGift}
          isStreaming={isStreaming}
          onPressDonate={onPressDonate}
          openPurchasePointModal={openPurchasePointModal}
          handleCreateMess={handleCreateMess}
          chatUser={chatUser}
          key_video_id={key_video_id}
          successFlagGetAddUSer={successFlagGetAddUSer}
          videoPlayedSecond={videoPlayedSecond}
        />
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
      // TODO
      return videoType !== STATUS_VIDEO.SCHEDULE && (isVideoFreeToWatch || userHasViewingTicket)
      // return true
    }

    const renderMessageTab = () => {
      return (
        <Box>
          {isEnabledMessFilter && (
            <SubTabGroups
              isSwitchingSubTabRef={isSwitchingSubTabRef}
              successGetListMessTip={successGetListMessTip}
              successGetListMess={successGetListMess}
            />
          )}
          {/* {displayChatContent() ? chatContent() : userDoesNotHaveViewingTicketView()} */}
          {/* <ChatTab activeTab={messageTab} /> */}
        </Box>
      )
    }

    const getTabsContent = useMemo(() => {
      switch (activeTab) {
        case VIDEO_TABS.CHAT:
          return renderMessageTab()
        // case VIDEO_TABS.RANKING:
        //   return <RankingTab />
        default:
          return ''
      }
    }, [activeTab, isEnabledMessFilter, activeSubTab, successGetListMessTip, successGetListMess])

    const renderContent = () => {
      return displayChatContent() ? chatContent() : userDoesNotHaveViewingTicketView()
    }

    const handleChangeTab = useCallback((v) => {
      console.log('🚀 ~ handleChangeTab ~ v', v)

      isSwitchingTabRef.current = v === VIDEO_TABS.RANKING ? true : false
      isSwitchingSubTabRef.current = v === VIDEO_TABS.RANKING ? true : false
      setActiveTab(v)
    }, [])

    return (
      <Box
        className={classes.chatArea}
        style={{ paddingBottom: isStreaming && isLandscape && activeTab === VIDEO_TABS.RANKING ? '56px' : 0 }}
      >
        <TabsContainer
          isSwitchingSubTabRef={isSwitchingSubTabRef}
          isSwitchingTabRef={isSwitchingTabRef}
          onChange={handleChangeTab}
          isDisplayedRankingTab={isDisplayedRankingTab}
        />
        {activeTab === VIDEO_TABS.CHAT && (
          <Box className={classes.tabsContent} style={{ display: isMobile && activeTab === VIDEO_TABS.CHAT ? 'none' : 'block' }}>
            {getTabsContent}
          </Box>
        )}

        {activeTab === VIDEO_TABS.RANKING && <RankingTab activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} />}
        {renderContent()}
      </Box>
    )
  }
)

export default memo(ChatContainer)
