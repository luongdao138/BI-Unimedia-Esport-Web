import { PurchaseTicketParams } from '@services/points.service'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import pointsManage from '@store/pointsManage'

const { selectors, actions } = pointsManage
const _getPurchaseTicketData = createMetaSelector(actions.purchaseTicketSuperChat)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePurchaseTicketSuperChat = () => {
  const dispatch = useAppDispatch()
  const dataPurchaseTicketSuperChat = useAppSelector(selectors.purchaseTicketSuperChatData)

  const meta_purchase_ticket_super_chat = useAppSelector(_getPurchaseTicketData)

  const purchaseTicketSuperChat = (params: PurchaseTicketParams) => dispatch(actions.purchaseTicketSuperChat(params))

  return {
    dataPurchaseTicketSuperChat,
    meta_purchase_ticket_super_chat,
    purchaseTicketSuperChat,
  }
}

export default usePurchaseTicketSuperChat
