import ESTab from '@components/Tab'
import ESTabs from '@components/Tabs'
import { VIDEO_TABS } from '@constants/common.constants'
import i18n from '@locales/i18n'
import { Box } from '@material-ui/core'
import { useRotateScreen } from '@utils/hooks/useRotateScreen'
import React, { memo, useEffect, useState } from 'react'
import useStyles from '../styles'

interface Props {
  onChange?: (tab: number) => void
  isDisplayedRankingTab: boolean
  isSwitchingTabRef: any
}

const TabsContainer: React.FC<Props> = ({ isDisplayedRankingTab, onChange, isSwitchingTabRef }) => {
  const { isLandscape } = useRotateScreen()
  const classes = useStyles({ isLandscape })
  const [value, setValue] = useState<number>(VIDEO_TABS.CHAT)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(value)
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [value])

  return (
    <Box className={classes.tabsContainer}>
      <ESTabs
        value={value}
        onChange={(_, v) => {
          if (isSwitchingTabRef) {
            isSwitchingTabRef.current = v === VIDEO_TABS.RANKING ? true : false
          }
          setValue(v)
        }}
        className={classes.tabs}
        scrollButtons="off"
        variant="scrollable"
      >
        <ESTab className={classes.singleTab} label={i18n.t('common:live_stream_screen.chat_header')} value={VIDEO_TABS.CHAT} />
        {isDisplayedRankingTab && (
          <ESTab className={classes.singleTab} label={i18n.t('common:live_stream_screen.ranking_tab_title')} value={VIDEO_TABS.RANKING} />
        )}
      </ESTabs>
      {/* <div>
      <button style={{ background: value === VIDEO_TABS.CHAT ? 'red' : '#fff' }} onClick={() => setValue(VIDEO_TABS.CHAT)}>Chat </button>
      <button onClick={() => setValue(VIDEO_TABS.RANKING)} style={{ background: value === VIDEO_TABS.RANKING ? 'red' : '#fff' }}>Ranking</button>
    </div> */}
    </Box>
  )
}

export default memo(TabsContainer)