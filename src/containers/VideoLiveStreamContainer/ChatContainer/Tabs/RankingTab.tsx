import ESAvatar from '@components/Avatar'
import TabsGroup from '@components/TabsGroup'
import Rankings from '@containers/VideoLiveStreamContainer/Rankings'
import RankingItem from '@containers/VideoLiveStreamContainer/Rankings/RankingItem'
import RankingItemSelf from '@containers/VideoLiveStreamContainer/Rankings/RankingItemSelf'
import { Box } from '@material-ui/core'

import { useState } from 'react'
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
  const { t } = useTranslation('common')
  // const classes = useStyles()
  const [receiptSendTab, setReceiptSendTab] = useState(RECEIPT_SEND_TABS.RECEIPT)

  const isSelf = 5

  const getContent = () => {
    switch (receiptSendTab) {
      case RECEIPT_SEND_TABS.SEND:
        return (
          <Rankings>
            {rows.map((item, index) => {
              if (item.key === isSelf) {
                return (
                  <RankingItemSelf
                    key={index}
                    position={item.position}
                    avatar={<ESAvatar src="" alt="avatar" size={40} />}
                    tab={RECEIPT_SEND_TABS.SEND}
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
                  tab={RECEIPT_SEND_TABS.SEND}
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
                tab={RECEIPT_SEND_TABS.RECEIPT}
                name={item.name}
                tip={item.tip}
              />
            ))}
          </Rankings>
        )
    }
  }

  return (
    <Box>
      <TabsGroup
        data={[
          {
            value: RECEIPT_SEND_TABS.RECEIPT,
            label: t('live_stream_screen_chat.receipt'),
          },
          {
            value: RECEIPT_SEND_TABS.SEND,
            label: t('live_stream_screen_chat.send'),
          },
        ]}
        value={receiptSendTab}
        onClick={(value) => setReceiptSendTab(value)}
      />
      <Box>{getContent()}</Box>
    </Box>
  )
}

// const useStyles = makeStyles(() => ({
// }))

export default RankingTab
