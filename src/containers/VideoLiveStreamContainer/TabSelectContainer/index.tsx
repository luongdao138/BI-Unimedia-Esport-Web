import { Box, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'

import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
import { SUB_TABS, VIDEO_TABS } from '@constants/common.constants'

import i18n from '@locales/i18n'
import useDetailVideo from '../useDetailVideo'
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
}

const TabSelectContainer: React.FC<TabSelectProps> = ({ sideChatContainer }) => {
  const { liveStreamInfo, setActiveTab, setActiveSubTab } = useDetailVideo()

  const { activeTab, activeSubTab } = liveStreamInfo
  // const { t } = useTranslation('common')
  const classes = useStyles()
  // const [activeTab, setActiveTab] = useState(VIDEO_TABS.CHAT)
  const [activeSelectTab, setActiveSelectTab] = useState(DEFAULT_SELECT_TAB)
  // const [activeSubTab, setActiveSubTab] = useState(SUB_TABS.MESS.ALL)
  // const [isRankingTab, setRankingTab] = useState(false)

  const getContent = () => {
    switch (activeTab) {
      case VIDEO_TABS.PROGRAM_INFO:
        // if (activeSubTab === SUB_TABS.MESS.TIP) {
        //   return <h2>Tip Mess</h2>
        // } else {
        //   return <h2>All Mess</h2>
        // }
        return <h1>PROGRAM_INFO_TAB</h1>

      // case VIDEO_TABS.RANKING:
      //   if (activeSubTab === SUB_TABS.RANKING.SEND) {
      //     return <RankingTab />
      //   } else {
      //     return <RankingTab />
      //   }
      default:
        return sideChatContainer()
    }
  }
  return (
    <>
      <Box display="flex" width="100%" className={classes.container}>
        {videoTabs.map((item, k) => {
          return (
            <Box className={classes.tab} key={k}>
              <Box className={classes.boxTab}>
                <Typography
                  onClick={() => {
                    if (item?.subTabs) {
                      setActiveSelectTab(item?.value)
                    } else {
                      setActiveTab(item.value)
                    }
                  }}
                  className={`${item?.subTabs ? classes.textTabVideo : classes.textTabVideoProgramInfo} ${
                    activeTab === item.value && classes.active
                  }`}
                >
                  {item.title}
                </Typography>
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

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: Colors.black,
  },
  tab: {
    width: 'calc(100%/3)',
    padding: 10,
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
  },
  subTab: {
    width: '100%',
    position: 'absolute',
    top: '100%',
    backgroundColor: Colors.black_opacity['30'],
    zIndex: 99,
    display: 'none',
    '&$active': {
      display: 'block',
    },
  },
  textTabVideoProgramInfo: {
    borderBottom: '2px solid #4D4D4D',
    padding: 10,
    textAlign: 'left',
    position: 'relative',
    '&$active': {
      color: Colors.white,
      borderBottom: `2px solid ${Colors.white}`,
    },
  },
  textTabVideo: {
    borderBottom: '2px solid #4D4D4D',
    padding: 10,
    paddingRight: 30,
    textAlign: 'left',
    position: 'relative',
    '&::before': {
      right: 15,
      top: '33%',
      content: '""',
      position: 'absolute',
      border: `4px solid ${Colors.grey['200']}`,
      borderColor: `${Colors.transparent} ${Colors.grey['200']} ${Colors.grey['200']} ${Colors.transparent}`,
      transform: 'rotate(45deg)',
    },
    '&$active': {
      color: Colors.white,
      borderBottom: `2px solid ${Colors.white}`,
      '&::before': {
        // transform: 'rotate(225deg)',
        borderColor: `${Colors.transparent} ${Colors.white} ${Colors.white} ${Colors.transparent}`,
      },
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
}))

export default TabSelectContainer
