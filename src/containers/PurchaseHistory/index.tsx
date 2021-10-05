import React, { useEffect } from 'react'
import usePurchaseHistoryList from '@containers/PurchaseHistory/usePurchaseHistoryList'
import PurchaseHistoryItem from '@containers/PurchaseHistory/purchaseHistoryItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import ESLoader from '@components/Loader'
import { makeStyles, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const ESPurchaseHistory: React.FC = () => {
  const { purchaseHistory, fetchPurchaseHistory, clearPurchaseHistory, pages, meta, clearMeta } = usePurchaseHistoryList()
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  useEffect(() => {
    return () => {
      clearMeta()
      clearPurchaseHistory()
    }
  }, [])

  useEffect(() => {
    fetchPurchaseHistory({
      page: 1,
    })
  }, [])

  const hasNextPage = pages && pages.current_page !== pages.total_pages

  const loadMore = () => {
    if (hasNextPage) {
      fetchPurchaseHistory({
        page: Number(pages.current_page) + 1,
      })
    }
  }

  return (
    <div>
      {purchaseHistory.length > 0 ? (
        <InfiniteScroll dataLength={purchaseHistory.length} next={loadMore} hasMore={hasNextPage} loader={null} scrollThreshold="1px">
          {purchaseHistory.map((history, i) => (
            <PurchaseHistoryItem data={history} key={i} />
          ))}
        </InfiniteScroll>
      ) : (
        meta.loaded && (
          <div className={classes.loaderCenter}>
            <Typography>{t('common:purchase_history.no_data')}</Typography>
          </div>
        )
      )}
      {meta.pending && (
        <div className={classes.loaderCenter}>
          <ESLoader />
        </div>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  loaderCenter: {
    marginTop: theme.spacing(1),
    width: '100%',
    textAlign: 'center',
  },
}))

export default ESPurchaseHistory
