import ESAvatar from '@components/Avatar'
import TabsGroup from '@components/TabsGroup'
import { SUB_TABS } from '@constants/common.constants'
import Rankings from '@containers/VideoLiveStreamContainer/Rankings'
import RankingItem from '@containers/VideoLiveStreamContainer/Rankings/RankingItem'
import RankingItemSelf from '@containers/VideoLiveStreamContainer/Rankings/RankingItemSelf'
import useDetailVideo from '@containers/VideoLiveStreamContainer/useDetailVideo'
import { Box, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { useCheckDisplayChat } from '@utils/hooks/useCheckDisplayChat'
import { useEffect } from 'react'
import ESLoader from '@components/Loader'

import { useTranslation } from 'react-i18next'

type RankingTabProps = { type?: string }

export enum RECEIPT_SEND_TABS {
  RECEIPT = 0,
  SEND = 1,
}

// const rows = [
//   { key: 1, position: 1, name: 'もるチャン', tip: 9999999999, type: '個人' },
//   { key: 2, position: 2, name: 'もんもんもん', tip: 10000, type: 'チーム' },
//   { key: 3, position: 3, name: 'もるチャン', tip: 10000, type: '個人' },
//   { key: 4, position: 4, name: 'もるチャン', tip: 10000, type: '個人' },
//   { key: 5, position: '-', name: 'もるチャン', tip: 10000, type: '個人' },
// ]

const RankingTab: React.FC<RankingTabProps> = () => {
  const { isEnabledRankFilter } = useCheckDisplayChat()
  const { liveStreamInfo, setActiveSubTab, giverRankings, receiverRankings, rankingListMeta } = useDetailVideo()
  const { activeSubTab } = liveStreamInfo

  const { t } = useTranslation('common')
  const classes = useStyles()
  // const [activeSubTab, setActiveSubTab] = useState(SUB_TABS.RANKING.RECEIPT)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(768))

  const isSelf = 5
  useEffect(() => {
    setActiveSubTab(SUB_TABS.RANKING.RECEIPT)
  }, [])

  // useEffect(() => {
  //   if (videoId) {
  //     console.log('🚀 ~ useEffect ~ videoId', videoId)
  //     // fetchDonateRanking({ video_id: videoId })
  //   }
  // }, [videoId])

  const getContent = () => {
    switch (activeSubTab) {
      case SUB_TABS.RANKING.SEND:
        return (
          <>
            {giverRankings.length > 0 ? (
              <Rankings>
                {giverRankings.map((item, index) => {
                  if (index === isSelf) {
                    return (
                      <RankingItemSelf
                        key={index}
                        position={1}
                        avatar={<ESAvatar src="" alt="avatar" size={40} />}
                        tab={SUB_TABS.RANKING.SEND}
                        name={item.nickname}
                        total={item.total}
                        self={false}
                      />
                    )
                  }
                  return (
                    <RankingItem
                      key={index}
                      position={1}
                      avatar={<ESAvatar src="" alt="avatar" size={40} />}
                      tab={SUB_TABS.RANKING.SEND}
                      name={item.nickname}
                      total={item.total}
                      self={false}
                    />
                  )
                })}
              </Rankings>
            ) : (
              <Typography className={classes.noData}>{t('live_stream_screen.no_ranking')}</Typography>
            )}
          </>
        )
      default:
        return (
          <>
            {receiverRankings.length > 0 ? (
              <Rankings>
                {receiverRankings.map((item, index) => (
                  <RankingItem
                    key={index}
                    position={1}
                    avatar={<ESAvatar src="" alt="avatar" size={40} />}
                    type={0}
                    tab={SUB_TABS.RANKING.RECEIPT}
                    name={item.nickname}
                    total={item.total}
                  />
                ))}
              </Rankings>
            ) : (
              <Typography className={classes.noData}>{t('live_stream_screen.no_ranking')}</Typography>
            )}
          </>
        )
    }
  }

  if (rankingListMeta.pending) {
    return (
      <Box textAlign={'center'}>
        <ESLoader />
      </Box>
    )
  }

  return (
    <Box className={classes.rankingContainer}>
      {!isMobile && isEnabledRankFilter && (
        <TabsGroup
          data={[
            {
              value: SUB_TABS.RANKING.RECEIPT,
              label: t('live_stream_screen_chat.receipt'),
            },
            {
              value: SUB_TABS.RANKING.SEND,
              label: t('live_stream_screen_chat.send'),
            },
          ]}
          value={activeSubTab}
          onClick={(value) => setActiveSubTab(value)}
        />
      )}

      <Box>{getContent()}</Box>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  noData: {
    marginTop: 20,
    textAlign: 'center',
  },
  [theme.breakpoints.down(769)]: {
    rankingContainer: {
      marginLeft: 10,
      marginRight: 10,
    },
  },
}))

export default RankingTab
