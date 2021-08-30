import HeaderWithButton from '@components/HeaderWithButton'
import ESTab from '@components/Tab'
import ESTabs from '@components/Tabs'
import i18n from '@locales/i18n'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PurchaseHistory from './PurchaseHistory'
import PointManagementTab from './PointManagementTab'
import PurchasePoint from './PurchasePoint'
import UsageHistory from './UsageHistory'
import Head from 'next/head'
import usePurchasePointData from './PurchasePoint/usePurchasePointData'

enum TABS {
  POINT_MANAGEMENT = 0,
  PURCHASE_POINT = 1,
  PURCHASE_HISTORY = 2,
  USAGE_HISTORY = 3,
}

const PointManage: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [tab, setTab] = useState(0)

  useEffect(() => {
    setTab(0)
  }, [])

  const { purchasePointInfo } = usePurchasePointData()

  useEffect(() => {
    // redirect to first tab when purchase point user new or old card success
    if(purchasePointInfo.purchase_success) {
      setTab(0)
    }
  }, [purchasePointInfo.purchase_success])

  const getTabs = () => {
    return (
      <Grid item xs={12}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs}>
          <ESTab className={classes.tabMin} label={t('point_management_tab.point_management')} value={0} />
          <ESTab className={classes.tabMin} label={t('point_management_tab.purchase_point')} value={1} />
          <ESTab className={classes.tabMin} label={t('point_management_tab.purchase_history')} value={2} />
          <ESTab className={classes.tabMin} label={t('point_management_tab.usage_history')} value={3} />
        </ESTabs>
      </Grid>
    )
  }
  const getContent = () => {
    switch (tab) {
      case TABS.POINT_MANAGEMENT:
        return <PointManagementTab />
      case TABS.PURCHASE_POINT:
        return <PurchasePoint />
      case TABS.PURCHASE_HISTORY:
        return <PurchaseHistory />
      case TABS.USAGE_HISTORY:
        return <UsageHistory />
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
      <Head>
        <script src={process.env.NEXT_PUBLIC_GMO_ENDPOINT}></script>
      </Head>
      <HeaderWithButton title={t('point_management_tab.point_management')} />
      <Grid container direction="column">
        {getTabs()}
        {getContent()}
      </Grid>
    </>
  )
}
export default PointManage

const useStyles = makeStyles((theme) => ({
  tabs: {
    overflow: 'hidden',
    borderBottomColor: Colors.text[300],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    paddingLeft: 24,
  },
  forbiddenMessageContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  tabMin: {
    minWidth: 56,
  },
  [theme.breakpoints.down(375)]: {
    tabs: {
      paddingLeft: 0,
    },
    tabMin: {
      '& .MuiTab-wrapper': {
        fontSize: 12,
      },
    },
  },
}))
