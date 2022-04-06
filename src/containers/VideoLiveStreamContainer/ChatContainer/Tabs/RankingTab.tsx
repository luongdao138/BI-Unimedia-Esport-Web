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
import Loader from '@components/Loader'

import { useAppSelector } from '@store/hooks'

import { useTranslation } from 'react-i18next'
import { VideoContext } from '@containers/VideoLiveStreamContainer/VideoContext'
import _ from 'lodash'
import { RankingsItem } from '@services/videoTop.services'
import userProfileStore from '@store/userProfile'
import { UserProfile } from '@services/user.service'
import { useRotateScreen } from '@utils/hooks/useRotateScreen'

type RankingTabProps = { type?: string }

export enum RECEIPT_SEND_TABS {
  RECEIPT = 0,
  SEND = 1,
}
export enum ROLE_USER {
  STREAMER = 1,
  VIEWER = 0,
}

const LIMIT_RANK = 10

const RankingTab: React.FC<RankingTabProps> = () => {
  const { isEnabledRankFilter } = useCheckDisplayChat()
  const { liveStreamInfo, setActiveSubTab, rankingListMeta } = useDetailVideo()
  const { activeSubTab } = liveStreamInfo
  const { giverRankInfo, receiverRankInfo } = useContext(VideoContext)
  const { isDisplayedRankingReceipt } = useCheckDisplayChat()

  // eslint-disable-next-line no-console
  const { selectors } = userProfileStore
  const userProfile = useAppSelector<UserProfile>(selectors.getUserProfile)
  const user_uuid = userProfile?.attributes?.uuid
  const { t } = useTranslation('common')
  const classes = useStyles()
  // const [activeSubTab, setActiveSubTab] = useState(SUB_TABS.RANKING.RECEIPT)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(769))
  const { isLandscape } = useRotateScreen()

  const mineGiveInfo: RankingsItem = _.find(giverRankInfo, (v) => {
    return user_uuid && v?.uuid === user_uuid
  })

  useEffect(() => {
    // set default tab is receipt (common) if rank receipt is displayed, else set to ranking send
    const newValue = isDisplayedRankingReceipt ? SUB_TABS.RANKING.RECEIPT : SUB_TABS.RANKING.SEND
    setActiveSubTab(newValue)
  }, [])

  // useEffect(() => {
  //   if (videoId) {
  //     console.log('🚀 ~ useEffect ~ videoId', videoId)
  //     // fetchDonateRanking({ video_id: videoId })
  //   }
  // }, [videoId])

  const giver: Array<RankingsItem> = _.slice(giverRankInfo, 0, LIMIT_RANK)
  const isUserInTopRank = _.findIndex(giver, (v) => v?.uuid === user_uuid) !== -1
  const receiver: Array<RankingsItem> = _.slice(receiverRankInfo, 0, LIMIT_RANK)
  const getContent = () => {
    switch (activeSubTab) {
      case SUB_TABS.RANKING.SEND:
        return (
          <>
            {giverRankInfo.length > 0 ? (
              <Rankings>
                {giver.map((v, k) => {
                  return (
                    <RankingItem
                      key={k}
                      position={k + 1}
                      avatar={<ESAvatar src={v?.user_avatar} alt={v?.user_nickname} size={40} />}
                      tab={SUB_TABS.RANKING.SEND}
                      name={v?.user_nickname}
                      total={v?.total}
                    />
                  )
                })}
                {/* display rank of user if user is not in top rank and logged in and donated point */}
                {/* {mineGiveInfo && ( */}
                {!isUserInTopRank && mineGiveInfo && (
                  <RankingItemSelf
                    position={11}
                    avatar={<ESAvatar src={mineGiveInfo?.user_avatar} alt={mineGiveInfo?.user_nickname} size={40} />}
                    tab={SUB_TABS.RANKING.SEND}
                    name={mineGiveInfo?.user_nickname}
                    total={mineGiveInfo?.total}
                  />
                )}
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
                {receiver.map((v, k) => {
                  const name = v?.master_name || v?.user_nickname
                  return (
                    <RankingItem
                      key={k}
                      position={k + 1}
                      avatar={
                        <ESAvatar
                          src={v?.master_uuid ? v?.master_avatar : v?.user_avatar}
                          alt={name}
                          size={isMobile && isLandscape ? 27 : 40}
                        />
                      }
                      type={v?.type}
                      tab={SUB_TABS.RANKING.RECEIPT}
                      name={name}
                      total={v?.total}
                      isStreamer={v?.master_uuid ? false : true}
                    />
                  )
                })}
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
      {rankingListMeta.pending && (
        <Box textAlign={'center'} className={classes.loaderBox}>
          <Loader />
        </Box>
      )}
      <Box display={'flex'} style={{ overflow: 'hidden' }}>
        {getContent()}
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  loaderBox: {
    flexGrow: 0,
    width: 20,
    height: 20,
    zIndex: 1000,
    left: 0,
    right: 0,
    top: '0px',
    margin: '0 auto',
    '& svg': {
      width: '100%',
      color: 'red',
    },
  },
  noData: {
    marginTop: 20,
    textAlign: 'center',
  },
  rankingContainer: {
    width: '100%',
    height: '100%',
    padding: '16px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  [theme.breakpoints.down(769)]: {
    rankingContainer: {
      marginLeft: 10,
      marginRight: 10,
      background: '#212121',
      padding: '0 8px',
      height: 440,
    },
  },
}))

export default RankingTab
