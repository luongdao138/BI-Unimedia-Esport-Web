import { useAppDispatch, useAppSelector } from '@store/hooks'
import settingsStore from '@store/settings'

const { selectors, actions } = settingsStore

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePurchaseHistoryDetail = () => {
  const dispatch = useAppDispatch()
  const purchaseHistoryDetail = useAppSelector(selectors.getPurchaseHistoryDetail)
  const fetchPurchaseHistoryDetail = (id: string) => dispatch(actions.getPurchaseHistoryDetail(id))
  const clearPurchaseHistoryDetail = () => dispatch(actions.clearPurchaseHistoryDetail())
  return { purchaseHistoryDetail, fetchPurchaseHistoryDetail, clearPurchaseHistoryDetail }
}

export default usePurchaseHistoryDetail
