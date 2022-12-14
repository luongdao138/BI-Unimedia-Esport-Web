import { Box, makeStyles, Typography, ClickAwayListener } from '@material-ui/core'
import { Colors } from '@theme/colors'

import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
import { SUB_TABS, VIDEO_INFO_TABS, VIDEO_TABS } from '@constants/common.constants'

import i18n from '@locales/i18n'
// import useDetailVideo from '../useDetailVideo'
import TabsGroup from '@components/TabsGroup'
import { useCheckDisplayChat } from '@utils/hooks/useCheckDisplayChat'
import { useVideoTabContext } from '../VideoContext/VideTabContext'
const DEFAULT_SELECT_TAB = -1

export const videoTabs = [
  {
    title: i18n.t('common:live_stream_screen.chat_header'),
    value: VIDEO_TABS.CHAT,
    subTabs: [
      {
        title: i18n.t('common:live_stream_screen_chat.all'),
        value: SUB_TABS.MESS.ALL,
      },
      {
        title: i18n.t('common:live_stream_screen_chat.tip'),
        value: SUB_TABS.MESS.TIP,
      },
    ],
  },
  {
    title: i18n.t('common:live_stream_screen.ranking_tab_title'),
    value: VIDEO_TABS.RANKING,
    subTabs: [
      {
        title: i18n.t('common:live_stream_screen_chat.receipt'),
        value: SUB_TABS.RANKING.RECEIPT,
      },
      {
        title: i18n.t('common:live_stream_screen_chat.send'),
        value: SUB_TABS.RANKING.SEND,
      },
    ],
  },
  {
    title: i18n.t('common:live_stream_screen.program_info'),
    value: VIDEO_TABS.PROGRAM_INFO,
  },
]

export type TabSelectProps = {
  sideChatContainer: () => void
  renderVideoSubInfo: () => void
  infoTabsContent: (currentTab: number) => void
  isLandscape?: boolean
}

