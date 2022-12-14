import { useAppDispatch, useAppSelector } from '@store/hooks'
import purchasePoint from '@store/purchasePoint'
import { createMetaSelector } from '@store/metadata/selectors'
import * as commonActions from '@store/common/actions'
import { useTranslation } from 'react-i18next'
import pointsManage from '@store/pointsManage'
import { ListPointsParams } from '@services/points.service'

const actionsPointManage = pointsManage.actions
const selectorsPointManage = pointsManage.selectors
const { selectors, actions } = purchasePoint
const getSavedCardsMeta = createMetaSelector(actions.getSavedCards)
const getDeleteCardMeta = createMetaSelector(actions.deleteCard)
const getPurchaseUseNewCardMeta = createMetaSelector(actions.purchasePointUseNewCard)
const getPurchaseUseOldCardMeta = createMetaSelector(actions.purchasePointUseOldCard)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePurchasePointData = () => {
  const { t } = useTranslation('common')
  const dispatch = useAppDispatch()

  const metaSavedCardsMeta = useAppSelector(getSavedCardsMeta)
  const metaDeleteCardMeta = useAppSelector(getDeleteCardMeta)
  const metaPurchaseUseNewCardMeta = useAppSelector(getPurchaseUseNewCardMeta)
  const metaPurchaseUseOldCardMeta = useAppSelector(getPurchaseUseOldCardMeta)

  const purchasePointInfo = useAppSelector(selectors.getPurchasePoint)

  const getSavedCards = () => dispatch(actions.getSavedCards())
  const getMyPointActiveData = (params: ListPointsParams) => dispatch(actionsPointManage.getMyPointData(params))

  const deleteSavedCard = async (card_seq) => {
    const resultAction = await dispatch(actions.deleteCard(card_seq))
    if (actions.deleteCard.fulfilled.match(resultAction)) {
      const getCardsActionResult = await dispatch(actions.getSavedCards())
      if (getCardsActionResult) {
        dispatch(commonActions.addToast(t('purchase_point_tab.mess_delete_card_success')))
      }
    }
  }

  const mess_purchase_point_success = t('purchase_point_tab.mess_purchase_point_success')
  const purchasePointUseNewCard = async (purchase_info) => {
    const resultAction = await dispatch(actions.purchasePointUseNewCard(purchase_info))
    if (actions.purchasePointUseNewCard.fulfilled.match(resultAction)) {
      dispatch(commonActions.addToast(mess_purchase_point_success))
      getMyPointActiveData({ page: 1, limit: 10 })
    }
  }

  const purchasePointUseOldCard = async (purchase_info) => {
    const resultAction = await dispatch(actions.purchasePointUseOldCard(purchase_info))
    if (actions.purchasePointUseOldCard.fulfilled.match(resultAction)) {
      dispatch(commonActions.addToast(mess_purchase_point_success))
      getMyPointActiveData({ page: 1, limit: 10 })
    }
  }

  const resetErrorMess = () => dispatch(actions.resetErrorMess())

  const multiPaymentPurchaseData = useAppSelector(selectorsPointManage.multiPaymentPurchaseData)
  const requestMultiPaymentPurchase = async (amount, type, successCallback) => {
    const requestParams = {
      point: amount,
      payment_type: type,
    }
    const resultAction = await dispatch(actionsPointManage.requestMultiPaymentPurchase(requestParams))
    if (actionsPointManage.requestMultiPaymentPurchase.fulfilled.match(resultAction)) {
      successCallback(resultAction.payload)
    }
  }

  const updateNewPurchaseMethodSuccessState = (success) => dispatch(actions.newPaymentMethodSuccessState({ success }))

  return {
    metaSavedCardsMeta,
    getSavedCards,
    purchasePointInfo,
    deleteSavedCard,
    metaDeleteCardMeta,
    purchasePointUseNewCard,
    metaPurchaseUseNewCardMeta,
    purchasePointUseOldCard,
    metaPurchaseUseOldCardMeta,
    resetErrorMess,
    requestMultiPaymentPurchase,
    multiPaymentPurchaseData,
    updateNewPurchaseMethodSuccessState,
  }
}

export default usePurchasePointData
