/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CODE_ERROR_RENEW_SPECIAL,
  LiveStreamSettingParams,
  SetChannelParams,
  SetLiveStreamParams,
  StreamUrlAndKeyParams,
} from '@services/liveStream.service'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import stream from '@store/stream'
import { addToast } from '@store/common/actions'
import i18n from 'i18next'

const { selectors, actions } = stream
const _getMeta = createMetaSelector(actions.getLiveSettingInfo)
const _getMetaSchedule = createMetaSelector(actions.getScheduleSettingInfo)
const _getStreamUrlAndKeyMeta = createMetaSelector(actions.getStreamUrlAndKeyInfo)
const _getChannelMeta = createMetaSelector(actions.getChannel)
const _setLiveStreamMeta = createMetaSelector(actions.setLiveStream)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useLiveSetting = () => {
  const dispatch = useAppDispatch()
  const getLiveSettingTab = async (param: LiveStreamSettingParams) => {
    const result = await dispatch(actions.getLiveSettingInfo(param))
    if (!actions.getLiveSettingInfo.fulfilled.match(result) || result?.payload?.code === 400) {
      dispatch(addToast(i18n.t('common:common.channel_busy_to_renew')))
    } else if (!actions.getLiveSettingInfo.fulfilled.match(result) || result?.payload?.code !== 200) {
      dispatch(addToast(i18n.t('common:common.failed_to_get_data')))
    } else {
      return result
    }
  }
  const getScheduleSettingTab = async (param: LiveStreamSettingParams) => {
    const result = await dispatch(actions.getScheduleSettingInfo(param))
    if (!actions.getScheduleSettingInfo.fulfilled.match(result) || result?.payload?.code !== 200) {
      dispatch(addToast(i18n.t('common:common.failed_to_get_data')))
    } else {
      return result
    }
  }
  const liveSettingInformation = useAppSelector(selectors.getLiveStreamSetting)
  const scheduleInformation = useAppSelector(selectors.getScheduleSetting)
  const streamUrlAndKeyInformation = useAppSelector(selectors.getStreamUrlAndKey)
  const setLiveStreamConfirm = async (param: SetLiveStreamParams, onSuccess: (channel_progress) => void, onError?: (code) => void) => {
    const resultAction = await dispatch(actions.setLiveStream(param))
    if (actions.setLiveStream.fulfilled.match(resultAction)) {
      onSuccess(resultAction.payload.data?.channel_progress)
    } else {
      //@ts-ignore
      if (resultAction.payload?.code === CODE_ERROR_RENEW_SPECIAL.STK01) {
        dispatch(addToast(i18n.t('common:common.deactivate_key_setting_error')))
        //@ts-ignore
      } else if (resultAction.payload?.code === CODE_ERROR_RENEW_SPECIAL.GROUP_LIST_DOES_NOT_EXIST) {
        //streaming_setting_screen.group_list_does_not_exist
        //@ts-ignore
        onError(resultAction.payload?.code)
      } else {
        dispatch(addToast(i18n.t('common:common.failed_to_get_data')))
      }
    }
  }
  const meta = useAppSelector(_getMeta)
  const getStreamUrlAndKeyMeta = useAppSelector(_getStreamUrlAndKeyMeta)
  const getChannelMeta = useAppSelector(_getChannelMeta)
  const getScheduleMeta = useAppSelector(_getMetaSchedule)
  const setLiveStreamMeta = useAppSelector(_setLiveStreamMeta)

  const getStreamUrlAndKey = async (params: StreamUrlAndKeyParams, onSuccess?: (url, key, arn, data) => void) => {
    const resultAction = await dispatch(actions.getStreamUrlAndKeyInfo(params))
    if (actions.getStreamUrlAndKeyInfo.fulfilled.match(resultAction)) {
      onSuccess(
        resultAction.payload.data?.stream_url,
        resultAction.payload.data?.stream_key_value,
        resultAction.payload.data?.channel_arn,
        resultAction.payload.data
      )
    } else {
      //@ts-ignore
      if (resultAction.payload?.code === CODE_ERROR_RENEW_SPECIAL.CHA099) {
        dispatch(addToast(i18n.t('common:common.failed_to_renew')))
      }
      //@ts-ignore
      if (resultAction.payload?.code === CODE_ERROR_RENEW_SPECIAL.SERVICE_BUSY) {
        dispatch(addToast(i18n.t('common:common.channel_busy_to_renew')))
      } else {
        dispatch(addToast(i18n.t('common:common.failed_to_get_data')))
      }
    }
  }
  const isPending = meta.pending || getStreamUrlAndKeyMeta.pending || getChannelMeta.pending || getScheduleMeta.pending
  const isPendingSetting = setLiveStreamMeta.pending
  const categoryData = useAppSelector(selectors.getCategorySelector)
  const channelInfo = useAppSelector(selectors.getChannelSelector)

  const setChannelConfirm = async (params: SetChannelParams, onSuccess: () => void) => {
    const resultAction = await dispatch(actions.setChannel(params))
    if (actions.setChannel.fulfilled.match(resultAction)) {
      onSuccess()
    } else {
      dispatch(addToast(i18n.t('common:common.failed_to_get_data')))
    }
  }

  const getChannelLive = () => dispatch(actions.getChannel())
  const getCategory = () => dispatch(actions.getCategory())

  return {
    getLiveSettingTab,
    liveSettingInformation,
    setLiveStreamConfirm,
    meta,
    streamUrlAndKeyInformation,
    getStreamUrlAndKey,
    getStreamUrlAndKeyMeta,
    isPending,
    isPendingSetting,
    categoryData,
    channelInfo,
    setChannelConfirm,
    getChannelLive,
    scheduleInformation,
    getScheduleSettingTab,
    getCategory,
  }
}
export default useLiveSetting
