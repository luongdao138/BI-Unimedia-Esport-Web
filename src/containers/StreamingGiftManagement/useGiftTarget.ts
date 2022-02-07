import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import giftManage from '@store/giftManage'
import useCommonData from '@containers/Lobby/UpsertForm/useCommonData'
import { useTranslation } from 'react-i18next'

const { selectors, actions } = giftManage
const _addGiftTargetData = createMetaSelector(actions.addTargetPerson)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useGiftManage = () => {
  const { user } = useCommonData()
  const dispatch = useAppDispatch()
  const giftTargetData = useAppSelector(selectors.getListGiftTargetPerson)
  const snsUrlValidCheckStatus = useAppSelector(selectors.getSnsUrlValidCheckStatus)
  const { t } = useTranslation('common')

  const meta_gift_target = useAppSelector(_addGiftTargetData)

  const addTargetPerson = (params: any) => dispatch(actions.addTargetPerson(params))

  const resetTargetPersonData = () => dispatch(actions.resetGiftTargetPerson())

  const checkSnsUrl = ({ sns_url }: any) => dispatch(actions.checkSnsUrl({ sns_url, user_id: user?.id }))
  const resetSnsUrlStateCheck = () => dispatch(actions.resetSnsStateCheck())

  const addNewGiftMaster = async (onSuccess: () => void, onError: (message) => void) => {
    const data = giftTargetData.map((item) => {
      return {
        name: item.target_name,
        sns_url: item.sns_url,
        type: item.target_value === '個人' ? 0 : 1,
      }
    })
    const resultAction = await dispatch(actions.addNewGiftMaster({ data, user_id: user?.id }))
    if (actions.addNewGiftMaster.fulfilled.match(resultAction)) {
      onSuccess()
    } else if (actions.addNewGiftMaster.rejected.match(resultAction)) {
      // console.log('resultAction::', resultAction)
      // // TODO: Show error
      onError(t('streaming_gift_management.record_error_no').replace('XX', '1'))
    }
  }

  const getAllGiftMaster = (keyword: string) => {
    dispatch(actions.getAllGiftMaster({ keyword, user_id: user?.id }))
  }
  const giftMasterList = useAppSelector(selectors.getListGiftMaster)

  return {
    giftTargetData,
    meta_gift_target,
    addTargetPerson,
    resetTargetPersonData,
    checkSnsUrl,
    snsUrlValidCheckStatus,
    resetSnsUrlStateCheck,
    addNewGiftMaster,
    getAllGiftMaster,
    giftMasterList,
  }
}

export default useGiftManage
