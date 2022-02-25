import ESAvatar from '@components/Avatar'
import TabsGroup from '@components/TabsGroup'
import { SUB_TABS } from '@constants/common.constants'
import Rankings from '@containers/VideoLiveStreamContainer/Rankings'
import RankingItem from '@containers/VideoLiveStreamContainer/Rankings/RankingItem'
import RankingItemSelf from '@containers/VideoLiveStreamContainer/Rankings/RankingItemSelf'
import useDetailVideo from '@containers/VideoLiveStreamContainer/useDetailVideo'
import useRankingVideo from '@containers/VideoLiveStreamContainer/useRankingVideo'
import { Box, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { useEffect } from 'react'

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
  const { liveStreamInfo, setActiveSubTab } = useDetailVideo()
  const { fetchRakingVideo, rankingsGiver, rankingsReceive } = useRankingVideo()
  const { activeSubTab } = liveStreamInfo

  const { t } = useTranslation('common')
  const classes = useStyles()
  // const [activeSubTab, setActiveSubTab] = useState(SUB_TABS.RANKING.RECEIPT)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(768))

  const isSelf = 5
  const videoId = liveStreamInfo.videoDetailData.uuid

  useEffect(() => {
    if (videoId) {
      fetchRakingVideo({ video_id: videoId })
    }
  }, [videoId])

  const getContent = () => {
    switch (activeSubTab) {
      case SUB_TABS.RANKING.SEND:
        return (
          <>
            {rankingsGiver.length > 0 ? (
              <Rankings>
                {rankingsGiver.map((item, index) => {
                  if (index === isSelf) {
                    return (
                      <RankingItemSelf
                        key={index}
                        position={item.position}
                        avatar={<ESAvatar src="" alt="avatar" size={40} />}
                        tab={SUB_TABS.RANKING.SEND}
                        name={item.name}
                        tip={item.tip}
                        self={false}
                      />
                    )
                  }
                  return (
                    <RankingItem
                      key={index}
                      position={item.position}
                      avatar={<ESAvatar src="" alt="avatar" size={40} />}
                      tab={SUB_TABS.RANKING.SEND}
                      name={item.name}
                      tip={item.tip}
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
            {rankingsReceive.length > 0 ? (
              <Rankings>
                {rankingsReceive.map((item, index) => (
                  <RankingItem
                    key={index}
                    position={item.position}
                    avatar={<ESAvatar src="" alt="avatar" size={40} />}
                    type={item.type}
                    tab={SUB_TABS.RANKING.RECEIPT}
                    name={item.name}
                    tip={item.tip}
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

  return (
    <Box className={classes.rankingContainer}>
      {!isMobile && (
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
