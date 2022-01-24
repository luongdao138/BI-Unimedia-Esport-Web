import { Box, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'

import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
import { SUB_TABS, VIDEO_TABS } from '../ChatContainer'
import RankingTab from '../ChatContainer/Tabs/RankingTab'

const DEFAULT_SELECT_TAB = -1

export const videoTabs = [
  {
    title: 'Chat',
    value: VIDEO_TABS.CHAT,
    subTabs: [
      {
        title: 'All mess',
        value: SUB_TABS.MESS.ALL,
      },
      {
        title: 'Tip mess',
        value: SUB_TABS.MESS.TIP,
      },
    ],
  },
  {
    title: 'Ranking',
    value: VIDEO_TABS.RANKING,
    subTabs: [
      {
        title: 'All mess',
        value: SUB_TABS.RANKING.SEND,
      },
      {
        title: 'Tip mess',
        value: SUB_TABS.RANKING.GET,
      },
    ],
  },
  {
    title: 'Program info',
    value: VIDEO_TABS.PROGRAM_INFO,
  },
]

const TabSelectContainer: React.FC = () => {
  // const { t } = useTranslation('common')
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState(VIDEO_TABS.CHAT)
  const [activeSelectTab, setActiveSelectTab] = useState(DEFAULT_SELECT_TAB)
  const [activeSubTab, setActiveSubTab] = useState(SUB_TABS.MESS.ALL)
  // const [isRankingTab, setRankingTab] = useState(false)

  const getContent = () => {
    switch (activeTab) {
      case VIDEO_TABS.CHAT:
        if (activeSubTab === SUB_TABS.MESS.TIP) {
          return <h2>Tip Mess</h2>
        } else {
          return <h2>All Mess</h2>
        }

      case VIDEO_TABS.RANKING:
        // if (activeSubTab === SUB_TABS.RANKING.SEND) {
        //   return <h2>RANKING SEND</h2>
        // } else {
        //   return <h2>RANKING GET</h2>
        // }
        return <RankingTab />

      default:
        return <h1>PROGRAM_INFO_TAB</h1>
    }
  }

  // const classSubTab = `${classes.selectSubTab} ${tab === VIDEO_TABS.CHAT && messageTab === SUB_TABS.MESS.ALL && classes.active}`

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
                  className={`${classes.textTabVideo} ${activeTab === item.value && classes.active}`}
                >
                  {item.title}
                  {/* {t('live_stream_screen.chat_header')} */}
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
        {/* <Box className={classes.tab}>
          <Box className={classes.boxTab}>
            <Typography
              onClick={() => onChangeTab(VIDEO_TABS.CHAT)}
              className={`${classes.textTabVideo} ${tab === VIDEO_TABS.CHAT && classes.active}`}
            >
              {t('live_stream_screen.chat_header')}
            </Typography>
            {tab === VIDEO_TABS.CHAT && isChatTab && (
              <Box className={classes.subTab}>
                <Typography onClick={() => onChangeMessageTab(SUB_TABS.MESS.ALL)} className={classSubTab}>
                  {t('live_stream_screen.all_mess_tab_title')}
                </Typography>
                <Typography onClick={() => onChangeMessageTab(SUB_TABS.MESS.TIP)} className={classSubTab}>
                  {t('live_stream_screen.tip_mess_tab_title')}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box className={classes.tab}>
          <Box className={classes.boxTab}>
            <Typography
              onClick={() => onChangeTab(VIDEO_TABS.RANKING)}
              className={`${classes.textTabVideo} ${tab === VIDEO_TABS.RANKING && classes.active} `}
            >
              {t('live_stream_screen.ranking_tab_title')}
            </Typography>
            {tab === VIDEO_TABS.RANKING && (
              <Box className={classes.subTab}>
                <Typography className={classSubTab}>{t('live_stream_screen_chat.receipt')}</Typography>
                <Typography className={classSubTab}>{t('live_stream_screen_chat.send')}</Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box className={classes.tab}>
          <Box className={classes.boxTab}>
            <Typography
              onClick={() => onChangeTab(VIDEO_TABS.PROGRAM_INFO)}
              className={`${classes.textTab} ${tab === VIDEO_TABS.PROGRAM_INFO && classes.active}  `}
            >
              {t('live_stream_screen.program_info')}
            </Typography>
          </Box>
        </Box> */}
      </Box>
      {getContent()}
      {/* {getContentSubTab()} */}
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
  textTabVideo: {
    borderBottom: '2px solid #4D4D4D',
    padding: 10,
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
