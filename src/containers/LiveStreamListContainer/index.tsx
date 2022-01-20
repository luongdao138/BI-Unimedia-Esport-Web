import HeaderWithButton from '@components/HeaderWithButton'
import ESSelect from '@components/Select'
import { Box, Grid, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'

import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'
import ESLoader from '@components/FullScreenLoader'
import useLiveStreamReport from './useLiveStreamReport'
import { CommonHelper, getTimeZone } from '@utils/helpers/CommonHelper'
import StreamDataItem from './StreamDataItem'

const LiveStreamListContainer: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(576))
  const { width: itemWidthMobile } = useWindowDimensions(48)
  const { fetchLiveStreamReportData, itemLiveStreamReport, meta, sortOptionsListDates } = useLiveStreamReport()
  const [enteredSort, setEnteredSort] = useState<string>('')

  useEffect(() => {
    if (enteredSort) {
      if (enteredSort === t('live_stream_list_screen.current_month')) {
        fetchLiveStreamReportData({ period: '', timezone: getTimeZone() })
      } else {
        fetchLiveStreamReportData({ period: enteredSort, timezone: getTimeZone() })
      }
    } else {
      fetchLiveStreamReportData({ period: '', timezone: getTimeZone() })
    }
  }, [enteredSort])

  const onChangeSort = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEnteredSort(event.target.value)
  }
  const totalTimeVideo = itemLiveStreamReport['total_time_video'] || 0
  const totalTimeUserWatch = itemLiveStreamReport['total_time_user_watch'] || 0
  const totalUserWatch = itemLiveStreamReport['total_user_watch'] || 0
  const totalUserChat = itemLiveStreamReport['total_user_chat'] || 0
  const totalUserChatPremium = itemLiveStreamReport['total_user_chat_premium'] || 0
  const totalPoint = itemLiveStreamReport['total_point'] || 0
  if (meta.error) {
    return (
      <Box>
        <HeaderWithButton title={t('live_stream_list_screen.title')} />
      </Box>
    )
  }
  return (
    <Box>
      <HeaderWithButton title={t('live_stream_list_screen.title')} />
      <Box className={classes.container}>
        <Grid item xs={12} md={7}>
          <ESSelect
            fullWidth
            placeholder={t('live_stream_list_screen.current_month')}
            displayEmpty
            size="big"
            name={'query'}
            disabled={false}
            className={classes.comboBox}
            value={enteredSort}
            onChange={onChangeSort}
          >
            {sortOptionsListDates &&
              sortOptionsListDates.map((date, index) => (
                <option key={index} value={date}>
                  {date === t('live_stream_list_screen.current_month') ? date : CommonHelper.formatDateYearMonth(date)}
                </option>
              ))}
          </ESSelect>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: 16 }}>
          {isMobile ? (
            <>
              <Box style={{ display: 'flex', width: '100%', paddingLeft: 22, paddingRight: 22, paddingBottom: 20 }}>
                <StreamDataItem
                  title={t('live_stream_list_screen.total_time_video')}
                  value={totalTimeVideo}
                  containerStyle={{ width: itemWidthMobile }}
                />
              </Box>
              <Box style={{ display: 'flex', width: '100%', paddingLeft: 22, paddingRight: 22, paddingBottom: 20 }}>
                <StreamDataItem
                  title={t('live_stream_list_screen.total_time_user_watch')}
                  value={totalTimeUserWatch}
                  containerStyle={{ width: itemWidthMobile }}
                />
              </Box>
              <Box style={{ display: 'flex', width: '100%', paddingLeft: 22, paddingRight: 22, paddingBottom: 20 }}>
                <StreamDataItem
                  title={t('live_stream_list_screen.total_user_watch')}
                  value={totalUserWatch}
                  containerStyle={{ width: itemWidthMobile }}
                />
              </Box>
              <Box style={{ display: 'flex', width: '100%', paddingLeft: 22, paddingRight: 22, paddingBottom: 20 }}>
                <StreamDataItem
                  title={t('live_stream_list_screen.total_user_chat')}
                  value={totalUserChat}
                  containerStyle={{ width: itemWidthMobile }}
                />
              </Box>
              <Box style={{ display: 'flex', width: '100%', paddingLeft: 22, paddingRight: 22, paddingBottom: 20 }}>
                <StreamDataItem
                  title={t('live_stream_list_screen.total_user_chat_premium')}
                  value={totalUserChatPremium}
                  containerStyle={{ width: itemWidthMobile }}
                />
              </Box>
              <Box style={{ display: 'flex', width: '100%', paddingLeft: 22, paddingRight: 22, paddingBottom: 20 }}>
                <StreamDataItem
                  title={t('live_stream_list_screen.total_point')}
                  value={totalPoint}
                  containerStyle={{ width: itemWidthMobile }}
                />
              </Box>
            </>
          ) : (
            <>
              <Grid item xs={6}>
                <StreamDataItem title={t('live_stream_list_screen.total_time_video')} value={totalTimeVideo} />
              </Grid>
              <Grid item xs={6}>
                <StreamDataItem title={t('live_stream_list_screen.total_time_user_watch')} value={totalTimeUserWatch} />
              </Grid>
              <Grid item xs={6}>
                <StreamDataItem title={t('live_stream_list_screen.total_user_watch')} value={totalUserWatch} />
              </Grid>
              <Grid item xs={6}>
                <StreamDataItem title={t('live_stream_list_screen.total_user_chat')} value={totalUserChat} />
              </Grid>
              <Grid item xs={6}>
                <StreamDataItem title={t('live_stream_list_screen.total_user_chat_premium')} value={totalUserChatPremium} />
              </Grid>
              <Grid item xs={6}>
                <StreamDataItem title={t('live_stream_list_screen.total_point')} value={totalPoint} />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
      {!meta.loaded && meta.pending && <ESLoader open={meta.pending} />}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  comboBox: {
    marginTop: 10,
  },
  titleStyle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 40,
  },
  numberStyle: {
    fontSize: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: Colors.white,
    wordBreak: 'break-word',
    textAlign: 'right',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.black,
    border: `1px solid ${Colors.grey['200']}`,
    borderRadius: 4,
    padding: '8px 12px 8px 12px',
    height: '100%',
  },
  [theme.breakpoints.down(576)]: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      margin: 0,
      padding: '0 40px 0 40px',
    },
  },
}))
export default LiveStreamListContainer
