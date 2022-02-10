import { Box, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'

import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
import { SUB_TABS, VIDEO_INFO_TABS, VIDEO_TABS } from '@constants/common.constants'

import i18n from '@locales/i18n'
import useDetailVideo from '../useDetailVideo'
import TabsGroup from '@components/TabsGroup'
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
  const { liveStreamInfo, setActiveTab, setActiveSubTab } = useDetailVideo()

  const { activeTab, activeSubTab } = liveStreamInfo
  // const { t } = useTranslation('common')
  const classes = useStyles({ isLandscape })
  // const [activeTab, setActiveTab] = useState(VIDEO_TABS.CHAT)
  const [activeSelectTab, setActiveSelectTab] = useState(DEFAULT_SELECT_TAB)
  const [activeInfoTab, setActiveInfoTab] = useState(VIDEO_INFO_TABS.PROGRAM_INFO)
  // const [isRankingTab, setRankingTab] = useState(false)

  const getContent = () => {
    switch (activeTab) {
      case VIDEO_TABS.PROGRAM_INFO:
        return (
          <Box>
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
          return (
            <Box className={`${classes.tab} ${activeTab === item.value && classes.active}`} key={k}>
              <Box className={classes.boxTab}>
                <Typography
                  onClick={() => {
                    if (item?.subTabs) {
                      setActiveSelectTab(item?.value)
                    } else {
                      setActiveTab(item.value)
                    }
                    if (item.value === VIDEO_TABS.PROGRAM_INFO) {
                      setActiveInfoTab(VIDEO_INFO_TABS.PROGRAM_INFO)
                    }
                  }}
                  className={`${item?.subTabs ? classes.textTabVideo : classes.textTabVideoProgramInfo} ${
                    activeTab === item.value && classes.active
                  }`}
                >
                  {item.title}
                </Typography>
                <Box className={classes.wrapSelectIcon}>
                  <img className="select_icon" src="/images/arrow_down.svg" />
                </Box>

                {/* sub tab */}
                {item?.subTabs && (
                  <Box className={`${classes.subTab} ${activeSelectTab === item.value && classes.active}`}>
                    {item?.subTabs.map((v, key) => (
                      <Typography
                        key={key}
                        onClick={() => {
                          setActiveSubTab(v.value)
                          setActiveTab(item.value)
                          setActiveSelectTab(DEFAULT_SELECT_TAB)
                        }}
                        className={`${classes.selectSubTab} ${activeSubTab === v?.value && classes.active}`}
                      >
                        {v.title}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
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
  },
  tabSelectContainer: {
    backgroundColor: Colors.black,
    gap: '16px',
    padding: '8px 10px',
    flexShrink: 0,
  },
  tab: {
    width: 'calc(100%/3)',
    // padding: 10,
    display: 'flex',
    borderBottom: `2px solid #4D4D4D`,
    '&$active': {
      color: Colors.white,
      borderBottom: `2px solid ${Colors.white}`,
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
    padding: '3px 8px 8px 8px',
  },
  subTab: {
    width: '100%',
    position: 'absolute',
    top: '100%',
    backgroundColor: Colors.black_opacity[90],
    zIndex: 99,
    display: 'none',
    '&$active': {
      display: 'block',
    },
  },
  textTabVideoProgramInfo: {
    borderBottom: '2px solid #4D4D4D',
    padding: 0,
    textAlign: 'left',
    position: 'relative',
    fontSize: 12,
    lineHeight: '17px',
    '&$active': {
      color: Colors.white,
      borderBottom: `2px solid ${Colors.white}`,
      // borderBottom: `2px solid #4D4D4D`,
    },
  },
  textTabVideo: {
    // borderBottom: '2px solid #4D4D4D',
    padding: 0,
    paddingRight: 30,
    textAlign: 'left',
    position: 'relative',
    flex: 1,
    // '&::before': {
    //   right: 15,
    //   top: '33%',
    //   content: '""',
    //   position: 'absolute',
    //   border: `4px solid ${Colors.grey['200']}`,
    //   borderColor: `${Colors.transparent} ${Colors.grey['200']} ${Colors.grey['200']} ${Colors.transparent}`,
    //   transform: 'rotate(45deg)',
    // },
    '&$active': {
      // color: Colors.white,
      // borderBottom: `2px solid ${Colors.white}`,
      // '&::before': {
      //   // transform: 'rotate(225deg)',
      //   borderColor: `${Colors.transparent} ${Colors.white} ${Colors.white} ${Colors.transparent}`,
      // },
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
    padding: 10,
    '&$active': {
      color: Colors.white,
    },
  },
  active: {},
  [theme.breakpoints.down(769)]: {
    textTabVideo: (props: { isLandscape?: boolean }) => {
      return {
        fontSize: props.isLandscape ? 10 : 12,
        lineHeight: '17px',
        color: Colors.white_opacity[30],
      }
    },
  },
  [theme.breakpoints.down(376)]: {
    textTabVideo: {
      fontSize: 10,
      padding: 5,
    },
    textTabVideoProgramInfo: {
      fontSize: 10,
      padding: 5,
    },
    selectSubTab: {
      textAlign: 'center',
      padding: 5,
      fontSize: 10,
    },
  },
  // landscapeSize: {
  //   fontSize: 10,
  // },
}))

export default TabSelectContainer
