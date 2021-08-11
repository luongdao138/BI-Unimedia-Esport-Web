import { LiveStreamSettingParams } from '@services/liveStream.service'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import stream from '@store/stream'

const { selectors, actions } = stream
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useLiveSetting = () => {
  const dispatch = useAppDispatch()
  const getLiveSettingTab = (param: LiveStreamSettingParams) => dispatch(actions.getLiveSettingInfo(param))
  const liveSettingInformation = useAppSelector(selectors.getLiveStreamSetting)
  return { getLiveSettingTab, liveSettingInformation }
}
export default useLiveSetting