const TabSelectContainer: React.FC<TabSelectProps> = ({ sideChatContainer, infoTabsContent, renderVideoSubInfo, isLandscape }) => {
  // const { liveStreamInfo } = useDetailVideo()
  const { setActiveSubTab, setActiveTab, activeSubTab, activeTab, prevMessSubTabRef, needLoadMoreRef } = useVideoTabContext()
  const { isEnabledMessFilter, isDisplayedRankingTab, isDisplayedRankingReceipt } = useCheckDisplayChat()

  // const { activeTab, activeSubTab } = liveStreamInfo
  // const { t } = useTranslation('common')
  const classes = useStyles({ isLandscape })
  // const [activeTab, setActiveTab] = useState(VIDEO_TABS.CHAT)
  const [activeSelectTab, setActiveSelectTab] = useState(DEFAULT_SELECT_TAB)
  const [activeInfoTab, setActiveInfoTab] = useState(VIDEO_INFO_TABS.PROGRAM_INFO)
  // const [isRankingTab, setRankingTab] = useState(false)

  // useEffect(() => {
  //   setActiveTab(VIDEO_TABS.CHAT)
  //   setActiveSubTab(SUB_TABS.MESS.ALL)
  // }, [])

  const getContent = () => {
    switch (activeTab) {
      case VIDEO_TABS.PROGRAM_INFO:
        return (
          <Box className={classes.programInfoPanel}>
            {renderVideoSubInfo()}
            <Box style={{ padding: '8px 8px 0 8px' }}>
              <TabsGroup
                data={[
                  {
                    value: VIDEO_INFO_TABS.DISTRIBUTOR_INFO,
                    label: i18n.t('common:live_stream_screen.distributor_info'),
                  },
                  {
                    value: VIDEO_INFO_TABS.RELATED_VIDEOS,
                    label: i18n.t('common:live_stream_screen.related_videos'),
                  },
                ]}
                value={activeInfoTab}
                onClick={(value) => setActiveInfoTab(value)}
                hiddenOnSP={false}
              ></TabsGroup>
            </Box>

            {infoTabsContent(activeInfoTab)}
          </Box>
        )

      default:
        return sideChatContainer()
    }
  }

  return (
    <>
      <Box display="flex" width="100%" className={classes.tabSelectContainer}>
        {videoTabs.map((item, k) => {
          // console.log('???? ~ {videoTabs.map ~ item', item.value)
          // console.log('???? ~ {videoTabs.map ~ value', item)
          let isDisplayed = true
          if (item.value === VIDEO_TABS.RANKING) {
            isDisplayed = isDisplayedRankingTab
          }
          return (
            isDisplayed && (
              <>
                <ClickAwayListener
                  onClickAway={() => {
                    // active tab <=> activeSelectTab
                    // if activeSelectTab is its => when click outside => reset active select tab
                    if (activeSelectTab === item.value) {
                      setActiveSelectTab(DEFAULT_SELECT_TAB)
                    }
                  }}
                  key={k}
                >
                  <Box
                    onClick={() => {
                      if (item?.subTabs) {
                        // setActiveSelectTab with ranking and chat tab
                        // only set active select tab due to only display info of select tab
                        setActiveSelectTab(item?.value)
                        // setActiveTab(item.value)
                      } else {
                        // set active tab with program info tab
                        setActiveTab(item.value)
                      }
                      if (item.value === VIDEO_TABS.PROGRAM_INFO) {
                        setActiveInfoTab(VIDEO_INFO_TABS.PROGRAM_INFO)
                        setActiveSubTab(DEFAULT_SELECT_TAB)
                      }
                    }}
                    className={`${classes.tab} ${activeTab === item.value && classes.active} ${k === 1 ? 'middleTab' : ''}`}
                    // key={k}
                  >
                    <Box className={classes.boxTab}>
                      <Typography
                        className={`${item?.subTabs ? classes.textTabVideo : classes.textTabVideoProgramInfo} ${
                          activeTab === item.value && classes.active
                        }`}
                      >
                        {item.title}
                      </Typography>
                      {item.value !== VIDEO_TABS.PROGRAM_INFO && (
                        <Box className={classes.wrapSelectIcon}>
                          <img className="select_icon" src="/images/arrow_down.svg" />
                        </Box>
                      )}
                    </Box>
                    {/* sub tab */}
                    {item?.subTabs && (
                      <Box className={`${classes.subTab} ${activeSelectTab === item.value && classes.active}`}>
                        {item?.subTabs.map((v, key) => {
                          let isDisplayedSubTab = true
                          if (v.value === SUB_TABS.RANKING.RECEIPT) {
                            // tab ranking receipt only displayed when isDisplayedRankingReceipt = true
                            isDisplayedSubTab = isDisplayedRankingReceipt
                          }
                          if (v.value === SUB_TABS.MESS.TIP) {
                            isDisplayedSubTab = isEnabledMessFilter
                          }
                          return (
                            isDisplayedSubTab && (
                              <Typography
                                key={key}
                                onClick={(event) => {
                                  event.stopPropagation()
                                  prevMessSubTabRef.current = v.value
                                  needLoadMoreRef.current = false
                                  setActiveSubTab(v.value)
                                  // change active tab
                                  setActiveTab(item.value)
                                  // console.log('???? ~ {videoTabs.map ~ 1111', item)
                                  // reset active select tab
                                  setActiveSelectTab(DEFAULT_SELECT_TAB)
                                }}
                                className={`${classes.selectSubTab} ${activeSubTab === v?.value && classes.active}`}
                              >
                                {v.title}
                              </Typography>
                            )
                          )
                        })}
                      </Box>
                    )}
                  </Box>
                </ClickAwayListener>
              </>
            )
          )
        })}
      </Box>
      {getContent()}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  wrapSelectIcon: {
    paddingLeft: 4,
    cursor: 'pointer',
  },
  tabSelectContainer: {
    backgroundColor: Colors.black,
    gap: '16px',
    padding: '10px 20px 8px 10px',
    flexShrink: 0,
  },
  tab: {
    cursor: 'pointer',
    position: 'relative',
    // padding: 10,
    display: 'flex',
    borderBottom: `2px solid #4D4D4D`,
    '&$active': {
      color: Colors.white,
      borderBottom: `2px solid ${Colors.white}`,
      '& .select_icon': {
        transform: 'rotate(180deg)',
        filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(197deg) brightness(101%) contrast(104%)',
      },
    },
    '&.middleTab': {
      flex: 1,
    },
  },
  messageTab: {},
  receiptSendTab: {},
  item: {
    width: '100%',
  },
  programInfo: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    borderBottom: '2px solid #4D4D4D',
  },
  boxTab: {
    // cursor: 'pointer',
    position: 'relative',
    width: '100%',
    display: 'flex',
    padding: '0px 8px 8px 8px',
  },
  subTab: {
    width: '100%',
    position: 'absolute',
    top: 'calc(100% + 2px)',
    backgroundColor: Colors.black_opacity[90],
    zIndex: 99,
    display: 'none',
    '&$active': {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      paddingTop: '12px',
      paddingBottom: '8px',
    },
  },
  textTabVideoProgramInfo: {
    padding: 0,
    textAlign: 'left',
    position: 'relative',
    fontSize: 12,
    lineHeight: '17px',
    '&$active': {
      color: Colors.white,
    },
  },
  textTabVideo: {
    padding: 0,
    textAlign: 'left',
    position: 'relative',
    flex: 1,

    '&$active': {
      color: Colors.white,
    },
  },
  textTab: {
    borderBottom: '2px solid #4D4D4D',
    padding: 10,
    textAlign: 'center',
    '&$active': {
      color: Colors.white,
      borderBottom: `2px solid ${Colors.white}`,
    },
  },
  selectSubTab: {
    textAlign: 'center',
    // padding: 10,
    color: Colors.white_opacity[30],
    '&$active': {
      color: Colors.white,
    },
  },
  active: {},

  [`@media (orientation: landscape)`]: {
    textTabVideoProgramInfo: (props: { isLandscape?: boolean }) => {
      if (props.isLandscape)
        return {
          fontSize: props.isLandscape ? 10 : 12,
          lineHeight: '17px',
          color: Colors.white_opacity[30],
        }
    },
    textTabVideo: (props: { isLandscape?: boolean }) => {
      if (props.isLandscape)
        return {
          fontSize: props.isLandscape ? 10 : 12,
          lineHeight: '17px',
          color: Colors.white_opacity[30],
        }
    },
    programInfoPanel: (props: { isLandscape?: boolean }) => {
      if (props.isLandscape)
        return {
          overflowX: 'hidden',
          overflowY: 'auto',
          flex: '1 1 0',
        }
    },
    selectSubTab: (props: { isLandscape?: boolean }) => {
      if (props.isLandscape) {
        return {
          fontSize: props.isLandscape ? 10 : 12,
        }
      }
    },
  },
  [theme.breakpoints.down(769)]: {
    textTabVideo: (props: { isLandscape?: boolean }) => {
      if (props.isLandscape) {
        return {
          fontSize: 7,
        }
      } else {
        return {
          fontSize: 10,
        }
      }
    },
    textTabVideoProgramInfo: (props: { isLandscape?: boolean }) => {
      if (props.isLandscape) {
        return {
          fontSize: 7,
        }
      } else {
        return {
          fontSize: 10,
        }
      }
    },
    selectSubTab: (props: { isLandscape?: boolean }) => {
      if (props.isLandscape) {
        return {
          fontSize: 7,
        }
      } else {
        return {
          fontSize: 10,
        }
      }
    },
  },
}))

export default TabSelectContainer
