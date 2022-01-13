import HeaderWithButtonStream from '@components/HeaderWithButtonStream'
import ESTab from '@components/Tab'
import ESTable from '@components/Table'
import ESTabs from '@components/Tabs'
import { ESRoutes } from '@constants/route.constants'
import i18n from '@locales/i18n'
import { Box, Grid, makeStyles, TableCell, TableRow, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DetailReport from './DetailReport'
import ItemGift from './ItemGift'
import ItemTicket from './ItemTicket'

enum TABS {
  GIFT_REPORT = 0,
  TICKET_REPORT = 1,
  DETAIL_REPORT = 2,
}
const rows = [1, 2, 3, 4, 5]
const GiftReportContainer: React.FC<{ default_tab: any }> = ({ default_tab }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const router = useRouter()
  const [tab, setTab] = useState(default_tab)

  const getTabs = () => {
    return (
      <Grid item xs={12} className={classes.tabsContainer}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs}>
          <ESTab label={t('streaming_gift_report_screen.gift_report')} value={0} className={classes.singleTab} />
          <ESTab label={t('streaming_gift_report_screen.ticket_report')} value={1} className={classes.singleTab} />
          <ESTab label={t('streaming_gift_report_screen.detail_report')} value={2} className={classes.singleTab} />
        </ESTabs>
      </Grid>
    )
  }
  const getDescription = () => {
    return (
      <Box display="flex" height={'100%'} justifyContent="center" flexDirection="column" alignItems="center" mt={3} mb={3}>
        <Typography align={'center'} paragraph variant="subtitle2" className={classes.description} component="p">
          は受け取ったチップの総額です。
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
          <>
            {getDescription()}
            <ESTable
              tableHeader={
                <TableRow>
                  <TableCell style={{ width: '33%' }} align="center">
                    チップ対象者
                  </TableCell>
                  <TableCell style={{ width: '33%' }} align="center">
                    チップ回数
                  </TableCell>
                  <TableCell style={{ width: '33%' }} align="center">
                    合計チップ
                  </TableCell>
                </TableRow>
              }
            >
              {rows.map((row) => (
                <ItemGift key={row} />
              ))}
            </ESTable>
          </>
        )
      case TABS.TICKET_REPORT:
        return (
          <Box mt={3}>
            <ESTable
              tableHeader={
                <TableRow>
                  <TableCell style={{ width: '33%' }} align="center">
                    購入者
                  </TableCell>
                  <TableCell style={{ width: '33%' }} align="center">
                    購入日時
                  </TableCell>
                  <TableCell style={{ width: '33%' }} align="center">
                    支払いポイント
                  </TableCell>
                </TableRow>
              }
            >
              {rows.map((row) => (
                <ItemTicket key={row} />
              ))}
            </ESTable>
          </Box>
        )
      case TABS.DETAIL_REPORT:
        return (
          <Box mt={4}>
            <DetailReport />
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
  return (
    <>
      <HeaderWithButtonStream
        title={t('streaming_gift_report_screen.delivery_report')}
        onClickBack={() => router.push(ESRoutes.VIDEO_STREAMING_MANAGEMENT)}
      />
      <Box className={classes.giftReportContainer}>
        <Grid container direction="column">
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

  [theme.breakpoints.down(419)]: {
    tabs: {
      display: 'flex',
      width: '100%',
      paddingRight: '24px',
    },
    singleTab: {
      width: 'calc((100vw - 48px) / 3)',
      minWidth: 'unset',
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
