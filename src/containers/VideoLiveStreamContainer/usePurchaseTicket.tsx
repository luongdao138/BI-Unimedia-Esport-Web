/* eslint-disable no-console */
import { PurchaseTicketParams } from '@services/points.service'
import { VideoDetailParams } from '@services/videoTop.services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import pointsManage from '@store/pointsManage'
import videoTop from '@store/videoTop'
import { addToast } from '@store/common/actions'
import i18n from '@locales/i18n'

const actionsVideoTop = videoTop.actions
const { selectors, actions } = pointsManage
const _getPurchaseTicketData = createMetaSelector(actions.purchaseTicketSuperChat)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePurchaseTicketSuperChat = () => {
  const dispatch = useAppDispatch()
  const dataPurchaseTicketSuperChat = useAppSelector(selectors.purchaseTicketSuperChatData)

  const meta_purchase_ticket_super_chat = useAppSelector(_getPurchaseTicketData)

  const getVideoDetail = (params: VideoDetailParams) => dispatch(actionsVideoTop.videoDetail(params))

  const purchaseTicketSuperChat = async (
    params: PurchaseTicketParams,
    onResult?: (isSuccess: boolean) => void,
    onError?: ({ code: number, message: string }) => void
  ) => {
    console.log('============= On donate point params ==============', params)
    const result = await dispatch(actions.purchaseTicketSuperChat(params))
    console.log('============= On donate point result ==============', result)
    if (onResult) onResult(actions.purchaseTicketSuperChat.fulfilled.match(result))
    if (actions.purchaseTicketSuperChat.fulfilled.match(result)) {
      // onResult()
      if (params?.type === 1) {
        console.log('============= On donate point result type 1==============')
        dispatch(addToast(i18n.t('common:donate_points.purchase_ticket_success')))
        getVideoDetail({ video_id: `${params?.video_id}` })
      }
      params?.handleSuccess()
    } else {
      // onResult()
      if (actions.purchaseTicketSuperChat.rejected.match(result)) {
        // TODO: Check error rejected call validation master invalid
        if (params?.type === 1) {
          console.log('purchase ticket error')
          params?.handleError()
        } else {
          const errorPayload: { code: number; message: string } = JSON.parse(result.payload.toString())
          if (errorPayload.message === 'validation.master_valid') {
            onError(errorPayload)
          }
        }
      }
    }
  }

  const clearPurchaseTicket = () => {
    dispatch(actions.clearPurchaseTicket())
  }

  const getPurchaseTicket = () => {
    return dataPurchaseTicketSuperChat
  }

  return {
    dataPurchaseTicketSuperChat,
    meta_purchase_ticket_super_chat,
    purchaseTicketSuperChat,
    clearPurchaseTicket,
    getPurchaseTicket,
  }
}

export default usePurchaseTicketSuperChat
