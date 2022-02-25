import ESAvatar from '@components/Avatar'
import TabsGroup from '@components/TabsGroup'
import { SUB_TABS } from '@constants/common.constants'
import Rankings from '@containers/VideoLiveStreamContainer/Rankings'
import RankingItem from '@containers/VideoLiveStreamContainer/Rankings/RankingItem'
import RankingItemSelf from '@containers/VideoLiveStreamContainer/Rankings/RankingItemSelf'
import useDetailVideo from '@containers/VideoLiveStreamContainer/useDetailVideo'
import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { useCheckDisplayChat } from '@utils/hooks/useCheckDisplayChat'

import { useTranslation } from 'react-i18next'

type RankingTabProps = { type?: string }

export enum RECEIPT_SEND_TABS {
  RECEIPT = 0,
  SEND = 1,
}

const rows = [
  { key: 1, position: 1, name: 'もるチャン', tip: 9999999999, type: '個人' },
  { key: 2, position: 2, name: 'もんもんもん', tip: 10000, type: 'チーム' },
  { key: 3, position: 3, name: 'もるチャン', tip: 10000, type: '個人' },
  { key: 4, position: 4, name: 'もるチャン', tip: 10000, type: '個人' },
  { key: 5, position: '-', name: 'もるチャン', tip: 10000, type: '個人' },
]

const RankingTab: React.FC<RankingTabProps> = () => {
  const { isEnabledRankFilter } = useCheckDisplayChat()
  const { liveStreamInfo, setActiveSubTab } = useDetailVideo()
  const { activeSubTab } = liveStreamInfo

  const { t } = useTranslation('common')
  const classes = useStyles()
  // const [activeSubTab, setActiveSubTab] = useState(SUB_TABS.RANKING.RECEIPT)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(768))

  const isSelf = 5

  const getContent = () => {
    switch (activeSubTab) {
      case SUB_TABS.RANKING.SEND:
        return (
          <Rankings>
            {rows.map((item, index) => {
              if (item.key === isSelf) {
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
        )
      default:
        return (
          <Rankings>
            {rows.map((item, index) => (
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

      <Box>{getContent()}</Box>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.down(769)]: {
    rankingContainer: {
      marginLeft: 10,
      marginRight: 10,
    },
  },
}))

export default RankingTab
