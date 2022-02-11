import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import giftManage from '@store/giftManage'
import useCommonData from '@containers/Lobby/UpsertForm/useCommonData'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { getTimeZone } from '@utils/helpers/CommonHelper'

const { selectors, actions } = giftManage
const _addGiftTargetData = createMetaSelector(actions.addTargetPerson)
const getGiftGroupListMeta = createMetaSelector(actions.getGiftGroupList)

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

  const addGiftMasterToNewGroup = (data) => dispatch(actions.addGiftMasterToNewGroup({ data }))
  const removeGiftMasterFromNewGroup = (data) => dispatch(actions.removeGiftMasterFromNewGroup({ data }))
  const newGiftGroupGiftMasterList = useAppSelector(selectors.getNewGroupGiftMasterList)
  const includedInNewList = (data) => !!_.find(newGiftGroupGiftMasterList, ({ id }) => id === data.id)

  const createNewGiftGroup = async (data) => {
    const requestData = {
      ...data,
      user_id: user?.id,
      timezone: getTimeZone(),
    }
    const resultAction = await dispatch(actions.createNewGiftGroup(requestData))
    if (actions.createNewGiftGroup.fulfilled.match(resultAction)) {
      // TODO
    }
  }

  const getGiftGroupList = (page, limit) => dispatch(actions.getGiftGroupList({ page, limit }))
  const giftGroupList = useAppSelector(selectors.getListGiftGroup)
  const giftGroupTotal = useAppSelector(selectors.getGiftGroupTotal)
  const giftGroupsMeta = useAppSelector(getGiftGroupListMeta)

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
    addGiftMasterToNewGroup,
    removeGiftMasterFromNewGroup,
    newGiftGroupGiftMasterList,
    includedInNewList,
    createNewGiftGroup,
    getGiftGroupList,
    giftGroupList,
    giftGroupTotal,
    giftGroupsMeta,
  }
}

export default useGiftManage
