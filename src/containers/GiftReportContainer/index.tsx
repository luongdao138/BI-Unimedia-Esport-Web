import FullScreenLoader from '@components/FullScreenLoader'
import HeaderWithButtonStream from '@components/HeaderWithButtonStream'
import ESLoader from '@components/Loader'
import ESTab from '@components/Tab'
import ESTable from '@components/Table'
import ESTabs from '@components/Tabs'
import { ESRoutes } from '@constants/route.constants'
import useDetailVideo from '@containers/VideoLiveStreamContainer/useDetailVideo'
import i18n from '@locales/i18n'
import { Box, Grid, makeStyles, TableCell, TableRow, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DetailReport from './DetailReport'
import ItemGift from './ItemGift'
import ItemTicket from './ItemTicket'
import useDeliveryReport from './useDeliveryReport'

enum TABS {
  GIFT_REPORT = 0,
  TICKET_REPORT = 1,
  DETAIL_REPORT = 2,
}

enum USE_TICKET {
  FREE_VIDEO = 0,
  PAY_VIDEO = 1,
}

const GiftReportContainer: React.FC<{ default_tab: any }> = ({ default_tab }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const router = useRouter()
  const videoID = router.query.video_id
  const [tab, setTab] = useState(default_tab)
  const { fetchTipReportList, fetchTicketReportList, tipReports, ticketReports, tipReportMeta, ticketReportMeta } = useDeliveryReport()

  const { getVideoDetail, detailVideoResult, meta } = useDetailVideo()

  useEffect(() => {
    const paramDeliveryReport = { uuid: videoID }
    if (paramDeliveryReport.uuid) {
      switch (tab) {
        case TABS.GIFT_REPORT:
          fetchTipReportList(paramDeliveryReport)

          break
        case TABS.TICKET_REPORT:
          fetchTicketReportList(paramDeliveryReport)

          break
        default:
          break
      }
    }
  }, [tab])

  useEffect(() => {
    const paramGetVideoDetail = { video_id: videoID }
    getVideoDetail(paramGetVideoDetail)
  }, [])

  const disableTab = detailVideoResult?.use_ticket === USE_TICKET.PAY_VIDEO ? true : false

  const getTabs = () => {
    return (
      <Grid item xs={12} className={classes.tabsContainer}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs}>
          <ESTab label={t('streaming_gift_report_screen.gift_report')} value={0} className={classes.singleTab} />
          <ESTab label={t('streaming_gift_report_screen.ticket_report')} value={1} className={classes.singleTab} disabled={disableTab} />
          <ESTab label={t('streaming_gift_report_screen.detail_report')} value={2} className={classes.singleTab} />
        </ESTabs>
      </Grid>
    )
  }
  const getDescription = () => {
    return (
      <Box display="flex" height={'100%'} justifyContent="center" flexDirection="column" alignItems="center" mt={3} mb={3}>
        <Typography align={'center'} paragraph variant="subtitle2" className={classes.description} component="p">
          {t('streaming_gift_report_screen.is_total_amount_of_chips_received')}
        </Typography>
        <Typography align={'center'} paragraph variant="subtitle2" className={classes.description} component="p">
          配信者オーナー様に支払われる報酬額は規定の手数料を差し引いた金額になりますので
          出演者様への配分等の本データを使われる際は予めご注意ください。
        </Typography>
      </Box>
    )
  }
  const getContent = () => {
    switch (tab) {
      case TABS.GIFT_REPORT:
        return (
          <Box className={classes.wrapperDescTable}>
            {getDescription()}
            {tipReportMeta.pending ? (
              <Box textAlign="center">
                <ESLoader />
              </Box>
            ) : (
              <>
                {tipReports.gifts.length > 0 ? (
                  <ESTable
                    tableHeader={
                      <TableRow>
                        <TableCell style={{ width: '40%' }} align="center">
                          {t('streaming_gift_report_screen.tip_target_person')}
                        </TableCell>
                        <TableCell style={{ width: '26%' }} align="center">
                          {t('streaming_gift_report_screen.number_of_chips')}
                        </TableCell>
                        <TableCell style={{ width: '33%' }} align="center">
                          {t('streaming_gift_report_screen.total_chips')}
                        </TableCell>
                      </TableRow>
                    }
                  >
                    {tipReports.gifts.map((i, key) => (
                      <ItemGift
                        key={key}
                        image={i.image}
                        name={i.name}
                        point_user_giver={i.user_give_count}
                        point={i.point}
                        type={i.type}
                        streamer={i.streamer}
                      />
                    ))}
                  </ESTable>
                ) : (
                  <ESTable
                    tableHeader={
                      <TableRow>
                        <TableCell style={{ width: '40%' }} align="center">
                          {t('streaming_gift_report_screen.tip_target_person')}
                        </TableCell>
                        <TableCell style={{ width: '26%' }} align="center">
                          {t('streaming_gift_report_screen.number_of_chips')}
                        </TableCell>
                        <TableCell style={{ width: '33%' }} align="center">
                          {t('streaming_gift_report_screen.total_chips')}
                        </TableCell>
                      </TableRow>
                    }
                  >
                    <TableRow key={1}>
                      <TableCell align="center" colSpan={3}>
                        <Typography align="center" className={classes.noTipReceived}>
                          {t('streaming_gift_report_screen.no_tip_received')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </ESTable>
                )}
              </>
            )}
          </Box>
        )
      case TABS.TICKET_REPORT:
        return (
          <Box mt={3} mb={3} className={classes.wrapperTicketReport}>
            {ticketReportMeta.pending ? (
              <Box textAlign="center">
                <ESLoader />
              </Box>
            ) : (
              <>
                {ticketReports.tickets.length > 0 ? (
                  <ESTable
                    classTable={classes.ticketTable}
                    tableHeader={
                      <TableRow>
                        <TableCell style={{ width: '33%' }} align="center">
                          {t('streaming_gift_report_screen.buyer')}
                        </TableCell>
                        <TableCell style={{ width: '33%' }} align="center">
                          {t('point_management_tab.purchase_date')}
                        </TableCell>
                        <TableCell style={{ width: '33%' }} align="center">
                          {t('streaming_gift_report_screen.payment_points')}
                        </TableCell>
                      </TableRow>
                    }
                  >
                    {ticketReports.tickets.map((i, index) => (
                      <ItemTicket
                        key={index}
                        created_at={i.created_at}
                        image_url={i.image_url}
                        nickname={i.nickname}
                        point={i.point}
                        type={i.type}
                      />
                    ))}
                  </ESTable>
                ) : (
                  <Box>
                    <Typography align="center">{t('streaming_gift_report_screen.the_ticket_was_not_purchased')}</Typography>
                  </Box>
                )}
              </>
            )}
          </Box>
        )
      case TABS.DETAIL_REPORT:
        return (
          <Box mt={4} className={classes.wrapperDetailReport}>
            <DetailReport videoId={videoID} />
          </Box>
        )
      default:
        break
    }
    return (
      <Box className={classes.forbiddenMessageContainer}>
        <Typography variant="h3">{i18n.t('common:common:private')}</Typography>
      </Box>
    )
  }
  if (meta.pending) {
    return (
      <Box textAlign="center">
        <FullScreenLoader open={meta.pending} />
      </Box>
    )
  }

  return (
    <>
      <HeaderWithButtonStream
        title={t('streaming_gift_report_screen.delivery_report')}
        onClickBack={() => router.push(ESRoutes.VIDEO_STREAMING_MANAGEMENT)}
      />
      <Box className={classes.giftReportContainer}>
        <Grid container direction="column" className={classes.giftReportContent}>
          {getTabs()}
          {getContent()}
        </Grid>
      </Box>
    </>
  )
}
export default GiftReportContainer

const useStyles = makeStyles((theme) => ({
  tabsContainer: {
    display: 'flex',
    width: '100%',
    borderBottomColor: Colors.text[300],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
  tabs: {
    display: 'flex',
    width: '100%',
    overflow: 'hidden',
    paddingLeft: 24,
  },
  forbiddenMessageContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  description: {
    color: Colors.secondary,
    maxWidth: '546px',
    marginBottom: 0,
  },
  giftReportContainer: {
    marginLeft: 70,
    marginRight: 70,
  },

  [theme.breakpoints.down('md')]: {
    giftReportContainer: {
      marginLeft: 16,
      marginRight: 16,
    },
  },
  [theme.breakpoints.down('sm')]: {
    tabs: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    wrapperDescTable: {
      marginBottom: 20,
      marginLeft: 16,
      marginRight: 16,
    },
    noTipReceived: {
      fontSize: 10,
    },
  },
  [theme.breakpoints.down('xs')]: {
    giftReportContainer: {
      marginLeft: 0,
      marginRight: 0,
    },
    tabs: {
      paddingLeft: 16,
      paddingRight: 16,
      justifyContent: 'center',
    },
    wrapperDescTable: {
      marginBottom: 20,
      marginLeft: 16,
      marginRight: 16,
    },
    wrapperDetailReport: {
      marginLeft: 16,
      marginRight: 16,
    },
    wrapperTicketReport: {
      marginLeft: 16,
      marginRight: 16,
    },
    ticketTable: {
      width: '120%',
    },
    giftReportContent: {
      flexWrap: 'inherit',
    },
  },
  [theme.breakpoints.down(419)]: {
    tabs: {
      display: 'flex',
      width: '100%',
      paddingRight: '24px',
    },
    singleTab: {
      minWidth: 'unset',
    },
    description: {
      fontSize: 12,
    },
  },

  [theme.breakpoints.down(321)]: {
    tabs: {
      display: 'flex',
      width: '100%',
      paddingLeft: 0,
      paddingRight: 0,
    },
    singleTab: {
      width: 'calc(100vw / 3)',
      minWidth: 'unset',
    },
  },
}))
