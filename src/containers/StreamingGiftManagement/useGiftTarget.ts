import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import giftManage from '@store/giftManage'
import useCommonData from '@containers/Lobby/UpsertForm/useCommonData'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { getTimeZone } from '@utils/helpers/CommonHelper'
import { TargetPersonType } from '@store/giftManage/actions'

const { selectors, actions } = giftManage
const _addGiftTargetData = createMetaSelector(actions.addTargetPerson)
const getGiftGroupListMeta = createMetaSelector(actions.getGiftGroupList)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useGiftManage = () => {
  const { user } = useCommonData()
  const dispatch = useAppDispatch()
  const giftTargetData = useAppSelector(selectors.getListGiftTargetPerson)
  const { t } = useTranslation('common')

  const meta_gift_target = useAppSelector(_addGiftTargetData)

  const addTargetPerson = (params: TargetPersonType) => dispatch(actions.addTargetPerson(params))

  const updateTargetPerson = (params: TargetPersonType) => dispatch(actions.updateTargetPerson(params))

  const deleteTargetPerson = (params: string) => dispatch(actions.deleteTargetPerson(params))

  const resetTargetPersonData = () => dispatch(actions.resetGiftTargetPerson())

  const checkSnsUrl = async ({ sns_url }: any, successCallback?: () => void, errorCallback?: () => void) => {
    const isExist = giftTargetData?.some((item) => item.sns_url === sns_url)
    if (isExist) {
      errorCallback()
      return
    }
    const resultAction = await dispatch(actions.checkSnsUrl({ sns_url, user_id: user?.id }))
    if (actions.checkSnsUrl.fulfilled.match(resultAction)) {
      successCallback()
    }
    if (actions.checkSnsUrl.rejected.match(resultAction)) {
      errorCallback()
    }
  }

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

  const createNewGiftGroup = async (data, successCallback) => {
    const requestData = {
      ...data,
      user_id: user?.id,
      timezone: getTimeZone(),
    }
    const resultAction = await dispatch(actions.createNewGiftGroup(requestData))
    if (actions.createNewGiftGroup.fulfilled.match(resultAction)) {
      successCallback()
    }
  }

  const resetNewGroupMasterList = () => dispatch(actions.resetGiftGroupMasterList())
  const getGiftGroupList = (page, limit) => dispatch(actions.getGiftGroupList({ page, limit }))
  const giftGroupList = useAppSelector(selectors.getListGiftGroup)
  const giftGroupTotal = useAppSelector(selectors.getGiftGroupTotal)
  const giftGroupsMeta = useAppSelector(getGiftGroupListMeta)

  const deleteGiftMasterFromLocalList = (data) => dispatch(actions.deleteGiftMasterFromLocalList({ data }))

  const giftGroupDetail = useAppSelector(selectors.getGiftGroupDetail)
  const getGiftGroupDetail = (uuid?: string) =>
    dispatch(
      actions.getGiftGroupDetail({
        group_id: uuid,
        user_id: user?.id,
      })
    )

  const deleteGiftGroup = async (uuid: string, successCallback, errorCallback) => {
    const resultAction = await dispatch(
      actions.deleteGiftGroup({
        group_id: uuid,
        user_id: user?.id,
      })
    )
    if (actions.deleteGiftGroup.fulfilled.match(resultAction)) {
      successCallback()
    }
    if (actions.deleteGiftGroup.rejected.match(resultAction)) {
      errorCallback()
    }
  }

  return {
    giftTargetData,
    meta_gift_target,
    addTargetPerson,
    updateTargetPerson,
    deleteTargetPerson,
    resetTargetPersonData,
    checkSnsUrl,
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
    resetNewGroupMasterList,
    giftGroupsMeta,
    deleteGiftMasterFromLocalList,
    getGiftGroupDetail,
    giftGroupDetail,
    deleteGiftGroup,
  }
}

export default useGiftManage
