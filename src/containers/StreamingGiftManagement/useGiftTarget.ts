/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import giftManage from '@store/giftManage'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { getTimeZone } from '@utils/helpers/CommonHelper'
import { TargetPersonType } from '@store/giftManage/actions'
import { NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import { showDialog } from '@store/common/actions'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import authStore from '@store/auth'
import { CreateNewGiftGroupRequestBody } from '@services/gift.service'
import { getReloadGiftMasterFlag } from '@store/giftManage/selectors'

const { selectors, actions } = giftManage
const _addGiftTargetData = createMetaSelector(actions.addTargetPerson)
const getGiftGroupListMeta = createMetaSelector(actions.getGiftGroupList)
const {
  selectors: { getAuth },
} = authStore

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useGiftManage = () => {
  const user = useAppSelector(getAuth)
  const dispatch = useAppDispatch()
  const giftTargetData = useAppSelector(selectors.getListGiftTargetPerson)
  const { t } = useTranslation('common')
  const { checkVideoNgWordFields, checkVideoNgWordByField } = useCheckNgWord()

  const meta_gift_target = useAppSelector(_addGiftTargetData)

  const checkNgWordTargetPerson = (fields: any, onSuccessCallback: () => void) => {
    const fieldIdentifier = checkVideoNgWordFields(fields)
    const ngFields = checkVideoNgWordByField({
      [t('streaming_gift_management.target_name')]: fields.target_name,
      [t('streaming_gift_management.sns_url')]: fields.sns_url,
    })
    if (fieldIdentifier) {
      dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: ngFields.join(', ') }))
    } else {
      onSuccessCallback()
    }
  }

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
      const idGiftMasters = resultAction.payload.data.items.map((x) => x.id)
      const resultActionSendEmail = await dispatch(actions.sendEmail({ gift_master_ids: idGiftMasters }))

      if (actions.sendEmail.fulfilled.match(resultActionSendEmail)) {
        onSuccess()
      } else if (actions.sendEmail.rejected.match(resultActionSendEmail)) {
        // send email fail
      }
    } else if (actions.addNewGiftMaster.rejected.match(resultAction)) {
      // console.log('resultAction::', resultAction)
      // // TODO: Show error
      const urlResponseExist = resultAction.payload
      const indexGift = (giftTargetData.findIndex((gift) => gift.sns_url === urlResponseExist) + 1).toString()
      onError(t('streaming_gift_management.record_error_no').replace('XX', indexGift))
    }
  }

  const getAllGiftMaster = (keyword: string, type: number) => {
    dispatch(actions.getAllGiftMaster({ keyword, user_id: user?.id, type }))
  }
  const giftMasterList = useAppSelector(selectors.getListGiftMaster)

  const addGiftMasterToNewGroup = (data) => dispatch(actions.addGiftMasterToNewGroup({ data }))
  const removeGiftMasterFromNewGroup = (data) => dispatch(actions.removeGiftMasterFromNewGroup({ data }))
  const newGiftGroupGiftMasterList = useAppSelector(selectors.getNewGroupGiftMasterList)
  const includedInNewList = (data) => !!_.find(newGiftGroupGiftMasterList, ({ id }) => id === data.id)
  const updateNewGiftMasterList = (data) => dispatch(actions.updateGiftMasterList({ data }))

  const createNewGiftGroup = async (data, successCallback, errorCallback) => {
    const requestData: CreateNewGiftGroupRequestBody = {
      ...data,
      user_id: user?.id,
      timezone: getTimeZone(),
    }
    const resultAction = await dispatch(actions.createNewGiftGroup(requestData))
    if (actions.createNewGiftGroup.rejected.match(resultAction)) {
      //@ts-ignore
      const { message, data } = resultAction.payload
      errorCallback(message)
      if (message === 'validation.group_item_valid') {
        updateNewGiftMasterList(data)
        setReloadGiftMasterFlag(true)
      }
    }
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

  const reloadGiftMasterFlag = useAppSelector(getReloadGiftMasterFlag)
  const setReloadGiftMasterFlag = (flag) => dispatch(actions.setReloadGiftMasterFlag({ flag }))

  return {
    giftTargetData,
    meta_gift_target,
    checkNgWordTargetPerson,
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
    reloadGiftMasterFlag,
    setReloadGiftMasterFlag,
  }
}

export default useGiftManage
