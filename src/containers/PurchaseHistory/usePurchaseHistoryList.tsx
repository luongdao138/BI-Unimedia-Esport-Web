import { useAppDispatch, useAppSelector } from '@store/hooks'
import settingsStore from '@store/settings'
import { PurchaseHistoryParams } from '@services/settings.service'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'

const { selectors, actions } = settingsStore
const getPurchasehistoryMeta = createMetaSelector(actions.getPurchaseHistory)

const UsePurchaseHistory = () => {
  const dispatch = useAppDispatch()
  const purchaseHistory = useAppSelector(selectors.getPurchaseHistory)
  const pages = useAppSelector(selectors.getPurchaseHistoryMeta)
  const meta = useAppSelector(getPurchasehistoryMeta)
  const fetchPurchaseHistory = (param: PurchaseHistoryParams) => dispatch(actions.getPurchaseHistory(param))
  const clearPurchaseHistory = () => dispatch(actions.clearPurchaseHistory())
  const clearMeta = () => dispatch(clearMetaData(actions.getPurchaseHistory.typePrefix))

  return { purchaseHistory, fetchPurchaseHistory, clearPurchaseHistory, pages, meta, clearMeta }
}

export default UsePurchaseHistory
