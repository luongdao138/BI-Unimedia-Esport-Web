import ESAvatar from '@components/Avatar'
import TabsGroup from '@components/TabsGroup'
import { SUB_TABS } from '@constants/common.constants'
import Rankings from '@containers/VideoLiveStreamContainer/Rankings'
import RankingItem from '@containers/VideoLiveStreamContainer/Rankings/RankingItem'
import RankingItemSelf from '@containers/VideoLiveStreamContainer/Rankings/RankingItemSelf'
import useDetailVideo from '@containers/VideoLiveStreamContainer/useDetailVideo'
import { Box, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { useCheckDisplayChat } from '@utils/hooks/useCheckDisplayChat'
import { useContext, useEffect } from 'react'
import ESLoader from '@components/Loader'

import { useTranslation } from 'react-i18next'
import { VideoContext } from '@containers/VideoLiveStreamContainer/VideoContext'
import _ from 'lodash'
import { RankingsItem } from '@services/videoTop.services'

type RankingTabProps = { type?: string }

export enum RECEIPT_SEND_TABS {
  RECEIPT = 0,
  SEND = 1,
}

const LIMIT_RANK = 10
// const rows = [
//   { key: 1, position: 1, name: 'もるチャン', tip: 9999999999, type: '個人' },
//   { key: 2, position: 2, name: 'もんもんもん', tip: 10000, type: 'チーム' },
//   { key: 3, position: 3, name: 'もるチャン', tip: 10000, type: '個人' },
//   { key: 4, position: 4, name: 'もるチャン', tip: 10000, type: '個人' },
//   { key: 5, position: '-', name: 'もるチャン', tip: 10000, type: '個人' },
// ]

const RankingTab: React.FC<RankingTabProps> = () => {
  const { isEnabledRankFilter } = useCheckDisplayChat()
  const { liveStreamInfo, setActiveSubTab, rankingListMeta } = useDetailVideo()
  const { activeSubTab } = liveStreamInfo
  const { giverRankInfo, receiverRankInfo } = useContext(VideoContext)
  // eslint-disable-next-line no-console
  console.log('🚀 ~ receiverRankInfo--000', receiverRankInfo)

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

  const giver: Array<RankingsItem> = _.slice(giverRankInfo, 0, LIMIT_RANK)
  const receiver: Array<RankingsItem> = _.slice(receiverRankInfo, 0, LIMIT_RANK)
  const getContent = () => {
    switch (activeSubTab) {
      case SUB_TABS.RANKING.SEND:
        return (
          <>
            {giverRankInfo.length > 0 ? (
              <Rankings>
                {giver.map((v, k) => {
                  if (k === isSelf) {
                    return (
                      <RankingItemSelf
                        key={k}
                        position={1}
                        avatar={<ESAvatar src={v?.user_avatar} alt="avatar" size={40} />}
                        tab={SUB_TABS.RANKING.SEND}
                        name={v?.user_nickname}
                        total={v?.total}
                        self={false}
                      />
                    )
                  }
                  return (
                    <RankingItem
                      key={k}
                      position={k + 1}
                      avatar={<ESAvatar src={v?.user_avatar} alt="avatar" size={40} />}
                      tab={SUB_TABS.RANKING.SEND}
                      name={v?.user_nickname}
                      total={v?.total}
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
            {receiverRankInfo.length > 0 ? (
              <Rankings>
                {receiver.map((v, k) => (
                  <RankingItem
                    key={k}
                    position={k + 1}
                    avatar={<ESAvatar src={v?.master_uuid ? v?.master_avatar : v?.user_avatar} alt="avatar" size={40} />}
                    type={v?.type}
                    tab={SUB_TABS.RANKING.RECEIPT}
                    name={v?.master_name || v?.user_nickname}
                    total={v?.total}
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
