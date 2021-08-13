import { LiveStreamSettingParams, SetLiveStreamParams } from '@services/liveStream.service'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import stream from '@store/stream'

const { selectors, actions } = stream
const getMeta = createMetaSelector(actions.getLiveSettingInfo)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useLiveSetting = () => {
  const dispatch = useAppDispatch()
  const getLiveSettingTab = (param: LiveStreamSettingParams) => dispatch(actions.getLiveSettingInfo(param))
  const liveSettingInformation = useAppSelector(selectors.getLiveStreamSetting)
  const setLiveStreamConfirm = (param: SetLiveStreamParams) => dispatch(actions.setLiveStream(param))
  const meta = useAppSelector(getMeta)

  return {
    getLiveSettingTab,
    liveSettingInformation,
    setLiveStreamConfirm,
    meta,
  }
}
export default useLiveSetting
