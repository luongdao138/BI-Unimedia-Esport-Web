/* eslint-disable no-console */
import { useRef } from 'react'
import useGraphqlAPI from 'src/types/useGraphqlAPI'
import API, { graphqlOperation } from '@aws-amplify/api'
import { GET_MESS_TYPE } from '.'
import {
  INTERVAL_AUTO_GET_MESS,
  LIMIT_FETCH_NEXT,
  LIMIT_MAX_MESS_PREV_REWIND,
  LIMIT_MESS,
  LIMIT_MIN_MESS_PREV_REWIND,
  STATUS_GET_MESS,
} from '@constants/common.constants'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { STATUS_VIDEO } from '@services/videoTop.services'
import { useVideoTabContext } from '../VideoContext/VideTabContext'
const {
  getMessagesByVideoId,
  getMessagesByVideoIdWithSort,
  getMessagesByVideoByPremium,
} = require(`src/graphql.${process.env.NEXT_PUBLIC_AWS_ENV}/queries`)

const APIt: any = useGraphqlAPI()

type IExportProps = {
  fetchMessTipInitial: (value?: any) => void
  fetchNextMess: (getType?: any, video_time?: any, sortOrder?: any, nextToken?: any) => void
  fetchPrevMessWhenRewind: (video_time?: any, sortOrder?: any) => void
  fetchMessInitialStreaming: (sortOrder?: any) => void
  fetchPrevMess: (sortOrder?: any) => void
}
type IImportProps = {
  // isSwitchingTabRef: any
  key_video_id: string
  initTipMessRef: any
  prevRewindMessRef: any
  videoPlayedSecond: any
  isGettingRewindMess: any
  autoGetMessRef: any
  isTokenBroken: any
  streamingSecond: any
  videoType: any
  isBottom: any
  prevTokenRef: any
  serverTipMessRef: any
  cacheDonateMessRef: any
  cacheStateMessRef: any
  nextTimeRef: any
  // isSwitchingSubTabRef: any
  switchTabRef: any
  rewindMessRef: any
  savedAllMessRef: any
  prevMessSubTabRef: any
  savedTipMessRef: any
  isPrevAllMessTab: any
  //
  setIsGettingTipMess: (value: boolean) => void
  sortMessages: (value: any) => any
  setSuccessGetListMessTip: (value: any) => any
  setIsGettingRewindMess: (value: any) => any
  setIsGettingMess: (value: any) => any
  setStateMessages: (value: any) => any
  setIsTokenBroken: (value: any) => any
  setSuccessGetListMess: (value: any) => any
  setSuccessGetListDonateMess: (value: any) => any
  setIsGettingPrevRewindMess: (value: any) => any
  setBottom: (value: any) => any
  _scrollToBottom: (value: any) => any
  refFetchMessTipWhenRewind: any
}

