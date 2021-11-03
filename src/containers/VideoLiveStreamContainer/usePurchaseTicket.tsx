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

  const purchaseTicketSuperChat = async (params: PurchaseTicketParams) => {
    console.log('>>>>>>>>>>>>>>>> params purchaseTicketSuperChat >>>>>', params)
    const result = await dispatch(actions.purchaseTicketSuperChat(params))
    console.log('>>>>>>>>>>>>>>>> result purchase ticket: ', result)
    if (actions.purchaseTicketSuperChat.fulfilled.match(result)) {
      params?.handleSuccess()
      if (params?.type === 1) {
        console.log(' >>>>>>>>>>>>>>>> purchase ticket success ==================*************')
        dispatch(addToast(i18n.t('common:donate_points.purchase_ticket_success')))
        getVideoDetail({ video_id: `${params?.video_id}` })
      } else {
        console.log(' >>>>>>>>>>>>>>>> purchase super chat success ==================*************')
      }
    } else {
      if (params?.type === 1) {
        console.log('purchase ticket error')
        params?.handleError()
      } else {
        console.log('purchase super chat error')
      }
    }
  }

  return {
    dataPurchaseTicketSuperChat,
    meta_purchase_ticket_super_chat,
    purchaseTicketSuperChat,
  }
}

export default usePurchaseTicketSuperChat
