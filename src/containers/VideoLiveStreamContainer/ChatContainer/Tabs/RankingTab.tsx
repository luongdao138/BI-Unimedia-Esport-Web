import ESAvatar from '@components/Avatar'
import TabsGroup from '@components/TabsGroup'
import Rankings from '@containers/VideoLiveStreamContainer/Rankings'
import RankingItem from '@containers/VideoLiveStreamContainer/Rankings/RankingItem'
import RankingItemSelf from '@containers/VideoLiveStreamContainer/Rankings/RankingItemSelf'
import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SUB_TABS } from '..'

type RankingTabProps = { type?: string; activeSubTab?: number }

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

const RankingTab: React.FC<RankingTabProps> = ({ activeSubTab }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [receiptSendTab, setReceiptSendTab] = useState(SUB_TABS.RANKING.RECEIPT)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(768))

  const isSelf = 5

  useEffect(() => {
    if (activeSubTab === SUB_TABS.RANKING.RECEIPT) {
      setReceiptSendTab(SUB_TABS.RANKING.RECEIPT)
    } else {
      setReceiptSendTab(SUB_TABS.RANKING.SEND)
    }
  }, [activeSubTab])

  const getContent = () => {
    switch (receiptSendTab) {
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
          value={receiptSendTab}
          onClick={(value) => setReceiptSendTab(value)}
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
