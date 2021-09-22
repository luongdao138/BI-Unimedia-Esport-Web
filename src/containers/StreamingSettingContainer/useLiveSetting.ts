import { LiveStreamSettingParams, SetChannelParams, SetLiveStreamParams, StreamUrlAndKeyParams } from '@services/liveStream.service'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import stream from '@store/stream'

const { selectors, actions } = stream
const _getMeta = createMetaSelector(actions.getLiveSettingInfo)
const _getStreamUrlAndKeyMeta = createMetaSelector(actions.getStreamUrlAndKeyInfo)
const _getChannelMeta = createMetaSelector(actions.getChannel)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useLiveSetting = () => {
  const dispatch = useAppDispatch()
  const getLiveSettingTab = (param: LiveStreamSettingParams) => dispatch(actions.getLiveSettingInfo(param))
  const getScheduleSettingTab = (param: LiveStreamSettingParams) => dispatch(actions.getScheduleSettingInfo(param))
  const liveSettingInformation = useAppSelector(selectors.getLiveStreamSetting)
  const scheduleInformation = useAppSelector(selectors.getScheduleSetting)
  const streamUrlAndKeyInformation = useAppSelector(selectors.getStreamUrlAndKey)
  const setLiveStreamConfirm = async (param: SetLiveStreamParams, onSuccess: () => void) => {
    const resultAction = await dispatch(actions.setLiveStream(param))
    if (actions.setLiveStream.fulfilled.match(resultAction)) {
      onSuccess()
    }
  }
  const meta = useAppSelector(_getMeta)
  const getStreamUrlAndKeyMeta = useAppSelector(_getStreamUrlAndKeyMeta)
  const getChannelMeta = useAppSelector(_getChannelMeta)

  const getStreamUrlAndKey = async (params: StreamUrlAndKeyParams, onSuccess?: (url, key) => void) => {
    const resultAction = await dispatch(actions.getStreamUrlAndKeyInfo(params))
    if (actions.getStreamUrlAndKeyInfo.fulfilled.match(resultAction)) {
      onSuccess(resultAction.payload.data.STREAM_URL, resultAction.payload.data.STREAM_KEY_VALUE)
    }
  }
  const isPending = meta.pending || getStreamUrlAndKeyMeta.pending || getChannelMeta.pending
  const categoryData = useAppSelector(selectors.getCategorySelector)
  const channelInfo = useAppSelector(selectors.getChannelSelector)

  const setChannelConfirm = async (params: SetChannelParams, onSuccess: () => void) => {
    const resultAction = await dispatch(actions.setChannel(params))
    if (actions.setChannel.fulfilled.match(resultAction)) {
      onSuccess()
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
