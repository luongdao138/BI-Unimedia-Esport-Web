import { useAppDispatch, useAppSelector } from '@store/hooks'
import settingsStore from '@store/settings'
import { createMetaSelector } from '@store/metadata/selectors'
import { useEffect } from 'react'
import * as commonActions from '@store/common/actions'
import { useTranslation } from 'react-i18next'
import { clearMetaData } from '@store/metadata/actions'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
const { selectors, actions } = settingsStore
const getPurchaseCancelResponse = createMetaSelector(actions.cancelPurchase)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePurchaseHistoryDetail = () => {
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const dispatch = useAppDispatch()
  const purchaseHistoryDetail = useAppSelector(selectors.getPurchaseHistoryDetail)
  const fetchPurchaseHistoryDetail = (id: string) => dispatch(actions.getPurchaseHistoryDetail(id))
  const cancelPurchase = (id: string) => dispatch(actions.cancelPurchase(id))
  const resetMeta = () => dispatch(clearMetaData(actions.cancelPurchase.typePrefix))
  const meta = useAppSelector(getPurchaseCancelResponse)
  const clearPurchaseHistoryDetail = () => dispatch(actions.clearPurchaseHistoryDetail())

  useEffect(() => {
    if (meta.loaded) {
      router.push(ESRoutes.PURCHASE_HISTORY)
      dispatch(commonActions.addToast(`${t('common:purchase_history.cancel_msg')}`))
    }
  }, [meta.loaded])

  useEffect(() => {
    return () => resetMeta()
  }, [])

  return { purchaseHistoryDetail, fetchPurchaseHistoryDetail, clearPurchaseHistoryDetail, cancelPurchase, meta }
}

export default usePurchaseHistoryDetail
