import { useAppDispatch, useAppSelector } from '@store/hooks'
import settingsStore from '@store/settings'
import { PurchaseHistoryParams } from '@services/settings.service'
import { createMetaSelector } from '@store/metadata/selectors'

const { selectors, actions } = settingsStore
const getPurchasehistoryMeta = createMetaSelector(actions.getPurchaseHistory)

const UsePurchaseHistory = () => {
  const dispatch = useAppDispatch()
  const purchaseHistory = useAppSelector(selectors.getPurchaseHistory)
  const pages = useAppSelector(selectors.getPurchaseHistoryMeta)
  const meta = useAppSelector(getPurchasehistoryMeta)
  const fetchPurchaseHistory = (param: PurchaseHistoryParams) => dispatch(actions.getPurchaseHistory(param))
  const clearPurchaseHistory = () => dispatch(actions.clearPurchaseHistory())
  return { purchaseHistory, fetchPurchaseHistory, clearPurchaseHistory, pages, meta }
}

export default UsePurchaseHistory
