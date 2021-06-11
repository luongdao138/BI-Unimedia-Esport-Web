import { useEffect } from 'react'
import usePurchaseHistoryList from '@containers/PurchaseHistory/usePurchaseHistoryList'
import PurchaseHistoryItem from '@containers/PurchaseHistory/purchaseHistoryItem'
import InfiniteScroll from 'react-infinite-scroll-component'

const ESPurchaseHistory: React.FC = () => {
  const { purchaseHistory, fetchPurchaseHistory, clearPurchaseHistory, pages } = usePurchaseHistoryList()

  useEffect(() => {
    return () => clearPurchaseHistory()
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
      <InfiniteScroll dataLength={purchaseHistory.length} next={loadMore} hasMore={hasNextPage} loader={null} scrollThreshold="1px">
        {purchaseHistory.map((history, i) => (
          <PurchaseHistoryItem data={history} key={i} />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default ESPurchaseHistory
