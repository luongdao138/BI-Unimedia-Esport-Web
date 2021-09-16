import { ListVideoTopParams, TypeVideo } from '@services/videoTop.services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'
import { createMetaSelector } from '@store/metadata/selectors'
import videoTop from '@store/videoTop'

const { selectors, actions } = videoTop
const _getListVideoLive = createMetaSelector(actions.getVideoLive)
const useLiveVideos = (): {
  listLiveVideo: TypeVideo[]
  meta: Meta
  getListVideoTop: (params: ListVideoTopParams) => void
  resetLiveVideos: () => void
} => {
  const dispatch = useAppDispatch()
  const listLiveVideo = useAppSelector(selectors.liveVideos)
  const meta = useAppSelector(_getListVideoLive)
  const getListVideoTop = (params: ListVideoTopParams) => dispatch(actions.getVideoLive(params))

  const resetLiveVideos = () => dispatch(actions.resetLive())

  return {
    listLiveVideo,
    meta,
    getListVideoTop,
    resetLiveVideos,
  }
}

export default useLiveVideos
