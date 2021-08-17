import { LiveStreamSettingParams, SetLiveStreamParams } from '@services/liveStream.service'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import stream from '@store/stream'
import { useEffect } from 'react'

const { selectors, actions } = stream
const _getMeta = createMetaSelector(actions.getLiveSettingInfo)
const _getStreamUrlAndKeyMeta = createMetaSelector(actions.getStreamUrlAndKeyInfo)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useLiveSetting = () => {
  const dispatch = useAppDispatch()
  const getLiveSettingTab = (param: LiveStreamSettingParams) => dispatch(actions.getLiveSettingInfo(param))
  const liveSettingInformation = useAppSelector(selectors.getLiveStreamSetting)
  const streamUrlAndKeyInformation = useAppSelector(selectors.getStreamUrlAndKey)
  const setLiveStreamConfirm = async (param: SetLiveStreamParams, onSuccess: () => void) => {
    const resultAction = await dispatch(actions.setLiveStream(param))
    if (actions.setLiveStream.fulfilled.match(resultAction)) {
      onSuccess()
    }
  }
  const meta = useAppSelector(_getMeta)
  const getStreamUrlAndKeyMeta = useAppSelector(_getStreamUrlAndKeyMeta)
  const getStreamUrlAndKey = async (onSuccess: (url, key) => void) => {
    const resultAction = await dispatch(actions.getStreamUrlAndKeyInfo())
    if (actions.getStreamUrlAndKeyInfo.fulfilled.match(resultAction)) {
      onSuccess(resultAction.payload.data.stream_url, resultAction.payload.data.stream_key)
    }
  }
  const isPending = meta.pending || getStreamUrlAndKeyMeta.pending
  const categoryData = useAppSelector(selectors.getCategorySelector)
  const channelInfo = useAppSelector(selectors.getChannelSelector)

  useEffect(() => {
    dispatch(actions.getCategory())
    dispatch(actions.getChannel())
  }, [])
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
  }
}
export default useLiveSetting