// export const useChatHelpers =  (setIsGettingTipMess, key_video_id, setInitTipMess): IExportProps => {
export const useChatHelpers = (props: IImportProps): IExportProps => {
  // const [videoTimeIsRewinding, setVideoTimeIsRewinding] = useState(0)
  // const [rewindMess, setRewindMess] = useState<any>({})
  // const [archiveInitMess, setArchiveInitMess] = useState([])

  const { isAllMessTab } = useVideoTabContext()

  const archiveInitMessRef = useRef<any>([])
  const videoTimeIsRewindingRef = useRef<number>(0)
  const prevTimeRef = useRef<number>(0)
  const statusFetchPrevRewindRef = useRef<any>({})
  const statusFetchRewindRef = useRef<any>({})

  const {
    // isSwitchingTabRef,
    key_video_id,
    initTipMessRef,
    prevRewindMessRef,
    videoPlayedSecond,
    isGettingRewindMess,
    autoGetMessRef,
    isTokenBroken,
    streamingSecond,
    videoType,
    isBottom,
    prevTokenRef,
    serverTipMessRef,
    cacheDonateMessRef,
    cacheStateMessRef,
    nextTimeRef,
    // isSwitchingSubTabRef,
    switchTabRef,
    rewindMessRef,
    savedAllMessRef,
    // prevMessSubTabRef,
    // savedTipMessRef,
    isPrevAllMessTab,
    //
    setIsGettingTipMess,
    sortMessages,
    setSuccessGetListMessTip,
    setIsGettingRewindMess,
    setIsGettingMess,
    setStateMessages,
    setIsTokenBroken,
    setSuccessGetListMess,
    setSuccessGetListDonateMess,
    setIsGettingPrevRewindMess,
    setBottom,
    _scrollToBottom,
    refFetchMessTipWhenRewind,
  } = props

  // fetch messages prev when scroll to top when archived or when live stream
  const fetchPrevMess = (sortOrder = APIt.ModelSortDirection.DESC) => {
    try {
      setIsGettingMess(true)
      if (isTokenBroken) {
        const nextToken = prevTokenRef.current
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const listQV: APIt.GetMessagesByVideoIdWithSortQueryVariables = {
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
        const nextToken = prevTokenRef.current
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const listQV: APIt.GetMessagesByVideoIdQueryVariables = {
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

  const fetchMessInitialStreaming = (sortOrder = APIt.ModelSortDirection.DESC) => {
    try {
      isAllMessTab && setIsGettingMess(true)
      // console.log('🚀 ~ loadMoreMess ~ fetchPrevMess--0000', getType)
      // console.log('🚀 ~ fetchPrevMess ~ video_time---000', video_time)
      // occur this case when is streaming and fetch mess initial
      const nextToken = null
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const listQV: APIt.GetMessagesByVideoIdQueryVariables = {
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
    cacheStateMessRef.current = [...transformMessAsc, ...cacheStateMessRef.current]
    savedAllMessRef.current = [...transformMessAsc, ...savedAllMessRef.current]
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

  const refTransformListMess = useRef(null)
  const handleTransformListMess = (messagesInfo) => {
    const transformMess = [...messagesInfo.items]
    const transformMessAsc = sortMessages(transformMess)
    // console.log('🚀 ~ handleTransformListMess ~ setIsSwitchingTab', isSwitchingTab)

    // TODO
    if (streamingSecond === Infinity && videoType === STATUS_VIDEO.LIVE_STREAM && !switchTabRef.current) {
      isAllMessTab && setStateMessages([...transformMessAsc])
    }
    // save mess for use in local
    // setCacheMess([...transformMessAsc])
    if (isAllMessTab) cacheStateMessRef.current = [...transformMessAsc]
    savedAllMessRef.current = [...transformMessAsc]
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
    isAllMessTab && setIsGettingMess(false)
  }
  refTransformListMess.current = handleTransformListMess

  // fetch messages prev when rewind to video time
  const fetchPrevMessWhenRewind = (video_time, sortOrder = APIt.ModelSortDirection.DESC) => {
    console.log('🚀 ~ fetchPrevMessWhenRewind ~ video_time', video_time)
    // if (isSwitchingTabRef.current || isSwitchingSubTabRef.current) {
    //   return
    // }
    try {
      statusFetchPrevRewindRef.current?.[video_time] === STATUS_GET_MESS.GETTING
      isAllMessTab && setIsGettingPrevRewindMess(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const listQV: APIt.GetMessagesByVideoIdWithSortQueryVariables = {
        video_id: key_video_id,
        video_time: { le: video_time - 1 },
        sortDirection: sortOrder,
        // limit: LIMIT_MESS_REWIND,
        limit: CommonHelper.randomIntegerInRange(LIMIT_MIN_MESS_PREV_REWIND, LIMIT_MAX_MESS_PREV_REWIND),
        nextToken: null,
      }
      API.graphql(graphqlOperation(getMessagesByVideoIdWithSort, listQV)).then((messagesResults) => {
        // if (isSwitchingTabRef.current || isSwitchingSubTabRef.current) {
        //   return
        // }
        const messagesInfo = messagesResults.data.getMessagesByVideoIdWithSort
        refFetchPrevMessWhenRewind.current(messagesInfo, video_time)
        setIsGettingPrevRewindMess(false)
      })
    } catch (error) {
      setIsGettingPrevRewindMess(false)
      console.error(error)
    }
  }

  const getNextTime = (video_time) => +video_time + INTERVAL_AUTO_GET_MESS - 1

  const onSuccessGetPrevRewind = (video_time) => {
    console.log('🚀 ~  ~ .current?.[video_time]', statusFetchPrevRewindRef.current?.[video_time])
    console.log('🚀 ~  ~ .current?.[222', statusFetchRewindRef.current?.[video_time])
    if (
      statusFetchPrevRewindRef.current?.[video_time] === STATUS_GET_MESS.SUCCESS &&
      statusFetchRewindRef.current?.[video_time] === STATUS_GET_MESS.SUCCESS
    ) {
      const nextTime = getNextTime(video_time)
      // console.log('🚀 ~ handleFetchRewindMess ~ nextTime--ok', nextTime)
      const oldPrevRewindMess = prevRewindMessRef.current?.[video_time] ? [...prevRewindMessRef.current[video_time]] : []
      const newRewindMess = rewindMessRef.current?.[video_time]
        ? [...oldPrevRewindMess, ...rewindMessRef.current[video_time]]
        : [...oldPrevRewindMess]
      // console.log('🚀 ~ handleFetchRewindMess ~ newRewindMess', newRewindMess)
      const transformMessAsc = sortMessages([...newRewindMess])

      isAllMessTab && setIsGettingMess(false)
      if (isPrevAllMessTab) {
        setStateMessages(transformMessAsc.filter((v) => +v.video_time <= +videoPlayedSecond.current))
        cacheStateMessRef.current = transformMessAsc
      }
      savedAllMessRef.current = transformMessAsc

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

  const refFetchPrevMessWhenRewind = useRef(null)
  const handleFetchPrevMessWhenRewind = (messagesInfo, video_time) => {
    // if (isSwitchingTabRef.current) {
    //   return
    // }
    const transformMessAsc = sortMessages(messagesInfo.items)
    prevRewindMessRef.current = { [video_time]: [...transformMessAsc] }
    // setPrevRewindMess({ [video_time]: [...transformMessAsc] })

    // save token to call api in next time
    // setPrevToken(messagesInfo.nextToken)
    prevTokenRef.current = messagesInfo.nextToken
    // console.log('🚀 ~ handleFetchPrevMessWhenRewind ~ messagesInfo', messagesInfo)
    // prevent scroll when has no messages
    if (!messagesInfo.nextToken) setIsTokenBroken(false)

    statusFetchPrevRewindRef.current = { [video_time]: STATUS_GET_MESS.SUCCESS }
    onSuccessGetPrevRewind(video_time)

    // if (!isSwitchingTabRef.current) {
    // fetchNextMess(GET_MESS_TYPE.FETCH_NEXT, video_time)
    // }
  }
  refFetchPrevMessWhenRewind.current = handleFetchPrevMessWhenRewind

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
      cacheStateMessRef.current = [...transformMessAsc]
      savedAllMessRef.current = [...transformMessAsc]

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

  const refFetchMessAuto = useRef(null)
  const handleFetchMessAuto = (video_time) => {
    // only get messages if no rewind
    if (!isGettingRewindMess) {
      console.log('🚀 ~ handleFetchMessAuto ~ video_time', autoGetMessRef.current)
      console.log('🚀 ~ handleFetchMessAuto ~ isPrevAllMessTab', isPrevAllMessTab)
      const transformMessAsc = sortMessages([...autoGetMessRef.current])
      // setStateMessages(transformMessAsc.filter((v) => +v.video_time <= +videoPlayedSecond.current))
      // setCacheMess((messages) => [...messages, ...transformMessAsc])
      if (isPrevAllMessTab) cacheStateMessRef.current = [...cacheStateMessRef.current, ...transformMessAsc]
      savedAllMessRef.current = [...savedAllMessRef.current, ...transformMessAsc]
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

  // fetch messages next when rewind or mess auto get
  const fetchNextMess = (
    getType = GET_MESS_TYPE.FETCH_NEXT,
    video_time = -1,
    sortOrder = APIt.ModelSortDirection.ASC,
    nextToken = null
  ) => {
    // console.log('🚀 ~ video_time--00', video_time)

    // if (isSwitchingTabRef.current) {
    //   return
    // }
    try {
      let limitMess = LIMIT_MESS
      // console.log('🚀 ~ loadMoreMess ~ fetchNextMess--0000', getType)
      // console.log('🚀 ~ fetchPrevMess ~ video_time---000', video_time)
      if (getType === GET_MESS_TYPE.FETCH_NEXT) {
        statusFetchRewindRef.current = { [video_time]: STATUS_GET_MESS.GETTING }
        limitMess = LIMIT_FETCH_NEXT
        if (isAllMessTab) {
          setIsGettingRewindMess(true)
          setIsGettingMess(true)
        }
      }
      if (getType === GET_MESS_TYPE.FETCH_ARCHIVE_INITIAL) {
        setIsGettingMess(true)
      }
      if (getType === GET_MESS_TYPE.FETCH_NEXT) {
        videoTimeIsRewindingRef.current = video_time
        // setVideoTimeIsRewinding(video_time)
      }

      const nextTime = getNextTime(video_time)
      // console.log('🚀 ~ fetchPrevMess ~ video_time', video_time)
      // console.log('🚀 ~ nextTime---999', nextTime)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const listQV: APIt.GetMessagesByVideoIdWithSortQueryVariables = {
        video_id: key_video_id,
        video_time: {
          between: [video_time, nextTime],
        },
        sortDirection: sortOrder,
        limit: limitMess,
        nextToken,
      }

      API.graphql(graphqlOperation(getMessagesByVideoIdWithSort, listQV)).then((messagesResults) => {
        // if (isSwitchingTabRef.current) {
        //   return
        // }
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
            refFetchRewindMess.current(video_time)
            isAllMessTab && setIsGettingMess(false)
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

  const refFetchRewindMess = useRef(null)
  const handleFetchRewindMess = (video_time) => {
    // console.log('🚀 ~ handleFetchRewindMess ~ video_time', video_time)
    // console.log('🚀 ~ handleFetchRewindMess ~ videoTimeIsRewinding', videoTimeIsRewinding)
    // only get messages with last rewind
    if (videoTimeIsRewindingRef.current !== video_time) {
      return
    }
    statusFetchRewindRef.current = { [video_time]: STATUS_GET_MESS.SUCCESS }
    onSuccessGetPrevRewind(video_time)
  }
  refFetchRewindMess.current = handleFetchRewindMess

  const fetchMessTipInitial = (nextToken = null) => {
    try {
      setIsGettingTipMess(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const listQV: APIt.GetMessagesByVideoByPremiumQueryVariables = {
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

  const refTransformMessTip = useRef(null)
  const handleTransformMessTip = () => {
    const transformMess = [...initTipMessRef.current]
    const transformMessAsc = sortMessages(transformMess)
    // save mess tip forever except switch tab
    // setCacheMessTip([...transformMessAsc])
    serverTipMessRef.current = [...transformMessAsc]
    // savedTipMessRef.current = [...transformMessAsc]

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
    // if (activeSubTab === SUB_TABS.MESS.TIP) {
    // console.log('🚀 ~ handleTransformMessTip ~ activeSubTab', activeSubTab)
    refFetchMessTipWhenRewind.current(videoPlayedSecond.current)
    // }
  }
  refTransformMessTip.current = handleTransformMessTip

  return { fetchMessTipInitial, fetchNextMess, fetchPrevMessWhenRewind, fetchMessInitialStreaming, fetchPrevMess }
}
